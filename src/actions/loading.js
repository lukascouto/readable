export const LOADING = 'LOADING'

function loading (option) {
	return {
		type: LOADING,
		option,
	}
}

export function handleLoading (option) {
	return (dispatch) => {
		dispatch(loading(option))
	}
}
