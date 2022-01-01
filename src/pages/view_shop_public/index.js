import React, { useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../helpers/CircularProgress';
import firebase from '../../firebase/firebase';
import useScrollTop from '../../hooks/useScrollTop';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { clearShopProducts } from '../../redux/actions/productActions';
import ImageLoader from '../../helpers/ImageLoader';
import { displayDate } from '../../helpers/utils';
import ProductGrid from '../../components/product/ProductGrid';

import Img0 from '../../images/banner1.jpg';
import Img1 from '../../images/banner-human-hair.png';
import defaultavatar from '../../images/defaultAvatar.jpg';

import useFeaturedProducts from '../../hooks/useFeaturedProducts';
import ProductFeatured from '../../components/product/ProductFeatured';
import useBestProducts from '../../hooks/useBestProducts';
import ProductBest from '../../components/product/ProductBest';
import MessageDisplay from '../../helpers/MessageDisplay';

import VideoLink from './components/ExpandableVideoLink'; 

import { ACCOUNT, HOME} from '../../constants/routes';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FaMobile } from 'react-icons/fa';
import { MobileStepper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      display: 'block',
      '& > *': {
      margin: theme.spacing(1),
    },
    },
    avatar: {
        margin: "1rem 0",
        width: 80,
        height: 80,
    },
    mobileavatar: {
        margin: ".5rem 0",
        width: 40,
        height: 40,
    },
    profile: {
        minWidth: 400,
        background: "#f2f2f2"
    },
    shopProfile: {
        margin:"-0.5rem", 
        boxShadow:'none',
        marginBottom: "15px"
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: 'bold'
    },
    titlemobile: {
        fontSize: "1.75rem",
        fontWeight: 'bold'
    },
    reviews: {
        background: "#e1e1e1",
        width: '100%',
        boxShadow: "none",
        marginBottom: "-5px" 
    },
    reviewer: {
        display: "flex"
    },
    revieweravatar: {
        width: 50,
        height: 50
    },
    reviewernamewrapper: {
        display: "block",
        marginTop: -20
    },
    reviewername: {
        fontSize: "1.75rem",
        fontWeight: 'bold'
    },
    comment: {
        fontSize: "1.5rem"
    },
    rating: {
        fontSize: "1.5rem",
        marginTop: "1rem",
        borderBottom: "1px solid #660033"
    }
  }));

