import {
	ADD_PRODUCT_SUCCESS,
	REMOVE_PRODUCT_SUCCESS,
	EDIT_PRODUCT_SUCCESS,
	GET_PRODUCTS_SUCCESS,
	GET_ADMIN_PRODUCTS_SUCCESS,
	SEARCH_PRODUCT_SUCCESS,
	CLEAR_SEARCH_STATE,
	CLEAR_SHOP_PRODUCTS
} from '../../constants/constants';

const initState = {
	lastRefKey: null,	
	total: 0,	
	items: [],	
}

export default (state = {
	lastRefKey: null,
	total: 0,
	items: [],
	adminLastRefKey: null,	
	adminTotal: 0,	
	adminItems: [],
	searchedProducts: initState
}, action) => {
	switch (action.type) {
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.products]
			};
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				//: [...state.adminItems, action.payload],
				items: [...state.items, action.payload]
			};
		case EDIT_PRODUCT_SUCCESS:
			return {
				...state,
				adminItems: state.adminItems.map((product) => {
					if (product.id === action.payload.id) {
						return {
							...product,
							...action.payload.updates
						};
					}
					return product;
				}),
				items: state.items.map((product) => {
					if (product.id === action.payload.id) {
						return {
							...product,
							...action.payload.updates
						};
					}
					return product;
				})
			};
		case REMOVE_PRODUCT_SUCCESS:
			return {
				...state,
				items: state.items.filter(product => product.id !== action.payload),
				adminItems: state.adminItems.filter(product => product.id !== action.payload)
			};
		case CLEAR_SEARCH_STATE:
			return {
				...state,
				searchedProducts: initState
			}
		case SEARCH_PRODUCT_SUCCESS:
			return {
				...state,
				searchedProducts: {
					lastRefKey: action.payload.lastKey,
					total: action.payload.total,
					items: [...state.searchedProducts.items, ...action.payload.products]
				}
			}
		case GET_ADMIN_PRODUCTS_SUCCESS:
			return {
				...state,
				adminLastRefKey: action.payload.lastKey,
				adminTotal: action.payload.total,
				adminItems: [...state.adminItems, ...action.payload.products]
			};
		
						
		case CLEAR_SHOP_PRODUCTS:
			return {
				...state,
				adminLastRefKey: null,
				adminTotal: 0,
				adminItems: []
			}		
		default:
			return state;
	}
};
