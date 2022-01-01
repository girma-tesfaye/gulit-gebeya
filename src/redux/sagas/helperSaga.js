/* eslint-disable indent */
import {
	GET_UI_UTILLS,
	ADD_UI_TO_CLOUD	
} from '../../constants/constants';

import firebase from '../../firebase/firebase';
import { displayActionMessage } from '../../helpers/utils';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import {
	getUiUtillsSuccess,	getUiUtills
} from '../actions/helperActions';
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
		case GET_UI_UTILLS:
			try {
				yield initRequest();               
				 
				const result = yield call(firebase.getUiUtills);
                
				if (!result) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No ui utills found.'));
					console.log('ERROR','No ui utills found.');
				} else {
					yield put(getUiUtillsSuccess(result));
					yield put(setRequestStatus(''));
				}
				// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
				yield put(setLoading(false));
			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		case ADD_UI_TO_CLOUD:
			try {
				yield initRequest(); 
					 
				yield call(firebase.editUtilsUi,payload);					
				yield handleAction(undefined, 'Utils Ui Updated Successfully', 'success');
				yield put(getUiUtills());
				yield put(setLoading(false));
			} catch (e) {
				console.log(e);
				yield handleAction(undefined, `failed to update utils ui: ${e.message_}`, 'error');
				yield handleError(e);
			}
			break;							
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default orderSaga;
