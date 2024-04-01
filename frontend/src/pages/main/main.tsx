import React, {useState} from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import GenresList from '../../components/genres-list/genres-list.tsx';
import FilmList from '../../components/film-list/film-list.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, getFilmsGenre} from '../../store/films/films-selectors.ts';
import ShowMoreBtn from '../../components/show-more-btn/show-more-btn.tsx';
import {MAX_CARD_FILM} from '../../const';

import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import BtnMyList from '../../components/btn-my-list/btn-my-list.tsx';

export default function MainPage(): React.JSX.Element {
  const [filmsCount, setFilmsCount] = useState(MAX_CARD_FILM);
  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.FILMS.films);
  const filmPromo = useAppSelector((state) => state.FILM.filmPromo);
  const sortedFilmsByGenre = useAppSelector((state) => state.FILMS.sortedFilmsByGenre);
  const genreName = useAppSelector((state) => state.FILMS.genre);

  const handleGenreClick = (genre: string) => {
    dispatch(changeGenre({genre}));
    dispatch(getFilmsGenre({genre}));
    setFilmsCount(MAX_CARD_FILM);
  };

  const handleBtnFilmsClick = () => {
    if(filmsCount < films.length) {
      setFilmsCount((prevState) => prevState + MAX_CARD_FILM);
    }
  };

  if(!filmPromo) {
    return <LoadingSpinner/>;
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img
            src={filmPromo.backgroundImage}
            alt={filmPromo.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header/>
        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img
                src={filmPromo.posterImage}
                alt={filmPromo.name}
                width={218}
                height={327}
              />
            </div>
            <div className="film-card__desc">
              <h2 className="film-card__title">{filmPromo.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{filmPromo.genre}</span>
                <span className="film-card__year">{filmPromo.released}</span>
              </p>
              <BtnMyList filmId={filmPromo.id}>{null}</BtnMyList>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenresList genresFilm={films} activeGenre={genreName} onClick={handleGenreClick}/>
          <FilmList filmsData={sortedFilmsByGenre} maxCards={filmsCount}/>
          {
            filmsCount < sortedFilmsByGenre.length && (
              <ShowMoreBtn onBtnClick={handleBtnFilmsClick}/>
            )
          }
        </section>
        <Footer></Footer>
      </div>
    </>
  );
}
