import React, { useState, useRef, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import CircularProgress from '../../../helpers/CircularProgress';
import ImageLoader from '../../../helpers/ImageLoader';
import Input from '../../../helpers/Input';

import useFileHandler from '../../../hooks/useFileHandler';
import PropTypes from 'prop-types';
import InputColor from './InputColor';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import firebase from '../../../firebase/firebase'
import CustomizableTable from "./Table/CustomizableTable";

// import uuid from 'uuid';
// Default brand names that I used. You can use what you want

 

const ProductForm = ({ product, onSubmit, isLoading }) => {	
	

	const [brandOptions, setBrandOptions] = useState({});
	const [categoryOptions, setCategoryOptions] = useState({});
	const [subCategoryOptions, setSubCategoryOptions] = useState([]);
	const [sizeOptions, setSizeOptions] = useState({});
	const [optionsLoading, setOptionsLoading] = useState(true);	

	const changeToObject = (options) => {
		const optionObject = options.map((planet) =>
      		({value: planet,label: planet})	
		);

		return optionObject;
	}

	const getSubCategoryOptions = (catValue) => {
		
		const value = subCategoryOptions.find((x) => {
			return x.id === catValue;
		});
		const finalValue = (value)?value.value:[];
		return changeToObject(finalValue);
	}

	useEffect(() => {
		setOptionsLoading(true);
        firebase.getCategorys()
        	.then((doc) => {
                if (doc.exists) {
                    const data = doc.data();						
					data.brands && setBrandOptions(changeToObject(data.brands));
					data.categories && setCategoryOptions(changeToObject(data.categories));
					data.sizes && setSizeOptions(changeToObject(data.sizes));
					const items = [];
						
					data.subCategories.map(subCat => (
						items.push({ id: subCat.id, value: subCat.value})							
					));
					setSubCategoryOptions(items);
					setOptionsLoading(false);																
                } else {
                    //history.push(SHOP);
                }
            })
            .catch((e) => {
                //history.push(SHOP);
            });	        
    }, []);	


	const defaultProduct = {
		imageCollection: [],
		...product
	};

	const [field, setField] = useState({
		name: { value: product ? defaultProduct.name : '' },
		brand: { value: product ? defaultProduct.brand : '' },
		price: { value: product ? defaultProduct.price : 0 },
		description: { value: product ? defaultProduct.description : '' },
		imageUrl: { value: product ? defaultProduct.image : '' },
		imageCollection: { value: product ? defaultProduct.imageCollection : [] },
		category: { value: product ? defaultProduct.category : '' },
		subCategory: { value: product ? defaultProduct.subCategory : '' },
		keywords: { value: product ? defaultProduct.keywords : ['orginal'] },
		availableColors: { value: product ? defaultProduct.availableColors : [] },
		availableSizes: { value: product ? defaultProduct.availableSizes : [] },
		maxQuantity: { value: product ? defaultProduct.maxQuantity : 0 },
		quantityPrice: { value: product ? defaultProduct.quantityPrice : [] },
		preparedToDelivery: { value: product ? defaultProduct.preparedToDelivery : false },	
		isBestProduct: { value: product ? defaultProduct.isBestProduct : false },	
		isFeatured: { value: product ? defaultProduct.isFeatured : false },
		isRecommended: { value: product ? defaultProduct.isRecommended : false },
		isOrginal: { value: product ? defaultProduct.isOrginal : false },
		
	});

	const [quantityP, setQuantityP] = useState('');
	const [quantityPri, setQuantityPri] = useState('');

	const onquantityPInput = (value, error) => {
		setQuantityP(value);		
	};

	const onquantityPriInput = (value, error) => {
		setQuantityPri(sanitizeNumber(value));
	};

	const onQuantityPriceSubmitForm = (e) => {
		e.preventDefault();
		const newValue = field.quantityPrice.value;
		newValue.push({ quantity: quantityP, price: quantityPri});		
		setField({ ...field, quantityPrice: {value: newValue }});		
	}

	const onQuantityPriceClear = (e) => {
		e.preventDefault();				
		setField({ ...field, quantityPrice: {value: [] }});		
	}

	const {
		imageFile,		
		isFileLoading,
		onFileChange,
		removeImage,
		
	} = useFileHandler({ image: {}, imageCollection: field.imageCollection.value });

	const sanitizeNumber = (num) => {
		return Number(num.toString().replace(/^0*/, ''));
	};

	const onProductNameInput = (value, error) => {
		setField({ ...field, name: { value, error } });
	};

	const onBrandChange = (newValue) => {
		setField({ ...field, brand: { value: newValue.value } });
	};

	const onCategoryChange = (newValue) => {
		setField({ ...field, category: { value: newValue.value } });
	};

	const onSubCategoryChange = (newValue) => {
		setField({ ...field, subCategory: { value: newValue.value } });
	};

	const onProductPriceInput = (value, error) => {
		setField({ ...field, price: { value: sanitizeNumber(value), error } });
	};

	const onProductDescriptionInput = (value, error) => {
		setField({ ...field, description: { value, error } });
	};

	const onProductMaxQuantityInput = (value, error) => {
		setField({ ...field, maxQuantity: { value: sanitizeNumber(value), error } });
	};

	const onAddSelectedColor = (color) => {
		if (!field.availableColors.value.includes(color)) {
			setField({ ...field, availableColors: { value: [...field.availableColors.value, color] } });
		}
	};

	const onDeleteSelectedColor = (color) => {
		const filteredColors = field.availableColors.value.filter(c => c !== color);

		setField({ ...field, availableColors: { value: filteredColors } });
	};

	const onKeywordChange = (newValue) => {
		const keywords = newValue.map(word => word.value);

		setField({ ...field, keywords: { value: keywords } });
	};

	const onAvailableSizesChange = (newValue) => {
		const availableSizes = newValue.map(word => word.value);

		setField({ ...field, availableSizes: { value: availableSizes } });		
	};

	const onFeaturedCheckChange = (e) => {
		setField({ ...field, isFeatured: { value: e.target.checked } });
	}

	const onRecommendedCheckChange = (e) => {
		setField({ ...field, isRecommended: { value: e.target.checked } });
	}

	const onPreparedToDeliveryCheckChange = (e) => {
		setField({ ...field, preparedToDelivery: { value: e.target.checked } });
	}

	const onBestProductCheckChange = (e) => {
		setField({ ...field, bestProduct: { value: e.target.checked } });
	}

	const onIsOrginalCheckChange = (e) => {
		setField({ ...field, isOrginal: { value: e.target.checked } });
	}

	const onSubmitForm = (e) => {
		e.preventDefault();
		// eslint-disable-next-line no-extra-boolean-cast
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (field.name.value
			&& field.price.value 
			&& field.maxQuantity.value
			&& (imageFile.image.file || field.imageUrl.value)
			&& noError
		) {
			const newProduct = {};

			Object.keys(field).forEach((i) => {
				newProduct[i] = field[i].value;
			});

			onSubmit({
				...newProduct,
				quantity: 1,
				name_lower: newProduct.name.toLowerCase(), // due to firebase function billing policy, let's add lowercase version of name here instead in firebase functions
				dateAdded: new Date().getTime(),
				image: imageFile.image.file ? imageFile.image.file : field.imageUrl.value,
				imageCollection: imageFile.imageCollection
			});
		}
	};

	const catValue = field.category.value;
	return (
		
		<div>			
			<form
				className="product-form"
				onSubmit={onSubmitForm}
			>
				{/*<div className="mini-display" style={{display: 'none'}} >
					 <Grid container spacing={3}>
						<Grid item xs={12}> 
							<CustomizableTable 
								onSubmit={onSubmit}
							/>
						</Grid>
					</Grid> 
				</div>*/}
				<div className="product-form-inputs">
					<div className="d-flex">
						<div className="product-form-field">
							<Input
								field="name"
								isRequired
								label="* Product Name"
								maxLength={60}
								onInputChange={onProductNameInput}
								placeholder="Takla"
								readOnly={isLoading}
								style={{ textTransform: 'capitalize' }}
								type="text"
								value={field.name.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
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
					<div className="d-flex">
						<div className="product-form-field">
							<span className="d-block padding-s">* Select Related Category</span>
							<Select
								placeholder="Select Related Category"
								defaultValue={{ label: field.category.value, value: field.category.value }}
								onChange={onCategoryChange}
								disabled={optionsLoading}
								options={categoryOptions}
								styles={{
									menu: provided => ({ ...provided, zIndex: 10 }),
									container: provided => ({ ...provided, marginBottom: '1.2rem' })
								}}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<span className="d-block padding-s">* Select Related Sub Category</span>
							<Select
								placeholder="Select Related Sub Category"
								disabled={optionsLoading}
								defaultValue={{ label: field.subCategory.value, value: field.subCategory.value }}
								onChange={onSubCategoryChange}
								options={(catValue)?getSubCategoryOptions(catValue):[]}
								styles={{
									menu: provided => ({ ...provided, zIndex: 5 }),
									container: provided => ({ ...provided, marginBottom: '1.2rem' })
								}}
							/>
						</div>
					</div>
					<div className="product-form-field product-textarea">
						<Input
							cols={37}
							field="description"
							isRequired={false}
							label="Product Description"
							maxLength={200}
							onInputChange={onProductDescriptionInput}
							placeholder="Nice Description (include detail spesfications and delivery details)"
							readOnly={isLoading}
							rows={5}
							type="textarea"
							value={field.description.value}
						/>
					</div>
					<div className="d-flex">
						<div className="product-form-field">
							<Input
								field="price"
								isRequired
								label="* Price"
								onInputChange={onProductPriceInput}
								placeholder="Product Price"
								readOnly={isLoading}
								type="number"
								value={field.price.value}
							/>
						</div>
						&nbsp;
						<div className="product-form-field">
							<Input
								field="maxQuantity"
								isRequired
								label="* Stock Total"
								onInputChange={onProductMaxQuantityInput}
								placeholder="Stock Total"
								readOnly={isLoading}
								type="number"
								value={field.maxQuantity.value}
							/>
						</div>
					</div>					
					<form
						className="product-form"
						
					>
						<div className="d-flex">
							<div className="product-form-field">
								<Input
									field="quantityP"
									isRequired
									label="* Quantity"
									onInputChange={onquantityPInput}
									placeholder="Quantity"
									readOnly={isLoading}
									type="number"
									value={quantityP}
								/>
							</div>
							&nbsp;
							<div className="product-form-field">
								<Input
									field="quantityPri"
									isRequired
									label="* Price"
									onInputChange={onquantityPriInput}
									placeholder="Price"
									readOnly={isLoading}
									type="number"
									value={quantityPri}
								/>
							</div>
							&nbsp;
							<button
								className="button"
								disabled={isLoading}
								
								onClick= {onQuantityPriceSubmitForm}
							>
								
								{isLoading ? 'Add' : 'Add'}
							</button>
							&nbsp;
							<button
								className="button"
								disabled={isLoading}
								
								onClick= {onQuantityPriceClear}
							>
								
								{isLoading ? 'Clear' : 'Clear'}
							</button>							
						</div>
					</form>
					<div>							
						{field.quantityPrice.value.map((quantityPrice, index) => (
							<h6 key={index}>{`${quantityPrice.quantity} Product With ${quantityPrice.price} Birr`}</h6>
						))}						
					</div>
					<div className="product-form-field">
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
					<InputColor
						availableColors={field.availableColors.value}
						onDeleteSelectedColor={onDeleteSelectedColor}
						onAddSelectedColor={onAddSelectedColor}
					/>
					<br />
					<div className="product-form-field">
						<span className="d-block padding-s">Available Sizes</span>
						<CreatableSelect sizeOptions
							isMulti
							placeholder="Input Available Sizes"
							onChange={onAvailableSizesChange}
							options={sizeOptions}
							defaultValue={field.availableSizes.value.map(word => ({ value: word, label: word }))}
							// options={field.keywords.value.map(word => ({ value: word, label: word }))}
							styles={{
								menu: provided => ({ ...provided, zIndex: 10 })
							}}
						/>
					</div>
					<br />
					<div className="product-form-field">
						<span className="d-block padding-s">Image Collection</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file-collection"
							multiple
							onChange={e => onFileChange(e, { name: 'imageCollection', type: 'multiple' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file-collection">
								Choose Images
							</label>
						)}
					</div>
					<div className="product-form-collection">
						<>
							{imageFile.imageCollection.length >= 1 && (
								imageFile.imageCollection.map(image => (
									<div
										className="product-form-collection-image"
										key={image.id}
									>
										<ImageLoader
											alt=""
											src={image.url}
										/>
										<button
											className="product-form-delete-image"
											onClick={() => removeImage({ id: image.id, name: 'imageCollection' })}
											title="Delete Image"
											type="button"
										>
											<FontAwesomeIcon icon='times-circle'/>
										</button>
									</div>
								))
							)}
						</>
					</div>
					<br />
					<div className="d-flex">
						<div className="product-form-field">
							<input
								checked={field.isFeatured.value}
								className=""
								id="featured"
								onChange={onFeaturedCheckChange}
								type="checkbox"
							/>
							<label htmlFor="featured">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Add to Featured &nbsp;
							</h5>
							</label>
						</div>
						<div className="product-form-field">
							<input
								checked={field.isRecommended.value}
								className=""
								id="recommended"
								onChange={onRecommendedCheckChange}
								type="checkbox"
							/>
							<label htmlFor="recommended">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Add to Recommended &nbsp;
							</h5>
							</label>
						</div>
						<div className="product-form-field">
							<input
								checked={field.preparedToDelivery.value}
								className=""
								id="preparedToDelivery"
								onChange={onPreparedToDeliveryCheckChange}
								type="checkbox"
							/>
							<label htmlFor="preparedToDelivery">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Prepared To Delivery &nbsp;
							</h5>
							</label>
						</div>
						<div className="product-form-field">
							<input
								checked={field.isBestProduct.value}
								className=""
								id="preparedToDelivery"
								onChange={onBestProductCheckChange}
								type="checkbox"
							/>
							<label htmlFor="preparedToDelivery">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Best Product &nbsp;
							</h5>
							</label>
						</div>
						<div className="product-form-field">
							<input
								checked={field.isOrginal.value}
								className=""
								id="isOrginal"
								onChange={onIsOrginalCheckChange}
								type="checkbox"
							/>
							<label htmlFor="isOrginal">
								<h5 className="d-flex-grow-1 margin-0">
									&nbsp; Add To Orginal &nbsp;
							</h5>
							</label>
						</div>
					</div>
					<br />
					<br />
					<div className="product-form-field product-form-submit">
						<button
							className="button"
							disabled={isLoading}
							type="submit"
						>
							<CircularProgress
								theme="light"
								visible={isLoading}
							/>
							{isLoading ? 'Saving Product' : 'Save Product'}
						</button>
					</div>
				</div>
				<div className="product-form-file">
					<div className="product-form-field">
						<span className="d-block padding-s">* Thumbnail</span>
						<input
							disabled={isLoading}
							hidden
							id="product-input-file"
							onChange={e => onFileChange(e, { name: 'image', type: 'single' })}
							readOnly={isLoading}
							type="file"
						/>
						{!isFileLoading && (
							<label htmlFor="product-input-file">
								Choose Image
							</label>
						)}
					</div>
					<div className="product-form-image-wrapper">
						{(imageFile.image.url || field.imageUrl.value) && (
							<ImageLoader
								alt=""
								className="product-form-image-preview"
								src={imageFile.image.url || field.imageUrl.value}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

ProductForm.propTypes = {
	isLoading: PropTypes.bool,
	onSubmit: PropTypes.func,
	product: PropTypes.shape({
		name: PropTypes.string,
		brand: PropTypes.string,
		price: PropTypes.number,
		maxQuantity: PropTypes.number,
		description: PropTypes.string,
		category: PropTypes.string,
		subCategory: PropTypes.string,
		keywords: PropTypes.arrayOf(PropTypes.string),
		image: PropTypes.string,
		availableColors: PropTypes.arrayOf(PropTypes.string),
		availableSizes: PropTypes.arrayOf(PropTypes.string),
		//quantityPrice: PropTypes.arrayOf(PropTypes.string),
		imageCollection: PropTypes.arrayOf(PropTypes.object)
	})
};

export default ProductForm;

