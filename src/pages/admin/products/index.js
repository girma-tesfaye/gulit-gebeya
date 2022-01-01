import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { ADD_PRODUCT } from '../../../constants/routes';
import ProductAppliedFilters from '../../../components/product/ProductAppliedFilters';
import { selectFilter } from '../../../selectors/selector';
//import ProductList from '../../../components/product/ProductList';
import AdminProductList from '../../../components/product/AdminProductList';
import Boundary from '../../../helpers/Boundary';
import SearchBar from '../../../components/ui/components/SearchBar';
import FiltersToggle from '../../../components/ui/components/FiltersToggle';
import ProductItem from '../components/ProductItem';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';


const Products = ({ history }) => {
	useDocumentTitle('Product List | Gullit Gebeya Admin');
	useScrollTop();

	const store = useSelector(state => ({
		filter: state.filter,
		basket: state.basket,
		filteredProducts: selectFilter(state.products.adminItems, state.filter),
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
		products: state.products.adminItems,
		productsCount: state.products.adminItems.length,
		totalProductsCount: state.products.adminTotal,
		lastRefKey:state.products.adminLastRefKey,		
	}));

	const onClickAddProduct = () => {
		history.push(ADD_PRODUCT);
	};

	// TODO insufficient permission
	// TODO fix filters modal
	return (
		<Boundary>
			<div className="product-admin-header">
			<div>
				<h3 className="product-admin-header-title">
					Products &nbsp;
					({`${store.productsCount} / ${store.totalProductsCount}`})
				</h3>
				<SearchBar
					filter={store.filter}
					isLoading={store.isLoading}
					productsCount={store.productsCount}
				/>
			</div>
			&nbsp;
			<div>
				<FiltersToggle
					filter={store.filter}
					isLoading={store.isLoading}
					products={store.products}
					productsCount={store.productsCount}
				>
					<button className="button-muted button-small">
						More Filters &nbsp;<FontAwesomeIcon icon='chevron-right'/>
					</button>
				</FiltersToggle>
				<button
					className="button button-small"
					onClick={onClickAddProduct}
				>
					Add New Product
				</button>
			</div>
			</div>
			<div className="product-admin-items">
				<AdminProductList {...store}>
					{() => (
						<>
							<ProductAppliedFilters filter={store.filter} />
							{store.filteredProducts.length > 0 && (
								<div className="grid grid-product grid-count-6">
									<div className="grid-col" />
									<div className="grid-col">
										<h5>Name</h5>
									</div>
									<div className="grid-col">
										<h5>Brand</h5>
									</div>
									<div className="grid-col">
										<h5>Price</h5>
									</div>
									<div className="grid-col">
										<h5>Date Added</h5>
									</div>
									<div className="grid-col">
										<h5>Qty</h5>
									</div>
								</div>
							)}
							{store.filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
								<ProductItem
									key={`product-skeleton ${index}`}
									product={product}
								/>
							)) : store.filteredProducts.map(product => (
								<ProductItem
									key={product.id}
									product={product}
								/>
							))}
						</>
					)}
				</AdminProductList>
			</div>
		</Boundary>
	);
};

export default withRouter(Products);
