import HeroBackground from '../../assets/images/prague.webp'
import { useCallback, useEffect, useRef, useState } from 'react'
import { PrimaryHeader, Form } from '@components'
import { Button } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { endpoints } from '../../helpers/enums'
import { listingsAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'

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
					<div
						className={`absolute top-0 bottom-0 right-0 left-0  ${
							pathname === '/home/search' ? 'h-[300px]' : 'h-[600px]'
						}  transition-[height] duration-1000 w-full bg-[#4444449C]`}
					></div>
					<div className='absolute flex flex-col items-center justify-center  left-0 right-0 top-0  bottom-0 w-full'>
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
											message: 'Please enter an description',
											options: [
												{ value: 'Australia', label: 'Australia' },
												{ value: 'Canada', label: 'Canada' },
												{ value: 'United States', label: 'United States' },
											],
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
											message: 'Please enter an description',
											options: [
												{ value: 'Sydney', label: 'Sydney' },
												{ value: 'Toronto', label: 'Toronto' },
												{ value: 'New York', label: 'New York' },
											],

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
					<img className='w-full h-auto' src={HeroBackground} alt='' />
				</div>
			</Form>
			<Outlet context={{ homeRef, form, loading }} />
		</div>
	)
}

export default Home
