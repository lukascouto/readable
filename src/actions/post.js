import { getPost } from '../utils/api'

export const RECEIVE_POST = 'RECEIVE_POST'

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
