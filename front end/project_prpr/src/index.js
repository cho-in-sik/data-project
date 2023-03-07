import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyle';
// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Router 적용 안될 시 다시 해제하여 사용
/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); */

// Router.js 적용
root.render(
  <>
    <GlobalStyles />
    <Router />
  </>,
);

reportWebVitals();
