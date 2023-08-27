import { Button } from 'antd'
import PrimaryHeader from '../../components/headers/primaryHeader'
import BG6 from '../../assets/drive-assets/outsite-co-R-LK3sqLiBw-unsplash.jpg'
import { useNavigate } from 'react-router-dom'

const Pricing = () => {
	const navigator = useNavigate()

	return (
		<div className='overflow-y-scroll'>
			<PrimaryHeader />
			<div className='flex flex-col pt-12 items-center justify-center text-center max-sm:px-8 mb-32'>
				<p className='text-[38px] max-sm:text-2xl leading-[3rem] text-[#1A202C] font-bold pb-6'>Choose a plan to start swapping and subleasing</p>
				<p className='text-[20px] max-sm:text-base text-[#475467] font-[500] sm:pb-16 max-sm:pb-8'>Explore our global community free for a month</p>

				<div className='relative flex flex-col items-center justify-center space-y-4 py-8 px-10 sm:w-[550px] max-sm:w-full rounded-[80px] overflow-hidden'>
					<div className='absolute right-0 left-0 top-0 bottom-0 h-full w-full -z-10'>
						<img src={BG6} alt='' className='h-full w-full object-cover opacity-40' />
					</div>

					<p className='text-[#1A202C] text-[30px] leading-9 font-[600]'>Classic</p>
					<p className='text-[#1A202C] text-[30px] leading-9 font-[600]'>AUD $17</p>
					<p className='text-[#1A202C] text-[20px] leading-9 font-[400] pb-3'>Per month, billed annually</p>
					<Button className='btn-primary !h-[50px] ' onClick={() => navigator('/auth/signup')}>
						Start Free Trial
					</Button>
				</div>
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</div>
	)
}
export default Pricing
