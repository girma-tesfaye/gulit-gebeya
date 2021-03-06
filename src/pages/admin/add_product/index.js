import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { addProduct } from '../../../redux/actions/productActions';
import ProductForm from '../components/ProductForm';
//import AddTable from "../add_table/Table/CustomizableTable";
import CustomizableTable from './Table/CustomizableTable';

const AddProduct = () => {
	useScrollTop();
	useDocumentTitle('Add New Product | Gullit Gebeya');
	const isLoading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();

	const onSubmit = (product) => {
		dispatch(addProduct(product));
	};

	return (
		<div className="product-form-container">
			<h2>Add New Product</h2>
			<CustomizableTable 
				onSubmit={onSubmit}
			/>
			<ProductForm
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default withRouter(AddProduct);
