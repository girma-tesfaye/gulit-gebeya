import {
	GET_PROMOTER_PRODUCTS_SUCCESS,
	CLEAR_PROMOTER_PRODUCTS,
	REMOVE_PROMOTER_PRODUCT_SUCCESS
} from '../../constants/constants';


const initState = {
	lastRefKey: null,
	total: 0,
	items: [],
};

export default (state = {
	promoterProducts: initState,		
}, action) => {
	switch (action.type) {
		case GET_PROMOTER_PRODUCTS_SUCCESS:
			return {
				...state,
				promoterProducts:{
					lastRefKey: action.payload.lastKey,
					total: action.payload.total,
					items: [...state.promoterProducts.items, ...action.payload.promoterProducts]
				}
			};
        case CLEAR_PROMOTER_PRODUCTS:
			return {
				...state,
				promoterProducts: initState				
			};
		case REMOVE_PROMOTER_PRODUCT_SUCCESS		:
			return {
				...state,
				promoterProducts: {
					...state.promoterProducts,
					items: state.promoterProducts.items.filter(product => product.promoterProductId !== action.payload),
					total: (state.promoterProducts.total - 1),
				}				
			};				
		default:
			return state;
	}
};
