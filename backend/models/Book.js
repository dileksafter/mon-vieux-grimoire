import { Schema, model } from 'mongoose';

// Define the Mongoose schema for a book
const bookSchema = Schema({
    userId: { type: String }, // Identifiant MongoDB unique de l'utilisateur qui a créé le livre
    title: { type: String, required: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String }, // Identifiant MongoDB unique de l'utilisateur qui a noté le livre
            grade: { type: Number }
        }
    ],
    averageRating: { type: Number },
});

// Create a Mongoose model for the book
export const bookModel = model('Book', bookSchema);

