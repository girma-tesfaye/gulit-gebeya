import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { addCategory } from '../../../redux/actions/categoryActions';
import CategoryForm from '../components/CategoryForm';

const AddCategory = () => {
	useScrollTop();
	useDocumentTitle('Add New Category | Gullit Gebeya');
	const isLoading = useSelector(state => state.app.loading);
	const dispatch = useDispatch();

	const onSubmit = (category) => {
		dispatch(addCategory(category));
	};

	return (
		<div className="product-form-container">
			<h2>Add New Category</h2>
			<CategoryForm
				isLoading={isLoading}
				onSubmit={onSubmit}
			/>
		</div>
	);
};

export default withRouter(AddCategory);
