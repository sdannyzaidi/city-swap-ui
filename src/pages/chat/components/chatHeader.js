import { Button } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

const ChatHeader = ({ chat }) => {
	const { id } = useParams()
	const navigator = useNavigate()

	const user = chat?.users?.find((user) => user._id !== JSON.parse(localStorage.getItem('user')).id)
	return (
		<div className='flex flex-row items-center justify-between w-full py-5 max-md:py-3 max-md:px-4 px-6 bg-white border-b border-solid border-[#EAECF0]'>
			<div className='flex flex-row items-center'>
				<div className='w-[38px] max-md:w-[30px] max-md:h-[30px] h-[38px] rounded-full bg-[#664F94]'></div>
				<p className='text-lg max-md:text-base text-[#101828] font-[600] pl-4'>{user?.name}</p>
			</div>
			{id && (
				<Button className='flex flex-row items-center ml-5 btn-secondary hover:cursor-pointer' onClick={() => navigator(`/listing/${id}`)}>
					Go Back to Listing
				</Button>
			)}
		</div>
	)
}

export default ChatHeader
