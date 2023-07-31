import { mdiChat, mdiChatOutline, mdiDeleteOutline, mdiMapMarkerOutline, mdiSquareEditOutline, mdiSwapHorizontal } from '@mdi/js'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import NoImage from '../../../assets/images/icon-no-image.svg'

import Icon from '@mdi/react'
import { Button } from 'antd'

const RequestCard = ({ listing, index }) => {
	return (
		<div
			className={`flex flex-col py-4 w-full px-4 rounded-lg border border-solid border-[#dedede] hover:cursor-pointer`}
			// onClick={() => navigator(`/listing/${listing.property._id}`)}
		>
			<div
				className={`flex flex-row py-4 w-full px-4 `}
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
			<div className='flex flex-row py-2 mx-4 justify-center items-center rounded-lg bg-[#F5F3FF]'>
				<Icon path={mdiSwapHorizontal} size={0.8} className='text-[#333333]' />
				<p className='text-[#333333] font-[500] text-sm'>Swap</p>
			</div>
			<div
				className={`flex flex-row py-4 w-full px-4 `}
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
			<div className='flex flex-row w-full items-end justify-end space-x-6 py-2 mr-6'>
				<Button className='btn-primary flex flex-row items-center'>Accept</Button>
				<Button className='btn-secondary flex flex-row items-center !px-2.5'>
					<Icon size={0.8} path={mdiChatOutline} />
				</Button>

				<Button className='btn-delete flex flex-row items-center'>Decline</Button>
			</div>
		</div>
	)
}

export default RequestCard
