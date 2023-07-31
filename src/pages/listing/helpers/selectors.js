import { listingsAtom } from '@atoms'
import { selectorFamily } from 'recoil'

export const listingByIdSelector = selectorFamily({
	key: 'listingByIdSelector',
	get:
		(props) =>
		({ get }) => {
			const { id } = props
			const listings = get(listingsAtom)
			console.log({ listings })
			const listing = listings?.find((listing) => listing.property._id === id)
			return listing
		},
})
