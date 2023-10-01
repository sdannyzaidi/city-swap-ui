import { endpoints } from '../../../helpers/enums'

export const useGenerateOTP = () => {
	const generateOTPFunction = async (props) => {
		const {
			setOtp,
			values: { email },
		} = props
		return await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['generate-otp']}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({ email: email }),
		})
			.catch((e) => {
				console.log(e)
				return {
					type: 'error',
				}
			})
			.then((response) => {
				if (response.type !== 'error') {
					response.json().then((data) => {
						console.log({ OTP: data?.otp })
						setOtp(data?.otp)
					})
					return {
						type: 'success',
						message: `OTP Sent Successfully`,
						description: `OTP has been sent to your email. Please check your email.`,
					}
				} else {
					return {
						type: 'error',
						message: `Error`,
						description: `OTP could not be sent to your email. Please try again later.`,
					}
				}
			})
	}
	return [generateOTPFunction]
}

export const useValidateOTP = () => {
	const validateOTPFunction = async (props) => {
		const {
			backendOTP,
			values: { otp },
		} = props
		const inputOTP = otp?.join('')
		if (inputOTP?.toString().length > 0) {
			if (inputOTP?.toString().length < 6) {
				return {
					type: 'error',
					message: 'Error',
					description: 'Your OTP length should not be less than 6.',
				}
			} else if (inputOTP?.toString() === backendOTP?.toString()) {
				return {
					type: 'success',
					message: 'Success',
					description: 'OTP validated successfully',
				}
			} else {
				return {
					type: 'error',
					message: 'Error',
					description: 'OTP is not valid',
				}
			}
		} else {
			return {
				type: 'error',
				message: 'Error',
				description: 'Please enter OTP',
			}
		}
	}
	return [validateOTPFunction]
}
