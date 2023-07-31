import { AmenitiesEnums } from '../../newListing/helpers/enums'

const Amenities = ({ listing }) => {
	const amenities = Object.values(AmenitiesEnums).filter((amenity) => listing?.property && Object.keys(listing.property).includes(amenity.value))

	return (
		<div className='flex flex-col pl-44  pr-96'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Amenities</p>
			<div className='grid grid-cols-3 gap-y-8'>
				{amenities.map((amenity, index) => {
					return (
						<div key={index} className='flex flex-row items-center'>
							<img src={amenity.icon} alt={amenity.label} className='w-[40px] h-[40px]' />
							<p className='text-[#595959] font-[500] text-lg pl-4'>{amenity.label}</p>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Amenities
