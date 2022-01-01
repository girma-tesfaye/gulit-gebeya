import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
	useLayoutEffect(() => {
		if (title) {
			document.title = title;
		} else {
			document.title = 'Gullit Gebeya - eCommerce React App';
		}
	}, [title]);
};

export default useDocumentTitle;
