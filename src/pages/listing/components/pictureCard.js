import { useRef, useState } from 'react'
import NoImage from '../../../assets/images/icon-no-image.svg'
import { Modal } from 'antd'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import Icon from '@mdi/react'

const PictureCard = ({ listing }) => {
	const divRef = useRef(null)
	const picRef = useRef(null)

	const [vewImages, setViewImages] = useState(false)
	const [currImage, setCurrImage] = useState(0)
	return (
		<div className='flex flex-row sm:px-44'>
			<div
				className='w-full grid grid-cols-4 grid-rows-2 gap-x-5 gap-y-4  max-sm:hidden'
				style={{ height: ((divRef.current?.clientWidth || 1366) - 300) / 2 }}
				ref={divRef}
			>
				{[...(listing?.property.pictures || []), 'example.com', 'example.com', 'example.com'].slice(0, 5).map((picture, index) => (
					<div className={`${index === 0 ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'}`}>
						{index === 4 && listing?.property.pictures?.length > 5 ? (
							<div className='relative h-full w-full rounded-[16px] hover:cursor-pointer' onClick={() => setViewImages(true)}>
								<div className='absolute right-0left-0 top-0 bottom-0 h-full w-full rounded-[16px] bg-[#4444449C] hover:bg-[#979797a7] hover:cursor-pointer'>
									<div className='flex flex-col w-full h-full items-center justify-center text-center'>
										<p className='text-white font-bold text-3xl'>+&nbsp;{listing?.property.pictures?.length - 2}</p>
										<p className='text-white font-semibold text-lg'>View All</p>
									</div>
								</div>

								<img src={picture && !picture.includes('example.com') ? picture : NoImage} alt='' className='h-full w-full rounded-[16px] object-cover' />
							</div>
						) : (
							<img src={picture && !picture.includes('example.com') ? picture : NoImage} alt='' className='h-full w-full rounded-[16px] object-cover' />
						)}
					</div>
				))}
			</div>
			<div className='sm:hidden max-sm:block'>
				<div className='flex flex-row items-center'>
					<div className='basis-[10%] flex flex-row justify-center'>
						<Icon
							path={mdiChevronLeft}
							size={2}
							className={`${currImage > 0 ? 'text-[#333333] hover:cursor-pointer' : 'text-[#91919164] hover:cursor-not-allowed'}`}
							onClick={() => currImage > 0 && setCurrImage(currImage - 1)}
						/>
					</div>
					<div className='basis-[80%] text-center flex flex-row justify-center' ref={picRef}>
						<img
							alt='example'
							width={picRef.current?.clientWidth || 500}
							className='w-full h-auto rounded-[16px] object-scale-down'
							src={
								listing?.property.pictures[currImage] && !listing?.property.pictures[currImage].includes('example.com')
									? listing?.property.pictures[currImage]
									: NoImage
							}
						/>
					</div>

					<div className='basis-[10%] flex flex-row justify-center'>
						<Icon
							path={mdiChevronRight}
							size={2}
							className={`${
								currImage < listing?.property.pictures.length - 1 ? 'text-[#333333] hover:cursor-pointer' : 'text-[#91919164] hover:cursor-not-allowed'
							}`}
							onClick={() => currImage < listing?.property.pictures.length - 1 && setCurrImage(currImage + 1)}
						/>
					</div>
				</div>
			</div>
			<Modal open={vewImages} footer={null} onCancel={() => setViewImages(false)} className='!w-2/3'>
				<div className='flex flex-row items-center justify-center pt-6 text-sm font-[500] '>
					Viewing&nbsp;{currImage + 1}&nbsp;of&nbsp;{listing?.property.pictures.length}
				</div>
				<div className='flex flex-row items-center !h-[500px]'>
					<div className='basis-[10%] flex flex-row justify-center'>
						<Icon
							path={mdiChevronLeft}
							size={2}
							className={`${currImage > 0 ? 'text-[#333333] hover:cursor-pointer' : 'text-[#91919164] hover:cursor-not-allowed'}`}
							onClick={() => currImage > 0 && setCurrImage(currImage - 1)}
						/>
					</div>
					<div className='basis-[80%] text-center flex flex-row justify-center' ref={picRef}>
						<img
							alt='example'
							width={picRef.current?.clientWidth || 500}
							className='h-auto max-h-[450px] rounded-[16px] object-scale-down'
							src={
								listing?.property.pictures[currImage] && !listing?.property.pictures[currImage].includes('example.com')
									? listing?.property.pictures[currImage]
									: NoImage
							}
						/>
					</div>

					<div className='basis-[10%] flex flex-row justify-center'>
						<Icon
							path={mdiChevronRight}
							size={2}
							className={`${
								currImage < listing?.property.pictures.length - 1 ? 'text-[#333333] hover:cursor-pointer' : 'text-[#91919164] hover:cursor-not-allowed'
							}`}
							onClick={() => currImage < listing?.property.pictures.length - 1 && setCurrImage(currImage + 1)}
						/>
					</div>
				</div>
			</Modal>
		</div>
	)
}

export default PictureCard
