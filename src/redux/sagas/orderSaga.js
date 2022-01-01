/* eslint-disable indent */
import {
	PLACE_ORDER, GET_ORDERS	
} from '../../constants/constants';

import firebase from '../../firebase/firebase';
import { displayActionMessage } from '../../helpers/utils';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import {
	getOrdersSuccess,	
} from '../actions/orderActions';
import { useSelector } from 'react-redux';
import { clearBasket,} from '../actions/basketActions';
import { clearWishList,} from '../actions/wishListActions';
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
		case PLACE_ORDER:
			try {
				yield initRequest();
				const state = yield select();
				const userId = firebase.auth.currentUser.uid;				
				const key = yield call(firebase.generateKey);		
				console.log(firebase.db)
				const order = {
					...payload,
                    orderedAt: /* app.firestore.FieldValue.serverTimestamp() */new Date().getTime(),
					orderId: key,
					buyer: userId,			
				};			
				console.log(order)
				yield call(firebase.placeOrder, order, key);				

				yield handleAction(`/order/${order.orderId}`, 'ordered succesfully', 'success');
				yield call(firebase.saveBasketItems, [],userId);
                yield put(clearBasket());
				yield call(firebase.saveWishListItems, [],userId);
                yield put(clearWishList());
				yield put(resetCheckout());
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `failed to order: ${e.message_}`, 'error');
			}
			break;
		case GET_ORDERS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getOrders, payload);

				if (result.orders.length === 0) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No Order found.'));
					console.log('ERROR','No Order found.');
				} else {
					yield put(getOrdersSuccess({
						orders: result.orders,
						lastKey: result.lastKey ? result.lastKey : state.orders.lastRefKey,
						total: result.total ? result.total : state.orders.total
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
