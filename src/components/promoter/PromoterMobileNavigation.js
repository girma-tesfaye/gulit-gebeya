import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import * as ROUTE from '../../constants/routes';
//import UserNav from '../../pages/account/components/UserAvatar';
//import BasketToggle from '../basket/BasketToggle';
//import Badge from './components/Badge';
import SearchBar from '../ui/components/SearchBar';
//import FiltersToggle from './components/FiltersToggle';
//import logo from '../../images/logo-full.png';
//import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
//import SideNavToggle from '../sideNav/SideBarToggle';
//import * as FaIcons from 'react-icons/fa';

const Navigation = (props) => {
	const history = useHistory();
	const { pathname } = useLocation();

	const onClickLink = (e) => {
		if (props.isAuthenticating) e.preventDefault();
	};

	return (
		<nav className="mobile-navigation">
			<div className="mobile-navigation-main">
				<div className="mobile-navigation-logo">
					<Link onClick={onClickLink} to={ROUTE.HOME}>
						{/* {<img src={logo} style={{ width: '150px', height: 'inherit', objectFit: 'contain' }} /> } */}
						<h2>SALINAKA</h2>
					</Link>
				</div>
                

                <ul className="navigation-menu-main">
					{/* <li>
						<Link to={ROUTE.HOME} style={{ color: '#101010' }}>HOME</Link>
					</li> */}
					<li>
						<Link to={ROUTE.SHOP}>GET PRODUCT</Link>
					</li>	
					{/* <li
            			className='nav-item'
            			onMouseEnter={onMouseEnter}
            			onMouseLeave={onMouseLeave}
          			>
            			<Link
              				to='/'
              				className='nav-links'
              				
            			>
              				CATEGORIES <FontAwesomeIcon icon='caret-down'/>
            			</Link>
            			{dropdown && <Dropdown MenuItems={categoryOptions}/>}
          			</li> */}

				</ul>

				{/* <BasketToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							onClick={onClickToggle}
							disabled={props.disabledPaths.includes(pathname)}
						>

							<Badge count={props.basketLength}>
                                <FontAwesomeIcon icon='shopping-bag' style={{ fontSize: '2rem' }}/>
							</Badge>
						</button>
					)}
				</BasketToggle> */}
				{/* <ul className="mobile-navigation-menu">
					{props.isAuth ? (
						<li className="mobile-navigation-item">
							<UserNav isAuthenticating={props.isAuthenticating} profile={props.profile} />
						</li>
					) : (
							<>
								{pathname !== SIGNIN && (
									<li className="mobile-navigation-item">
										<Link
											className="navigation-menu-link"
											onClick={onClickLink}
											to={SIGNIN}
										>
											Sign In
										</Link>
									</li>
								)}
							</>
						)}
				</ul> */}
			</div>
			<div className="mobile-navigation-sec">
				{/* <SideNavToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							disabled={basketDisabledpathnames.includes(pathname)}
							onClick={onClickToggle}
						>
							<FaIcons.FaBars />
					
							
						</button>
					)}
				</SideNavToggle> */}
				<SearchBar
					isLoading={props.isLoading}
					filter={props.filter}
				/>
				{/* <FiltersToggle
					filter={props.filter}
					isLoading={props.isLoading}
					products={props.products}
					productsCount={props.productsLength}
					history={history}
				>
					<button className="button-link button-small">
                        <FontAwesomeIcon icon='filter'/>
					</button>
				</FiltersToggle> */}
			</div>
		</nav>
	);
}

Navigation.propType = {
	path: PropTypes.string.isRequired,
	disabledPaths: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navigation;
