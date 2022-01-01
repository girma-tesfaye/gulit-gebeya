import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useParams, useHistory, Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageLoader from '../../helpers/ImageLoader';
import { SHOP } from '../../constants/routes';
import { displayActionMessage, displayMoney } from '../../helpers/utils';
import firebase from '../../firebase/firebase';
import useScrollTop from '../../hooks/useScrollTop';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import ColorChooser from '../../helpers/ColorChooser';
import ProductRecommended from '../../components/product/ProductRecommended';
import useRecommendedProducts from '../../hooks/useRecommendedProducts';
import useFeaturedProducts from '../../hooks/useFeaturedProducts';
import ProductFeatured from '../../components/product/ProductFeatured';
import MessageDisplay from '../../helpers/MessageDisplay';
import AddPromoterProduct from '../../components/promoter/AddPromoterProduct';
import useBasket from '../../hooks/useBasket';
import useWishList from '../../hooks/useWishList';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import Reviews from './Reviews';
import app from 'firebase/app';
import {setPromoterReferral} from '../../redux/actions/checkoutActions';
import { makeStyles } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import ReactStars from "react-rating-stars-component";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Slider from './Components/Slider/Slider'
import Img0 from '../../images/banner1.jpg';
import defaultavatar from '../../images/defaultAvatar.jpg';
import useBestProducts from '../../hooks/useBestProducts';
import ProductBest from '../../components/product/ProductBest';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CustomizedProgressBars from './Components/RatingBars/progressBars';
import CustomizedTables from './Components/Table';

const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: 35,
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: 0,
      fontSize: 12
    },
    headerWrapper: {
        background: 'linear-gradient(45deg, black, transparent)',
        marginBottom: 10
    },
    header: {
        width: '100%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    typo: {
        fontSize: 18,
        color: '#000'
    },
    productModal: {
        display: 'flex',
        width: '100%',
        height: 400,
        padding: 10,
        background: '#e1e1e1',
    },
    mAvatar: {
        width: 30,
        height: 30,
        borderRadius: '50%'
    },
    mHeaderWrapper: {
        background: 'none',
        marginBottom: 10,
        height: 50
    },
    mProductModal: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 'auto',
        padding: 10,
        paddingBottom: 0,
        boxShadow: 'none',
        position: 'relative'
    },
    mProductDetails: {
        margin: 0,
        marginBottom: 30,
        width: '100%',
        order: 3,
    },
    mTypo: {
        fontFamily: '"Trirong", serif',
        fontSize: 14,
        paddingBottom: 5,
        textAlign: 'left',
        color: '#000'
    },
    mRatingWrapper: {
        margin: '15px 2px',
        display: 'flex',
        flexDirection: 'row',
        [theme.breakpoints.down(540)]: {
            flexDirection: 'column',
        }
      },
    mProductModel: {
        fontSize: 14,
        marginRight: 10,
        position: 'relative',
        top: 2,
        maxWidth: 'max-content',
    },
    mRating: {
        display: 'flex',
        margin: '5px 0',
        maxWidth: '100%',
        flexDirection: 'row',
        [theme.breakpoints.down(360)]: {
            flexDirection: 'column',
        },
    },
    mbrandModel: {
        display: 'flex',
        maxWidth: '100%',
        margin: '5px 0',
        flexDirection: 'row',
        [theme.breakpoints.down(540)]: {
            flexDirection: 'column',
        },
    },
    mproductBrand: {
        fontSize: 14,
        maxWidth: 'max-content',
        marginRight: 10,
    },
    mProductReviews: {
        fontSize: 14,
        marginLeft: 10,
        position: 'relative',
        maxWidth: 'max-content',
        top: 2
    }, 
    mColorChooser: {
        margin: '2rem 0',
        position: 'relative'
    },
    mProductSpec: {
        boxShadow: 'none',
        margin: '2rem 0',
        borderRadius: 0,
    },
    mActionButtons: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    displayHeader: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    mDisplay: {
        margin: 0,
        marginTop: '5rem'
    },
    productShop: {
        margin: 0,
        marginTop: '5rem',
        boxShadow: 'none',
        border: '1px solid #e1e1e1'
    },
    title: {
        fontSize: "2.5rem",
        fontWeight: 'bold'
    },
    titlemobile: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    profile: {
        Width: '100%',
        padding: 2,
        paddingBottom: 0
    },
    profileItems: {
        width: '100%',
        paddingTop: 10,
        padding: 0
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
    }, 
    productName:{
        fontSize: 14,
        fontFamily: '"Trirong", serif',
        textTransform: 'capitalize'
    },
    productBrand:{
        fontSize: 14,
        fontFamily: '"Trirong", serif',
        textTransform: 'capitalize'
    },
    productModel: {
        width: 'auto',
        marginRight: 10,
        position: 'relative',
        top: 5,
        fontFamily: '"Trirong", serif',
        fontSize: 14,
        textTransform: 'capitalize'
    },
    productRating: {
        width: 'auto',
        position: 'relative',
        display: 'flex'
    },
    productPrice: {
        fontSize: 16,
        width: 'auto',
        fontFamily: '"Trirong", serif',
        fontWeight: 'bold',
        opacity: 1
    },
    actionButtons: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: 35,
        padding: 8
    },
    button: {
        width: 'max-content',
		boxShadow: 'none',
		fontFamily: '"Trirong", serif',
	},
    detailWraper: {
        paddingBottom: 0,
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down(768.5)]: {
            flexDirection: 'column',
        },
        [theme.breakpoints.up('md')]: {
            padding: 20,
        }
    },
    productModalWraper: {
    },
    descriptionTable: { 
        margin: 0,
        background: 'none', 
        borderRadius: 10 ,
        boxShadow: 'none',
        padding: '2.5rem',
        maxWidth: 650,
        ["@media (max-width: 282px)"]: {
            padding: 5,
          },
        ["@media (min-width: 282px) and (max-width: 400px)"]: {
        padding: 15,
        },
        ["@media (min-width: 400px) and (max-width: 576px)"]: {
            padding: 20,
        },
        ["@media (min-width: 576px) and (max-width: 700px)"]: {
            padding: 35,
        },
        ['@media (min-width: 768px)'] : {
            padding: '20px 10px'
        }
    },
    tableWraper: {
      boxShadow: 'none',
      background: '#f1f1f1',
      textAlign: '-webkit-center',
      padding: 5,   
      borderRadius: 10,
    }
  }));
  
