import { LOADING } from '../actions/loading'

export default function loading (state = {}, action) {
	switch (action.type) {
    case LOADING :
      return {
        loading: action.option
      }
		default :
			return state
	}
}
