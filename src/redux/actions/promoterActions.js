import {
	PLACE_PROMOTER_PRODUCT,
	GET_PROMOTER_PRODUCTS,
	GET_PROMOTER_PRODUCTS_SUCCESS,
	CLEAR_PROMOTER_PRODUCTS,
	REMOVE_PROMOTER_PRODUCT,
	REMOVE_PROMOTER_PRODUCT_SUCCESS
} from '../../constants/constants';


export const placePromoterProduct = (product) => ({
	type: PLACE_PROMOTER_PRODUCT,
	payload: product
});

export const getPromoterProducts = lastRef => ({				
	type: GET_PROMOTER_PRODUCTS,
	payload: lastRef
});

export const getPromoterProductsSuccess = promoterProducts => ({		
	type: GET_PROMOTER_PRODUCTS_SUCCESS,
	payload: promoterProducts
});

export const clearPromoterProducts = () => ({				
	type: CLEAR_PROMOTER_PRODUCTS
});

// remove product actions
export const removePromoterProduct = id => ({					// used
	type: REMOVE_PROMOTER_PRODUCT,
	payload: id
});

export const removePromoterProductSuccess = id => ({			// used
	type: REMOVE_PROMOTER_PRODUCT_SUCCESS,
	payload: id
});