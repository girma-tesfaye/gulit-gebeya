import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 200,
    },
    productDetailName: {
        padding: 0,
    },
    productName: {
        padding: 10,
        display: '-webkit-box',
        overflow: 'hidden',
        lineHeight: 1.25,
        fontSize: 16,
        fontWeight: 100,
        fontFamily: '"Trirong", serif',
    },
    productDetailBottom: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 35,
        background: 'midnightblue',
        padding: 0
    },
    productPrice: {
        width: 'min-content',
        position: 'absolute',
        left: 0,
        margin: 6,
        fontSize: 15,
        fontWeight: 100,
        fontFamily: '"Trirong", serif',
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#fff',
    },
    probuctBrand: {
        width: '50%',
        position: 'absolute',
        right: 0,
        width: 'auto',
        margin: 6,
        fontSize: 15,
        fontWeight: 100,
        fontFamily: '"Trirong", serif',
        whiteSpace: 'nowrap', 
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: '#fff'
    },
}));

const Productprepared = ({ isLoading, product }) => {
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
            <Card className="prepared-products" onClick={onClickItem}>
                <CardMedia className="prepared-products-card-img">
                    {product.image ? (
                        <ImageLoader
                            className="prepared-products-img"
                            src={product.image}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} />}
                </CardMedia>
                <div className="prepared-products-details">
                    <CardContent className={classes.productDetailName}>
                        <Typography 
                            className={classes.productName}
                        > 
                            {product.name || <Skeleton style={{width:'100%', borderRadius: '7px'}} />}
                        </Typography>
                    </CardContent>
                    <CardContent className={classes.productDetailBottom}>
                        <Typography 
                            className={classes.productPrice}
                        >
                            {product.price?`Etb ${product.price}`:<Skeleton style= {{width: 65, borderRadius: '5px'}} />}
                        </Typography>
                        <Typography 
                            className={classes.probuctBrand}
                        >
                            {product.brand? product.brand :<Skeleton style= {{width: 65, borderRadius: '5px'}} />}
                        </Typography>
                    </CardContent> 
                </div>
            </Card>
        </Grid>
    );
};

export default Productprepared;