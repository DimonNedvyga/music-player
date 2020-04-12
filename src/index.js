import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import rootReducer from './redux/rootReducer';
import App from './App';

const loggerMiddleware = store => next => action => {
  // console.log('Middleware - before', store.getState())
  // console.log(action);
  const result = next(action)
  // console.log('Middleware -after ', store.getState())
  return result
}

const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(loggerMiddleware),
  ));

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(app ,document.getElementById('root')
);
serviceWorker.unregister();
