const Book = require('../model/book');
const { StatusCodes } = require('http-status-codes');

const mongoose = require("mongoose");
// const { StatusCodes } = require("http-status-codes");

const getBookById = async (req, res) => {
  const { id } = req.params;

  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid book ID' });
  }
  

  try {
    const book = await Book.findById(id).populate("reviews");
    if (!book) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Book not found" });
    }

    res.json(book);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};


// POST /books - Admin-only: Add new book
const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(StatusCodes.CREATED).json(book);
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

//read All
const readAll=async(req,res)=>{
    try{
        let allbooks=await Book.find()
        res.json({msg:"real all successfull",allbooks})

    }catch(err){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
    }
}


//pagination

// controllers/bookController.js
// const Book = require("../models/Book");
const getAllBooksPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;      // Default page 1
    const limit = parseInt(req.query.limit) || 6;    // Default 6 books per page
    const skip = (page - 1) * limit;

    const totalBooks = await Book.countDocuments();
    const books = await Book.find().skip(skip).limit(limit); // fixed here

    res.status(200).json({
      totalBooks,
      currentPage: page,
      totalPages: Math.ceil(totalBooks / limit),
      books, // sending books
    });
  } catch (err) {
    console.error("Error fetching paginated books:", err);
    res.status(500).json({ message: "Failed to fetch books" });
  }
};

module.exports = {  getBookById, createBook ,readAll,getAllBooksPaginated};
