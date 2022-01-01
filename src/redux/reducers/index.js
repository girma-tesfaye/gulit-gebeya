import productReducer from './productReducer';
//import categoryReducer from './categoryReducer';
import basketReducer from './basketReducer';
import authReducer from './authReducer';
import profileReducer from './profileReducer';
import filterReducer from './filterReducer';
import checkoutReducer from './checkoutReducer';
import userReducer from './userReducer';
import miscReducer from './miscReducer';
import helperReducer from './helperReducer'
import adminAdminReducer from './adminAdminReducer'
import orderReducer from './orderReducer'
import shopProfileReducer from './shopProfileReducer';
import reviewReducer from './reviewReducer';
import wishListReducer from './wishListReducer';
import promoterReducer from './promoterReducer';

const rootReducer = {
	products: productReducer,
	//categorys: categoryReducer,
	basket: basketReducer,
	auth: authReducer,
	profile: profileReducer,
	filter: filterReducer,
	users: userReducer,
	checkout: checkoutReducer,
	app: miscReducer,
	utills: helperReducer,
	adminAdmin: adminAdminReducer,
	orders: orderReducer,
	shopProfile: shopProfileReducer,
	reviews: reviewReducer,
	wishList: wishListReducer,
	promoter: promoterReducer

};

export default rootReducer;
