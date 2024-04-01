import { store } from '../../store';
import {clearErrorAction} from '../api/api-actions.ts';
import {setError} from '../../store/user/user-selectors.ts';

export const processErrorHandle = (message: string): void => {
  store.dispatch(setError(message));
  store.dispatch(clearErrorAction());
};
