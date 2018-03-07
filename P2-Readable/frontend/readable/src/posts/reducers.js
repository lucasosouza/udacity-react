import { RECEIVE_POSTS, RECEIVE_POSTS_PER_CATEGORY,
  RECEIVE_NEW_POST, RECEIVE_EDITED_POST, RECEIVE_POST} from './actions.js'

/*
state
{
  allPosts: { id: post1, id: post2, id: post3}
  categoryA: [id, id, id]
  categoryB: [id, id, id]
  categoryC: [id, id, id]
}

- indexing by ID? easy to modify a post
- have a list of all posts,
ensure they are all on the same location
- have categories separate to avoid looping
through all posts for each view
*/

export function posts(state={}, action){
  var type, category, post, posts
  ({ type, category, post, posts } = action)
  switch(type) {
    case RECEIVE_POSTS:
      return {
        ...state,
        allPosts: posts
      }
    case RECEIVE_POSTS_PER_CATEGORY:
      return {
        ...state,
        [category]: posts.map((post) => post.id),
        allPosts: Object.assign({}, state.allPosts, posts)
      }
    case RECEIVE_NEW_POST:
      return {
        ...state,
        // [category]: state[category].concat(post.id),
        allPosts: {
          ...state.allPosts,
          [post.id]: post
        }
      }
    case RECEIVE_EDITED_POST:
      return {
        ...state,
        allPosts: {
          ...state.allPosts,
          [post.id]: post
        },
        selectedPost: post
      }
    case RECEIVE_POST:
      // missing
      return {
        ...state,
        selectedPost: post
      }
    default:
      return state
  }
}
