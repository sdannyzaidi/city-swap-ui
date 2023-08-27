import dayjs from 'dayjs'
import MultiRangePicker from '../../newListing/components/multiRangePicker'

const Calendar = ({ listing }) => {
	return (
		<div className='flex flex-col sm:pl-44 sm:pr-[34rem] max-sm:px-8'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Calendar</p>
			<MultiRangePicker
				value={Object.values(listing?.asscocitedListings?.[0]?.availableDates || listing?.associatedListings?.[0]?.availableDates || [])?.map((obj) => {
					return [dayjs(obj.startDate).format('YYYY-MM-DD'), dayjs(obj.endDate).format('YYYY-MM-DD')]
				})}
				viewOnly={true}
				quickNavigate={true}
			/>
		</div>
	)
}
export default Calendar
