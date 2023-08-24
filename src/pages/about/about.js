import { useOutletContext } from 'react-router-dom'
import BG1 from '../../assets/drive-assets/ben-o-bro-wpU4veNGnHg-unsplash.jpg'
import BG2 from '../../assets/drive-assets/helena-lopes-e3OUQGT9bWU-unsplash.jpg'
import BG3 from '../../assets/drive-assets/michael-olsen-vNIgKjZbJW0-unsplash.jpg'
import BG4 from '../../assets/drive-assets/dallas-reedy-NEJFAS1Okho-unsplash.jpg'
import BG5 from '../../assets/drive-assets/spacejoy-nEtpvJjnPVo-unsplash.jpg'
import BG6 from '../../assets/drive-assets/kylie-lugo-t0BavJY0M-U-unsplash.jpg'
import BG7 from '../../assets/drive-assets/community.jpeg'
import BG8 from '../../assets/drive-assets/houses-top.jpeg'
import BG9 from '../../assets/drive-assets/sustainability.jpeg'
import BG10 from '../../assets/drive-assets/freedom.jpeg'

const About = () => {
	const { homeRef } = useOutletContext()
	return (
		<>
			<div className='w-full flex flex-row py-[4.5rem] px-[7rem] space-x-40 bg-[#F1F1F1]'>
				<div className='flex flex-col basis-1/2'>
					<p className='text-[3.1rem] leading-[3.25rem] text-[#1A202C] font-bold pb-6'>Discover the world, one swap at a time.</p>
					<p className='text-[20px] text-[#1A202C] font-[400] opacity-50'>
						Embark on a remarkable journey to discover the captivating wonders of the world, as we empower you to expand your horizons and forge meaningful
						connections, all through the transformative power of swapping; together, let's uncover the globe's hidden gems, unravel diverse cultures, and create a
						global community of passionate explorers—one swap at a time.
					</p>
				</div>
				<div className='basis-1/2 h-[360px] align-top text-center'>
					<div className='rounded-2xl overflow-clip'>
						<img className='h-full w-auto' src={BG8} alt='' />
					</div>
				</div>
			</div>
			<div className='w-full h-fit flex flex-row'>
				<div className='basis-1/3'>
					<div className='relative h-full'>
						<div className='w-full h-[364px] overflow-hidden'>
							<img className='object-cover h-full w-full' src={BG9} alt='' />
						</div>

						<div className='absolute top-0 bottom-0 right-0 left-0 h-[364px] w-full bg-[#4444449C]'></div>

						<div
							className='absolute flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold text-[3rem] underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>Sustainability</p>
							<p className='text-white font-[400] text-lg'>We are committed to promoting sustainable travel and reducing our impact on the environment.</p>
						</div>
					</div>
				</div>
				<div className='basis-1/3'>
					<div className='relative h-full'>
						<div className='w-full h-[364px] overflow-hidden'>
							<img className='object-cover h-full w-full' src={BG10} alt='' />
						</div>
						<div className='absolute top-0 bottom-0 right-0 left-0 h-[364px] w-full bg-[#4444449C]'></div>

						<div
							className='absolute flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold text-[3rem] underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>Freedom</p>
							<p className='text-white font-[400] text-lg'>
								We provide affordable and flexible travel options for everyone to explore the world on their own terms.
							</p>
						</div>
					</div>
				</div>
				<div className='basis-1/3'>
					<div className='relative h-full'>
						<div className='w-full h-[364px] overflow-hidden'>
							<img className='object-cover h-full w-full' src={BG5} alt='' />
						</div>
						<div className='absolute top-0 bottom-0 right-0 left-0 h-[364px] w-full bg-[#4444449C]'></div>
						<div
							className='absolute flex flex-col items-center justify-center left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold text-[3rem] underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>Comfort</p>
							<p className='text-white font-[400] text-lg'>We provide high-quality and comfortable accommodation options that make travel easy and enjoyable.</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row  py-[4.5rem] px-[7rem] space-x-40 bg-[#F1F1F1]'>
				<div className='flex flex-col basis-1/2'>
					<p className='text-[3.1rem] leading-[3.25rem] text-[#1A202C] font-bold pb-6'>Don’t wanna pay? Swap or Sublease your property instead!</p>
					<p className='text-[20px] text-[#1A202C] font-[400] opacity-50'>
						Our platform allows you to swap homes with other travellers, so you can enjoy a new city without the cost of expensive accommodations. But even if you
						can’t find a home swap, CitySwapp makes it easy to find and sublease affordable properties in your destination city. And if you want to sublease your
						own home while you are away, CitySwapp can help you find trustworthy renters.
					</p>
				</div>
				<div className='basis-1/2 h-[360px] align-top text-center'>
					<div className='rounded-2xl overflow-clip'>
						<img className='h-full w-auto' src={BG2} alt='' />
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row px-[10rem] pt-[4.5rem] justify-between bg-[#F6F5FE]'>
				<div className='rounded-[247.57px_22px_22px_22px] basis-[500px] h-[570px] overflow-hidden'>
					<img className='object-cover h-full w-full' src={BG6} alt='' />
				</div>
				<div className='flex flex-col basis-1/2 my-auto pr-32'>
					<p className='text-[2rem] leading-[2.1rem] text-[#474747] font-bold pb-6 text-left'>
						<span className='text-[#832AF6]'>Community</span> you'll adore
					</p>
					<p className='text-[16px] text-[#666666] font-[300]'>
						We believe that travel is about more than just seeing new places - it's about building connections and forming a global community. We are committed to
						fostering a sense of community among our members and creating opportunities for people to connect and share their love of travel.
					</p>
				</div>
			</div>
			<div className='w-full flex flex-row px-[10rem] justify-between pb-[4.5rem] bg-[#F6F5FE]'>
				<div className='flex flex-col basis-1/2 my-auto pl-32'>
					<p className='text-[2rem] leading-[2.1rem] text-[#474747] font-bold pb-6 text-left'>
						<span className='text-[#832AF6]'>People</span> you'll trust
					</p>
					<p className='text-[16px] text-[#666666] font-[300]'>
						Trust is essential for successful home swapping. We aim to create a community of reliable and passionate travelers who value integrity and making a
						positive impact.
					</p>
				</div>
				<div className='rounded-[247.57px_22px_22px_22px] basis-[500px] h-[570px] overflow-hidden'>
					<img className='object-cover h-full w-full' src={BG7} alt='' />
				</div>
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</>
	)
}

export default About
