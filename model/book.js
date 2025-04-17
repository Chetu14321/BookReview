// models/Book.js
const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String }, // URL to book cover
  description: { type: String },
  category: { type: String },
  averageRating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
}, { timestamps: true },{
    collection:"Books", 
    timestamps:true,
});

module.exports = mongoose.model('Book', bookSchema);
