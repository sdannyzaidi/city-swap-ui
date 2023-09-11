import dayjs from 'dayjs'
import MultiRangePicker from '../../newListing/components/multiRangePicker'
import { Form } from '@components'
import { mdiClose } from '@mdi/js'
import Icon from '@mdi/react'

const Calendar = ({ listing, editable, form }) => {
	const availableDates = Form.useWatch('availableDates', form)

	const removeDateRange = (range) => {
		const prevVals = form?.getFieldsValue()
		const newVals = {
			availableDates: prevVals.availableDates.filter((dateRange) => !(range?.[0] === dateRange[0] && range?.[1] === dateRange[1])),
		}
		form.setFieldsValue(newVals)
	}
	return (
		<div className='flex flex-col md:pl-44 md:pr-[34rem] max-md:px-8'>
			<p className='text-[30px] font-[700] text-[#333333] pb-6'>Calendar</p>
			{editable ? (
				<>
					<div className='flex flex-row hide-scroll-container items-center '>
						{availableDates && availableDates.length > 0 ? (
							availableDates.map((range) => (
								<div className='flex flex-row items-center bg-[#F9F5FF] px-2 py-1 my-2 mx-2 w-fit whitespace-nowrap rounded-lg border border-solid border-[#9B83CB]'>
									<p className='text-sm font-[600] text-[#344054] pr-2'>
										{dayjs(range[0]).format('D MMM YY')}&nbsp;-&nbsp;{dayjs(range[1]).format('D MMM YY')}
									</p>
									<Icon path={mdiClose} size={0.7} className='text-[#344054] hover:cursor-pointer' onClick={() => removeDateRange(range)} />
								</div>
							))
						) : (
							<p className='text-[#919191] font-[500] text-sm pb-7 pl-2'>No Selected Dates</p>
						)}
					</div>
					<Form.Item name={['availableDates']} noStyle shouldUpdate={true}>
						<MultiRangePicker />
					</Form.Item>
				</>
			) : (
				<MultiRangePicker
					value={Object.values(listing?.asscocitedListings?.[0]?.availableDates || listing?.associatedListings?.[0]?.availableDates || [])?.map((obj) => {
						return [dayjs(obj.startDate).format('YYYY-MM-DD'), dayjs(obj.endDate).format('YYYY-MM-DD')]
					})}
					viewOnly={true}
					quickNavigate={true}
				/>
			)}
		</div>
	)
}
export default Calendar
