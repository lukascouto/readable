import { handleGetAllCategories } from './categories'
import { handleOptionPost, handleOrderPost } from './filter'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(handleGetAllCategories())
    dispatch(handleOptionPost('date'))
    dispatch(handleOrderPost(true))
  }
}
