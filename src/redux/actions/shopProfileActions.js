import {
	CLEAR_SHOP_PROFILE,
	SET_SHOP_PROFILE,	
	UPDATE_SHOP_PROFILE,
	UPDATE_SHOP_PROFILE_SUCCESS,
	CREATE_SHOP,
} from '../../constants/constants';

export const createShop = () => ({                        
	type: CREATE_SHOP,	
});

export const setShopProfile = shop => ({                        //profilereducer
	type: SET_SHOP_PROFILE,
	payload: shop
});

export const updateShopProfile = newShopProfile => ({           //profilesaga
	type: UPDATE_SHOP_PROFILE,
	payload: {
		updates: newShopProfile.updates,
		files: newShopProfile.files,
		credentials: newShopProfile.credentials
	}
});

export const updateShopProfileSuccess = updates => ({       	//profilereducer
	type: UPDATE_SHOP_PROFILE_SUCCESS,
	payload: updates
});

export const clearShopProfile = () => ({                        //profilereducer
	type: CLEAR_SHOP_PROFILE
});
