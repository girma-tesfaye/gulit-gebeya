import {
	PLACE_PROMOTER_PRODUCT,
	GET_PROMOTER_PRODUCTS,
	REMOVE_PROMOTER_PRODUCT,
} from '../../constants/constants';
import firebase from '../../firebase/firebase';
import app from 'firebase/app';
import { displayActionMessage } from '../../helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { history } from '../../routers/AppRouter';
import { getPromoterProductsSuccess, removePromoterProductSuccess } from '../actions/promoterActions';

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
		case PLACE_PROMOTER_PRODUCT:
			try {
				yield initRequest();
				const state = yield select();
				const isPromoterProductExceedLimit = yield call(firebase.isPromoterProductExceedLimit);	
				if(!isPromoterProductExceedLimit){
					const isPromoterProduct = yield call(firebase.isPromoterProductPresent, payload.productId);								
					if(!isPromoterProduct){
						const userId = firebase.auth.currentUser.uid;
						const key = yield call(firebase.generateKey);
						const promoterProduct = {
							...payload,
							dateAdded: app.firestore.FieldValue.serverTimestamp() || new Date().getTime(),
							promoterProductId: key,
							promoterId: userId,
						};						
						yield call(firebase.placePromoterProduct, promoterProduct, key, userId);
						console.log('this promoter product is placed :', promoterProduct)
						// todo direct the promoter to the promoter product detail page
						//yield handleAction(`/order/${order.orderId}`, 'ordered succesfully', 'success');	
						yield handleAction(undefined, 'product is add', 'success');
					}else{
						yield handleAction(undefined, 'product is already exist', 'error');
						console.log('product is already exist');
					}
				}else{
					yield handleAction(undefined, 'Maximum allowed number of product is exceeded', 'error');
					console.log('Maximum allowed number of product is exceeded');
				}			
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `failed to add product: ${e.message_}`, 'error');
			}
			break;
		case GET_PROMOTER_PRODUCTS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getCurrentPromoterProducts, payload);

				if (result.promoterProducts.length === 0) {
					yield put(setLoading(false));
					yield put(setRequestStatus('No Product found.'));
					console.log('ERROR', 'No Product found.');
				} else {
					yield put(getPromoterProductsSuccess({
						promoterProducts: result.promoterProducts,
						lastKey: result.lastKey ? result.lastKey : state.promoter.lastRefKey,
						total: result.total ? result.total : state.promoter.total
					}));
					yield put(setRequestStatus(''));
				}
				yield put(setLoading(false));
			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		case REMOVE_PROMOTER_PRODUCT:
			try {					
				yield initRequest();
				yield call(firebase.removePromoterProduct, payload);				
				// add a mechanism to not forgate the promoter price for this product				
				yield put(removePromoterProductSuccess(payload));
				yield put(setLoading(false));
				yield handleAction(undefined, 'Item succesfully removed', 'success');
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
			}
			break;
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default orderSaga;