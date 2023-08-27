import { atom } from 'recoil'
export const userAtom = atom({ default: null, key: 'userAtom' })
export const listingsAtom = atom({ default: [], key: 'listingsAtom' })
export const chatsAtom = atom({ default: [], key: 'chatsAtom' })
export const requestsAtom = atom({
	default: {},
	key: 'requestsAtom',
})
