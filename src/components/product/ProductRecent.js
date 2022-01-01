import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const Productorginal = ({ isLoading, product }) => {
	
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (product.id) {
            history.push(`/product/${product.id}`);
        }
    };

    return (
        <Card onClick={onClickItem}> 
            <CardMedia >
                {product.image ? (
                    <ImageLoader
                        className="prepared-products-img"
                        src={product.image}
                    />
                ) : <Skeleton width={'100%'} height={'100%'} overflow={'hiden'}/>
				}
            </CardMedia>
			<CardContent>
        		<Typography variant="body2" color="textSecondary" component="p">
					{product.price || <Skeleton width={80} />}
				</Typography>
			</CardContent>
		</Card>
    );
};

export default Productorginal;
