import { getAllPosts, getPost, createPost, createVotePost } from '../utils/api'
import { generateUID } from '../utils/helpers'

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const RECEIVE_POST = 'RECEIVE_POST'
export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'

function receivePosts (posts) {
	return {
		type: RECEIVE_POSTS,
		posts,
	}
}

function receivePost (post) {
	return {
		type: RECEIVE_POST,
		post,
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

export function handleGetAllPosts (category) {
	return dispatch => {
		return getAllPosts(category)
			.then(posts => {
				dispatch(receivePosts(posts))
		})
	}
}

export function handleGetPost (id) {
	return dispatch => {
		return getPost(id)
			.then(post => {
				dispatch(receivePosts(post))
		})
	}
}

export function handleAddPost (title, body, author, category, id) {
  return (dispatch) => {
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
