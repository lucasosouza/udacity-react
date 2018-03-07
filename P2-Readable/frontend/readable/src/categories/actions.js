import * as dataAPI from '../dataAPI.js'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const receiveCategories = (categories) => ({
  type: RECEIVE_CATEGORIES,
  categories,
})

export const getCategories = () => dispatch => {
  dataAPI
    .getCategories()
    .then(data => dispatch(receiveCategories(data.categories)))
}
