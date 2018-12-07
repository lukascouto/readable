import { getAllPosts, createVotePost } from '../utils/api'

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

function votePost ({ post, id, option }) {
	return {
		type: VOTE_POST,
		post
	}
}

export function handleVotePost (id, option) {
	return (dispatch) => {
		return createVotePost({
				id,
				option
			})
			.then((post) => dispatch(votePost(post)))
	}
}
