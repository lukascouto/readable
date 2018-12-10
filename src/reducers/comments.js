import { RECEIVE_COMMENTS, ADD_COMMENT, VOTE_COMMENT, REMOVE_COMMENT } from '../actions/comments'

export default function comments (state = {}, action) {
	switch (action.type) {
		case RECEIVE_COMMENTS :
			return action.comments
		case ADD_COMMENT :
			return state.concat([action.comment])
		case VOTE_COMMENT :
			// 1. Retorna todos os comentários diferentes do id passado
			// 2. Verifica se o voto foi upVote ou diferente (downVote) e atualiza o voteScore
			console.log(action.option)

			return state.map((comment) => comment.id !== action.comment.id ? comment :
        Object.assign({}, comment,
					action.option === undefined ?
						action.comment :
						action.option === 'upVote' ? { voteScore: comment.voteScore+1 } :
						{ voteScore: comment.voteScore-1 }
					))

		case REMOVE_COMMENT :
			return state.filter((comment) => comment.id !== action.id)
		default :
			return state
	}
}
