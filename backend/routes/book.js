const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const converttowebp = require('../middleware/convertToWEBP')
const bookCtrl = require('../controllers/book');


router.get('/', bookCtrl.getAllBooks);

router.get('/bestrating', bookCtrl.getBestRatedBooks);

router.get('/:id', bookCtrl.getOneBook);

router.post('/:id/rating', auth, bookCtrl.addBookRating);

router.post('/', auth, multer, converttowebp, bookCtrl.createANewBook);

router.put('/:id', auth, multer, converttowebp, bookCtrl.updateABook);

router.delete('/:id', auth, bookCtrl.deleteABook);

module.exports = router;

