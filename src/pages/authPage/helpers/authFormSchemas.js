export const authFormSchema = (action) => {
	return [
		action === 'signup' && {
			type: 'input',
			label: 'Name',
			name: 'name',
			placeholder: 'Enter your Name',
			required: true,
			message: 'Name is required.',
		},
		{
			type: 'input',
			label: 'Email',
			name: 'email',
			inputType: 'email',
			placeholder: 'Enter your email',
			required: true,
			message: 'Email is required.',
		},
		action !== 'forgotPassword' && {
			type: 'password',
			label: 'Password',
			name: 'password',
			itemClassName: '!mb-2',
			inputType: 'password',
			placeholder: 'Enter your password',
			required: true,
			message: 'Password is required.',
		},
	]
}
