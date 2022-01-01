import React, {useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch} from 'react-redux';
import { displayActionMessage } from '../../../helpers/utils';
import {addCategoriesChangeUi, addBrandsChangeUi, addUtilsUiToCloud} from '../../../redux/actions/helperActions';

const Orders = () => {

	const dispatch = useDispatch();
    const uiUtills = useSelector(state => state.utills.ui);	
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [brandOptions, setBrandOptions] = useState([]);

    const [field, setField] = useState({		
		category: { value:'' },
		subCategory: { value:[] },
		brand:{value: ''},
		size:{value:''},				
	});

	const [error,setError] = useState(false);

    useEffect(() => {
		if(uiUtills){
			const categoriesValue = (uiUtills.categories) && (uiUtills.categories.map((category) =>
				({value:category.main,label:category.main})
			));			
			const brandValue = (uiUtills.brands) && (uiUtills.brands.map((brand) =>
				({value:brand,label:brand})
			));

			setCategoryOptions(categoriesValue);
			setBrandOptions(brandValue);			
		}
	}, [uiUtills]);	

    const getSubCategoryOptions = (catValue) => {
		
		const value = uiUtills?(uiUtills.categories?uiUtills.categories.find((x) => 
			(x.main === catValue)
		):null):null;			
		const subCategoriesValue = value?(value.sub.map((subCategory) =>
			({value:subCategory,label:subCategory})
		)):[];		
		return subCategoriesValue;		
	}	

    const onCategoryChange = (newValue) => {
		
		setError(false);
		setField({ ...field, category: { value: newValue.value } });        
	};

    const onSubCategoryChange = (newValue) => {
		setError(false);
		const subCategorys = newValue.map(word => word.value);
		setField({ ...field, subCategory: { value: subCategorys } });        
	};	

	const onBrandChange = (newValue) => {
		setError(false);
		setField({ ...field, brand: { value: newValue.value } });        
	};

	const onAddCategory = (e) => {
		e.preventDefault();
		if(field.category.value === ""){
			setError(true);
			return;
		} 		
		dispatch(addCategoriesChangeUi({main:field.category.value, sub:field.subCategory.value}));	
		displayActionMessage("Category Added", 'success');	
	};

	const onAddBrand = (e) => {
		e.preventDefault();
		if(field.brand.value === ""){
			setError(true);
			return;
		} 		
		dispatch(addBrandsChangeUi(field.brand.value));
		displayActionMessage("Brand Added", 'success');		
	};

	const onSubmitToCloud = (e) => {
		e.preventDefault();
		if (uiUtills) {		
			dispatch(addUtilsUiToCloud(uiUtills));
		} else{
			return;
		}		
	}

    return (
        <div>
			<div className="category-form-inputs">
				{error && (
					<h5 className="text-center toast-error">
						please input category or category already exist
					</h5>
				)}					
				<div className="d-flex">
					<div className="product-form-field">
						<span className="d-block padding-s">Create Category</span>
						<CreatableSelect
							placeholder="Create Category"
							defaultValue={{ label: field.category.value, value: field.category.value }}
							onChange={onCategoryChange}
							options={categoryOptions}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 }),
								container: provided => ({ ...provided, marginBottom: '1.2rem' })
							}}
						/>
					</div>
					&nbsp;
					<div className="product-form-field">
						<span className="d-block padding-s">Create Sub Categories</span>
						<CreatableSelect
							isMulti							
							placeholder="Create Sub Categories"
							onChange={onSubCategoryChange}
							defaultValue={field.subCategory.value}
							options={getSubCategoryOptions(field.category.value)}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 }),
								container: provided => ({ ...provided, marginBottom: '1.2rem' })
							}}
						/>										
					</div>
				</div>
				<div className="product-form-field">
					<div> 					                     
                        <button className="primary" onClick={onAddCategory}>
                            add category
                        </button>
                    </div>
				</div>

				<div className="d-flex">
					<div className="product-form-field">
						<span className="d-block padding-s">Create Brand</span>
						<CreatableSelect
							placeholder="Create Brand"
							defaultValue={{ label: field.brand.value, value: field.brand.value }}
							onChange={onBrandChange}
							options={brandOptions}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 }),
								container: provided => ({ ...provided, marginBottom: '1.2rem' })
							}}
						/>
					</div>
					&nbsp;					
				</div>
				<div className="product-form-field">
					<div> 					                     
                        <button className="primary" onClick={onAddBrand}>
                            add brand
                        </button>
                    </div>
				</div>
				<div className="product-form-field">
					<div> 					                     
                        <button className="primary" onClick={onSubmitToCloud}>
                            commit changes
                        </button>
                    </div>
				</div>
			</div>					
        </div>
    );
}

