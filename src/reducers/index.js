import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
	posts,
	comments,
	categories,
	loadingBar: loadingBarReducer,
})
