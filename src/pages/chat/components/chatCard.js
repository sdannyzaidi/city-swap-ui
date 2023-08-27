import { message } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const ChatCard = ({ chat, onChatClick }) => {
	const lastMessage = chat.messages?.slice(0)?.sort((a, b) => dayjs(b.timestamp).diff(a.timestamp))?.[0]
	const otherUser = chat?.users?.find((user) => user?._id !== JSON.parse(localStorage.getItem('user'))?.id)
	return (
		<div
			className={
				'flex flex-col w-full px-4 max-sm:px-3 pb-5 pt-4 border-b border-solid border-[#EAECF0] hover:bg-[#F9FAFB] hover:cursor-pointer ' +
				(chat.selected ? 'bg-[#F9FAFB]' : '')
			}
			onClick={() => onChatClick(chat._id)}
		>
			<div className='flex flex-row items-start justify-between pb-4'>
				<div className='flex flex-row items-center'>
					<div className='w-5 flex flex-row items-start justify-center'>
						<div className='bg-[#9E77ED] rounded-full w-2 h-2' />
					</div>
					<div className='w-[30px] h-[30px] rounded-full bg-[#664F94]'></div>
					<p className='text-sm max-sm:text-sm text-[#344054] font-[600] pl-3'>{otherUser?.name}</p>
				</div>
				<p className='text-[#475467] text-sm max-sm:hidden font-[400]'>{lastMessage ? dayjs(lastMessage.timestamp).fromNow() : ''}</p>
			</div>
			<p className='text-[#475467] text-sm  font-500 pl-5 line-clamp-2 text-ellipsis'>{lastMessage ? lastMessage.message : '...'}</p>
		</div>
	)
}
export default ChatCard
