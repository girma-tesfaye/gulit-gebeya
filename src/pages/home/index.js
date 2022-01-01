import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { VIEW_SHOP, VIEW_SHOP_PUBLIC } from '../../constants/routes';
import MessageDisplay from '../../helpers/MessageDisplay';
import Banner from '../../components/banner/Banner';
import ProductOrginal from '../../components/product/ProductOrginal';
import ProductPrepared from '../../components/product/ProductPrepared';
import ProductFeatured from '../../components/product/ProductFeatured';
import ProductRecommended from '../../components/product/ProductRecommended';
import useOrginalProducts from '../../hooks/useOrginaLProducts';
import useFeaturedProducts from '../../hooks/useFeaturedProducts';
import usePreparedProducts from '../../hooks/usePreparedProducts';
import useRecommendedProducts from '../../hooks/useRecommendedProducts';
import useShops from '../../hooks/useShops';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import useScrollTop from '../../hooks/useScrollTop';
//import CustomizableTable from "./Table/CustomizableTable";

import Grid from '@material-ui/core/Grid';
import 'react-pro-sidebar/dist/css/styles.css';

const Home = () => {
	useDocumentTitle('Gullit Gebeya | Home');
	useScrollTop();
	
	const {
		orginalProducts,
		fetchOrginalProducts,
		isLoading: isLoadingOrginal,
		error: errorOrginal,
	} = useOrginalProducts(12);
	const {
		preparedProducts,
		fetchPreparedProducts,
		isLoading: isLoadingPrepared,
		error: errorPrepared,
	} = usePreparedProducts(6);
	const {
		recommendedProducts,
		fetchRecommendedProducts,
		isLoading: isLoadingRecommended,
		error: errorRecommended,
	} = useRecommendedProducts(10);
	const {
		featuredProducts,
		fetchFeaturedProducts,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useFeaturedProducts(10);

	const [columnCount, setColumnCount] = useState();
    const productListWrapper = useRef(null);

	const onProductsLengthChanged = () => {
        const width = window.screen.width;

        setColumnCount(Math.floor(width / 200));
    };

    useEffect(() => {
        if (productListWrapper) {
            onProductsLengthChanged();
        }
    }, []);

	return (
		<div className="home">
			<div>
				<Banner />
			</div>
			{/*<div className="mini-display"  style={{display: 'none'}}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<CustomizableTable />
					</Grid>
				</Grid>
			</div> */}
			<div className="mini-display">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div className="original-products-display"> 
							<div className="original-products-header">
								<h3>Original items</h3>
							</div>
							<div className="original-products-wraper">
							
								{(errorOrginal && !isLoadingOrginal) ? (
									<MessageDisplay
										message={errorOrginal}
										action={fetchOrginalProducts}
										buttonLabel="Try Again"
									/>
								) : (
									<>
										{orginalProducts.length === 0 ? (
											<>
												{(window.screen.width <360) ? (
													new Array(2).fill({}).map((product, index) => (
														<ProductOrginal
															key={`product-skeleton ${index}`}
															product={product}
														/>
													))
												): (
													<>
														{(window.screen.width) <=690  ? (
															new Array(3).fill({}).map((product, index) => (
																<ProductOrginal
																	key={`product-skeleton ${index}`}
																	product={product}
																/>
															))): (new Array(columnCount).fill({}).map((product, index) => (
																	<ProductOrginal
																		key={`product-skeleton ${index}`}
																		product={product}
																	/>
															)))
														}
													</>
													)
												}
											</>
											): ( orginalProducts.map(product => (
												<ProductOrginal
													key={product.id}
													isLoading={isLoadingFeatured}
													product={product}
												/>
											)))
										}
									</>
								)}
							</div>
						</div>
					</Grid>
				</Grid>
			</div>
			<div className="mini-display">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div className="prepared-products-display">
							<div className="prepared-products-header">
								<h3>prepapared to Deliver items</h3>
							</div>
							<div className="prepared-products-wraper">
							{(errorPrepared && !isLoadingPrepared) ? (
								<MessageDisplay
									message={errorPrepared}
									action={fetchPreparedProducts}
									buttonLabel="Try Again"
								/>
							) : ( 
								<>
									{preparedProducts.length === 0 ? (
										<>
											{(window.screen.width) <=480  ? 
												new Array(2).fill({}).map((product, index) => (
													<ProductPrepared
														key={`product-skeleton ${index}`}
														product={product}
													/>
												)) : (
													<>
														{(window.screen.width) <=600  ? 
															new Array(3).fill({}).map((product, index) => (
																<ProductPrepared
																	key={`product-skeleton ${index}`}
																	product={product}
																/>
															)): new Array(columnCount).fill({}).map((product, index) => (
																	<ProductPrepared
																		key={`product-skeleton ${index}`}
																		product={product}
																	/>
															))
														}
													</>
												)	
											}
										</>
										): (preparedProducts.map(product => (
											<ProductPrepared
												key={product.id}
												isLoading={isLoadingPrepared}
												product={product}
											/>
										)))
									}	
								</>)
							}
							</div>
						</div>
					</Grid>
				</Grid>
			</div>	
			<div className="featured-products-container">
				<div className="featured-products-header">
					<h2>Featured Products</h2>
					<Link to={VIEW_SHOP}>See All</Link>
				</div>
				<div className="featured-products-grid">
					{(errorFeatured && !isLoadingFeatured) ? (
						<MessageDisplay
							message={errorFeatured}
							action={fetchFeaturedProducts}
							buttonLabel="Try Again"
						/>
					  ) : ( 
							<>
								{featuredProducts.length === 0 ? ( 
									<>
										{(window.screen.width <=480) ? 
											new Array(2).fill({}).map((product, index) => (
												<ProductFeatured
													key={`product-skeleton ${index}`}
													product={product}
												/>
											)): new Array(columnCount).fill({}).map((product, index) => (
												<ProductFeatured
													key={`product-skeleton ${index}`}
													product={product}
												/>
											)) 

										}
									</>
									): featuredProducts.map(product => (
										<ProductFeatured
											key={product.id}
											isLoading={isLoadingFeatured}
											product={product}
										/>
									))
								}
							</>
						)	
					}
				</div>
			</div>
			<div className="recommended-products-container"> 
				<div className="recommended-products-header">
					<h2>Recommended Products</h2>
					<Link to={VIEW_SHOP_PUBLIC}>See All</Link>
				</div>
				<div className="recommended-products-grid">
					{(errorRecommended && !isLoadingRecommended) ? (
						<MessageDisplay
							message={errorRecommended}
							action={fetchRecommendedProducts}
							buttonLabel="Try Again"
						/>
					) : (
						<>
							{recommendedProducts.length === 0 ? ( 
								<>
									{(window.screen.width <=480) ? 
										new Array(2).fill({}).map((product, index) => (
											<ProductRecommended
												key={`product-skeleton ${index}`}
												product={product}
											/>
										)): new Array(columnCount).fill({}).map((product, index) => (
											<ProductRecommended
												key={`product-skeleton ${index}`}
												product={product}
											/>
										)) 

									}
								</>
								) : recommendedProducts.map(product => (
									<ProductRecommended
										key={product.id}
										isLoading={isLoadingRecommended}
										product={product}
									/>
							))}
						</>
					)
				}
				</div>
			</div>
		</div>				
	);
};

export default Home;