import { RECEIVE_POSTS, ADD_POST, VOTE_POST, EDIT_POST, REMOVE_POST } from '../actions/posts'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS :
			return action.posts
		case ADD_POST :
			return {
				...state,
				[action.post.id]: action.post
			}
		case VOTE_POST :
			return state.map((post) => post.id !== action.post.id ? post :
				Object.assign({}, post,
					action.option === undefined ?
						action.post :
						action.option === 'upVote' ? { voteScore: post.voteScore+1 } :
						{ voteScore: post.voteScore-1 }
					))
		case EDIT_POST :
			return state.map((post) => post.id !== action.post.id ? post :
				Object.assign({}, post, { title: action.body.title, body: action.body.body }))
		case REMOVE_POST :
			return state.filter((post) => post.id !== action.id)
		default :
			return state
	}
}
