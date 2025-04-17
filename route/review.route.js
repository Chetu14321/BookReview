const express = require('express');
const ReviewRoute = express.Router();


const { getReviewsByBook, getAllReviews, createReview, deleteReview } = require('../controller/review.controller');

// Route to create a new book
ReviewRoute.post('/add', createReview);

// Route to get all books
ReviewRoute.get('/all', getAllReviews);

// Route to get a single book by ID
ReviewRoute.get('/single/:id', getReviewsByBook);

ReviewRoute.delete('/delete/:id', deleteReview);

module.exports = ReviewRoute; 
