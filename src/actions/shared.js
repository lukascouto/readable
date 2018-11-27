import { handleGetAllCategories } from './categories'
import { handleGetAllPosts } from './posts'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(handleGetAllCategories())
    dispatch(handleGetAllPosts())
  }
}
