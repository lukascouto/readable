import { getAllPosts } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts (posts) {
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}

export function handleGetAllPosts (category) {
	return dispatch => {
		return getAllPosts(category)
			.then(posts => {
				dispatch(receivePosts(posts))
		})
	}
}
