const ChatHeader = ({ user }) => {
	return (
		<div className='flex flex-row items-center w-full py-5 max-sm:py-3 max-sm:px-4 px-6 bg-white border-b border-solid border-[#EAECF0]'>
			<div className='w-[38px] max-sm:w-[30px] max-sm:h-[30px] h-[38px] rounded-full bg-[#664F94]'></div>
			<p className='text-lg max-sm:text-base text-[#101828] font-[600] pl-4'>{user.name || 'Katherine Moss'}</p>
		</div>
	)
}

export default ChatHeader
