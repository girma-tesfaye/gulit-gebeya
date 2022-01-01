import React, { useEffect, useState } from 'react';
import MessageDisplay from '../../helpers/MessageDisplay';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { useDispatch, useSelector } from 'react-redux';
import useScrollTop from '../../hooks/useScrollTop';
import bannerImg from '../../images/banner-girl.png';
import { getShops } from '../../redux/actions/productActions';
import { setLoading } from '../../redux/actions/miscActions';
import ShopView from '../../components/shop/shops';
import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';

const Shops = () => {
    useDocumentTitle('Shops | Gullit Gebeya');
    useScrollTop();

    const dispatch = useDispatch();
    const [isFetching, setFetching] = useState(false);

    /* const store = useSelector(state => ({
        filteredShops: state.products.shops.items,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading,
        lastRefKey: state.products.shops.lastRefKey,
        shopsCount: state.products.shops.items.length,
        totalShopsCount: state.products.shops.total,
    }));

    //const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);

    const fetchShops = () => {
        setFetching(true);
        dispatch(getShops({
            lastRefKey: store.lastRefKey
        }));
    };

    useEffect(() => {
        if (store.shopsCount === 0 || !store.lastRefKey) {
            fetchShops();
        }else{
            setFetching(true);
            dispatch(getShops({keyword: store.filter.keyword, 
                        minPrice: store.filter.minPrice,maxPrice: store.filter.maxPrice, 
                        brand: store.filter.brand, sortBy: store.filter.sortBy}
                    ));                  
        }

        window.scrollTo(0, 0);
        return () => dispatch(setLoading(false));
    }, [ ]);

    useEffect(() => {
        setFetching(false);
    }, [store.lastRefKey]);*/

    return (
        <div className="featured">
            <div className="banner">
                <div className="banner-desc">
                    <h1>Shops</h1>
                </div>
                <div className="banner-img">
                    <img src={bannerImg} alt="" />
                </div>
            </div>
            {/* {!store.requestStatus && (
                <div className="product-list-header">
                    <div className="product-list-header-title">
                        {isFiltered && (
                            <h5>
                                {store.filteredShops.length > 0
                                    && `Found ${store.filteredShops.length} ${store.filteredShops.length > 1 ? 'products' : 'product'}`
                                }
                            </h5>
                        )}
                    </div>
                </div>
            )}
            <ProductAppliedFilters filter={store.filter} /> 
            <div className="display">
                <div className="product-display-grid">
                    {store.filteredShops.length === 0 && !store.isLoading && !store.lastRefKey ? (
                        <MessageDisplay
                            message={store.requestStatus ? store.requestStatus : 'Failed to fetch items.'}
                        />
                    ) : store.requestStatus ? (
                        <MessageDisplay
                            message={store.requestStatus}
                            action={fetchShops}
                            buttonLabel="Try Again"
                        />
                    ) : (
                        store.filteredShops.length === 0 ? new Array(6).fill({}).map((shop, index) => (
                            <ShopView
                                key={`product-skeleton ${index}`}
                                shop={shop}
                            />
                        )) : store.filteredShops.map(shop => (
                            <ShopView
                                key={shop.id}
                                isLoading={store.isLoading}
                                shop={shop}
                            />
                        ))
                    )}
                </div>
                {store.shopsCount < store.totalShopsCount && (
                    <div className="d-flex-center padding-l">
                        <button
                            className="button button-small"
                            disabled={isFetching}
                            onClick={fetchShops}
                        >
                            {isFetching ? 'Fetching Items...' : 'Show More Items'}
                        </button>
                    </div>
                )}
            </div>*/}
        </div>
    );
};

export default Shops;
