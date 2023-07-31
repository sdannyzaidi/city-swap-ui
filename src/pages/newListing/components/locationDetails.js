import { Form } from '@components'
import { LocationDetailsSchema } from '../helpers/formSchemas'

const LocationDetails = () => {
	return (
		<div className='flex flex-col py-7 w-full'>
			<p className='text-[#333333] font-[600] text-2xl'>Location Details</p>
			<div className='flex flex-col py-6'>{Form.renderSchema(LocationDetailsSchema)}</div>
		</div>
	)
}
export default LocationDetails
