export const OPTION_POST = 'OPTION_POST'
export const ORDER_POST = 'ORDER_POST'

function optionPost (option) {
	return {
		type: OPTION_POST,
		option,
	}
}

function orderPost (order) {
	return {
		type: ORDER_POST,
		order,
	}
}

export function handleOptionPost (option) {
	return (dispatch) => {
		dispatch(optionPost(option))
	}
}

export function handleOrderPost (order) {
	return (dispatch) => {
		dispatch(orderPost(order))
	}
}
