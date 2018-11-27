import { RECEIVE_COMMENTS } from '../actions/comments'

export default function comments (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS :
			return {
				...state,
				...action.comments
			}
		default :
			return state
	}
}
