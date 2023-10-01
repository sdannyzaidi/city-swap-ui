import { BasicSignupInfo, OtpVerification, PreferenceSignupInfo } from '../../pages/authPage/components/signupInfo'
import { useGenerateOTP, useValidateOTP } from '../../pages/authPage/helpers/signupFinishHooks'

export const AUTH_EVENTS = {
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	SIGNUP: 'SIGNUP',
	RESET_PASSWORD: 'RESET_PASSWORD',
}

export const SignupFlowEnum = {
	pages: [
		{
			title: 'Basic Information',
			watchField: 'all',
			useFinishFunction: useGenerateOTP,
			columns: [{ widthClassName: 'max-lg:[55%]', element: BasicSignupInfo }],
			buttons: [{ type: 'submit', title: 'NEXT', className: 'btn-primary' }],
		},
		{
			title: 'Email Verification',
			watchField: 'all',
			width: 'w-full',
			useFinishFunction: useValidateOTP,
			columns: [{ widthClassName: 'w-full', element: OtpVerification }],
			buttons: [{ type: 'submit', title: 'NEXT', className: 'btn-primary' }],
		},
		{
			title: 'Create an Account',
			watchField: 'all',
			width: 'w-full',
			checkButtonDisable: ({ termsAndConditions }) => {
				return !termsAndConditions
			},
			columns: [{ widthClassName: 'w-full', element: PreferenceSignupInfo }],
			buttons: [{ type: 'dispatch', title: 'SIGNUP', className: 'btn-primary' }],
		},
	],
}
