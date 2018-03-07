import { RECEIVE_CATEGORIES } from './actions.js'

export function categories(state=[], action){
  switch(action.type) {
    case RECEIVE_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
