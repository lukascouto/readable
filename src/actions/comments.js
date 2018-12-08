import { getComments, createComment, deleteComment } from '../utils/api'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

function receiveComments (comments) {
  return {
      type: RECEIVE_COMMENTS,
      comments,
  }
}

export function handleGetComments (id) {
	return dispatch => {
		return getComments(id)
			.then(comments => {
				dispatch(receiveComments(comments))
		})
	}
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

function generateUID () {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function handleAddComment (text, author, post) {
  return (dispatch) => {
    return createComment({
      id: generateUID(),
      timestamp: Date.now(),
      body: text,
      author: author,
      parentId: post.id
    })
      .then(comment => {
        dispatch(addComment(comment))
      })
  }
}

function removeComment (id) {
  return {
      type: REMOVE_COMMENT,
      id,
  }
}

export function handleDeleteComment (comment) {
	return (dispatch) => {
    // Atualização Otimista
    // Passa impressão que o item foi atualizado instantaneamente
    // Primeiro remove o item da UI
    dispatch(removeComment(comment.id))
    // Em seguida tenta remover do banco de dados chamando a API
		return deleteComment(comment.id)
      // Se houver erro para remover no banco de dados
      // O item é adicionado novamente à UI
      .catch(() => {
        dispatch(addComment(comment))
        alert('Ocorreu um erro. Tente Novamente.')
      })
	}
}
