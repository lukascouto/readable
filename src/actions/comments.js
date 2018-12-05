import { getComments, createComment } from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function handleAddComment (text, author, id) {
  return (dispatch) => {
    return createComment({
      id: generateUID(),
      timestamp: Date.now(),
      body: text,
      author: author,
      parentId: id
    })
      .then(comment => {
        dispatch(addComment(comment))
      })
  }
}

function receiveComments (comments) {
  return {
      type: RECEIVE_COMMENTS,
      comments,
  }
}

export function handleGetComments (id) {
	return dispatch => {
		return getComments(id)
			.then(comments => {
				dispatch(receiveComments(comments))
		})
	}
}
