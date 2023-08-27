import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
	listingByIdSelector,
	listingByUserAndDateRangeSelector,
	partialSwappableListingsSelector,
	swappableListingsSelector,
} from './helpers/selectors'
import { listingsAtom } from '@atoms'
import { useParams } from 'react-router-dom'
import { Form, Loader, PrimaryHeader } from '@components'
import Amenities from './components/amenities'
import Calendar from './components/calendar'
import PropertyDetails from './components/propertyDetails'
import UserCard from './components/userCard'
import PictureCard from './components/pictureCard'
import Testimonials from './components/testimonials'
import PropertySelectionModal from './components/propertySelectionModal'
import { endpoints } from '../../helpers/enums'

const Listing = () => {
	const [form] = Form.useForm()

	const { id, action } = useParams()
	const dateRange = JSON.parse(localStorage.getItem('searchDate'))
	const location = JSON.parse(localStorage.getItem('location'))
	const listing = useRecoilValue(listingByIdSelector({ id }))
	const myListings = useRecoilValue(swappableListingsSelector({ id: JSON.parse(localStorage.getItem('user'))?.id, dateRange }))
	const myPartialListings = useRecoilValue(partialSwappableListingsSelector({ id: JSON.parse(localStorage.getItem('user'))?.id, dateRange }))
	const setData = useSetRecoilState(listingsAtom)

	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)

	const fetchData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}propertyInfo/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			setData((prev) => [...new Map([...prev, data].map((obj) => [JSON.stringify(obj), obj])).values()])
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
		const response2 = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['user-properties']?.(JSON.parse(localStorage.getItem('user'))?.id)}`,
			{
				method: 'GET',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
			}
		)
		if (response2.status === 200) {
			const data = await response2.json()
			// console.log({ data })
			setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj), obj])).values()])
			setLoading(false)
		} else {
			console.log(response2)
			setLoading(false)
		}
		const response3 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				country: location?.country,
				city: location?.city,
				startDate: dateRange?.[0],
				endDate: dateRange?.[1],
				entirePlace: true,
				user: true,
				location: true,
				list: true,
				type: 'sublease',
			}),
		})

		if (response3.status === 200) {
			const data = await response3.json()
			console.log({ data })
			setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
			setLoading(false)
		} else {
			console.log(response3)
			setLoading(false)
		}
	}, [])
	const sendRequest = useCallback(async () => {
		const values = form.getFieldsValue()
		console.log({ values, myListings, myPartialListings })
		if (JSON.parse(localStorage.getItem('searchType')) === 'sublease') {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request']}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					propertyId: listing?.property?._id,
					requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
				}),
			})
			if (response.status === 200) {
				const data = await response.json()
				console.log({ data })
			} else {
				console.log(response)
			}
		} else {
			if (values?.swapPropertyId) {
				const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['swap-request']}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						swapPropertyId: listing.property._id,
						ownPropertyId: values?.swapPropertyId,
						requestDates: [
							{
								startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0],
								endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1],
							},
						],
					}),
				})
				if (response.status === 200) {
					const data = await response.json()
					console.log({ data })
				} else {
					console.log(response)
				}
			} else if (values?.partialSwapPropertyId) {
				const partialSwapProperty = myPartialListings.find((listing) => listing.property._id === values?.partialSwapPropertyId)
				const { overlap, startRange, endRange } = partialSwapProperty || {}
				const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['swap-request']}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						swapPropertyId: listing.property._id,
						ownPropertyId: values?.partialSwapPropertyId,
						requestDates: [
							{
								startDate: overlap?.[0],
								endDate: overlap?.[1],
							},
						],
					}),
				})
				if (response.status === 200) {
					const data = await response.json()
					console.log({ data })
				} else {
					console.log(response)
				}
				if (values?.subleaseSameProperty) {
					const response2 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request']}`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json;charset=utf-8' },
						body: JSON.stringify({
							propertyId: listing.property._id,
							requestDates: [
								...(startRange
									? [
											{
												startDate: startRange?.[0],
												endDate: startRange?.[1],
											},
									  ]
									: []),
								...(endRange
									? [
											{
												startDate: endRange?.[0],
												endDate: endRange?.[1],
											},
									  ]
									: []),
							],
						}),
					})
					if (response2.status === 200) {
						const data = await response2.json()
						console.log({ data })
					} else {
						console.log(response2)
					}
				} else if (values?.subleasePropertyId) {
					const response2 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request']}`, {
						method: 'POST',
						headers: { 'Content-Type': 'application/json;charset=utf-8' },
						body: JSON.stringify({
							propertyId: values?.subleasePropertyId,
							requestDates: [
								...(startRange
									? [
											{
												startDate: startRange?.[0],
												endDate: startRange?.[1],
											},
									  ]
									: []),
								...(endRange
									? [
											{
												startDate: endRange?.[0],
												endDate: endRange?.[1],
											},
									  ]
									: []),
							],
						}),
					})
					if (response2.status === 200) {
						const data = await response2.json()
						console.log({ data })
					} else {
						console.log(response2)
					}
				}
			} else if (values?.subleasePropertyId) {
				const response2 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request']}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						propertyId: values?.subleasePropertyId,
						requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
					}),
				})
				if (response2.status === 200) {
					const data = await response2.json()
					console.log({ data })
				} else {
					console.log(response2)
				}
			}
		}
	}, [])

	useEffect(() => {
		document.getElementById('primary-header').scrollIntoView({ behavior: 'smooth' })
		fetchData()
	}, [])
	return (
		<Form form={form}>
			<div className='flex flex-col'>
				<PrimaryHeader />
				{action === 'edit' ? (
					<div className='sm:px-44 max-sm:px-8 py-8'>
						{Form.renderFormItem({
							type: 'input',
							elementClassName: 'text-[#1A202C] text-[36px] font-bold',
							initialValue: listing?.property.title || listing?.property.description,
							name: 'title',
							rules: [{ required: true, message: 'Please enter a title' }],
						})}
					</div>
				) : (
					<p className='text-[#1A202C] text-[36px] font-bold sm:px-44 max-sm:px-8 py-8'>
						{listing?.property.title || listing?.property.description || 'The Property'}
					</p>
				)}
				<div className='sm:pb-24 max-sm:pb-12'>
					<PictureCard listing={listing} />
				</div>
				<div className='sm:pb-24 max-sm:pb-12 sm:pl-44 sm:pr-48 max-sm:px-8 flex sm:flex-row max-sm:flex-col justify-between items-start'>
					<PropertyDetails listing={listing} />
					{action !== 'edit' ? <UserCard listing={listing} setVisible={setOpenModal} /> : null}
				</div>
				<div className='sm:pb-24 max-sm:pb-12'>
					<Amenities listing={listing} />
				</div>

				<div className='sm:pb-24 max-sm:pb-12'>
					<Calendar listing={listing} />
				</div>
				<div className='sm:pb-24 max-sm:pb-12'>
					<Testimonials listing={listing} />
				</div>
				<div className='w-full bg-[#664F94] h-[280px]' />
				<PropertySelectionModal
					form={form}
					visible={openModal}
					otherProperty={listing}
					setVisible={setOpenModal}
					properties={myListings}
					partialListings={myPartialListings}
					sendRequest={sendRequest}
				/>
			</div>
		</Form>
	)
}

export default Listing
