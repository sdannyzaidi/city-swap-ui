import { Button } from 'antd'
import { HeaderLogo } from '@components'
import ProfileLogo from '../../assets/images/profile.png'
import { mdiPlus } from '@mdi/js'
import { useNavigate } from 'react-router-dom'
import Icon from '@mdi/react'
const PrimaryHeader = () => {
	const navigator = useNavigate()
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	return (
		<div className='flex flex-row justify-between items-center w-full bg-white px-8 py-4' id='primary-header'>
			<div className='flex flex-row'>
				<HeaderLogo />
			</div>
			<div className='flex flex-row justify-evenly items-center space-x-4'>
				{loggedInUser?.id ? (
					<div className='flex flex-row items-center space-x-6 mr-6 text-[#555555] font-semibold'>
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
					<div className='flex flex-row items-center space-x-6 mr-6 text-[#555555] font-semibold'>
						<p className=' text-[16px]'>How It works</p>
						<p className=' text-[16px]'>Pricing</p>
						<p className=' text-[16px]'>FAQs</p>
					</div>
				)}
				{loggedInUser?.id ? (
					<div className='flex flex-row items-center space-x-4'>
						<Button className='flex flex-row items-center btn-primary hover:cursor-pointer' onClick={() => navigator('/new-listing')}>
							<Icon path={mdiPlus} size={1} className='text-white' />
							<p className='mx-2'>Add Listing</p>
						</Button>
						<div className='h-11 w-11 rounded-full border border-solid border-black-75 hover:cursor-pointer' onClick={() => navigator('/profile')}>
							<img className='h-full w-full rounded-full bg-black-75' src={loggedInUser?.profilePicture || ProfileLogo} alt='' />
						</div>
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
	)
}

export default PrimaryHeader
