import { Button } from 'antd'

const RadioButtonGroup = ({ options, value, onChange }) => {
	return (
		<div className='flex flex-row items-center sm:space-x-6 max-md:space-x-4'>
			{options.map((option, index) => {
				return (
					<Button
						key={`listingoption-${index}`}
						onClick={() => onChange(option.value)}
						className={`btn-radio ${option.value === value ? 'btn-radio-selected' : 'btn-radio-unselected'}`}
					>
						<div className='radio-option  mr-2'>
							<div className='radio-option-inner'></div>
						</div>
						{option.short && <p className='max-md:block sm:hidden'>{option.short}</p>}
						<p className='max-md:hidden sm:block'>{option.label}</p>
					</Button>
				)
			})}
		</div>
	)
}

export default RadioButtonGroup
