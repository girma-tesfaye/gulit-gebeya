import {
	GET_ADMIN_ADMIN_USERS_SUCCESS,
    CLEAR_ADMIN_ADMIN_USERS
} from '../../constants/constants';


export default (state = {
	users:{
        lastRefKey: null,
	    total: 0,
	    items: [],
    }	
}, action) => {
	switch (action.type) {
		case GET_ADMIN_ADMIN_USERS_SUCCESS:
			return {
				...state,
                users:{
                    lastRefKey: action.payload.lastKey,
                    total: action.payload.total,
                    items: [...state.users.items, ...action.payload.users]
                }
			};
        case CLEAR_ADMIN_ADMIN_USERS:
			return {
				...state,
                users:{
                    lastRefKey: null,
                    total: 0,
                    items: []
                }
			}				
		default:
			return state;
	}
};