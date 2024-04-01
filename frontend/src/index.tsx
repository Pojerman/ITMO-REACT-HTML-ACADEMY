import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {store} from './store';
import ErrorMessage from './components/error-message/error-message.tsx';
import App from './components/app/app.tsx';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorMessage/>
      <App/>
    </Provider>
  </React.StrictMode>
);
