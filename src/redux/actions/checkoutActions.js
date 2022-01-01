import {
	SET_CHECKOUT_SHIPPING_DETAILS,
	SET_CHECKOUT_PAYMENT_DETAILS,
	SET_PROMOTER_REFERRAL,
	RESET_CHECKOUT
} from '../../constants/constants';

export const setShippingDetails = details => ({
	type: SET_CHECKOUT_SHIPPING_DETAILS,
	payload: details
});

export const setPaymentDetails = details => ({
	type: SET_CHECKOUT_PAYMENT_DETAILS,
	payload: details
});

export const resetCheckout = () => ({
	type: RESET_CHECKOUT
});


export const setPromoterReferral = referral => ({
	type: SET_PROMOTER_REFERRAL,
	payload: referral
});