export default Orders;






















/* import React, { useState, useRef, useSelector, } from 'react';
import CreatableSelect from 'react-select/creatable';
import CircularProgress from '../../../helpers/CircularProgress';
import Input from '../../../helpers/Input';

import useFileHandler from '../../../hooks/useFileHandler';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const brandOptions = [
	{ value: 'Samsung', label: 'Samsung' },
	{ value: 'iphone', label: 'iphone' },
	{ value: 'Huawie', label: 'Huawie' },
	{ value: 'Tecno', label: 'Tecno' },
];

const CategoryForm = ({ category, onSubmit, isLoading }) => {
	const defaultCategory = {
		catagoriesCollection: [],
		...category
	};
	const [field, setField] = useState({
        types: { value: category ? defaultCategory.types : '' },
		name: { value: category ? defaultCategory.name : '' },
		brand: { value: category ? defaultCategory.brand : '' },
		keywords: { value: category ? defaultCategory.keywords : ['samsung'] },
	});
	
	const onCategoryNameInput = (value, error) => {
		setField({ ...field, name: { value, error } });
	};

    const onCategoryTypesInput = (value, error) => {
		setField({ ...field, types: { value, error } });
	};

	const onBrandChange = (newValue) => {
		setField({ ...field, brand: { value: newValue.value } });
	};

	const onKeywordChange = (newValue) => {
		const keywords = newValue.map(word => word.value);

		setField({ ...field, keywords: { value: keywords } });
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (field.types.value
			
		) {
			const newCategory = {};

			Object.keys(field).forEach((i) => {
				newCategory[i] = field[i].value;
			});

			onSubmit({
				...newCategory,
				quantity: 1,
				types_lower: newCategory.types.toLowerCase(), // due to firebase function billing policy, let's add lowercase version of name here instead in firebase functions
				dateAdded: new Date().getTime(),
				
			});
		}
	};

	return (
		<div>
			<form
				className="category-form"
				onSubmit={onSubmitForm}
			>
				<div className="category-form-inputs">
					<div className="d-flex">
                    <div className="category-form-field">
							<Input
								field="types"
								isRequired
								label="* Category Types"
								maxLength={60}
								onInputChange={onCategoryTypesInput}
								placeholder="Electronics"
								readOnly={isLoading}
								style={{ textTransform: 'capitalize' }}
								type="text"
								value={field.types.value}
							/>
						</div>
						&nbsp;
						<div className="category-form-field">
							<Input
								field="name"
								isRequired
								label="* Category Name"
								maxLength={60}
								onInputChange={onCategoryNameInput}
								placeholder="Phone"
								readOnly={isLoading}
								style={{ textTransform: 'capitalize' }}
								type="text"
								value={field.name.value}
							/>
						</div>
						&nbsp;
						<div className="category-form-field">
							<span className="d-block padding-s">* Create/Select Brand</span>
							<CreatableSelect
								placeholder="Select/Create Brand"
								defaultValue={{ label: field.brand.value, value: field.brand.value }}
								onChange={onBrandChange}
								options={brandOptions}
								styles={{
									menu: provided => ({ ...provided, zIndex: 10 }),
									container: provided => ({ ...provided, marginBottom: '1.2rem' })
								}}
							/>
						</div>
					</div>
					<div className="category-form-field">
						<span className="d-block padding-s">Keyword(s)</span>
						<CreatableSelect
							isMulti
							placeholder="Select/Create Keyword"
							onChange={onKeywordChange}
							defaultValue={field.keywords.value.map(word => ({ value: word, label: word }))}
							// options={field.keywords.value.map(word => ({ value: word, label: word }))}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 })
							}}
						/>
					</div>
					<br />
					<div className="category-form-field category-form-submit">
						 <button
							className="button"
							disabled={isLoading}
							type="submit"
						>
							<CircularProgress
								theme="light"
								visible={isLoading}
							/>
							{isLoading ? 'Saving Category' : 'Save Category'}
						</button> 
					</div>
				</div>
			</form>
		</div>
	);
};

CategoryForm.propTypes = {
	isLoading: PropTypes.bool,
	onSubmit: PropTypes.func,
	category: PropTypes.shape({
        types: PropTypes.string,
		name: PropTypes.string,
		brand: PropTypes.string,
		keywords: PropTypes.arrayOf(PropTypes.string),
	})
};

export default CategoryForm;
 */