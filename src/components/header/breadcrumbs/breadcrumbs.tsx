import {Link} from 'react-router-dom';
import {BreadcrumbsFilm} from '../../../types/films.tsx';
import {AppRoutes} from '../../../enums/routes.ts';

export default function Breadcrumbs({id, title}:BreadcrumbsFilm) {
  return(
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={AppRoutes.film.replace(':id', id)} className="breadcrumbs__link">
            {title}
          </Link>
        </li>
        <li className="breadcrumbs__item">
          <Link to={AppRoutes.addReview.replace(':id', id)} className="breadcrumbs__link">Add review</Link>
        </li>
      </ul>
    </nav>
  );
}
