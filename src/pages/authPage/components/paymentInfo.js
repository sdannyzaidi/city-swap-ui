import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeForm from './stripeForm'
const stripePromise = await loadStripe('pk_test_51NhLmaB3YKmZw9uMJTH8E3HmStFcV5rb7VorrBCNeZliRMKiXLuFbTJQZ1z3HEP7NWgyipdru10yb6eXT4IMyQbY00vjulAgfp')

const PaymentInfo = ({ success, setSuccess, userEmail, action }) => {
	return (
		<div className='relative flex flex-col items-center justify-center space-y-4 pt-2 pb-8 px-4 sm:w-[550px] max-md:w-full rounded-xl'>
			<Elements stripe={stripePromise}>
				<StripeForm success={success} setSuccess={setSuccess} userEmail={userEmail} action={action} />
			</Elements>
		</div>
	)
}

export default PaymentInfo
