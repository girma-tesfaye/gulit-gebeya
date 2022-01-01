import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useDocumentTitle from '../../../hooks/useDocumentTitle';
import useScrollTop from '../../../hooks/useScrollTop';
import { addSpecificationTable } from '../../../redux/actions/helperActions';
import CustomizableTable from "./Table/CustomizableTable";

const AddTable = () => {
	useScrollTop();
	useDocumentTitle('Add New Product | Gullit Gebeya');
	const dispatch = useDispatch();

	const onSubmit = (table) => {
		dispatch(addSpecificationTable(table));
	};

	return (
		<div className="product-form-container">
			<div className="mini-display" /* style={{display: 'none'}} */>
                <CustomizableTable 
                    onSubmit={onSubmit}
                />
            </div>		
		</div>
	);
};

export default withRouter(AddTable);
