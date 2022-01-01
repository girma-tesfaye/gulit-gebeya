import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import Boundary from '../../../helpers/Boundary';
import { ADD_CATEGORY } from '../../../constants/routes';
import {getCategorys} from '../../../redux/actions/categoryActions'

const Categorys = ({ history }) => {
	useDocumentTitle('Category List | Gullit Admin');
	useScrollTop();
	const dispatch = useDispatch();

	const store = useSelector(state => ({
		requestStatus: state.app.requestStatus,
		isLoading: state.app.loading,
	}));

	useEffect(() => {
		dispatch (getCategorys()); 
	},[]); 

	const onClickAddCategory = () => {
		history.push(ADD_CATEGORY);
	};

	return (
		<Boundary>
			<div className="category-admin-header">
				<h3 className="category-admin-header-title">
					Categorys 
				</h3>
				<button
					className="button button-small add-button"
					onClick={onClickAddCategory}
				>
					Add New category
				</button>
			</div>
			<div className="product-admin-items">
				<div className="grid grid-product grid-count-6">
					<div className="grid-col" />
					<div className="grid-col">
						<h5>Types</h5>
					</div>
					<div className="grid-col">
						<h5>Name</h5>
					</div>
					<div className="grid-col">
						<h5>Brand</h5>
					</div>
					<div className="grid-col">
						<h5>Keywords</h5>
					</div>
					
					<div className="grid-col">
						<h5>Date Added</h5>
					</div>
					
				</div>
			</div>
		</Boundary>
	);
};

export default withRouter(Categorys);