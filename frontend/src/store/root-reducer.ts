import {NameSpace} from '../enums/routes.ts';
import {combineReducers} from '@reduxjs/toolkit';
import {film} from './film/film-slices.ts';
import {films} from './films/films-slices.ts';
import {userProcess} from './user/user-slice.ts';

export const rootReducer = combineReducers({
  [NameSpace.Film]: film.reducer,
  [NameSpace.Films]: films.reducer,
  [NameSpace.User]: userProcess.reducer,
});
