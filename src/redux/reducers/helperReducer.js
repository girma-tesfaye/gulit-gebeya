import {
	GET_UI_UTILLS_SUCCESS,
	ADD_BANNERS_CHANGE_UI,
	ADD_BRANDS_CHANGE_UI,
	ADD_CATEGORIES_CHANGE_UI,
	ADD_SIZES_CHANGE_UI,
	ADD_SPECIFICATION_TABLE
} from '../../constants/constants';

const initial_states =  {
	ui:{
		banners:[],
    	brands:['jhjh','hkhhkhk'],
    	categories:[],
    	sizes:[]
	},
	changeUi:{
		banners:[],
		brands:[],
		categories:[],
		sizes:[]
	},
	productid:{
		table:[],
	},
}

export default (state =	initial_states,
 action) => {
	switch (action.type) {
		case GET_UI_UTILLS_SUCCESS:
			return {
				...state,
                ui:action.payload
			};
		case ADD_BANNERS_CHANGE_UI:
			return {
				...state,
                changeUi:{
					...state.changeUi,
					banners:[...state.changeUi.banners,action.payload]
				}
			};
		case ADD_BRANDS_CHANGE_UI:
			return {
				...state,
                ui:{
					...state.ui,
					brands:state.ui.brands.some((brand) => brand === action.payload)?
						[...state.ui.brands]	
						:[...state.ui.brands,action.payload]
				}
			};
		case ADD_CATEGORIES_CHANGE_UI:
			return {
				...state,
                ui:{
					...state.ui,
					categories:
						state.ui.categories.some((category) => category.main === action.payload.main)?
						(state.ui.categories.map((category) => {
							if (category.main === action.payload.main) {
								return {
									...category,
									sub:[...category.sub, ...action.payload.sub]
								};
							}else{
								return category;
							}
						}					
						)):([...state.ui.categories,action.payload])			 
						 
				}
			};
		case ADD_SIZES_CHANGE_UI:
			return {
				...state,
                ui:{
					...state.ui,
					sizes:state.ui.sizes.some((size) => size === action.payload)?
						[...state.ui.sizes]	
						:[...state.ui.sizes,action.payload]
				}
			};	
			case ADD_SPECIFICATION_TABLE:
				return {
					...state,
					productid:{
						...state.productid,
						table:([...state.productid.table,action.payload])			 
							 
					}
				};				
        /* case CLEAR_ADMIN_ADMIN_USERS:
			return {
				...state,
                ui:{}               
			}	 */			
		default:
			return state;
	}
};