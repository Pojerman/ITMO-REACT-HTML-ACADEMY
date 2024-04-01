export enum AppRoutes {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  Review = '/films/:id/review',
  Player = '/player/:id',
  NotFound = '*'
}

export enum FilmsRoutes {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}

export enum RatingFilm {
  Bad = 'Bad',
  Normal = 'Normal',
  Good = 'Good',
  VeryGood = 'Very good',
  Awesome = 'Awesome'
}

export enum APIRoute {
  Films = '/films',
  FilmPromo = '/promo',
  FilmFavorite = '/favorite',
  Comments = '/comments',
  Similar = '/similar',
  Login = '/login',
  Logout = '/logout'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum NameSpace {
  Films = 'FILMS',
  Film = 'FILM',
  User = 'USER',
}
