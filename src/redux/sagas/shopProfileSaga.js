import { call, put, select } from 'redux-saga/effects';
import firebase from '../../firebase/firebase';
import { history } from '../../routers/AppRouter';
import { UPDATE_SHOP_PROFILE, CREATE_SHOP } from '../../constants/constants';
import { updateShopProfileSuccess } from '../actions/shopProfileActions';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import { displayActionMessage } from '../../helpers/utils';
import { setShopProfile } from '../actions/shopProfileActions';
import { SHOP_ACCOUNT, SHOP_ACCOUNT_EDIT } from '../../constants/routes';
import defaultShopAvatar from '../../images/defaultAvatar.jpg';
import defaultShopBanner from '../../images/defaultBanner.jpg';
import defaultShopDisplay from '../../images/defaultBanner.jpg';
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

function* profileSaga({ type, payload }) {
	switch (type) {
		case CREATE_SHOP:
			try {
				yield initRequest();
				const snapshot_shop = yield call(firebase.getShop, firebase.auth.currentUser.uid);

				if (snapshot_shop.data()) { // if user shop exists in database
					const userShop = snapshot_shop.data();
					yield put(setShopProfile(userShop));
					yield handleAction(SHOP_ACCOUNT, `Shop Already Created!`, 'error');
					yield put(setLoading(false));

				} else {
					const userShop = {						
						shopName: '',
						shopAvatar: defaultShopAvatar,
						shopBanner: defaultShopBanner,
						shopDisplay: defaultShopDisplay,
						shopEmail: '',
						shopMobile: { data: {} },
						shopAddress: '',
						shopDetail: '',	

						shopCitys: [],	
						shopCategories: [],
						keywords: ['orginal'],

						shopOwner: firebase.auth.currentUser.uid,
						shopDateCreated: app.firestore.FieldValue.serverTimestamp() || new Date().getTime(),

						favoriteProducts:[],	
						favoriteShops:[],
						favoriteCategories:[],
						wishlist:[],						
					};
					yield call(firebase.addShop, firebase.auth.currentUser.uid, userShop);
					yield put(setShopProfile(userShop));
					yield handleAction(SHOP_ACCOUNT_EDIT, 'Shop Created Succesfully! Update Your Shop Profile', 'success');
					yield put(setLoading(false));
				}
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `failed to create shop: ${e.message_}`, 'error');
			}
			break;
		case UPDATE_SHOP_PROFILE:
			try {
				const state = yield select();
				const { email, password } = payload.credentials;
				const { shopAvatarFile, shopBannerFile, shopDisplayFile } = payload.files;
				console.log(payload)
				yield put(setLoading(true));

				// if email & password exist && the email has been edited
				// update the email
				/* if (email && password && email !== state.profile.email) {
					yield call(firebase.updateEmail, password, email);
				} */

				if (shopAvatarFile || shopBannerFile || shopDisplayFile) {
					const bannerURL = shopBannerFile ? yield call(firebase.storeImage, firebase.auth.currentUser.uid, 'shopbanner', shopBannerFile) : payload.updates.shopBanner;
					const avatarURL = shopAvatarFile ? yield call(firebase.storeImage, firebase.auth.currentUser.uid, 'shopavatar', shopAvatarFile) : payload.updates.shopAvatar;
					const displayURL = shopDisplayFile ? yield call(firebase.storeImage, firebase.auth.currentUser.uid, 'shopdisplay', shopDisplayFile) : payload.updates.shopDisplay;
					const updates = { ...payload.updates, shopAvatar: avatarURL, shopBanner: bannerURL, shopDisplay: displayURL };

					yield call(firebase.updateShopProfile, firebase.auth.currentUser.uid, updates);
					yield put(updateShopProfileSuccess(updates));
				} else {
					yield call(firebase.updateShopProfile, firebase.auth.currentUser.uid, payload.updates);
					yield put(updateShopProfileSuccess(payload.updates));
				}
				yield put(setLoading(false));
				yield call(history.push, SHOP_ACCOUNT);
				yield call(displayActionMessage, 'Shop Profile Updated Successfully!', 'success');
			} catch (e) {
				console.log(e);
				yield put(setLoading(false));
				if (e.code === 'auth/wrong-password') {
					yield call(displayActionMessage, 'Wrong password, shop profile update failed :(', 'error');
				} else {
					yield call(displayActionMessage, `:( Failed to update profile. ${e.message ? e.message : ''}`, 'error');
					console.log(e.message)
				}
			}
		default:
			return;
	}
}

export default profileSaga;
