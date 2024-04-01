import {FilmDetails, FilmPreview, ReviewFilm} from '../../types';
import {ALL_GENRES} from '../../const';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../enums/routes.ts';
import {
  changeGenre,
  getCommentsFilmById,
  getFavoriteFilms,
  getFilms, getFilmsGenre,
  getSimilarFilmById,
  isLoadFilms,
  setFavoriteFilms
} from './films-selectors.ts';

type InitialState = {
  genre: string;
  films: FilmPreview[];
  sortedFilmsByGenre: FilmPreview[];
  isLoadFilms: boolean;
  favoriteFilms: FilmDetails[];
  isFavoriteFilms: FilmDetails[];
  commentsFilmById: ReviewFilm[];
  similarFilmById: FilmPreview[];
}

const initialState: InitialState = {
  genre: ALL_GENRES,
  films: [],
  sortedFilmsByGenre: [],
  isLoadFilms: false,
  favoriteFilms: [],
  isFavoriteFilms: [],
  commentsFilmById: [],
  similarFilmById: [],
};

export const films = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<{genre: string}>) => {
      state.genre = action.payload.genre;
    },
    getFilmsGenre: (state, action: PayloadAction<{genre: string}>) => {
      state.sortedFilmsByGenre = state.films.filter((film) => action.payload.genre === 'All genres' ? film : film.genre === action.payload.genre);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(changeGenre, (state, action) => {
        const {genre} = action.payload;
        state.genre = genre;
      })
      .addCase(getFilmsGenre, (state, action) => {
        const {genre} = action.payload;
        state.sortedFilmsByGenre = state.films.filter((film) => genre === ALL_GENRES ? film : film.genre === genre);
      })
      .addCase(getFilms, (state, action) => {
        state.films = action.payload;
        state.sortedFilmsByGenre = action.payload;
      })
      .addCase(isLoadFilms, (state, action) => {
        state.isLoadFilms = action.payload;
      })
      .addCase(getFavoriteFilms, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(setFavoriteFilms, (state, action) => {
        state.isFavoriteFilms = action.payload;
      })
      .addCase(getCommentsFilmById, (state, action) => {
        state.commentsFilmById = action.payload;
      })
      .addCase(getSimilarFilmById, (state, action) => {
        state.similarFilmById = action.payload;
      });
  }
});
