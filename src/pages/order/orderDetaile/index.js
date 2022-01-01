import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useParams, useHistory, Link, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
//import ImageLoader from '../../helpers/ImageLoader';
//import ProductFeatured from '../../components/product/ProductFeatured';
import CircularProgress from '../../../helpers/CircularProgress';
//import { SHOP, RECOMMENDED_PRODUCTS } from '../../constants/routes';
//import { displayMoney, displayActionMessage } from '../../helpers/utils';
import firebase from '../../../firebase/firebase';
import useScrollTop from '../../../hooks/useScrollTop';
import useDocumentTitle from '../../../hooks/useDocumentTitle';
import {ORDER_HISTORY} from '../../../constants/routes';
import MessageBox from '../../../helpers/MessageBox';
import './index.css';
import { displayDate } from '../../../helpers/utils';



const ViewProduct = (props) => {
    useScrollTop();    

    const id = props.match.params.orderId;    
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(state => ({
        order: state.orders.items.find(item => item.orderId === id),        

    }));
    
    useDocumentTitle(`View ${store.order ? store.order.orderId : 'Item'}`);
    
    const [order, setOrder] = useState(store.order || null); 
    
    console.log(order)    

    useEffect(() => {
        if (!order) {
            firebase.getSingleOrder(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();

                        setOrder(data);                        
                    } else {
                        history.push(ORDER_HISTORY);
                    }
                })
                .catch((e) => {
                    history.push(ORDER_HISTORY);
                });
        }
    }, []);

    

    return order ? (
        <div className='order_content'>
            <h1><strong>Order:</strong> {order.orderId}</h1>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name: </strong> 
                                    {order.shippingAddress.fullname} 
                                    <br />
                                    <strong>Mobile: </strong> {order.shippingAddress.mobile.data.num ?`+${order.shippingAddress.mobile.data.num}`:'+251'} <br />	                                
                                    <strong>Email: </strong> {order.shippingAddress.email} <br />                            
                                    {order.shippingAddress.postaAddress !== ''?
                                        (<>
                                            <strong>Posta: </strong>                                    
                                            {order.shippingAddress.postaAddress}                                   
                                            <br />
                                        </>
                                        ):(
                                            null
                                        )
                                    }
                                    <strong>Address: </strong> 
                                    {order.shippingAddress.region},{' '}
                                    {order.shippingAddress.zone},{' '}
                                    {order.shippingAddress.wereda},{' '}
                                    {order.shippingAddress.kebele}
                                    <br/>
                                    {order.shippingAddress.note !== ''?
                                        (<>
                                            <strong>Order Notes: </strong>                                    
                                            {order.shippingAddress.note}                                    
                                            <br />
                                        </>
                                        ):(
                                            null
                                        )
                                    }
                                </p>
                                {order.isDelivered ? (
                                <MessageBox variant="success">
                                    Delivered at {displayDate(order.deliveredAt)}
                                </MessageBox>
                                ) : (
                                <MessageBox variant="danger">Not Delivered</MessageBox>
                                )}
                            </div>
                        </li>              
                        
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                <strong>Method: </strong> {order.payment.type}
                                </p>
                                {order.isPaid ? (
                                <MessageBox variant="success">
                                    Paid at {displayDate(order.paidAt)}
                                </MessageBox>
                                ) : (
                                <MessageBox variant="danger">Not Paid</MessageBox>
                                )}
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                {order.orderItems.map((item) => (
                                    <li key={item.productId}>
                                    <div className="row">
                                        <div>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="small"
                                        ></img>
                                        </div>
                                        <div className="min-30">
                                        <Link to={`/product/${item.productId}`}>
                                            {item.name}
                                        </Link>                                
                                        </div>

                                        <div>
                                        {item.quantity} x ${item.price} = ${item.quantity * item.price}
                                        </div>
                                    </div>
                                    </li>
                                ))}
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                <div>Items</div>
                                <div>${order.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                <div>Shipping</div>
                                <div>${order.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            {/* <li>
                                <div className="row">
                                <div>Tax</div>
                                <div>${order.taxPrice.toFixed(2)}</div>
                                </div>
                            </li> */}
                            <li>
                                <div className="row">
                                <div>
                                    <strong> Order Total</strong>
                                </div>
                                <div>
                                    <strong>${order.totalPrice.toFixed(2)}</strong>
                                </div>
                                </div>
                            </li>
                            {/* {!order.isPaid && (
                                <li>
                                {!sdkReady ? (
                                    <LoadingBox></LoadingBox>
                                ) : (
                                    <>
                                    {errorPay && (
                                        <MessageBox variant="danger">{errorPay}</MessageBox>
                                    )}
                                    {loadingPay && <LoadingBox></LoadingBox>}

                                    <PayPalButton
                                        amount={order.totalPrice}
                                        onSuccess={successPaymentHandler}
                                    ></PayPalButton>
                                    </>
                                )}
                                </li>
                            )} */}
                            {/* {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <li>
                                {loadingDeliver && <LoadingBox></LoadingBox>}
                                {errorDeliver && (
                                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                                )}
                                <button
                                    type="button"
                                    className="primary block"
                                    onClick={deliverHandler}
                                >
                                    Deliver Order
                                </button>
                                </li>
                            )} */}
                        </ul>
                    </div>
                </div>                    
            </div>
        </div>
    ) : (
        <div className="loader"><CircularProgress /></div>
    );
};

export default ViewProduct;
