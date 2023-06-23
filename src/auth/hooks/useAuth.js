import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'

import { notification } from 'antd'
import { AUTH_EVENTS } from '../helpers/enums'
const useAuth = ({ reroute, userAtom, authSelector, alert, setAlert }) => {
	const setUserAtom = useSetRecoilState(userAtom)
	const userAuth = useRecoilValue(authSelector())
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const { action } = useParams()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!loading && userAuth) {
			console.log({ userAuth })
			if (userAuth?.user === 'no user') {
				setAlert({
					type: 'error',
					message: 'No user record for this email address.',
				})
				setLoading(false)
				localStorage.setItem('user', JSON.stringify(null))
			} else if (userAuth?.authorized === false) {
				setLoading(false)
				setUserAtom(null)
				localStorage.setItem('user', JSON.stringify(null))
			} else if (userAuth?.authorized === true && pathname.includes('auth') && action === 'login') {
				setLoading(false)
				const redirectTo = sessionStorage.getItem('redirectTo')
				sessionStorage.setItem('redirectTo', JSON.stringify(null))
				navigate(redirectTo || reroute || '/', { replace: true })
			}
		}
	}, [userAuth, loading]) // eslint-disable-line

	const signInWithEmailAndPassword = async ({ email, password }) => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ email, password }),
		})
		console.log(response)
		try {
			if (response.status === 200) {
				const result = await response.json()
				if (result.user) {
					const token = result.token
					localStorage.setItem('user', JSON.stringify(result.user))
					localStorage.setItem('token', JSON.stringify({ token }))
				}
			} else {
				setAlert({
					type: 'error',
					message: 'Email address or password is incorrect.',
				})
			}
			setLoading(false)
		} catch (err) {
			console.log(err)
			setLoading(false)
		}
	}

	const resetPassword = async (email) => {
		// await firebase.auth.sendPasswordResetEmail(email)
		return 'success'
	}
	const signUp = async (values) => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/signUp`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ name: values.name, email: values.email, password: values.password }),
		})
		if (response.status === 200) {
			notification['success']({
				message: 'User created successfully',
				duration: 5,
				onClick: () => {
					notification.close()
				},
			})
			navigate('/auth/login')
			setLoading(false)
		} else {
			console.log(response)
			setAlert({
				type: 'error',
				message: 'Email address or password is incorrect.',
			})
			setLoading(false)
		}
	}
	const logout = () => {
		if (userAuth) {
			// firebase.auth.signOut()
			// localStorage.setItem('user', JSON.stringify(null))
			// localStorage.setItem('token', JSON.stringify(null))
			// window.location.href = '/'
		}
	}
	const dispatch = useCallback((event) => {
		setLoading(true)
		try {
			switch (event.type) {
				case AUTH_EVENTS.LOGIN:
					signInWithEmailAndPassword(event.payload)
					break
				case AUTH_EVENTS.SIGNUP:
					signUp(event.payload)
					break
				case AUTH_EVENTS.LOGOUT:
					logout()
					break
				case AUTH_EVENTS.RESET_PASSWORD:
					resetPassword(event.payload)
					break
				default:
					break
			}
		} catch (err) {
			console.log(err)
		}
	})

	return [dispatch, loading]
}

export default useAuth
