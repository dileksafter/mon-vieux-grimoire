import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth.js';
import multer from '../middleware/multer-config.js';
import converttowebp from '../middleware/convertToWEBP.js';
import bookCntrlrs from '../controllers/book.js';


router.get('/', bookCntrlrs.getAllBooks);

router.get('/bestrating', bookCntrlrs.getBestRatedBooks);

router.get('/:id', bookCntrlrs.getOneBook);

router.post('/:id/rating', auth, bookCntrlrs.addBookRating);

router.post('/', auth, multer, converttowebp, bookCntrlrs.createANewBook);

router.put('/:id', auth, multer, converttowebp, bookCntrlrs.updateABook);

router.delete('/:id', auth, bookCntrlrs.deleteABook);

export default router;

