import {FilmPreview} from '../../types';
import {FilmCard} from '../film-card/film-card.tsx';
import {useMemo} from 'react';
import {getMoreLikeFilms} from '../../services/utils.ts';

type FilmListProps = {
  filmsData: FilmPreview[];
  genre?: string;
  maxCards: number;
}

export default function FilmList({filmsData, genre, maxCards}:FilmListProps) {
  const memoizedMoreLikeFilms = useMemo(() => getMoreLikeFilms(filmsData, genre, maxCards), [filmsData, genre, maxCards]);

  return(
    <div className="catalog__films-list">
      {memoizedMoreLikeFilms.map((film) => (
        <FilmCard key={film.id} film={film}/>
      ))}
    </div>
  );
}
