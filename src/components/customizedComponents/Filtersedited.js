import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter, applyFilter } from '../../../redux/actions/filterActions';
import { selectMax, selectMin } from '../../../selectors/selector';
import PriceRange from './PriceRange';
import CreatableSelect from 'react-select/creatable';
import useDidMount from '../../../hooks/useDidMount';
import Select from 'react-select';
import Input from '../../../helpers/Input';

const Filters = ({ closeModal }) => {

	const { filter, isLoading, products, uiUtills } = useSelector (state => ({
		filter: state.filter,
		isLoading: state.app.loading,
		products: [...state.products.recommendedProducts.items, ...state.products.featuredProducts.items],
		uiUtills: state.utills.ui
	}));

	const [field, setFilter] = useState({
		brand: { value: filter.brand? filter.brand: ''},
		minPrice: filter.minPrice,
		maxPrice: filter.maxPrice,
		sortBy: filter.sortBy,
		keyword: filter.keyword,
		category: { value: filter.category? filter.category : '' },
		suCategory: { value: filter.suCategory? filter.suCategory : '' },
		size: { value: filter.size? filter.size : '' },
	});

	const history = useHistory();
	const dispatch = useDispatch();
	const didMount = useDidMount();
	
	const max = selectMax(products);
	const min = selectMin(products);

	const [categoryField, setCategoryField] = useState([]);
	const [categoryOptions, setCategoryOptions] = useState([]);
	const [brandOptions, setBrandOptions] = useState([]);
	const [sizeOptions, setSizeOptions] = useState([]);

	useEffect(() => {
		if (uiUtills) {
			const categoriesValue = (uiUtills.categories) && (uiUtills.categories.map((category) =>
				({ value: category.main, label: category.main })
			));
			const brandValue = (uiUtills.brands) && (uiUtills.brands.map((brand) =>
				({ value: brand, label: brand })
			));
			const sizeValue = (uiUtills.sizes) && (uiUtills.sizes.map((size) =>
				({ value: size, label: size })
			));
			setCategoryOptions(categoriesValue);
			setBrandOptions(brandValue);
			setSizeOptions(sizeValue);
		}
	}, [uiUtills]);

	const getSubCategoryOptions = (catValue) => {
		const value = uiUtills ? (uiUtills.categories ? uiUtills.categories.find((x) =>
			(x.main === catValue)
		) : null) : null;

		const subCategoriesValue = value ? (value.sub.map((subCategory) =>
			({ value: subCategory, label: subCategory })
		)) : [];
		return subCategoriesValue;
	}	

	useEffect(() => {
		if (didMount && window.screen.width <= 480) {
			history.push('/');
		}

		if (didMount && closeModal) closeModal();

		setFilter(filter);
		window.scrollTo(0, 0);
	}, [filter]);

	const onPriceChange = (min, max) => {
		setFilter({ ...field, minPrice: min, maxPrice: max });
	};

	const onBrandFilterChange = (newValue) => {
		setFilter({ ...field, brand: { value: newValue.value, label: newValue.value } });
	};

	const onSortFilterChange = (e) => {
		setFilter({ ...field, sortBy: e.target.value });
	};

	const onCategoryFilterChange = (newValue) => {
		setCategoryField(newValue.value)
		setFilter({ ...field, category: { value: newValue.value, label: newValue.value } });
	}

	const onSubCategoryFilterChange = (newValue) => {
		setFilter({ ...field, subCategory: { value: newValue.value, label: newValue.value } });
	}

	const onSizeFilterChange = (newValue) => {
		setFilter({ ...field, size: { value: newValue.value, label: newValue.value } });
	};

	const onKeywordInput = (newValue) => {
		setFilter({ ...field, keyword: newValue });
	}
	
	const onApplyFilter = () => {
		const updateFilter = {...field,
			category: field.category?field.category.value: '',
			subCategory: field.subCategory?field.subCategory.value:'',
			size: field.size?field.size.value: '',
			brand: field.brand?field.brand.value: '',
		}
		const isChanged = Object.keys(updateFilter).some(key => updateFilter[key] !== filter[key]);

		if (updateFilter.minPrice > updateFilter.maxPrice) {
			return false;
		}

		if (isChanged) {
			dispatch(applyFilter(updateFilter));                       // after appling filter the modal is not closed cheack

		} else {
			closeModal();
		}
	};

	const onResetFilter = () => {		
		const filterFields = ['brand', 'minPrice', 'maxPrice', 'sortBy' , 'category' , 'subCategory' , 'size' , 'keyword'];				
		if (filterFields.some(key => !!filter[key])) {
			dispatch(resetFilter());
		} else {
			closeModal();
		}
	};

	return (
		<div className="filters">
			<div className="filters-field">
				<span>Brand</span>
				<br />
				<br />
				{isLoading ? (
					<h5 className="text-subtle">Loading Filter</h5>
				) : (
					<CreatableSelect
						className="filters-brand"
						value={field.brand}
						maxMenuHeight={160}
						disabled={isLoading}
						onChange={onBrandFilterChange}
						options={brandOptions}
					>
					</CreatableSelect>
				)}
			</div>
			<div className="filters-field">
				<span>Category</span>
				<br />
				<br />
				<Select
					className="filters-sort-by d-block"
					value={field.category}
					maxMenuHeight={160}
					disabled={isLoading}
					onChange={onCategoryFilterChange}
					options={categoryOptions}
				>
				</Select>
			</div>
			<div className="filters-field">
				<span>Sub Category</span>
				<br />
				<br />
				<Select
					className="filters-sort-by d-block"
					value={field.subCategory}
					maxMenuHeight={160}
					disabled={isLoading}
					onChange={onSubCategoryFilterChange}
					options={getSubCategoryOptions(categoryField)}
				>
				</Select>
			</div>
			<div className="filters-field">
				<span>Sort By</span>
				<br />
				<br />
				<select
					className="filters-sort-by d-block"
					value={field.sortBy}
					disabled={isLoading}
					onChange={onSortFilterChange}
				>
					<option value="">None</option>
					<option value="price_high_to_low">Sort by price High-Low</option>
					<option value="price_low_to_high">Sort by price Low-High</option>
					<option value="date-asc">Sort by oldest</option>
					<option value="date-desc">Sort by latest</option>
					<option value="highest_totalSells">Sort by highest sell</option>
					<option value="highest_avgRating">Sort by highest rating</option>
					<option value="highest_numRatings">Sort by highest reviews</option>
				</select>
			</div>
			<div className="filters-field">
				<span>Size</span>
				<br />
				<br />
				<Select
					className="filters-sort-by d-block"
					value={field.size}
					maxMenuHeight={160}
					disabled={isLoading}
					onChange={onSizeFilterChange}
					options={sizeOptions}
				>
				</Select>
			</div>
			<div className="filters-field">
				<span>Search Keyword</span>
				<br />
				<br />
				<Input
					field="name"
					maxLength={60}
					onInputChange={onKeywordInput}
					readOnly={isLoading}
					//style={{ textTransform: 'capitalize' }}
					type="text"
					value={field.keyword}
				/>
			</div>
			<div className="filters-field">
				<span>Price Range</span>
				<br />
				<br />
				{(products.length === 0 && isLoading) || max === 0 ? (
					<h5 className="text-subtle">Loading Filter</h5>
				) : products.length === 1 ? (
					<h5 className="text-subtle">No Price Range</h5>
				) : (
					<PriceRange
						min={min}
						max={max}
						initMin={field.minPrice}
						initMax={field.maxPrice}
						isLoading={isLoading}
						onPriceChange={onPriceChange}
						productsLength={products.length}
					/>
				)}
			</div>
			<div className="filters-action">
				<button
					className="filters-button button button-small"
					disabled={isLoading}
					onClick={onApplyFilter}
				>
					Apply filters
                </button>
				<button
					className="filters-button button button-border button-small"
					disabled={isLoading}
					onClick={onResetFilter}
				>
					Reset filters
                </button>
			</div>
		</div>
	);
};

export default withRouter(Filters);
