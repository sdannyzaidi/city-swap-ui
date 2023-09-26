import { useCallback, useEffect, useMemo, useState } from 'react'
import { constSelector, useRecoilValue, useSetRecoilState } from 'recoil'
import { listingByIdSelector, partialSwappableListingsSelector, swappableListingsSelector } from './helpers/selectors'
import { listingsAtom } from '@atoms'
import { useNavigate, useParams } from 'react-router-dom'
import { Footer, Form, Loader, PrimaryHeader, RadioButtonGroup } from '@components'
import Amenities from './components/amenities'
import Calendar from './components/calendar'
import PropertyDetails from './components/propertyDetails'
import UserCard from './components/userCard'
import PictureCard from './components/pictureCard'
import Testimonials from './components/testimonials'
import PropertySelectionModal from './components/propertySelectionModal'
import { endpoints } from '../../helpers/enums'
import { Button, Input, Select, Upload, notification } from 'antd'
import { AmenitiesEnums, BedroomSizeEnums, PaymentTypeEnums } from '../newListing/helpers/enums'
import dayjs from 'dayjs'
import useUpdateProperty from './hooks/useUpdateProperty'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
import { firebase } from '@auth'
import { findCities } from '../../helpers/utilFunctions'
import statesToCities from '../../helpers/statesCities'

const { Option } = Select

const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

const normFile = (e) => {
	if (Array.isArray(e)) return e
	return e && e.fileList
}

const selectAfter = (
	<Form.Item name={['timePeriod']} initialValue={'perWeek'} className='!mb-0'>
		<Select>
			<Option value='perWeek'>Per Week</Option>
			<Option value='perMonth'>Per Month</Option>
		</Select>
	</Form.Item>
)

