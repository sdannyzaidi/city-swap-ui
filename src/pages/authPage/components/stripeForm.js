import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Form, Loader } from '@components'
import { endpoints } from '../../../helpers/enums'
import { useCallback, useState } from 'react'
import { Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import { userAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'
const StripeForm = ({ success, setSuccess = false, userEmail, action }) => {
	const navigator = useNavigate()
	const stripe = useStripe()
	const elements = useElements()
	const setUserAtom = useSetRecoilState(userAtom)
	const [loading, setLoading] = useState(false)

	const handleSubmit = useCallback(async (e) => {
		if (!elements || !stripe) {
			return
		}

		setLoading(true)
		const CardNumberElement = elements.getElement('cardNumber')

		await stripe
			.createToken(CardNumberElement)
			.then((result) => {
				if (result.error) {
					console.log(result.error.message)
					notification.error({
						message: 'Error',
						description: `${action === 'update' ? 'Payment method updation has failed.' : 'Unable to subscribe and proceed further.'} Please try again later.`,
					})
					setLoading(false)
				} else {
					console.log('Successful Payment', result)
					fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints[action === 'update' ? 'change-default-payment-method' : 'create-subscription']}`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json;charset=utf-8' },
						body: JSON.stringify({ email: userEmail, token: result?.token, ...(action !== 'update' ? { renew: false } : {}) }),
					}).then((response) => {
						if (response.status === 200) {
							response.json().then((data) => {
								notification.success({
									message: `${action === 'update' ? 'Updation' : 'Subscription'} Successful`,
									description:
										action === 'update'
											? 'Your payment method has been updated sucessfully.'
											: 'Your subscription is now active! Enjoy your 30-day trial. You can cancel your subscription anytime.',
								})
								console.log('Successfully sent data Payment', data)
								setUserAtom({ ...data?.updatedUser })
								localStorage.setItem('user', JSON.stringify({ ...data?.updatedUser, id: data?.updatedUser?._id }))
								setSuccess && setSuccess(true)
								setLoading(false)
								if (action === 'update') {
									navigator(-1)
								}
							})
						} else {
							console.log('Successfully sent data Payment', response)
							notification.error({
								message: 'Error',
								description: `${action === 'update' ? 'Payment method updation has failed.' : 'Unable to subscribe and proceed further.'} Please try again later.`,
							})
							setSuccess && setSuccess(false)
							setLoading(false)
						}
					})
				}
			})
			.catch((error) => {
				console.log('promise', error)
				notification.error({
					message: 'Error',
					description: `${action === 'update' ? 'Payment method updation has failed.' : 'Unable to subscribe and proceed further.'} Please try again later.`,
				})
				setLoading(false)
			})
	}, [])
	return (
		<div className='flex flex-col lg:w-[80%]'>
			{success ? (
				<>
					<Button onClick={() => navigator('/home/about')} className='btn-primary !h-[50px] !w-full mt-8'>
						Go to Home
					</Button>
				</>
			) : (
				<Form onFinish={handleSubmit}>
					{!stripe || !elements ? (
						<div className='my-auto align-middle'>
							<Loader />
						</div>
					) : (
						<div className='flex flex-col w-full py-2 mx-auto'>
							<div>
								<div className='font-bold text-sm text-[#222222] mb-2'>Card Number:</div>
								<CardNumberElement className='w-full rounded py-3 px-4 font-medium text-base bg-[#F6F7F9] mb-4' />
							</div>
							<div className='flex flex-row justify-between !w-full'>
								<div className='w-[47%]'>
									<div className='font-bold text-sm text-[#222222] mb-2'>Exp Date:</div>
									<CardExpiryElement className='rounded py-3 px-4 font-medium text-base bg-[#F6F7F9]' />
								</div>
								<div className='w-[47%]'>
									<div className='font-bold text-sm text-[#222222] mb-2'>CVC:</div>
									<CardCvcElement className='rounded py-3 px-4 font-medium text-base bg-[#F6F7F9]' />
								</div>
							</div>
						</div>
					)}
					<Button htmlType='submit' loading={loading} className='btn-primary !h-[50px] !w-full my-8'>
						{action === 'update' ? 'Update' : 'Subscribe'}
					</Button>
					<div className='text-center text-xs font-normal'>All the payments are powered by Stripe.</div>
				</Form>
			)}
		</div>
	)
}
export default StripeForm
