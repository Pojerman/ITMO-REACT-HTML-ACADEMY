import React from 'react';
import {Link} from 'react-router-dom';
import Footer from '../../components/footer/footer.tsx';
import Logo from '../../components/header/logo/logo.tsx';

export default function NotFound(): React.JSX.Element {
  return (
    <div className="user-page" style={{justifyContent: 'space-between'}}>
      <header className="page-header user-page__head">
        <Logo/>
      </header>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'}}>
        <h1 className="catalog__title">Error 404. Page not found</h1>
        <Link to={'/'} className="user-block__link">Back to home page</Link>
      </div>
      <Footer></Footer>
    </div>
  );
}
