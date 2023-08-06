import { Button, Modal, Radio } from 'antd'
import NoImage from '../../../assets/images/icon-no-image.svg'
import { mdiMapMarkerOutline } from '@mdi/js'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import Icon from '@mdi/react'
import Form from '../../../components/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const PropertyRadioCard = ({ properties, onChange, value }) => {
	return (
		<Radio.Group>
			{properties?.map((listing, index) => (
				<Radio key={`radio-swapPropertyId-${index}`} value={listing?.property?._id} onChange={(e) => onChange(listing?.property?._id)}>
					<div
						className={`flex flex-row py-4 w-full px-4 rounded-lg border border-solid border-[#dedede] hover:cursor-pointer`}
						// onClick={() => navigator(`/listing/${listing.property._id}`)}
					>
						<img
							src={listing?.property.pictures[0] && !listing?.property.pictures[0].includes('example.com') ? listing.property.pictures[0] : NoImage}
							alt=''
							className='h-[142px] w-[210px] rounded-lg object-cover'
						/>
						<div className='flex flex-col px-6 w-fit space-y-4 items-start justify-start mt-4'>
							<p className='text-[#333333] text-[24px] leading-[24px] font-[700] break-normal'>{listing?.property.title || listing?.property.description}</p>
							<div className='flex flex-row items-center space-x-4'>
								<div className='flex flex-row space-x-2 items-center'>
									<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBedroom.icon} alt={'bedrooms'} />
									<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
										{listing?.property.noOfBedroom}&nbsp;{parseInt(listing?.property.noOfBedroom) > 1 ? 'Bedrooms' : 'Bedroom'}
									</p>
								</div>
								<div className='flex flex-row space-x-2 items-center'>
									<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBathroom.icon} alt={'bathrooms'} />
									<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
										{listing?.property.noOfBathroom}&nbsp;{parseInt(listing?.property.noOfBathroom) > 1 ? 'Bathrooms' : 'Bathroom'}
									</p>
								</div>
								<div className='flex flex-row space-x-2 items-center'>
									<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfSleep.icon} alt={'sleep'} />
									<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
										{listing?.property.noOfSleep}&nbsp;{parseInt(listing?.property.noOfSleep) > 1 ? 'Beds' : 'Bed'}
									</p>
								</div>
							</div>
							<div className='flex flex-row items-center space-x-4'>
								<div className='flex flex-row space-x-2 items-center'>
									<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#333333]' />
									{listing?.location && <p className='text-[#333333] font-[700] text-sm leading-[16.1px]'>{listing?.location.city}</p>}
								</div>
							</div>
						</div>
					</div>
				</Radio>
			))}
		</Radio.Group>
	)
}
const PropertySelectionModal = ({ visible, setVisible, properties, sendRequest }) => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	return (
		<Modal
			closable={false}
			open={visible}
			onCancel={() => setVisible(false)}
			width={700}
			footer={
				<div className='w-full items-center justify-end flex flex-row' key='footer'>
					{[
						{ type: 'cancel', className: 'btn-delete', title: 'CANCEL', onClick: () => setVisible(false) },
						{
							type: 'submit',
							className: 'btn-primary',
							title: 'SUBMIT REQUEST',
							onClick: () => {
								setLoading(true)
								sendRequest().then(() => {
									setLoading(false)
									setVisible(false)
								})
							},
						},
					]?.map((button, index) => {
						return (
							<Button id={button?.type} className={button?.className} style={{ height: 40 }} onClick={button?.onClick} key={'button-' + index} loading={loading}>
								{button?.title}
							</Button>
						)
					})}
				</div>
			}
		>
			<div className='flex flex-col '>
				<p className='text-center font-bold text-[#333333] text-[30px] py-4'>Choose Property to Swap with</p>
				<div className='flex flex-col space-y-4'>
					<Form.Item
						name={['swapPropertyId']}
						key={'swapPropertyId'}
						rules={[{ required: true, message: 'Please select a property' }]}
						initialValue={properties?.[0]?.property?._id}
					>
						<PropertyRadioCard properties={properties} />
					</Form.Item>
				</div>
			</div>
		</Modal>
	)
}

export default PropertySelectionModal
