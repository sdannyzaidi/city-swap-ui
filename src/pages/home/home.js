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

const Home = (props) => {
	const homeRef = useRef(null)
	const navigator = useNavigate()
	const { pathname } = useLocation()
	const [form] = Form.useForm()
	const setData = useSetRecoilState(listingsAtom)
	const [loading, setLoading] = useState(false)

	const formValues = Form.useWatch(undefined, form)
	const fetchData = useCallback(async () => {
		setLoading(true)
		const values = form.getFieldsValue()
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints.find}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				country: values?.country,
				city: values?.city,
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
			console.log({ data })
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
			<Form form={form}>
				<div className={`relative w-full ${pathname === '/home/search' ? 'h-[300px]' : 'h-[600px]'} overflow-y-clip transition-[height] duration-1000`}>
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
					<div className='absolute flex flex-col items-center justify-center  left-0 right-0 top-0  bottom-0 w-full max-sm:hidden'>
						<div className='flex flex-col items-start justify-center'>
							<p className='text-3xl font-bold text-white pb-4'>Search Property</p>
							<div className='flex flex-row items-center  space-x-4'>
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
										{
											type: 'select',
											key: 'country',
											name: ['city'],
											itemClassName: '!mb-0 !w-[12rem]',
											customWidth: true,
											placeholder: 'Select City',
											required: true,
											showSearch: true,
											message: 'Please enter an description',
											options: (
												CountryEnum[formValues?.country]?.cities ||
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
									],
								])}
								<Button
									disabled={!(formValues?.country && formValues?.city && formValues?.type && formValues?.dateRange)}
									className='btn-primary '
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
				</div>
				<Outlet context={{ homeRef, form, loading }} />
			</Form>
		</div>
	)
}

export default Home
