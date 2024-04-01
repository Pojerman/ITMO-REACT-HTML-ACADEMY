import React, {useEffect, useState} from 'react';
import Logo from '../../components/header/logo/logo';
import Breadcrumbs from '../../components/header/breadcrumbs/breadcrumbs';
import UserBlock from '../../components/header/user-block/user-block';
import {REVIEW_TEXT_MAX_LENGTH, REVIEW_TEXT_MIN_LENGTH} from '../../const';
import {useAppDispatch, useAppSelector, useFetchFilm} from '../../hooks';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.tsx';
import {addReview} from '../../services/api/api-actions.ts';
import {useParams} from 'react-router-dom';


export default function AddReview(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const {id = ''} = useParams();
  useFetchFilm(id);
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [readOnly, setReadOnly] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      reviewText.length >= REVIEW_TEXT_MIN_LENGTH &&
      reviewText.length <= REVIEW_TEXT_MAX_LENGTH &&
      rating > 0
    ) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [rating, reviewText.length]);

  useEffect(() => {
    if (isLoading) {
      setReadOnly(true);
      setBtnDisabled(true);
    } else {
      setReadOnly(false);
    }
  }, [isLoading]);

  const filmData = useAppSelector((state) => state.FILM.filmById);
  if(!filmData) {
    return <LoadingSpinner/>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();


    dispatch(
      addReview({ filmId: filmData.id, rating: Number(rating), comment: reviewText })
    );

    setLoading(true);
    setReviewText('');
    setRating(0);

  };

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img
            src={filmData.backgroundImage}
            alt={filmData.name}
          />
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <header className="page-header">
          <Logo/>
          <Breadcrumbs id={filmData.id} title={filmData.name} />
          <UserBlock/>
        </header>
        <div className="film-card__poster film-card__poster--small">
          <img
            src={filmData.posterImage}
            alt={`${filmData.name} poster`}
            width={218}
            height={327}
          />
        </div>
      </div>
      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={handleSubmit}>
          <div className="rating">
            <div className="rating__stars">
              {
                Array.from({length: 10}, (_, index) => 10 - index)
                  .map((star) => (
                    <React.Fragment key={star}>
                      <input
                        className="rating__input"
                        id={`star-${star}`}
                        type="radio"
                        name="rating"
                        value={star}
                        onChange={(event) => setRating(Number(event.target.value))}
                        disabled={readOnly}
                      />
                      <label className="rating__label" htmlFor={`star-${star}`}>
                        Rating {star}
                      </label>
                    </React.Fragment>
                  ))
              }
            </div>
          </div>
          <div className="add-review__text">
            <textarea
              className="add-review__textarea"
              name="reviewText"
              id="reviewText"
              placeholder="Review text"
              defaultValue={''}
              onChange={(event) => setReviewText(event.target.value)}
              disabled={readOnly}
            />
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit" disabled={btnDisabled}>
                {isLoading ? 'Submit' : 'Post'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
