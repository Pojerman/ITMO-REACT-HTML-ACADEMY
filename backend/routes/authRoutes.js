const express = require('express');
const router = express.Router();
const fs = require('fs');
const crypto = require('crypto');
const users = require('../data/users.json');
const { findUserByToken } = require('../utils/utils');

router.post('/login', (req, res) => {
    const {email} = req.body;

    let user = users.find(user => user.email === email);
    if(!user) {
        const userNew = {
            email: email,
            token: crypto.randomUUID(),
            name: email.split('@')[0],
            avatarUrl: `http://localhost:3000/images/user${Math.floor(Math.random() * 3)}.jpg`
        }

        users.push(userNew);
        user = userNew;
    } else {
        user.token = crypto.randomUUID();
    }

    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2), 'utf8');

    const userResponse = {
        email: user.email,
        token: user.token,
        name: user.name,
        avatarUrl: user.avatarUrl,
    }

    res.json(userResponse)
});

router.get('/login', (req, res) => {
    const token = req.header('x-token');
    const user = findUserByToken(users, token);
    if(!user) {
        return res.status(401).json({ message: 'Access deny.' });
    }
    res.json(user)
});

router.delete('/logout', (req, res) => {
    const token = req.header('x-token');
    const user = findUserByToken(users, token);
    user.token = null;
    fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2), 'utf8');
    res.status(204).send();
});

module.exports = router;
