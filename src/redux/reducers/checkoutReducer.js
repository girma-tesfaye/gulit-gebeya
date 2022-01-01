import {
	SET_CHECKOUT_SHIPPING_DETAILS,
	SET_CHECKOUT_PAYMENT_DETAILS,
	SET_PROMOTER_REFERRAL,
	RESET_CHECKOUT
} from '../../constants/constants';

const defaultState = {
	shipping: {},
	payment: {
		type: 'paypal',
		data: {}
	},
	promoterReferral: {
		id:'',
		promoterId:'',
		date: null,
		fromWhere: '',
	}
};

export default (state = defaultState, action) => {
	switch (action.type) {
		case SET_CHECKOUT_SHIPPING_DETAILS:
			return {
				...state,
				shipping: action.payload
			};
		case SET_CHECKOUT_PAYMENT_DETAILS:
			return {
				...state,
				payment: action.payload
			};
		case SET_PROMOTER_REFERRAL:
			return {
				...state,
				promoterReferral: action.payload
			};
		case RESET_CHECKOUT:
			return defaultState;
		default:
			return state;
	}
};
