import {FilmDetails, FilmPromo} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../enums/routes.ts';
import {getFilmById, getFilmPromo} from './film-selectors.ts';

type InitialState = {
  filmPromo: FilmPromo | null;
  filmById: FilmDetails | null;
}

const initialState: InitialState = {
  filmPromo: null,
  filmById: null,
};

export const film = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilmPromo, (state, action) => {
        state.filmPromo = action.payload;
      })
      .addCase(getFilmById, (state, action) => {
        state.filmById = action.payload;
      });
  }
});
