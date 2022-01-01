import { SET_SHOP_PROFILE, 
	UPDATE_SHOP_PROFILE_SUCCESS, 
	CLEAR_SHOP_PROFILE } from '../../constants/constants';
// import profile from 'static/profile.jpg';
// import banner from 'static/banner.jpg';

// const initState = {
//   fullname: 'Pedro Juan',
//   email: 'juanpedro@gmail.com',
//   address: '',
//   mobile: {},
//   avatar: profile,
//   banner,
//   dateJoined: 1954234787348
// };

export default (state = {}, action) => {
	switch (action.type) {
		case SET_SHOP_PROFILE:
			return action.payload;
		case UPDATE_SHOP_PROFILE_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case CLEAR_SHOP_PROFILE:
			return {};
		default:
			return state;
	}
};
