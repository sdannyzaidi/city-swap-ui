import { PrimaryHeader, Footer } from '@components'
import { useEffect } from 'react'

const HowItWorks = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<div className='flex flex-col lg:px-32 md:px-12 max-md:px-6 items-center pt-32 pb-32 min-h-[700px]'>
				<p className='font-bold text-[#9B83CB] text-[36px] leading-[40px] pb-12'>How it works</p>
				<div className='flex flex-col items-start'>
					<p className='font-[400] text-[#333333] text-[16px] leading-[24px] pb-12'>Follow these simple steps to get it started. </p>

					<p className='font-bold text-[#9B83CB] text-[24px] leading-[40px] pb-3'>Step 1:</p>
					<p className='font-[400] text-[#333333] text-[16px] leading-[24px] pb-8'>
						Ready to live the citizen of the world lifestyle? Then start your free trail and list your home on the platform. Select whether to list for swap or
						sublease.
					</p>
					<p className='font-bold text-[#9B83CB] text-[24px] leading-[40px] pb-3'>Step 2:</p>
					<p className='font-[400] text-[#333333] text-[16px] leading-[24px] pb-8'>
						Look for homes in destinations that interest you and send swap requests. Send personalised messages and respond to other members requests that you
						receive. You can communicate with the other members via the messaging system.
					</p>
					<p className='font-bold text-[#9B83CB] text-[24px] leading-[40px] pb-3'>Step 3:</p>
					<p className='font-[400] text-[#333333] text-[16px] leading-[24px] pb-8'>
						The swap request must be approved by the host. If swap dates do not match, the platform will give suggestions to sublease on the platform instead and
						look for other subleasing properties that have been listed by members or change the swap dates that match for the direct swap.  
					</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default HowItWorks
