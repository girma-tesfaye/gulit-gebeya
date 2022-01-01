import {
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
	CLEAR_WISHLIST,
    SET_WISHLIST_ITEMS,
} from '../../constants/constants';

export default (state = [], action) => {
	switch (action.type) {
        case SET_WISHLIST_ITEMS:
			return action.payload;
		case ADD_TO_WISHLIST:
			return state.some(product => product.id === action.payload.id)
				? state
				: [...state, action.payload];
		case REMOVE_FROM_WISHLIST:
			return state.filter(product => product.id !== action.payload);
		case CLEAR_WISHLIST:
			return [];
		default:
			return state;
	}
};
