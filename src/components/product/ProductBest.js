import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Productprepared = ({ isLoading, product }) => {
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (product.id) {
            history.push(`/product/${product.id}`);
        }
    };

    return (
        <Card className="preparedtodeliver-products" onClick={onClickItem}>
            <CardMedia className="preparedtodeliver-products-card-img">
                {product.image ? (
                    <ImageLoader
                        className="preparedtodeliver-products-img"
                        src={product.image}
                    />
                ) : <Skeleton width={'100%'} height={'100%'} />}
            </CardMedia>
            <div className="preparedtodeliver-products-details">
                <div className="tproduct-price">
                    <h4> ETB {product.price || <Skeleton width={80} />}</h4>
                </div>
                <div className="tproduct-name">
                    <h4> {product.name || <Skeleton width={80} />}</h4>
                </div>
            </div>
        </Card>
    );
};

export default Productprepared;
