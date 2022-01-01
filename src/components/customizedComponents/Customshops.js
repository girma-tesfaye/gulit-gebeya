import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

const CustomShops = ({ isLoading, shop }) => {
    
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (shop.id) {
            history.push(`/user_shop/${shop.id}`);
        }
    };
    console.log(shop);
    
    return (
            <div className="shops-slider-display" onClick={onClickItem} color="#e1e1e1" highlightColor="#f2f2f2">
                <div className="shops-carousel-display-img">
                    {shop.shopAvatar? (
                        <ImageLoader
                            className="shops-carousel-card-img"
                            src={shop.shopAvatar}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} />}
                </div>
            </div>
        
    );
};

export default CustomShops;
