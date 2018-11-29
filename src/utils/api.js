const api = "http://localhost:3001"

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getAllCategories = () =>
   fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))

export function getAllPosts (category = undefined) {
	if (category !== undefined)
		return fetch(`${api}/${category}/posts`, { headers }).then(res =>
			res.json(),
		);
	return fetch(`${api}/posts`, { headers }).then(res => res.json());
}

export const getPost = (id) =>
   fetch(`${api}/posts/${id}`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))


export const getComments = (id) =>
   fetch(`${api}/posts/${id}/comments`, { headers })
    .then(res => res.json())
    .catch(error => console.log(error))
