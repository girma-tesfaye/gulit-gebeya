import { GET_UI_UTILLS, 
	GET_UI_UTILLS_SUCCESS,
	ADD_BANNERS_CHANGE_UI,
	ADD_BRANDS_CHANGE_UI,
	ADD_CATEGORIES_CHANGE_UI,
	ADD_SIZES_CHANGE_UI,
	ADD_UI_TO_CLOUD,
	ADD_SPECIFICATION_TABLE, 
} from '../../constants/constants';



export const getUiUtills = () => ({
	type: GET_UI_UTILLS,
	
});

export const getUiUtillsSuccess = ui => ({		
	type: GET_UI_UTILLS_SUCCESS,
	payload: ui
});

export const addBannersChangeUi = banners => ({		
	type: ADD_BANNERS_CHANGE_UI,
	payload: banners
});

export const addBrandsChangeUi = brands => ({		
	type: ADD_BRANDS_CHANGE_UI,
	payload: brands
});

export const addCategoriesChangeUi = categories => ({		
	type: ADD_CATEGORIES_CHANGE_UI,
	payload: categories
});

export const addSizesChangeUi = sizes => ({		
	type: ADD_SIZES_CHANGE_UI,
	payload: sizes
});

export const addUtilsUiToCloud = ui => ({		
	type: ADD_UI_TO_CLOUD,
	payload: ui
});

export const addSpecificationTable = table => ({		
	type: ADD_SPECIFICATION_TABLE,
	payload: table
});

/* export const clearAdminAdminUsers = () => ({				
	type: CLEAR_ADMIN_ADMIN_USERS
}); */

