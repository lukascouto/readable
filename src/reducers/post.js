import { RECEIVE_POST, ADD_POST } from '../actions/post'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST :
			return action.post
		case ADD_POST :
			return {
				...state,
				[action.post.id]: action.post
			}
		default :
			return state
	}
}
