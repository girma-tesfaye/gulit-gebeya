import { call, put } from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import { history } from '../../routers/AppRouter';

import {
	SIGNIN,
	SIGNUP,
	PHONE_SIGNIN,
	PHONE_SIGNUP,
	ON_AUTHSTATE_FAIL,
	SIGNIN_WITH_GOOGLE,
	SIGNIN_WITH_FACEBOOK,	
	RESET_PASSWORD,
	SIGNOUT,
	ON_AUTHSTATE_SUCCESS,
	SET_AUTH_PERSISTENCE
} from '../../constants/constants';

import { signInSuccess, signOutSuccess } from '../actions/authActions';
import { setAuthenticating, setAuthStatus } from '../actions/miscActions';

import { clearBasket, setBasketItems } from '../actions/basketActions';
import { setProfile, clearProfile } from '../actions/profileActions';
import { setShopProfile, clearShopProfile } from '../actions/shopProfileActions';
import { resetFilter } from '../actions/filterActions';
import { resetCheckout } from '../actions/checkoutActions';
import { clearOrders } from '../actions/orderActions';

import { initialUserSchema, nonPasswordProviderUserSchema } from '../../helpers/schema';


function* handleError(e) {
	const obj = { success: false, type: 'auth' };
	yield put(setAuthenticating(false));

	switch (e.code) {
		case 'auth/network-request-failed':
			yield put(setAuthStatus({ ...obj, message: 'Network error has occured. Please try again.' }));
			break;
		case 'auth/email-already-in-use':
			yield put(setAuthStatus({ ...obj, message: 'Email is already in use. Please use another email' }));
			break;
		case 'auth/wrong-password':
			yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
			break;
		case 'auth/user-not-found':
			yield put(setAuthStatus({ ...obj, message: 'Incorrect email or password' }));
			break;
		case 'auth/reset-password-error':
			yield put(setAuthStatus({ ...obj, message: 'Failed to send password reset email. Did you type your email correctly?' }));
			break;
		default:
			yield put(setAuthStatus({ ...obj, message: e.message }));
			break;
	}
}

function* handlePhoneAuthError(e) {
	const obj = { success: false, type: 'auth' };
	yield put(setAuthenticating(false));

	switch (e.code) {
		case 'auth/network-request-failed':
			yield put(setAuthStatus({ ...obj, message: 'Network error has occured. Please try again.' }));
			break;
		case 'auth/email-already-in-use':
			yield put(setAuthStatus({ ...obj, message: 'Phone number is already in use. Please use another number' }));
			break;
		case 'auth/wrong-password':
			yield put(setAuthStatus({ ...obj, message: 'Incorrect phone number or password' }));
			break;
		case 'auth/user-not-found':
			yield put(setAuthStatus({ ...obj, message: 'Incorrect phone number or password' }));
			break;
		case 'auth/reset-password-error':
			yield put(setAuthStatus({ ...obj, message: 'Failed to send password reset text. Did you type your phone number correctly?' }));
			break;
		default:
			yield put(setAuthStatus({ ...obj, message: e.message }));
			break;
	}
}

function* initRequest() {
	yield put(setAuthenticating());
	yield put(setAuthStatus({}));
}

