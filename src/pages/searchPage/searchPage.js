import { Loader } from '@components'
import NoImage from '../../assets/images/icon-no-image.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { listingsAtom } from '@atoms'
import Icon from '@mdi/react'
import { mdiFolderSearchOutline, mdiMapMarkerOutline } from '@mdi/js'
import { BedroomSizeEnums } from '../newListing/helpers/enums'

const SearchPage = () => {
	const location = useLocation()
	const navigator = useNavigate()
	const [data, setData] = useRecoilState(listingsAtom)
	const [loading, setLoading] = useState(false)
	const fetchData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}propertyInfo/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			console.log({ data })
			setData(data)
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
	}, [])
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<>
			<div className='min-h-[70vh] w-[981px] py-8 h-fit bg-white mx-auto'>
				<p className='text-[#333333] font-[700] text-lg pb-6'>Search Results</p>
				{data && data?.length > 0 ? (
					<div className='flex flex-wrap'>
						{data.map((listing, index) => {
							return (
								<div
									className={`py-4 w-[311px] px-4 ${
										index !== 0 && index % 3 === 2 ? '' : 'mr-6'
									} mb-10 rounded-lg border border-solid border-[#dedede] hover:cursor-pointer`}
									onClick={() => navigator(`/listing/${listing.property._id}`)}
								>
									<img
										src={listing.property.pictures[0] && !listing.property.pictures[0].includes('example.com') ? listing.property.pictures[0] : NoImage}
										alt=''
										className='h-[306px] w-[279px] rounded-lg object-cover'
									/>
									<div className='py-4 '>
										<p className='text-[#333333] text-lg font-[700] break-normal'>{listing.property.description}</p>
										<div className='flex flex-row items-center space-x-4 py-4'>
											<div className='flex flex-row space-x-2 items-center'>
												<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBedroom.icon} alt={'bedrooms'} />
												<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
													{listing.property.noOfBedroom}&nbsp;{parseInt(listing.property.noOfBedroom) > 1 ? 'Bedrooms' : 'Bedroom'}
												</p>
											</div>
											<div className='flex flex-row space-x-2 items-center'>
												<img style={{ width: '16px', height: '16px' }} src={BedroomSizeEnums.noOfBathroom.icon} alt={'bathrooms'} />
												<p className='text-[#333333] font-[600] text-sm leading-[16.1px]'>
													{listing.property.noOfBathroom}&nbsp;{parseInt(listing.property.noOfBathroom) > 1 ? 'Bathrooms' : 'Bathroom'}
												</p>
											</div>
										</div>
										<div className='flex flex-row items-center space-x-4'>
											<div className='flex flex-row space-x-2 items-center'>
												<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#333333]' />
												{listing.location && <p className='text-[#333333] font-[700] text-sm leading-[16.1px]'>{listing.location.city}</p>}
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				) : loading ? (
					<div className='flex flex-col justify-center items-center h-full'>
						<div className='my-auto align-middle'>
							<Loader />
						</div>
					</div>
				) : (
					<div className='flex flex-col justify-center items-center h-full py-10'>
						<div className='my-auto align-middle items-center flex flex-col'>
							<Icon path={mdiFolderSearchOutline} size={5} className='text-[#919191]' />
							<p className='text-[#919191] font-[500] text-lg'>No Properties Found</p>
						</div>
					</div>
				)}
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</>
	)
}

export default SearchPage
