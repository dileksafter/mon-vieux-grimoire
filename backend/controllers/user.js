import { hash as _hash, compare } from 'bcryptjs';
import User from '../models/user.js';
import { sign } from 'jsonwebtoken';

export function signup(req, res, next) {

    if (!req.body.password || req.body.password.length < 5) {
        return res.status(400).json({ error: { message: 'Le mot de passe doit contenir au moins 5 caractères !' } })
    }

    _hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

export function login(req, res, next) {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ message: 'Combinaison utilisateur et mot de passe incorrecte !' });
            }
            compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Combinaison utilisateur et mot de passe incorrecte !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
}

