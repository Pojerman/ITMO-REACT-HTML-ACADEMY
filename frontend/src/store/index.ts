import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root-reducer.ts';
import {createApi} from '../services/api/api.ts';
import {redirect} from './middlewares/redirects.ts';

export const api = createApi();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect)
});
