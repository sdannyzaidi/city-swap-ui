import { Form } from '@components'
import MultiRangePicker from './multiRangePicker'
import { ListingContext } from '../helpers/context'
import { useContext, useEffect } from 'react'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import dayjs from 'dayjs'

const PropertyAvailability = () => {
	const { form } = useContext(ListingContext)
	const availableDates = Form.useWatch('availableDates', form)
	const removeDateRange = (range) => {
		const prevVals = form.getFieldsValue()
		const newVals = {
			availableDates: prevVals.availableDates.filter((dateRange) => !(range?.[0] === dateRange[0] && range?.[1] === dateRange[1])),
		}
		form.setFieldsValue(newVals)
	}

	return (
		<div className='flex flex-col w-full'>
			<p className='text-[#333333] font-[700] text-2xl pb-7 pl-2'>Available Dates</p>
			<div className='relative  mb-7 '>
				<div className='absolute right-0 h-full w-12 shadow-[inset_-20px_0_15px_8px_rgba(256,256,256,0.99)]'></div>
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
			</div>
			<Form.Item name={['availableDates']} noStyle>
				<MultiRangePicker />
			</Form.Item>
		</div>
	)
}

export default PropertyAvailability
