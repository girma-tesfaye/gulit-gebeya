import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import * as ROUTES from '../constants/routes';

import Dashboard from '../pages/admin/dashboard';
import Products from '../pages/admin/products';
import Categorys from '../pages/admin/categorys';
import EditProduct from '../pages/admin/edit_product';
import AddProduct from '../pages/admin/add_product';
import AddCategory from '../pages/admin/add_category';

import ViewShop from '../pages/view_shop';
import ViewProduct from '../pages/view_product';
import Search from '../pages/search';
import CategorySearch from '../pages/categorySearch';

import AboutUs from '../pages/aboutPage';
import ContactUs from '../pages/contactUs';
import FollowUs from '../pages/followUs';
import HelpCenter from '../pages/helpCenter';

import WishList from '../components/wishList/WishList';
import ShopsList from '../pages/shopsList';

import PhoneSignIn from '../pages/auth/phone_signin';
import PhoneSignUp from '../pages/auth/phone_signup';
import SignUp from '../pages/auth/signup';
import SignIn from '../pages/auth/signin';
import ForgotPassword from '../pages/auth/forgot_password';
import ForgotPhonePassword from '../pages/auth/forgot_phone_password';
import VerificationEmail from '../pages/auth/verification_email';
import VerificationPhone from '../pages/auth/verification_phone';
import UserAccount from '../pages/account/user_account';
import ShopAccount from '../pages/shop_account/shop_account';
import EditAccount from '../pages/account/edit_account';
import EditShopAccount from '../pages/shop_account/edit_shop_account';
import Home from '../pages/home';
import CheckOutStep1 from '../pages/checkout/step1';
import CheckOutStep2 from '../pages/checkout/step2';
import CheckOutStep3 from '../pages/checkout/step3';
import PageNotFound from '../pages/error/PageNotFound';

import ClientRoute from './ClientRoute';
import PublicRoute from './PublicRoute';
import AdminRoute from './AdminRoute';
import PromoterRoute from './PromoterRoute';
import AdminAdminRoute from './AdminAdminRoute';
import Shop from '../pages/shop';
import FeaturedProducts from '../pages/featured';
import RecommendedProducts from '../pages/recommended';
import Shops from '../pages/shops'
import PromoterDashboard from '../pages/promoter/dashboard';
import PromoterProducts from '../pages/promoter/promoterProducts';
import PromoterProductDetail from '../pages/promoter/promoterProducts/promoterProductDetail';
import UpgradeToPromoter from '../pages/promoter/requestPromotion';

