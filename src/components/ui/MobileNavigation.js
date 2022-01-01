import React, { useRef, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import { HOME, SIGNIN } from '../../constants/routes';
import UserNav from '../../pages/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './components/Badge';
import SearchBar from './components/SearchBar';
import FiltersToggle from './components/FiltersToggle';
import logo from '../../images/logo-mob.png';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import SideBarToggle from '../sideNav/SideBarToggle';
import * as FaIcons from 'react-icons/fa';
import { AiOutlineMenuUnfold } from 'react-icons/ai';

const Navigation = (props) => {
	const history = useHistory();
	const { pathname } = useLocation(); 

	const onClickLink = (e) => {
		if (props.isAuthenticating) e.preventDefault();
	};

	const appBar = useRef(null);
	const scrollHandler = () => {
		if (appBar.current && window.screen.width < 700) {
			if (window.pageYOffset >= 50) {
				appBar.current.classList.add('is-appBar-scrolled');
			} else {
				appBar.current.classList.remove('is-appBar-scrolled');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

	return (
		<nav className="mobile-navigation" /* ref={appBar} */>
			<div className="mobile-navigation-main">
				<div className="mobile-navigation-logo">
					<Link onClick={onClickLink} to={HOME}>
						<img src={logo} alt="marcot.com"/>
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
				</ul>
			</div>
			<div className="mobile-navigation-sec">
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
				<SearchBar
					isLoading={props.isLoading}
					filter={props.filter}
				/>
				<FiltersToggle
					className="mobile-filters-toggle"
					filter={props.filter}
					isLoading={props.isLoading}
					products={props.products}
					productsCount={props.productsLength}
					history={history}
				>
					<button className="button-small-filter">
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
