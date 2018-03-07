import * as dataAPI from '../dataAPI.js'

export const RECEIVE_NEW_COMMENT = 'RECEIVE_NEW_COMMENT'
export const RECEIVE_EDITED_COMMENT = 'RECEIVE_EDITED_COMMENT'
export const RECEIVE_POST_COMMENTS = 'RECEIVE_POST_COMMENTS'

// GET /posts/:id/comments
//   USAGE:
//     Get all the comments for a single post

const receivePostComments = (postId, comments) => ({
  type: RECEIVE_POST_COMMENTS,
  postId,
  comments,
})

export const getPostComments = (postId) => dispatch => {
  dataAPI
    .getPostComments(postId)
    .then(data => dispatch(receivePostComments(postId, data)))
}

// POST /comments
//   USAGE:
//     Add a comment to a post
//   PARAMS:
//     id: Any unique ID. As with posts, UUID is probably the best here.
//     timestamp: timestamp. Get this however you want.
//     body: String
//     author: String
//     parentId: Should match a post id in the database.

const receiveNewComment = (comment) => ({
  type: RECEIVE_NEW_COMMENT,
  comment,
  postId: comment.parentId
})

export const addComment = (comment) => dispatch => {
  dataAPI
    .addComment(comment)
    .then(data => dispatch(receiveNewComment(data)))
}

// POST /comments/:id
//   USAGE:
//     Used for voting on a comment.
//   PARAMS:
//     option - String: Either "upVote" or "downVote"

const receiveEditedComment = (comment) => ({
  type: RECEIVE_EDITED_COMMENT,
  comment,
  postId: comment.parentId
})

export const voteComment = (commentId, option) => dispatch => {
  dataAPI
    .voteComment(commentId, option)
    .then(data => dispatch(receiveEditedComment(data)))
}

// PUT /comments/:id
//   USAGE:
//     Edit the details of an existing comment
//   PARAMS:
//     timestamp: timestamp. Get this however you want.
//     body: String

export const editComment = (commentId, commentDetails) => dispatch => {
  dataAPI
    .editComment(commentId, commentDetails)
    .then(data => dispatch(receiveEditedComment(data)))
}

// DELETE /comments/:id
//   USAGE:
//     Sets a comment's deleted flag to 'true'

export const deleteComment = (commentId) => dispatch => {
  dataAPI
    .deleteComment(commentId)
    .then(data => dispatch(receiveEditedComment(data)))
}
