import { Footer, Form, PrimaryHeader, RadioButtonGroup } from '@components'
import { useMemo, useRef, useState } from 'react'
import { Button, notification } from 'antd'
import PropertyDetails from './components/propertyDetails'
import LocationDetails from './components/locationDetails'
import PropertyPictures from './components/propertyPictures'
import { ListingContext } from './helpers/context'
import PropertyAvailability from './components/propertyAvailability'
import useAddProperty from './hooks/useAddProperty'
import { useNavigate } from 'react-router-dom'
import BG1 from '../../assets/drive-assets/brina-blum-nWX4pKwzLoE-unsplash.jpg'
const NewListing = (props) => {
	const homeRef = useRef(null)
	const navigator = useNavigate()
	const [form] = Form.useForm()
	const [values, setValues] = useState({})
	const [addProperty, loading] = useAddProperty()
	const [otherLoading, setOtherLoading] = useState(false)
	const [page, setPage] = useState(0)
	const formValues = Form.useWatch(undefined, form)
	return (
		<div className='overflow-y-scroll' ref={homeRef}>
			<PrimaryHeader />
			<Form
				form={form}
				layout='vertical'
				onFinish={(formValues) =>
					addProperty({ ...values, availableDates: formValues.availableDates }).then((response) => {
						if (response.status === 200) {
							notification['success']({
								message: 'Property added successfully',
								duration: 5,
								onClick: () => {
									notification.close()
								},
							})
							navigator('home')
						} else {
							console.log(response)
							notification['error']({
								message: 'Property addition failed',
								duration: 5,
								onClick: () => {
									notification.close()
								},
							})
						}
					})
				}
				preserve
			>
				<div className='w-full h-max flex flex-row'>
					<div className='min-h-[100vh] max-md:hidden sm:block sm:w-2/5'>
						<img src={BG1} alt='bg' className='w-full h-full object-cover' />
					</div>
					<div className='sm:w-3/5 max-md:w-full h-max md:px-48 max-md:px-8 sm:pb-20 max-md:pb-8 max-md:pt-20 sm:pt-32 flex flex-col items-start'>
						<ListingContext.Provider value={{ form, setLoading: setOtherLoading }}>
							{page === 0 ? <PropertyDetails /> : page === 1 ? <LocationDetails /> : page === 2 ? <PropertyPictures /> : <PropertyAvailability />}
						</ListingContext.Provider>
						<div className={`w-full flex flex-row justify-end items-center`}>
							{page > 0 && (
								<Button
									className='btn-secondary mr-6'
									disabled={loading || otherLoading}
									onClick={() => {
										form
											.validateFields()
											.then((values) => {
												setPage((prev) => prev - 1)
												document.getElementById('primary-header').scrollIntoView({ behavior: 'smooth' })
											})
											.catch((e) => {
												console.log('error', e)
											})
									}}
								>
									Previous
								</Button>
							)}
							{page === 3 ? (
								<Button
									loading={loading || otherLoading}
									className='btn-primary'
									onClick={() => {
										form.submit()
									}}
								>
									Submit
								</Button>
							) : (
								<Button
									className='btn-primary'
									loading={loading || otherLoading}
									disabled={
										page === 0 &&
										((formValues?.amenities && Object.values(formValues?.amenities)?.every((item) => item === false)) ||
											(formValues?.size && Object.values(formValues?.size)?.every((item) => item === '0')))
									}
									onClick={() => {
										form

											.validateFields()
											.then((values) => {
												setValues((prev) => ({ ...prev, ...values }))
												setPage((prev) => prev + 1)
												window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
											})
											.catch(() => {})
									}}
								>
									Next
								</Button>
							)}
						</div>
					</div>
				</div>
			</Form>

			<Footer />
		</div>
	)
}

export default NewListing
