/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { SIGNIN, SIGNUP, ADMIN_DASHBOARD } from '../constants/routes';

import Basket from '../components/basket/Basket';
//import WishList from '../components/wishList/WishList';
import Navigation from '../components/ui/Navigation';
import MiniNavigation from '../components/ui/MiniNavigation';
import SideBar from '../components/sideNav/SideBar'; 
import Footer from '../components/ui/Footer';


const PublicRoute = ({
	userType,
	isAuth,
	component: Component,
	path,
	...rest
}) => (
		<Route
			{...rest}
			component={(props) => {
				const { from } = props.location.state || { from: { pathname: '/' } };

				return (
					
					/* isAuth && userType === 'ADMIN'
						? (
							<Redirect to={ADMIN_DASHBOARD} />
						)
						:  */(isAuth && (userType === 'USER' || userType === 'PROMOTER' || userType === 'ADMIN' || userType === 'ADMIN_ADMIN')) && (path === SIGNIN || path === SIGNUP)
						? (
							<Redirect to={from} />
						)
							: (
								<>
									<Navigation isAuth={isAuth} />
									<Basket isAuth={isAuth} />
									{/* <WishList /> */}
									<MiniNavigation />
									<SideBar />
									<main className="content">
										<Component {...props} />
									</main>
									<Footer />
								</>
							)
				);
			}}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});

export default connect(mapStateToProps)(PublicRoute);
