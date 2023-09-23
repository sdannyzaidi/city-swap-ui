import { Form } from '@components'
import { LocationDetailsSchema } from '../helpers/formSchemas'
import { ListingContext } from '../helpers/context'
import { useContext, useEffect } from 'react'
import { Input, Select } from 'antd'

const { Option } = Select

const selectAfter = (
	<Form.Item name={['timePeriod']} initialValue={'perWeek'} className='!mb-0'>
		<Select>
			<Option value='perWeek'>Per Week</Option>
			<Option value='perMonth'>Per Month</Option>
		</Select>
	</Form.Item>
)

const LocationDetails = () => {
	const { form } = useContext(ListingContext)
	const country = Form.useWatch(['location', 'country'], form)
	const type = form.getFieldValue(['listingType'])

	useEffect(() => {
		form.setFieldValue(['location', 'city'], null)
	}, [country, form])
	return (
		<div className='flex flex-col py-7 w-full'>
			<p className='text-[#333333] font-[600] text-2xl'>Location Details</p>
			<div className='flex flex-col py-6'>
				{Form.renderSchema(LocationDetailsSchema(country))}
				{type === 'sublease' && (
					<Form.Item
						key='Price'
						label='Price'
						name={['price']}
						rules={[
							{
								required: true,
								validator: (_, value = '') => {
									if (value?.toString().length > 0) {
										if (value < 0) {
											return Promise.reject(new Error(`This value cannot be negative.`))
										} else {
											return Promise.resolve()
										}
									} else {
										return Promise.reject(new Error('Please enter price'))
									}
								},
							},
						]}
						className='!rounded-b-none'
					>
						<Input
							className='input-field add-on price-add-on'
							onInput={(e) => {
								e.target.value = e.target.value.replace(/[^0-9.]*/g, '')
							}}
							addonAfter={selectAfter}
						/>
					</Form.Item>
				)}
			</div>
		</div>
	)
}
export default LocationDetails
