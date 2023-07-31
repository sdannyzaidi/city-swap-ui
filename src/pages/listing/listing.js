import { useCallback, useEffect, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { listingByIdSelector } from './helpers/selectors'
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

const Listing = () => {
	const { id, action } = useParams()
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const listing = useRecoilValue(listingByIdSelector({ id }))
	const [form] = Form.useForm()
	const setData = useSetRecoilState(listingsAtom)
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
	}, [])

	useEffect(() => {
		fetchData()
	}, [])
	return loading ? (
		<div className='flex flex-col justify-center items-center h-full'>
			<div className='my-auto align-middle'>
				<Loader />
			</div>
		</div>
	) : (
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
				<PropertySelectionModal visible={openModal} setVisible={setOpenModal} properties={[listing]} />
			</div>
		</Form>
	)
}

export default Listing
