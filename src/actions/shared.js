import { handleGetAllCategories } from './categories'
import { handleGetAllPosts } from './posts'
import { handleOptionPost, handleOrderPost } from './filter'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(handleGetAllCategories())
    dispatch(handleGetAllPosts())
    dispatch(handleOptionPost('date'))
    dispatch(handleOrderPost(true))
  }
}
