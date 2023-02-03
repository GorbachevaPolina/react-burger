import React from 'react';
import ReactDOM from 'react-dom/client';
import { compose, createStore, applyMiddleware  } from 'redux';
import { rootReducer } from './services/reducers/root-reducer';
import './index.css';
import App from './components/app/app'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { socketMiddleware } from './services/middleware/socket';

const wsUrl = "wss://norma.nomoreparties.space/orders/all"

const composeEnhancers =
typeof window === 'object' &&
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
(window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware()));

export const store = createStore(rootReducer, enhancer); 

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

