import {Link} from 'react-router-dom';
import {AppRoutes, AuthorizationStatus} from '../../../enums/routes.ts';
import {fetchFavoriteFilms, logoutAction} from '../../../services/api/api-actions.ts';
import {useAppDispatch, useAppSelector} from '../../../hooks';
import {store} from '../../../store';
import {redirectToRoute} from '../../../store/action.ts';

export default function UserBlock() {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.USER.authorizationStatus);
  const userData = useAppSelector((state) => state.USER.userData);

  const handleClick = () => {
    store.dispatch(fetchFavoriteFilms());
    dispatch(redirectToRoute(AppRoutes.MyList));
  };

  return(
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth ? (
          <>
            <li className="user-block__item">
              <div className="user-block__avatar" onClick={handleClick}>
                <img
                  src={userData.avatarUrl}
                  alt="User avatar"
                  width={63}
                  height={63}
                />
              </div>
            </li>
            <li className="user-block__item">
              <Link to={AppRoutes.Main} className="user-block__link" onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              >Sign out
              </Link>
            </li>
          </>
        ) : (
          <li className="user-block__item">
            <Link to={AppRoutes.SignIn} className="user-block__link">Sign in</Link>
          </li>
        )
      }
    </ul>
  );
}
