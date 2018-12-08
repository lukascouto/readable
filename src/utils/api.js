const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = '123456789'
  //token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// Busca todas as categorias
export const getAllCategories = () =>
   fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))

// Busca todos os posts ou todos os posts de uma categoria
export function getAllPosts (category = undefined) {
	if (category !== undefined)
		return fetch(`${api}/${category}/posts`, { headers }).then(res =>
			res.json(),
		);
	return fetch(`${api}/posts`, { headers }).then(res => res.json());
}

// Busca apenas um post pelo id passado
export const getPost = (id) =>
   fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))

// Cadastra um novo post
export const createPost = (body) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(error => console.log(error))

// Cria um novo voto para um post
export const createVotePost = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(option)
  })
    .then(res => res.json())
    .catch(error => console.log(error))

// Busca todos os comentários de um post
export const getComments = (id) =>
   fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))

// Cria um novo comentário para um post
export const createComment = (body) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .catch(error => console.log(error))

// Remove um comentário
export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(error => console.log(error))
