import dayjs from 'dayjs'
import { useRef, useState } from 'react'

const Message = ({ messages, className, loggedInUser }) => {
	const [time, setTime] = useState(dayjs(messages.timestamp).fromNow())
	const dateRef = useRef(null)
	setInterval(() => setTime(dayjs(messages.timestamp).fromNow()), 60000)
	return (
		<div
			className={`flex flex-col w-fit max-w-[60%] min-w-[200px]' ${messages.user?._id === loggedInUser?.id ? 'items-end' : 'items-start'} ${className}`}
		>
			<div className={`flex flex-row ${messages.user?._id === loggedInUser?.id ? 'justify-start' : 'justify-end'}  items-center   pb-2`}>
				<p className='text-[#475467] text-xs font-[400]'>{time}</p>
			</div>
			{messages?.messages?.map((message, index) => (
				<div
					className={`flex flex-row w-fit max-w-[60%] min-w-[200px] justify- items-start mb-2 ${
						messages.user?._id === loggedInUser?.id ? 'bg-[#664F94] rounded-[8px_0px_8px_8px] justify-end' : 'bg-[#F2F4F7] rounded-[0_8px_8px_8px] justify-start'
					}  px-4 py-3 ${index === messages?.messages?.length - 1 ? 'mb-4' : ''}`}
				>
					<p className={`text-base max-sm:text-sm ${messages.user?._id === loggedInUser?.id ? 'text-white' : 'text-[#101828]'}  w-full text break-words`}>
						{message?.message || 'Hey Olivia, I’ve finished with the requirements doc! I made some notes in the gdoc as well for Phoenix to look over.'}
					</p>
				</div>
			))}
		</div>
	)
}

export default Message
