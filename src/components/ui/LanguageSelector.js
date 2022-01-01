/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';

const UserNav = () => {
	const userNav = useRef(null);
	const toggleDropdown = (e) => {
		const closest = e.target.closest('div.user-nav');

		try {
			if (!closest && userNav.current.classList.contains('user-sub-open-lang')) {
				userNav.current.classList.remove('user-sub-open-lang');
			}
		} catch (err) { }
	};

	useEffect(() => {
		document.addEventListener('click', toggleDropdown);

		return () => document.removeEventListener('click', toggleDropdown);
	}, []);

	const onClickNav = () => {
		userNav.current.classList.toggle('user-sub-open-lang');
	};

	return (
			<div
				className="user-nav"
				onClick={onClickNav}
				ref={userNav}
			>
				<h5 className="text-overflow-ellipsis">ENG</h5>
				<div className="icon-caret user-caret"/>
				<div className="user-nav-sub">
					
						<Link
							className="user-nav-sub-link"
						>
							Amh
						</Link>
					
				</div>
			</div>
		);
};

export default UserNav
