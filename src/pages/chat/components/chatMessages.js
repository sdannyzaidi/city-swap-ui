import { useCallback, useEffect, useRef, useState } from 'react'
import ChatHeader from './chatHeader'
import Message from './message'
import MessageInput from './messageInput'
import dayjs from 'dayjs'
import { firestore, firebase } from '../../../auth/firebase/config'
import { Empty } from 'antd'
import ResizeObserver from 'rc-resize-observer'

const ChatMessages = ({ chats, headerHeight }) => {
	const chat = chats.find((chat) => chat.selected)

	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	// console.log({ chat })
	const [chatHeaderHeight, setChatHeaderHeight] = useState(0)
	const [footerHeight, setFooterHeight] = useState(0)
	const [width, setWidth] = useState()
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
		<ResizeObserver
			onResize={({ width, height }) => {
				setWidth(width)
			}}
		>
			<div className='flex flex-col bg-[#FCFCFD] h-full w-full'>
				<ResizeObserver
					onResize={({ width, height }) => {
						setChatHeaderHeight(height)
					}}
				>
					<ChatHeader chat={chat} />
				</ResizeObserver>
				<div
					className='flex flex-col relative space-y-4 pb-8 px-8 overflow-y-scroll'
					style={chatHeaderHeight && footerHeight ? { height: `calc(100vh - ${chatHeaderHeight + footerHeight + headerHeight}px)` } : {}}
				>
					{groupedMessages?.length > 0 ? (
						groupedMessages?.map((messages, index) => (
							<div className={`flex flex-row items-center w-full ${messages.user?._id === loggedInUser?.id ? 'justify-end' : 'justify-start'}`}>
								<Message className={index === 0 ? 'mt-8' : ''} key={messages.id} messages={messages} loggedInUser={loggedInUser} />
							</div>
						))
					) : (
						<div className='my-auto'>
							<Empty description='No messages yet' />
						</div>
					)}
					<div ref={lastMessageRef}></div>
				</div>
				{chat && (
					<ResizeObserver
						onResize={({ width, height }) => {
							setFooterHeight(height)
						}}
					>
						<div className='fixed bottom-0 bg-white h-fit w-full pb-8 max-md:pb-0 max-md:px-4 xs:!py-4 px-8' style={{ width: `${width}px` }}>
							<MessageInput sendMessage={sendMessage} lastMessageRef={lastMessageRef} />
						</div>
					</ResizeObserver>
				)}
			</div>
		</ResizeObserver>
	)
}

export default ChatMessages
