/* eslint-disable indent */
import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink, Link } from 'react-router-dom';

import * as ROUTE from '../../constants/routes';
import UserAvatar from '../../pages/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './components/Badge'; 
import SearchBar from './components/SearchBar';
import FiltersToggle from './components/FiltersToggle';
import MobileNavigation from './MobileNavigation';

import logo from '../../images/logo-g.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SideBarToggle from '../sideNav/SideBarToggle';
//import { IoIosMenu } from 'react-icons/io';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import Dropdown from '../dropDown/Dropdown';
import firebase from '../../firebase/firebase';

const defaultOptions = [
	{value:'phone', label: 'phone'},
	{value:'laptop', label: 'laptop'},
	{value:'shoes', label: 'shoes'},
	{value:'beauty stuff', label: 'beauty stuff'},
	{value:'TV', label: 'TV'},
	{value:'home appliances', label: 'home appliances'},
	{value:'accesories', label: 'accesories'},
	{value:'cloth', label: 'cloth'},
];

const Navigation = ({ isAuth }) => {

	const uiUtills = useSelector(state => state.utills.ui.categories); 
	const [categoryOptions, setCategoryOptions] = useState(defaultOptions);

	useEffect(() => {
		if(uiUtills){
			const categoriesValue = uiUtills.map((category) =>
				({value:category.main,label:category.main})
			);
			setCategoryOptions(categoriesValue);			
		}
	}, [uiUtills]);

	const getSubCategoryOptions = (catValue) => {
		
		const value = uiUtills.find((x) => 
			(x.main === catValue)
		);

		const subCategoriesValue = value.sub.map((subCategory) =>
			({value:subCategory,label:subCategory})
		)
		return subCategoriesValue
		
	}	 

	const [dropdown, setDropdown] = useState(false);  

	const onMouseEnter = () => {
		if (window.innerWidth < 960) {
		setDropdown(false);
		} else {
		setDropdown(true);
		}
	};

	const onMouseLeave = () => {
		if (window.innerWidth < 960) {
		setDropdown(false);
		} else {
		setDropdown(false);
		}
	};

	const navbar = useRef(null);
	const history = useHistory();
	const { pathname } = useLocation();	
	const scrollHandler = () => {
		if (navbar.current && window.screen.width > 480) {
			if (window.pageYOffset >= 70) {
				navbar.current.classList.add('is-nav-scrolled');
			} else {
				navbar.current.classList.remove('is-nav-scrolled');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		return () => window.removeEventListener('scroll', scrollHandler);
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

	const onClickLink = (e) => {
		if (store.isAuthenticating) e.preventDefault();
	};

	// disable the basket toggle to these pathnames
	const basketDisabledpathnames = [
		ROUTE.CHECKOUT_STEP_1,
		ROUTE.CHECKOUT_STEP_2,
		ROUTE.CHECKOUT_STEP_3,
		ROUTE.SIGNIN,
		ROUTE.SIGNUP,
		ROUTE.FORGOT_PASSWORD
	]; 

	return window.screen.width <576 ? (
		<MobileNavigation
			basketLength={store.basketLength}
			disabledPaths={basketDisabledpathnames}
			isAuth={isAuth}
			products={store.products}
			isLoading={store.isLoading}
			productsCount={store.productsCount}
			filter={store.filter}
			isAuthenticating={store.isAuthenticating}
			pathname={pathname}
			profile={store.profile}
		/>
	  ) : (
			<nav className="navigation" ref={navbar} >
				<div className="logo">
					<Link className="logo-wrapper" onClick={onClickLink} to="/">
						<div className="logo-image">
							<h1>G</h1>
						</div>
						<div className="logo-name">
							<h2>Marcot.com</h2>
						</div>
					</Link>
				</div>			
				<div className="navigation-items">
					<div className="navigation-items-wraper">
						<div className="navigation-items-search">	
							<div className="navigation-items-menuToggle">
								<SideBarToggle>
									{({ onClickToggle }) => (
										<button
											className="button-link nav-menu-button side-nav-toggle"
											onClick={onClickToggle}
										>
											<AiOutlineMenuUnfold icon='shopping-bag' style={{ fontSize: '3rem'}}/>
										</button>
									)}
								</SideBarToggle>
							</div>   
							<SearchBar isLoading={store.isLoading} filter={store.filter}/>
							{(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH || pathname === ROUTE.SEARCH || pathname === ROUTE.CATEGORY_SEARCH || pathname === ROUTE.VIEW_SHOP) && (
								<FiltersToggle
									filter={store.filter}
									isLoading={store.isLoading}
									products={store.products}
									productsCount={store.productsLength}
								>
									<button className="button-small-filter button-filter">
										Filters &nbsp;<FontAwesomeIcon icon='filter' style={{ fontSize: '12px' }}/>
									</button>
								</FiltersToggle>
							)}
						</div>
						<div className="navigation-items-actions">					
							<div className="navigation-items-basket">
								<BasketToggle>
									{({ onClickToggle }) => (
										<button
											className="basket-toggle"
											disabled={basketDisabledpathnames.includes(pathname)}
											onClick={onClickToggle}
										>

											<Badge count={store.basketLength}>										
												<FontAwesomeIcon icon='shopping-bag' style={{ fontSize: '2.5rem' }}/>
											</Badge>
										</button>
									)}
								</BasketToggle>
							</div>
							{isAuth ? (
								<div className="navigation-items-avatar">
									<UserAvatar isAuthenticating={store.isAuthenticating} profile={store.profile} />
								</div>						
							) : (
								<div className="navigation-items-user">
									{pathname !== ROUTE.SIGNUP && (
										<NavLink
											activeClassName="navigation-menu-active"
											className="button button-small"
											exact
											onClick={onClickLink}
											to={ROUTE.SIGNUP}
										>
											Sign Up
										</NavLink>
									)}
									{pathname !== ROUTE.SIGNIN && (
										<NavLink
											activeClassName="navigation-menu-active"
											className="button button-small button-muted margin-left-s"
											exact
											onClick={onClickLink}
											to={ROUTE.SIGNIN}
										>
											Sign In
										</NavLink>
									)}
								</div>
							)}
						</div>
					</div>
					<div className="navigation-items-links-wrapper">
						<div className="dropdown-category">
							<Link 
								style={{fontSize: 21}}
								to='/' 
								onMouseEnter={onMouseEnter} 
								onMouseLeave={onMouseLeave}
							>
								{dropdown && <Dropdown MenuItems={categoryOptions}/>}
								Categories
							</Link>
						</div>
						<div className="navigation-items-links">
							<Link 
								className="navigation-items-link"
								to={ROUTE.HOME}
							>
								Home
							</Link>
							<Link 
								className="navigation-items-link"
								to={ROUTE.SHOP}
							>
								Shop now
							</Link>
							<Link 
							className="navigation-items-link"
							to={ROUTE.HOME}
						>
							Help
						</Link>
						</div>
					</div>
				</div>
			</nav>
		);
};

export default Navigation;
