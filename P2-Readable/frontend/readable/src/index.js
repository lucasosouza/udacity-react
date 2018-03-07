import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';

// app specific
import './index.css';
import App from './App';
import rootReducer from './root_reducer';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
