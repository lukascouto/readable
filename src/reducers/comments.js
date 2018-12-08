import { RECEIVE_COMMENTS, ADD_COMMENT, REMOVE_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS :
			return action.comments
		case ADD_COMMENT :
			return state.concat([action.comment])
		case REMOVE_COMMENT :
			return state.filter((comment) => comment.id !== action.id)
		default :
			return state
	}
}