const Listing = () => {
	const [form] = Form.useForm()
	const navigator = useNavigate()
	const { id, action } = useParams()
	const dateRange = JSON.parse(localStorage.getItem('searchDate'))
	const location = JSON.parse(localStorage.getItem('location'))
	const listing = useRecoilValue(listingByIdSelector({ id }))
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const [loading, setLoading] = useState(false)
	const [openModal, setOpenModal] = useState(false)
	const partialSwapPropertyId = Form.useWatch(['partialSwapPropertyId'], form)
	const listingType = Form.useWatch(['listingType'], form)

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
				price: listing?.associatedListings?.[0]?.cost,
				timePeriod: listing?.associatedListings?.[0]?.timePeriod,
				listingType: listing?.associatedListings?.[0]?.listingType,
				photos: listing?.property.pictures?.map((picture) => {
					return {
						uid: picture,
						name: picture,
						status: 'done',
						url: picture,
					}
				}),
			}
			// console.log({ initValues })
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
	// console.log({ myListings, myPartialListings, selectedProperty, partialSwapPropertyId })
	const setData = useSetRecoilState(listingsAtom)
	useEffect(() => {
		if (selectedProperty?.startRange || selectedProperty?.endRange) {
			fetchSubleaseProperty()
		} else if ((!myPartialListings || myPartialListings?.length === 0) && dateRange) {
			console.log({ dateRange })
			fetchSubleaseProperty()
		}
	}, [selectedProperty])

	useEffect(() => {
		if (action !== 'edit' && !openModal) {
			form.resetFields()
		}
	}, [openModal])
	const fetchSubleaseProperty = useCallback(
		async (values) => {
			if (selectedProperty) {
				const response3 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						country: location?.country,
						city: statesToCities[location?.city] || findCities(location?.city) || location?.city,
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
					// console.log({ data })
					setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
					setLoading(false)
				} else {
					// console.log(response3)
					setLoading(false)
				}
				const response4 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						country: location?.country,
						city: statesToCities[location?.city] || findCities(location?.city) || location?.city,
						startDate: selectedProperty?.endRange?.[0],
						endDate: selectedProperty?.endRange?.[1],
						entirePlace: true,
						user: true,
						location: true,
						list: true,
						type: 'sublease',
					}),
				})
				console.log({ response4 })
				if (response4.status === 200) {
					const data = await response4.json()
					// console.log({ data })
					setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
					setLoading(false)
				} else {
					// console.log(response4)
					setLoading(false)
				}
			} else if (!myPartialListings || myPartialListings?.length === 0) {
				const response4 = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json;charset=utf-8' },
					body: JSON.stringify({
						country: location?.country,
						city: statesToCities[location?.city] || findCities(location?.city) || location?.city,
						startDate: dayjs(dateRange?.[0]).format('YYYY-MM-DD'),
						endDate: dayjs(dateRange?.[1]).format('YYYY-MM-DD'),
						entirePlace: true,
						user: true,
						location: true,
						list: true,
						type: 'sublease',
					}),
				})
				console.log({ response4 })
				if (response4.status === 200) {
					const data = await response4.json()
					// console.log({ data })
					setData((prev) => [...new Map([...prev, ...data].map((obj) => [JSON.stringify(obj?.property?._id), obj])).values()])
					setLoading(false)
				} else {
					// console.log(response4)
					setLoading(false)
				}
			}
		},
		[selectedProperty]
	)
	const updateProperty = useCallback(async (values) => {
		console.log({ values })
		updatePropertyFunction(values, listing).then((response) => {
			if (response.status === 200) {
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
		})
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
		return response
	})
	const swapProperty = useCallback(async (values) => {
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['swap-request']}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(values),
		})
		return response
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
			// console.log(response)
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
		const requests = []
		// console.log({ values, myListings, myPartialListings })
		if (JSON.parse(localStorage.getItem('searchType')) === 'sublease') {
			subleaseProperty({
				reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
				propertyId: listing?.property?._id,
				requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
			})
		} else {
			if (values?.swapPropertyId) {
				requests.push(
					swapProperty({
						swapPropertyId: listing.property._id,
						ownPropertyId: values?.swapPropertyId,
						requestDates: [
							{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] },
							{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] },
						],
					})
				)
			} else if (values?.partialSwapPropertyId) {
				const partialSwapProperty = myPartialListings.find((listing) => listing.property._id === values?.partialSwapPropertyId)
				const { overlap, startRange, endRange } = partialSwapProperty || {}
				if (values?.subleaseSameProperty === 'yes') {
					requests.push(
						subleaseProperty({
							propertyId: listing.property._id,
							reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
							requestDates: [
								...(startRange ? [{ startDate: startRange?.[0], endDate: startRange?.[1] }] : []),
								...(endRange ? [{ startDate: endRange?.[0], endDate: endRange?.[1] }] : []),
							],
						})
					)
				} else if (values?.subleasePropertyId) {
					if (startRange?.[0]) {
						requests.push(
							subleaseProperty({
								propertyId: values?.subleasePropertyId,
								reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
								requestDates: [...(startRange ? [{ startDate: startRange?.[0], endDate: startRange?.[1] }] : [])],
							})
						)
					}
					if (endRange?.[0]) {
						requests.push(
							subleaseProperty({
								propertyId: values?.subleasePropertyId,
								reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
								requestDates: [...(endRange ? [{ startDate: endRange?.[0], endDate: endRange?.[1] }] : [])],
							})
						)
					}
				}
				requests.push(
					swapProperty({
						swapPropertyId: listing.property._id,
						ownPropertyId: values?.partialSwapPropertyId,
						requestDates: [
							{ startDate: overlap?.[0], endDate: overlap?.[1] },
							{ startDate: overlap?.[0], endDate: overlap?.[1] },
						],
					})
				)
			} else if (values?.subleasePropertyId) {
				requests.push(
					subleaseProperty({
						reqUserId: JSON.parse(localStorage.getItem('user'))?.id,
						propertyId: values?.subleasePropertyId,
						requestDates: [{ startDate: JSON.parse(localStorage.getItem('searchDate'))?.[0], endDate: JSON.parse(localStorage.getItem('searchDate'))?.[1] }],
					})
				)
			}
		}
		Promise.all(requests).then((responses) => {
			if (responses.every((response) => response?.status === 200 || response?.status === 201)) {
				notification['success']({
					message: 'Request sent successfully',
					duration: 5,
					onClick: () => {
						notification.close()
					},
				})
				// navigator('home')
			} else {
				// console.log(responses)
				notification['error']({
					message: 'Request sending failed',
					duration: 5,
					onClick: () => {
						notification.close()
					},
				})
			}
		})
	}, [myListings, myPartialListings])

	const DocumentUpload = async ({ file, onProgress, onSuccess, onError }) => {
		setLoading(true)
		const response = firebase.storage
			.ref()
			.child(
				`public/images/properties/${loggedInUser.id}/${form.getFieldValue(['location', 'address'])}-${form.getFieldValue('photos')?.length}-${file.name}`
			)
			.put(file)
		response.on(
			'state_changed',
			(snapshot) => onProgress({ percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }),
			(error) => onError(error),
			() => onSuccess(null, response.metadata_)
		)
	}

	const ChangeFileList = async ({ fileList }) => {
		if (fileList.length > 0) {
			fileList.forEach((file, index) => {
				if (!file.url && file.status === 'done') {
					const response = firebase.storage
						.ref()
						.child(
							`public/images/properties/${loggedInUser.id}/${form.getFieldValue(['location', 'address'])}-${form.getFieldValue('photos')?.length}-${file.name}`
						)
					response.getDownloadURL().then((result) => {
						fileList[index].url = result
						setLoading(false)
					})
				}
			})
		}
	}

	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
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
				<div className='max-md:pt-14 sm:pt-20'>
					{action === 'edit' ? (
						<div className='md:px-44 max-md:px-8 py-8'>
							{Form.renderFormItem({
								type: 'input',
								elementClassName: 'text-[#1A202C] text-[36px] font-bold',
								name: 'title',
								rules: [{ required: true, message: 'Please enter a title' }],
							})}
						</div>
					) : (
						<div className='flex md:flex-row max-md:flex-col md:items-center max-md:items-start justify-start  md:px-44 max-md:px-8 py-8'>
							<p className='text-[#1A202C] text-[36px] font-bold'>{listing?.property.title || listing?.property.description || 'The Property'}</p>
							{JSON.parse(localStorage.getItem('searchType')) === 'sublease' && (
								<div className='border-2 border-solid border-gray-300 rounded-lg bg-white md:ml-8 max-md:mt-4'>
									<p className='text-[#1A202C] font-bold text-lg px-4 py-2 '>
										$&nbsp;{listing?.associatedListings?.find((item) => item.listingType === 'sublease')?.cost}&nbsp;/&nbsp;
										{PaymentTypeEnums[listing?.associatedListings?.find((item) => item.listingType === 'sublease')?.timePeriod]?.text}
									</p>
								</div>
							)}
						</div>
					)}
					{action === 'edit' && (
						<div className='md:px-44 max-md:px-8 pb-8'>
							<Form.Item name={'listingType'} noStyle required>
								<RadioButtonGroup
									options={[
										{ label: 'Available for Swap', short: 'Swap', value: 'swap' },
										{ label: 'Available for Sublease', short: 'Sub-lease', value: 'sublease' },
									]}
								/>
							</Form.Item>
						</div>
					)}
					{action === 'edit' && listingType === 'sublease' && (
						<div className='flex flex-col w-2/3 md:px-44 max-md:px-8 pb-8'>
							<Form.Item
								key='Price'
								layout='horizontal'
								name={['price']}
								rules={[
									{
										required: true,
										validator: (_, value = '') => {
											if (value?.toString().length > 0) {
												if (value < 0) {
													return Promise.reject(new Error(`This value cannot be negative.`))
												} else {
													return Promise.resolve()
												}
											} else {
												return Promise.reject(new Error('Please enter price'))
											}
										},
									},
								]}
								className='!rounded-b-none'
							>
								<Input
									className='price-add-on'
									onInput={(e) => {
										e.target.value = e.target.value.replace(/[^0-9.]*/g, '')
									}}
									addonAfter={selectAfter}
								/>
							</Form.Item>
						</div>
					)}
					<div className='md:pb-24 max-md:pb-12'>
						{action === 'edit' ? (
							<div className='flex flex-row md:px-40'>
								<Form.Item
									key={'photo-upload'}
									name={['photos']}
									rules={[{ required: true, message: `Please upload at least one photo` }]}
									valuePropName='fileList'
									getValueFromEvent={normFile}
								>
									<Upload className='max-md:w-full' customRequest={DocumentUpload} listType='picture-card' onChange={ChangeFileList}>
										<div className='bg-[#B3A7C9B2] h-full w-full flex flex-row items-center justify-center rounded-lg border border-solid border-[#664F94]'>
											<Icon path={mdiPlus} size={1.5} className='text-[#333333]' />
										</div>
									</Upload>
								</Form.Item>
							</div>
						) : (
							<PictureCard listing={listing} />
						)}
					</div>
					<div className='sm:pb-24 max-md:pb-12 md:pl-12 md:pr-12 lg:pl-44 lg:pr-48 max-md:px-8 flex md:flex-row max-md:flex-col justify-between items-start'>
						<PropertyDetails listing={listing} editable />
						{action !== 'edit' ? <UserCard listing={listing} setVisible={setOpenModal} /> : null}
					</div>
					<div className='sm:pb-24 max-md:pb-12'>
						<Amenities listing={listing} editable={action === 'edit'} />
					</div>

					<div className='sm:pb-24 max-md:pb-12'>
						<Calendar listing={listing} form={form} editable={action === 'edit'} />
					</div>
					{action !== 'edit' ? (
						<div className='sm:pb-24 max-md:pb-12'>
							<Testimonials listing={listing} />
						</div>
					) : null}
					{action === 'edit' ? (
						<div className={`w-full flex flex-row justify-end items-center md:px-64 max-md:px-4 pb-16`}>
							<Button
								className='btn-secondary mr-6'
								// disabled={loading || otherLoading}
								onClick={() => {
									navigator(-1)
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
					<Footer />
				</div>
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
