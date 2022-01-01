import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ADMIN_DASHBOARD } from '../../constants/routes';
import UserAvatar from '../../pages/account/components/UserAvatar';
import logo from '../../images/logo-full.png';
import SideNavToggle from '../sideNav/SideBarToggle';
import * as FaIcons from 'react-icons/fa';

const AdminNavigation = () => {
	const { isAuthenticating, profile } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		profile: state.profile
	}));

	const onClickLink = (e) => {
		if (isAuthenticating) e.preventDefault();
	};

	return (
		
		window.screen.width <= 800?( 
			<nav className="mobile-navigation">
			<div className="mobile-navigation-main">
				<SideNavToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							//disabled={basketDisabledpathnames.includes(pathname)} 
							onClick={onClickToggle}
						>
							<FaIcons.FaBars />
						
								
						</button>
					)}
				</SideNavToggle>
				<div className="mobile-navigation-logo">
				
					<Link onClick={onClickLink} to={ADMIN_DASHBOARD}>
						{/* {<img src={logo} style={{ width: '150px', height: 'inherit', objectFit: 'contain' }} /> } */}
						<h2>ADMIN PANEL</h2>
					</Link>
				</div>				
				<ul className="mobile-navigation-menu">					
					<li className="mobile-navigation-item">
						<UserAvatar
						isAuthenticating={isAuthenticating}
						profile={profile}
					/>
					</li>					
				</ul>
			</div>
			{/* <div className="mobile-navigation-sec">
				<SideNavToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							disabled={basketDisabledpathnames.includes(pathname)} 
							onClick={onClickToggle}
						>
							<FaIcons.FaBars />
						
								
						</button>
					)}
				</SideNavToggle>
				<SearchBar
					isLoading={props.isLoading}
					filter={props.filter}
				/>
				<FiltersToggle
					filter={props.filter}
					isLoading={props.isLoading}
					products={props.products}
					productsCount={props.productsLength}
					history={history}
				>
					<button className="button-link button-small">
                        <FontAwesomeIcon icon='filter'/>
					</button>
				</FiltersToggle>
			</div> */}
		</nav>
			
		):(
			<nav className="navigation navigation-admin">
				<div className="logo">
					<Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
						{window.screen.width >= 800 && <img src={logo} />}
						<h3>ADMIN PANEL</h3>
					</Link>
				</div>
				<ul className="navigation-menu">
					<li className="navigation-menu-item">
						<UserAvatar
							isAuthenticating={isAuthenticating}
							profile={profile}
						/>
					</li>
				</ul>
			</nav>
		)
	);
};

export default AdminNavigation;
