import {
	GET_REVIEWS_SUCCESS,
	ADD_REVIEW_SUCCESS,	
    CLEAR_REVIEWS,
} from '../../constants/constants';

const initState = {
	lastRefKey: null,	
	total: 0,	
	items: [],	
}

export default (state = initState, action) => {
	switch (action.type) {
		case GET_REVIEWS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.reviews]
			};
		case ADD_REVIEW_SUCCESS:
			return {
				...state,				
				items: [...state.items.filter(item => item.id !== action.payload.id), action.payload]
			};
        case CLEAR_REVIEWS:
            return {
                lastRefKey: null,	
	            total: 0,	
	            items: [],
            };
		default:
			return state;
	}
};