/* eslint-disable indent */
import {
	GET_ADMIN_ADMIN_USERS	
} from '../../constants/constants';

import firebase from '../../firebase/firebase';
import { displayActionMessage } from '../../helpers/utils';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import {
	getAdminAdminUsersSuccess,	
} from '../actions/adminAdminActions';
import { useSelector } from 'react-redux';
import { clearBasket,} from '../actions/basketActions';
import {resetCheckout} from '../actions/checkoutActions';
import { SHOP } from '../../constants/routes';
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

function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
}

function* orderSaga({ type, payload }) {
	switch (type) {			
		case GET_ADMIN_ADMIN_USERS:
			try {
				yield initRequest();               
                console.log(payload)
				const state = yield select(); 
				const result = yield call(firebase.getAdminAdminUsers, payload);

				if (result.users.length === 0) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No User found.'));
					console.log('ERROR','No User found.');
				} else {
					yield put(getAdminAdminUsersSuccess({
						users: result.users,
						lastKey: result.lastKey ? result.lastKey : state.adminAdmin.users.lastRefKey,
						total: result.total ? result.total : state.adminAdmin.users.total
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
