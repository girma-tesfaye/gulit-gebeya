/* eslint-disable indent */
/*import {
	ADD_CATEGORY,
	GET_CATEGORYS,
	GET_ADMIN_CATEGORYS,
	//EDIT_CATEGORY,
	
	//REMOVE_CATEGORY,
} from '../../constants/constants';
import firebase from '../../firebase/firebase';
import { all, call, put, select } from 'redux-saga/effects';
import { setLoading, setRequestStatus } from '../actions/miscActions';
import {
	addCategorySuccess,
    //editCategorySuccess, 
    getCategorysSuccess,
   // getAdminCategorysSuccess,
	//removeCategorySuccess,
} from '../actions/categoryActions';
import { useSelector } from 'react-redux';

function* initRequest() {
	yield put(setLoading(true));
	yield put(setRequestStatus(null));
}

function* handleError(e) {
	yield put(setLoading(false));
	yield put(setRequestStatus(e));
	console.log('ERROR: ', e);
}

function* categorySaga({ type, payload }) {
	switch (type) {
		case GET_CATEGORYS:
			try {
				yield initRequest();
				const result = yield call(firebase.getUtilsUi);
					console.log(result);
				if (!result) {									
					yield put(setLoading(false));
					yield put(setRequestStatus('No items found.'));
					console.log('ERROR','No items found.');
				} else {
					yield put(getCategorysSuccess(result));
					yield put(setRequestStatus(''));
				}
				// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
				yield put(setLoading(false));
			} catch (e) {
				console.log(e);
				yield handleError(e);
			}
			break;
		
		case ADD_CATEGORY:
			try {
				yield initRequest();
				console.log(result);
				const { catagoriesCollection } = payload;
				 const key = yield call(firebase.generateKey);
				const downloadURL = yield call(firebase.storeCatagories,key, `categorys/${key}/catagories`, payload.catagories); 
				const catagories = { id: key, url: downloadURL };
				let catagoryies = [];

				if (catagoriesCollection.length !== 0) {
					const catagoriesKeys = yield all(catagoriesCollection.map(() => firebase.generateKey));
					const catagoriesUrls = yield all(catagoriesCollection.map((texts, i) => firebase.storeCatagories(catagoriesKeys[i](), `categorys/${key}/catagoriesCollections`, texts.file)));
					catagoryies = catagoriesUrls.map((url, i) => ({
						id: catagoriesKeys[i](),
						url
					}));
				}

				const category = {
					...payload,
					catagories: downloadURL,
					catagoriesCollection: [catagories, ...catagoryies]
				};

				yield call(firebase.addCategory, key, category);				
				yield call(firebase.addCategoryToShop,userId,key,category)   // this code is added by mintesnot to add the product to shop
				yield put(addCategorySuccess({
					id: key,
					...category
				}));
				
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				
			
			break;
			 case GET_ADMIN_CATEGORYS:
				console.log('i am get admin categorys');
				try {console.log('i am get admin categorys');
					yield initRequest();
					const state = yield select();
					const userId = state.auth.id;
					const result = yield call(firebase.getAdmincategorys, payload , userId);
					console.log(result);
					if (result.categorys.length === 0) {									
						yield put(setLoading(false));
						yield put(setRequestStatus('No items found.'));
						console.log('ERROR','No items found.');
					} else {
						yield put(getAdminCategorysSuccess({
							categorys: result.categorys,
							lastKey: result.lastKey ? result.lastKey : state.categorys.lastRefKey,
							total: result.total ? result.total : state.categorys.total
						}));
						yield put(setRequestStatus(''));
					}
					// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
					yield put(setLoading(false));
				} catch (e) {
					console.log(e);
					yield handleError(e);
				}
				break;}*/
		/*case EDIT_CATEGORY:
			try {
				yield initRequest();

				const { catagories, catagoriesCollection } = payload.updates;
				let newUpdates = { ...payload.updates };

				if (catagories.constructor === File && typeof catagories === 'object') {
					try {
						yield call(firebase.deleteCatagories, payload.id);
					} catch (e) {
						console.error('Failed to delete catagories ', e);
					}

					const url = yield call(firebase.storeCatagories, payload.id, 'categorys', catagories);
					newUpdates = { ...newUpdates, catagories: url };
				}

				if (catagoriesCollection.length > 1) {
					const existingUploads = [];
					const newUploads = [];

					catagoriesCollection.forEach((texts) => {
						if (texts.file) {
							newUploads.push(texts);
						} else {
							existingUploads.push(texts);
						}
					});

					const catagoriesKeys = yield all(newUploads.map(() => firebase.generateKey));
					const catagoriesUrls = yield all(newUploads.map((texts, i) => firebase.storeCatagories(catagoriesKeys[i](), 'categorys', texts.file)));
					const catagoryies = catagoriesUrls.map((url, i) => ({
						id: catagoriesKeys[i](),
						url
					}));
					newUpdates = { ...newUpdates, catagoriesCollection: [...existingUploads, ...catagoryies] };
				} else {
					newUpdates = { ...newUpdates, catagoriesCollection: [{ id: new Date().getTime(), url: newUpdates.catagories }] };
					}

				yield call(firebase.editCategory, payload.id, newUpdates);
				yield put(editCategorySuccess({
					id: payload.id,
					updates: newUpdates
				}));
				
				yield put(setLoading(false));
			} catch (e) {
				yield handleError(e);
				
			}
			break;
		case REMOVE_CATEGORY:
			try {
				const state = yield select();
				const userId = state.auth.id;
				yield initRequest();
				yield call(firebase.removeCategory, payload);
				yield call(firebase.removeAdminCategory, payload, userId);

				yield put(removeCategorySuccess(payload));
				yield put(setLoading(false));
				
			} catch (e) {
				yield handleError(e);
				
			}
			break; 
		
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default categorySaga;*/
