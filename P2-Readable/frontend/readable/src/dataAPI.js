
const root = 'http://localhost:3001';

const headers = {
  'Accept': 'application/json',
  'Authorization': 'whatever-you-want',
  'Content-Type': 'application/json'
}

// GET /categories
//   USAGE:
//     Get all of the categories available for the app. List is found in categories.js.
//     Feel free to extend this list as you desire.
export const getCategories = () =>
  fetch(`${root}/categories`, { headers })
    .then(res => res.json())

// GET /:category/posts
//   USAGE:
//     Get all of the posts for a particular category
export const getPostsPerCategory = (category) =>
fetch(`${root}/${category}/posts`, { headers })
  .then(res => res.json())

// GET /posts
//   USAGE:
//     Get all of the posts. Useful for the main page when no category is selected.
export const getPosts = () =>
  fetch(`${root}/posts`, { headers })
    .then(res => res.json())

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

export const addPost = (newPost) =>
  fetch(`${root}/posts`, {
    method: 'POST',
    headers ,
    body: JSON.stringify(newPost)
  }).then(res => res.json())

// GET /posts/:id
//   USAGE:
//     Get the details of a single post

export const getPost = (postId) =>
  fetch(`${root}/posts/${postId}`, { headers })
    .then(res => res.json())

// POST /posts/:id
//   USAGE:
//     Used for voting on a post
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

export const votePost = (postId, option) =>
  fetch(`${root}/posts/${postId}`, {
    method: 'POST',
    headers ,
    body: JSON.stringify({ option })
  }).then(res => res.json())

// PUT /posts/:id
//   USAGE:
//     Edit the details of an existing post
//   PARAMS:
//     title - String
//     body - String

export const editPost = (postId, postDetails) =>
  fetch(`${root}/posts/${postId}`, {
    method: 'PUT',
    headers ,
    body: JSON.stringify( postDetails )
  }).then(res => {
      const jsonres = res.json()
      console.log(jsonres)
      return jsonres
  })

// DELETE /posts/:id
//   USAGE:
//     Sets the deleted flag for a post to 'true'.
//     Sets the parentDeleted flag for all child comments to 'true'.

export const deletePost = (postId) =>
  fetch(`${root}/posts/${postId}`, { method: 'DELETE', headers })
    .then(res => res.json())

// GET /posts/:id/comments
//   USAGE:
//     Get all the comments for a single post

export const getPostComments = (postId) =>
  fetch(`${root}/posts/${postId}/comments`, { headers })
    .then(res => res.json())

// POST /comments
//   USAGE:
//     Add a comment to a post
//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.

export const addComment = (newComment) =>
  fetch(`${root}/comments`, {
    method: 'POST',
    headers ,
    body: JSON.stringify(newComment)
  }).then(res => res.json())

// GET /comments/:id
//   USAGE:
//     Get the details for a single comment

export const getComment = (commentId) =>
  fetch(`${root}/comments/${commentId}`, { headers })
    .then(res => res.json())

// POST /comments/:id
//   USAGE:
//     Used for voting on a comment.
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

export const voteComment = (commentId, option) =>
  fetch(`${root}/comments/${commentId}`, {
    method: 'POST',
    headers ,
    body: JSON.stringify({ option })
  }).then(res => res.json())

// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment
//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String

export const editComment = (commentId, commentDetails) =>
  fetch(`${root}/comments/${commentId}`, {
    method: 'PUT',
    headers ,
    body: JSON.stringify( commentDetails )
  }).then(res => res.json())

// DELETE /comments/:id
//   USAGE:
//     Sets a comment's deleted flag to 'true'

export const deleteComment = (commentId) =>
  fetch(`${root}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(res => res.json())
