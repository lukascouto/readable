import { RECEIVE_POSTS, ADD_POST, VOTE_POST, EDIT_POST, REMOVE_POST } from '../actions/posts'
import { ADD_COMMENT, REMOVE_COMMENT } from '../actions/comments'

export default function posts (state = {}, action) {
	switch (action.type) {
		case RECEIVE_POSTS :
			const manipulado = action.posts.reduce((novoObjeto, item) => {
			novoObjeto[item.id] = item;
			return novoObjeto;
			}, {})
			return manipulado
		case ADD_POST :
			return {
				...state,
				[action.post.id]: action.post
			}
		case VOTE_POST :
			return {
        ...state,
        [action.post.id]: {
          ...state[action.post.id],
					...action.option === 'upVote' ?
						{ voteScore: action.post.voteScore+1 } : { voteScore: action.post.voteScore-1 }
        }
      }
		case EDIT_POST :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.id = {
						title: action.body.title,
						body: action.body.body
					}
				}
			}
		case REMOVE_POST :
			return {
				...state,
				[action.id]: {
					...state[action.id],
					...action.id = {
						deleted: true
					}
				}
			}
		case ADD_COMMENT :
			return {
				...state,
				[action.comment.parentId]: {
					...state[action.comment.parentId],
					commentCount: state[action.comment.parentId].commentCount + 1
				}
			}
		case REMOVE_COMMENT :
			return {
				...state,
				[action.comment.parentId]: {
					...state[action.comment.parentId],
					commentCount: state[action.comment.parentId].commentCount - 1
				}
			}
		default :
			return state
	}
}
