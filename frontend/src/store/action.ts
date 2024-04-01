import {createAction} from '@reduxjs/toolkit';
import {AppRoutes} from '../enums/routes.ts';

export const redirectToRoute = createAction<AppRoutes | string>('main/redirectToRoute');
