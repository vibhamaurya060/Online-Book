import Review from '../models/nosql/review.js';
import Customer from '../models/sql/customer.js';

const getReviewsByBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const reviews = await Review.find({ bookId }).populate('customerId');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getReviewsByBook };
