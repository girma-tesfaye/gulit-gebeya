import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectFilter } from '../../selectors/selector';

import ProductList from '../../components/product/ProductList';
import ProductItem from '../../components/product/ProductItem';
import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';
import Boundary from '../../helpers/Boundary';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';

const Shop = () => {
    useDocumentTitle('Shop | Gullit Gebeya');
    useScrollTop();

    const [columnCount, setColumnCount] = useState(12);
    const productListWrapper = useRef(null);

    const store = useSelector(state => ({
        filter: state.filter,
        basket: state.basket,
        wishList: state.wishList,
        filteredProducts: selectFilter(state.products.items, state.filter),
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading,
        products: state.products.items,
        lastRefKey: state.products.lastRefKey,
        productsCount: state.products.items.length,
        totalProductsCount: state.products.total,
    }));

    const onProductsLengthChanged = () => {
        const width = window.screen.width-80; // minus 250px padding
        const pLen = store.filteredProducts.length;

        setColumnCount(Math.floor(width / 220));
        if ((columnCount >= pLen) && pLen !== 0) {
            setColumnCount(pLen);
        }
    };

    useEffect(() => {
        if (productListWrapper) {
            onProductsLengthChanged();
        }
    }, [store.filteredProducts]);

    const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!store.filter[key]);

    return (
        <section className="product-list-wrapper">
            {!store.requestStatus && (
                <div className="product-list-header">
                    <div className="product-list-header-title">
                        {isFiltered ? (
                            <h5>
                                {store.filteredProducts.length > 0
                                    && `Found ${store.filteredProducts.length} ${store.filteredProducts.length > 1 ? 'products' : 'product'}`
                                }
                            </h5>
                        ): 'All products'}
                    </div>
                </div>
            )}
            <ProductAppliedFilters filter={store.filter} />
            <Boundary>
                <ProductList {...store}>
                    {({ foundOnBasket, foundOnWishList }) => (
                        <>
                            <div
                                className="product-list"
                                ref={productListWrapper}
                                /* style={{ gridTemplateColumns: `repeat(${columnCount}, 200px)` }} */
                            >
                                {store.filteredProducts.length === 0 ? new Array(12).fill({}).map((product, index) => (
                                    <ProductItem
                                        isItemOnBasket={false}
                                        isItemOnWishList={false}
                                        key={`product-skeleton ${index}`}
                                        product={product}
                                    />
                                )) : store.filteredProducts.map(product => (
                                    <ProductItem
                                        isItemOnBasket={foundOnBasket(product.id)}
                                        isItemOnWishList={foundOnWishList(product.id)}
                                        key={product.id}
                                        isLoading={store.isLoading}
                                        product={product} 
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </ProductList>
            </Boundary>
        </section>
    );
};

export default Shop;
