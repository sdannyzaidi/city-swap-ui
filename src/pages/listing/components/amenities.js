import { AmenitiesEnums } from '../../newListing/helpers/enums'

const Amenities = ({ listing }) => {
	const amenities = Object.values(AmenitiesEnums)

	return (
		<div className='flex flex-col sm:pl-44  sm:pr-96 max-sm:px-8'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Amenities</p>
			<div className='grid sm:grid-cols-3 max-sm:grid-cols-2 sm:gap-y-8 max-sm:gap-y-8'>
				{amenities.map((amenity, index) => {
					return (
						<div key={index} className='flex flex-row items-center'>
							<img src={amenity.icon} alt={amenity.label} className='sm:w-[40px] sm:h-[40px] max-sm:w-[24px] max-sm:h-[24px]' />
							<p className='text-[#595959] font-[500] sm:text-lg max-sm:text-sm sm:pl-4 max-sm:pl-2'>{amenity.label}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Amenities
