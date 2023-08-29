import { Form } from '@components'
import { LocationDetailsSchema } from '../helpers/formSchemas'
import { ListingContext } from '../helpers/context'
import { useContext, useEffect } from 'react'

const LocationDetails = () => {
	const { form } = useContext(ListingContext)
	const country = Form.useWatch(['location', 'country'], form)
	const type = form.getFieldValue(['listingType'])

	console.log({ country })
	useEffect(() => {
		form.setFieldValue(['location', 'city'], null)
	}, [country])
	return (
		<div className='flex flex-col py-7 w-full'>
			<p className='text-[#333333] font-[600] text-2xl'>Location Details</p>
			<div className='flex flex-col py-6'>{Form.renderSchema(LocationDetailsSchema(country, type))}</div>
		</div>
	)
}
export default LocationDetails
