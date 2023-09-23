const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const bookCtrl = require('../controllers/book');


router.get('/', bookCtrl.getAllBooks);

router.get('/:id', bookCtrl.getOneBook);

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.post('/:id/rating', auth, bookCtrl.addBookRating);

router.post('/', auth, multer, bookCtrl.createANewBook);

router.put('/:id', auth, multer, bookCtrl.updateABook);

router.delete('/:id', auth, bookCtrl.deleteABook);

module.exports = router;



// // Create a new book
// router.post('/', auth, multer, compressImage, booksCtrl.createBook);

// // Set book rating
// router.post('/:id/rating', auth, booksCtrl.setBookRating);

// // Update a book
// router.put('/:id', auth, multer, compressImage, booksCtrl.modifyBook);

// // Delete a book
// router.delete('/:id', auth, booksCtrl.deleteBook);

// //Get all books
// router.get('/', booksCtrl.getAllBook);

// // Get the best-rated books
// router.get('/bestrating', booksCtrl.getBestRatedBooks);

// // Get a specific book
// router.get('/:id', booksCtrl.getOneBook);