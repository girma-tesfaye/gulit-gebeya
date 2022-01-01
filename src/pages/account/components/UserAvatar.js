/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import SignOut from '../../../components/auth/SignOut';
import CircularProgress from '../../../helpers/CircularProgress';
import { ACCOUNT,SHOP_ACCOUNT, PROMOTER_DASHBOARD, PROMOTER_PRODUCTS, ORDER_HISTORY, ADMIN_ADMIN_USERS, ADMIN_ADMIN_SHOPS, ADMIN_ADMIN_ORDERS, ADMIN_ADMIN_DASHBOARD, HOME, UPGRADE_TO_PROMOTER_ACCOUNT} from '../../../constants/routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const UserNav = ({ profile, isAuthenticating }) => {
	const userNav = useRef(null);
	const toggleDropdown = (e) => {
		const closest = e.target.closest('div.user-nav');

		try {
			if (!closest && userNav.current.classList.contains('user-sub-open')) {
				userNav.current.classList.remove('user-sub-open');
			}
		} catch (err) { }
	};

	useEffect(() => {
		document.addEventListener('click', toggleDropdown);

		return () => document.removeEventListener('click', toggleDropdown);
	}, []);

	const onClickNav = () => {
		userNav.current.classList.toggle('user-sub-open');
	};

	return isAuthenticating ? (
		<div className="user-nav">
			<span>Signing Out</span>
			<CircularProgress />
		</div>
	) : (
			<div
				className="user-nav"
				onClick={onClickNav}
				ref={userNav}
			>
				<h5>{profile.fullname && profile.fullname.split(' ')[0]}</h5>
				<div className="user-nav-img-wrapper">
					<img
						alt=""
						className="user-nav-img"
						src={profile.avatar}
					/>
				</div>
				<div style={{color: '#fff', texShadow: '1px 1px 0 #444'}} className="icon-caret user-caret" />
				<div className="user-nav-sub">
					{profile.role !== 'ADMIN_ADMIN' && (
						<Link
							to={ACCOUNT}
							className="user-nav-sub-link"
						>
							View Account							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{((profile.role !== 'ADMIN') && (profile.role !== 'ADMIN_ADMIN')) && (
						<Link
							to={ORDER_HISTORY}
							className="user-nav-sub-link"
						>
							My Orders							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN' && (
						<Link
							to={SHOP_ACCOUNT}
							className="user-nav-sub-link"
						>
							View Shop							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'PROMOTER' && (
						<Link
							to={PROMOTER_DASHBOARD}
							className="user-nav-sub-link"
						>
							Dashboard							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'PROMOTER' && (
						<Link
							to={PROMOTER_PRODUCTS}
							className="user-nav-sub-link"
						>
							Promoted Products							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'USER' && (
						<Link
							to={UPGRADE_TO_PROMOTER_ACCOUNT}
							className="user-nav-sub-link"
						>
							Upgrade To Promoter Account							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN_ADMIN' && (
						<Link
							to={HOME}
							className="user-nav-sub-link"
						>
							Home							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN_ADMIN' && (
						<Link
							to={ADMIN_ADMIN_DASHBOARD}
							className="user-nav-sub-link"
						>
							Dashboard							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN_ADMIN' && (
						<Link
							to={ADMIN_ADMIN_USERS}
							className="user-nav-sub-link"
						>
							Users							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN_ADMIN' && (
						<Link
							to={ADMIN_ADMIN_SHOPS}
							className="user-nav-sub-link"
						>
							Shops							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					{profile.role == 'ADMIN_ADMIN' && (
						<Link
							to={ADMIN_ADMIN_ORDERS}
							className="user-nav-sub-link"
						>
							Orders							
                            <FontAwesomeIcon icon='user' />
						</Link>
					)}
					<SignOut>
						{({ onSignOut }) => (
							<h6
								className="user-nav-sub-link margin-0 d-flex"
								onClick={onSignOut}
							>
								Sign Out								
                                <FontAwesomeIcon icon='sign-out-alt' />
							</h6>
						)}
					</SignOut>
				</div>
			</div>
		);
};

UserNav.propType = {
	profile: PropTypes.object.isRequired
};

export default withRouter(UserNav);
