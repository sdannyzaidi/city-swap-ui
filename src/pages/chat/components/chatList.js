import Icon from '@mdi/react'
import ChatCard from './chatCard'
import { mdiSquareEditOutline } from '@mdi/js'

const ChatList = ({ chats, onChatClick, visible }) => (
	<div className={visible ? 'flex flex-col h-full w-full' : 'h-0 w-0 overflow-hidden'}>
		<div className='flex flex-row justify-between py-6 max-sm:py-4  px-6 items-center'>
			<div className='flex flex-row items-center'>
				<p className='text-[#101828] font-[600] text-lg max-sm:text-base mr-2'>Messages</p>
				<p className='text-[#6941C6] text-xs font-[500] bg-[#F9F5FF] px-2 py-1 rounded-2xl'>{chats?.length}</p>
			</div>
		</div>
		<div className='flex flex-col overflow-y-scroll'>
			{(chats || [{}])?.map((chat) => (
				<ChatCard key={chat.id} chat={chat} onChatClick={onChatClick} />
			))}
		</div>
	</div>
)

export default ChatList
