import { useParams } from 'react-router-dom'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import { Form } from '@components'

const PropertyDetails = ({ listing }) => {
	const { action } = useParams()
	return (
		<div className='flex flex-col pr-36 basis-2/3'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Description</p>
			{action === 'edit' ? (
				<div className='mb-6  min-h-[100px]'>
					{Form.renderFormItem({
						type: 'input',
						inputType: 'textArea',
						rows: 5,
						elementClassName: 'text-lg font-[400] text-[#00000064]',
						initialValue: listing?.property.title || listing?.property.description,
						name: 'title',
						rules: [{ required: true, message: 'Please enter a title' }],
					})}
				</div>
			) : (
				<p className='text-lg font-[400] text-[#00000064]  min-h-[100px]'>{listing?.property.description}</p>
			)}

			<div className='flex flex-row items-center space-x-6 pt-6'>
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
		</div>
	)
}

export default PropertyDetails
