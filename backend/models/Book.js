const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    userId: { type: String, required: true}, //identifiant MongoDB unique de l'utilisateur qui a créé le livre
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true}, //identifiant MongoDB unique de l'utilisateur qui a noté le livre
            grade: { type: Number, required: true }
    }],
    averageRating: { type: Number, required: true },
});

module.exports = mongoose.model('Book', bookSchema);
