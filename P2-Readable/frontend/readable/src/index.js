import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux';
import { reducer }  from './reducers'
import { addPost } from './actions'

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let post = 'This is a post'
store.dispatch(addPost(post))

//console.log(store.getState())
//console.log(store)

ReactDOM.render(<App store={store}/>, document.getElementById('root'));
registerServiceWorker();
