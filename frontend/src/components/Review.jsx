import React, { useState } from 'react';
import axios from 'axios';

const Review = () => {
  const [bookId, setBookId] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://online-book-ukfw.onrender.com/api/reviews/book/${bookId}`)
      .then(res => {
        setReviews(res.data);
      })
      .catch(err => {
        console.error(`Error fetching reviews for book ${bookId}:`, err);
      });
  };

  return (
    <div>
      <h2>Reviews for a Book</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Book ID:
          <input type="text" value={bookId} onChange={e => setBookId(e.target.value)} />
        </label>
        <button type="submit">Get Reviews</button>
      </form>
      <ul>
        {reviews.map(review => (
          <li key={review.id}>
            <p>Customer ID: {review.customerId}</p>
            <p>Review: {review.reviewText}</p>
            <p>Rating: {review.rating}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Review;
