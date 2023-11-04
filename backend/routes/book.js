import { Router } from 'express';
const router = Router();
import auth from '../middleware/auth';
import multer from '../middleware/multer-config';
import converttowebp from '../middleware/convertToWEBP';
import { getAllBooks, getBestRatedBooks, getOneBook, addBookRating, createANewBook, updateABook, deleteABook } from '../controllers/book';


router.get('/', getAllBooks);

router.get('/bestrating', getBestRatedBooks);

router.get('/:id', getOneBook);

router.post('/:id/rating', auth, addBookRating);

router.post('/', auth, multer, converttowebp, createANewBook);

router.put('/:id', auth, multer, converttowebp, updateABook);

router.delete('/:id', auth, deleteABook);

export default router;

