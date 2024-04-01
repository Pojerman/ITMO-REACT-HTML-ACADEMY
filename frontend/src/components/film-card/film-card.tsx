import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FilmPreview} from '../../types';
import VideoPlayer from '../video-player/video-player.tsx';
import {AppRoutes} from '../../enums/routes.ts';
import {fetchFilmById, fetchCommentsFilmById, fetchSimilarFilmById} from '../../services/api/api-actions.ts';
import {store} from '../../store';

type FilmCardProps = {
  film: FilmPreview;
}

const FilmCardComponent = ({film}: FilmCardProps): React.JSX.Element => {
  const [video, setVideo] = useState(false);
  const [isArticleHover, setArticleHover] = useState(false);

  const mouseOverHandler = () => {
    setArticleHover(true);
  };

  const mouseOutHandler = () => {
    setArticleHover(false);
    setVideo(false);
  };

  useEffect(() => {
    const hoverTimout =
      isArticleHover
        ? setTimeout(() => {
          setVideo(true);
        }, 1000)
        : '';

    return () => {
      clearTimeout(hoverTimout);
    };
  }, [isArticleHover]);

  const handleClick = () => {
    store.dispatch(fetchFilmById(film.id));
    store.dispatch(fetchCommentsFilmById(film.id));
    store.dispatch(fetchSimilarFilmById(film.id));
  };

  const navigate = useNavigate();

  const handleFilmCardClick = () => {
    navigate(`/films/${film.id}`);
  };

  return (
    <article
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image"
        onClick={handleFilmCardClick}
      >
        {
          video ? (<VideoPlayer videoLink={film.previewVideoLink} posterImage={film.previewImage}/>) : (<img src={film.previewImage} alt={film.name}/>)
        }
      </div>
      {
        !video && (
          <h3 className="small-film-card__title">
            <Link to={AppRoutes.Film.replace(':id', film.id)} className="small-film-card__link" onClick={handleClick}>{film.name}</Link>
          </h3>
        )
      }
    </article>
  );
};

export const FilmCard = React.memo(FilmCardComponent);
