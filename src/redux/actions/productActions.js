import {
	ADD_PRODUCT,
	GET_ADMIN_PRODUCTS,
	ADD_PRODUCT_SUCCESS,
	CANCEL_GET_PRODUCTS,
	CLEAR_SEARCH_STATE,
	EDIT_PRODUCT,
	EDIT_PRODUCT_SUCCESS,
	GET_PRODUCTS,
	GET_PRODUCTS_SUCCESS,
	GET_ADMIN_PRODUCTS_SUCCESS,
	REMOVE_PRODUCT,
	REMOVE_PRODUCT_SUCCESS,
	SEARCH_PRODUCT,
	SEARCH_PRODUCT_SUCCESS,
	GET_SHOP_PRODUCTS,
	GET_SHOP_PRODUCTS_SUCCESS,
	CLEAR_SHOP_PRODUCTS,
	SEARCH_CATEGORY_PRODUCT,
	
	GET_SHOPS,
	GET_SHOPS_SUCCESS,
	CLEAR_SHOPS,

	GET_PRODUCTS_MASTER,
	GET_PRODUCTS_MASTER_SUCCESS,
	CLEAR_PRODUCTS_MASTER,
} from '../../constants/constants';


// get products actions
export const getProducts = lastRef => ({				// action handled on productSaga
	type: GET_PRODUCTS,
	payload: lastRef
});

export const getProductsSuccess = products => ({		// action handled on productReducer
	type: GET_PRODUCTS_SUCCESS,
	payload: products
});

export const cancelGetProducts = () => ({				// not handled
	type: CANCEL_GET_PRODUCTS
});

// add product actions
export const addProduct = product => ({					// action handled on productSaga
	type: ADD_PRODUCT,
	payload: product
});

export const addProductSuccess = product => ({			// action handled on productReducer
	type: ADD_PRODUCT_SUCCESS,
	payload: product
});

// edit product actions
export const editProduct = (id, updates) => ({			// action handled on productSaga
	type: EDIT_PRODUCT,
	payload: {
		id,
		updates
	}
});

export const editProductSuccess = updates => ({			// action handled on productReducer
	type: EDIT_PRODUCT_SUCCESS,
	payload: updates
});

// remove product actions
export const removeProduct = id => ({					// action handled on productSaga
	type: REMOVE_PRODUCT,
	payload: id
});

export const removeProductSuccess = id => ({			// action handled on productReducer
	type: REMOVE_PRODUCT_SUCCESS,
	payload: id
});

// search product actions
export const searchProduct = (searchKey) => ({			// action handled on productSaga
	type: SEARCH_PRODUCT,
	payload: {
		searchKey
	}
});

export const searchCategoryProduct = (category) => ({			// action handled on productSaga
	type: SEARCH_CATEGORY_PRODUCT,
	payload: {
		category
	}
});

export const searchProductSuccess = (products) => ({	// action handled on productReducer
	type: SEARCH_PRODUCT_SUCCESS,
	payload: products
});

export const clearSearchState = () => ({				// action handled on productReducer
	type: CLEAR_SEARCH_STATE
});

// get shops
export const getShops = payload => ({		// used		
	type: GET_SHOPS,
	payload: payload
});

export const getShopsSuccess = shops => ({	// used		
	type: GET_SHOPS_SUCCESS,
	payload: shops
});

export const clearShops = () => ({			// used		
	type: CLEAR_SHOPS
});

// get shop products(or admin products)
export const getShopProducts = payload => ({		// used		
	type: GET_SHOP_PRODUCTS,
	payload: payload
});

export const clearShopProducts = () => ({			// used		
	type: CLEAR_SHOP_PRODUCTS
});

export const getShopProductsSuccess = products => ({	// used		
	type: GET_SHOP_PRODUCTS_SUCCESS,
	payload: products
});

// get admin or shop products actions
export const getAdminProducts = adminLastRefKey => ({	// action handled on productSaga
	type: GET_ADMIN_PRODUCTS,
	payload: adminLastRefKey
});

export const getAdminProductsSuccess = products => ({		// action handled on productReducer
	type: GET_ADMIN_PRODUCTS_SUCCESS,
	payload: products
});

/* admin product read actions */

// get master products
export const getProductsMaster = payload => ({			// used	
	type: GET_PRODUCTS_MASTER,
	payload: payload
});

export const getProductsMasterSuccess = products => ({	// used	
	type: GET_PRODUCTS_MASTER_SUCCESS,
	payload: products
});

export const clearProductsMaster = () => ({				// used			
	type: CLEAR_PRODUCTS_MASTER
});


