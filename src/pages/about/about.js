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

const Heading = ({ children }) => (
	<p className='sm:text-[3.1rem] max-md:text-[2.5rem] sm:leading-[3.25rem] max-md:leading-[2.9rem] text-[#1A202C] font-bold pb-6'>{children}</p>
)
const Paragraph = ({ children }) => <p className='sm:text-[20px] max-md:text-base text-[#1A202C] font-[400] opacity-50'>{children}</p>
const RoundedImage = ({ src, alt }) => (
	<div className='md:basis-1/2 max-lg:basis-full lg:h-[360px] max-lg:h-[340px] align-top text-center'>
		<img className='rounded-2xl lg:h-full lg:w-auto max-lg:w-full max-lg:h-[360px] object-cover' src={src} alt={alt} />
	</div>
)
const About = () => {
	const { homeRef } = useOutletContext()
	return (
		<>
			<div className='w-full flex lg:flex-row max-lg:flex-col py-[4.5rem] md:px-[7rem] max-lg:px-8 :space-x-40 max-lg:space-y-12 bg-[#F1F1F1]'>
				<div className='flex flex-col lg:basis-1/2 max-lg:basis-full'>
					<Heading>Discover the world, one swap at a time.</Heading>
					<Paragraph>
						Embark on a remarkable journey to discover the captivating wonders of the world, as we empower you to expand your horizons and forge meaningful
						connections, all through the transformative power of swapping; together, let's uncover the globe's hidden gems, unravel diverse cultures, and create a
						global community of passionate explorers—one swap at a time.
					</Paragraph>
				</div>
				<RoundedImage src={BG8} alt='' />
			</div>
			<div className='w-full h-fit flex lg:flex-row max-lg:flex-col'>
				<div className='basis-1/3'>
					<div className='relative h-full'>
						<div className='w-full h-[364px] overflow-hidden'>
							<img className='object-cover h-full w-full' src={BG9} alt='' />
						</div>

						<div className='absolute top-0 bottom-0 right-0 left-0 h-[364px] w-full bg-[#4444449C]'></div>

						<div
							className='absolute flex flex-col items-center justify-center sm:p-0 max-lg:px-6 left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							// style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold sm:text-[3rem] max-md:text-3xl underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>
								Sustainability
							</p>
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
							className='absolute flex flex-col items-center justify-center  sm:p-0 max-md:px-6 left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							// style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold sm:text-[3rem] max-md:text-3xl underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>
								Freedom
							</p>
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
							className='absolute flex flex-col items-center justify-center  sm:p-0 max-md:px-6 left-0 right-0 top-0 bottom-0 my-auto mx-auto text-center h-[200px]'
							// style={{ width: homeRef.current?.clientWidth / 3 - 160 }}
						>
							<p className='text-white font-bold sm:text-[3rem] max-md:text-3xl underline decoration-[#9B83CB] decoration-[2.5px] underline-offset-[1rem] mb-6'>
								Comfort
							</p>
							<p className='text-white font-[400] text-lg'>We provide high-quality and comfortable accommodation options that make travel easy and enjoyable.</p>
						</div>
					</div>
				</div>
			</div>
			<div className='w-full flex lg:flex-row  max-lg:flex-col py-[4.5rem] md:px-[7rem] max-md:px-8 lg:space-x-40 max-lg:space-y-12 bg-[#F1F1F1]'>
				<div className='flex flex-col sm:basis-1/2 max-md:basis-full'>
					<Heading>Don’t wanna pay? Swap or Sublease your property instead!</Heading>
					<Paragraph>
						Our platform allows you to swap homes with other travellers, so you can enjoy a new city without the cost of expensive accommodations. But even if you
						can’t find a home swap, CitySwapp makes it easy to find and sublease affordable properties in your destination city. And if you want to sublease your
						own home while you are away, CitySwapp can help you find trustworthy renters.
					</Paragraph>
				</div>
				<RoundedImage src={BG2} alt='' />
			</div>
			<div className='w-full flex lg:flex-row max-lg:flex-col lg:pr-0 lg:pl-24 md:px-[7rem] max-lg:px-8 lg:pt-[4.5rem] max-lg:pb-[2rem] max-lg:pt-[2rem]  justify-between bg-[#F6F5FE]'>
				<div className='max-lg:hidden rounded-[247.57px_22px_22px_22px] basis-[500px] h-[570px] overflow-hidden'>
					<img className='object-cover h-full w-full' src={BG6} alt='' />
				</div>
				<div className='flex flex-col lg:basis-1/2 max-lg:basis-full max-lg:space-y-8 my-auto mx-auto lg:max-w-[300px] xl:max-w-[420px]  max-lg:pr-0'>
					<p className='text-[2rem] leading-[2.1rem] text-[#474747] font-bold pb-6 text-left'>
						<span className='text-[#832AF6]'>Community</span> you'll adore
					</p>
					<p className='text-[16px] text-[#666666] font-[300]'>
						We believe that travel is about more than just seeing new places - it's about building connections and forming a global community. We are committed to
						fostering a sense of community among our members and creating opportunities for people to connect and share their love of travel.
					</p>
					<div className='max-lg:block lg:hidden max-lg:mt-8'>
						<RoundedImage src={BG6} alt='' />
					</div>
				</div>
			</div>
			<div className='w-full flex lg:flex-row max-lg:flex-col lg:pl-[0] lg:pr-24 md:px-[7rem] max-lg:px-8 lg:pt-[4.5rem] max-lg:pb-[2rem] max-lg:pt-[2rem]  justify-between bg-[#F6F5FE] sm:pb-32'>
				<div className='flex flex-col lg:basis-1/2  lg:max-w-[300px] xl:max-w-[420px] lg:mx-auto my-auto max-lg:pl-0 max-lg:basis-full '>
					<p className='text-[2rem] leading-[2.1rem] text-[#474747] font-bold pb-6 text-left'>
						<span className='text-[#832AF6]'>People</span> you'll trust
					</p>
					<p className='text-[16px] text-[#666666] font-[300] max-lg:pb-8'>
						Trust is essential for successful home swapping. We aim to create a community of reliable and passionate travelers who value integrity and making a
						positive impact.
					</p>
					<div className='max-lg:block lg:hidden'>
						<RoundedImage src={BG7} alt='' />
					</div>
				</div>
				<div className='max-lg:hidden rounded-[247.57px_22px_22px_22px] basis-[500px] h-[570px] overflow-hidden'>
					<img className='object-cover h-full w-full' src={BG7} alt='' />
				</div>
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</>
	)
}

export default About
