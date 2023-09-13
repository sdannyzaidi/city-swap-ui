import { Picker } from 'antd-mobile'
import { CalendarEnums } from '../../newListing/helpers/enums'
import { Button } from 'antd'
import { useState } from 'react'
import dayjs from 'dayjs'

const { mdiChevronDoubleRight, mdiCalendar } = require('@mdi/js')
const { default: Icon } = require('@mdi/react')

const MobileRangePicker = ({ value, onChange }) => {
	const [visible, setVisible] = useState({ visible: false, type: null })
	const [calendarValue, setCalendarValue] = useState()
	// console.log({ value })
	return (
		<>
			<div className='flex flex-row items-center rounded-lg h-12 w-full bg-white border border-solid border-gray-200'>
				<div
					className='basis-[45%] px-4 flex flex-row items-center'
					onClick={() => {
						document.getElementById('startDate').blur()
						setVisible({ visible: true, type: 'start' })
					}}
				>
					<input
						id='startDate'
						name='startDate'
						value={value?.[0] && value[0].format('DD-MMM-YYYY')}
						placeholder='Start Date'
						className='input-field w-28 !border-none !h-12 !leading-10'
					/>
					{/* <Icon path={mdiCalendar} size={1} className=' !leading-6 !text-[16px] !font-[400] !text-gray-300' /> */}
				</div>
				<Icon path={mdiChevronDoubleRight} size={1} className='text-gray-300 hover:cursor-pointer' />
				<div
					className='basis-[45%] px-4 flex flex-row items-center'
					onClick={() => {
						document.getElementById('endDate').blur()
						setVisible({ visible: true, type: 'end' })
					}}
				>
					<input
						id='endDate'
						name='endDate'
						value={value?.[1] && value[1].format('DD-MMM-YYYY')}
						placeholder='End Date'
						className='input-field w-28 !border-none !h-12 !leading-10'
					/>
					{/* <Icon path={mdiCalendar} size={1} className=' !leading-6 !text-[16px] !font-[400] !text-gray-300' /> */}
				</div>
			</div>
			{/* <Button
				className='btn-primary w-full !h-[40px] '
				onClick={() => {
					setVisible(true)
				}}
			>
				Select Date
			</Button> */}
			<Picker
				visible={visible.visible}
				onSelect={(val) => {
					setCalendarValue(val)
				}}
				onClose={() => {
					setVisible({ visible: false, type: null })
				}}
				confirmText='Confirm'
				cancelText='Cancel'
				onConfirm={(val) => {
					// console.log({ val })
					if (visible.type === 'start') {
						onChange([dayjs(`${val[0]}-${Object.values(CalendarEnums).findIndex((month) => month.value === val[1]) + 1}-${val[2]}`), value?.[1]])
					} else {
						onChange([value?.[0], dayjs(`${val[0]}-${Object.values(CalendarEnums).findIndex((month) => month.value === val[1]) + 1}-${val[2]}`)])
					}
				}}
				columns={[
					Array.from({ length: 5 }).map((day, index) => ({ label: index + dayjs().year(), value: index + dayjs().year() })),
					Object.values(CalendarEnums).map((month) => ({ label: month.label, value: month.value })),
					Array.from({ length: CalendarEnums[calendarValue?.[1] || 'january'].totalDays }).map((day, index) => ({ label: index + 1, value: index + 1 })),
				]}
			></Picker>
		</>
	)
}

export default MobileRangePicker
