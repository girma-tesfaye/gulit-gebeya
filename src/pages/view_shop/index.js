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

import { updateShopProfile } from '../../redux/actions/shopProfileActions';
import { ACCOUNT, SHOP_ACCOUNT, HOME} from '../../constants/routes';
import { Link } from 'react-router-dom';
import useFileHandler from '../../hooks/useFileHandler';
import Input from '../../helpers/Input';
import CreatableSelect from 'react-select/creatable';
import {BsPen} from 'react-icons/bs';
import Modal from '../../helpers/Modal';
import PhoneInput from 'react-phone-input-2';
import Select from 'react-select';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
        boxShadow:'none'
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
    },
    textfield: {
        fontSize: "1.5rem"
    }
  }));



const profile = [
    {
        shopName:"G-tech Electronics shop"
    },{
        shopBanner:Img0
    },{
        shopAvatar:defaultavatar
    },{
        shopAddress:"Adama"
    },{
        shopEmail:"girmatesfaye80@gmail.com"
    },{

    },{
        shopDisplay:"videolink"
    },{
        shopDetail:"Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered Buying eyewear should leave you happy and good-looking"
    },{
        shopKeywords:""
    }
] 

const ViewShop = (props) => {
    useScrollTop();
    const dispatch = useDispatch();

    const {isLoading, uiUtills} = useSelector(state =>({isLoading: state.app.loading, uiUtills: state.utills.ui}));

    const [field, setField] = useState({
		shopName: { value: profile.shopName ? profile.shopName : '' },
		shopEmail: { value: profile.shopEmail ? profile.shopEmail : '' },
		shopAddress: { value: profile.shopAddress ? profile.shopAddress : '' },
		shopAvatar: profile.shopAvatar ? profile.shopAvatar : '',
		shopBanner: profile.shopBanner ? profile.shopBanner : '',
		shopDisplay: profile.shopDisplay ? profile.shopDisplay : '',
		shopDetail: { value: profile.shopDetail ? profile.shopDetail : '' },
	});

    const [isOpenModal, setModalOpen] = useState(false);
	const [password, setPassword] = useState(null);
	console.log(field)

	const {
		imageFile,
        isFileLoading,
		onFileChange
	} = useFileHandler({ shopAvatar: {}, shopBanner: {}, shopDisplay: {} });

    const areFieldsChanged = () => {
		const fieldsChanged = Object.keys(field).some((key) => {
			if (typeof profile[key] === 'object' && typeof field[key] === 'object') {
				return profile[key].value !== field[key].value;
			} else if (typeof field[key] === 'object') {
				return field[key].value !== profile[key];
			} else {
				return field[key] !== profile[key];
			}
		});
		const filesUpdated = imageFile.shopBanner.file || imageFile.shopAvatar.file || imageFile.shopDisplay.file;

		return fieldsChanged || filesUpdated;
	};

    const onshopEmailChange = (value, error) => {
		setField({ ...field, shopEmail: { value, error } });
	};

	const onshopNameChange = (value, error) => {
		setField({ ...field, shopName: { value, error } });
	};

    const onshopAddressChange = (value, error) => {
		setField({ ...field, shopAddress: { value, error } });
	};
    
    const onProductDescriptionInput = (value, error) => {
		setField({ ...field, shopDetail: { value, error } });
	};

	const onshopMobileChange = (value, data) => {
		const obj = {
			dialCode: data.dialCode,
			countryCode: data.countryCode,
			num: value
		};

		setField({
			...field,
			shopMobile: {
				value: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
				data: obj
			}
		});
	};

	const onShopCategoriesChange = (newValue) => {
		const shopCategories = newValue.map(word => word.value);

		setField({ ...field, shopCategories: { value: shopCategories } });
	};

	const onShopCitysChange = (newValue) => {
		const shopCitys = newValue.map(word => word.value);

		setField({ ...field, shopCitys: { value: shopCitys } });
	};

    const onShopKeywordsChange = (newValue) => {
		const shopKeywords = newValue.map(word => word.value);

		setField({ ...field, shopKeywords: { value: shopKeywords } });
	};

    const onCloseModal = () => setModalOpen(false);

	const onPasswordInput = (e) => {
		setPassword(e.target.value.trim());
	};

    const update = (credentials = {}) => {
		dispatch(updateShopProfile({
			updates: {
				shopName: field.shopName.value,
				shopEmail: field.shopEmail.value,
				shopAddress: field.shopAddress.value,
				shopAvatar: field.shopAvatar,
				shopBanner: field.shopBanner,
				shopDisplay: field.shopDisplay,
				shopKeywords: field.shopKeywords.value,
				shopDetail: field.shopDetail.value,
			},
			files: {
				shopBannerFile: imageFile.shopBanner.file,
				shopAvatarFile: imageFile.shopAvatar.file,
				shopDisplayFile: imageFile.shopDisplay.file
			},
			credentials
		}));
	};

    const onConfirmUpdate = () => {
		if (password) {
			update({ email: profile.email, password });
			setModalOpen(false);
		}
	};

    const onSubmitUpdate = () => {
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (noError) {
			setModalOpen(true);
		}
	};

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
                                    alt="banner"
                                    className="user-profile-banner-img"
                                    src={Img0 || field.shopBanner}
                                />
                                <input
                                    accept="image/x-png,image/jpeg"
                                    hidden
                                    id="edit-shopBanner"
                                    onChange={e => onFileChange(e, { name: 'shopBanner', type: 'single' })}
                                    type="file"
                                />
                                <label
                                    className="edit-button edit-shop-banner-button"
                                    htmlFor="edit-shopBanner"
                                >
                                    Change
                                </label>
                                <div className="video-link-display">
                                    <VideoLink />
                                    <input
                                    accept="image/x-png,image/jpeg"
                                    hidden
                                    id="edit-shopBanner"
                                    onChange={e => onFileChange(e, { name: 'shopBanner', type: 'single' })}
                                    type="file"
                                    />
                                    <label
                                        className="edit-button edit-shop-video-button"
                                        htmlFor="edit-shopBanner"
                                    >
                                        Change
                                    </label>
                                </div>
                            </div>
                            <div className="user-shop-form-wrapper">
                                <div className="user-shop-profile-avatar-wraper">
                                    {window.screen.width <=800? 
                                        (<Avatar alt="avatar" src={defaultavatar} className={classes.mobileavatar}/>):
                                        (<Avatar alt="avatar" src={defaultavatar} className={classes.avatar}/>)
                                    }
                                    <input
                                        accept="image/x-png,image/jpeg"
                                        hidden
                                        id="edit-shopAvatar"
                                        onChange={e => onFileChange(e, { name: 'shopAvatar', type: 'single' })}
                                        type="file"
                                    />
                                    <label
                                        className="edit-shop-avatar-button"
                                        htmlFor="edit-shopAvatar"
                                    >
                                        edit
                                    </label>
                                </div> 
                                <div className="user-shop-profile-form-wrapper">
                                    <div className="short-input-forms">
                                        <TextField
                                            className={classes.textfield}
                                            id="filled-full-width"
                                            style={{ margin: 8 }}
                                            placeholder="Name of shop eg. G-tech Electronics shop"
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            onInputChange={onshopNameChange}
                                            isRequired={true}
                                            field="shopName"
                                            value={field.shopName.value}
                                            
                                        />
                                        <br />
                                        <TextField
                                            id="filled-full-width"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            readOnly={isLoading}
                                            placeholder="test@example.com"
                                            onInputChange={onshopEmailChange}
                                            isRequired={true}
                                            field="shopEmail"
                                            type="email"
                                            value={field.shopEmail.value}
                                        />
                                         <TextField
                                            id="filled-full-width"
                                            style={{ margin: 8 }}
                                            fullWidth
                                            margin="normal"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="outlined"
                                            placeholder="Addis Ababa"
                                            onInputChange={onshopAddressChange}
                                            isRequired={false}
                                            field="shopAddress"
                                            type="text"
                                            value={field.shopAddress.value}
                                        />
                                        <div className="user-shop-form-phone-input">
                                        <PhoneInput
                                            country={'et'}
                                            disabled={isLoading}
                                            inputClass={`input-form d-block ${field.shopMobile ? 'input-error' : ''}`}
                                            inputExtraProps={{ required: true }}
                                            // eslint-disable-next-line quote-props
                                            masks={{ 'et': '+.. .... ... ....' }}
                                            onChange={onshopMobileChange}
                                            placeholder="Enter your Shop Mobile number"
                                            readOnly={isLoading}
                                            value={field.shopMobile}
                                        />
                                        </div>
                                        <CreatableSelect
                                            className = "creatable-select"
                                            isMulti
                                            placeholder="Items belong to shop"
                                            onChange={onShopKeywordsChange}
                                            defaultValue={profile.shopKeywords ? profile.shopKeywords.map(keyword => ({ value: keyword, label: keyword })) : []}
                                            options={['fashion', 'electronics', 'beauty'].map(keyword => ({ value: keyword, label: keyword }))}
                                            styles={{
                                                menu: provided => ({ ...provided, zIndex: 10})
                                            }}
                                        />
                                        <div className="product-form-field">
                                            <Select
                                                className = "creatable-select"
                                                isMulti
                                                placeholder="Input Shop Categories"
                                                onChange={onShopCategoriesChange}
                                                defaultValue={profile.shopCategories ? profile.shopCategories.map(category => ({ value: category, label: category })) : []}
                                                options={uiUtills.categories ? uiUtills.categories.map(category => ({ value: category.main, label: category.main })) : []}
                                                styles={{
                                                    menu: provided => ({ ...provided, zIndex: 10 })
                                                }}
                                            />
                                        </div>
                                        <div className="product-form-field">
                                            <CreatableSelect
                                                className = "creatable-select"
                                                isMulti
                                                placeholder="Input Shop City"
                                                onChange={onShopCitysChange}
                                                defaultValue={profile.shopCitys ? profile.shopCitys.map(city => ({ value: city, label: city })) : []}
                                                options={['addis ababa', 'hawasa', 'jima', 'bahir dar', 'adama'].map(city => ({ value: city, label: city }))}
                                                styles={{
                                                    menu: provided => ({ ...provided, zIndex: 10 })
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="large-input-forms">
                                            <div className="product-form-field">
                                            <textarea
                                                style={{ fontSize: "1.35rem", width: "100%", borderColor: "rgba(0, 0, 0, 0.23)"}}
                                                rows={7}
                                                cols={70}
                                                field="detail"
                                                maxLength={500}
                                                placeholder="Buying eyewear should leave you happy and good-looking, with money in your       pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered Buying eyewear should leave you happy and good-looking"
                                                onInputChange={onProductDescriptionInput}
                                                isRequired={false}
                                                value={field.shopDetail.value}
                                            />
                                        </div>
                                        <div className="user-shop-submit-buttons">
                                            {window.screen.width <=800? 
                                                (
                                                    <>
                                                        <button
                                                            className="button button-muted  back-to-dashboard"
                                                            disabled={isLoading}
                                                            onClick={() => props.history.push(SHOP_ACCOUNT)}
                                                        >
                                                            Back
                                                        </button>
                                                        <button
                                                            className="button  submit-update"
                                                            disabled={!areFieldsChanged()}
                                                            onClick={onSubmitUpdate}
                                                        >
                                                            Create Shop
                                                        </button>
                                                    </>
                                                ):(
                                                    <>
                                                        <button
                                                            className="button button-muted w-100-mobile back-to-dashboard"
                                                            disabled={isLoading}
                                                            onClick={() => props.history.push(SHOP_ACCOUNT)}
                                                        >
                                                            Back to Dashboard
                                                        </button>
                                                        <button
                                                            className="button w-100-mobile submit-update"
                                                            disabled={!areFieldsChanged()}
                                                            onClick={onSubmitUpdate}
                                                        >
                                                            Create Shop
                                                        </button>
                                                    </>
                                                )
                                            }
                                            
                                        </div>
                                    </div>
                                </div>   
                            </div>
                        </div>
                        <Modal
                            isOpen={isOpenModal}
                            onRequestClose={onCloseModal}
                        >
                            <div className="text-center padding-l">
                                <h4>Confirm Update</h4>
                                <p>
                                    To continue updating shop profile,
                                <br />
                                    please confirm by entering your password
                                </p>
                                <input
                                    className="input-form d-block"
                                    onChange={onPasswordInput}
                                    placeholder="Enter your password"
                                    type="password"
                                />
                            </div>
                            <br />
                            <div className="d-flex-center">
                                <button
                                    className="button"
                                    onClick={onConfirmUpdate}
                                >
                                    Confirm
                                </button>
                            </div>
                            <button
                                className="modal-close-button button button-border button-border-gray button-small"
                                onClick={onCloseModal}
                            >
                                X
                            </button>
                        </Modal>
                        
                        
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
                                    {/* <button style={{position:"absolute", right: "1rem", Bottom: "1rem"}}>see more</button> */}
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

export default ViewShop;


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