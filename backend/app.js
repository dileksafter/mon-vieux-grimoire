import express from 'express';
import { json } from 'body-parser';
import { connect } from 'mongoose';
import cors from 'cors';
import bookRoutes from './routes/book.js';
import userRoutes from './routes/user.js';
import { join } from 'path'; 


//logique de connexion a mongodb
connect('mongodb+srv://test_user:mongoosepassword@cluster0.d8rcxte.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express(); // instance qui configure et gére les routes et les middleware de l'app    


//CORS 
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use(json())

app.use('/api/books', bookRoutes)
app.use('/api/auth', userRoutes)
app.use('/images', express.static(join(__dirname, 'images')));


export default app;