import React from 'react';
import PropTypes from 'prop-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeFromBasket, addToBasket } from '../../redux/actions/basketActions';
import { removeFromWishList, addToWishList } from '../../redux/actions/wishListActions';
import { displayMoney, displayActionMessage } from '../../helpers/utils';
import ImageLoader from '../../helpers/ImageLoader';
import { ImHeart } from 'react-icons/im'; 
import { FaCartPlus } from 'react-icons/fa'; 
import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ReactStars from "react-rating-stars-component";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    productDetailName: {
        padding: 5,
    },
    productDetailPrice: {
        padding: 5,
    },
    productDetailBottom: {
        padding: 0,
        display: 'block',
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtons: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 35,
        /* background: '#ffd9cc', */
        padding: 8 
    },
    productName: {
        textAlign: 'center',
        fontFamily: '"Trirong", serif',
        fontSize: 13.5,
        fontWeight: 100,
        lineHeight: 1.25
		
    },
    productPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: '"Trirong", serif'
    }, 
    ratingWrapper: {
        display: 'flex',
        padding: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    reviewNumber: {
        padding: 0,
        width: 'min-content',
        fontSize: 14,
        paddingLeft: 10
    },
    probuctBrand: {
        fontSize: 14,
        fontFamily: '"Trirong", serif',
    },
	button: {
		margin: 'auto',
		position: 'absolute',
		left: 5,
		boxShadow: 'none',
		padding: '0 0.5rem',
		fontSize: 12,
		textTransform: 'capitalize',
		fontFamily: '"Trirong", serif',
		opacity: 0.75
	},
}));

const ProductItem = ({
	product,
	isItemOnBasket,
	isItemOnWishList,
	isLoading
}) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const onClickItem = () => {
		if (isLoading) return;

		if (product.id) {
			history.push(`/product/${product.id}`);
		}
	};

	const onAddToBasket = () => {
		if (isItemOnBasket) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			dispatch(addToBasket(product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	const onAddToWishList = () => {
		if (isItemOnWishList) {
			dispatch(removeFromWishList(product.id));
			displayActionMessage('Item removed from WishList', 'info');
		} else {
			dispatch(addToWishList(product));
			displayActionMessage('Item added to WishList', 'success');
		}
	};

	const ratingChanged = (newRating) => {
        console.log(newRating);
      };

	const classes = useStyles();

	return (
		<SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
			<Card className={`product-card ${!product.id ? 'product-loading' : ''}`}>
				<Card className="product-card-content" onClick={onClickItem} >
					<CardMedia className="product-card-img-wrapper">
						{product.image ? (
							<ImageLoader
								className="product-card-img"
								src={product.image}
							/>
						) : <Skeleton width={'100%'} height={'90%'} />}
					</CardMedia>
					<div className="product-card-details">
						<CardContent className={classes.productDetailName}>
							<Typography className={classes.productName}> {product.name || <Skeleton style={{width:'100%',borderRadius: '7px'}} />}</Typography>
						</CardContent>
						<CardContent className={classes.ratingWrapper}> 
							<ReactStars
								style={{fontSize: 20, padding: 0, color: '#ff6f00'}}
								count={5}
								onChange={ratingChanged}
								size={18}
								isHalf={true}
								emptyIcon={<i className="far fa-star"></i>}
								halfIcon={<i className="fa fa-star-half-alt"></i>}
								fullIcon={<i className="fa fa-star"></i>}
								activeColor="#ffd700"
							/>
							<Typography className={classes.reviewNumber}>4.7</Typography>
						</CardContent> 
						<CardContent className={classes.productDetailBottom}>
							<Typography className={classes.probuctBrand}>{product.brand? product.brand :<Skeleton style={{width:'65%', borderRadius: '7px'}} />}</Typography>
							<Typography className={classes.productPrice}>{product.price?`Etb ${product.price}.00`:<Skeleton style={{width:80, borderRadius: '7px'}} width={80} />}</Typography>
						</CardContent> 
					</div>
				</Card>
				<CardContent className={classes.actionButtons}>
					<Button
						variant="contained"
						disableElevation
						color="secondary"
						className={classes.button}
					>
						Ask Owner
					</Button>
					{product.id && (
						<button
							className={`product-card-button-wishList button-block ${isItemOnWishList ? 'button-border-onwishList' : 'button-border-offwishList'}`}
							onClick={onAddToWishList}
						>
							{isItemOnWishList? <ImHeart style={{width:15, height: 15}}/> : <ImHeart style={{width:17.5, height: 17.5}}/>}
						</button>
					)}
					{product.id && (
						<button
							className={`product-card-addToBasket-button button ${isItemOnBasket ? 'button-border button-border-gray onBasket' : 'offBasket'}`}
							onClick={onAddToBasket}
						>
							<div>
								{isItemOnBasket ? <FaCartPlus style={{width:17.5, height: 17.5}}/>: <FaCartPlus style={{width:17.5, height: 17.5}}/>}
							</div>
						</button>
					)}
				</CardContent>
			</Card>
		</SkeletonTheme>
	);
};

ProductItem.propType = {
	product: PropTypes.object.isRequired,
	isItemOn
	: PropTypes.bool,
	isItemOnWishList: PropTypes.bool
};

export default ProductItem;
