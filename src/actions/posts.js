import { getAllPosts } from '../utils/api'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const VOTE_POST = 'VOTE_POST'

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

function votePost ({ id, option }) {
	return {
		type: VOTE_POST,
		id,
		option
	}
}

export function handleVoteComment (option) {
	return (dispatch) => {
		dispatch(votePost(option))
	}
}
