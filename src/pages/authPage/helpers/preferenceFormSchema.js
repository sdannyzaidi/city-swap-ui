import CountryEnum from '../../../helpers/countries'

export const preferenceFormSchema = (action) => {
	return [
		{
			type: 'select',
			key: 'currentCity',
			name: ['currentCity'],
			label: 'Where do you live?',
			itemClassName: '!mb-2 !w-full',
			className: '!w-full',
			customWidth: true,
			placeholder: 'Select City',
			required: true,
			showSearch: true,
			message: 'Please enter an option',
			options: Object.values(CountryEnum)
				.map((country) => country.cities)
				.flat()
				.map((city) => ({
					label: city,
					value: city,
				})),
			displayProperty: 'label',
			valueProperty: 'value',
		},
		{
			type: 'select',
			key: 'destinationCity',
			name: ['destinationCity'],
			label: 'Where do you want to go?',
			itemClassName: '!mb-3 !w-full',
			className: '!w-full',
			customWidth: true,
			placeholder: 'Select City',
			required: true,
			showSearch: true,
			message: 'Please enter destintation city',
			options: Object.values(CountryEnum)
				.map((country) => country.cities)
				.flat()
				.map((city) => ({
					label: city,
					value: city,
				})),
			displayProperty: 'label',
			valueProperty: 'value',
		},
		{
			type: 'radioGroup',
			key: 'migratePermanently',
			name: ['migratePermanently'],
			label: 'Do you want to migrate permanently  to the country you wish to go?',
			itemClassName: '!mb-2 !w-full',
			className: '!w-full',
			customWidth: true,
			required: true,
			initialValue: false,
			message: 'Please select an option.',
			options: [
				{ key: true, long: 'Yes' },
				{ key: false, long: 'No' },
			],
		},
		{
			type: 'checkbox',
			key: 'receiveEmails',
			name: ['receiveEmails'],
			label: 'I agree to receive general emails and product offers from CitySwapp',
			elementClassName: 'text-[8px] font-normal',
			itemClassName: '!mb-0 !w-full',
			className: '!mb-0 !w-full',
			customWidth: true,
			required: true,
			initialValue: true,
		},
		{
			type: 'checkbox',
			key: 'termsAndConditions',
			name: ['termsAndConditions'],
			label: "I agree to City Swapp's Terms & Conditions and Privacy Policy.",
			elementClassName: 'text-[8px] font-normal',
			itemClassName: '!mb-0 !w-full',
			className: '!mb-0 !w-full',
			customWidth: true,
			required: true,
		},
	]
}
