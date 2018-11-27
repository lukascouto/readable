import { getAllCategories } from '../utils/api'

export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

function receiveCategories (categories) {
    return {
        type: RECEIVE_CATEGORIES,
        categories,
    }
}

export function handleGetAllCategories() {
    return dispatch => {
        return getAllCategories()
          .then(({ categories }) => {
            dispatch(receiveCategories(categories))
        })
    }
}
