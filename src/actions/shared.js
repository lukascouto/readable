import { handleGetAllCategories } from './categories'
import { handleGetAllPosts } from './posts'
import { handleOptionPost, handleOrderPost } from './filter'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    dispatch(handleGetAllCategories())
    dispatch(handleOptionPost('date'))
    dispatch(handleOrderPost(true))
    dispatch(hideLoading())
  }
}
