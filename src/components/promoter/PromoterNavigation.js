import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ADMIN_DASHBOARD } from '../../constants/routes';
import UserAvatar from '../../pages/account/components/UserAvatar';
import logo from '../../images/logo-full.png';
import SideNavToggle from '../sideNav/SideBarToggle';
import * as FaIcons from 'react-icons/fa';
import * as ROUTE from '../../constants/routes';

const PromoterNavigation = () => {
	const { isAuthenticating, profile } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		profile: state.profile
	}));

	const onClickLink = (e) => {
		if (isAuthenticating) e.preventDefault();
	};

	return (
		window.screen.width <= 800 ? (
			<nav className="mobile-navigation">
				<div className="mobile-navigation-main">
					<SideNavToggle>
						{({ onClickToggle }) => (
							<button
								className="button-link navigation-menu-link basket-toggle"								
								onClick={onClickToggle}
							>
								<FaIcons.FaBars />
							</button>
						)}
					</SideNavToggle>
					<div className="mobile-navigation-logo">
						<Link onClick={onClickLink} to={ADMIN_DASHBOARD}>							
							<h2>PROMOTER PANEL</h2>
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
			</nav>
		) : (
			<nav className="navigation navigation-admin">
				<div className="logo">
					<Link to={ADMIN_DASHBOARD} style={{ display: 'flex', alignItems: 'center' }}>
						{window.screen.width >= 800 && <img src={logo} />}
						<h3>PROMOTER PANEL</h3>
					</Link>
				</div>
				<ul className="navigation-menu-main">
					<li>
						<Link to={ROUTE.HOME}>Home</Link>
					</li>
					<li>
						<Link to={ROUTE.SHOP}>Shop</Link>
					</li>
					<li>
						<Link to={ROUTE.PROMOTER_DASHBOARD}>Dashboard</Link>
					</li>
					<li>
						<Link to={ROUTE.PROMOTER_PRODUCTS}>Products</Link>
					</li>
				</ul>
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

export default PromoterNavigation;
