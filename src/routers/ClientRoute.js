/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//import WishList from '../components/wishList/WishList';
import Basket from '../components/basket/Basket';
import Navigation from '../components/ui/Navigation';
import MiniNavigation from '../components/ui/MiniNavigation';
import SideBar from '../components/sideNav/SideBar';
import Footer from '../components/ui/Footer';

import { SIGNIN, ADMIN_DASHBOARD } from '../constants/routes';

const PrivateRoute = ({
	isAuth,
	userType,
	component: Component,
	path,
	...rest
}) => (
		<Route
			{...rest}
			component={props => (
				isAuth && (userType === 'USER' || userType === 'PROMOTER' || userType === 'ADMIN' || userType === 'ADMIN_ADMIN')
					? (
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
					: isAuth && userType === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
						: <Redirect to={{
							pathname: SIGNIN,
							state: { from: props.location }
						}}
						/>
			)}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});

export default connect(mapStateToProps)(PrivateRoute);
