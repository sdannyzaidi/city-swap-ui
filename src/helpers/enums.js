export const endpoints = {
	'sublease-request': (id) => `request/sublease-request/${id}`,
	'swap-request': 'request/swap-request',
	'mark-request-status': (id) => `request/requests/${id}`,
	find: 'propertyInfo/find/',
	'user-properties': (id) => `propertyInfo/user/${id}`,
	'create-subscription': 'stripe/create-subscription',
	'confirm-transaction': 'stripe/confirm-transaction',
	'user-requests': (id) => `users/requests/${id}`,
	'add-review': 'review/add-review',
}