const ViewShopPublic = () => {
    useScrollTop();

    const {
		featuredProducts,
		fetchFeaturedProducts,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useFeaturedProducts(6);
    const {
		bestProducts,
		fetchBestProducts,
		isLoading: isLoadingBest,
		error: errorBest,
	} = useBestProducts(6);

    const classes = useStyles();

    return (
        <>
            <section className="product-list-wrapper">
                <div className="user-shop-profile">
                    <div className="user-shop-profile-block">
                        <div className="user-shop-profile-banner">
                            <div className="user-shop-profile-banner-wrapper">
                                <ImageLoader
                                    alt="Banner"
                                    className="user-shop-profile-banner-img"
                                    src={Img0}
                                />
                                <div className="video-link-display">
                                    <VideoLink />
                                </div>
                            </div>
                            
                            <Grid xs={12} className="user-shop-detail-wrapper"> 
                                {window.screen.width <=800? 
                                    (<Avatar alt="avatar" src={defaultavatar} className={classes.mobileavatar}/>):
                                    (<Avatar alt="avatar" src={defaultavatar} className={classes.avatar}/>)
                                }
                                <Card className={classes.shopProfile}>
                                    <CardContent className={classes.profile} variant="outlined">
                                    {window.screen.width <=800? 
                                        (<Typography className={classes.titlemobile} color="textSecondary" gutterBottom>
                                            G-tech Electronics shop
                                        </Typography>):(
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            G-tech Electronics shop
                                        </Typography>)
                                    }
                                        <Typography variant="h6" component="h2">
                                            Date joined : June 19, 2021
                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            Address : Adama
                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            Items belong to this shop: Electronics and beuty materials
                                        </Typography>
                                        <Typography variant="h6" component="h2">
                                            Customer rating: 3.5
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <div className="shop-owner-button">
                                    <button
                                        className="button button-small user-shop-profile-edit" 
                                    >
                                        <Link to={ACCOUNT}>Owner Detail</Link>
                                    </button>
                                    <br />
                                    <button 
                                        className="button button-small user-shop-owner-contact-button"
                                    >
                                        Contact owner
                                    </button>
                                </div>
                            </Grid>
                        </div>
                        <div className="shop-descriptions">
                            <span>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered Buying eyewear should leave you happy and good-looking, </span>
                        </div>
                        
                        <div className="user-shop-profile-details">
                            <div className="user-shop-profile-customer-reviews">
                                <div className="user-shop-profile-customer-reviews-header">
                                    <h4> Customer Reviews </h4>
                                </div>
                                <div className="user-shop-profile-customer-reviews-wrapper">
                                    <Card className={classes.reviews}>
                                        <CardContent>
                                            <div className={classes.reviewer}>
                                                <Avatar className={classes.revieweravatar} alt="avatar" src={defaultavatar}/>
                                                <CardContent className={classes.reviewernamewrapper}>
                                                    <Typography className={classes.reviewername} color="textSecondary">
                                                        Girma Tesfaye
                                                    </Typography>
                                                    <Typography variant="h6" component="h2">
                                                        Buyer
                                                    </Typography>
                                                    <Typography variant="h6" component="h2">
                                                        June 19, 2021
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                            <Typography className={classes.comment} variant="body2" component="p">
                                                Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got
                                            </Typography>
                                            <Typography className={classes.rating} color="textSecondary">
                                                Rating: 4.5
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Card className={classes.reviews}>
                                        <CardContent>
                                            <div className={classes.reviewer}>
                                                <Avatar className={classes.revieweravatar} alt="avatar" src={defaultavatar}/>
                                                <CardContent className={classes.reviewernamewrapper}>
                                                    <Typography className={classes.reviewername} color="textSecondary">
                                                        Girma Tesfaye
                                                    </Typography>
                                                    <Typography variant="h6" component="h2">
                                                        Buyer
                                                    </Typography>
                                                    <Typography variant="h6" component="h2">
                                                        June 19, 2021
                                                    </Typography>
                                                </CardContent>
                                            </div>
                                            <Typography className={classes.comment} variant="body2" component="p">
                                                Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got
                                            </Typography>
                                            <Typography className={classes.rating} color="textSecondary">
                                                Rating: 4.5
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="shop-products-display">
                    <div className="display-header">
                        <h2>Bests of the shop</h2>
                    </div>
                    <div className="shop-product-display-grid">
                        {(errorBest && !isLoadingBest) ? (
                            <MessageDisplay
                                message={errorBest}
                                action={fetchBestProducts}
                                buttonLabel="Try Again"
                            />
                        ) : ( (window.screen.width <=800)? (
                                <>
                                    {bestProducts.length === 0 ? new Array(2).fill({}).map((product, index) => (
                                        <ProductBest
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : bestProducts.map(product => (
                                        <ProductBest
                                            key={product.id}
                                            isLoading={isLoadingBest}
                                            product={product}
                                        />
                                    ))}
                                </>
                            ):(
                                <>
                                    {bestProducts.length === 0 ? new Array(5).fill({}).map((product, index) => (
                                        <ProductBest
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : bestProducts.map(product => (
                                        <ProductBest
                                            key={product.id}
                                            isLoading={isLoadingBest}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )	
                        )}
                    </div>
                </div>
                <div className="shop-products-display">
                    <div className="display-header">
                        <h2>Recently Added items</h2>
                    </div>
                    <div className="shop-product-display-grid">
                        {(errorFeatured && !isLoadingFeatured) ? (
                            <MessageDisplay
                                message={errorFeatured}
                                action={fetchFeaturedProducts}
                                buttonLabel="Try Again"
                            />
                        ) : ( (window.screen.width <=800)? (
                                <>
                                    {featuredProducts.length === 0 ? new Array(2).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            ):(
                                <>
                                    {featuredProducts.length === 0 ? new Array(5).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )	
                        )}
                    </div>
                </div>
                <div className="shop-products-display">
                    <div className="display-header">
                        <h2>Most Selled Products</h2>
                    </div>
                    <div className="shop-product-display-grid">
                        {(errorFeatured && !isLoadingFeatured) ? (
                            <MessageDisplay
                                message={errorFeatured}
                                action={fetchFeaturedProducts}
                                buttonLabel="Try Again"
                            />
                        ) : ( (window.screen.width <=800)? (
                                <>
                                    {featuredProducts.length === 0 ? new Array(2).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            ):(
                                <>
                                    {featuredProducts.length === 0 ? new Array(5).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )	
                        )}
                    </div>
                </div>
                <div className="shop-products-display">
                    <div className="display-header">
                        <h2>Most Reviewed Products</h2>
                    </div>
                    <div className="shop-product-display-grid">
                        {(errorFeatured && !isLoadingFeatured) ? (
                            <MessageDisplay
                                message={errorFeatured}
                                action={fetchFeaturedProducts}
                                buttonLabel="Try Again"
                            />
                        ) : ( (window.screen.width <=800)? (
                                <>
                                    {featuredProducts.length === 0 ? new Array(2).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            ):(
                                <>
                                    {featuredProducts.length === 0 ? new Array(5).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )	
                        )}
                    </div>
                </div>
                <div className="shop-products-display">
                    <div className="display-header">
                        <h2>Hihg rating itemss</h2>
                    </div>
                    <div className="shop-product-display-grid">
                        {(errorFeatured && !isLoadingFeatured) ? (
                            <MessageDisplay
                                message={errorFeatured}
                                action={fetchFeaturedProducts}
                                buttonLabel="Try Again"
                            />
                        ) : ( (window.screen.width <=800)? (
                                <>
                                    {featuredProducts.length === 0 ? new Array(2).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            ):(
                                <>
                                    {featuredProducts.length === 0 ? new Array(5).fill({}).map((product, index) => (
                                        <ProductFeatured
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : featuredProducts.map(product => (
                                        <ProductFeatured
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )	
                        )}
                    </div>
                </div>
            </section>
        </>
     );
};

export default ViewShopPublic;


/* import React, { useState, useEffect} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CircularProgress from '../../helpers/CircularProgress';
import { HOME } from '../../constants/routes';
import firebase from '../../firebase/firebase';
import useScrollTop from '../../hooks/useScrollTop';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import { clearShopProducts } from '../../redux/actions/productActions';
import ImageLoader from '../../helpers/ImageLoader';
import { displayDate } from '../../helpers/utils';
import ProductGrid from '../../components/product/ProductGrid';


const ViewShop = () => {
    useScrollTop();
    const [shop, setShop] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    useDocumentTitle(`View ${id ? id : null} Shop`);
    useScrollTop();

    const store = useSelector(state => ({
        filter: state.filter,
        basket: state.basket,
        filteredProducts: state.products.shopProducts.items,
        requestStatus: state.app.requestStatus,
        isLoading: state.app.loading,
        lastRefKey: state.products.shopProducts.lastRefKey,
        productsCount: state.products.shopProducts.items.length,
        totalProductsCount: state.products.shopProducts.total,
    }));

    useEffect(() => {
        dispatch(clearShopProducts());
        firebase.getShop(id)
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    setShop(data);
                } else {
                    history.push(HOME);
                }
            })
            .catch((e) => {
                history.push(HOME);
            }
            );
        return () => dispatch(clearShopProducts());
    }, []);

    return shop ? (
        <>
            <section className="product-list-wrapper">
                <div className="user-profile-shop">
                    <div className="user-profile-block">
                        <div className="user-profile-banner">
                            <div className="user-profile-banner-wrapper">
                                <ImageLoader
                                    alt="Banner"
                                    className="user-profile-banner-img"
                                    src={shop.shopBanner}
                                />
                            </div>
                            <div className="user-profile-avatar-wrapper">
                                <ImageLoader
                                    alt="Avatar"
                                    className="user-profile-img"
                                    src={shop.shopAvatar}
                                />
                            </div>
                            <button
                                className="button button-small user-profile-edit"
                            >
                                Owner Detail
                            </button>
                        </div>

                        <div className="user-profile-details">
                            <h3 className="user-profile-name">{shop.shopName}</h3>
                            <span>Email : <a>{shop.shopEmail ? shop.shopEmail : 'email no found'}</a></span>
                            <br />
                            <span>Address : {shop.shopAddress ? (
                                shop.shopAddress
                            ) : (
                                <span className="text-subtle text-italic">Address not set</span>
                            )}</span>
                            <br />
                            <span>Mobile : {shop.shopMobile ? (
                                shop.shopMobile.data ? (
                                    <a>{shop.shopMobile.data.num ? `+${shop.shopMobile.data.num}` : '+251'}</a>
                                ) : (
                                    <span className="text-subtle text-italic">Mobile not set</span>
                                )
                            ) : (<div />)}</span>
                            <br />

                            <span>Date Created : {shop.shopDateCreated ? (
                                displayDate(shop.shopDateCreated)
                            ) : (
                                <span className="text-subtle text-italic">Not available</span>
                            )}</span>
                            <br />

                        </div>
                    </div>
                </div>

                <ProductGrid store={store} shopId={id} />
            </section>
        </>

    ) : (
        <div className="loader"><CircularProgress /></div>
    );
};

export default ViewShop;
 */