export const endpoints = {
	'sublease-request': 'request/sublease-request',
	'swap-request': 'request/swap-request',
	'mark-request-status': (id) => `request/requests/${id}`,
	find: 'propertyInfo/find/',
}
