import * as dataAPI from '../dataAPI.js'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POSTS_PER_CATEGORY = 'RECEIVE_POSTS_PER_CATEGORY'
export const RECEIVE_NEW_POST = 'RECEIVE_NEW_POST'
export const RECEIVE_EDITED_POST = 'RECEIVE_EDITED_POST'
export const RECEIVE_POST = 'RECEIVE_POST'

// GET /:category/posts
//   USAGE:
//     Get all of the posts for a particular category

const receivePostsPerCategory = (category, posts) => ({
  type: RECEIVE_POSTS_PER_CATEGORY,
  category,
  posts
})

export const getPostsPerCategory = (category) => dispatch => {
  dataAPI.
    getPostsPerCategory(category)
    .then(data => dispatch(receivePostsPerCategory(category, data.posts)))
}

// GET /posts
//   USAGE:
//     Get all of the posts. Useful for the main page when no category is selected.

const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts: posts.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})
})

export const getPosts = () => dispatch => {
  dataAPI
    .getPosts()
    .then(data => dispatch(receivePosts(data)))
}

// POST /posts
//   USAGE:
//     Add a new post
//
//   PARAMS:
//     id - UUID should be fine, but any unique id will work
//     timestamp - timestamp in whatever format you like, you can use Date.now() if you like
//     title - String
//     body - String
//     author - String
//     category: Any of the categories listed in categories.js. Feel free to extend this list as you desire.

const receiveNewPost = (post) => ({
  type: RECEIVE_NEW_POST,
  post,
  category: post.category
})

export const addPost = (post) => dispatch => {
  dataAPI
    .addPost(post)
    .then(data => dispatch(receiveNewPost(data)))
}

// GET /posts/:id
//   USAGE:
//     Get the details of a single post

const receivePost = (post) => ({
  type: RECEIVE_POST,
  post,
})

export const getPost = (postId) => dispatch => {
  dataAPI
    .getPost(postId)
    .then(data => dispatch(receivePost(data)))
}

// POST /posts/:id
//   USAGE:
//     Used for voting on a post
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

const receiveEditedPost = (post) => ({
  type: RECEIVE_EDITED_POST,
  post
})

export const votePost = (postId, option) => dispatch => {
  dataAPI
    .votePost(postId, option)
    .then(data => dispatch(receiveEditedPost(data)))
}

// PUT /posts/:id
//   USAGE:
//     Edit the details of an existing post
//   PARAMS:
//     title - String
//     body - String

export const editPost = (postId, postDetails) => dispatch => {
  dataAPI
    .editPost(postId, postDetails)
    .then(data => dispatch(receiveEditedPost(data)))
}

// DELETE /posts/:id
//   USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.

export const deletePost = (postId) => dispatch => {
  dataAPI
    .deletePost(postId)
    .then(data => dispatch(receiveEditedPost(data)))
}
