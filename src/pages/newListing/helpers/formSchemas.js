import CountryEnum from '../../../helpers/countries'

export const LocationDetailsSchema = (country) => [
	{
		type: 'input',
		label: 'Title',
		required: true,
		message: 'Please enter a title',
		name: ['title'],
	},
	{
		type: 'input',
		inputType: 'textArea',
		lines: 5,
		label: 'Description',
		required: true,
		message: 'Please enter an description',
		name: ['description'],
	},

	{
		type: 'select',
		label: 'Country',
		required: true,
		message: 'Please select a country',
		placeholder: 'e.g. Australia',
		name: ['location', 'country'],
		valueProperty: 'value',
		showSearch: true,
		displayProperty: 'label',
		options: Object.keys(CountryEnum).map((country) => ({ label: country, value: country })),
	},
	{
		type: 'select',
		label: 'City',
		required: true,
		message: 'Please select a city',
		placeholder: 'e.g. Sydney',
		name: ['location', 'city'],
		valueProperty: 'value',
		showSearch: true,
		displayProperty: 'label',
		options: (
			CountryEnum[country]?.cities ||
			Object.values(CountryEnum)
				.map((country) => country.cities)
				.flat()
		).map((city) => ({
			label: city,
			value: city,
		})),
	},
	{
		type: 'input',
		label: 'Address',
		required: true,
		message: 'Please enter an address',
		name: ['location', 'address'],
	},
]
