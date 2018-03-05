import { combineReducers } from 'redux'
import { ADD_POST, RECEIVE_POSTS, ADD_USER } from './actions.js'

function posts(state=[], action){
  switch(action.type) {
    case ADD_POST:
      return state.concat(action.post)
    case RECEIVE_POSTS:
      return action.posts
    default:
      return state
  }
}

function users(state=[], action){
  switch(action.type) {
    case ADD_USER:
      return state.concat(action.user)
    default:
      return state
  }
}

export default combineReducers({
  posts,
  users,
})
