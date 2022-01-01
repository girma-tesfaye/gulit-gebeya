import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import AdminAdminNavigation from '../pages/adminAdmin/navigation';

const AdminAdminRoute = ({ component: Component, ...rest }) => {
	const isAuth = useSelector(state => !!state.auth.id && state.auth.role === 'ADMIN_ADMIN');

	return (
		<Route
			{...rest}
			component={props => (
				isAuth ? (
					<>
						<AdminAdminNavigation />
						<main className="content-admin">							
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

export default AdminAdminRoute;
