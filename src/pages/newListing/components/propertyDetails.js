import { Form, RadioButtonGroup } from '@components'
import Stepper from '../components/stepper'
import Switch from '../components/switch'
import { AmenitiesEnums, BedroomSizeEnums } from '../helpers/enums'

const PropertyDetails = (props) => {
	return (
		<div className='flex flex-col w-full'>
			<p className='text-[#333333] font-[700] text-3xl'>List your property on CitySwapp</p>
			<div className='py-7 flex flex-row'>
				<Form.Item name={'listingType'} noStyle initialValue='swap'>
					<RadioButtonGroup
						options={[
							{ label: 'Available for Swap', short: 'Swap', value: 'swap' },
							{ label: 'Available for Sublease', short: 'Sub-lease', value: 'sublease' },
						]}
					/>
				</Form.Item>
			</div>
			<div className='flex flex-col w-full space-y-4'>
				<p className='text-[#333333] font-[600] text-2xl'>What size is your home?</p>
				<div className='flex flex-col py-6 space-y-4 w-full'>
					{Object.values(BedroomSizeEnums).map((item, index) => (
						<div className='flex flex-row justify-between items-center w-full'>
							<div className='flex flex-row items-center'>
								<img style={{ width: '24px', height: '24px' }} src={item.icon} alt={item.label} />
								<p className='text-[#333333] font-[600] text-[16px] pl-4'>{item.label}</p>
							</div>
							<Form.Item name={['size', `${item.value}`]} noStyle initialValue='0'>
								<Stepper />
							</Form.Item>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col py-7 w-full'>
				<p className='text-[#333333] font-[600] text-2xl'>Amenities?</p>
				<div className='flex flex-col py-6 space-y-4'>
					{Object.values(AmenitiesEnums).map((item, index) => (
						<div className='flex flex-row justify-between items-center w-full  pr-2'>
							<div className='flex flex-row items-center'>
								<img style={{ width: '24px', height: '24px' }} src={item.icon} alt={item.label} />
								<p className='text-[#333333] font-[600] text-[16px] pl-4'>{item.label}</p>
							</div>
							<Form.Item name={['amenities', `${item.value}`]} noStyle initialValue={false}>
								<Switch />
							</Form.Item>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default PropertyDetails
