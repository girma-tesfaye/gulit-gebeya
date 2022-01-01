/* eslint-disable indent */
import { GET_WISHLIST } from '../../constants/constants';
import firebase from '../../firebase/firebase';
import { displayActionMessage } from '../../helpers/utils';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import { getWishList } from '../actions/wishListActions';
//import app from 'firebase/app';

function* initRequest() {
	yield put(setLoading(true));
	yield put(setRequestStatus(null));
}

function* handleError(e) {
	yield put(setLoading(false));
	yield put(setRequestStatus(e));
	console.log('ERROR: ', e);
}

/* function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
} */

function* wishListSaga({ type, payload }) {
	switch (type) {			
		case GET_WISHLIST:
			try {
				yield initRequest();               
				 
				const result = yield call(firebase.getWishList);
                
				if (!result) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No ui wishlist found.'));
					console.log('ERROR','No ui wishlist found.');
				} else {
					yield put(getWishList(result));
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

export default wishListSaga;
