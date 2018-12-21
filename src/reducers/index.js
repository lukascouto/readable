import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import filter from './filter'

export default combineReducers({
	posts,
	comments,
	categories,
	filter,
})
