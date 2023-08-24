import { useCallback, useState } from 'react'
import PrimaryHeader from '../../components/headers/primaryHeader'
import ChatList from './components/chatList'
import ChatMessages from './components/chatMessages'
import ResizeObserver from 'rc-resize-observer'
import Icon from '@mdi/react'
import { mdiArrowRight } from '@mdi/js'
import { Tooltip } from 'antd'

const Chat = () => {
	const [chatSideBar, setChatSideBar] = useState({ visible: true, type: 'sidebar' })
	const [chats, setChats] = useState([
		{
			id: 1,
			user: { name: 'Katherine Moss' },
			selected: true,
			messages: [
				{ message: 'Hi, There', user: 'them', timestamp: '2023-08-18T05:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'them', timestamp: '2023-08-18T12:50:44+00:00' },
			],
		},
		{
			id: 2,
			user: { name: 'Sebastian La Grange' },
			messages: [
				{ message: 'Hi, There, Hope you are a pinnacle of your sky', user: 'them', timestamp: '2023-08-18T07:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'me', timestamp: '2023-08-18T07:55:44+00:00' },
			],
		},
		{
			id: 3,
			user: { name: 'Sebastian La Grange' },
			messages: [
				{ message: 'Hi, There, Hope you are a pinnacle of your sky', user: 'them', timestamp: '2023-08-18T07:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'me', timestamp: '2023-08-18T07:55:44+00:00' },
			],
		},
		{
			id: 4,
			user: { name: 'Sebastian La Grange' },
			messages: [
				{ message: 'Hi, There, Hope you are a pinnacle of your sky', user: 'them', timestamp: '2023-08-18T07:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'me', timestamp: '2023-08-18T07:55:44+00:00' },
			],
		},
		{
			id: 5,
			user: { name: 'Sebastian La Grange' },
			messages: [
				{ message: 'Hi, There, Hope you are a pinnacle of your sky', user: 'them', timestamp: '2023-08-18T07:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'me', timestamp: '2023-08-18T07:55:44+00:00' },
			],
		},
		{
			id: 6,
			user: { name: 'Sebastian La Grange' },
			messages: [
				{ message: 'Hi, There, Hope you are a pinnacle of your sky', user: 'them', timestamp: '2023-08-18T07:55:44+00:00' },
				{ message: 'Hi, Sup', user: 'me', timestamp: '2023-08-18T07:55:44+00:00' },
			],
		},
	])
	const onChatClick = useCallback((id) => {
		setChats((prev) => prev.map((chat) => ({ ...chat, selected: id === chat.id })))
	}, [])
	return (
		<ResizeObserver
			onResize={({ width, height }) => {
				if (width < 640) {
					setChatSideBar({ visible: true, type: 'drawer' })
				} else {
					setChatSideBar({ visible: true, type: 'sidebar' })
				}
			}}
		>
			<div className='flex flex-col w-full h-full'>
				<PrimaryHeader />

				<div className='relative flex flex-row flex-grow h-[calc(100vh-85.33px)]'>
					<div
						className={`flex border-r border-solid border-[#D0D5DD] ${
							chatSideBar.type === 'drawer'
								? `${
										chatSideBar.visible ? ' w-[300px] opacity-100  flex-row items-center shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]' : 'w-[0px] opacity-0'
								  } bg-white transition-[width,opacity] duration-200 absolute left-0 z-10 bottom-0 h-full`
								: 'w-1/4 min-w-[300px]'
						}  `}
					>
						<ChatList chats={chats} visible={chatSideBar.visible} onChatClick={onChatClick} />
					</div>

					{chatSideBar.type === 'drawer' ? (
						<div className='absolute left-0 z-20 flex flex-col h-full items-start justify-center bg-transparent pr-4'>
							<div className={`${!chatSideBar.visible ? 'opacity-100' : 'opacity-0 w-0'} transition-opacity duration-1000`}>
								<Tooltip title='Open chat list'>
									<div
										className='cursor-pointer p-2 w-fit  rounded-r-lg bg-white shadow-[0_-4px_20px_4px_rgba(0,0,0,0.1)]'
										onClick={() => {
											setChatSideBar({ visible: true, type: 'drawer' })
										}}
									>
										<Icon path={mdiArrowRight} size={0.8} className='text-center leading-8 text-[#475467]' />
									</div>
								</Tooltip>
							</div>
						</div>
					) : null}
					<div
						className={`${chatSideBar.type === 'drawer' ? `w-full ` : 'w-3/4'}  h-full`}
						onClick={() => {
							if (chatSideBar.visible && chatSideBar.type === 'drawer') {
								setChatSideBar({ visible: false, type: 'drawer' })
							}
						}}
					>
						<ChatMessages chats={chats} />
					</div>
				</div>
			</div>
		</ResizeObserver>
	)
}

export default Chat
