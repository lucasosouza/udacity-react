import { combineReducers } from 'redux'
import { categories } from './categories/reducers.js'
import { posts } from './posts/reducers.js'
import { comments } from './comments/reducers.js'

export default combineReducers({
  categories,
  posts,
  comments,
})
