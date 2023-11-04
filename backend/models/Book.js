import { Schema, model } from 'mongoose';

const bookSchema = Schema({
    userId: { type: String}, //identifiant MongoDB unique de l'utilisateur qui a créé le livre
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String}, //identifiant MongoDB unique de l'utilisateur qui a noté le livre
            grade: { type: Number}
    }],
    averageRating: { type: Number},
});

export default model('Book', bookSchema);