import AdminAdminDashboard from '../pages/adminAdmin/dashboard';
import AdminAdminUsers from '../pages/adminAdmin/users';
import AdminAdminShops from '../pages/adminAdmin/shops';
import AdminAdminOrders from '../pages/adminAdmin/orders';
import ViewShopPublic from '../pages/view_shop_public';

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<PublicRoute
				component={Search}
				exact
				path={ROUTES.SEARCH}
			/>
			<PublicRoute CATEGORY_SEARCH
				component={CategorySearch}
				exact
				path={ROUTES.CATEGORY_SEARCH}
			/>
			<PublicRoute
				component={Home}
				exact
				path={ROUTES.HOME}
			/>
			<PublicRoute
				component={Shop}
				exact
				path={ROUTES.SHOP}
			/>
			<PublicRoute
				component={ShopsList}
				exact
				path={ROUTES.SHOPS_LIST}
			/>
			<PublicRoute
				component={AboutUs}
				exact
				path={ROUTES.ABOUT_US}
			/>
			<PublicRoute
				component={ContactUs}
				exact
				path={ROUTES.CONTACT_US}
			/>
			<PublicRoute
				component={FollowUs}
				exact
				path={ROUTES.FOLLOW_US}
			/>
			<PublicRoute
				component={HelpCenter}
				exact
				path={ROUTES.HELP_CENTER}
			/>
			<PublicRoute
				component={FeaturedProducts}
				exact
				path={ROUTES.FEATURED_PRODUCTS}
			/>
			<PublicRoute
				component={RecommendedProducts}
				exact
				path={ROUTES.RECOMMENDED_PRODUCTS}
			/>
			<PublicRoute
				component={Shops}
				exact
				path={ROUTES.SHOPS}
			/>
			<PublicRoute
				component={PhoneSignIn}
				path={ROUTES.PHONE_SIGNIN}
			/>
			<PublicRoute
				component={PhoneSignUp}
				exact
				path={ROUTES.PHONE_SIGNUP}
			/>
			<PublicRoute
				component={SignUp}
				path={ROUTES.SIGNUP}
			/>
			<PublicRoute
				component={SignIn}
				exact
				path={ROUTES.SIGNIN}
			/>
			<PublicRoute
				component={VerificationEmail}
				path={ROUTES.VERIFICATION_EMAIL}
			/>
			<PublicRoute
				component={VerificationPhone}
				path={ROUTES.VERIFICATION_PHONE}
			/>
			<PublicRoute
				component={ForgotPassword}
				path={ROUTES.FORGOT_PASSWORD}
			/>
			<PublicRoute
				component={ForgotPhonePassword}
				path={ROUTES.FORGOT_PHONE_PASSWORD}
			/>
			<PublicRoute
				component={ViewProduct}
				path={ROUTES.VIEW_PRODUCT}
			/>
			<PublicRoute
				component={ViewShop}
				path={ROUTES.VIEW_SHOP}
			/>
			<PublicRoute
				component={ViewShopPublic}
				path={ROUTES.VIEW_SHOP_PUBLIC}
			/>
			<PromoterRoute
				component={PromoterDashboard}
				exact
				path={ROUTES.PROMOTER_DASHBOARD}
			/>
			<PromoterRoute
				component={PromoterProducts}
				exact
				path={ROUTES.PROMOTER_PRODUCTS}
			/>
			<PromoterRoute
				component={PromoterProductDetail}
				exact
				path={ROUTES.PROMOTER_PRODUCT_DETAIL}
			/>
			<ClientRoute
				component={UpgradeToPromoter}
				exact
				path={ROUTES.UPGRADE_TO_PROMOTER_ACCOUNT}
			/>
			<ClientRoute
				component={WishList}
				exact
				path={ROUTES.WISH_LIST}
			/>
			<ClientRoute
				component={UserAccount}
				exact
				path={ROUTES.ACCOUNT}
			/>
			<ClientRoute
				component={EditAccount}
				exact
				path={ROUTES.ACCOUNT_EDIT}
			/>
			<ClientRoute
				component={CheckOutStep1}
				path={ROUTES.CHECKOUT_STEP_1}
			/>
			<ClientRoute
				component={CheckOutStep2}
				path={ROUTES.CHECKOUT_STEP_2}
			/>
			<ClientRoute
				component={CheckOutStep3}
				path={ROUTES.CHECKOUT_STEP_3}
			/>
			<AdminRoute
				component={Dashboard}
				exact
				path={ROUTES.ADMIN_DASHBOARD}
			/>
			<AdminRoute
				component={Products}
				path={ROUTES.ADMIN_PRODUCTS}
			/>
			{<AdminRoute
				component={Categorys}
				path={ROUTES.ADMIN_CATEGORYS}
			/>}
			<AdminRoute
				component={AddProduct}
				path={ROUTES.ADD_PRODUCT}
			/>
			<AdminRoute
				component={AddCategory}
				path={ROUTES.ADD_CATEGORY}
			/>
			<AdminRoute
				component={EditProduct}
				path={`${ROUTES.EDIT_PRODUCT}/:id`}
			/>
			<AdminAdminRoute
				component={AdminAdminDashboard}
				exact
				path={ROUTES.ADMIN_ADMIN_DASHBOARD}
			/>
			<AdminAdminRoute
				component={AdminAdminUsers}
				exact
				path={ROUTES.ADMIN_ADMIN_USERS}
			/>
			<AdminRoute
				component={ShopAccount}
				exact
				path={ROUTES.SHOP_ACCOUNT}
			/>
			<AdminRoute
				component={EditShopAccount}
				exact
				path={ROUTES.SHOP_ACCOUNT_EDIT}
			/>
			<AdminAdminRoute
				component={AdminAdminShops}
				exact
				path={ROUTES.ADMIN_ADMIN_SHOPS}
			/>
			<AdminAdminRoute
				component={AdminAdminOrders}
				exact
				path={ROUTES.ADMIN_ADMIN_ORDERS}
			/>
			<PublicRoute component={PageNotFound} />
		</Switch>
	</Router>
);

export default AppRouter;
