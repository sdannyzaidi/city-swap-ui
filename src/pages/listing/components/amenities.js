import { Switch } from 'antd'
import { AmenitiesEnums } from '../../newListing/helpers/enums'
import { Form } from '@components'

const Amenities = ({ listing, editable }) => {
	const amenities = Object.values(AmenitiesEnums)

	return (
		<div className='flex flex-col lg:pl-44  lg:pr-96 md:px-12 max-md:px-8'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Amenities</p>
			{editable ? (
				<div className='flex flex-col py-6 space-y-4'>
					{Object.values(AmenitiesEnums).map((item, index) => (
						<div className='flex flex-row justify-between items-center w-full  pr-2'>
							<div className='flex flex-row items-center'>
								<img style={{ width: '24px', height: '24px' }} src={item.icon} alt={item.label} />
								<p className='text-[#333333] font-[600] text-[16px] pl-4'>{item.label}</p>
							</div>
							<Form.Item name={['amenities', `${item.value}`]} noStyle shouldUpdate={true}>
								<Switch />
							</Form.Item>
						</div>
					))}
				</div>
			) : (
				<div className='grid sm:grid-cols-3 max-md:grid-cols-2 sm:gap-y-8 max-md:gap-y-8'>
					{amenities.map((amenity, index) => {
						return (
							<div key={index} className='flex flex-row items-center'>
								<img src={amenity.icon} alt={amenity.label} className='sm:w-[40px] sm:h-[40px] max-md:w-[24px] max-md:h-[24px]' />
								<p className='text-[#595959] font-[500] sm:text-lg max-md:text-sm md:pl-4 max-md:pl-2'>{amenity.label}</p>
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default Amenities
