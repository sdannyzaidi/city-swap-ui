import { Button, Dropdown, Menu } from 'antd'
import { HeaderLogo } from '@components'
import ProfileLogo from '../../assets/images/profile.png'
import { mdiDotsVertical, mdiLogout, mdiPlus } from '@mdi/js'
import { useLocation, useNavigate } from 'react-router-dom'
import Icon from '@mdi/react'
import ResizeObserver from 'rc-resize-observer'
import { useState } from 'react'
import { firebase } from '../../auth/firebase/config'
import { useSetRecoilState } from 'recoil'
import { userAtom } from '@atoms'
const PrimaryHeader = (props) => {
	const { setHeaderHeight } = props
	const { pathname } = useLocation()
	const navigator = useNavigate()
	const setUserAtom = useSetRecoilState(userAtom)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const [page, setPage] = useState({ title: 'Home', page: '/home/about' })
	const [visible, setVisible] = useState(false)
	const [width, setWidth] = useState(1000)
	const DropdownMenu = (
		<Menu className='flex flex-col justify-between pb-4 !w-48 !h-full'>
			<div className='flex flex-col sm:py-4 max-md:py-2 md:px-6 max-md:px-2 space-y-1'>
				{(loggedInUser
					? [
							{ title: 'Home', page: '/home/about' },
							{ title: 'Profile', page: '/profile' },
							{ title: 'Messages', page: '/chat' },
							{ title: 'Requests & Bookings', page: '/requests-bookings' },
					  ]
					: [
							{ title: 'How It Works', page: '/how-it-works' },
							{ title: 'Pricing', page: '/pricing' },
							{ title: 'FAQs', page: '/faqs' },
					  ]
				).map((item) => (
					<Menu.Item
						className={`px-2 py-2 text-sm font-[500] text-[#344054] hover:bg-[#F5F5F5] ${
							pathname === item.page ? 'text-[#101828]' : ''
						} rounded-md hover:cursor-pointer`}
						onClick={() => {
							setPage(item)
							navigator(item.page)
						}}
					>
						{item.title}
					</Menu.Item>
				))}
				{loggedInUser ? (
					<Menu.Item
						className={`flex flex-row items-center px-2 py-2 text-sm font-[500] text-[#344054] hover:bg-[#F5F5F5] rounded-md hover:cursor-pointer`}
						onClick={() => {
							firebase.auth().signOut()
							setUserAtom(null)
							localStorage.setItem('user', JSON.stringify(null))
							localStorage.setItem('token', JSON.stringify(null))
							navigator('/home/about')
						}}
					>
						<div className='flex flex-row items-center'>
							<Icon path={mdiLogout} size={0.7} className='text-red-400' />
							<p size={1} className='text-red-400 pl-2 '>
								Logout
							</p>
						</div>
					</Menu.Item>
				) : null}
			</div>
		</Menu>
	)

	return (
		<div>
			<ResizeObserver
				onResize={({ width, height }) => {
					setWidth(width)
					setHeaderHeight && setHeaderHeight(height)
				}}
			>
				<div
					className='fixed top-0 z-50  flex flex-row justify-between items-center border-b border-solid border-[#D0D5DD] w-full bg-white px-8 max-md:px-4 max-md:py-2 py-4'
					id='primary-header'
				>
					<div className='flex flex-row items-center cursor-pointer' onClick={() => navigator('/home')}>
						<HeaderLogo width={width} />
					</div>
					<div className='flex flex-row justify-evenly items-center space-x-4'>
						{width > 768 ? (
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
									<p className=' text-[16px] hover:cursor-pointer hover:text-[#717171]' onClick={() => navigator('/how-it-works')}>
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
									<Icon path={mdiPlus} size={width > 768 ? 1 : 0.7} className='text-white' />
									<p className={width > 768 ? 'mx-2' : 'mx-1'}>Add Listing</p>
								</Button>
								{width > 768 ? (
									<div className='h-11 w-11 rounded-full border border-solid border-black-75 hover:cursor-pointer' onClick={() => navigator('/profile')}>
										<img className='h-full w-full rounded-full bg-black-75' src={loggedInUser?.profilePicture || ProfileLogo} alt='' />
									</div>
								) : (
									<div className='mr-4' onClick={() => setVisible(true)}>
										<Dropdown overlay={DropdownMenu} trigger={['click']} onClick={(e) => e.stopPropagation()}>
											<Icon path={mdiDotsVertical} size={1.2} className='text-[#555555]' />
										</Dropdown>
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
								{width > 768 ? null : (
									<div className='mr-4' onClick={() => setVisible(true)}>
										<Dropdown overlay={DropdownMenu} trigger={['click']} onClick={(e) => e.stopPropagation()}>
											<Icon path={mdiDotsVertical} size={1.2} className='text-[#555555]' />
										</Dropdown>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</ResizeObserver>
		</div>
	)
}

export default PrimaryHeader
