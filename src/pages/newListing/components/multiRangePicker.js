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
export const checkRangeIncludes = (range1, range2) => {
	const newRange1Start = dayjs(range1?.[0])
	const newRange1End = dayjs(range1?.[1])
	const newRange2Start = dayjs(range2?.[0])
	const newRange2End = dayjs(range2?.[1])

	return newRange1Start.isBetween(newRange2Start, newRange2End, 'day', '[]') && newRange1End.isBetween(newRange2Start, newRange2End, 'day', '[]')
}
export const checkRangeOverlap = (range1, range2, adjust) => {
	const newRange1Start = adjust === true ? dayjs(range1?.[1]).add(1, 'day') : dayjs(range1?.[1])
	// show && console.log({ range1, range2 })
	// show &&
	// 	console.log({
	// 		range1: newRange1Start.format('YYYY-MM-DD'),
	// 		range2: range2[0],
	// 		result: compareDate(newRange1Start.format('YYYY-MM-DD'), range2[0]),
	// 	})
	return compareDate(newRange1Start.format('YYYY-MM-DD'), range2?.[0]) >= 0 && compareDate(newRange1Start.format('YYYY-MM-DD'), range2?.[1]) <= 0
}
export const findRangeOverlap = (range1, ranges2) => {
	const range2 = ranges2?.find(
		(range) =>
			!checkRangeIncludes(range1, [range.startDate, range.endDate]) &&
			(checkRangeOverlap(range1, [range.startDate, range.endDate]) || checkRangeOverlap([range.startDate, range.endDate], range1))
	)
	const newRange1Start = dayjs(range1?.[0])
	const newRange1End = dayjs(range1?.[1])
	const newRange2Start = dayjs(range2?.startDate)
	const newRange2End = dayjs(range2?.endDate)
	let start = null
	let end = null
	let startRange = null
	let endRange = null

	if (newRange1Start.isBetween(newRange2Start, newRange2End, 'day', '()')) {
		startRange = null
		start = range1[0]
	} else {
		startRange = [newRange1Start.format(), newRange2Start.subtract(1, 'day').format()]
		start = range2?.startDate
	}
	if (newRange1End.isBetween(newRange2Start, newRange2End, 'day', '()')) {
		endRange = null
		end = range1[1]
	} else {
		endRange = [newRange2End.add(1, 'day').format(), newRange1End.format()]
		end = range2?.endDate
	}
	// console.log({ overlap: [start, end], startRange, endRange })
	return { overlap: [start, end], startRange, endRange }
}
export const findCompleteRangeOverlap = (range1, ranges2) => {
	const range2 = ranges2?.find((range) => checkRangeIncludes(range1, [range.startDate, range.endDate]))
	const newRange1Start = dayjs(range1?.[0])
	const newRange1End = dayjs(range1?.[1])
	const newRange2Start = dayjs(range2?.startDate)
	const newRange2End = dayjs(range2?.endDate)
	let start = null
	let end = null
	let startRange = null
	let endRange = null

	if (newRange1Start.isBetween(newRange2Start, newRange2End, 'day', '()')) {
		startRange = null
		start = range1[0]
	} else {
		startRange = [newRange1Start.format(), newRange2Start.subtract(1, 'day').format()]
		start = range2?.startDate
	}
	if (newRange1End.isBetween(newRange2Start, newRange2End, 'day', '()')) {
		endRange = null
		end = range1[1]
	} else {
		endRange = [newRange2End.add(1, 'day').format(), newRange1End.format()]
		end = range2?.endDate
	}
	// console.log({ overlap: [start, end], startRange, endRange })
	return { overlap: [start, end], startRange, endRange }
}
const mergeRanges = (ranges) => {
	if (ranges.length === 0) return []
	if (ranges.length === 1) return ranges
	const sortedRanges = ranges.sort(compareRanges)
	const mergedRanges = sortedRanges.reduce(
		(ranges, curr, index) => {
			if (ranges.prev) {
				if (checkRangeOverlap(ranges.prev, curr, true)) {
					return { prev: [ranges.prev[0], curr[1]], ranges: [...ranges.ranges, ...(index === sortedRanges.length - 1 ? [[ranges.prev[0], curr[1]]] : [])] }
				}
				if (checkRangeIncludes(ranges.prev, curr)) {
					return {
						prev: [curr[0], curr[1]],
						ranges: [...ranges.ranges, ...(index === sortedRanges.length - 1 ? [[ranges.prev[0], ranges.prev[1]]] : [])],
					}
				}
				if (checkRangeIncludes(curr, ranges.prev)) {
					return {
						prev: [ranges.prev[0], ranges.prev[1]],
						ranges: [...ranges.ranges, ...(index === sortedRanges.length - 1 ? [[ranges.prev[0], ranges.prev[1]]] : [])],
					}
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
					const newDate = dayjs(date).add(1, 'month')
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
	const { selectedStartingDate, handleSelect, selectedRanges } = useContext(CalendarContext)
	const selected = checkSelected(`${year}-${month}-${value}`, selectedRanges)
	const isSmall = compareDate(`${year}-${month + 1}-${value}`, selectedStartingDate) < 0
	return (
		<div
			className={`basis-[14.2857%] ${!disabled && !isSmall ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'}`}
			onClick={() => !disabled && !isSmall && !handleSelect(`${year}-${month + 1}-${value}`)}
		>
			{disabled ? (
				<p className='text-[#767f95] font-[400] text-[12px] text-center'>{value}</p>
			) : selected === 'single' ||
			  (selected === 'start' && index === 6) ||
			  (selected === 'end' && index === 0) ||
			  dayjs(selectedStartingDate).isSame(`${year}-${month + 1}-${value}`) ? (
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
		<div className={`flex flex-col ${position === 'left' ? 'max-md:border-b' : ''} border-solid border-gray-200`}>
			<div
				className={`flex flex-row justify-between ${
					position === 'right' ? 'md:pl-6 max-md:pt-4' : position === 'left' ? 'md:pr-6 max-md:pb-4' : 'px-6'
				}  items-center pb-5`}
			>
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
			<div className={`flex flex-col ${position === 'right' ? 'md:pl-6' : position === 'left' ? 'md:pr-6' : 'px-6'} py-4  space-y-2`}>
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
	const [currYear, setCurrYear] = useState(dayjs().year())
	const months = useMemo(() => Object.values(CalendarEnums), [])
	const handleSelect = (date) => {
		if (!viewOnly) {
			if (selectedStartingDate) {
				// console.log({ second: date })

				onChange(mergeRanges([...(value || []), [selectedStartingDate, date]]))
				setSelectedStartingDate(null)
			} else {
				// console.log({ date })
				setSelectedStartingDate(date)
			}
		}
	}
	return (
		<CalendarContext.Provider
			value={{ selectedRanges: value, selectedStartingDate, setSelectedStartingDate, hoveringDate, setHoveringDate, handleSelect, months }}
		>
			<div className='flex md:flex-row max-md:flex-col w-full border border-solid border-[#F2F4F7] shadow-[0_8px_8px_-4px_rgba(16,24,40,0.03),0_20px_24px_-4px_rgba(16,24,40,0.08)] rounded-lg px-6 py-5 mb-7'>
				{quickNavigate && (
					<>
						<div className='max-md:hidden flex flex-col !h-full basis-[24%] pr-6 border-r border-solid  border-[#F2F4F7] space-y-1'>
							{['Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month', 'Next Month', 'This Year', 'Next Year'].map((item) => (
								<p className='px-2 py-2 text-sm font-[500] text-[#344054] hover:bg-[#F9FAFB] rounded-md hover:cursor-pointer'>{item}</p>
							))}
						</div>
						<div className='sm:hidden flex flex-row w-full overflow-scroll pb-6'>
							{['Today', 'Tomorrow', 'This Week', 'Next Week', 'This Month', 'Next Month', 'This Year', 'Next Year'].map((item) => (
								<p className='whitespace-nowrap w-fit px-2 py-2 text-sm font-[500] text-[#344054] hover:bg-[#F9FAFB] rounded-md hover:cursor-pointer'>{item}</p>
							))}
						</div>
					</>
				)}
				<div
					className={`${
						quickNavigate ? 'sm:basis-[38%] sm:ml-6 max-md:basis-full' : 'sm:basis-1/2 max-md:basis-full'
					}  sm:border-r border-solid border-[#F2F4F7]`}
				>
					<CalendarMonth month={currMonth} year={currYear} setMonth={setCurrMonth} setYear={setCurrYear} position='left' />
				</div>
				<div className={`${quickNavigate ? 'sm:basis-[38%] sm:ml-6 max-md:basis-full' : 'sm:basis-1/2 max-md:basis-full'}`}>
					<CalendarMonth month={nextMonth} year={nextMonthYear} setMonth={setNextMonth} setYear={setNextMonthYear} position='right' />
				</div>
			</div>
		</CalendarContext.Provider>
	)
}

export default MultiRangePicker
