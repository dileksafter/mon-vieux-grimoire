const Book = require('../models/book')
const fs = require('fs');


exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}


exports.getOneBook = async (req, res, next) => {
    const bookId = req.params.id;
    Book.findOne({ _id: bookId })
        .then(books => res.status(200).json(books))
        .catch(error => res.status(404).json({ error }));
}

exports.getBestRatedBooks = async (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)

        .then(books => res.status(200).json(books))
        .catch(error => res.status(400).json({ error }));
}

exports.deleteABook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Book deleted successfuly!' }) })
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};


exports.updateABook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body }
    delete bookObject.userId;
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId != req.auth.userId) {
                res.status(401).json({ message: 'Not authorized' });
            } else {
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Book updated successfully!' }))
                    .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};


exports.createANewBook = async (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    book.save()
        .then(() => res.status(201).json({ message: 'Book saved successfully!' }))
        .catch((error) => res.status(400).json({ error }));
}


exports.addBookRating = async (req, res, next) => {
    const bookId = req.params.id;
    const newRating = {
        userId: req.params.userId,
        rating: req.params.rating
    }
    Book.updateOne({ _id: bookId }, { $push: { ratings: newRating } })
        .then(() => res.status(201).json({ message: 'Rating added successfully!' }))
        .catch((error) => res.status(400).json({ error }));
}