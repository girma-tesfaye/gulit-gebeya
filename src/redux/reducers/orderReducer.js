import {
	GET_ORDERS_SUCCESS,
    CLEAR_ORDERS
} from '../../constants/constants';


export default (state = {
	lastRefKey: null,
	total: 0,
	items: [],	
}, action) => {
	switch (action.type) {
		case GET_ORDERS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.orders]
			};
        case CLEAR_ORDERS:
			return {
				...state,
				lastRefKey: null,
				total: 0,
				items: []
			}				
		default:
			return state;
	}
};
