import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { CardMedia } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import ReactStars from "react-rating-stars-component";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

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
    productName: {
        textIndent: 0,
        fontFamily: '"Trirong", serif',
        fontSize: 13,
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
    }

}));
const ProductFeatured = ({ isLoading, product }) => {
    const history = useHistory();

    const onClickItem = () => {
        if (isLoading) return;

        if (product.id) {
            history.push(`/product/${product.id}`);
        }
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

    const classes = useStyles();
 
    return (
        <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
            <Card className="featured-products-card" onClick={onClickItem}> 
                <CardMedia className="featured-products-img">
                    {product.image ? (
                        <ImageLoader
                            className="featured-products-card-img"
                            src={product.image}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} margin-left={'2rem'} />}
                </CardMedia>
                <div className="featured-products-details">
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
                        <Typography className={classes.reviewNumber}>4.7/5</Typography>
                    </CardContent> 
                    <CardContent className={classes.productDetailBottom}>
                        <Typography className={classes.probuctBrand}>{product.brand? product.brand :<Skeleton style={{width:'55%', borderRadius: '7px'}} />}</Typography>
                        <Typography className={classes.productPrice}>{product.price?`Etb ${product.price}.00`:<Skeleton style={{width:80, borderRadius: '7px'}} width={80} />}</Typography>
                    </CardContent> 
                </div>
            </Card>
        </SkeletonTheme>
    );
};

export default ProductFeatured;
