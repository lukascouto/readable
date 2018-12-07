import { RECEIVE_POSTS, VOTE_POST } from '../actions/posts'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS :
			return action.posts
		case VOTE_POST :
				return action.post
		default :
			return state
	}
}
