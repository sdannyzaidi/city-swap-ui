import { PrimaryHeader, Footer } from '@components'
import { useEffect } from 'react'
const Privacy = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<div className='flex flex-col lg:px-32 md:px-12 max-md:px-6 items-center pt-32 pb-32 min-h-[700px]'>
				<p className='font-bold text-[#9B83CB] text-[36px] leading-[40px] pb-12'>Website Data Privacy Policy</p>
				<p className='font-[400] text-[16px] capitalize w-full text-start'>last updated: 14th june 2023</p>
				<div className='flex flex-col items-start space-y-12'>
					<p className='text-[#272C2D] font-[700] text-[16px]'>Privacy Policy</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						This Privacy Policy (hereinafter referred to as the ‘Policy’) is that of the company that publishes the CitySwapp.com Website (hereinafter referred to
						as ‘Website’):
					</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>CitySwapp.com Inc. sydney, Australia.</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						As the data controller,City Swapp Inc is very committed to protecting your personal data and respecting your privacy.
					</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						The purpose of this Policy is to inform you of our practices regarding the collection, use and sharing of information that you may provide to us when
						you use our City Swapp website, accessible at www.CitySwapp.com/en/ (hereinafter referred to as City Swapp).
					</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						We encourage you to carefully read this Policy, which applies when you use City Swapp, in order to know and understand our practices regarding the
						processing of your personal data that we handle as well as your rights.
					</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						This Policy shall take effect as of 14/06/2023. It is subject to change at any time; in the event of substantial changes, we will inform you within a
						reasonable time period and, if necessary, request your consent again before it comes into effect. You are responsible for ensuring we have an
						up-to-date active and deliverable email address for you, and for periodically visiting our Website and this privacy policy to check for any changes.
					</p>
					<p className='text-[#272C2D] font-[700] text-[16px]'>Purpose of the Policy</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						To enable you to make the best use of our City Swapp service, we may collect and use some of your information. This Policy aims to inform you of our
						practices and the reasons for them, in order to guarantee transparency for our users.
					</p>
					<p className='text-[#272C2D] font-[400] text-[16px]'>
						We undertake to use your information in compliance with the laws relating to the protection of personal data.
					</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default Privacy
