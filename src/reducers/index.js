import { combineReducers } from 'redux'
import posts from './posts'
import categories from './categories'
import comments from './comments'
import filter from './filter'
import loading from './loading'
import { loadingBarReducer } from 'react-redux-loading-bar'

export default combineReducers({
	posts,
	comments,
	categories,
	filter,
	loadingBar: loadingBarReducer,
	loading,
})
