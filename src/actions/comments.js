import { getComments, createComment, createVoteComment, updateComment, deleteComment } from '../utils/api'
import { generateUID } from '../utils/helpers'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const REMOVE_COMMENT = 'REMOVE_COMMENT'

function receiveComments (comments) {
  return {
    type: RECEIVE_COMMENTS,
    comments,
  }
}

function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

function addVote (comment, option) {
  return {
    type: VOTE_COMMENT,
    comment,
    option,
  }
}

function editComment (comment, body) {
  return {
    type: EDIT_COMMENT,
    comment,
    body
  }
}

function removeComment (id) {
  return {
    type: REMOVE_COMMENT,
    id,
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

export function handleAddComment (body, author, id) {
  return (dispatch) => {

    dispatch(showLoading())

    return createComment({
      id: generateUID(),
      timestamp: Date.now(),
      body: body,
      author: author,
      parentId: id
    })
      .then(comment => dispatch(addComment(comment)))
      .then(() => dispatch(hideLoading()))
  }
}


export function handleAddVote (comment, option) {
  return (dispatch) => {
    // Atualização otimista
    dispatch(addVote(comment, option))
    // Atualização API
    // Remover as chaves de option para verificar o funcionamento da atualização otimista
    return createVoteComment(comment.id, { option })
      .catch(() => {
        dispatch(addVote(comment))
        alert('Ocorreu um erro. Tente novamente.')
      })
  }
}

export function handleEditComment (comment, body) {
  return (dispatch) => {
    // Otimista
    dispatch(editComment(comment, { timestamp: Date.now(), body }))
    // API
    return updateComment(comment.id, { timestamp: Date.now(), body })
    // Retorna o comentário anterior ao erro
    .catch(() => {
      dispatch(addComment(comment))
      alert('Ocorreu um erro. Tente Novamente.')
    })
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
