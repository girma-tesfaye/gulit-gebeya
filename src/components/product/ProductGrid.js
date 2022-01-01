import React, { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import ProductItem from './ProductItem';
import ProductAppliedFilters from './ProductAppliedFilters';
import Boundary from '../../helpers/Boundary';


const ProductGrid = ({ store, shopId }) => {

    const [columnCount, setColumnCount] = useState(6);
    const productListWrapper = useRef(null);
    const shopIdNew = shopId ? shopId : null;

    const onProductsLengthChanged = () => {
        const width = window.screen.width - 250; // minus 250px padding
        const pLen = store.filteredProducts.length;

        setColumnCount(Math.floor(width / 200));
        if ((columnCount >= pLen) && pLen !== 0) {
            setColumnCount(pLen);
        }
    };

    useEffect(() => {
        if (productListWrapper) {
            onProductsLengthChanged();
        }
    }, [store.filteredProducts]);

    const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy', 'category', 'subCategory', 'size'].some(key => !!store.filter[key]);

    return (
        <>
            {!store.requestStatus && (
                <div className="product-list-header">
                    <div className="product-list-header-title">
                        {isFiltered && (
                            <h5>
                                {store.filteredProducts.length > 0
                                    && `Found ${store.filteredProducts.length} ${store.filteredProducts.length > 1 ? 'products' : 'product'}`
                                }
                            </h5>
                        )}
                    </div>
                </div>
            )}
            <ProductAppliedFilters filter={store.filter} />
            <Boundary>
                <ProductList {...store} shopId={shopIdNew} isAdmin={false}>
                    {({ foundOnBasket, foundOnWishList }) => (
                        <>
                            <div
                                className="product-list"
                                ref={productListWrapper}
                                style={{ gridTemplateColumns: `repeat(${columnCount}, 200px)` }}
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
                                        key={product.id}
                                        isItemOnWishList={foundOnWishList(product.id)}
                                        isLoading={store.isLoading}
                                        product={product}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </ProductList>
            </Boundary>
        </>
    );
};

export default ProductGrid;
