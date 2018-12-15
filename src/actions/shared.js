import { handleGetAllCategories } from './categories'
import { handleGetAllPosts } from './posts'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(handleGetAllCategories())
    dispatch(handleGetAllPosts())
    dispatch(hideLoading())
  }
}
