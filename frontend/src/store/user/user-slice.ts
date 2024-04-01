import {AuthorizationStatus, NameSpace} from '../../enums/routes.ts';
import {User} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {requireAuthorization, setError, setUserData} from './user-selectors.ts';

type InitialState = {
  authorizationStatus: AuthorizationStatus;
  userData: User;
  error: string | null;
};

const initialState: InitialState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: {
    name: '',
    avatarUrl: '',
    email: '',
  },
  error: null,
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(requireAuthorization, (state, action) => {
        state.authorizationStatus = action.payload;
      })
      .addCase(setUserData, (state, action) => {
        state.userData = action.payload;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      });
  }
});
