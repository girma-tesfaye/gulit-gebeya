import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
    
const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
    },
    brandName: {
        position: 'absolute',
        width: 'auto',
        fontSize: 13,
        fontFamily: '"Trirong", serif',
        margin: 5,
        background: '#fff',
        lineHeight: 'inherit'
    },
    productDetailBottom: {
        padding: 0,
    },
    productPrice: {
        fontSize: 14,
        fontFamily: '"Trirong", serif',
        position: 'relative',
        top: 5
    }
}));

const Productorginal = ({ isLoading, product }) => {
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (product.id) {
            history.push(`/product/${product.id}`);
        }
    };

    const classes = useStyles();

    return (
        <Grid className={classes.root}>
            <Card className="original-products" onClick={onClickItem}> 
                <Typography className={classes.brandName}>{product.brand}</Typography>
                <CardMedia className="original-products-card-img" style={{borderRadius: 0}} >
                    {product.image ? (
                        <ImageLoader 
                            className="original-products-img"
                            src={product.image}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} overflow={'hiden'}/>}
                    
                </CardMedia>
                <div className="original-products-details">
                    <CardContent className={classes.productDetailBottom}>
                        <Typography className={classes.productPrice}> {product.price?`ETB ${product.price}`:<Skeleton style={{width:'90%', borderRadius: '7px'}} />} </Typography>
                    </CardContent>
                </div>
            </Card>
        </Grid>
    ); 
};

export default Productorginal;

/* item xs={12} sm={6} md={4} lg={4} xl={3} spacing={6} */