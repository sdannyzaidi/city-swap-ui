import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { listingByIdSelector, listingByUserAndDateRangeSelector, swappableListingsSelector } from './helpers/selectors'
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
			console.log({ data })
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
			setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj), obj])).values()])
			setLoading(false)
		} else {
			console.log(response3)
			setLoading(false)
		}
	}, [])
	const sendRequest = useCallback(async () => {
		const values = form.getFieldsValue()
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['swap-request']}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				propertyId1: listing.property._id,
				propertyId2: values?.swapPropertyId,
				requestDates: [
					{
						startDate: '2024-01-04',

						endDate: '2024-01-30',
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
					<div className='px-44 py-8'>
						{Form.renderFormItem({
							type: 'input',
							elementClassName: 'text-[#1A202C] text-[36px] font-bold',
							initialValue: listing?.property.title || listing?.property.description,
							name: 'title',
							rules: [{ required: true, message: 'Please enter a title' }],
						})}
					</div>
				) : (
					<p className='text-[#1A202C] text-[36px] font-bold px-44 py-8'>{listing?.property.title || listing?.property.description}</p>
				)}
				<div className='pb-24'>
					<PictureCard listing={listing} />
				</div>
				<div className='pb-24  pl-44 pr-48 flex flex-row justify-between items-start'>
					<PropertyDetails listing={listing} />
					{action !== 'edit' ? <UserCard listing={listing} setVisible={setOpenModal} /> : null}
				</div>
				<div className='pb-24'>
					<Amenities listing={listing} />
				</div>

				<div className='pb-24'>
					<Calendar listing={listing} />
				</div>
				<div className='pb-24'>
					<Testimonials listing={listing} />
				</div>
				<div className='w-full bg-[#664F94] h-[280px]' />
				<PropertySelectionModal visible={openModal} otherProperty={listing} setVisible={setOpenModal} properties={myListings} sendRequest={sendRequest} />
			</div>
		</Form>
	)
}

export default Listing
