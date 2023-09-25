import HeroBackground1 from '../../assets/drive-assets/pedro-lastra-Nyvq2juw4_o-unsplash.jpg'
import HeroBackground2 from '../../assets/drive-assets/andrea-cau-nV7GJmSq3zc-unsplash.jpg'
import HeroBackground3 from '../../assets/drive-assets/henning-witzel-ukvgqriuOgo-unsplash.jpg'
import HeroBackground4 from '../../assets/drive-assets/ralph-ravi-kayden-2d4lAQAlbDA-unsplash.jpg'

import { useCallback, useEffect, useRef, useState } from 'react'
import { PrimaryHeader, Form } from '@components'
import { Button, Carousel } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { endpoints } from '../../helpers/enums'
import { listingsAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'
import CountryEnum from '../../helpers/countries'
import { Picker } from 'antd-mobile'
import { CalendarEnums } from '../newListing/helpers/enums'
import { mdiChevronDoubleDown } from '@mdi/js'
import Icon from '@mdi/react'
import MobileRangePicker from './components/mobileRangePicker'
import statesToCities from '../../helpers/statesCities'
import countryStates from '../../helpers/countiesStates'
import cityToState from '../../helpers/city_state'

const Home = (props) => {
	const homeRef = useRef(null)
	const navigator = useNavigate()
	const { pathname } = useLocation()
	const [form] = Form.useForm()
	const setData = useSetRecoilState(listingsAtom)
	const [loading, setLoading] = useState(false)
	const [visible, setVisible] = useState(false)
	const [searchHeaderVisible, setSearchHeaderVisible] = useState(true)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))

	const formValues = Form.useWatch(undefined, form)

	const findCities = (city)=>{
		const state = cityToState[city]
		const cities = statesToCities[state] || null
		return cities || null
	}


	const fetchData = useCallback(async () => {
		setLoading(true)
		const values = form.getFieldsValue()
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				country: values?.country,
				city: statesToCities[values?.city] || findCities(values?.city) || values?.city,
				startDate: values?.dateRange?.[0]?.format('YYYY-MM-DD'),
				endDate: values?.dateRange?.[1]?.format('YYYY-MM-DD'),
				type: values?.type,
				entirePlace: true,
				user: true,
				location: true,
				list: true,
			}),
		})

		if (response.status === 200) {
			const data = await response.json()
			// console.log({ data })
			setData(data)
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
	}, [])
	useEffect(() => {
		if (!formValues?.country) {
			navigator('/home/about')
		}
	}, [])
	return (
		<div className='overflow-y-scroll' ref={homeRef}>
			<PrimaryHeader />
			<div className='max-md:pt-14 sm:pt-20'>
				<Form form={form}>
					<div
						className={`lg:hidden relative w-full  ${
							pathname === '/home/search' ? (searchHeaderVisible ? 'h-[400px] rounded-b-2xl overflow-hidden' : 'h-[50px]') : 'h-[600x]'
						} overflow-y-clip transition-[height] duration-1000`}
					>
						{pathname === '/home/search' ? (
							<div className={`transition-[height] duration-1000 ${searchHeaderVisible ? 'h-[400px] overflow-hidden' : 'h-[0px] overflow-hidden'}`}>
								<img className='h-[400px] w-auto object-cover' src={HeroBackground1} alt='' />
							</div>
						) : (
							<Carousel className={pathname === '/home/search' ? (searchHeaderVisible ? 'h-[400px]' : 'h-[50px]') : 'h-[600px]'} autoplay autoPlaySpeed={8000}>
								<img className='h-[600px] w-auto object-cover' src={HeroBackground1} alt='' />
								<img className='h-[600px] w-auto object-cover' src={HeroBackground2} alt='' />
								<img className='h-[600px] w-auto object-cover' src={HeroBackground3} alt='' />
								<img className='h-[600px] w-auto object-cover' src={HeroBackground4} alt='' />
							</Carousel>
						)}

						<div
							className={`absolute top-0 bottom-0 right-0 left-0  ${
								pathname === '/home/search' ? (searchHeaderVisible ? 'h-[400px]' : 'h-[0px]') : 'h-[600px]'
							}  transition-[height] duration-1000 w-full bg-[#44444458]`}
						></div>

						<div
							className={`absolute flex flex-col items-center justify-start max-md:px-4 md:px-24  ${
								pathname === '/home/search' ? (searchHeaderVisible ? 'pt-8' : 'hidden') : 'pt-24'
							}  left-0 right-0 top-0  bottom-8 w-full`}
						>
							{pathname !== '/home/search' ? <p className={`text-center text-3xl font-bold text-white pb-8`}>Search Property</p> : undefined}

							<div className='w-full px-5 py-8 rounded-lg backdrop-blur-[2px] border border-solid border-gray-300 flex flex-col items-center justify-center'>
								<div className='flex flex-col items-center space-y-4 w-full'>
									{Form.renderSchema([
										[
											{
												type: 'select',
												key: 'country',
												name: ['country'],
												itemClassName: '!mb-0 !w-full',
												className: '!w-full',
												customWidth: true,
												placeholder: 'Select Country',
												required: true,
												showSearch: true,
												message: 'Please enter an description',
												options: Object.keys(CountryEnum).map((country) => ({ label: country, value: country })),
												displayProperty: 'label',
												valueProperty: 'value',
											},
											...(loggedInUser?._id
												? [
														{
															type: 'select',
															key: 'city',
															name: ['city'],
															itemClassName: '!mb-0 !w-full',
															className: '!w-full',
															customWidth: true,
															placeholder: 'Select City',
															required: true,
															showSearch: true,
															message: 'Please enter an description',
															options: (
																CountryEnum[formValues?.country]?.cities && [...CountryEnum[formValues?.country]?.cities, ...countryStates[formValues?.country] ] ||
																Object.values(CountryEnum)
																	.map((country) => country.cities)
																	.flat()
															).map((city) => ({
																label: city,
																value: city,
															})),

															displayProperty: 'label',
															valueProperty: 'value',
														},
												  ]
												: [{}]),
										],

										{
											type: 'select',
											key: 'type',
											name: ['type'],
											itemClassName: '!mb-0 w-full',
											customWidth: true,
											placeholder: 'Select Type',
											required: true,
											message: 'Please enter an description',
											options: [
												{ label: 'Swap', value: 'swap' },
												{ label: 'Sub-Lease', value: 'sublease' },
											],
											displayProperty: 'label',
											valueProperty: 'value',
											initialValue: 'swap',
										},
									])}
									{loggedInUser?._id && (
										<Form.Item name={['dateRange']} className='!mb-0 !w-full'>
											<MobileRangePicker />
										</Form.Item>
									)}
									<Button
										disabled={
											loggedInUser?._id
												? !(formValues?.country && formValues?.city && formValues?.type && formValues?.dateRange)
												: !(formValues?.country && formValues?.type)
										}
										className='btn-primary w-full !h-[40px] '
										onClick={() => {
											fetchData()
											navigator('/home/search')
										}}
									>
										Search
									</Button>
								</div>
							</div>
						</div>
						{pathname === '/home/search' ? (
							<div className={`absolute ${!searchHeaderVisible ? 'bottom-0' : 'bottom-6'} w-full flex flex-row items-center text-center justify-center`}>
								<div
									className='rounded-full p-2 bg-[#9B83CB] text-center'
									onClick={() => {
										setSearchHeaderVisible((prev) => !prev)
									}}
								>
									<Icon
										path={mdiChevronDoubleDown}
										size={0.7}
										className={`text-base leading-8 text-center font-[500] transition-all text-white ${searchHeaderVisible ? 'rotate-180' : 'rotate-0'}`}
									/>
								</div>
							</div>
						) : undefined}
					</div>
					<div
						className={` max-lg:hidden  relative w-full ${
							pathname === '/home/search' ? 'h-[300px]' : 'h-[600px]'
						} overflow-y-clip transition-[height] duration-1000`}
					>
						<Carousel className={pathname === '/home/search' ? 'h-[300px]' : 'h-[600px]'} autoplay autoPlaySpeed={8000}>
							<img className='w-full h-auto' src={HeroBackground1} alt='' />
							<img className='w-full h-auto' src={HeroBackground2} alt='' />
							<img className='w-full h-auto' src={HeroBackground3} alt='' />
							<img className='w-full h-auto' src={HeroBackground4} alt='' />
						</Carousel>
						<div
							className={`absolute top-0 bottom-0 right-0 left-0  ${
								pathname === '/home/search' ? 'h-[300px]' : 'h-[600px]'
							}  transition-[height] duration-1000 w-full bg-[#44444458]`}
						></div>
						<div className='absolute flex flex-col items-center justify-center  left-0 right-0 top-0  bottom-0 w-full'>
							<div className={`flex flex-col items-start justify-center ${!loggedInUser?._id ? 'bg-white px-8 py-6 rounded-md' : ''}`}>
								{loggedInUser?._id ? (
									<p className='text-3xl font-bold text-white pb-4'>Search Property</p>
								) : (
									<p className='text-base font-semibold text-black-300 pb-4'>Where are you going?</p>
								)}
								<div className='flex flex-row items-center space-between space-x-4'>
									{Form.renderSchema([
										[
											{
												type: 'select',
												key: 'country',
												name: ['country'],
												itemClassName: '!mb-0 !w-[12rem]',
												customWidth: true,
												placeholder: 'Select Country',
												required: true,
												showSearch: true,
												message: 'Please enter an description',
												options: Object.keys(CountryEnum).map((country) => ({ label: country, value: country })),
												displayProperty: 'label',
												valueProperty: 'value',
											},
											...(loggedInUser?._id
												? [
														{
															type: 'select',
															key: 'country',
															name: ['city'],
															itemClassName: '!mb-0 !w-[12rem]',
															customWidth: true,
															placeholder: 'Select State/City',
															required: true,
															showSearch: true,
															message: 'Please enter an description',
															options: (
																CountryEnum[formValues?.country]?.cities && [...CountryEnum[formValues?.country]?.cities, ...countryStates[formValues?.country] ] ||
																Object.values(CountryEnum)
																	.map((country) => country.cities)
																	.flat()
															).map((city) => ({
																label: city,
																value: city,
															})),

															displayProperty: 'label',
															valueProperty: 'value',
														},
												  ]
												: [{}]),
											{
												type: 'select',
												key: 'type',
												name: ['type'],
												itemClassName: '!mb-0 !w-[12rem]',
												customWidth: true,
												placeholder: 'Select Type',
												required: true,
												message: 'Please enter an description',
												options: [
													{ label: 'Swap', value: 'swap' },
													{ label: 'Sub-Lease', value: 'sublease' },
												],
												displayProperty: 'label',
												valueProperty: 'value',
												initialValue: 'swap',
											},
											...(loggedInUser?._id
												? [
														{
															type: 'dateRange',
															key: 'dateRange',
															name: ['dateRange'],
															itemClassName: '!mb-0 !w-[17rem]',
															customWidth: true,
															showTime: false,
															required: true,
															message: 'Please enter an description',
														},
												  ]
												: [{}]),
										],
									])}
									<Button
										disabled={
											loggedInUser?._id
												? !(formValues?.country && formValues?.city && formValues?.type && formValues?.dateRange)
												: !(formValues?.country && formValues?.type)
										}
										className='btn-primary'
										onClick={() => {
											fetchData()
											navigator('/home/search')
										}}
									>
										{loggedInUser?._id ? 'Search' : 'Find Home'}
									</Button>
								</div>
							</div>
						</div>
					</div>
					<Outlet context={{ homeRef, form, loading }} />
				</Form>
			</div>
		</div>
	)
}

export default Home
