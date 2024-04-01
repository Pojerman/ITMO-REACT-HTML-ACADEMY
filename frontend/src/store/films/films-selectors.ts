import {createAction} from '@reduxjs/toolkit';
import {FilmDetails, FilmPreview, ReviewFilm} from '../../types';

export const changeGenre = createAction<{genre: string}>('genre/changeGenre');
export const getFilmsGenre = createAction<{genre: string}>('films/getFilmsGenre');
export const getFilms = createAction<FilmPreview[]>('films/getFilms');
export const isLoadFilms = createAction<boolean>('films/isLoadFilms');

export const getFavoriteFilms = createAction<FilmDetails[]>('films/getFavoriteFilms');
export const setFavoriteFilms = createAction<FilmDetails[]>('films/setFavoriteFilms');
export const getCommentsFilmById = createAction<ReviewFilm[]>('film/getCommentsById');
export const getSimilarFilmById = createAction<FilmPreview[]>('film/getSimilarFilmById');

