import dayjs from 'dayjs'
import MultiRangePicker from '../../newListing/components/multiRangePicker'

const Calendar = ({ listing }) => {
	return (
		<div className='flex flex-col pl-44 pr-[34rem]'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Calendar</p>
			<MultiRangePicker
				value={Object.values(listing?.associatedListings?.[0]?.availableDates || [])?.map((obj) => [
					dayjs(obj.startDate).format('YYYY-MM-DD'),
					dayjs(obj.endDate).format('YYYY-MM-DD'),
				])}
				viewOnly={true}
				quickNavigate={true}
			/>
		</div>
	)
}
export default Calendar
