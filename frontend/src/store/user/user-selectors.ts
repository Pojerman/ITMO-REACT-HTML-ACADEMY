import {createAction} from '@reduxjs/toolkit';
import {User} from '../../types';
import {AuthorizationStatus} from '../../enums/routes.ts';

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setUserData = createAction<User>('user/setUserData');
export const setError = createAction<string | null>('films/setError');
