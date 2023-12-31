import {bookModel} from '../models/book.js'
import fs from 'fs';

const bookCntrlrs = {
    getAllBooks: (req, res, next) => {
       bookModel.find()
            .then(books => res.status(200).json(books))
            .catch(error => res.status(400).json({ error }));
    },
    getOneBook: (req, res, next) => {
        const bookId = req.params.id;
       bookModel.findOne({ _id: bookId })
            .then(books => res.status(200).json(books))
            .catch(error => res.status(404).json({ error }));
    },
    getBestRatedBooks: (req, res, next) => {
       bookModel.find().sort({ averageRating: -1 }).limit(3)
    
            .then(books => res.status(200).json(books))
            .catch(error => res.status(400).json({ error }));
    },
    deleteABook : (req, res, next) => {
       bookModel.findOne({ _id: req.params.id })
            .then(book => {
                if (book.userId != req.auth.userId) {
                    res.status(401).json({ message: 'Action impossible !' });
                } else {
                    const filename = book.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                       bookModel.deleteOne({ _id: req.params.id })
                            .then(() => { res.status(200).json({ message: 'Livre supprimé avec succès !' }) })
                            .catch(error => res.status(401).json({ error }));
                    });
                }
            })
            .catch(error => {
                res.status(500).json({ error });
            });
    },
    updateABook: (req, res, next) => {
        const bookObject = req.file ? {
            ...JSON.parse(req.body.book),
            imageUrl: (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`).replace(/\..+$/, '.webp')
        } : { ...req.body }
        delete bookObject.userId;
       bookModel.findOne({ _id: req.params.id })
            .then((book) => {
                if (book.userId != req.auth.userId) {
                    return res.status(401).json({ message: 'Action impossible !' });
    
                }
                // Delete old image if a new one has been added
                if (req.file) {
                    const imagePath = book.imageUrl.split('/images/')[1];
                    fs.unlinkSync(`images/${imagePath}`);
                }
               bookModel.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre modifié avec succés' }))
                    .catch(error => res.status(401).json({ error }));
    
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    },
    createANewBook: (req, res, next) => {
        const bookObject = JSON.parse(req.body.book);
        delete bookObject._id;
        delete bookObject.userId;
        const book = newbookModel({
            ...bookObject,
            userId: req.auth.userId,
            imageUrl: (`${req.protocol}://${req.get('host')}/images/${req.file.filename}`).replace(/\..+$/, '.webp')
        });
        book.save()
            .then(() => res.status(201).json({ message: 'Livre enregisté avec succés!' }))
            .catch((error) => {
                console.log(error)
                res.status(400).json({ error })
            });
    },
    addBookRating: (req, res, next) => {
        const bookId = req.params.id;
        const rating = req.body.rating
        const userId = req.auth.userId
    
        if (rating < 0 || rating > 5) {
            return res.status(400).json({ error: 'La notation doit être comprise entre 0 et 5 !' });
        }
    
       bookModel.findOne({ _id: bookId, ratings : {$elemMatch : {userId}}})
            .then((book) => {
                if (book) {
                    return res.status(400).json({ error: 'Vous avez déja noté ce livre !' });
                }
    
               bookModel.updateOne(
                    { _id: bookId },
                    { $push: { ratings: { userId, grade: rating } } }
                )
                    .then(() => {
                       bookModel.findById(bookId)
                            .then((updatedBook) => {
                                const ratings = updatedBook.ratings;
                                const totalRating = ratings.reduce((sum, rating) => sum + rating.grade, 0);
                                const averageRating = totalRating / ratings.length;
    
                                updatedBook.averageRating = Math.floor(averageRating);
                                updatedBook.save()
                                    .then(() => {
                                        res.status(200).json(updatedBook);
                                    })
                                    .catch((error) => res.status(500).json({ error }));
                            })
                            .catch((error) => res.status(500).json({ error }));
                    })
                    .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    }


}

export default bookCntrlrs