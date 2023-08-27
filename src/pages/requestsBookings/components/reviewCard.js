import { Form } from '@components'
import RatingSelector from './ratingSelector'
import { Button, Input } from 'antd'
import { mdiMapMarkerOutline } from '@mdi/js'
import Icon from '@mdi/react'
import ProfileLogo from '../../../assets/images/profile.png'
import { useCallback } from 'react'
import { endpoints } from '../../../helpers/enums'
import dayjs from 'dayjs'

const ReviewCard = ({ request }) => {
	const { requestedProperty, ownProperty } = request
	console.log({ request })
	const handleSubmit = useCallback(
		(values) => {
			console.log({ values })
			fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['add-review']}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					id: 1,
					request_type: request.requestType,
					request_date: dayjs().format(),
					rating: (values?.review?.rating || 0).toString(),
					content_review: values?.review?.comment,
				}),
			})
		},

		[]
	)
	return (
		<Form onFinish={handleSubmit}>
			<div
				className={`flex sm:flex-row max-sm:flex-col space-between bg-[#F2F4F7] p-5 rounded-xl ${request.requestType === 'swap' ? 'mx-3 mt-4 mb-2' : ''}`}
			>
				<div className='flex flex-col sm:basis-3/4 max-sm:basis-full space-y-4'>
					<p className='text-lg font-[700] text-[#333333]'>How was Your experience with {requestedProperty?.propertyDetail?.user?.name} ? </p>
					<Form.Item name={['review', 'rating']} initialValue={0}>
						<RatingSelector />
					</Form.Item>
					<Form.Item name={['review', 'comment']} initialValue={''}>
						<Input.TextArea placeholder='Write a review' rows={5} className='text-sm text-[#666666] font-[500]' />
					</Form.Item>
				</div>
				<div className='flex flex-col sm:basis-1/4 max-sm:basis-full justify-end items-end w-full'>
					<div className='flex flex-row w-full items-start sm:pl-6 max-sm:pt-4'>
						<Button htmlType='submit' className='btn-primary max-sm:w-full'>
							Add Review
						</Button>
					</div>
				</div>
			</div>
		</Form>
	)
}

export default ReviewCard
