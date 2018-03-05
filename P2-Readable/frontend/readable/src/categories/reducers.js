import { RECEIVE_CATEGORIES } from './actions.js'

export function categories(state=[], action){
  switch(action.type) {
    case RECEIVE_POSTS:
      return action.categories
    default:
      return state
  }
}
