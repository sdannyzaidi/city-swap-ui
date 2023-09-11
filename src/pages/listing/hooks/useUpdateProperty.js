import { useState } from 'react'
import { endpoints } from '../../../helpers/enums'

const useUpdateProperty = () => {
	const [loading, setLoading] = useState(false)

	const updateProperty = async (values, listing) => {
		setLoading(true)
		// const user = JSON.parse(localStorage.getItem('user'))
		const finalValues = {
			listing: {
				listingId: listing?.associatedListings?.[0]?._id,
				availableDates: values.availableDates.map((range) => ({ startDate: range[0], endDate: range[1] })),
			},
			property: {
				pictures: values.photos.map((photo) => photo.url),
				title: values.title,
				description: values.description,
				...values.amenities,
				...Object.entries(values.size)?.reduce((sizes, entry) => {
					return {
						...sizes,
						[`${entry[0]}`]: parseInt(entry[1]),
					}
				}, {}),
				// pictures: values.photos.map((photo) => photo.url),
			},
		}

		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['update-property']?.(listing?.property?._id)}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify(finalValues),
		})

		console.log({ response })
		setLoading(false)
		return response
	}

	return [updateProperty, loading]
}

export default useUpdateProperty
