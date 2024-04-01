const express = require('express');
const router = express.Router();
const filmsList = require('../data/filmslist.json');
const filmPromo = require('../data/filmpromo.json');
const filmsAbout = require('../data/filmsabout.json');

router.get('/films', (req, res) => {
    res.json(filmsList);
});

router.get('/films/:filmId', (req, res) => {
    const {filmId} = req.params;
    const film = filmsAbout.find(film => film.id === filmId);

    if (film) {
        res.json(film);
    } else {
        res.status(404).json({ error: 'Film not found' });
    }
});

router.get('/films/:filmId/similar', (req, res) => {
    const {filmId} = req.params;
    const filmGenre = filmsList.find(film => film.id === filmId).genre;
    const filmsSimilar = filmsList.filter(film => film.genre === filmGenre && filmId !== film.id);
    res.json(filmsSimilar);
})

router.get('/promo', (req, res) => {
    res.json(filmPromo);
});

module.exports = router;
