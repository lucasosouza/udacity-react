import * as dataAPI from '../dataAPI.js'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = (posts) => ({
  type: RECEIVE_CATEGORIES,
  categories
})

export const fetchCategories = () => dispatch => {
  dataAPI
    .fetchCategories()
    .then(data => dispatch(receiveCategories(data)))
}
