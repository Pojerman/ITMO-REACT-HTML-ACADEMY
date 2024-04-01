const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const filmsRoutes = require('./routes/filmsRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const commentsRoutes = require('./routes/commentsRoutes');

const app = express();
const PORT =  3000;

app.use(express.static('images'));
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(filmsRoutes);
app.use(imagesRoutes);
app.use(commentsRoutes);
app.use(favoriteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

