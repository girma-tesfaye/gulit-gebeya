import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import PromoterNavigation from '../components/promoter/PromoterNavigation';
import PromoterSideBar from '../components/promoter/PromoterSideBar';
//import AdminSideNavMobile from '../components/sideNav/SideBar';

const PromoterRoute = ({ component: Component, ...rest }) => {
	const isAuth = useSelector(state => !!state.auth.id && state.auth.role === 'PROMOTER');

	return (
		<Route
			{...rest}
			component={props => (
				isAuth ? (
					<>
						<PromoterNavigation />
						<main className="content-admin">
							{/* {window.screen.width >= 800 && <PromoterSideBar />}
							{window.screen.width <= 800 && <AdminSideNavMobile />} */}
                            <PromoterSideBar />
							<div className="content-admin-wrapper">
								<Component {...props} />
							</div>
						</main>
					</>
				) : <Redirect to="/" />
			)}
		/>
	);
};

export default PromoterRoute;
