import { useCallback, useEffect, useRef, useState } from 'react'
import ChatHeader from './chatHeader'
import Message from './message'
import MessageInput from './messageInput'
import dayjs from 'dayjs'
import { firestore, firebase } from '../../../auth/firebase/config'

const ChatMessages = ({ chats }) => {
	const chat = chats.find((chat) => chat.selected)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	// console.log({ chat })
	const lastMessageRef = useRef(null)
	const sendMessage = useCallback(
		(message) => {
			firestore
				.collection('chats')
				.doc(`${chat?._id}`)
				.update({
					messages: firebase.firestore.FieldValue.arrayUnion(message),
				})
		},
		[chat]
	)

	const [groupedMessages, setGroupedMessages] = useState(
		Object.values(
			(chat?.messages || [])?.reduce(
				(prev, message) => ({
					...prev,
					[`${dayjs(message.timestamp).fromNow()}-${message.user._id}`]: {
						timestamp: message.timestamp,
						user: message.user,
						messages: [...(prev[[`${dayjs(message.timestamp).fromNow()}`]]?.messages || []), message],
					},
				}),
				{}
			)
		) || []
	)
	useEffect(() => {
		setGroupedMessages(
			Object.values(
				(chat?.messages || [])?.reduce(
					(prev, message) => ({
						...prev,
						[`${dayjs(message.timestamp).fromNow()}-${message.user._id}`]: {
							timestamp: message.timestamp,
							user: message.user,
							messages: [...(prev[[`${dayjs(message.timestamp).fromNow()}-${message.user._id}`]]?.messages || []), message],
						},
					}),
					{}
				)
			)
		)
	}, [chat])

	return (
		<div className='flex flex-col bg-[#FCFCFD] h-full'>
			<ChatHeader chat={chat} />
			<div className='flex flex-col space-y-4 pb-8 px-8 h-full overflow-y-scroll'>
				{groupedMessages?.map((messages, index) => (
					<div className={`flex flex-row items-center w-full ${messages.user?._id === loggedInUser?.id ? 'justify-end' : 'justify-start'}`}>
						<Message className={index === 0 ? 'mt-8' : ''} key={messages.id} messages={messages} loggedInUser={loggedInUser} />
					</div>
				))}
				<div ref={lastMessageRef}></div>
			</div>

			{chat && <MessageInput sendMessage={sendMessage} lastMessageRef={lastMessageRef} />}
		</div>
	)
}

export default ChatMessages
