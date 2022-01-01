/* import {
	ADD_CATEGORY_SUCCESS,
	//EDIT_CATEGORY_SUCCESS,
	GET_CATEGORYS_SUCCESS,
	GET_ADMIN_CATEGORYS_SUCCESS,
	//REMOVE_CATEGORY_SUCCESS,
} from '../../constants/constants';

const initState = {
	ui:{},	
}

export default (state = {
	ui:{},	
}, action) => {
	switch (action.type) {
		case GET_CATEGORYS_SUCCESS:
			return {
				...state,
				ui:action.payload,
			};

			case ADD_CATEGORY_SUCCESS:
			return {
				...state,
				 ui:action.payload,
			};

		case GET_ADMIN_CATEGORYS_SUCCESS:
			return {
				...state,
				ui: [...state.categorys, ...action.payload.categorys]
			};
		
		case SEARCH_CATEGORY_SUCCESS:
			return {
				...state,
				searchedcategorys: {
					lastRefKey: action.payload.lastKey,
					total: action.payload.total,
					items: [...state.searchedProducts.items, ...action.payload.products]
				}
			} 
		case CLEAR_SEARCH_STATE:
			return {
				...state,
				searchedProducts: initState
			}
		case REMOVE_CATEGORY_SUCCESS:
			return {
				...state,
				items: state.items.filter(category => category.id !== action.payload),
				adminItems: state.adminItems.filter(category => category.id !== action.payload)
			}
		case EDIT_CATEGORY_SUCCESS:
			return {
				...state,
				items: state.items.map((category) => {
					if (category.id === action.payload.id) {
						return {
							...category,
							...action.payload.updates
						};
					}
					return category;
				})
			}; 
		default:
			return state;
	}
};*/
