import { chatsAtom } from '@atoms'
import { selectorFamily } from 'recoil'

export const userChatSelector = selectorFamily({
	key: 'userChatSelector',
	get:
		(props) =>
		({ get }) => {
			const { id, selectedChatId } = props

			const chats = get(chatsAtom)
			console.log({ selectedChatId, chats })
			const userChats = chats
				.filter((chat) => chat.users.some((user) => user?._id === id))
				.map((chat) => ({ ...chat, selected: selectedChatId === chat._id || chat.users.some((user) => user?._id === selectedChatId) }))
			console.log({ userChats })
			return userChats
		},
})
