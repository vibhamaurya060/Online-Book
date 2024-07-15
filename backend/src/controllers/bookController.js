import Book from '../models/nosql/book.js';

const getBooks = async (req, res) => {
    try {
        const books = await Book.find({});
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBookById = async (req, res) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createBook = async (req, res) => {
    const { title, author, description, price, isbn } = req.body;
    try {
        const newBook = new Book({ title, author, description,price, isbn });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBook = async (req, res) => {
    const { bookId } = req.params;
    const { title, author, description,price,isbn } = req.body;
    try {
        const updatedBook = await Book.findByIdAndUpdate(bookId, { title, author, description,price,isbn }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteBook = async (req, res) => {
    const { bookId } = req.params;
    try {
        const deletedBook = await Book.findByIdAndDelete(bookId);
        if (!deletedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getBooks, getBookById, createBook, updateBook, deleteBook };
