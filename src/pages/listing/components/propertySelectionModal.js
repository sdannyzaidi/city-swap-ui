import { Button, Modal, Radio } from 'antd'
import NoImage from '../../../assets/images/icon-no-image.svg'
import { mdiMapMarkerOutline } from '@mdi/js'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import Icon from '@mdi/react'
import Form from '../../../components/form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkRangeOverlap } from '../../newListing/components/multiRangePicker'
import dayjs from 'dayjs'
import { useRecoilValue } from 'recoil'
import { suggestedListingsSelector } from '../helpers/selectors'
const PropertyRadioCard = ({ properties, onChange, value }) => {
	return (
		<div className='pl-4 w-full rounded-lg border border-solid border-[#dedede] hover:cursor-pointer'>
			<Radio.Group>
				{properties?.map((listing, index) => (
					<Radio key={`radio-swapPropertyId-${index}`} className='w-full' value={listing?.property?._id} onChange={(e) => onChange(listing?.property?._id)}>
						<div
							className={`flex flex-row py-4 w-full px-4`}
							// onClick={() => navigator(`/listing/${listing.property._id}`)}
						>
							<img
								src={listing?.property.pictures[0] && !listing?.property.pictures[0].includes('example.com') ? listing.property.pictures[0] : NoImage}
								alt=''
								className='h-[142px] w-[210px] rounded-lg object-cover'
							/>
							<div className='flex flex-col px-6 w-fit space-y-4 items-start justify-start mt-4'>
								<p className='text-[#333333] text-[24px] leading-[24px] font-[700] break-normal pb-4'>{listing?.property.title || listing?.property.description}</p>
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
									{/* <div className='flex flex-row space-x-2 items-center'>
									<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfSleep.icon} alt={'sleep'} />
									<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
										{listing?.property.noOfSleep}&nbsp;{parseInt(listing?.property.noOfSleep) > 1 ? 'Beds' : 'Bed'}
									</p>
								</div> */}
								</div>
								<div className='flex flex-row items-center space-x-4'>
									<div className='flex flex-row space-x-2 items-center'>
										<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#333333]' />
										{listing?.location && (
											<p className='text-[#333333] font-[700] text-sm leading-[16.1px]'>
												{listing?.location.city},&nbsp;{listing?.location.country}
											</p>
										)}
									</div>
								</div>
							</div>
						</div>
					</Radio>
				))}
			</Radio.Group>
		</div>
	)
}
const PropertySelectionModal = ({ visible, setVisible, properties, otherProperty, sendRequest }) => {
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const searchDate = JSON.parse(localStorage.getItem('searchDate'))
	const listingType = JSON.parse(localStorage.getItem('searchType'))
	const id = JSON.parse(localStorage.getItem('user'))?.id
	const location = JSON.parse(localStorage.getItem('location'))
	const suggestedProperties = useRecoilValue(suggestedListingsSelector({ id, dateRange: searchDate, location }))
	return (
		<Modal
			closable={false}
			open={visible}
			onCancel={() => setVisible(false)}
			width={
				(properties?.length < 0 &&
					(otherProperty?.asscocitedListings || otherProperty?.associatedListings)
						?.find((listing) => listing?.listingType === 'sublease')
						?.availableDates?.some((range) => checkRangeOverlap([range.startDate, range.endDate], searchDate))) ||
				listingType === 'sublease'
					? 500
					: 700
			}
			footer={
				<div className='w-full items-center justify-end flex flex-row' key='footer'>
					{[
						{ type: 'cancel', className: 'btn-delete', title: 'CANCEL', onClick: () => setVisible(false) },
						{
							type: 'submit',
							className: 'btn-primary',
							title:
								properties?.length < 0 &&
								(otherProperty?.asscocitedListings || otherProperty?.associatedListings)
									?.find((listing) => listing?.listingType === 'sublease')
									?.availableDates?.some((range) => checkRangeOverlap([range.startDate, range.endDate], searchDate))
									? 'SUBMIT SUB-LEASE REQUEST'
									: listingType === 'sublease'
									? 'SUBMIT SUB-LEASE REQUEST'
									: 'SUBMIT SWAP REQUEST',
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
			{listingType === 'swap' ? (
				properties?.length > 0 ? (
					<div className='flex flex-col '>
						<p className='text-center font-bold text-[#333333] text-[30px] py-4'>Choose Property to Swap with</p>
						<div className='flex flex-col space-y-4 w-full'>
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
				) : (otherProperty?.asscocitedListings || otherProperty?.associatedListings)
						?.find((listing) => listing?.listingType === 'sublease')
						?.availableDates?.some((range) => checkRangeOverlap([range.startDate, range.endDate], searchDate)) ? (
					<div className='flex flex-col '>
						<p className='text-center font-bold text-[#333333] text-[24px] py-4'>No Swappable Property Found</p>
						<p className='text-start font-[400] text-[#666666] text-base py-12 px-12'>
							This property is available for sub-lease on the selected dates:
							<p className='pt-4 text-[#333333] font-semibold'>
								{` ${dayjs(searchDate?.[0])?.format('MMM DD')} to ${dayjs(searchDate?.[1])?.format('MMM DD, YYYY')} `}
							</p>
						</p>
						{/* <p className='text-start font-[500] text-[#333333] text-xl py-2 px-16'>Sub-lease instead ? </p> */}
					</div>
				) : (
					<div className='flex flex-col '>
						<p className='text-center font-bold text-[#333333] text-[24px] py-4'>No Swappable Property Found</p>
						<p className='text-start font-[400] text-[#666666] text-base py-12 px-12'>
							This property is not available for sub-lease on the selected dates:
							<p className='pt-4 text-[#333333] font-semibold'>
								{` ${dayjs(searchDate?.[0])?.format('MMM DD')} to ${dayjs(searchDate?.[1])?.format('MMM DD, YYYY')} `}
							</p>
						</p>
						<p className='text-start font-[400] text-[#666666] text-base py-12 px-12'>Other Suggested Properties for Sub-Lease:</p>
						<div className='flex flex-col space-y-4 w-full'>
							<Form.Item
								name={['subleasePropertyId']}
								key={'subleasePropertyId'}
								rules={[{ required: true, message: 'Please select a property' }]}
								initialValue={suggestedProperties?.[0]?.property?._id}
							>
								<PropertyRadioCard properties={suggestedProperties} />
							</Form.Item>
						</div>
					</div>
				)
			) : (
				<div className='flex flex-col '>
					<p className='text-center font-bold text-[#333333] text-[24px] py-4'>Sub Lease Property</p>
					<p className='text-start font-[400] text-[#666666] text-base py-12 px-12'>
						This property is available for sub-lease on the selected dates:
						<p className='pt-4 text-[#333333] font-semibold'>
							{` ${dayjs(searchDate?.[0])?.format('MMM DD')} to ${dayjs(searchDate?.[1])?.format('MMM DD, YYYY')} `}
						</p>
					</p>
					{/* <p className='text-start font-[500] text-[#333333] text-xl py-2 px-16'>Sub-lease instead ? </p> */}
				</div>
			)}
		</Modal>
	)
}

export default PropertySelectionModal
