import { GET_ADMIN_ADMIN_USERS, CLEAR_ADMIN_ADMIN_USERS, GET_ADMIN_ADMIN_USERS_SUCCESS } from '../../constants/constants';



export const getAdminAdminUsers = (usersPayload) => ({				
	type: GET_ADMIN_ADMIN_USERS,
	payload: usersPayload
});

export const getAdminAdminUsersSuccess = users => ({		// action handled on productReducer
	type: GET_ADMIN_ADMIN_USERS_SUCCESS,
	payload: users
});

export const clearAdminAdminUsers = () => ({				
	type: CLEAR_ADMIN_ADMIN_USERS
});

