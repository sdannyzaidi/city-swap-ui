import { Form } from '@components'
import { useEffect, useState } from 'react'
import { authFormSchema } from '../helpers/authFormSchemas'
import { InputOTP } from 'antd-input-otp'
import { notification } from 'antd'
import { useGenerateOTP } from '../helpers/signupFinishHooks'
import { preferenceFormSchema } from '../helpers/preferenceFormSchema'

export const BasicSignupInfo = () => {
	return (
		<div className='flex flex-col lg:w-[600px] items-start'>
			<div className='font-semibold text-[24px] mb-8'>Basic Information</div>
			<div className='w-[75%]'>{Form.renderSchema(authFormSchema('signup'))}</div>
		</div>
	)
}

export const OtpVerification = ({ form, setPromiseLoading, setOtp, formValues, otp }) => {
	const [minutes, setMinutes] = useState(1)
	const [seconds, setSeconds] = useState(0)
	const [finishFunction] = useGenerateOTP()

	useEffect(() => {
		setMinutes(1)
		setSeconds(0)
	}, [otp])

	const handleFinish = () => {
		Promise.resolve()
			.then(async () => {
				setPromiseLoading(true)
				return await finishFunction({ values: { email: formValues?.email }, setOtp })
					.then((response) => response)
					.catch((e) => {
						console.log(e)
						return { type: 'error', message: 'Error', description: e.message }
					})
			})
			.then(async (queryresult) => {
				console.log({ queryresult })
				if (queryresult?.type) {
					notification[queryresult?.type]({
						message: queryresult.message,
						description: queryresult.description,
						duration: '5',
					})
				}
				setPromiseLoading(false)
			})
			.catch((e) => {
				console.log(e)
			})
	}
	useEffect(() => {
		const interval = setInterval(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1)
			}

			if (seconds === 0) {
				if (minutes === 0) {
					clearInterval(interval)
				} else {
					setSeconds(59)
					setMinutes(minutes - 1)
				}
			}
		}, 1000)

		return () => {
			clearInterval(interval)
		}
	}, [seconds])

	useEffect(() => {
		console.log({ form: form.getFieldsValue() })
	}, [form])
	return (
		<div className='flex flex-col items-start'>
			<div className='font-semibold text-[24px] mb-8'>Email Verification</div>
			<div className='w-[70%] mb-8 font-normal text-base'>A 6-digit code is sent to your email. Kindly enter that code here to activate your account. </div>
			<Form.Item
				name='otp'
				rules={[
					{
						required: true,
						validator: (_, value = '') => {
							if (value?.toString().length > 0) {
								if (value?.toString().length < 6) {
									return Promise.reject(new Error(`Your OTP length should not be less than 6.`))
								} else {
									return Promise.resolve()
								}
							} else {
								return Promise.reject(new Error('Please input your OTP!'))
							}
						},
					},
				]}
			>
				<InputOTP inputType='numeric' />
			</Form.Item>
			<div className='text-[#000000] font-medium text-base'>
				<span onClick={handleFinish} className={` ${seconds > 0 || minutes > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#A07BE5] cursor-pointer'}`}>
					Resend
				</span>{' '}
				confirmation code {'('}
				{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				{')'}
			</div>
		</div>
	)
}

export const PreferenceSignupInfo = ({ termsAndConditions }) => {
	return (
		<div className='flex flex-col lg:w-[600px] items-start'>
			<div className='font-semibold text-[24px] mb-8'>Preferences</div>
			<div className='w-[75%]'>{Form.renderSchema(preferenceFormSchema())}</div>
			{termsAndConditions !== true && (
				<div className='text-[#F52D2D] font-normal text-[10px]'>You must agree to City Swapp's Terms & Conditions and Privacy Policy in order to signup.</div>
			)}
		</div>
	)
}
