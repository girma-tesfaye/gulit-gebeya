import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Route from '../../constants/routes';
import * as ROUTE from '../../constants/routes';
//import logo from '../../images/logo-full.png';
import ScrollToTop from '../../components/ui/components/ScrollToTop';

const Footer = () => {
	const { pathname } = useLocation();

	/* const hiddenFooterPaths = [
		Route.SIGNIN,
		Route.SIGNUP,
		Route.FORGOT_PASSWORD,
		Route.ACCOUNT
	]; */

	return (
		<>
			{(pathname === ROUTE.HOME ||pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH || pathname === ROUTE.CATEGORY_SEARCH || pathname === ROUTE.VIEW_SHOP) && (
				<footer className="footer">
					
						<div className="footer-col-1">
							<ul className="footer-contents">
								<li className="footer-items">
									<Link
										className="footer-components"
										to={Route.ABOUT_US}
									>
										About Us
									</Link>
									<Link
										className="footer-components"
										to={Route.CONTACT_US}
									>
										Contact Us
									</Link>
									<Link
										className="footer-components"
										to={Route.FOLLOW_US}
									>
										Follow Us
									</Link>
									<Link
										className="footer-components"
										to={Route.HELP_CENTER}
									>
										Help Center
									</Link>
								</li>
							</ul>
						</div>
						<div className="footer-col-2">
							{/* <img className="footer-logo" src={logo} />  */}
							<h2>Marcot.com</h2>
							<h5>&copy;&nbsp;{new Date().getFullYear()}</h5>
							<strong><span>Developed by <a href="https://github.com">Girma Tesfaye</a></span></strong>
						</div>
						<div className="footer-col-3">
							
							<ScrollToTop />
							<strong>
								<span>
									Fork this project &nbsp;
						<a href="https://github.com">HERE</a>
								</span>
							</strong>
						</div>
					
				</footer>
			)}
		</>
	);
};

export default Footer;
