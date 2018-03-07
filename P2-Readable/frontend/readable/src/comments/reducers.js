import { RECEIVE_NEW_COMMENT, RECEIVE_EDITED_COMMENT, RECEIVE_POST_COMMENTS} from './actions.js'

/*
simple
state
{
  comments: {
    postId1: [comment1, comment2, ...],
    postId2: [comment1, comment2, ...],
  }
}
*/

export function comments(state={}, action){
  var type, postId, comment, comments
  ({ type, postId, comment, comments } = action)
  switch(type) {
    case RECEIVE_POST_COMMENTS:
      return {
        ...state,
        [postId]: comments
        }
    case RECEIVE_NEW_COMMENT:
      return {
        ...state,
        [postId]: state[postId].concat(comment)
      }
    case RECEIVE_EDITED_COMMENT:
      return {
        ...state,
        [postId]: state[postId].filter((c) => c.id !== comment.id).concat(comment)
      }
    default:
      return state
  }
}
