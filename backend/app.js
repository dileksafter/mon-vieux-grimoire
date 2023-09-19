const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')
const Book = require('./models/Book')

mongoose.connect('mongodb+srv://test_user:mongoosepassword@cluster0.d8rcxte.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();
app.use(bodyParser.json())


app.post('/api/auth/signup', async (req, res, next) => {
    // req.headers['Access-Control-Allow-Origin'] = true
    delete req.body._id;
    const user = new User({
        ...req.body
    });
    user.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
    ;
})



// Vérification des informations d'identification de
// l'utilisateur ; renvoie l’_id de l'utilisateur depuis la
// base de données et un token web JSON signé
// (contenant également l'_id de l'utilisateur).
// verification que l'email + mot de passe sont dans le req body
app.post('/api/auth/login', async (req, res, next) => {
    const userId = 'test'
    const token = 'testToken'
    res.send({ userId, token })
})

//Renvoie un tableau de tous les livres de la base de données
app.use('/api/books', (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  });


//Renvoie le livre avec l’_id fourni.
app.get('/api/books/:id', async (req, res, next) => {
    const bookId = req.params.id;
    Book.findOne({ _id: bookId })
      .then(books => res.status(200).json(books))
      .catch(error => res.status(404).json({ error }));
});


//Renvoie un tableau des 3 livres de la base de données ayant la meilleure note moyenne.
app.get('/api/books/bestrating', async (req, res, next) => {
    Book.find().sort({averageRating:-1}).limit(3)

    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
});





















//besoin middleware authentification, besoin de de-strigifier les donnees du livre et les ajouter a la base de donnees
//body sera book: string, image :file
app.post('/api/books', async (req, res, next) => {
    res.send({ message: 'book added' })
});


//besoin middleware authentification, besoin de de-strigifier les donnees du livre et les ajouter a la base de donnees
//body sera book: string, image :file
//ou Json avec les donnees du livre 
app.put('/api/books/:id', async (req, res, next) => {
    const bookId = req.params.id;
    res.send({ message: 'book changed' })
})



//besoin middleware authentification
//Supprime le livre avec l'_id fourni ainsi que l’image associée.
app.delete('/api/books/:id', async (req, res, next) => {
    const bookId = req.params.id;
    res.send({ message: 'book deleted' })
})


//besoin middleware authentification
//body sera userId: string, rating :number
// Définit la note pour le user ID fourni.
// La note doit être comprise entre 0 et 5.
// L'ID de l'utilisateur et la note doivent être ajoutés au
// tableau "rating" afin de ne pas laisser un utilisateur
// noter deux fois le même livre.
// Il n’est pas possible de modifier une note.
// La note moyenne "averageRating" doit être tenue à
// jour, et le livre renvoyé en réponse de la requête.
app.post('/api/books/:id/rating', async (req, res, next) => {
    const bookId = req.params.id;
    res.send({ message: 'rating added' })
})












module.exports = app;