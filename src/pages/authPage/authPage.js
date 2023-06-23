import { AlertBanner, Form } from '@components'
import { useParams } from 'react-router-dom'
import { authFormSchema } from './helpers/authFormSchemas'
import { Button } from 'antd'
import { userAtom } from '../../recoil/atoms'
import { authSelector } from '../../recoil/selectors'
import { AUTH_EVENTS, useAuth } from '@auth'
import { useState } from 'react'
const Auth = (props) => {
	const { action } = useParams()
	const [form] = Form.useForm()
	const [alert, setAlert] = useState({ type: '', message: '' })
	const [dispatch, loading] = useAuth({ reroute: '/home', userAtom: userAtom, authSelector: authSelector, setAlert })

	return (
		<div className='h-screen flex'>
			<div className="w-[55%] h-full bg-cover bg-center bg-[url('/Users/adilaslam/Documents/personal/cityswap/src/assets/images/hand-house.jpg')] hidden sm:block rounded-[0_80px_0px_0]"></div>
			<div className='w-full sm:w-[45%] h-full flex flex-col justify-center items-center'>
				<Form
					key='AuthForm'
					layout='vertical'
					className='w-3/4 md:w-[55%]'
					form={form}
					onFinish={(values) =>
						dispatch({
							type: action === 'login' ? AUTH_EVENTS.LOGIN : action === 'signup' ? AUTH_EVENTS.SIGNUP : AUTH_EVENTS.RESET_PASSWORD,
							payload: values,
						})
					}
				>
					<div className='w-14 h-14 bg-center bg-contain mx-auto mb-6 bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/Logomark.png")]' />
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
			</div>
		</div>
	)
}

export default Auth
