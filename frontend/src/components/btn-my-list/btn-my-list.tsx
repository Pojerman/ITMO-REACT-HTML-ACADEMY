import {AppRoutes, AuthorizationStatus} from '../../enums/routes.ts';
import {fetchSetFavoriteFilms} from '../../services/api/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getFavoriteFilms} from '../../store/films/films-selectors.ts';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {redirectToRoute} from '../../store/action.ts';

type BtnMyListProps = {
  children: JSX.Element | null;
  filmId: string;
}

export default function BtnMyList({children, filmId}:BtnMyListProps) {
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;
  const favoriteFilms = useAppSelector((state) => state.FILMS.favoriteFilms);
  const isFavoriteFilm = favoriteFilms.filter((favorite) => favorite.id === filmId).length > 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoriteFilms);
  });

  const changeFavoriteFilmsState = () => {
    if(isAuth) {
      dispatch(fetchSetFavoriteFilms({filmId: filmId, status: Number(!isFavoriteFilm)}));
    } else {
      dispatch(redirectToRoute(AppRoutes.SignIn));
    }
  };

  return(
    <div className="film-card__buttons">
      <Link
        className="btn btn--play film-card__button"
        to={AppRoutes.Player.replace(':id', filmId)}
      >
        <svg viewBox="0 0 19 19" width={19} height={19}>
          <use xlinkHref="#play-s" />
        </svg>
        <span>Play</span>
      </Link>
      <button className="btn btn--list film-card__button" onClick={changeFavoriteFilmsState}>
        {
          isFavoriteFilm ? (
            <svg
              viewBox="0 0 18 14"
              width="18"
              height="14"
            >
              <use xlinkHref="#in-list"></use>
            </svg>
          ) : (
            <svg viewBox="0 0 19 20" width={19} height={20}>
              <use xlinkHref="#add" />
            </svg>
          )
        }
        <span>My list</span>
        <span className="film-card__count">{favoriteFilms.length}</span>
      </button>
      {children}
    </div>
  );
}
