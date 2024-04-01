import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, AuthData, FilmDetails, FilmPreview, FilmPromo, ReviewFilm, State, UserData} from '../../types';
import {APIRoute, AppRoutes, AuthorizationStatus} from '../../enums/routes.ts';
import {dropToken, saveToken} from './token.ts';
import {store} from '../../store';
import {
  getCommentsFilmById,
  getFavoriteFilms,
  getFilms,
  getSimilarFilmById,
  isLoadFilms
} from '../../store/films/films-selectors.ts';
import {getFilmById, getFilmPromo} from '../../store/film/film-selectors.ts';
import {requireAuthorization, setError, setUserData} from '../../store/user/user-selectors.ts';
import {redirectToRoute} from '../../store/action.ts';

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmPreview[]>(APIRoute.Films);
    dispatch(getFilms(data));
    dispatch(isLoadFilms(true));
  },
);

export const fetchFilmPromo = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFilmPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmPromo>(APIRoute.FilmPromo);
    dispatch(getFilmPromo(data));
  },
);

export const fetchFavoriteFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getFavoriteFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmDetails[]>(APIRoute.FilmFavorite);
    dispatch(getFavoriteFilms(data));
  },
);

export const fetchSetFavoriteFilms = createAsyncThunk<void, { filmId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchSetFavoriteFilms',
  async ({filmId, status}, {dispatch, extra: api}) => {
    await api.post<FilmDetails>(`${APIRoute.FilmFavorite}/${filmId}/${status}`);
    dispatch(fetchFavoriteFilms());
  },
);

export const fetchFilmById = createAsyncThunk<void, string , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchFilmById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmDetails>(`${APIRoute.Films}/${filmId}`);
    dispatch(getFilmById(data));
  },
);

export const fetchCommentsFilmById = createAsyncThunk<void, string , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getCommentsFilmById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<ReviewFilm[]>(`${APIRoute.Comments}/${filmId}`);
    dispatch(getCommentsFilmById(data));
  },
);

export const fetchSimilarFilmById = createAsyncThunk<void, string , {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getCommentsFilmById',
  async (filmId, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmPreview[]>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`);
    dispatch(getSimilarFilmById(data));
  },
);

export const addReview = createAsyncThunk<void, { filmId: string; rating: number; comment: string }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/addReview',
  async ({filmId, comment, rating}, {dispatch, extra: api}) => {
    await api.post(`${APIRoute.Comments}/${filmId}`, {comment, rating});
    dispatch(redirectToRoute(`/films/${filmId}`));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      dispatch(fetchFavoriteFilms());
      dispatch(setUserData({
        email: data.email,
        avatarUrl: data.avatarUrl,
        name: data.name}));
    } catch (error) {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token, avatarUrl, name}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(setUserData({email, avatarUrl, name}));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(fetchFavoriteFilms());
    dispatch(redirectToRoute(AppRoutes.Main));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(getFavoriteFilms([]));
  },
);

export const clearErrorAction = createAsyncThunk(
  'films/clearError',
  () => {
    setTimeout(
      () => store.dispatch(setError(null)),
      5000
    );
  },
);
