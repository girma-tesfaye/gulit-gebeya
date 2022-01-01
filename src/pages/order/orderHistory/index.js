import React, {  useEffect, useState} from 'react';
import { getOrders } from '../../../redux/actions/orderActions';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../../helpers/CircularProgress';
import './index.css';
import { useHistory} from 'react-router-dom';
import { displayDate } from '../../../helpers/utils';
import { setLoading } from '../../../redux/actions/miscActions';
import MessageDisplay from '../../../helpers/MessageDisplay';


const OrderHistory = () => {
    const orders = useSelector(state => state.orders);    
    const isLoading = useSelector(state => state.app.loading);
    const requestStatus = useSelector(state => state.app.requestStatus); 
    const dispatch = useDispatch();
    const history = useHistory(); 
    
    const [isFetching, setFetching] = useState(false);

    const fetchOrders = () => {
		setFetching(true);
		dispatch(getOrders(orders.lastRefKey));
	};

    useEffect(() => {
		if (orders.items.length === 0 || !orders.lastRefKey) {
			fetchOrders();
		}

		window.scrollTo(0, 0);
		return () => dispatch(setLoading(false));
	}, []); 

    useEffect(() => {
		setFetching(false);
	}, [orders.lastRefKey]);
    console.log(orders) 
    
    return orders.items.length === 0 && !isLoading && !orders.lastRefKey ? (
                <MessageDisplay
                    message={requestStatus ? requestStatus : 'Failed to fetch items.'}
                />
            ) : requestStatus ? (
                <MessageDisplay
                    message={requestStatus}
                    action={fetchOrders}
                    buttonLabel="Try Again"
                />
            ):
            (
        <div className='content_tabel'>
            <h1>Order History</h1>
            {orders.items.length === 0 ? (
                <CircularProgress></CircularProgress>
            ) /* : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) */ : (
                <table className="custom_table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.items.map((order) => (
                    <tr key={order.orderId}>
                        <td>{order.orderId}</td>
                        <td>{displayDate(order.orderedAt)/* .substring(0, 10) */}</td>
                        <td>{order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? displayDate(order.paidAt)/* .substring(0, 10) */ : 'No'}</td>
                        <td>
                        {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : 'No'}
                        </td>
                        <td>
                        <button
                            type="button"
                            className="small"
                            onClick={() => {
                                history.push(`/order/${order.orderId}`);
                            }}
                        >
                            Details
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}

            {orders.total > orders.items.length && (
					<div className="d-flex-center padding-l">
						<button
							className="button button-small"
							disabled={isFetching}
							onClick={fetchOrders}
						>
							{isFetching ? 'Fetching Orders...' : 'Show More Orders'}
						</button>
					</div>
				)
            }
        </div>
    );
}

export default OrderHistory;