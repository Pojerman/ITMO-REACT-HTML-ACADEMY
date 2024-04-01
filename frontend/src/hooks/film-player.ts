import {useNavigate, useParams} from 'react-router-dom';
import {useAppDispatch} from './store.ts';
import {useEffect} from 'react';
import {fetchFilmById} from '../services/api/api-actions.ts';
import {AppRoutes} from '../enums/routes.ts';

export function useLoadFilmPlayer(): void {
  const {id = ''} = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(id) {
      dispatch(fetchFilmById(id))
        .then((res) => {
          if(res.meta.requestStatus === 'rejected') {
            navigate(`/${AppRoutes.NotFound}`);
          }
        });
    }
  }, [id, navigate, dispatch]);
}
