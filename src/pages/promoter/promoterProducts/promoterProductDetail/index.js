import React, { useState, useEffect, useRef } from 'react';
import { useParams, useHistory, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../../../firebase/firebase';
import useScrollTop from '../../../../hooks/useScrollTop';
import useDocumentTitle from '../../../../hooks/useDocumentTitle';
import { PROMOTER_PRODUCTS } from '../../../../constants/routes';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';

const PromoterProductDetail = (props) => {
    useScrollTop();

    const id = props.match.params.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(state => ({
        promoterProduct: state.promoter.promoterProducts.items.find(item => item.promoterProductId === id),
    }));

    useDocumentTitle(`View ${store.promoterProduct ? store.promoterProduct.promoterProductId : 'Item'}`);

    const [promoterProduct, setPromoterProduct] = useState(store.promoterProduct || null);    

    useEffect(() => {
        if (!promoterProduct) {
            firebase.getSinglePromoterProduct(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        setPromoterProduct(data);
                    } else {
                        history.push(PROMOTER_PRODUCTS);
                    }
                })
                .catch((e) => {
                    history.push(PROMOTER_PRODUCTS);
                }
                );
        }
    }, []);

    return promoterProduct ? (
        <div className='order_content'>
            <h1><strong>Promoter Product:</strong> {promoterProduct.promoterProductId}</h1>
            <Link to={PROMOTER_PRODUCTS}>
                <h3 className="button-link d-inline-flex"><ArrowLeftOutlined /> &nbsp; Back to Products</h3>
            </Link>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Number of Sells</h2>
                                {promoterProduct.numberOfSells ?
                                    <p>
                                        <strong>Channel 1: </strong>
                                        {promoterProduct.numberOfSells.channel_1 ? promoterProduct.numberOfSells.channel_1 : 0}
                                        <br />
                                        <strong>Channel 2: </strong>
                                        {promoterProduct.numberOfSells.channel_2 ? promoterProduct.numberOfSells.channel_2 : 0}
                                        <br />
                                        <strong>Channel 3: </strong>
                                        {promoterProduct.numberOfSells.channel_3 ? promoterProduct.numberOfSells.channel_3 : 0}
                                        <br />
                                        <strong>Channel 4: </strong>
                                        {promoterProduct.numberOfSells.channel_4 ? promoterProduct.numberOfSells.channel_4 : 0}
                                        <br />
                                        <strong>Channel 5: </strong>
                                        {promoterProduct.numberOfSells.channel_5 ? promoterProduct.numberOfSells.channel_5 : 0}
                                        <br />
                                        <strong>Channel 6: </strong>
                                        {promoterProduct.numberOfSells.channel_6 ? promoterProduct.numberOfSells.channel_6 : 0}
                                        <br />
                                        <strong>Channel 7: </strong>
                                        {promoterProduct.numberOfSells.channel_7 ? promoterProduct.numberOfSells.channel_7 : 0}
                                        <br />
                                        <strong>Channel 8: </strong>
                                        {promoterProduct.numberOfSells.channel_8 ? promoterProduct.numberOfSells.channel_8 : 0}
                                        <br />
                                        <strong>Channel 9: </strong>
                                        {promoterProduct.numberOfSells.channel_9 ? promoterProduct.numberOfSells.channel_9 : 0}
                                        <br />
                                        <strong>Channel 10: </strong>
                                        {promoterProduct.numberOfSells.channel_10 ? promoterProduct.numberOfSells.channel_10 : 0}
                                        <br />
                                    </p> :
                                    <h3>
                                        no sells
                                    </h3>
                                }
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Number of Clicks</h2>
                                {promoterProduct.numberOfClicks ?
                                    <p>
                                        <strong>Channel 1: </strong>
                                        {promoterProduct.numberOfClicks.channel_1 ? promoterProduct.numberOfClicks.channel_1 : 0}
                                        <br />
                                        <strong>Channel 2: </strong>
                                        {promoterProduct.numberOfClicks.channel_2 ? promoterProduct.numberOfClicks.channel_2 : 0}
                                        <br />
                                        <strong>Channel 3: </strong>
                                        {promoterProduct.numberOfClicks.channel_3 ? promoterProduct.numberOfClicks.channel_3 : 0}
                                        <br />
                                        <strong>Channel 4: </strong>
                                        {promoterProduct.numberOfClicks.channel_4 ? promoterProduct.numberOfClicks.channel_4 : 0}
                                        <br />
                                        <strong>Channel 5: </strong>
                                        {promoterProduct.numberOfClicks.channel_5 ? promoterProduct.numberOfClicks.channel_5 : 0}
                                        <br />
                                        <strong>Channel 6: </strong>
                                        {promoterProduct.numberOfClicks.channel_6 ? promoterProduct.numberOfClicks.channel_6 : 0}
                                        <br />
                                        <strong>Channel 7: </strong>
                                        {promoterProduct.numberOfClicks.channel_7 ? promoterProduct.numberOfClicks.channel_7 : 0}
                                        <br />
                                        <strong>Channel 8: </strong>
                                        {promoterProduct.numberOfClicks.channel_8 ? promoterProduct.numberOfClicks.channel_8 : 0}
                                        <br />
                                        <strong>Channel 9: </strong>
                                        {promoterProduct.numberOfClicks.channel_9 ? promoterProduct.numberOfClicks.channel_9 : 0}
                                        <br />
                                        <strong>Channel 10: </strong>
                                        {promoterProduct.numberOfClicks.channel_10 ? promoterProduct.numberOfClicks.channel_10 : 0}
                                        <br />
                                    </p> :
                                    <h3>
                                        no clicks
                                    </h3>
                                }
                            </div>
                        </li>

                        <li>
                            <div className="card card-body">
                                <h2>Promoter Product</h2>
                                {promoterProduct.productId ?
                                    <ul>
                                        <li key={promoterProduct.productId}>
                                            <div className="row">
                                                <div>
                                                    <img
                                                        src={promoterProduct.productImage}
                                                        alt={promoterProduct.productName}
                                                        className="small"
                                                    ></img>
                                                </div>
                                                <div className="min-30">
                                                    <Link to={`/product/${promoterProduct.productId}`}>
                                                        {promoterProduct.productName}
                                                    </Link>
                                                </div>
                                                <div>
                                                    {0.005} x ${promoterProduct.productPrice} = ${0.005 * promoterProduct.productPrice}
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                    : <div>
                                        <h3> no product </h3>
                                    </div>
                                }
                            </div>
                        </li>
                    </ul>
                </div>

                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Summary</h2>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Total Number of Clicks</div>
                                    <div>{promoterProduct.totalNumberOfClicks?promoterProduct.totalNumberOfClicks:0}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Total Number of Sells</div>
                                    <div>{promoterProduct.totalNumberOfSells?promoterProduct.totalNumberOfSells:0}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>
                                        <strong> Current Total Birr</strong>
                                    </div>
                                    <div>
                                        <strong>{promoterProduct.totalCurrent?`${promoterProduct.totalCurrent.toFixed(2)} ETB`:`${0} ETB`}</strong>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="loader">
            <h4>Loading Product...</h4>
            <br />
            <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
    );
};

export default PromoterProductDetail;
