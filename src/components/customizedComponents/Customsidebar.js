import React, {useEffect, useState } from 'react';
import Boundary from '../../helpers/Boundary';
import { getUiUtills } from '../../redux/actions/helperActions';
import { useSelector, useDispatch} from 'react-redux';
import { useLocation, useHistory} from 'react-router-dom';
import { setLoading } from '../../redux/actions/miscActions';
import FiltersCollapse from '../sideNav/FiltersCollapse';

const CustomSideBar = (props) => {

	const utills = useSelector(state => state.utills);  
	
	const dispatch = useDispatch();
    const history = useHistory(); 
  	const [click, setClick] = useState(false);

  	const handleClick = () => setClick(!click);

  	const onCategoryClicked = (ItemName) => {
		setClick(false);    
		history.push(`/category_search/${ItemName}`);
	}

    const [isFetching, setFetching] = useState(false);    

    const fetchUtills = (ui, categories, main) => {
		setFetching(true);
		dispatch(getUiUtills({ui:ui ,categories: categories, main: main}));
	};

	useEffect(() => {
		if (utills) {
			fetchUtills(1, null, null);
		}
			return () => dispatch(setLoading(false));
	}, []);

	const store = useSelector(state => ({
		filter: state.filter,
		products: state.products.items,
		basketLength: state.basket.length,
		profile: state.profile,
		isLoading: state.app.loading,
		isAuthenticating: state.app.isAuthenticating,
		productsLength: state.products.items.length
	}));

	return (
		<Boundary>						
			<div className="custom-sidebar">     
				<div className="custom-sidebar-header">
					<h3 className="custom-sidebar-header-title">Search by Category</h3>
					
				</div> 
				<div className="custom-sidebar-contents">
					
					<div className="sidebar-filters">
						<FiltersCollapse /> 
					</div>
					<ul 
						className="sidebar-categorys-links"
						onClick={handleClick}
					>
						<div className="all-categories-header">
							<h5>All categories</h5>
						{utills.ui.categories.map((categorys, index) => {
						return (
							<li 
								className="category-list"
								key={index}
							>
								<a 
									className="category-link"
									onClick={() => onCategoryClicked(categorys.value)}
								>
									{categorys.main}
								</a>
							</li>
						);
						})}
						</div>
					</ul>					
				</div>
				
			</div>        	
		</Boundary>
	);
};

export default CustomSideBar;