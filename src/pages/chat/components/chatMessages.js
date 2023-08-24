import { useEffect, useRef, useState } from 'react'
import ChatHeader from './chatHeader'
import Message from './message'
import MessageInput from './messageInput'
import dayjs from 'dayjs'
import { message } from 'antd'

const ChatMessages = ({ chats }) => {
	const chat = chats.find((chat) => chat.selected)
	const lastMessageRef = useRef(null)

	const [groupedMessages, setGroupedMessages] = useState(
		Object.values(
			chat?.messages?.reduce(
				(prev, message) => ({
					...prev,
					[`${dayjs(message.timestamp).fromNow()}-${message.user}`]: {
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
				chat?.messages?.reduce(
					(prev, message) => ({
						...prev,
						[`${dayjs(message.timestamp).fromNow()}-${message.user}`]: {
							timestamp: message.timestamp,
							user: message.user,
							messages: [...(prev[[`${dayjs(message.timestamp).fromNow()}`]]?.messages || []), message],
						},
					}),
					{}
				)
			)
		)
	}, [chat])

	return (
		<div className='flex flex-col bg-[#FCFCFD] h-full '>
			<ChatHeader user={chat?.user} />
			<div className='flex flex-col space-y-4 pb-8 px-8 h-full overflow-y-scroll'>
				{groupedMessages?.map((messages, index) => (
					<div className={`flex flex-row items-center w-full ${messages.user === 'me' ? 'justify-end' : 'justify-start'}`}>
						<Message className={index === 0 ? 'mt-8' : ''} key={messages.id} messages={messages} />
					</div>
				))}
				<div ref={lastMessageRef}></div>
			</div>

			<MessageInput setMessages={setGroupedMessages} lastMessageRef={lastMessageRef} />
		</div>
	)
}

export default ChatMessages
