import { userAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'

const useFetchUser = () => {
    const setUserAtom = useSetRecoilState(userAtom)
    const fetchUser = async ({ email }) => {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}users/email/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
        })
        if (response.status === 200) {
            const user = await response.json()
            console.log({ newUser: user })
            if (user) {
                localStorage.setItem('user', JSON.stringify({ ...user, id: user._id }))
                setUserAtom(user)
            }
            return user
        }
    }
    return fetchUser
}

export default useFetchUser

