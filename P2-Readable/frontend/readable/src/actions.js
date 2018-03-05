import * as dataAPI from './dataAPI.js'

export const ADD_POST = 'ADD_POST'
export const ADD_USER = 'ADD_USER'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const addPost = post => ({
  type: ADD_POST,
  post
})

export const receivePosts = (posts) => ({
  type: RECEIVE_POSTS,
  posts
})

export const getPosts = () => dispatch => {
  dataAPI
    .getPosts()
    .then(posts => dispatch(receivePosts(posts)))
}

export const addUser = user => ({
  type: ADD_USER,
  user
})
