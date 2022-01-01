import React from 'react';

const SideBarToggle = (props) => {
	const onClickToggle = (e) => {
		if (document.body.classList.contains('is-side-nav-open')) {
			document.body.classList.remove('is-side-nav-open');
		} else {
            console.log('classList is added')
			document.body.classList.add('is-side-nav-open');
		}
	};

	/*  document.addEventListener('click', (e) => {
		//const searchInputFocused = e.target.closest('.searchbar');
		const closest = e.target.closest('.side-nav');
		const toggle = e.target.closest('.side-nav-toggle');
		const closeToggle = e.target.closest('.side-nav-remove');

		if (!closest && document.body.classList.contains('is-side-nav-open') && !toggle && !closeToggle) {
			document.body.classList.remove('is-side-nav-open');
		}
	}); */


	return props.children({ onClickToggle });
};

export default SideBarToggle;
