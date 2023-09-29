import {
	CardNumberElement,
	CardCvcElement,
	CardExpiryElement,
	useStripe,
	useElements,
	PaymentElement,
	CardElement,
	AuBankAccountElement,
} from '@stripe/react-stripe-js'
import { Form, Loader } from '@components'
import { endpoints } from '../../../helpers/enums'
import { useCallback, useEffect, useState } from 'react'
import { Button, Card } from 'antd'
import { useNavigate } from 'react-router-dom'
const StripeForm = ({ userId, success, setSuccess }) => {
	const navigator = useNavigate()
	const stripe = useStripe()
	const elements = useElements()

	const [loading, setLoading] = useState(false)

	const handleSubmit = useCallback(async (e) => {
		if (!elements || !stripe) {
			return
		}

		setLoading(true)
		const CardNumberElement = elements.getElement('cardNumber')
		const CardExpiryElement = elements.getElement('cardExpiry')
		const CardCvcElement = elements.getElement('cardCvc')

		console.log({ CardNumberElement })
		await stripe
			.createToken({
				card: {
					number: CardNumberElement.value,
				},
			})
			.then((result) => {
				if (result.error) {
					console.log(result.error.message)
					setLoading(false)
				} else {
					console.log({ result })
					// if (result.paymentIntent?.status === 'succeeded') {
					// 	console.log('Successful Payment', result)
					// 	const { id, amount } = result.paymentIntent
					// 	fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['confirm-transaction']}`, {
					// 		method: 'POST',
					// 		headers: { 'Content-Type': 'application/json;charset=utf-8' },
					// 		body: JSON.stringify({ paymentId: id, userId: userId, amount: amount.toString() }),
					// 	}).then((response) => {
					// 		if (response.status === 200) {
					// 			response.json().then((data) => {
					// 				console.log('Successfully sent data Payment', data)
					// 				setSuccess(true)
					// 				setLoading(false)
					// 			})
					// 		} else {
					// 			console.log('Successfully sent data Payment', response)
					// 			setSuccess(false)
					// 			setLoading(false)
					// 		}
					// 	})
					// }
					setLoading(false)
				}
			})
			.catch((error) => {
				console.log('promise', error)
				setLoading(false)
			})
	}, [])
	return (
		<div className='flex flex-col w-full'>
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
						<div className='w-full' id={'card-element'}>
							<CardNumberElement />
							<CardExpiryElement />
							<CardCvcElement />
						</div>
					)}
					<Button htmlType='submit' loading={loading} className='btn-primary !h-[50px] !w-full mt-8'>
						Pay
					</Button>
				</Form>
			)}
		</div>
	)
}
export default StripeForm
