import { ReactElement } from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoutes, AuthorizationStatus} from '../../enums/routes.ts';
import {useAppSelector} from '../../hooks';

export interface PrivateRoute {
  children: ReactElement;
}

export default function PrivateRoutes({children}: PrivateRoute): ReactElement {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  return authorizationStatus === AuthorizationStatus.NoAuth ? <Navigate to={AppRoutes.SignIn}/> : children;
}
