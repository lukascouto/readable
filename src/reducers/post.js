import { RECEIVE_POST } from '../actions/post'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST :
			return {
				...state,
				...action.post
			}
		default :
			return state
	}
}