const ViewProduct = () => {

    const classes = useStyles();
    const [state, setState] = React.useState({
      age: '',
      name: 'hai',
    });
  
    const handleChange = (event) => {
      const name = event.target.name;
      setState({
        ...state,
        [name]: event.target.value,
      });
    };

    // promoter    
    const search = useLocation().search;
    const promoterProductIdFromUrl = new URLSearchParams(search).get('promoterProductId');
    const promoterId = new URLSearchParams(search).get('promoterId');
    const fromWhereFromUrl = new URLSearchParams(search).get('fromWhere');
       
    const isPromoter = useSelector(state => !!state.auth.id && state.auth.role === 'PROMOTER');

    // product
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const initProduct = useSelector(state => state.products.items.find(item => item.id === id));
    const [product, setProduct] = useState(initProduct || null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    useEffect(() => {
        //promoter
        if(promoterProductIdFromUrl && promoterId){
            dispatch(setPromoterReferral({
                id: promoterProductIdFromUrl,
                promoterId:promoterId,
                fromWhere: fromWhereFromUrl?fromWhereFromUrl:'',
		        date: app.firestore.FieldValue.serverTimestamp() || new Date().getTime()
            })) 
            console.log('dispach promoter referral', {
                id: promoterProductIdFromUrl,
                promoterId: promoterId,
                fromWhere: fromWhereFromUrl?fromWhereFromUrl:'',
		        date: app.firestore.FieldValue.serverTimestamp() || new Date().getTime()
            })            
        }
        if (!product) {
            setLoadingProduct(true);
            firebase.getProduct(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = {...doc.data(),id: doc.ref.id };
                        setProduct(data);
                        setLoadingProduct(false);                        
                    } else {
                        history.push(SHOP);
                        setLoadingProduct(false); 
                    }
                })
                .catch((e) => {
                    history.push(SHOP);
                    setLoadingProduct(false); 
                });
        }
    }, []);
    
    const { addToBasket, isItemOnBasket } = useBasket(id);
    const { addToWishList, isItemOnWishList } = useWishList(id);
    
    useScrollTop();
    useDocumentTitle(`View ${product?.name || 'Item'}`);

    const [selectedImage, setSelectedImage] = useState(product?.image || '');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');

    useEffect(() => {        
        setSelectedImage(product?.image);
    }, [product]);

    const changeToObject = (options) => {
        const optionObject = options.map((planet) =>
            ({ value: planet, label: planet })
        );

        return optionObject;
    }

    const onSelectedSizeChange = (newValue) => {
        setSelectedSize(newValue.value);
    };

    const onSelectedColorChange = (color) => {
        setSelectedColor(color);
    };

    const ratingChanged = (newRating) => {
        console.log(newRating);
      };

    const {
        bestProducts,
        fetchBestProducts,
        isLoading: isLoadingBest,
        error: errorBest,
	} = useBestProducts(6);

    const [columnCount, setColumnCount] = useState();
    const productListWrapper = useRef(null);

	const onProductsLengthChanged = () => {
        const width = window.screen.width;

        setColumnCount(Math.floor(width / 200));
    };

    const {
		featuredProducts,
		fetchFeaturedProducts,
		isLoading: isLoadingFeatured,
		error: errorFeatured,
	} = useFeaturedProducts(5);
    
    const {
		recommendedProducts,
		fetchRecommendedProducts,
		isLoading: isLoadingRecommended,
		error: errorRecommended,
	} = useRecommendedProducts(5);

    return (
        <section className="product-view">    
            <>
                {loadingProduct && (
                    <div className="loader">
                        <h4>Loading Product...</h4>
                        <br />
                        <LoadingOutlined style={{ fontSize: '3rem' }} />
                    </div>
                )}      
                {window.screen.width <=640? (
                    <div className="mobile-product-view-modal">
                        {(product && !loadingProduct) && (
                            <Card className="product-view-modal">
                                <CardHeader 
                                    style={{width: '100%'}} className={classes.mHeaderWrapper}
                                    avatar={
                                        <Link to={SHOP}>
                                            <CardContent className={classes.header}>
                                                <Avatar className={classes.mAvatar} aria-label="recipe">
                                                    <IconButton aria-label="settings">
                                                        <ArrowLeftOutlined />
                                                    </IconButton>
                                                </Avatar>
                                                <Typography className={classes.typo}> &nbsp; Back to shop</Typography>
                                            </CardContent>
                                        </Link>
                                    }
                                />
                                <Card className={classes.mProductModal}>
                                    <CardMedia>
                                        <Slider />
                                    </CardMedia>
                                    <CardContent className={classes.mProductDetails} style={{paddingBottom: 0}}>  
                                        <Typography className={classes.productName}>{product.name}</Typography>
                                        <Grid container className={classes.mRatingWrapper}>
                                            <Grid item xs={12} className={classes.mbrandModel}>
                                                <Typography className={classes.mproductBrand}>{product.brand}</Typography>
                                                <Typography className={classes.mProductModel}>{product.model}</Typography>
                                            </Grid>
                                            <Grid item xs={12} className={classes.mRating}>
                                                <ReactStars
                                                    count={5}
                                                    onChange={ratingChanged}
                                                    size={24}
                                                    isHalf={true}
                                                    emptyIcon={<i className="far fa-star"></i>}
                                                    halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                    fullIcon={<i className="fa fa-star"></i>}
                                                    activeColor="#ffd700"
                                                />
                                                <Typography className={classes.mProductReviews}>1111 Reviews</Typography>
                                            </Grid>
                                        </Grid>
                                        <div className="product-price-wrapper">
                                            <span style={{fontSize: 18}}><span style={{margin: '0 1rem 0 0', fontSize: 'large', fontWeight: 'bold'}}>Price</span><span style={{fontSize: 'large'}}>{displayMoney(product.price)}</span></span>
                                        </div>
                                        <br />
                                        <div className="product-size-selector">
                                            <FormControl className={classes.formControl}>
                                                <NativeSelect
                                                    className={classes.selectEmpty}
                                                    value={state.age}
                                                    name="age"
                                                    onChange={onSelectedSizeChange}
                                                    >
                                                    <option value="" disabled > medium </option>
                                                    <option value={product.availableSizes.length === 0 ? [] : changeToObject(product.availableSizes)}>{product.availableSizes}</option>
                                                </NativeSelect>
                                                <FormHelperText style={{fontSize: 14}}>Select Size</FormHelperText>
                                            </FormControl>          
                                        </div>
                                        <br />
                                        {product.availableColors.length >= 1 && (
                                            <Paper elevation={0} className={classes.mColorChooser}>
                                                <ColorChooser availableColors={product.availableColors} onSelectedColorChange={onSelectedColorChange} />
                                                <Typography style={{color: '#818181', fontSize: 16, paddingTop: 5}}>Choose Color</Typography>
                                            </Paper>
                                        )}
                                        {isPromoter && <AddPromoterProduct product={product} />}
                                    </CardContent>
                                    <Grid container className={classes.mActionButtons}>
                                        <Grid item xs={5} className="product-view-buttons">
                                            {product.id && (
                                                <button
                                                    className={`button basket-button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                                                    onClick={() => addToBasket({ ...product, selectedColor : selectedColor || '', selectedSize: selectedSize || ''})}
                                                >
                                                    {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
                                                </button>
                                            )}
                                        </Grid>
                                        <Grid className="product-view-buttons" item xs={5} style={{position: 'absolute', right: 0}}>
                                            {product.id && (
                                                <button
                                                    className={`product-modal-button-wishList button-block ${isItemOnWishList ? 'button-border-onwishList' : 'button-border-offwishList'}`}
                                                    onClick={() => addToWishList({ ...product, selectedColor : selectedColor})}
                                                >
                                                    {isItemOnWishList(product.id) ? 'Not Interested' : 'Add to Wish-List'}
                                                </button>
                                            )}
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Card>
                        )}
                        {(product && !loadingProduct) && (
                        <div className="product-view-review-rating">
                            <Paper className={classes.detailWraper}>
                                <div>
                                    <CustomizedProgressBars/>
                                </div>
                                <Grid className={classes.descriptionTable}>
                                    <Card className={classes.tableWraper}>  
                                        <Typography className={classes.mTypo}>{product.description? `Description: ${product.description}`: ''}</Typography>
                                        <CustomizedTables />
                                    </Card>
                                </Grid>
                            </Paper>
                        </div>
                        )}
                    </div>
                  ) : (  
                    <div className="product-view-1">
                        {(product && !loadingProduct) && (
                            <div className="product-view-modal">
                                <div className="header-button">
                                    <Link to={SHOP}>
                                        <h3 className="button-link d-inline-flex"><ArrowLeftOutlined /> &nbsp; Back to shop</h3>
                                    </Link>
                                </div>
                                <Paper className={classes.productModalWraper}>
                                    <Grid container spacing={3} className="product-modal" style={{margin: 0, width: '100%'}}>
                                        {product.imageCollection.length !== 0 && (
                                            <Grid item xs={1} style={{padding: 0, maxWidth: 70, marginTop: 10}} className="product-modal-image-collection">
                                                {product.imageCollection.map(image => (
                                                    <div
                                                        className="product-modal-image-collection-wrapper"
                                                        key={image.id}
                                                        onClick={() => setSelectedImage(image.url)}
                                                    >
                                                        <ImageLoader
                                                            className="product-modal-image-collection-img"
                                                            src={image.url}
                                                        />
                                                    </div>
                                                ))}
                                            </Grid>
                                        )} 
                                        <Grid item xs={5} className="product-modal-image-wrapper">
                                            <ImageLoader
                                                className="product-modal-image"
                                                src={selectedImage}
                                            />
                                        </Grid>
                                        <Grid item xs={6} className="product-modal-details">    
                                            <Typography className={classes.productName}>{product.name}</Typography>
                                            <br />
                                            <Typography className={classes.productBrand}>{product.brand}</Typography>
                                            <div className="product-rating-wrapper">
                                                <Typography className={classes.productModel}>{product.model}</Typography>
                                                <Typography className={classes.productRating}>
                                                    <ReactStars
                                                        count={5}
                                                        onChange={ratingChanged}
                                                        size={24}
                                                        isHalf={true}
                                                        emptyIcon={<i className="far fa-star"></i>}
                                                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                        fullIcon={<i className="fa fa-star"></i>}
                                                        activeColor="#ffd700"
                                                    />
                                                    <span style={{fontSize: 16, width: 'auto', margin: '0 10px',position: 'relative',top: 5,fontFamily: '"Trirong", serif',textTransform: 'capitalize'}}>11 Reviews</span>
                                                </Typography>
                                            </div>
                                            <br />
                                            <Typography className={classes.productPrice}>
                                                {displayMoney(product.price)}
                                            </Typography>
                                            <br />
                                            <div className="product-size-selector">
                                                <FormControl className={classes.formControl}>
                                                    <NativeSelect
                                                        className={classes.selectEmpty}
                                                        value={state.age}
                                                        name="age"
                                                        onChange={onSelectedSizeChange}
                                                        >
                                                        <option value="" disabled > medium </option>
                                                        <option value={product.availableSizes.length === 0 ? [] : changeToObject(product.availableSizes)}>{product.availableSizes}</option>
                                                    </NativeSelect>
                                                    <FormHelperText style={{fontSize: 14}}>Select Size</FormHelperText>
                                                </FormControl>          
                                            </div>
                                            <br />
                                            {product.availableColors.length >= 1 && (
                                                <div className="product-color-chooser">
                                                    <span style={{color: '#818181', width: '30%', fontSize: 14, paddingTop: 5}}>Choose Color</span>
                                                    <ColorChooser style={{fontSize: 16}} availableColors={product.availableColors} onSelectedColorChange={onSelectedColorChange} />
                                                </div>
                                            )}
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                    {product.id && (
                                                        <button
                                                            className={`product-modal-addToBasket-button button ${isItemOnBasket ? 'button-border button-border-gray' : 'product-modal-offBasket'}`}
                                                            onClick={() => addToBasket({ ...product, selectedColor : selectedColor || '', selectedSize: selectedSize || ''})}
                                                        >
                                                            <div>
                                                                {isItemOnBasket(product.id) ? 'Remove Now' : 'Buy Now'}
                                                            </div>
                                                        </button>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                    {product.id && (
                                                        <button
                                                            className={`product-modal-button-wishList button-block ${isItemOnWishList ? 'button-border-onwishList' : 'button-border-offwishList'}`}
                                                            onClick={() => addToWishList({ ...product, selectedColor : selectedColor})}
                                                        >
                                                            {isItemOnWishList(product.id) ? 'Not Interested' : 'Add to Wish-List'}
                                                        </button>
                                                    )}
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={3}>
                                                <Grid item xs={3}>
                                                    <Button
                                                        variant="contained"
                                                        color="secondary"
                                                        className={classes.button}
                                                    >
                                                        Contact Owner
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                            {isPromoter && <AddPromoterProduct product={product} />}
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        )}
                        {(product && !loadingProduct) && (
                        <div className="product-view-review-rating">
                            <Paper className={classes.detailWraper}>
                                <div>
                                    <CustomizedProgressBars/>
                                </div>
                                <Grid className={classes.descriptionTable}>
                                    <Card className={classes.tableWraper}>  
                                        <Typography className={classes.mTypo}>{product.description}</Typography>
                                        <CustomizedTables />
                                    </Card>
                                </Grid>
                            </Paper>
                        </div>
                        )}
                    </div>
                )}
                <div className="product-view-2">
                    <div className="featured-products-container">
                    <div className="featured-products-header">
                        <h2>Featured Products</h2>
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
                    <div className="owner-shop-profile-view">
                        <Card className={classes.productShop}>
                            {window.screen.width <=800? 
                                (<Typography className={classes.titlemobile} color="textSecondary" gutterBottom>
                                    G-tech Electronics shop
                                </Typography>):(
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    G-tech Electronics shop
                                </Typography>)
                            }
                            <CardContent className={classes.profile} variant="outlined" style={{paddingBottom: 2}}>
                                <CardMedia className={classes.shopProfile}>
                                    <div className="user-shop-profile-banner-wrapper">
                                        <ImageLoader
                                            alt="Banner"
                                            className="user-shop-profile-banner-img"
                                            src={Img0}
                                        />
                                    </div>
                                </CardMedia>
                                <CardContent className={classes.profileItems} style={{paddingBottom: 2}}>
                                    <Typography variant="h6" component="h2">
                                        Address : Adama
                                    </Typography>
                                    <Typography variant="h6" component="h2">
                                        Items belong to this shop: Electronics and beuty materials
                                    </Typography>
                                    <div className="product-modal-action">
                                        <button
                                            className="button button-small"
                                        >
                                            Visit This Shop
                                        </button>
                                    </div>
                                </CardContent>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="user-shop-product-reviews">
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
                                <div>
                                    <Reviews id={id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </section>
    )
};

ViewProduct.propType = {
	isItemOnWishList: PropTypes.bool
};

export default ViewProduct;

/* <div className="product-modal-action">
    <button
        className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
        onClick={() => addToBasket({ ...product, selectedColor : selectedColor || '', selectedSize: selectedSize || ''})}
    >
        {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
    </button>
</div> 
    */
