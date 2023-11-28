import React from 'react';
import {Link, useParams} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFound from '../not-found/not-found.tsx';
import FilmList from '../../components/film-list/film-list.tsx';
import {AppRoutes, FilmsRoutes} from '../../enums/routes.ts';
import MoviePageDetails from './movie-page-details/movie-page-details.tsx';
import MoviePageOverview from './movie-page-overview/movie-page-overview.tsx';
import MoviePageReviews from './movie-page-reviews/movie-page-reviews.tsx';
import {getActiveClass} from '../../services/utils.ts';
import {useAppSelector} from '../../hooks';
import {FILM_NAV_ITEM_ACTIVE} from '../../const';
import {useFetchFilm} from '../../hooks';
import BtnMyList from '../../components/btn-my-list/btn-my-list.tsx';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';

export default function MoviePage(): React.JSX.Element {
  const {id = ''} = useParams();

  useFetchFilm(id);
  const paramsFilm = useParams();

  const
    film = useAppSelector((state) => state.filmById),
    comments = useAppSelector((state) => state.commentsFilmById),
    favoriteFilms = useAppSelector((state) => state.favoriteFilms),
    similarFilms = useAppSelector((state) => state.similarFilmById);

  if(!film) {
    return <LoadingSpinner/>;
  }

  const renderTabs = (tabName: string | undefined): JSX.Element => {
    switch(tabName) {
      case FilmsRoutes.Overview:
        return <MoviePageOverview film={film}/> ;
      case FilmsRoutes.Details:
        return <MoviePageDetails film={film}/>;
      case FilmsRoutes.Reviews:
        return <MoviePageReviews reviewsFilm={comments}/>;
      default:
        return <MoviePageOverview film={film}/>;
    }
  };

  return film ? (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img
              src={film.backgroundImage}
              alt={film.name}
            />
          </div>
          <h1 className="visually-hidden">WTW</h1>
          <Header/>
          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>
              <div className="film-card__buttons">
                <BtnMyList filmId={film.id} amountFilms={favoriteFilms.length} isFavorite={film.isFavorite}/>
                <Link to={AppRoutes.AddReview.replace(':id', film.id) } className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <nav className="film-nav film-card__nav">
                <ul className="film-nav__list">
                  <li className={`film-nav__item ${getActiveClass(paramsFilm.info, FilmsRoutes.Overview, FILM_NAV_ITEM_ACTIVE)}`}>
                    <Link to={AppRoutes.Film.replace(':id', film.id).replace(':info', FilmsRoutes.Overview)} className="film-nav__link">Overview</Link>
                  </li>
                  <li className={`film-nav__item ${getActiveClass(paramsFilm.info, FilmsRoutes.Details, FILM_NAV_ITEM_ACTIVE)}`}>
                    <Link to={AppRoutes.Film.replace(':id', film.id).replace(':info', FilmsRoutes.Details)} className="film-nav__link">Details</Link>
                  </li>
                  <li className={`film-nav__item ${getActiveClass(paramsFilm.info, FilmsRoutes.Reviews, FILM_NAV_ITEM_ACTIVE)}`}>
                    <Link to={AppRoutes.Film.replace(':id', film.id).replace(':info', FilmsRoutes.Reviews)} className="film-nav__link">Reviews</Link>
                  </li>
                </ul>
              </nav>
              {renderTabs(paramsFilm.info)}
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmList filmsData={similarFilms} maxCards={4} />
        </section>
        <Footer></Footer>
      </div>
    </>
  ) : <NotFound/>;
}
