import { Button, Drawer } from 'antd'
import { HeaderLogo } from '@components'
import ProfileLogo from '../../assets/images/profile.png'
import { mdiHamburger, mdiLogout, mdiMenu, mdiPlus } from '@mdi/js'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '@mdi/react'
import ResizeObserver from 'rc-resize-observer'
import { useState } from 'react'
import { firebase } from '../../auth/firebase/config'
const PrimaryHeader = () => {
	const { pathname } = useLocation()
	const navigator = useNavigate()
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const [page, setPage] = useState({ title: 'Home', page: '/home/about' })
	const [visible, setVisible] = useState(false)
	const [width, setWidth] = useState(1000)
	return (
		<div>
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
									<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/info')}>
										How it works
									</p>
									<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/pricing')}>
										Pricing
									</p>
									<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/faqs')}>
										FAQs
									</p>
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
									<div className='mr-4' onClick={() => setVisible(true)}>
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
			{/* {visible && (
				<div
					className={`fixed left-0 bottom-0 top-0 w-full  h-full z-20 bg-[#66666633] opacity-50]`}
					onClick={() => {
						if (visible) {
							setVisible(false)
						}
					}}
				></div>
			)} */}
			<Drawer
				width={250}
				open={visible}
				onClose={() => setVisible(false)}
				closable={false}
				// 	className={`max-sm:flex sm:hidden border-l border-solid border-[#dfe0e2] ${
				// 		visible ? 'w-[250px] pt-5' : 'w-0'
				// 	} opacity-100  flex-row items-center shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]' : 'w-[0px] opacity-0' bg-white transition-[width,opacity] duration-200 fixed right-0 z-50 bottom-0 h-full`}
			>
				<div className='flex flex-col justify-between pb-4  !h-full'>
					<div className='flex flex-col  sm:pt-12 max-sm:pt-4  sm:px-6 max-sm:px-2 space-y-1'>
						{(loggedInUser
							? [
									{ title: 'Home', page: '/home/about' },
									{ title: 'Messages', page: '/chat' },
									{ title: 'Requests & Bookings', page: '/requests-bookings' },
							  ]
							: [
									{ title: 'How it works', page: '/info' },
									{ title: 'Pricing', page: '/pricing' },
									{ title: 'FAQs', page: '/faqs' },
							  ]
						).map((item) => (
							<p
								className={`px-2 py-2 text-sm font-[500] text-[#344054] ${
									pathname === item.page ? 'bg-[#F4EBFF] text-[#101828]' : ' hover:bg-[#F9FAFB]'
								} rounded-md hover:cursor-pointer`}
								onClick={() => {
									setPage(item)
									navigator(item.page)
								}}
							>
								{item.title}
							</p>
						))}
					</div>
					{loggedInUser ? (
						<p
							className={`flex flex-row items-center px-2 py-2 text-sm font-[500] text-[#344054] ${' hover:bg-[#F9FAFB]'} rounded-md hover:cursor-pointer`}
							onClick={() => {
								firebase.auth().signOut()
								localStorage.setItem('user', JSON.stringify(null))
								localStorage.setItem('token', JSON.stringify(null))
								navigator('/home/about')
							}}
						>
							<Icon path={mdiLogout} size={1} className='text-red-400' />
							<p size={1} className='text-red-400 pl-2 '>
								Logout
							</p>
						</p>
					) : null}
				</div>
			</Drawer>
		</div>
	)
}

export default PrimaryHeader
