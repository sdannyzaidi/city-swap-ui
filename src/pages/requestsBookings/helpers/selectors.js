import { listingsAtom, requestsAtom } from '@atoms'
import { selectorFamily } from 'recoil'

export const listingByUserSelector = selectorFamily({
	key: 'listingByUserSelector',
	get:
		(props) =>
		({ get }) => {
			const { id } = props
			const listings = get(listingsAtom)
			const filteredListings = listings?.filter((listing) => listing.user?._id === id || listing.property?.user === id)
			return filteredListings || []
		},
})

export const userRequestsSelector = selectorFamily({
	key: 'userRequestsSelector',
	get:
		(props) =>
		({ get }) => {
			const requests = get(requestsAtom)
			const userRequests = typeof requests?.userRequests === 'string' ? [] : requests?.userRequests
			return userRequests || []
		},
})

export const receivedRequestsSelector = selectorFamily({
	key: 'receivedRequestsSelector',
	get:
		(props) =>
		({ get }) => {
			const requests = get(requestsAtom)
			const receivedRequests = typeof requests?.receivedRequests === 'string' ? [] : requests?.receivedRequests
			return receivedRequests || []
		},
})
