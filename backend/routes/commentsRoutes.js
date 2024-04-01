const fs = require("fs");
const express = require("express");
const router = express.Router();
const filmsComments = require("../data/filmscomments.json");
const users = require("../data/users.json");
const { findUserByToken } = require('../utils/utils');

router.get('/comments/:filmId', (req, res) => {
    const {filmId} = req.params;
    const comments = filmsComments.filter(film => film.id === filmId);
    res.json(comments)
});

router.post('/comments/:filmId', (req, res) => {
    const token = req.header('x-token');
    const {filmId} = req.params;
    const {comment, rating} = req.body;
    const user = findUserByToken(users, token);
    const newComment = {
        id: filmId,
        date: new Date().toISOString(),
        user: user.name,
        comment: comment,
        rating: rating
    }

    filmsComments.push(newComment);
    fs.writeFileSync('./data/filmscomments.json', JSON.stringify(filmsComments, null, 2), 'utf8');

    res.json(newComment);
});

module.exports = router;
