
import { ADD_POST } from './actions.js'

const initialState = {posts: []}

export function reducer(state=initialState, action){
  switch(action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat(action.post)
      }
    default:
      return state
  }
}
