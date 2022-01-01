import {	
	ADD_REVIEW,
    GET_REVIEWS,
    CLEAR_REVIEWS,
    GET_REVIEWS_SUCCESS,
    ADD_REVIEW_SUCCESS,
} from '../../constants/constants';

export const addReview = (id, review, olderRating) => ({					
	type: ADD_REVIEW,	
	payload:{
		productId:id,
		review:review,
		olderRating: olderRating,
	}
});

export const addReviewSuccess = review => ({			
	type: ADD_REVIEW_SUCCESS,
	payload: review
});

export const getReviews = (productId, lastRef) => ({				
	type: GET_REVIEWS,
	payload: {
        lastRef: lastRef,
        productId: productId
    }
});

export const getReviewsSuccess = reviews => ({		
	type: GET_REVIEWS_SUCCESS,
	payload: reviews
});

export const clearReviews = () => ({				
	type: CLEAR_REVIEWS
});