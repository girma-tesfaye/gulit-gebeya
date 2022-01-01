import {
	ADD_CATEGORY,
	ADD_CATEGORY_SUCCESS,
	GET_CATEGORYS,
	GET_CATEGORYS_SUCCESS,
	/*CANCEL_GET_CATEGORYS,
	EDIT_CATEGORY,
	EDIT_CATEGORY_SUCCESS,
	GET_ADMIN_CATEGORYS,
	
	GET_ADMIN_CATEGORYS_SUCCESS,
	REMOVE_CATEGORY,
	REMOVE_CATEGORY_SUCCESS, */
	//SEARCH_CATEGORY,
	//SEARCH_CATEGORY_SUCCESS
} from '../../constants/constants';

export const getCategorys = () => ({
	type: GET_CATEGORYS,
});

export const getCategorysSuccess = categorys => ({
	type: GET_CATEGORYS_SUCCESS,
	payload: categorys
});



export const addCategory = category => ({
	type: ADD_CATEGORY,
	payload: category
});

export const addCategorySuccess = category => ({
	type: ADD_CATEGORY_SUCCESS,
	payload: category
});

/* export const getAdminCategorys = adminLastRefKey => ({
	type: GET_ADMIN_CATEGORYS,
	payload: adminLastRefKey
}); 

export const getAdminCategorysSuccess = categorys => ({
	type: GET_ADMIN_CATEGORYS_SUCCESS,
	payload: categorys
});
 export const cancelGetCategorys = () => ({
	type: CANCEL_GET_CATEGORYS
}); 



export const searchProduct = (searchKey) => ({
	type: SEARCH_PRODUCT,
	payload: {
		searchKey
	}
});

export const searchProductSuccess = (products) => ({
	type: SEARCH_PRODUCT_SUCCESS,
	payload: products
});

export const clearSearchState = () => ({
	type: CLEAR_SEARCH_STATE
});



export const removeCategory = id => ({
	type: REMOVE_CATEGORY,
	payload: id
});

export const removeCategorySuccess = id => ({
	type: REMOVE_CATEGORY_SUCCESS,
	payload: id
});

export const editCategory = (id, updates) => ({
	type: EDIT_CATEGORY,
	payload: {
		id,
		updates
	}
});

export const editCategorySuccess = updates => ({
	type: EDIT_CATEGORY_SUCCESS,
	payload: updates
});*/
