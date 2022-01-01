import React from 'react';
import WishList from '../../../components/wishList/WishList';
import Wishlist from '../../../components/wishList/WishList'

// Just add this feature if you want :P

const UserWishListTab = () => (
	<div className="loader" style={{ minHeight: '80vh' }}>
		{/* <h3>My Wish List</h3>
		<strong><span className="text-subtle">You don't have a wish list</span></strong> */}
		<div>
			<WishList />
		</div>
	</div>
);

export default UserWishListTab;
