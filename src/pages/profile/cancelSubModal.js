import { userAtom } from '@atoms'
import { mdiCancel } from '@mdi/js'
import Icon from '@mdi/react'
import { Button, Modal, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import { endpoints } from '../../helpers/enums'
import { useState } from 'react'

const CancelSubModal = () => {
	const navigator = useNavigate()
	const [loading, setLoading] = useState(false)
	const setUserAtom = useSetRecoilState(userAtom)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))

	const handleSubmit = () => {
		setLoading(true)
		fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['cancel-subscription']}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ email: loggedInUser?.email }),
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					notification.success({
						message: 'Subscription Cancellation Successful',
						description: 'Your subscription has been cancelled.',
					})
					console.log('Subscription Cancelled Successfully', data)
					setUserAtom({ ...data?.updatedUser })
					localStorage.setItem('user', JSON.stringify({ ...data?.updatedUser, id: data?.updatedUser?._id }))
					setLoading(false)
					navigator(-1)
				})
			} else {
				console.log('Subscription Cancallation Failed', response)
				notification.error({ message: 'Error', description: 'Uable to Cancel Subscription. Please try again later.' })
				setLoading(false)
			}
		})
	}
	return (
		<Modal
			open={true}
			closable={false}
			title={<div>Cancel Subscription</div>}
			footer={
				<div className='flex justify-end'>
					<Button loading={loading} onClick={() => navigator(-1)} className='btn-secondary mr-2'>
						CANCEL
					</Button>
					<Button loading={loading} onClick={handleSubmit} className='btn-primary'>
						CONFIRM
					</Button>
				</div>
			}
		>
			<div className='flex flex-col justify-center items-center px-6 py-2 h-full w-full overflow-y-auto content-center bg-secondaryBackground'>
				<div className='flex flex-col items-center bg-white rounded-lg px-5 py-5'>
					<div className='flex justify-center items-center h-24 w-24 bg-red-200 rounded-full mb-6'>
						<Icon path={mdiCancel} size={2} color={'#c63d3d'} />
					</div>
					<div className='text-sm font-medium text-black-300 mb-3 text-center'>Are you sure you want to cancel your subscription?</div>
				</div>
			</div>
		</Modal>
	)
}

export default CancelSubModal
