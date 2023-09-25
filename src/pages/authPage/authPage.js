import { AlertBanner, Form } from '@components'
import Image from '../../assets/drive-assets/erol-ahmed-FTy5VSGIfiQ-unsplash (1).jpg'
import { useParams } from 'react-router-dom'
import { authFormSchema } from './helpers/authFormSchemas'
import { Button } from 'antd'
import { userAtom } from '../../recoil/atoms'
import { authSelector } from '../../recoil/selectors'
import { AUTH_EVENTS, useAuth } from '@auth'
import { useEffect, useState } from 'react'
import PaymentInfo from './components/paymentInfo'
import AuthIcon from '../../assets/images/Logomark.png'
const Auth = (props) => {
	const { action } = useParams()
	const [form] = Form.useForm()
	const [success, setSuccess] = useState(false)
	const [alert, setAlert] = useState({ type: '', message: '' })
	const [dispatch, loading, signupComplete, userId, clientSecret] = useAuth({
		reroute: '/home',
		userAtom: userAtom,
		authSelector: authSelector,
		setAlert,
	})

	useEffect(() => {
		setAlert({ type: '', message: '' })
	}, [])

	return (
		<div className=' min-h-screen max-h-[110vh] flex'>
			<div className='w-[50%] h-full hidden sm:block rounded-[0_80px_0px_0]'>
				<img className='w-full h-full object-cover' src={Image} alt='' />
			</div>
			<div className=' sm:w-[50%] max-[640px]:w-full h-full flex flex-col justify-center items-center'>
				{action === 'signup' && signupComplete && clientSecret ? (
					<div className='flex flex-col justify-center items-center mt-16'>
						<div className='flex flex-col items-center w-[300px] mx-auto'>
							<div className='w-14 h-14 mx-auto'>
								<img className='w-14 h-14 object-contain' src={AuthIcon} alt='' />
							</div>

							<p className={`text-[#101828] font-[600] text-[30px] leading-[38px] ${action === 'login' ? 'pb-3' : 'pb-3'} text-center`}>
								{success ? 'Subscription Successful' : 'Create an account'}
							</p>
							<p className={`text-[#6d6e78] text-start font-[400] text-[0.75rem] leading-[1.45rem] ${action === 'login' ? 'pb-3' : 'pb-2'} text-center`}>
								{success
									? 'Your subscription is now active! Enjoy your 30-day trial. You can cancel your subscription anytime.'
									: `Please Enter Payment Details to start your 1 month free trial. You will be charged a yearly fee of $204 AUD ( $17 AUD/Month ) after your trial ends.`}
							</p>
						</div>
						<PaymentInfo success={success} setSuccess={setSuccess} userId={userId} clientSecret={clientSecret} />
					</div>
				) : (
					<Form
						key='AuthForm'
						layout='vertical'
						className='w-3/4 md:w-[55%] overflow-y-scroll mt-32'
						form={form}
						onFinish={(values) =>
							dispatch({
								type: action === 'login' ? AUTH_EVENTS.LOGIN : action === 'signup' ? AUTH_EVENTS.SIGNUP : AUTH_EVENTS.RESET_PASSWORD,
								payload: values,
							})
						}
					>
						<div className='w-14 h-14 mx-auto mb-6'>
							<img className='w-14 h-14 object-contain' src={AuthIcon} alt='' />
						</div>
						<p className={`text-[#101828] font-[600] text-[30px] leading-[38px] ${action === 'login' ? 'pb-3' : 'pb-8'} text-center`}>
							{action === 'signup' ? 'Create an account' : action === 'forgotPassword' ? 'Reset Password' : 'Log in to your account'}
						</p>
						{action === 'login' ? (
							<p className='text-[#475467] font-[400] text-[16px] leading-6 pb-8 text-center'>Welcome back! Please enter your details.</p>
						) : null}
						{alert.type !== '' && AlertBanner(alert, setAlert)}
						{Form.renderSchema(authFormSchema(action))}
						{action === 'login' ? (
							<div className='flex flex-row justify-between items-center'>
								{Form.renderFormItem({
									key: 'remember',
									type: 'checkbox',
									name: ['remember'],
									label: 'Remember for 30 days',
								})}
								<a href='/auth/forgotPassword' className='text-[#6941C6] font-[600]'>
									Forgot Password
								</a>
							</div>
						) : null}
						{action === 'signup' ? <p className='text-[#475467] text-sm font-[400]'>Must be at least 8 characters.</p> : null}
						<div className='w-full pt-4 text-center'>
							<Form.Item>
								<Button className='btn-primary' htmlType='submit' disabled={loading} loading={loading} block>
									{loading ? 'Please Wait' : action === 'login' ? 'Login' : action === 'signup' ? 'Sign Up' : 'Send Reset Pasword Link'}
								</Button>
							</Form.Item>
						</div>

						<p className='text-sm font-[400] text-[#475467] text-center'>
							{action === 'login' ? "Don't have an account ? " : action === 'forgotPassword' ? 'Try logging in ? ' : 'Already have an account ? '}
							<a href={action === 'signup' ? '/auth/login' : action === 'forgotPassword' ? '/auth/login' : '/auth/signup'} className='text-[#6941C6] font-[600]'>
								{action === 'signup' ? 'Log in' : action === 'forgotPassword' ? 'Log in' : 'Sign Up'}
							</a>
						</p>
					</Form>
				)}
			</div>
		</div>
	)
}

export default Auth
