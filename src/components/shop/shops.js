import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import ImageLoader from '../../helpers/ImageLoader';
import { useHistory } from 'react-router-dom';

const Shops = ({ isLoading, shop }) => {
    
    const history = useHistory();
    const onClickItem = () => {
        if (isLoading) return;

        if (shop.id) {
            history.push(`/user_shop/${shop.id}`);
        }
    };
    console.log(shop);
    
    return (
       
        <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
            <div className="product-display" onClick={onClickItem}>
                <div className="product-display-img">
                    {shop.shopDisplay? (
                        <ImageLoader
                            className="product-card-img"
                            src={shop.shopDispaly}
                        />
                    ) : <Skeleton width={'100%'} height={'100%'} />}
                </div>
                <div className="product-display-details">
                    <h2>{shop.shopName || <Skeleton width={80} />}</h2>
                    {/* <p className="text-subtle text-italic">
                        {shop.profile.shop.shop || <Skeleton width={40} />}
                    </p> */}
                </div>
            </div>
        </SkeletonTheme>
        
    );
};

export default Shops;
