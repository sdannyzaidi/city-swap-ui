import { useParams } from 'react-router-dom'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import { Form } from '@components'
import Stepper from '../../newListing/components/stepper'
import Switch from '../../newListing/components/switch'

const PropertyDetails = ({ listing }) => {
	const { action } = useParams()

	return (
		<div className='flex flex-col sm:pr-36 sm:basis-2/3 max-sm:basis-full'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Description</p>
			{action === 'edit' ? (
				<div className='mb-6  min-h-[100px]'>
					{Form.renderFormItem({
						type: 'input',
						inputType: 'textArea',
						rows: 5,
						elementClassName: 'text-lg font-[400] text-[#00000064]',
						name: 'description',
						rules: [{ required: true, message: 'Please enter a title' }],
					})}
				</div>
			) : (
				<p className='text-lg font-[400] text-[#00000064]  sm:min-h-[100px] '>{listing?.property.description}</p>
			)}

			{action !== 'edit' ? (
				<div className='flex flex-row items-center space-x-6 pt-6 max-sm:w-full'>
					<div className='flex flex-row space-x-2 items-center'>
						<img style={{ width: '24px', height: '24px' }} src={BedroomSizeEnums.noOfBedroom.icon} alt={'bedrooms'} />
						<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
							{listing?.property.noOfBedroom}&nbsp;{parseInt(listing?.property.noOfBedroom) > 1 ? 'Bedrooms' : 'Bedroom'}
						</p>
					</div>
					<div className='flex flex-row space-x-2 items-center'>
						<img style={{ width: '24px', height: '24px' }} src={BedroomSizeEnums.noOfBathroom.icon} alt={'bathrooms'} />
						<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
							{listing?.property.noOfBathroom}&nbsp;{parseInt(listing?.property.noOfBathroom) > 1 ? 'Bathrooms' : 'Bathroom'}
						</p>
					</div>
				</div>
			) : (
				<div className='flex flex-col py-6 space-y-4 w-full'>
					{Object.values(BedroomSizeEnums).map((item, index) => (
						<div className='flex flex-row justify-between items-center w-full'>
							<div className='flex flex-row items-center'>
								<img style={{ width: '24px', height: '24px' }} src={item.icon} alt={item.label} />
								<p className='text-[#333333] font-[600] text-[16px] pl-4'>{item.label}</p>
							</div>
							{console.log(['size', `${item.value}`])}
							<Form.Item name={['size', `${item.value}`]} noStyle shouldUpdate={true}>
								<Stepper />
							</Form.Item>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default PropertyDetails
