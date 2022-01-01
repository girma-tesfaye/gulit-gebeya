import defaultAvatar from '../images/defaultAvatar.jpg';
import defaultBanner from '../images/defaultBanner.jpg';

import defaultShopAvatar from '../images/defaultAvatar.jpg';
import defaultShopBanner from '../images/defaultBanner.jpg';
import defaultShopDisplay from '../images/defaultBanner.jpg';

import {DefaultShopName, DefaultShopVideoLink, DefaultShopDetail, DefaultShopKeywords} from '../constants/StringConstants';


export const initialUserSchema = (ref, payload, fullname) => {

    const User = {
        fullname,
        email: payload.email,
        phoneNumber: ref.user.phoneNumber?ref.user.phoneNumber:'',
        mobile: { data: {} },
        address: '',
        avatar: defaultAvatar,
        banner: defaultBanner,
        providers: ref.user.providerData.map(providerData => providerData.providerId),

        basket: [],
        wishList: [],

        recommandationSystem: {
            favoriteProducts: [],
            favoriteShops: [],
            favoriteCategories: [],
            clickedProducts: [],
            clickedShops: [],
            addToCartProducts: [],
        },

        requests: {
            applyToBePromoter:{
                state: false,
                type: '',
                data: {},
            },
        },

        role: 'USER',
        dateJoined: ref.user.metadata.creationTime || new Date().getTime(),
    }

    return User;
}

export const nonPasswordProviderUserSchema = (payload) => {
    const User = {
        fullname: payload.displayName ? payload.displayName : 'User',        
        email: payload.email?payload.email:'',
        phoneNumber: payload.phoneNumber?payload.phoneNumber:'',
        mobile: { data: {} },
        address: '',        
        avatar: payload.photoURL ? payload.photoURL : defaultAvatar,
        banner: defaultBanner,
        providers: payload.providerData.map(providerData => providerData.providerId),

        basket: [],
        wishList: [],

        recommandationSystem: {
            favoriteProducts: [],
            favoriteShops: [],
            favoriteCategories: [],
            clickedProducts: [],
            clickedShops: [],
            addToCartProducts: [],
        },

        requests: {
            applyToBePromoter:{
                state: false,
                type: '',
                data: {},
            },
        },
        
        role: 'USER',
        dateJoined: payload.metadata.creationTime || new Date().getTime(),
    }

    return User;
}

export const defaultShopSchema = (user, userId, date) => {

    // shops => shopId => Shop
    const Shop = {
        // this are shop describing fields 
        shopName: DefaultShopName,
        shopDisplay: defaultShopDisplay,
        shopAvatar: defaultShopAvatar,
        shopBanner: defaultShopBanner,
        shopVideoLink: DefaultShopVideoLink,
        shopEmail: user.email? user.email : '',
        shopMobile: user.mobile? user.mobile :{ data: {} },
        shopAddress: user.address? user.address : '',
        shopDetail: DefaultShopDetail,

        // this are used as key for shop search
        shopCitys: [],	
        shopCategories: [],
        keywords: DefaultShopKeywords,

        // meta data which is added automatically when the shop is created
        shopOwner: userId,		
        shopDateCreated: date,
        shopLastUpdate: date,

        // shop measurment parameters 
        totalSells: 0,	
        totalOrders: 0,	
        avgRating: 0,
        numRatings: 0,        
        customRating: 0,
        buyerRating: 0,
        numBuyerRatings: 0,

        numOrderRejection: 0,
        numOrderDelivered: 0,

        numProductsCurrently: 0,

        // this are shop product categories
        productClasses : {
            bestProducts: [],
            orginalProducts: [],
            bestCategories: [],
            newProducts: [],  	
        },

        // this is approval from admin that the shop can be online. every user quirly check that this field is true to load the shop
        // when the shop is created this field is not created when the admin approves the shop he create this field and set it to true and also create aprivate collection for the shop to store private values
        approved: 'ONPROGRESS',         

        requests: {
            applyForPayment: {
                state: false,
                type: '',
                data: {},
            },
        },  
        
        adminConfirms:{
            orginal:false,
            deliver:false,
        },		
    }

    return Shop;
}

export const initialShopOrdersStateSchema = () => {
    const ShopOrderState = {
        total: 0,
        totalNotDelivered: 0,
        totalDelivered: 0,
        totalRejected: 0,        
    }

    return ShopOrderState;
}

export const initialShopPrivateSchema = (sellerId, createrId) => {
    const ShopPrivate = {
        isApproved: false,
        sellerId: sellerId,
        totalCurrent: 0,
        totalNumberOfSells: 0,
        totalOrders: 0,
        totalNumberOfOrderRejection: 0,
        totalNumberOfOrdersDelivered: 0,
        history: [],
        numberOfSellsPerProducts: {},
        shopCreaterId: createrId													
    }

    return ShopPrivate;
}