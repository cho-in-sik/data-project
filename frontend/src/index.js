import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import GlobalStyles from './styles/GlobalStyle';
// import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

// 스토어를 export 해줘야한다. (안그럼 PersistGate가 store를 못 읽는다)
export let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));

// Router 적용 안될 시 다시 해제하여 사용
/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
); */

// Router.js 적용
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyles />
      <Router />
    </PersistGate>
  </Provider>,
);

reportWebVitals();
