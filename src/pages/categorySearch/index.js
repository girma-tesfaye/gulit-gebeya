import ProductItem from '../../components/product/ProductItem';
import Boundary from '../../helpers/Boundary';
import CircularProgress from '../../helpers/CircularProgress';
import MessageDisplay from '../../helpers/MessageDisplay';
import useDidMount from '../../hooks/useDidMount';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRequestStatus } from '../../redux/actions/miscActions';
import { searchCategoryProduct } from '../../redux/actions/productActions';

const Search = (props) => {
    const category = props.match.params.category;    
    const [columnCount, setColumnCount] = useState(6);
    const dispatch = useDispatch();
    const didMount = useDidMount();
    const { isLoading, products, requestStatus, basket } = useSelector(state => ({
        isLoading: state.app.loading,
        products: state.products.searchedProducts.items,
        basket: state.basket,
        requestStatus: state.app.requestStatus,
    }));

    useEffect(() => {
        if (!didMount && !isLoading) {
            dispatch(searchCategoryProduct(category));
        }

        return () => {
            dispatch(setRequestStatus(''));
        }
    }, []);

    const onProductsLengthChanged = () => {
        const width = window.screen.width - 250; // minus 250px padding
        const pLen = products.length

        setColumnCount(Math.floor(width / 200));
        if ((columnCount >= pLen) && pLen !== 0) {
            setColumnCount(pLen);
        }
    };

    useEffect(() => {
        onProductsLengthChanged();
    }, [products]);

    const productListWrapper = useRef(null);

    const foundOnBasket = id => !!basket.find(item => item.id === id);

    return requestStatus && !isLoading ? (
        <MessageDisplay
            message={requestStatus}
            desc="Try using correct filters or keyword."
        />
    ) : !requestStatus && !isLoading ? (
        <Boundary>
            <section className="product-list-wrapper product-list-search">
                {!requestStatus && (
                    <div className="product-list-header">
                        <div className="product-list-header-title">
                            <h5>
                                {`Found ${products.length} ${products.length > 1 ? 'products' : 'product'} with ${category}category`}
                            </h5>
                        </div>
                    </div>
                )}
                <div
                    className="product-list"
                    ref={productListWrapper}
                    style={{ gridTemplateColumns: `repeat(${columnCount}, 200px)` }}
                >
                    {products.map(product => (
                        <ProductItem
                            isItemOnBasket={foundOnBasket(product.id)}
                            key={product.id}
                            isLoading={isLoading}
                            product={product}
                        />
                    ))}
                </div>
            </section>
        </Boundary>
    ) : (
                <div className="loader"><CircularProgress /></div>
            );
};

export default Search;
