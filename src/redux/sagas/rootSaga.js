import { takeLatest } from 'redux-saga/effects';
import * as ACTION from '../../constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';
//import categorySaga from './categorySaga';
import profileSaga from './profileSaga';
import helperSaga from './helperSaga';
import shopProfileSaga from './shopProfileSaga';
import orderSaga from './orderSaga';
import reviewSaga from './reviewSaga';
import adminAdminSaga from './adminAdminSaga';
import promoterSaga from './promoterSaga';

function* rootSaga() {
	yield takeLatest([
		ACTION.SIGNIN,
		ACTION.SIGNUP,
		ACTION.SIGNOUT,
		ACTION.PHONE_SIGNUP,
		ACTION.PHONE_SIGNIN,
		ACTION.SIGNIN_WITH_GOOGLE,
		ACTION.SIGNIN_WITH_FACEBOOK,
		ACTION.SIGNIN_WITH_GITHUB,
		ACTION.ON_AUTHSTATE_CHANGED,
		ACTION.ON_AUTHSTATE_SUCCESS,
		ACTION.ON_AUTHSTATE_FAIL,
		ACTION.SET_AUTH_PERSISTENCE,
		ACTION.RESET_PASSWORD
	], authSaga);
	yield takeLatest([
		ACTION.ADD_PRODUCT,
		ACTION.SEARCH_PRODUCT,
		ACTION.SEARCH_CATEGORY_PRODUCT,
		ACTION.REMOVE_PRODUCT,
		ACTION.EDIT_PRODUCT,
		ACTION.GET_PRODUCTS,
		ACTION.GET_ADMIN_PRODUCTS,
		ACTION.GET_SHOP_PRODUCTS,
		ACTION.GET_SHOPS
	], productSaga);
	yield takeLatest([
		ACTION.UPDATE_EMAIL,
		ACTION.UPDATE_PROFILE
	], profileSaga);
	yield takeLatest([		
		ACTION.UPDATE_SHOP_PROFILE,
		ACTION.CREATE_SHOP
	], shopProfileSaga);
	yield takeLatest([		
		ACTION.PLACE_ORDER,
		ACTION.GET_ORDERS
	], orderSaga);
	yield takeLatest([		
		ACTION.ADD_REVIEW,
		ACTION.GET_REVIEWS
	], reviewSaga);
	yield takeLatest([		
		ACTION.GET_ADMIN_ADMIN_USERS,		
	], adminAdminSaga);
	yield takeLatest([
		ACTION.GET_UI_UTILLS,
		ACTION.ADD_UI_TO_CLOUD
	], helperSaga);
	yield takeLatest([		
		ACTION.PLACE_PROMOTER_PRODUCT,
		ACTION.GET_PROMOTER_PRODUCTS,
		ACTION.REMOVE_PROMOTER_PRODUCT,		
	], promoterSaga);

	//yield takeLatest([
		//ACTION.ADD_CATEGORY,
		//ACTION.REMOVE_CATEGORY,
		//ACTION.EDIT_CATEGORY,
		//ACTION.GET_CATEGORYS,
	//	ACTION.GET_ADMIN_CATEGORYS
	//], categorySaga); 

}

export default rootSaga;
