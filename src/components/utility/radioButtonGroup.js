import { Button } from 'antd'

const RadioButtonGroup = ({ options, value, onChange }) => {
	return (
		<div className='flex flex-row items-center space-x-6'>
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
						<p>{option.label}</p>
					</Button>
				)
			})}
		</div>
	)
}

export default RadioButtonGroup
