/* eslint-disable indent */
import {
	ADD_REVIEW, GET_REVIEWS	
} from '../../constants/constants';

import firebase from '../../firebase/firebase';
import { displayActionMessage } from '../../helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import {
	addReviewSuccess,
    getReviewsSuccess	
} from '../actions/reviewActions';
import app from 'firebase/app';

function* initRequest() {
	yield put(setLoading(true));
	yield put(setRequestStatus(null));
}

function* handleError(e) {
	yield put(setLoading(false));
	yield put(setRequestStatus(e));
	console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
}

function* orderSaga({ type, payload }) {
	switch (type) {		
		case ADD_REVIEW:
			try {
				yield initRequest();
				const state = yield select();
				const userId = firebase.auth.currentUser.uid;
				const userName = state.profile.fullname;
				const userAvator = state.profile.avatar;
				const comment = payload.review;				
				
				const review = {
					...comment,
					userId: userId,
					userName: userName,
					userAvator: userAvator,
					lastUpdate: app.firestore.FieldValue.serverTimestamp() || new Date().getTime(),					
				};				
				const result = yield call(firebase.addRating, payload.productId, userId, review);				
				yield put(addReviewSuccess({
					id: userId,
					...review
				}));				
				yield handleAction(undefined, 'Review succesfully added', 'success');
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Review failed to add: ${e.message_}`, 'error');
			}
			break;
		case GET_REVIEWS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getReviews, payload.lastRef, payload.productId);

				if (result.reviews.length === 0) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No Review found.'));
					console.log('ERROR','No Review found.');
				} else {
					yield put(getReviewsSuccess({
						reviews: result.reviews,
						lastKey: result.lastKey ? result.lastKey : state.reviews.lastRefKey,
						total: result.total ? result.total : state.reviews.total
					}));
					yield put(setRequestStatus(''));
				}
				// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
				yield put(setLoading(false));
			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;				
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default orderSaga;
