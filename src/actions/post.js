import { getPost, createPost } from '../utils/api'

export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'RECEIVE_POST'

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function handleAddPost (title, body, author, category, id) {
  return (dispatch) => {
    return createPost({
      id: generateUID(),
      timestamp: Date.now(),
			title,
      body,
      author,
			category
    })
      .then(post => {
        dispatch(addPost(post))
      })
  }
}

function receivePost (post) {
	return {
		type: RECEIVE_POST,
		post,
	}
}

export function handleGetPost (id) {
	return dispatch => {
		return getPost(id)
			.then(post => {
				dispatch(receivePost(post))
		})
	}
}
