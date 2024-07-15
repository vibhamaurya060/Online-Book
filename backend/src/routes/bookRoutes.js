import express from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController.js';

const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of books
 */
router.get('/books', getBooks);

/**
 * @swagger
 * /books/{bookId}:
 *   get:
 *     summary: Get a book by ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A book object
 */
router.get('/books/:bookId', getBookById);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/books', createBook);

/**
 * @swagger
 * /books/{bookId}:
 *   put:
 *     summary: Update a book by ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Successfully updated
 */
router.put('/books/:bookId', updateBook);

/**
 * @swagger
 * /books/{bookId}:
 *   delete:
 *     summary: Delete a book by ID
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.delete('/books/:bookId', deleteBook);

export default router;
