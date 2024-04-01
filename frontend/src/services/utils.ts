import {FilmPreview} from '../types';
import {RatingFilm} from '../enums/routes.ts';
import moment from 'moment/moment';

export function computeUniqueGenres(films: FilmPreview[], ALL_GENRES: string) {
  return [ALL_GENRES, ...new Set(films.map((film) => film.genre))];
}

export function getRatingByFilm(rating: number) {
  switch (true) {
    case rating >= 0 && rating < 3:
      return RatingFilm.Bad;
    case rating >= 3 && rating < 5:
      return RatingFilm.Normal;
    case rating >= 5 && rating < 8:
      return RatingFilm.Good;
    case rating >= 8 && rating < 10:
      return RatingFilm.VeryGood;
    default:
      return RatingFilm.Awesome;
  }
}

export function getMoreLikeFilms(films: FilmPreview[], genre?: string, maxCards: number = films.length) {
  return films
    .filter((film) => genre ? film.genre.toLowerCase() === genre.toLowerCase() : film)
    .slice(0, maxCards);
}

export function formatFilmDuration(runTime: number) {
  return `${Math.trunc(runTime / 60)}h ${runTime % 60}m`;
}

export function getActiveClass(idx: number | string, activeTab: number | string, activeClass: string) {
  return activeTab === idx ? activeClass : '';
}

export function videoTimeFormat(time: number) {
  const hours = moment.duration(time, 'seconds').asHours();

  if (hours < 1) {
    return moment.utc(time * 1000).format('-mm:ss');
  } else {
    return moment.utc(time * 1000).format('-HH:mm:ss');
  }
}

export function checkLogin(login: string) {
  const regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  return !!login.match(regexp);
}

export function checkPassword(password: string) {
  const regex = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);

  return !!password.match(regex);
}
