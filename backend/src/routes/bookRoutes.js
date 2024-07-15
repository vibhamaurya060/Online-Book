import express from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { body, param } from 'express-validator';

const router = express.Router();





router.get('/books', getBooks);

//  */
router.get('/books/:bookId', getBookById);

router.post('/books', [
    body('title').notEmpty(),
    body('author').notEmpty(),
    body('description').notEmpty(),
    body('price').isNumeric(),
    body('isbn').notEmpty(),
], createBook);



router.put('/books/:bookId', updateBook);



router.delete('/books/:bookId', deleteBook);

export default router;
