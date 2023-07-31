import { Carousel } from 'antd'
import NoImage from '../../../assets/images/icon-no-image.svg'
import { mdiStar } from '@mdi/js'
import Icon from '@mdi/react'

const Testimonials = ({ listing }) => {
	const testimonials = [
		{ name: 'Adil', description: 'Amazing Experience' },
		{ name: 'Mohid', description: 'Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.' },
	]
	return (
		<Carousel autoplay>
			{testimonials?.map((testimonial, t_index) => (
				<div>
					<div className='bg-[#F9FAFB] w-full h-[30rem] flex flex-col items-center justify-center text-center px-44'>
						<p className='text-[#101828] font-[700] text-[36px] pb-8'>{testimonial.description}</p>
						<img src={testimonial?.user?.profilePic || NoImage} alt='' className='h-16 w-16 rounded-full object-cover' />
						<p className='text-[#101828] font-[600] text-lg py-2'>{testimonial.name}</p>
						<div className='flex flex-row items-center'>
							{Array.from({ length: 5 }, (_, index) => (
								<Icon
									key={t_index + '_' + index}
									path={mdiStar}
									size={1}
									className={`${index >= (testimonial.rating || 3) ? 'text-[#91919159]' : 'text-[#FFAC33]'}`}
								/>
							))}
						</div>
					</div>
				</div>
			))}
		</Carousel>
	)
}

export default Testimonials
