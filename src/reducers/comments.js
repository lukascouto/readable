import { RECEIVE_COMMENTS, ADD_COMMENT, VOTE_COMMENT, EDIT_COMMENT, REMOVE_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS :
			const manipulado = action.comments.reduce((novoObjeto, item) => {
			novoObjeto[item.id] = item;
			return novoObjeto;
			}, {})
			return manipulado
		case ADD_COMMENT :
			console.log('State: ')
			return {
				...state,
				[action.comment.id]: action.comment,
				[action.posts]: {
					...state[action.comment.parentId],
					...action.posts.id = {
						commentCount: action.posts.commentCount+1
					}
				}


			}
		case VOTE_COMMENT :
			return {
				...state,
				[action.comment.id]: {
					...state[action.comment.id],
					...action.option === 'upVote' ?
						{ voteScore: action.comment.voteScore+1 } : { voteScore: action.comment.voteScore-1 }
				}
			}
		case EDIT_COMMENT :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.id = {
						timestamp: action.body.timestamp,
						body: action.body.body
					}
				}
			}
		case REMOVE_COMMENT :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.id = {
						deleted: true
					}
				}
			}
		default :
			return state
	}
}
