import { PrimaryHeader, Footer } from '@components'
import { useEffect } from 'react'

const AboutUs = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<div className='flex flex-col lg:px-32 md:px-12 max-md:px-6 items-center pt-32 pb-32 min-h-[700px]'>
				<div className='flex flex-col items-start'>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						Welcome to our home swapping and subleasing platform! We are excited to introduce ourselves and provide you with an overview of who we are, our
						mission, and our set of values.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>About Us:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						At City Swapp, we believe that travel should be accessible, enriching, and personalized. We have created a dynamic online platform that connects
						individuals and families from around the world, facilitating home swapping and subleasing opportunities. Our goal is to revolutionize the way people
						experience travel, offering a more affordable, authentic, and flexible alternative to traditional accommodation options.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Our Mission:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						Our mission is to empower travelers to explore the world while fostering a sense of belonging, trust, and shared experiences. We aim to create a
						global community where individuals can connect, exchange homes, and sublease properties, enabling them to immerse themselves in local cultures and
						create lifelong memories.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Our Values:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						At our core, we embrace a set of values that drive our mission to create a sustainable, free, and trusted community of comfort-seeking individuals.
						Our platform is built on the principles of sustainability, freedom, trust, community, and comfort, which guide us in providing you with an exceptional
						home-sharing experience.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Sustainability:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						We firmly believe in promoting sustainable living practices. By facilitating home swapping and subleasing, we encourage responsible use of existing
						resources and reduce the carbon footprint associated with traditional accommodation options. We empower our community members to make environmentally
						conscious choices while exploring new places, ensuring a brighter future for generations to come.{' '}
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Freedom:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						We understand the importance of freedom when it comes to traveling and living arrangements. Our platform offers you the flexibility to choose from a
						wide range of homes, giving you the freedom to create your perfect escape or find a temporary home in a new city. Whether you're a digital nomad
						seeking adventure or a family looking to explore new destinations, we provide the tools for you to embrace a lifestyle of freedom and exploration.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Trust:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						Trust is the foundation of any successful community, and we take it seriously. We have implemented a robust verification process to ensure that all
						members are genuine and trustworthy. Through user reviews, ratings, and secure payment systems, we foster a culture of trust and reliability within
						our community. We want you to feel confident and secure when sharing your home or staying in someone else's, enabling you to forge meaningful
						connections and build long-lasting relationships.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Community:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						At the heart of our platform is a vibrant and supportive community of like-minded individuals. We believe that sharing experiences and connecting with
						others is the essence of a fulfilling journey. Our platform facilitates interactions, allowing you to meet and engage with fellow travelers,
						homeowners, and guests who share your passion for exploration, cultural exchange, and personal growth. Together, we build a global community where
						lifelong connections and friendships are made.
					</p>
					<p className='text-[#9B83CB] font-[700] text-[24px] leading-7 pb-6'>Comfort:</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						We understand that comfort is essential when it comes to feeling at home, regardless of your location. We strive to ensure that every listing on our
						platform meets high standards of quality, cleanliness, and amenities. From cozy apartments to spacious villas, we curate a diverse collection of homes
						to suit various preferences and budgets. Our goal is to provide you with a seamless and enjoyable experience, where you can relax, unwind, and feel
						truly comfortable during your stay.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>
						We are dedicated to making your home swapping and subleasing experience memorable, sustainable, and rewarding. Join our community today and embrace
						the values of sustainability, freedom, trust, community, and comfort that guide us towards a shared vision of a better way to travel and live.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pb-12'>Start your journey with us and unlock a world of possibilities!</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default AboutUs
