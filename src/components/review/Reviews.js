import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { displayDate } from '../../helpers/utils';
import firebase from '../../firebase/firebase';
import MessageBox from '../../helpers/MessageBox';

import { getReviews, clearReviews, addReview } from '../../redux/actions/reviewActions';
import { setLoading } from '../../redux/actions/miscActions';
import Rating from '../../helpers/Rating';


const Reviews = ({ id }) => {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state.reviews);
    const isLoading = useSelector(state => state.app.loading);

    const [isFetching, setFetching] = useState(false);

    const fetchReviews = () => {
        setFetching(true);
        dispatch(getReviews(id, reviews.lastRefKey));
    };

    useEffect(() => {
        dispatch(clearReviews());
        if (reviews.items.length === 0 || !reviews.lastRefKey) {
            fetchReviews();
        }
        window.scrollTo(0, 0);
        return () => dispatch(setLoading(false));
    }, []);

    useEffect(() => {
        setFetching(false);
    }, [reviews.lastRefKey]);

    const [isReviewed, setIsReviewed] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const auth = useSelector(state => state.auth);
    const isAuth = (!!auth.id && !!auth.role);

    useEffect(() => {
        if (isAuth) {
            firebase.getUserReview(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        setRating(data.rating);
                        setComment(data.comment);
                        setIsReviewed(true);
                    } else {
                        setIsReviewed(false);
                    }
                })
                .catch((e) => {
                    //setUserReview(null);                    
                });
        }
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (comment && rating) {
            dispatch(
                addReview(id, { rating, comment })
            );
        } else {
            alert('Please enter comment and rating');
        }
    };

    return (
        <>
            <div style={{ marginTop: '10rem' }}>
                <ul>
                    <h2 id="reviews">Customer Reviews</h2>
                    {reviews.items.map((review) => (
                        <li key={review.id}>
                            <div className="user-nav-img-wrapper">
                                <img
                                    alt=""
                                    className="user-nav-img"
                                    src={review.userAvator ? review.userAvator : ''}
                                />
                            </div>
                            <strong>{review.userName}</strong>
                            <Rating rating={review.rating} caption=" "></Rating>
                            <p>{review.lastUpdate && (review.lastUpdate.seconds ? displayDate(review.lastUpdate.toDate()) : displayDate(review.lastUpdate))}</p>
                            <p>{review.comment}</p>
                        </li>
                    ))}
                    <li>
                        {isAuth ? (
                            <form className="form" onSubmit={submitHandler}>
                                <div>
                                    <h2>{isReviewed ? 'Update Your Review' : 'Write a customer review'}</h2>
                                </div>
                                <div>
                                    <label className="review_form_label" htmlFor="rating">Rating</label>
                                    <select
                                        id="rating"
                                        value={rating}
                                        onChange={(e) => setRating(e.target.value)}
                                    >
                                        <option value="">Select...</option>
                                        <option value="1">1- Poor</option>
                                        <option value="2">2- Fair</option>
                                        <option value="3">3- Good</option>
                                        <option value="4">4- Very good</option>
                                        <option value="5">5- Excelent</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="review_form_label" htmlFor="comment">Comment</label>
                                    <textarea
                                        id="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    >
                                    </textarea>
                                </div>
                                <div>
                                    <label className="review_form_label" />
                                    <button className="primary" type="submit" disabled={isLoading}>                                       
							            {isLoading ? 'Submiting Review' : (isReviewed ? 'Update' : 'Submit')}                                        
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <MessageBox>
                                Please <Link to="/signin">Sign In</Link> to write a review
                            </MessageBox>
                        )}
                    </li>
                </ul>
            </div>

        </>
    );
};

export default Reviews;