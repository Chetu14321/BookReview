const express = require('express');
const BookRoute = express.Router();

const { createBook, getBookById, readAll, getAllBooksPaginated } = require('../controller/book.controller');

// Route to create a new book
BookRoute.post('/add', createBook);

// Route to get all books
BookRoute.get('/all', readAll);

// Route to get a single book by ID
BookRoute.get('/single/:id', getBookById);

//pageinated
BookRoute.get("/pagi", getAllBooksPaginated);

module.exports = BookRoute; // ✅ EXPORT the router
