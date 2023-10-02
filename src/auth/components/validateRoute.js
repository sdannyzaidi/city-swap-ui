import { Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const ValidatedRoute = (props) => {
	const { redirect } = props
	const userData = JSON.parse(localStorage.getItem('user'))
	const [loading, setLoading] = useState(true)
	const [paymentMethodId, setPaymentMethodId] = useState(null)

	const fetchUserData = async () => {
		setLoading(true)
		await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/email/${userData?.email}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((response) => {
				if (response.status === 200) {
					response.json().then((data) => {
						localStorage.setItem('user', JSON.stringify({ ...data, id: data._id }))
						setPaymentMethodId(data?.paymentMethodId)
					})
				}
			})
			.catch((err) => {
				console.log({ err })
			})
		setLoading(false)
	}

	useEffect(() => {
		fetchUserData()
	}, []) //eslint-disable-line

	return paymentMethodId ? <>{props.children}</> : loading ? <div>LOADING...</div> : <Navigate to={redirect} replace />
}

export default ValidatedRoute
