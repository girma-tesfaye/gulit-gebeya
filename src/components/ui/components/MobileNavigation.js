import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HOME, SIGNIN } from '../../constants/routes';
import UserNav from '../../pages/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './components/Badge';
import SearchBar from './components/SearchBar';
import FiltersToggle from './components/FiltersToggle';
import logo from '../../images/mobile-nav-logo.jpg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

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
					<Link onClick={onClickLink} to={HOME}>
						{<img src={logo} style={{ width: 'inherit', height: 'inherit', objectFit: 'contain' }} /> }
					</Link>
				</div>

				<BasketToggle>
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
				</BasketToggle>
				<ul className="mobile-navigation-menu">
					{props.isAuth ? (
						<li className="mobile-navigation-item">
							<UserNav isAuthenticating={props.isAuthenticating} profile={props.profile} />
						</li>
					) : (
							<>
								{pathname !== SIGNIN && (
									<li className="mobile-navigation-item">
										<Link
											onClick={onClickLink}
											to={SIGNIN}
										>
											Sign In
										</Link>
									</li>
								)}
							</>
						)}
				</ul>
			</div>
			<div className="mobile-navigation-sec">
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
			</div>
		</nav>
	);
}

Navigation.propType = {
	path: PropTypes.string.isRequired,
	disabledPaths: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navigation;
