import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { removeFromWishList } from '../../redux/actions/wishListActions';
import ImageLoader from '../../helpers/ImageLoader';
import { displayMoney } from '../../helpers/utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const WishListItem = ({ 
	dispatch, 
	product,
	isLoading
	}) => {

	const onRemoveFromWishList = () => dispatch(removeFromWishList(product.id));
	const history = useHistory();

	const onClickItem = () => {
		if (isLoading) return;

		if (product.id) {
			history.push(`/product/${product.id}`);
		}
	};

	return (
		<div className="wishList-item" >
			<div className="wishList-item-wrapper" >
				<div className="wishList-item-img-wrapper" onClick={onClickItem}>
					<ImageLoader
						className="wishList-item-img"
						src={product.image}
						
					/>
				</div>
				<div className="wishList-item-details">
					<h5 className="wishList-item-name">
						{product.selectedColor && <FontAwesomeIcon icon='square' style={{ color: product.selectedColor }}/>}
						&nbsp;
						{product.brand}
					</h5>
					<h5 className="wishList-item-price">
						{displayMoney(product.price * product.quantity)}
						<span>{` (x ${product.quantity})`}</span>
						&nbsp;
						{product.selectedSize && <span>| {product.selectedSize} mm</span>}
					</h5>
				</div>

				
			</div>
			<button
					className="wishList-item-remove button button-border button-border-gray button-small"
					onClick={onRemoveFromWishList}
				>
					<FontAwesomeIcon icon='trash' />
				</button>
		</div>
	);
};

WishListItem.propType = {
	product: PropTypes.object.isRequired,
	wishList: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default WishListItem;
