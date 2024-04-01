import {createAction} from '@reduxjs/toolkit';
import {FilmDetails, FilmPromo} from '../../types';

export const getFilmPromo = createAction<FilmPromo>('films/getFilmPromo');
export const getFilmById = createAction<FilmDetails>('film/getFilmById');
