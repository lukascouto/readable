import { OPTION_POST, ORDER_POST } from '../actions/filter'

export default function posts (state = {}, action) {
	switch (action.type) {
    case OPTION_POST :
      return {
        ...state,
        option: action.option
      }
    case ORDER_POST :
      return {
        ...state,
        order: action.order
      }
		default :
			return state
	}
}
