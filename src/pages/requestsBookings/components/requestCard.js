import { mdiChatOutline, mdiCheckCircleOutline, mdiClockOutline, mdiCloseCircleOutline, mdiMapMarkerOutline, mdiSwapHorizontal } from '@mdi/js'
import { BedroomSizeEnums } from '../../newListing/helpers/enums'
import NoImage from '../../../assets/images/icon-no-image.svg'

import Icon from '@mdi/react'
import { Button, notification } from 'antd'
import ReviewCard from './reviewCard'
import { useCallback, useState } from 'react'
import { endpoints } from '../../../helpers/enums'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { requestsAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'

const RequestCard = ({ request, type, index }) => {
	const [loading, setLoading] = useState(false)
	const navigator = useNavigate()
	const requestListing = request?.requestedProperty
	const ownListing = request?.ownProperty
	const setRequests = useSetRecoilState(requestsAtom)
	const changeListingStatus = useCallback(
		(status) => {
			setLoading(true)
			fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['mark-request-status'](request._id)}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ status }),
			})
				.then((response) =>
					response
						.json()
						.then((data) => {
							setLoading(false)

							if (response.status === 200) {
								if (type === 'received') {
									setRequests((prev) => ({
										...prev,
										receivedRequests: prev.receivedRequests.map((req) =>
											req._id === request._id ? { ...req, status: status === 'Accept' ? 'Successful' : 'Rejected' } : req
										),
									}))
								}
								notification['success']({
									message: 'Property Updated successfully',
									duration: 5,
									onClick: () => {
										notification.close()
									},
								})
								navigator(-1)
							} else {
								// console.log(response)
								notification['error']({
									message: 'Property updation failed',
									duration: 5,
									onClick: () => {
										notification.close()
									},
								})
							}
							// console.log({ data })
						})
						.catch((err) => {
							console.log({ err })
							setLoading(false)
						})
				)
				.catch((err) => {
					console.log({ err })
					setLoading(false)
				})
		},
		[request._id] // eslint-disable-line
	)

	return (
		<div
			className={`flex flex-col py-4 w-full px-4 rounded-lg border border-solid border-[#dedede] hover:cursor-pointer`}
			// onClick={() => navigator(`/requestListing/${requestListing.propertyDetail._id}`)}
		>
			<p className='text-[#333333] font-[500] text-sm mx-4 pt-2 pb-4'>
				{type === 'received' ? request.reqUser?.name || 'Some Guy ' : 'You '} requested to {request?.requestType}{' '}
				{type === 'received' ? 'your' : `${requestListing?.propertyDetail?.user?.name || 'Some Guy'}'s `} property {requestListing?.propertyDetail?.title}{' '}
				from&nbsp;
				<span className='font-bold'>{dayjs(request.requestDates?.[0]?.startDate).format('ddd, MMM DD YYYY')}</span> to&nbsp;
				<span className='font-bold'>{dayjs(request.requestDates?.[0]?.endDate).format('ddd, MMM DD YYYY')}</span>
			</p>

			<div
				className={`flex flex-row py-2 mx-4 justify-center items-center rounded-lg ${
					request.status === 'Pending' ? 'bg-[#e0e4ea]' : request.status === 'Successful' ? 'bg-[#f2fef2]' : 'bg-[#FEF3F2]'
				}`}
			>
				<Icon
					path={request.status === 'Pending' ? mdiClockOutline : request.status === 'Successful' ? mdiCheckCircleOutline : mdiCloseCircleOutline}
					size={0.8}
					className='text-[#333333]'
				/>
				<p className='text-[#333333] font-[500] text-sm pl-2'>
					{request.status === 'Pending' ? 'Pending' : request.status === 'Successful' ? 'Accepted' : 'Rejected'}
				</p>
			</div>
			<div className={request.requestType === 'swap' ? 'sm:rounded-lg sm:border sm:border-solid border-[#dedede] sm:p-3 sm:mt-4 sm:mx-4' : ''}>
				<div
					className={`flex md:flex-row max-md:flex-col py-4 w-full px-4 `}
					// onClick={() => navigator(`/requestListing/${requestListing.propertyDetail._id}`)}
				>
					<img
						src={
							requestListing?.propertyDetail.pictures[0] && !requestListing?.propertyDetail?.pictures[0].includes('example.com')
								? requestListing?.propertyDetail?.pictures[0]
								: NoImage
						}
						alt=''
						className='sm:h-[142px] sm:w-[210px] max-md:w-full max-md:h-auto rounded-lg object-cover'
					/>
					<div className='flex flex-col md:px-6 w-fit space-y-4 items-start justify-start mt-4'>
						<p className='text-[#333333] text-[24px] leading-[24px] font-[700] break-normal'>
							{requestListing?.propertyDetail.title || requestListing?.propertyDetail.description}
						</p>
						<div className='flex flex-wrap items-center  '>
							<div className='flex flex-row space-x-2 pr-2 pb-2 items-center leading-7'>
								<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBedroom.icon} alt={'bedrooms'} />
								<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
									{requestListing?.propertyDetail.noOfBedroom}&nbsp;{parseInt(requestListing?.propertyDetail.noOfBedroom) > 1 ? 'Bedrooms' : 'Bedroom'}
								</p>
							</div>
							<div className='flex flex-row space-x-2  pr-2 pb-2  items-center'>
								<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBathroom.icon} alt={'bathrooms'} />
								<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
									{requestListing?.propertyDetail.noOfBathroom}&nbsp;{parseInt(requestListing?.propertyDetail.noOfBathroom) > 1 ? 'Bathrooms' : 'Bathroom'}
								</p>
							</div>
							<div className='flex flex-row space-x-2  pr-2 pb-2  items-center'>
								<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfSleep.icon} alt={'sleep'} />
								<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
									{requestListing?.propertyDetail.noOfSleep}&nbsp;{parseInt(requestListing?.propertyDetail.noOfSleep) > 1 ? 'Beds' : 'Bed'}
								</p>
							</div>
						</div>
						<div className='flex flex-row items-center space-x-4'>
							<div className='flex flex-row space-x-2 items-center'>
								<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#333333]' />
								{requestListing?.location && <p className='text-[#333333] font-[700] text-sm leading-[16.1px]'>{requestListing?.location?.[0]?.city}</p>}
							</div>
						</div>
					</div>
				</div>
				{request?.requestType === 'swap' ? (
					<>
						<div className='flex flex-row py-2 mx-4 justify-center items-center rounded-lg bg-[#F5F3FF]'>
							<Icon path={mdiSwapHorizontal} size={0.8} className='text-[#333333]' />
							<p className='text-[#333333] font-[500] text-sm'>Swap</p>
						</div>
						<div
							className={`flex md:flex-row max-md:flex-col py-4 w-full px-4 `}
							// onClick={() => navigator(`/listing/${listing.propertyDetail._id}`)}
						>
							<img
								src={
									ownListing?.propertyDetail.pictures[0] && !ownListing?.propertyDetail.pictures[0].includes('example.com')
										? ownListing.propertyDetail.pictures[0]
										: NoImage
								}
								alt=''
								className='sm:h-[142px] sm:w-[210px] max-md:w-full max-md:h-auto rounded-lg object-cover'
							/>
							<div className='flex flex-col md:px-6 w-fit space-y-4 items-start justify-start mt-4'>
								<p className='text-[#333333] text-[24px] leading-[24px] font-[700] break-normal'>
									{ownListing?.propertyDetail.title || ownListing?.propertyDetail.description}
								</p>
								<div className='flex flex-wrap items-center'>
									<div className='flex flex-row space-x-2 pr-2 pb-2 items-center'>
										<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBedroom.icon} alt={'bedrooms'} />
										<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
											{ownListing?.propertyDetail.noOfBedroom}&nbsp;{parseInt(ownListing?.propertyDetail.noOfBedroom) > 1 ? 'Bedrooms' : 'Bedroom'}
										</p>
									</div>
									<div className='flex flex-row space-x-2 pr-2 pb-2 items-center'>
										<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBathroom.icon} alt={'bathrooms'} />
										<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
											{ownListing?.propertyDetail.noOfBathroom}&nbsp;{parseInt(ownListing?.propertyDetail.noOfBathroom) > 1 ? 'Bathrooms' : 'Bathroom'}
										</p>
									</div>
									<div className='flex flex-row space-x-2 pr-2 pb-2 items-center'>
										<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfSleep.icon} alt={'sleep'} />
										<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
											{ownListing?.propertyDetail.noOfSleep}&nbsp;{parseInt(ownListing?.propertyDetail.noOfSleep) > 1 ? 'Beds' : 'Bed'}
										</p>
									</div>
								</div>
								<div className='flex flex-row items-center space-x-4'>
									<div className='flex flex-row space-x-2 items-center'>
										<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#333333]' />
										{ownListing?.location && <p className='text-[#333333] font-[700] text-sm leading-[16.1px]'>{ownListing?.location?.[0]?.city}</p>}
									</div>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
			{type === 'received' ? (
				request.status === 'Pending' ? (
					<div className='flex flex-row w-full items-end justify-end space-x-6 py-2 mr-6'>
						<Button className='btn-primary flex flex-row items-center' loading={loading} onClick={() => changeListingStatus('Accept')}>
							Accept
						</Button>
						<Button
							className='btn-secondary flex flex-row items-center !px-2.5'
							onClick={() => navigator(`/chat/${request?.reqUser?._id}/${true}`, { state: { user: request?.reqUser } })}
						>
							<Icon size={0.8} path={mdiChatOutline} />
						</Button>

						<Button className='btn-delete flex flex-row items-center' loading={loading} onClick={() => changeListingStatus('Reject')}>
							Decline
						</Button>
					</div>
				) : null
			) : request.status === 'Successful' ? (
				<ReviewCard request={request} />
			) : null}
		</div>
	)
}

export default RequestCard
