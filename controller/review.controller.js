const { StatusCodes } = require("http-status-codes");
const Review = require("../model/review");
const Book = require("../model/book");
const mongoose = require("mongoose");

const createReview = async (req, res) => {
  try {
    const { bookId, comment, rating } = req.body;

    // Validate input fields
    if (!bookId || !comment || !rating) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Validate bookId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ msg: "Invalid book ID" });
    }

    // Find the book by ID
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    // Create the review (without user reference, allowing anonymous)
    const review = await Review.create({ book: bookId, rating, comment });

    // Push review to the book's reviews array
    book.reviews.push(review._id);
    await book.save();

    res.status(201).json({ msg: "Review added", review });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};



// Get reviews for a specific book
const getReviewsByBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(bookId))
    //   return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid book ID" });

    const reviews = await Review.find({ book: bookId })
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(StatusCodes.OK).json({ reviews });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// Get all reviews (admin)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name")
      .populate("book", "title");

    res.status(StatusCodes.OK).json({ reviews });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(reviewId))
      return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid review ID" });

    const review = await Review.findById(reviewId);
    if (!review)
      return res.status(StatusCodes.NOT_FOUND).json({ msg: "Review not found" });

    await Review.findByIdAndDelete(reviewId);
    res.status(StatusCodes.OK).json({ msg: "Review deleted" });
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = {
  createReview,
  getReviewsByBook,
  getAllReviews,
  deleteReview,
};
