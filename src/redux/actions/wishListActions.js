import {
	ADD_TO_WISHLIST,
	REMOVE_FROM_WISHLIST,
	CLEAR_WISHLIST,
    SET_WISHLIST_ITEMS,
	GET_WISHLIST
	} from '../../constants/constants';

export const setWishListItems = (items) => ({
    type: SET_WISHLIST_ITEMS,
    payload: items
});

export const addToWishList = product => ({
	type: 	ADD_TO_WISHLIST,
	payload: product
});

export const removeFromWishList = id => ({
	type: REMOVE_FROM_WISHLIST,
	payload: id
});

export const clearWishList = () => ({
	type: CLEAR_WISHLIST
});

export const getWishList = () => ({
    type: GET_WISHLIST
});
