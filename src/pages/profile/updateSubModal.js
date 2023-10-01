import { Modal } from 'antd'
import PaymentInfo from '../authPage/components/paymentInfo'
import { useNavigate } from 'react-router-dom'

const UpdateSubModal = () => {
	const navigator = useNavigate()
	const loggedInUser = JSON.parse(localStorage.getItem('user'))

	return (
		<Modal open={true} closable={true} title={<div>Update Payment Method</div>} footer={false} onCancel={() => navigator(-1)}>
			<div className='flex flex-col justify-center items-center px-6 py-2 h-full w-full overflow-y-clip content-center bg-secondaryBackground'>
				<PaymentInfo userEmail={loggedInUser?.email} action={'update'} />
			</div>
		</Modal>
	)
}

export default UpdateSubModal
