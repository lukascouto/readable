import { RECEIVE_POST } from '../actions/post'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POST :
			return action.post
		default :
			return state
	}
}
