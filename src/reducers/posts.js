import { RECEIVE_POSTS } from '../actions/posts'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS :
			return {
				...state,
				...action.posts
			}
		default :
			return state
	}
}
