import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFound from '../not-found/not-found.tsx';
import FilmList from '../../components/film-list/film-list.tsx';
import {AppRoutes, AuthorizationStatus} from '../../enums/routes.ts';
import MoviePageDetails from './movie-page-details/movie-page-details.tsx';
import MoviePageOverview from './movie-page-overview/movie-page-overview.tsx';
import MoviePageReviews from './movie-page-reviews/movie-page-reviews.tsx';
import {getActiveClass} from '../../services/utils.ts';
import {useAppSelector, useFetchFilm} from '../../hooks';
import {FILM_NAV_ITEM_ACTIVE, TABS} from '../../const';
import BtnMyList from '../../components/btn-my-list/btn-my-list.tsx';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';

export default function MoviePage(): React.JSX.Element {
  const {id = ''} = useParams();

  useFetchFilm(id);
  const [activeTab, setActiveTab] = useState(0);
  const film = useAppSelector((state) => state.FILM.filmById);
  const comments = useAppSelector((state) => state.FILMS.commentsFilmById);
  const similarFilms = useAppSelector((state) => state.FILMS.similarFilmById);
  const isAuth = useAppSelector((state) => state.USER.authorizationStatus);

  if(!film) {
    return <LoadingSpinner/>;
  }

  const renderTabs = (tabNumber: number): JSX.Element => {
    switch(tabNumber) {
      case 0:
        return <MoviePageOverview film={film}/> ;
      case 1:
        return <MoviePageDetails film={film}/>;
      case 2:
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
              <BtnMyList filmId={film.id}>
                {
                  isAuth === AuthorizationStatus.Auth ? (
                    <Link to={AppRoutes.Review.replace(':id', film.id) } className="btn film-card__button">Add review</Link>
                  ) : null
                }
              </BtnMyList>
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
                  {TABS.map((tab, idx) => (
                    <li className={`film-nav__item tab-hover ${getActiveClass(idx, activeTab, FILM_NAV_ITEM_ACTIVE)}`}
                      key={tab}
                    >
                      <a className="film-nav__link" onClick={() => setActiveTab(idx)} >{tab}</a>
                    </li>
                  ))}
                </ul>
              </nav>
              {renderTabs(activeTab)}
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
