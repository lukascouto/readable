import { getAllPosts, createPost, createVotePost, updatePost, deletePost } from '../utils/api'
import { generateUID } from '../utils/helpers'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import { handleLoading } from './loading'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const EDIT_POST = 'EDIT_POST'
export const REMOVE_POST = 'REMOVE_POST'

function receivePosts (posts) {
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}

function addPost (post) {
  return {
    type: ADD_POST,
    post,
  }
}

function addVote (post, option) {
  return {
    type: VOTE_POST,
    post,
    option,
  }
}

function editPost (id, body) {
  return {
    type: EDIT_POST,
    id,
    body
  }
}

function removePost (id) {
  return {
    type: REMOVE_POST,
    id,
  }
}

export function handleGetAllPosts (category) {
	return (dispatch) => {
		dispatch(handleLoading(true))
		return getAllPosts(category)
			.then(posts => {
				dispatch(receivePosts(posts))
				dispatch(handleLoading(false))
		})
	}
}

export function handleAddPost (title, body, author, category, id) {
  return (dispatch) => {
		dispatch(showLoading())
    return createPost({
      id: generateUID(),
      timestamp: Date.now(),
			title,
      body,
      author,
			category
    })
      .then(post => {
        dispatch(addPost(post))
				dispatch(hideLoading())
      })
  }
}

export function handleAddVote (post, option) {
  return (dispatch) => {
    // Atualização otimista
    dispatch(addVote(post, option))
    // Atualização API
    // Remover as chaves de option para verificar o funcionamento da atualização otimista
    return createVotePost(post.id, { option })
      .catch(() => {
        dispatch(addVote(post))
        alert('Ocorreu um erro. Tente novamente.')
      })

  }
}

export function handleEditPost (post, title, body) {
  return (dispatch) => {
		dispatch(showLoading())
    // Otimista
    dispatch(editPost(post.id, { title, body }))
    // API
    return updatePost(post.id, { title, body })
			.then(dispatch(hideLoading()))
    // Retorna o comentário anterior ao erro
    .catch(() => {
      dispatch(addPost(post))
      alert('Ocorreu um erro. Tente Novamente.')
    })
  }
}

export function handleDeletePost (post) {
	return (dispatch) => {
		dispatch(showLoading())
    // Atualização Otimista
    // Passa impressão que o item foi atualizado instantaneamente
    // Primeiro remove o item da UI
    dispatch(removePost(post.id))
    // Em seguida tenta remover do banco de dados chamando a API
		return deletePost(post.id)
			.then(dispatch(hideLoading()))
      // Se houver erro para remover no banco de dados
      // O item é adicionado novamente à UI
      .catch(() => {
        dispatch(addPost(post))
        alert('Ocorreu um erro. Tente Novamente.')
      })
	}
}
