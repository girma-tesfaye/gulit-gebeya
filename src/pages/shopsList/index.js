import React, { useState, useEffect } from 'react';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';
import { withRouter, Link } from 'react-router-dom';
import ImageLoader from '../../helpers/ImageLoader';
import { VIEW_SHOP} from '../../constants/routes';

import Img0 from '../../images/banner-safety.png';
import Img1 from '../../images/banner-human-hair.png';
import Img2 from '../../images/banner-mobile.png';
import { Paper, Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const ShopsList = () => {
	useDocumentTitle('Gullit Gebeya | Home');
	useScrollTop();

	const defaultBanners = [
			{image:Img0},
			{image:Img1},
			{image:Img2}
	]

    return (
		<div className="shops-list">
			<Paper>Best Sellers</Paper>
			{defaultBanners.map((shops, index) => {
				return (	
				<Grid container spacing={3} className="shop-container" >
					<Grid item xs={12} className="shop-card">
						<Link
							to={VIEW_SHOP}
						>
							<ImageLoader
								className="shop-card-img"
								key={index}
								src={shops.image}
							/>
						</Link>
						<div className="shop-details">
							<h4 className="shop-detail-items" id="shop-tittle">G-Techs Electronics Shops</h4>
							<h4 className="shop-detail-items">Shop Categories</h4>
							<h4 className="shop-detail-items">Customer Reviews and Ratings Customer Reviews and Ratings Customer Reviews and Ratings</h4>
							<button className="shop-detail-items">Contact Owner</button>
							<button className="shop-detail-items">See details of this shop</button>
						</div>
						
					</Grid>
				</Grid>
			)})}
		</div>
    );
};

export default ShopsList;
