import React from 'react';
import {ReviewFilm} from '../../../types';
import ReviewsFilm from '../../../components/reviews-film/reviews-film.tsx';
import {MAX_REVIEWS_CARD} from '../../../const';

type ReviewsProps = {
  reviewsFilm: ReviewFilm[];
}

export default function MoviePageReviews({reviewsFilm}: ReviewsProps): React.JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        <ReviewsFilm reviewsFilm={reviewsFilm.slice(0, MAX_REVIEWS_CARD / 2)}></ReviewsFilm>
      </div>
      <div className="film-card__reviews-col">
        <ReviewsFilm reviewsFilm={reviewsFilm.slice(3, MAX_REVIEWS_CARD)}></ReviewsFilm>
      </div>
    </div>
  );
}
