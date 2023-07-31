const { mdiMinusCircleOutline, mdiPlusCircleOutline } = require('@mdi/js')
const { default: Icon } = require('@mdi/react')

const Stepper = ({ value, onChange }) => {
	return (
		<div className='flex flex-row items-center'>
			<Icon
				path={mdiMinusCircleOutline}
				size={0.9}
				className='text-[#333333] hover:cursor-pointer'
				onClick={() => onChange(value ? (parseInt(value) > 0 ? parseInt(value) - 1 : parseInt(value)).toString() : '0')}
			/>
			<p className='text-[16px] font-[600] text-[#333333] px-4'>{value}</p>
			<Icon
				path={mdiPlusCircleOutline}
				size={0.9}
				className='text-[#333333]  hover:cursor-pointer'
				onClick={() => onChange(value ? (parseInt(value) + 1).toString() : '1')}
			/>
		</div>
	)
}

export default Stepper
