import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_PRODUCTS, ADMIN_CATEGORYS } from '../../constants/routes';

const SideNavigation = () => {
	return (
		<aside className="sidenavigation">
			<div className="sidenavigation-wrapper">
				<div className="sidenavigation-item">
					<NavLink
						activeClassName="sidenavigation-menu-active"
						className="sidenavigation-menu"
						to={ADMIN_PRODUCTS}
					>
						Products
					</NavLink>
				</div>
				<div className="sidenavigation-item">
					<NavLink
						activeClassName="sidenavigation-menu-active"
						className="sidenavigation-menu"
						to={ADMIN_CATEGORYS}
					>
						Category
					</NavLink>
				</div>
				<div className="sidenavigation-item">
					<a className="sidenavigation-menu">Users</a>
				</div>
			</div>
		</aside>
	);
};

export default SideNavigation;
