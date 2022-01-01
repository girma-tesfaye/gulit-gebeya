import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
export default function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <div className="rating">
      
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 1
              ? 'star'
              : rating >= 0.5
              ? 'star-half'
              : 'star'
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 2
              ? 'star'
              : rating >= 1.5
              ? 'star-half'
              : 'star'
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 3
              ? 'star'
              : rating >= 2.5
              ? 'star-half'
              : 'star'
          }
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 4
              ? 'star'
              : rating >= 3.5
              ? 'star-half'
              : 'star'
          }          
        />
      </span>
      <span>
        <FontAwesomeIcon
          icon={
            rating >= 5
              ? 'star'
              : rating >= 4.5
              ? 'star-half'
              : 'star'
          }
          
        />
      </span>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{numReviews + ' reviews'}</span>
      )}
    </div>
  );
}
