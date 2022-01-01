import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import firebase from '../../firebase/firebase';
import useDidMount from '../../hooks/useDidMount';
import Boundary from '../../helpers/Boundary';
import WishListItem from './WishListItem';
// Just add this feature if you want :P,

const WishList = () => {

	const wishList = useSelector(state => state.wishList);  

	const dispatch = useDispatch();
	const didMount = useDidMount();


	useEffect(() => {
		if (didMount && firebase.auth.currentUser && wishList.length !== 0) {
			firebase.saveWishListItems(wishList, firebase.auth.currentUser.uid)
				.then(() => {
					console.log('Item saved to wishList');
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [wishList]);



	return (		
		<Boundary>
			<div className="wishList">
				{wishList.length <= 0 && (
					<div className="wishList-empty">
						<h5 className="wishList-empty-msg">You don't have wish Lists</h5>
					</div>
				)}
				{wishList.map((product, i) => (
					<WishListItem 
						key={`${product.id}_${i}`}
						product={product}
						wishlist={wishList}
						dispatch={dispatch}
					/>
						
				))}					
			</div>	
		</Boundary>		
	);
};
export default WishList;