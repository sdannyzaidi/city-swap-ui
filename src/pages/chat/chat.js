import { useCallback, useEffect, useState } from 'react'
import PrimaryHeader from '../../components/headers/primaryHeader'
import ChatList from './components/chatList'
import ChatMessages from './components/chatMessages'
import ResizeObserver from 'rc-resize-observer'
import Icon from '@mdi/react'
import { mdiArrowRight } from '@mdi/js'
import { Tooltip } from 'antd'
import { firestore } from '../../auth/firebase/config'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { chatsAtom } from '@atoms'
import { userChatSelector } from './helpers/selectors'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Chat = () => {
	const { id } = useParams()
	const { state = {} } = useLocation()
	const { user } = state || {}
	const navigate = useNavigate()

	const [headerHeight, setHeaderHeight] = useState(0)
	const [chatSideBar, setChatSideBar] = useState({ visible: true, type: 'sidebar' })
	const setChatsAtom = useSetRecoilState(chatsAtom)
	const [loading, setLoading] = useState(true)
	const chats = useRecoilValue(userChatSelector({ id: JSON.parse(localStorage.getItem('user')).id, selectedChatId: id }))
	const onChatClick = useCallback((id) => {
		navigate(`/chat/${id}`)
	}, [])
	useEffect(() => {
		if (!loading && chats && id) {
			const chatExists = chats.some((chat) => chat?.users?.some((user) => user?._id === id || chat?._id === id))
			if (!chatExists) {
				firestore
					.collection('chats')
					.doc(`${id}+${JSON.parse(localStorage.getItem('user')).id}`)
					.set({
						_id: `${id}+${JSON.parse(localStorage.getItem('user')).id}`,
						users: [
							{ _id: id, name: user?.name },
							{ _id: JSON.parse(localStorage.getItem('user')).id, name: JSON.parse(localStorage.getItem('user')).name },
						],
						messages: [],
					})
			}
		}
	}, [loading])
	useEffect(() => {
		setLoading(true)
		const unsubscribe = firestore
			.collection('chats')
			.where('users', 'array-contains', { _id: JSON.parse(localStorage.getItem('user')).id, name: JSON.parse(localStorage.getItem('user')).name })
			.onSnapshot((snapshot) => {
				const userChats = snapshot.docs.map((doc) => ({
					...doc.data(),
				}))
				// console.log('userChats', userChats)
				setChatsAtom(userChats)
				setLoading(false)
			})
		return unsubscribe
	}, []) // eslint-disable-line

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
				<PrimaryHeader setHeaderHeight={setHeaderHeight} />
				{headerHeight !== 0 && (
					<div className='flex flex-row flex-grow relative'>
						<div
							className={`flex border-r border-solid border-[#D0D5DD] ${
								chatSideBar.type === 'drawer'
									? `${
											chatSideBar.visible ? ' w-[300px] opacity-100  flex-row items-center shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]' : 'w-[0px] opacity-0'
									  } bg-white transition-[width,opacity] duration-200 fixed left-0 z-20`
									: 'w-1/4 min-w-[300px] pt-24'
							}  `}
							style={chatSideBar.type === 'drawer' ? { height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` } : {}}
						>
							<ChatList headerHeight={headerHeight} chats={chats} visible={chatSideBar.visible} onChatClick={onChatClick} />
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
							className={`${chatSideBar.type === 'drawer' ? `w-full  pt-14` : 'w-3/4  pt-20'}  h-full`}
							onClick={() => {
								if (chatSideBar.visible && chatSideBar.type === 'drawer') {
									setChatSideBar({ visible: false, type: 'drawer' })
								}
							}}
						>
							<ChatMessages headerHeight={headerHeight} chats={chats} />
						</div>
					</div>
				)}
			</div>
		</ResizeObserver>
	)
}

export default Chat
