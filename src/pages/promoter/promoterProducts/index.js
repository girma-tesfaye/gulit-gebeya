import React, { useEffect, useState } from 'react';
import { getPromoterProducts } from '../../../redux/actions/promoterActions';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../../helpers/CircularProgress';
import { useHistory } from 'react-router-dom';
import { displayDate } from '../../../helpers/utils';
import { setLoading } from '../../../redux/actions/miscActions';
import MessageDisplay from '../../../helpers/MessageDisplay';
import GetProductUrl from '../../../components/promoter/GetProductUrl';
import { removePromoterProduct, clearPromoterProducts } from '../../../redux/actions/promoterActions';


const PromoterProducts = () => {
    /* const promoter = useSelector(state => state.promoter);
    const isLoading = useSelector(state => state.app.loading);
    const requestStatus = useSelector(state => state.app.requestStatus);
 */
    const {promoter, isLoading, requestStatus} = useSelector(state => ({
        promoter: state.promoter.promoterProducts,
        isLoading: state.app.loading,
        requestStatus: state.app.requestStatus,
    }));

    const dispatch = useDispatch();
    const history = useHistory();

    const [isFetching, setFetching] = useState(false);

    const fetchPromoterProducts = () => {
        setFetching(true);        
        dispatch(getPromoterProducts(promoter.lastRefKey));
    };

    useEffect(() => {
        dispatch(clearPromoterProducts());        
        if (promoter.items.length === 0 || !promoter.lastRefKey) {            
            fetchPromoterProducts();
        }
        window.scrollTo(0, 0);
        return () => {
            dispatch(setLoading(false));
            dispatch(clearPromoterProducts());
        }
    }, []);

    useEffect(() => {
        setFetching(false);
    }, [promoter.lastRefKey]);
    

    return promoter.items.length === 0 && !isLoading && !promoter.lastRefKey ? (
        <MessageDisplay
            message={requestStatus ? requestStatus : 'Failed to fetch items.'}
        />
    ) : requestStatus ? (
        <MessageDisplay
            message={requestStatus}
            action={fetchPromoterProducts}
            buttonLabel="Try Again"
        />
    ) :
        (
            <div className='content_tabel'>
                <h1>Promoter Products</h1>
                {promoter.items.length === 0 ? (
                    <CircularProgress></CircularProgress>
                ) /* : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) */ : (
                        <table className="custom_table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>DATE ADD</th>
                                    <th>PRODUCT NAME</th>
                                    <th>PRODUCT PRICE</th>
                                    <th>GET URL</th>
                                    <th>DETAIL</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promoter.items.map((promoter) => (
                                    <tr key={promoter.promoterProductId}>
                                        <td>{promoter.promoterProductId}</td>
                                        <td>{ promoter.dateAdded && (promoter.dateAdded.seconds ? displayDate(promoter.dateAdded.toDate()) : displayDate(promoter.dateAdded))}</td>
                                        <td>{<a onClick={() => {history.push(`/product/${promoter.productId}`); }}>{promoter.productName}</a>}</td>
                                        <td>{promoter.productPrice.toFixed(2)}</td>  
                                        <td><GetProductUrl promoterProductId={promoter.promoterProductId} productId={promoter.productId}/></td>                                    
                                        <td>
                                            <button
                                                type="button"
                                                className="small button-success"
                                                disabled= {isLoading}
                                                onClick={() => {
                                                    history.push(`/promoter/product_detail/${promoter.promoterProductId}`);
                                                }}
                                            >
                                                Detail
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                type="button"
                                                className="small button-danger"
                                                onClick={() => {dispatch(removePromoterProduct(promoter.promoterProductId))}}
                                                /* disabled= {isLoading} */
                                            >
                                                {/* {isLoading?'please wait...':'Delete'} */}Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                {promoter.total > promoter.items.length && (
                    <div className="d-flex-center padding-l">
                        <button
                            className="button button-small"
                            disabled={isFetching}
                            onClick={fetchPromoterProducts}
                        >
                            {isFetching ? 'Fetching Products...' : 'Show More Products'}
                        </button>
                    </div>
                )
                }
            </div>
        );
}

export default PromoterProducts;