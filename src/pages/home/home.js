import HeroBackground from '../../assets/images/prague.webp'
import { useRef } from 'react'
import { PrimaryHeader, Form } from '@components'
import { Button } from 'antd'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

const Home = (props) => {
	const homeRef = useRef(null)
	const navigator = useNavigate()
	const { pathname } = useLocation()
	const [form] = Form.useForm()
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
					<div className='absolute flex flex-row items-center left-0 right-0 top-0  bottom-0 w-full'>
						<div className='flex flex-row items-center justify-center w-full space-x-4'>
							{Form.renderFormItem({
								type: 'input',
								key: 'search',
								name: ['search'],
								itemClassName: '!mb-0 w-[20rem]',
								placeholder: 'Search for a property',
								required: true,
								message: 'Please enter an description',
							})}
							<Button className='btn-primary ' onClick={() => navigator('/home/search', { state: { search: form.getFieldValue('search') } })}>
								Search
							</Button>
						</div>
					</div>
					<img className='w-full h-auto' src={HeroBackground} alt='' />
				</div>
			</Form>
			<Outlet context={{ homeRef }} />
		</div>
	)
}

export default Home
