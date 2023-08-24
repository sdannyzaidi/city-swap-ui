import { mdiEmoticonHappyOutline } from '@mdi/js'
import Icon from '@mdi/react'
import { Button, Input, Popover } from 'antd'
import dayjs from 'dayjs'
import EmojiPicker from 'emoji-picker-react'
import { useCallback, useEffect, useRef, useState } from 'react'

const MessageInput = ({ sendMessage, setMessages, lastMessageRef }) => {
	const [height, setHeight] = useState(120)
	const [inputValue, setInputValue] = useState('')
	const newMessage = useCallback(() => {
		if (inputValue?.length > 0) {
			setMessages((prevVal) => {
				const newMessages = [...prevVal?.map((messages) => messages.messages).flat(), { message: inputValue, user: 'me', timestamp: dayjs().format() }]
				return (
					Object.values(
						newMessages?.reduce(
							(prev, message) => ({
								...prev,
								[`${dayjs(message.timestamp).fromNow()}-${message.user}`]: {
									timestamp: message.timestamp,
									user: message.user,
									messages: [...(prev[[`${dayjs(message.timestamp).fromNow()}-${message.user}`]]?.messages || []), message],
								},
							}),
							{}
						)
					) || []
				)
			})
			setInputValue('')
			lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' })
		}
	})
	return (
		<div
			className='flex flex-row mb-8 max-sm:mb-0 max-sm:mx-4  mx-8 border border-solid border-[#D0D5DD] rounded-lg py-3 px-3'
			style={{ height: height + 24 }}
		>
			<Input.TextArea
				id='message-input'
				value={inputValue}
				onInput={(e) => {
					setInputValue(e.target.value)
				}}
				onResize={(e) => e.height > 120 && setHeight(e.height)}
				onPressEnter={(e) => {
					document.getElementById('message-input').blur()
					newMessage()
					setTimeout(() => {
						document.getElementById('message-input').focus()
					}, [1000])
				}}
				placeholder='Send Message'
				className='basis-[90%]'
				rows={4}
				bordered={false}
				autoSize={{ minRows: 2, maxRows: 8 }}
			/>
			<div className='flex flex-row items-end justify-end basis-[10%] '>
				<div className='flex flex-row items-center'>
					<Popover
						trigger='click'
						content={
							<EmojiPicker
								onEmojiClick={(emoji) => setInputValue((prev) => prev + emoji.emoji)}
								width={300}
								height={350}
								lazyLoadEmojis={true}
								previewConfig={{ showPreview: false }}
							/>
						}
					>
						<Icon path={mdiEmoticonHappyOutline} size={1} className='text-[#667085] hover:cursor-pointer' />
					</Popover>
					<Button className='btn-primary !h-[40px] ml-4' onClick={newMessage} disabled={inputValue?.length <= 0}>
						Send
					</Button>
				</div>
			</div>
		</div>
	)
}

export default MessageInput
