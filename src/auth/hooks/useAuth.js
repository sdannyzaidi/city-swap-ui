import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useEffect } from 'react'

import { useLazyFetch } from '@graphql/index'
import { firebase } from '@auth/index'
import graphqQLSchemas from '@helpers/graphQLSchemas'
const useAuth = ({ setLoading = () => {}, setAuthorized, setAlert, userAtom, authSelector, reroute }) => {
	const setUserAtom = useSetRecoilState(userAtom)
	const [authenticateUser, loading] = useLazyFetch({ schema: graphqQLSchemas.User, storageKey: 'user' })
	const userAuth = useRecoilValue(authSelector())
	const navigate = useNavigate()
	const { action } = useParams()
	const { pathname } = useLocation()

	useEffect(() => {
		if (!loading && userAuth) {
			if (userAuth?.user === 'no user') {
				setAlert({
					type: 'error',
					message: 'No user record for this email address.',
				})
				setLoading(false)
				localStorage.setItem('user', JSON.stringify(null))
			} else if (userAuth?.authorized === false) {
				setLoading(false)
				setAuthorized(false)
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

	const signInWithEmailAndPassword = async (email, password) => {
		const userCredential = await firebase.auth.signInWithEmailAndPassword(email, password)
		if (userCredential) {
			const token = await firebase.auth.currentUser?.getIdToken()
			localStorage.setItem('token', JSON.stringify({ token }))
			authenticateUser({ variables: { _id: userCredential?.user?.uid } })
		}
	}

	const resetPassword = async (email) => {
		await firebase.auth.sendPasswordResetEmail(email)
		setLoading(false)
		return 'success'
	}

	const logout = () => {
		if (userAuth) {
			firebase.auth.signOut()
			localStorage.setItem('user', JSON.stringify(null))
			localStorage.setItem('token', JSON.stringify(null))
			window.location.href = '/'
		}
	}

	const authorization = async (forgotPassword, email, password) => {
		setLoading(true)
		try {
			if (!forgotPassword) {
				await signInWithEmailAndPassword(email, password)
			} else {
				const result = await resetPassword(email)
				if (result === 'success') {
					setAlert({
						type: 'success',
						message: 'Reset link has been sent to your email.',
					})
				}
			}
		} catch (error) {
			setLoading(false)
			if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
				setAlert({
					type: 'error',
					message: 'Email address or password is incorrect.',
				})
			} else if (error.code === 'auth/user-not-found') {
				setAlert({
					type: 'error',
					message: 'No user record for this email address.',
				})
			} else {
				setAlert({
					type: 'error',
					message: 'Please check your internet connection.',
				})
			}
		}
	}

	return { authorization, logout }
}

export default useAuth
