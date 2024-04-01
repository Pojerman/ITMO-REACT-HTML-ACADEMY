const fs = require("fs");
const express = require("express");
const router = express.Router();
const users = require("../data/users.json");
const filmsFavorite = require("../data/filmsfavorite.json");
const filmsList = require("../data/filmslist.json");
const filmsAbout = require("../data/filmsabout.json");
const { findUserByToken } = require('../utils/utils');

router.get('/favorite', (req, res) => {
    const token = req.header('x-token');
    const user = findUserByToken(users, token);
    const filmsUser = filmsFavorite.find(favorite => favorite.email === user.email)?.filmsId || [];
    const films = filmsList.filter(film => filmsUser.includes(film.id));
    res.json(films);
});

router.post('/favorite/:filmId/:status', (req, res) => {
    const token = req.header('x-token');
    const {filmId, status} = req.params;
    const user = findUserByToken(users, token);
    const userFavoriteFilms = filmsFavorite.find(favorite => favorite.email === user.email);
    const film = filmsAbout.find(el => el.id === filmId);

    if(status === "1") {
        if(userFavoriteFilms) {
            userFavoriteFilms.filmsId.push(filmId);
        } else {
            filmsFavorite.push({ email: user.email, filmsId: [filmId] });
        }
        film.isFavorite = true;
    } else {
        userFavoriteFilms.filmsId = userFavoriteFilms.filmsId.filter(film => film !== filmId);
        film.isFavorite = false;
    }
    fs.writeFileSync('./data/filmsfavorite.json', JSON.stringify(filmsFavorite, null, 2), 'utf8');
    res.json(film);
});

module.exports = router;
