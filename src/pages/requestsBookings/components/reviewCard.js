import { Form } from '@components'
import RatingSelector from './ratingSelector'
import { Button, Input, notification } from 'antd'
import { useCallback, useState } from 'react'
import { endpoints } from '../../../helpers/enums'

const ReviewCard = ({ request }) => {
	const { requestedProperty, ownProperty } = request
	const [loading, setLoading] = useState(false)
	// console.log({ request })
	const handleSubmit = useCallback(
		(values) => {
			setLoading(true)
			fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['add-review']}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					propertyId: requestedProperty?.propertyDetail?._id,
					userId: JSON.parse(localStorage.getItem('user'))?.id,
					rating: values?.review?.rating || 0,
					content_review: values?.review?.comment,
				}),
			})
				.then((response) => {
					setLoading(false)
					if (response.status === 200 || response.status === 201) {
						notification['success']({
							message: 'Review added succesfully',
							duration: 5,
							onClick: () => {
								notification.close()
							},
						})
					} else {
						setLoading(false)
						notification['error']({
							message: 'Review addition failed',
							duration: 5,
							onClick: () => {
								notification.close()
							},
						})
					}
				})
				.catch((error) => {
					console.log({ error })
					setLoading(false)
				})
		},

		[]
	)
	return (
		<Form onFinish={handleSubmit}>
			<div
				className={`flex md:flex-row max-md:flex-col space-between bg-[#F2F4F7] p-5 rounded-xl ${request.requestType === 'swap' ? 'mx-3 mt-4 mb-2' : ''}`}
			>
				<div className='flex flex-col sm:basis-3/4 max-md:basis-full space-y-4'>
					<p className='text-lg font-[700] text-[#333333]'>How was Your experience with {requestedProperty?.propertyDetail?.user?.name} ? </p>
					<Form.Item name={['review', 'rating']} initialValue={0}>
						<RatingSelector />
					</Form.Item>
					<Form.Item name={['review', 'comment']} initialValue={''}>
						<Input.TextArea placeholder='Write a review' rows={5} className='text-sm text-[#666666] font-[500]' />
					</Form.Item>
				</div>
				<div className='flex flex-col sm:basis-1/4 max-md:basis-full justify-end items-end w-full'>
					<div className='flex flex-row w-full items-start md:pl-6 max-md:pt-4'>
						<Button htmlType='submit' className='btn-primary max-md:w-full' loading={loading}>
							Add Review
						</Button>
					</div>
				</div>
			</div>
		</Form>
	)
}

export default ReviewCard
