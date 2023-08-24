import { Button } from 'antd'
import { HeaderLogo } from '@components'
import ProfileLogo from '../../assets/images/profile.png'
import { mdiHamburger, mdiMenu, mdiPlus } from '@mdi/js'
import { useNavigate } from 'react-router-dom'
import Icon from '@mdi/react'
import ResizeObserver from 'rc-resize-observer'
import { useState } from 'react'
const PrimaryHeader = () => {
	const navigator = useNavigate()
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const [width, setWidth] = useState(1000)
	return (
		<ResizeObserver
			onResize={({ width, height }) => {
				setWidth(width)
			}}
		>
			<div
				className='flex flex-row justify-between items-center border-b border-solid border-[#D0D5DD] w-full bg-white px-8 max-sm:px-4 max-sm:py-2 py-4'
				id='primary-header'
			>
				<div className='flex flex-row items-center'>
					<HeaderLogo width={width} />
				</div>
				<div className='flex flex-row justify-evenly items-center space-x-4'>
					{width > 640 ? (
						loggedInUser?.id ? (
							<div className='flex flex-row items-center space-x-6 mr-4 text-[#555555] font-semibold'>
								<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/home/about')}>
									Home
								</p>
								<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/chat')}>
									Messages
								</p>
								<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/requests-bookings')}>
									Requests & Bookings
								</p>
							</div>
						) : (
							<div className='flex flex-row items-center space-x-6 mr-4 text-[#555555] font-semibold'>
								<p className=' text-[16px]'>How It works</p>
								<p className=' text-[16px]'>Pricing</p>
								<p className=' text-[16px]'>FAQs</p>
							</div>
						)
					) : null}
					{loggedInUser?.id ? (
						<div className='flex flex-row items-center space-x-4'>
							<Button className={`flex flex-row items-center btn-primary hover:cursor-pointer `} onClick={() => navigator('/new-listing')}>
								<Icon path={mdiPlus} size={width > 640 ? 1 : 0.7} className='text-white' />
								<p className={width > 640 ? 'mx-2' : 'mx-1'}>Add Listing</p>
							</Button>
							{width > 640 ? (
								<div className='h-11 w-11 rounded-full border border-solid border-black-75 hover:cursor-pointer' onClick={() => navigator('/profile')}>
									<img className='h-full w-full rounded-full bg-black-75' src={loggedInUser?.profilePicture || ProfileLogo} alt='' />
								</div>
							) : (
								<div className='mr-4'>
									<Icon path={mdiMenu} size={1.4} className='text-[#555555]' />
								</div>
							)}
						</div>
					) : (
						<div className='flex flex-row items-center space-x-4'>
							<Button className='btn-secondary' onClick={() => navigator('/auth/login')}>
								Login
							</Button>
							<Button className='btn-primary' onClick={() => navigator('/auth/signup')}>
								Start Free Trial
							</Button>
						</div>
					)}
				</div>
			</div>
		</ResizeObserver>
	)
}

export default PrimaryHeader
