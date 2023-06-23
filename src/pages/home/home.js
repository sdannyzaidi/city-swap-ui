import { Button, Layout } from 'antd'
import { HeaderLogo } from '@components'
import HeroBackground from '../../assets/images/prague.webp'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
const { Header } = Layout
const Home = (props) => {
	const navigator = useNavigate()
	const homeRef = useRef(null)
	return (
		<div className='overflow-y-scroll' ref={homeRef}>
			<div className='flex flex-row justify-between items-center w-full bg-white border-b-4 border-[#9B83CB] px-8 py-4'>
				<div className='flex flex-row'>
					<HeaderLogo />
				</div>
				<div className='flex flex-row justify-evenly items-center space-x-4'>
					<div className='flex flex-row items-center space-x-6 mr-6 text-[#1B1B1B] font-semibold'>
						<p className=' text-[16px]'>How It works</p>
						<p className=' text-[16px]'>Pricing</p>
						<p className=' text-[16px]'>FAQs</p>
					</div>
					<div className='flex flex-row items-center space-x-4'>
						<Button className='rounded-lg border-2 border-[#9B83CB] text-[#9B83CB] font-[500] h-11  text-[16px]' onClick={() => navigator('/auth/login')}>
							Login
						</Button>
						<Button className='rounded-lg bg-[#9B83CB] text-white font-[500] h-11  text-[16px] hover:text-white' onClick={() => navigator('/auth/signup')}>
							Start Free Trial
						</Button>
					</div>
				</div>
			</div>
			<div className='w-full h-[600px] overflow-y-clip'>
				<img className='w-full h-auto' src={HeroBackground} alt='' />
			</div>
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
						<img className='h-full w-auto' src={HeroBackground} alt='' />
					</div>
				</div>
			</div>
			<div className='w-full h-fit flex flex-row'>
				<div className='basis-1/3'>
					<div className='relative'>
						<div className='h-[364px] bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/prague.webp")]' />

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
					<div className='relative'>
						<div className='h-[364px] bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/prague.webp")]' />
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
					<div className='relative'>
						<div className='h-[364px] bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/prague.webp")]' />

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
			<div className='w-full flex flex-row py-[4.5rem] px-[7rem] space-x-40 bg-[#F1F1F1]'>
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
						<img className='h-full w-auto' src={HeroBackground} alt='' />
					</div>
				</div>
			</div>
			<div className='w-full flex flex-row px-[10rem] pt-[4.5rem] justify-between bg-[#F6F5FE]'>
				<div className='rounded-[247.57px_22px_22px_22px] basis-[500px] h-[570px] align-middle text-center bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/prague.webp")]'></div>
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
				<div className='rounded-[247.57px_22px_22px_22px] h-[570px] basis-[500px] align-middle text-center bg-[url("/Users/adilaslam/Documents/personal/cityswap/src/assets/images/prague.webp")]'></div>
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</div>
	)
}

export default Home
