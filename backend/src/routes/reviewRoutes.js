import express from 'express';
import { getReviewsByBook } from '../controllers/reviewController.js';

const router = express.Router();

// /**
//  * @swagger
//  * /reviews/book/{bookId}:
//  *   get:
//  *     summary: Get reviews for a specific book
//  *     parameters:
//  *       - in: path
//  *         name: bookId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: List of reviews for the book
//  */
router.get('/reviews/book/:bookId', getReviewsByBook);

export default router;
