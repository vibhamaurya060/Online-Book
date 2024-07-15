// src/components/ReviewList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewList = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://online-book-ukfw.onrender.com/api/reviews/book/${bookId}`);
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [bookId]);

  return (
    <div>
      <h1>Reviews</h1>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            {review.comment} - {review.rating} stars by {review.customerId.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewList;
