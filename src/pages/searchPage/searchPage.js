import { Form, Loader } from '@components'
import NoImage from '../../assets/images/icon-no-image.svg'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import Icon from '@mdi/react'
import { mdiFolderSearchOutline, mdiMapMarkerOutline } from '@mdi/js'
import { BedroomSizeEnums } from '../newListing/helpers/enums'
import { listingsNotByUserSelector, searchPropertiesSelector } from '../listing/helpers/selectors'

const SearchPage = () => {
	const navigator = useNavigate()
	const id = JSON.parse(localStorage.getItem('user'))?.id

	const { form, loading } = useOutletContext()
	const values = Form.useWatch(undefined, form)
	console.log({ values })
	const data = useRecoilValue(
		searchPropertiesSelector({
			id,
			dateRange: [values?.dateRange?.[0]?.format(), values?.dateRange?.[1]?.format()],
			location: { city: values?.city, country: values?.country },
			type: values?.type,
		})
	)

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
									onClick={() => {
										localStorage.setItem('searchDate', JSON.stringify(form.getFieldValue(['dateRange'])))
										localStorage.setItem('searchType', JSON.stringify(form.getFieldValue(['type'])))
										localStorage.setItem('location', JSON.stringify({ city: form.getFieldValue(['city']), country: form.getFieldValue(['country']) }))

										navigator(`/listing/${listing.property._id}`)
									}}
								>
									<img
										src={listing.property.pictures[0] && !listing.property.pictures[0].includes('example.com') ? listing.property.pictures[0] : NoImage}
										alt=''
										className='h-[306px] w-[279px] rounded-lg object-cover'
									/>
									<div className='py-4 '>
										<p className='text-[#333333] text-lg font-[700] break-normal'>{listing.property.title || listing.property.description}</p>
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
