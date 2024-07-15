import express from 'express';
import { getOrdersByCustomer, placeOrder, updateOrderStatus } from '../controllers/orderController';
import { createBook, getBookReviews, getBooks } from '../controllers/bookController';


const router = express.Router();

router.get('/orders/:customerId', getOrdersByCustomer);
router.post('/orders', placeOrder);
router.patch('/orders/:orderId', updateOrderStatus);

router.get('/books', getBooks);
router.post('/books', createBook);
router.get('/books/:bookId/reviews', getBookReviews);

export default router;
