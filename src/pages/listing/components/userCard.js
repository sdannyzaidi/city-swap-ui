import Icon from '@mdi/react'
import ProfileLogo from '../../../assets/images/profile.png'
import { mdiMapMarkerOutline, mdiStar } from '@mdi/js'
import { Button } from 'antd'

const UserCard = ({ listing, setVisible }) => {
	const user = listing?.user
	return (
		<div className='basis-1/3 px-[27px] py-[22px] w-full rounded-lg border border-solid border-[#F2F4F7] mt-12'>
			<div className='flex flex-col justify-between items-center'>
				<div className='flex flex-row justify-start  items-start'>
					<div className='h-16 w-16 rounded-full border border-solid border-black-75'>
						<img className='h-full w-full rounded-full bg-black-75' src={user?.profilePicture || ProfileLogo} alt='' />
					</div>
					<div className='flex flex-col pl-4'>
						<p className='text-[#333333] text-[20px] font-bold pb-[9px]'> {user?.name}</p>
						<div className='flex flex-row items-center '>
							<Icon path={mdiMapMarkerOutline} size={0.7} className='text-[#9B83CB]' />
							<p className='text-[#9191919c] text-lg pl-2 font-[600]'>{user?.location || 'None'}</p>
						</div>
						<div className='flex flex-row items-center'>
							{Array.from({ length: 5 }, (_, index) => (
								<Icon key={index} path={mdiStar} size={1} className='text-[#FFAC33]' />
							))}
							<p className='text-[#9191919c] text-sm pl-8 font-[600]'>{'14'}&nbsp;exchanges</p>
						</div>
					</div>
				</div>
				<div className='flex flex-row justify-start items-center w-full space-x-4 pt-8'>
					<Button className='btn-primary' onClick={() => setVisible(true)}>
						Request Owner
					</Button>
					<Button className='btn-primary !bg-[#F9F5FF] !text-[#6941C6] hover:!text-[#9374da] !border-none'>Message</Button>
				</div>
			</div>
		</div>
	)
}

export default UserCard
