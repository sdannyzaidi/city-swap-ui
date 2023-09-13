import { useState } from 'react'

const useUpdateUser = () => {
	const [loading, setLoading] = useState(false)
	const user = JSON.parse(localStorage.getItem('user'))
	const updateUser = async (values) => {
		setLoading(true)

		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/update`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ id: user._id, ...values }),
		})
		// console.log({ response })
		setLoading(false)
		return response
	}

	return [updateUser, loading]
}

export default useUpdateUser
