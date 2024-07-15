import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    customerId: {
        type: Number, // Reference to SQL Customer ID
        required: true,
    },
    reviewText: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Review', reviewSchema);
