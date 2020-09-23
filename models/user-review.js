const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true, },
    comments: { type: String, required: true },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;