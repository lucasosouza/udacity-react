import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// redux L2
import { createStore, applyMiddleware, compose } from 'redux';
import reducers  from './reducers';
import { addPost } from './actions';

// redux L3
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'

const store = createStore(
  reducers,
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
