import { listingsAtom } from '@atoms'
import { selectorFamily } from 'recoil'
import statesToCities from '../../../helpers/statesCities'
import { findCities } from '../../../helpers/utilFunctions'
import { checkRangeIncludes, checkRangeOverlap, findRangeOverlap, findCompleteRangeOverlap } from '../../newListing/components/multiRangePicker'

export const swappableListingsSelector = selectorFamily({
	key: 'swappableListingsSelector',
	get:
		(props) =>
		({ get }) => {
			const { id, dateRange } = props
			const listings = get(listingByUserSelector({ id }))
			const filteredListings = listings
				.filter((listing) =>
					(listing.asscocitedListings || listing.associatedListings)
						?.find((obj) => obj.listingType === 'swap')
						?.availableDates?.some((range) => {
							return checkRangeIncludes(dateRange, [range.startDate, range.endDate])
						})
				)
				?.map((listing) => {
					// console.log({
					// 	name: listing?.property?.title,
					// 	dates: (listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === 'swap')?.availableDates,
					// })
					return {
						...listing,
						...findCompleteRangeOverlap(
							dateRange,
							(listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === 'swap')?.availableDates,
							'show'
						),
					}
				})
			return filteredListings
		},
})
export const partialSwappableListingsSelector = selectorFamily({
	key: 'partialSwappableListingsSelector',
	get:
		(props) =>
		({ get }) => {
			const { id, dateRange } = props
			const listings = get(listingByUserSelector({ id }))
			const filteredListings = listings
				.filter((listing) =>
					(listing.asscocitedListings || listing.associatedListings)
						?.find((obj) => obj.listingType === 'swap')
						?.availableDates?.some(
							(range) =>
								!checkRangeIncludes(dateRange, [range.startDate, range.endDate]) &&
								(checkRangeOverlap(dateRange, [range.startDate, range.endDate]) || checkRangeOverlap([range.startDate, range.endDate], dateRange))
						)
				)
				?.map((listing) => {
					return {
						...listing,
						...findRangeOverlap(
							dateRange,
							(listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === 'swap')?.availableDates || [],
							'show'
						),
					}
				})
			// console.log({ filteredListings })

			return filteredListings
		},
})
export const suggestedListingsSelector = selectorFamily({
	key: 'suggestedListingsSelector',
	get:
		(props) =>
		({ get }) => {
			const { id, dateRanges, searchRange, location } = props
			const listings = get(listingsNotByUserSelector({ id }))
			const filteredListings = listings
				.filter(
					(listing) =>
						listing.location?.country === location?.country &&
						(listing.location?.city === location?.city ||
							findCities(location?.city)?.includes(listing.location?.city) ||
							statesToCities?.[location?.city]?.includes(listing.location?.city)) &&
						(listing.asscocitedListings || listing.associatedListings)
							?.find((obj) => obj.listingType === 'sublease')
							?.availableDates?.some((range) => dateRanges.some((dateRange) => checkRangeOverlap(dateRange, [range.startDate, range.endDate])))
				)
				?.map((listing) => {
					console.log({ name: listing?.property?.title })
					console.log({ dateRanges })
					const { overlap: startOverlap } = findCompleteRangeOverlap(
						dateRanges?.[0],
						(listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === 'sublease')?.availableDates || []
					)
					const { overlap: endOverlap } = findCompleteRangeOverlap(
						dateRanges?.[1],
						(listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === 'sublease')?.availableDates || []
					)
					return {
						...listing,
						startOverlap,
						endOverlap,
					}
				})

			return filteredListings
		},
})
export const listingByIdSelector = selectorFamily({
	key: 'listingByIdSelector',
	get:
		(props) =>
		({ get }) => {
			const { id } = props
			const listings = get(listingsAtom)
			const listing = listings?.find((listing) => listing.property._id === id)
			// console.log({ listing })
			return listing
		},
})
export const searchPropertiesSelector = selectorFamily({
	key: 'searchPropertiesSelector',
	get:
		(props) =>
		({ get }) => {
			const { id, dateRange, location, type } = props
			const listings = get(listingsNotByUserSelector({ id }))
			let filteredListings = []
			if (id) {
				filteredListings = listings.filter(
					(listing) =>
						listing.location?.country === location?.country &&
						(listing.location?.city === location?.city ||
							findCities(location?.city)?.includes(listing.location?.city) ||
							statesToCities?.[location?.city]?.includes(listing.location?.city)) &&
						(listing.asscocitedListings || listing.associatedListings)
							?.find((obj) => obj.listingType === type)
							?.availableDates?.some((range) => checkRangeOverlap(dateRange, [range.startDate, range.endDate]))
				)
			} else {
				filteredListings = listings.filter(
					(listing) =>
						listing.location?.country === location?.country && (listing.asscocitedListings || listing.associatedListings)?.find((obj) => obj.listingType === type)
				)
			}

			return filteredListings
		},
})
export const listingsNotByUserSelector = selectorFamily({
	key: 'listingsNotByUserSelector',
	get:
		(props) =>
		({ get }) => {
			const { id } = props
			const listings = get(listingsAtom)
			const filteredListings = listings?.filter((listing) => !(listing.user?._id === id || listing.property?.user === id))
			return filteredListings || []
		},
})
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
