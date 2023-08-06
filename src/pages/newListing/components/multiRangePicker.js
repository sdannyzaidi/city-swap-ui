import dayjs from 'dayjs'
import { useContext, useMemo, useState } from 'react'
import { CalendarEnums, WeekDaysEnums } from '../helpers/enums'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'
import { CalendarContext } from '../helpers/context'
var isBetween = require('dayjs/plugin/isBetween')
dayjs.extend(isBetween)
const isLeapYear = (year) => {
	return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)
}
const compareDate = (date1, date2) => {
	const newDate1 = dayjs(date1)
	const newDate2 = dayjs(date2)
	return newDate1.diff(newDate2, 'day')
}
const compareRanges = (range1, range2) => {
	return compareDate(range1[0], range2[0])
}
const checkRangeOverlap = (range1, range2) => {
	const newRange1Start = dayjs(range1[1]).add(1, 'day')
	return compareDate(newRange1Start.format('YYYY-MM-DD'), range2[0]) >= 0
}
const mergeRanges = (ranges) => {
	if (ranges.length === 0) return []
	if (ranges.length === 1) return ranges
	const sortedRanges = ranges.sort(compareRanges)
	const mergedRanges = sortedRanges.reduce(
		(ranges, curr, index) => {
			if (ranges.prev) {
				if (checkRangeOverlap(ranges.prev, curr)) {
					return { prev: [ranges.prev[0], curr[1]], ranges: [...ranges.ranges, ...(index === sortedRanges.length - 1 ? [[ranges.prev[0], curr[1]]] : [])] }
				} else {
					return { prev: curr, ranges: [...ranges.ranges, ...(index === sortedRanges.length - 1 ? [ranges.prev, curr] : [ranges.prev])] }
				}
			}
			return { prev: curr, ranges: [] }
		},
		{ prev: undefined, ranges: [] }
	)
	return mergedRanges.ranges
}
const checkSelected = (date, selectedRanges) => {
	return selectedRanges
		? selectedRanges
				.map((range) => {
					const newDate = dayjs(date)
					const newRangeStart = dayjs(range[0])
					const newRangeEnd = dayjs(range[1])
					if (newDate.isBetween(newRangeStart, newRangeEnd, 'day', '()')) {
						return 'between'
					} else if (newDate.isSame(newRangeEnd, 'day') && newDate.isSame(newRangeStart, 'day')) {
						return 'single'
					} else if (newDate.isSame(newRangeStart, 'day')) {
						return 'start'
					} else if (newDate.isSame(newRangeEnd, 'day')) {
						return 'end'
					} else {
						return false
					}
				})
				?.reduce((prevVal, val) => val || prevVal, '')
		: false
}
const getDaysInMonth = (month, year, months) => {
	const startingWeekDay = dayjs(`${year}-${month + 1}-01`).day()
	const leapYear = isLeapYear(year)
	let currDay = 1
	const dayGrid = Array.from({ length: 6 }, (_, i) => i).map((day) => Array.from({ length: 7 }, (_, i) => null))
	dayGrid.forEach((week, weekIndex) => {
		week.forEach((day, dayIndex) => {
			if (weekIndex === 0 && dayIndex < startingWeekDay) {
				dayGrid[weekIndex][dayIndex] = { value: months[month === 0 ? 11 : month - 1].totalDays - (startingWeekDay - dayIndex) + 1, disabled: true }
			} else if (currDay <= months[month].totalDays + (leapYear && month === 1 ? 1 : 0)) {
				dayGrid[weekIndex][dayIndex] = { value: currDay++, disabled: false }
			} else if (currDay === 1 + (months[month].totalDays + (leapYear && month === 1 ? 1 : 0))) {
				dayGrid[weekIndex][dayIndex] = { value: 1, disabled: true }
				currDay++
			} else {
				dayGrid[weekIndex][dayIndex] = { value: currDay % months[month].totalDays, disabled: true }
				currDay++
			}
		})
	})

	return dayGrid
}
const CalendarCell = ({ day: { value, disabled } = {}, month, year, index }) => {
	const { selectedStartingDate, hoveringDate, setHoveringDate, handleSelect, selectedRanges } = useContext(CalendarContext)
	const selected = checkSelected(`${year}-${month}-${value}`, selectedRanges)
	return (
		<div
			className={`basis-[14.2857%] ${!disabled ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}
			onClick={() => !disabled && handleSelect(`${year}-${month}-${value}`)}
		>
			{disabled ? (
				<p className='text-[#767f95] font-[400] text-[12px] text-center'>{value}</p>
			) : selected === 'single' ||
			  (selected === 'start' && index === 6) ||
			  (selected === 'end' && index === 0) ||
			  selectedStartingDate === `${year}-${month}-${value}` ? (
				<p className='font-[600] text-[12px] bg-[#9B83CB] text-white h-7 w-7 text-center leading-7 rounded-full mx-auto'>{value}</p>
			) : selected === 'start' || (selected === 'between' && index === 0) ? (
				<p className='font-[600] text-[12px] bg-[#9B83CB] text-white my-1 h-7 w-full text-center leading-7 rounded-l-full mx-auto'>{value}</p>
			) : selected === 'end' || (selected === 'between' && index === 6) ? (
				<p className='font-[600] text-[12px] bg-[#9B83CB] text-white h-7 w-full text-center leading-7 rounded-r-full mx-auto'>{value}</p>
			) : selected === 'between' ? (
				<p className='font-[600] text-[12px] bg-[#9B83CB] text-white h-7 w-full text-center leading-7  mx-auto '>{value}</p>
			) : (
				<p className='text-[#344054] text-center font-[500] text-[12px] leading-7 hover:bg-[#d3c7ea] hover:rounded-full hover:h-7 hover:w-7 hover:text-[#666666]'>
					{value}
				</p>
			)}
		</div>
	)
}
const CalendarMonth = ({ month, year, setMonth, setYear, position }) => {
	const { months } = useContext(CalendarContext)
	const dayGrid = getDaysInMonth(month, year, months)
	return (
		<div className='flex flex-col'>
			<div className={`flex flex-row justify-between ${position === 'right' ? 'pl-6' : position === 'left' ? 'pr-6' : 'px-6'}  items-center pb-5`}>
				<Icon
					path={mdiChevronLeft}
					size={1}
					className={`${!(year === 0 && month === 0) ? 'hover:cursor-pointer text-[#344054] ' : 'hover:cursor-not-allowed text-[#8b8d91e4] '}`}
					onClick={() => {
						if (!(year === 0 && month === 0)) {
							setMonth((prev) => (prev === 0 ? 11 : prev - 1))
							if (month === 0) setYear((prev) => prev - 1)
						}
					}}
				/>
				<p className='text-[##344054]'>
					{months[month]?.label}&nbsp;{year}
				</p>
				<Icon
					path={mdiChevronRight}
					size={1}
					className='text-[#344054] hover:cursor-pointer'
					onClick={() => {
						if (month === 11) setYear((prev) => prev + 1)
						setMonth((prev) => (prev + 1) % 12)
					}}
				/>
			</div>
			<div className={`flex flex-col ${position === 'right' ? 'pl-6' : position === 'left' ? 'pr-6' : 'px-6'} py-4  space-y-2`}>
				<div className='flex flex-row justify-between px-2 items-center basis-1/6'>
					{Object.values(WeekDaysEnums).map((day) => (
						<div className='basis-[14.2857%]'>{<p className='text-[#344054] font-[600] text-[12px] text-center'>{day.short}</p>}</div>
					))}
				</div>
				{dayGrid.map((week) => (
					<div className='flex flex-row justify-between px-2 items-center basis-1/6'>
						{week.map((day, index) => (
							<CalendarCell day={day} month={month} year={year} index={index} />
						))}
					</div>
				))}
			</div>
		</div>
	)
}

const MultiRangePicker = ({ value, onChange, viewOnly, quickNavigate }) => {
	const [selectedStartingDate, setSelectedStartingDate] = useState(null)
	const [hoveringDate, setHoveringDate] = useState(null)
	const [currMonth, setCurrMonth] = useState(dayjs().month())
	const [nextMonth, setNextMonth] = useState((dayjs().month() + 1) % 12)
	const [nextMonthYear, setNextMonthYear] = useState(dayjs().month() === 11 ? dayjs().year() + 1 : dayjs().year())
	console.log({ value })
	const [currYear, setCurrYear] = useState(dayjs().year())
	const months = useMemo(() => Object.values(CalendarEnums), [])
	const handleSelect = (date) => {
		if (!viewOnly) {
			if (selectedStartingDate) {
				onChange(mergeRanges([...(value || []), [selectedStartingDate, date]]))
				setSelectedStartingDate(null)
			} else {
				setSelectedStartingDate(date)
			}
		}
	}
	return (
		<CalendarContext.Provider
			value={{ selectedRanges: value, selectedStartingDate, setSelectedStartingDate, hoveringDate, setHoveringDate, handleSelect, months }}
		>
			<div className='flex flex-row w-full border border-solid border-[#F2F4F7] shadow-[0_8px_8px_-4px_rgba(16,24,40,0.03),0_20px_24px_-4px_rgba(16,24,40,0.08)] rounded-lg px-6 py-5 mb-7'>
				{quickNavigate && (
					<div className='flex flex-col !h-full basis-[24%] pr-6 border-r border-solid  border-[#F2F4F7] space-y-1'>
						{['Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month', 'Next Month', 'This Year', 'Next Year'].map((item) => (
							<p className='px-2 py-2 text-sm font-[500] text-[#344054] hover:bg-[#F9FAFB] rounded-md hover:cursor-pointer'>{item}</p>
						))}
					</div>
				)}
				<div className={`${quickNavigate ? 'basis-[38%] ml-6' : 'basis-1/2'}  border-r border-solid border-[#F2F4F7]`}>
					<CalendarMonth month={currMonth} year={currYear} setMonth={setCurrMonth} setYear={setCurrYear} position='left' />
				</div>
				<div className={`${quickNavigate ? 'basis-[38%]' : 'basis-1/2'}`}>
					<CalendarMonth month={nextMonth} year={nextMonthYear} setMonth={setNextMonth} setYear={setNextMonthYear} position='right' />
				</div>
			</div>
		</CalendarContext.Provider>
	)
}

export default MultiRangePicker