function* authSaga({ type, payload }) {
	switch (type) {
		case SIGNUP:
			try {
				yield initRequest();
				const ref = yield call(firebase.createAccount, payload.email, payload.password);
				const fullname = payload.fullname.split(' ').map(name => name[0].toUpperCase().concat(name.substring(1))).join(' ');
				const user = initialUserSchema(ref, payload, fullname);				
				yield call(firebase.addUser, ref.user.uid, user);				
				yield put(setProfile(user));

				if (user.role === 'ADMIN') {
					const snapshot_shop = yield call(firebase.getShop, payload.uid);
					if (snapshot_shop.data()) { 
						const userShop = snapshot_shop.data();
						yield put(setShopProfile(userShop));
					} else {
						yield put(setShopProfile('NO_SHOP'));
					}
					// also here attach a listner for undelivered seller order and seller private doc which will detach when the user log out
				}
				yield put(setBasketItems(user.basket));	
				yield put(setAuthenticating(false));
			} catch (e) {
				yield handleError(e);
			}
			break;
		case PHONE_SIGNUP:
			try {
				yield initRequest();
				const ref = yield call(firebase.phoneSignUp, payload.phone, payload.password);
				const fullname = payload.fullname.split(' ').map(name => name[0].toUpperCase().concat(name.substring(1))).join(' ');
				const user = initialUserSchema(ref, payload, fullname);				
				yield call(firebase.addUser, ref.user.uid, user);				
				yield put(setProfile(user));

				if (user.role === 'ADMIN') {
					const snapshot_shop = yield call(firebase.getShop, payload.uid);
					if (snapshot_shop.data()) { 
						const userShop = snapshot_shop.data();
						yield put(setShopProfile(userShop));
					} else {
						yield put(setShopProfile('NO_SHOP'));
					}
					// also here attach a listner for undelivered seller order and seller private doc which will detach when the user log out
				}
				yield put(setBasketItems(user.basket));	
				yield put(setAuthenticating(false));
			} catch (e) {
				yield handleError(e);
			}
			break;
		case SIGNIN:
			try {
				yield initRequest();
				yield call(firebase.signIn, payload.email, payload.password);
			} catch (e) {
				if(payload.provider == 'email'){
					yield handleError(e);
				}else{
					yield handlePhoneAuthError(e);
				}				
			}
			break;
		case PHONE_SIGNIN:
			try {
				yield initRequest();
				yield call(firebase.phoneSignIn, payload.phone, payload.password);
			} catch (e) {
				if(payload.provider == 'phone'){
					yield handleError(e);
				}else{
					yield handlePhoneAuthError(e);
				}				
			}
			break;
		case SIGNIN_WITH_GOOGLE:
			try {
				yield initRequest();
				yield call(firebase.signInWithGoogle);
			} catch (e) {
				yield handleError(e);
			}
			break;
		case SIGNIN_WITH_FACEBOOK:
			try {
				yield initRequest();
				yield call(firebase.signInWithFacebook);
			} catch (e) {
				yield handleError(e);
			}
			break;
		case ON_AUTHSTATE_SUCCESS:
			/* yield put(setAuthStatus({
				success: true,
				type: 'auth',
				message: 'Successfully signed in. Redirecting...'
			})); */
			yield call(history.push, '/');

			const snapshot = yield call(firebase.getUser, payload.uid);

			if (snapshot.data()) { 										// if user exists in database
				const user = snapshot.data();
				yield put(setProfile(user));
				yield put(setBasketItems(user.basket));

				if (user.role === 'ADMIN') {
					const snapshot_shop = yield call(firebase.getShop, payload.uid);
					if (snapshot_shop.data()) { 												
						const userShop = snapshot_shop.data();
						yield put(setShopProfile(userShop));
					} else {
						yield put(setShopProfile('NO_SHOP'));
					}
					// also here attach a listner for undelivered seller order and seller private doc which will detach when the user log out
				}

				yield put(signInSuccess({					
					id: payload.uid,
					role: user.role,
					provider: payload.providerData[0].providerId
				}));

			} else if (payload.providerData[0].providerId !== 'password' && !snapshot.data()) {
				
				// add the user if auth provider is not password				
				const user = nonPasswordProviderUserSchema(payload);				
				yield call(firebase.addUser, payload.uid, user);
				yield put(setProfile(user));
				yield put(setBasketItems(user.basket));   

				if (user.role === 'ADMIN') {
					const snapshot_shop = yield call(firebase.getShop, payload.uid);
					if (snapshot_shop.data()) { 									
						const userShop = snapshot_shop.data();
						yield put(setShopProfile(userShop));
					} else {
						yield put(setShopProfile('NO_SHOP'));
					}
					// also here attach a listner for undelivered seller order and seller private doc which will detach when the user log out
				}

				yield put(signInSuccess({								
					id: payload.uid,
					role: user.role,
					provider: payload.providerData[0].providerId
				}));
			}
			yield put(setAuthenticating(false));
			break;
		case ON_AUTHSTATE_FAIL:
			yield put(clearProfile());
			yield put(clearShopProfile());
			yield put(signOutSuccess());
			break;
		case SIGNOUT:
			try {
				yield initRequest();
				yield call(firebase.signOut);
				yield put(clearBasket());
				yield put(clearProfile());
				yield put(clearShopProfile());
				yield put(resetFilter());
				yield put(clearOrders());
				yield put(resetCheckout());
				yield put(signOutSuccess());
				yield put(setAuthenticating(false));
				yield call(history.push, '/signin');
			} catch (e) {
				console.log(e);
			}
			break;
		case RESET_PASSWORD:
			try {
				yield initRequest();
				yield call(firebase.passwordReset, payload);
				yield put(setAuthStatus({
					success: true,
					type: 'reset',
					message: 'Password reset email has been sent to your provided email.'
				}));
				yield put(setAuthenticating(false));
			} catch (e) {
				handleError({ code: 'auth/reset-password-error' });
			}
			break;
		case SET_AUTH_PERSISTENCE:
			try {
				yield call(firebase.setAuthPersistence);
			} catch (e) {
				console.log(e);
			}
			break;
		default:
			return;
	}
}

export default authSaga;