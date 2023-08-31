import { useCallback, useEffect, useMemo, useState } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'
import { listingByIdSelector, partialSwappableListingsSelector, swappableListingsSelector } from './helpers/selectors'
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
import { Button } from 'antd'
import { AmenitiesEnums, BedroomSizeEnums } from '../newListing/helpers/enums'
import dayjs from 'dayjs'
import useUpdateProperty from './hooks/useUpdateProperty'

const Listing = () => {
	const [form] = Form.useForm()

	const { id, action } = useParams()
	const dateRange = JSON.parse(localStorage.getItem('searchDate'))
	const location = JSON.parse(localStorage.getItem('location'))
	const listing = useRecoilValue(listingByIdSelector({ id }))
	const partialSwapPropertyId = Form.useWatch(['partialSwapPropertyId'], form)
	const [updatePropertyFunction, updatePropertyLoading] = useUpdateProperty()
	useEffect(() => {
		if (action === 'edit' && listing) {
			const initValues = {
				description: listing?.property.description,
				title: listing?.property.title || listing?.property.description,
				size: Object.values(BedroomSizeEnums).reduce((acc, item) => {
					acc[item.value] = (listing?.property?.[item.value] || 0).toString()
					return acc
				}, {}),
				amenities: Object.values(AmenitiesEnums).reduce((acc, item) => {
					acc[item.value] = listing?.property?.[item.value] || false
					return acc
				}, {}),
				availableDates: Object.values(listing?.asscocitedListings?.[0]?.availableDates || listing?.associatedListings?.[0]?.availableDates || [])?.map(
					(obj) => {
						return [dayjs(obj.startDate).format('YYYY-MM-DD'), dayjs(obj.endDate).format('YYYY-MM-DD')]
					}
				),
			}
			console.log({ initValues })
			form.setFieldsValue(initValues)
		}
	}, [listing])
	const myListings = useRecoilValue(
		action === 'edit' ? constSelector([]) : swappableListingsSelector({ id: JSON.parse(localStorage.getItem('user'))?.id, dateRange })
	)
	const myPartialListings = useRecoilValue(
		action === 'edit' ? constSelector([]) : partialSwappableListingsSelector({ id: JSON.parse(localStorage.getItem('user'))?.id, dateRange })
	)
	const selectedProperty = useMemo(
		() => myPartialListings?.find((listing) => partialSwapPropertyId === listing?.property?._id),
		[partialSwapPropertyId]
	)
	console.log({ myListings, myPartialListings, selectedProperty, partialSwapPropertyId })
	const setData = useSetRecoilState(listingsAtom)
	useEffect(() => {
		if (selectedProperty?.startRange || selectedProperty?.endRange) {
			fetchSubleaseProperty()
		}
	}, [selectedProperty])
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const fetchSubleaseProperty = useCallback(
		async (values) => {
			const response3 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					country: location?.country,
					city: location?.city,
					startDate: selectedProperty?.startRange?.[0],
					endDate: selectedProperty?.startRange?.[1],
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
			const response4 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					country: location?.country,
					city: location?.city,
					startDate: selectedProperty?.endRange?.[0],
					endDate: selectedProperty?.endRange?.[1],
					entirePlace: true,
					user: true,
					location: true,
					list: true,
					type: 'sublease',
				}),
			})

			if (response4.status === 200) {
				const data = await response4.json()
				console.log({ data })
				setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
				setLoading(false)
			} else {
				console.log(response4)
				setLoading(false)
			}
		},
		[selectedProperty]
	)
	const updateProperty = useCallback(async (values) => {
		console.log({ values })
		updatePropertyFunction(values, listing).then(() => {
			console.log('done')
		})

		// const response = await fetch(
		// 	`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request'](JSON.parse(localStorage.getItem('user'))?.id)}`,
		// 	{
		// 		method: 'POST',
		// 		headers: { 'Content-Type': 'application/json;charset=utf-8' },
		// 		body: JSON.stringify(values),
		// 	}
		// )
		// if (response.status === 200) {
		// 	const data = await response.json()
		// 	console.log({ data })
		// } else {
		// 	console.log(response)
		// }
	})
	const subleaseProperty = useCallback(async (values) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['sublease-request'](JSON.parse(localStorage.getItem('user'))?.id)}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify(values),
			}
		)
		if (response.status === 200) {
			const data = await response.json()
			console.log({ data })
		} else {
			console.log(response)
		}
	})
	const swapProperty = useCallback(async (values) => {
		const response = await fetch(
			`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['swap-request']?.(JSON.parse(localStorage.getItem('user'))?.id)}`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify(values),
			}
		)
		if (response.status === 200) {
			const data = await response.json()
			console.log({ data })
		} else {
			console.log(response)
		}
	})
	const fetchData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}propertyInfo/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			setData((prev) => [...new Map([...prev, data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
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
			setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
			setLoading(false)
		} else {
			console.log(response2)
			setLoading(false)
		}
	}, [])
	const sendRequest = useCallback(async () => {
		const values = form.getFieldsValue()
		console.log({ values, myListings, myPartialListings })
		if (JSON.parse(localStorage.getItem('searchType')) === 'sublease') {
			subleaseProperty({
				reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
				propertyId: listing?.property?._id,
				requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
			})
		} else {
			if (values?.swapPropertyId) {
				swapProperty({
					swapPropertyId: listing.property._id,
					ownPropertyId: values?.swapPropertyId,
					requestDates: [
						{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] },
						{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] },
					],
				})
			} else if (values?.partialSwapPropertyId) {
				const partialSwapProperty = myPartialListings.find((listing) => listing.property._id === values?.partialSwapPropertyId)
				const { overlap, startRange, endRange } = partialSwapProperty || {}
				if (values?.subleaseSameProperty === 'yes') {
					subleaseProperty({
						propertyId: listing.property._id,
						reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
						requestDates: [
							...(startRange ? [{ startDate: startRange?.[0], endDate: startRange?.[1] }] : []),
							...(endRange ? [{ startDate: endRange?.[0], endDate: endRange?.[1] }] : []),
						],
					})
				} else if (values?.subleasePropertyId) {
					subleaseProperty({
						propertyId: values?.subleasePropertyId,
						reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
						requestDates: [
							...(startRange ? [{ startDate: startRange?.[0], endDate: startRange?.[1] }] : []),
							...(endRange ? [{ startDate: endRange?.[0], endDate: endRange?.[1] }] : []),
						],
					})
				}
				swapProperty({
					swapPropertyId: listing.property._id,
					ownPropertyId: values?.partialSwapPropertyId,
					requestDates: [
						{ startDate: overlap?.[0], endDate: overlap?.[1] },
						{ startDate: overlap?.[0], endDate: overlap?.[1] },
					],
				})
			} else if (values?.subleasePropertyId) {
				subleaseProperty({
					reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
					propertyId: values?.subleasePropertyId,
					requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
				})
			}
		}
	}, [myListings, myPartialListings])

	useEffect(() => {
		document.getElementById('primary-header').scrollIntoView({ behavior: 'smooth' })
		fetchData()
	}, [])
	return (
		<Form
			form={form}
			onFinish={(values) => {
				if (action === 'edit') {
					updateProperty(values)
				}
			}}
		>
			<div className='flex flex-col'>
				<PrimaryHeader />

				{action === 'edit' ? (
					<div className='sm:px-44 max-sm:px-8 py-8'>
						{Form.renderFormItem({
							type: 'input',
							elementClassName: 'text-[#1A202C] text-[36px] font-bold',
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
					<PropertyDetails listing={listing} editable />
					{action !== 'edit' ? <UserCard listing={listing} setVisible={setOpenModal} /> : null}
				</div>
				<div className='sm:pb-24 max-sm:pb-12'>
					<Amenities listing={listing} editable />
				</div>

				<div className='sm:pb-24 max-sm:pb-12'>
					<Calendar listing={listing} editable={action === 'edit'} />
				</div>
				{action !== 'edit' ? (
					<div className='sm:pb-24 max-sm:pb-12'>
						<Testimonials listing={listing} />
					</div>
				) : null}
				{action === 'edit' ? (
					<div className={`w-full flex flex-row justify-end items-center sm:px-64 max-sm:px-4 pb-16`}>
						<Button
							className='btn-secondary mr-6'
							// disabled={loading || otherLoading}
							onClick={() => {
								navigator('/home')
							}}
						>
							CANCEL
						</Button>

						<Button
							loading={updatePropertyLoading}
							className='btn-primary !h-10 text-lg'
							onClick={() => {
								form.submit()
							}}
						>
							SUBMIT
						</Button>
					</div>
				) : null}
				<div className='w-full bg-[#664F94] h-[280px]' />
				<PropertySelectionModal
					selectedProperty={selectedProperty}
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
