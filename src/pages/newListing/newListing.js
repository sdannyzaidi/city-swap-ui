import { Form, PrimaryHeader, RadioButtonGroup } from '@components'
import { useMemo, useRef, useState } from 'react'
import { Button, notification } from 'antd'
import PropertyDetails from './components/propertyDetails'
import LocationDetails from './components/locationDetails'
import PropertyPictures from './components/propertyPictures'
import { ListingContext } from './helpers/context'
import PropertyAvailability from './components/propertyAvailability'
import useAddProperty from './hooks/useAddProperty'
import { useNavigate } from 'react-router-dom'
const NewListing = (props) => {
	const homeRef = useRef(null)
	const navigator = useNavigate()
	const [form] = Form.useForm()
	const [values, setValues] = useState({})
	const [addProperty, loading] = useAddProperty()
	const [otherLoading, setOtherLoading] = useState(false)
	const [page, setPage] = useState(0)
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
					<div className="w-1/3 min-h-[100vh]  bg-cover bg-center bg-[url('/Users/adilaslam/Documents/personal/cityswap/src/assets/images/sofa.png')] hidden sm:block" />
					<div className='w-2/3 h-max px-48 py-20 flex flex-col items-start'>
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
									onClick={() => {
										form

											.validateFields()
											.then((formValues) => {
												setValues((prev) => ({ ...prev, ...formValues }))
												setPage((prev) => prev + 1)
												document.getElementById('primary-header').scrollIntoView({ behavior: 'smooth' })
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

			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</div>
	)
}

export default NewListing
