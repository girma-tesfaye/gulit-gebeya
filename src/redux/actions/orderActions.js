import { PLACE_ORDER , GET_ORDERS, GET_ORDERS_SUCCESS, CLEAR_ORDERS} from '../../constants/constants';


export const placeOrder = (order) => ({
	type: PLACE_ORDER,
	payload: order
});

export const getOrders = lastRef => ({				// action handled on orderSaga
	type: GET_ORDERS,
	payload: lastRef
});

export const getOrdersSuccess = orders => ({		// action handled on productReducer
	type: GET_ORDERS_SUCCESS,
	payload: orders
});

export const clearOrders = () => ({				// action handled on productReducer
	type: CLEAR_ORDERS
});