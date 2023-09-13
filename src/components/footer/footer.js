import { useNavigate } from 'react-router-dom'
import FooterLogo from '../../assets/logos/footerLogo.png'

const Footer = () => {
	const navigator = useNavigate()
	return (
		<div className='w-full bg-[#664F94] h-[280px] flex flex-row items-center'>
			<div className='flex md:flex-row max-md:flex-col  w-full md:justify-between lg:px-32 md:px-12 max-md:px-6  md:items-end max-md:items-center max-md:justify-between max-md:mx-auto  max-h-[250px]'>
				<div className='flex flex-col justify-center items-center'>
					<img src={FooterLogo} alt='logo' className='max-md:w-[75px] md:w-[150px] h-auto lg:w-[200px] ' />
					<p className='text-white font-bold lg:text-sm md:text-xs max-md:text-[10px] max-md:font-[400]'>Copyright 2022 CitySwapp</p>
				</div>
				<div className='md:hidden max-md:block w-full h-1 border-b border-solid border-[#fafafa55] max-md:pt-6'></div>
				<div className='flex md:flex-row max-md:flex-col max-md:items-center max-md:justify-between md:space-x-9 max-md:pt-8 max-md:space-y-4'>
					<p className='text-[#E5E5E5] hover:text-white cursor-pointer font-[400] lg:text-sm sm:text-xs' onClick={() => navigator('/privacy')}>
						Privacy Policy
					</p>
					<p className='text-[#E5E5E5] hover:text-white cursor-pointer font-[400] lg:text-sm sm:text-xs' onClick={() => navigator('/terms-and-conditions')}>
						Terms & Conditions
					</p>
					<p className='text-[#E5E5E5] hover:text-white cursor-pointer font-[400] lg:text-sm sm:text-xs' onClick={() => navigator('/about-us')}>
						About Us
					</p>
					<p className='text-[#E5E5E5] hover:text-white cursor-pointer font-[400] lg:text-sm sm:text-xs' onClick={() => navigator('/contact')}>
						Contact
					</p>
				</div>
			</div>
		</div>
	)
}

export default Footer
