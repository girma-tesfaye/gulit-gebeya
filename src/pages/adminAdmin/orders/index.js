import React, {useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { useSelector, useDispatch} from 'react-redux';
import { displayActionMessage } from '../../../helpers/utils';
import {addCategoriesChangeUi, addBrandsChangeUi, addSizesChangeUi, addUtilsUiToCloud} from '../../../redux/actions/helperActions';

const Orders = () => {

	const dispatch = useDispatch();
    const uiUtills = useSelector(state => state.utills.ui);	
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [brandOptions, setBrandOptions] = useState([]);
	const [sizeOptions, setSizeOptions] = useState([]);

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
			const sizeValue = (uiUtills.sizes) && (uiUtills.sizes.map((size) =>
				({value:size,label:size})
			));
			setCategoryOptions(categoriesValue);
			setBrandOptions(brandValue);
			setSizeOptions(sizeValue);			
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

	const onSizeChange = (newValue) => {
		setError(false);
		setField({ ...field, size: { value: newValue.value } });        
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

	const onAddSize = (e) => {
		e.preventDefault();
		if(field.size.value === ""){
			setError(true);
			return;
		} 		
		dispatch(addSizesChangeUi(field.size.value));
		displayActionMessage("Size Added", 'success');		
	};

	const onSubmitToCloud = (e) => {
		e.preventDefault();
		if(uiUtills){		
			dispatch(addUtilsUiToCloud(uiUtills));
		}else{
			return;
		}		
	}

    return (
        <div>
            <h1>orders</h1>
			
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
				<div className="d-flex">
					<div className="product-form-field">
						<span className="d-block padding-s">Create Size</span>
						<CreatableSelect
							placeholder="Create Size"
							defaultValue={{ label: field.size.value, value: field.size.value }}
							onChange={onSizeChange}
							options={sizeOptions}
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
                        <button className="primary" onClick={onAddSize}>
                            add size
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