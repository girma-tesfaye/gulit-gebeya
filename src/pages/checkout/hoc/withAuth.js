/* eslint-disable no-nested-ternary */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const withAuth = (Component) => {
	return withRouter((props) => {
		const {
			isAuth,
			basket,
			wishList,
			profile,
			shipping,
			payment,
			promoterReferral,
		} = useSelector(state => ({
			isAuth: !!state.auth.id && !!state.auth.role,
			basket: state.basket,
			wishList: state.wishList,
			shipping: state.checkout.shipping,
			payment: state.checkout.payment,
			profile: state.profile,
			promoterReferral: state.checkout.promoterReferral,
		}));
		const dispatch = useDispatch();

		const calculateSubTotal = () => {
			let total = 0;

			if (basket.length !== 0) {
				const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
				total = result;
			}

			return total;
		};

		return (
			<>
				{!isAuth ? (
					<Redirect to="/signin" />
				) : basket.length === 0 ? (
					<Redirect to="/" />
				) : wishList.length === 0 ? (
					<Redirect to="/" />
				) : null}
				<Component
					{...props}
					basket={basket}
					wishList={wishList}
					dispatch={dispatch}
					payment={payment}
					profile={profile}
					shipping={shipping}
					subtotal={calculateSubTotal()}
					promoterReferral={promoterReferral}
				/>
			</>
		);
	});
};

export default withAuth;
