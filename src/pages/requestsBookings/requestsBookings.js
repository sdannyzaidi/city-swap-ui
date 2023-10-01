import { useCallback, useEffect, useState } from 'react'
import { PrimaryHeader, Footer } from '@components'
import { listingsAtom, requestsAtom } from '@atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import RequestCard from './components/requestCard'
import MyListingCard from './components/myListingCard'
import Loader from '../../components/utility/loader'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Modal, notification } from 'antd'
import Icon from '@mdi/react'
import { mdiArrowRight, mdiDeleteOutline } from '@mdi/js'
import ResizeObserver from 'rc-resize-observer'
import { endpoints } from '../../helpers/enums'
import { listingByUserSelector, receivedRequestsSelector, userRequestsSelector } from './helpers/selectors'

const RequestBookings = () => {
	const navigator = useNavigate()
	const { page: initPage } = useParams()
	const [page, setPage] = useState(
		initPage
			? [
					{ title: 'Requests', page: 'requests' },
					{ title: 'My Swaps / Subleases', page: 'swaps-subleases' },
					{ title: 'My Listings', page: 'my-listings' },
			  ].find((item) => item.page === initPage)
			: { title: 'Requests', page: 'requests' }
	)

	const [headerHeight, setHeaderHeight] = useState()
	const [modalData, setModalData] = useState({ visible: false })
	const setRequests = useSetRecoilState(requestsAtom)
	const setListings = useSetRecoilState(listingsAtom)
	const userListings = useRecoilValue(listingByUserSelector({ id: JSON.parse(localStorage.getItem('user'))?.id }))
	const userRequests = useRecoilValue(userRequestsSelector())
	const receivedRequests = useRecoilValue(receivedRequestsSelector())

	const [loading, setLoading] = useState(false)
	const [sideBar, setSideBar] = useState({ visible: true, type: 'sidebar' })
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const fetchOtherData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['user-properties'](loggedInUser?.id)}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			// console.log({ data })
			setListings(data)
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
	}, [])
	const fetchData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['user-requests'](loggedInUser?.id)}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			// console.log({ data })
			setRequests(data)
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
	}, [])
	const deleteProperty = useCallback(async (id) => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}${endpoints['delete-property']?.(id)}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			// const data = await response.json()
			// console.log({ data })
			// setRequests(data)
			setLoading(false)
			notification['success']({
				message: 'Property deletion successfully',
				duration: 5,
				onClick: () => {
					notification.close()
				},
			})
			navigator('home')
		} else {
			// console.log(response)
			setLoading(false)
			notification['error']({
				message: 'Cannot delete property due to clash with pending request"',
				duration: 5,
				onClick: () => {
					notification.close()
				},
			})
		}
	}, [])
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		fetchData()
		fetchOtherData()
	}, [])

	console.log({ headerHeight })
	return (
		<ResizeObserver
			onResize={({ width, height }) => {
				if (width < 640) {
					setSideBar({ visible: true, type: 'drawer' })
				} else {
					setSideBar({ visible: true, type: 'sidebar' })
				}
			}}
		>
			<div className=''>
				<PrimaryHeader setHeaderHeight={setHeaderHeight} />
				{headerHeight && headerHeight !== 0 && (
					<div className='relative flex flex-row'>
						<div
							className={`flex border-r border-solid border-[#dfe0e2] ${
								sideBar.type === 'drawer'
									? `${
											sideBar.visible ? ' w-[250px] opacity-100  flex-row items-start shadow-[10px_0_20px_-10px_rgba(0,0,0,0.1)]' : 'w-[0px] opacity-0'
									  } bg-white transition-[width,opacity] duration-200 fixed left-0 z-10`
									: 'w-[250px] min-w-[150px] pt-16'
							}  `}
							style={sideBar.type === 'drawer' ? { height: `calc(100vh - ${headerHeight}px)`, top: `${headerHeight}px` } : {}}
						>
							<div className='flex flex-col h-fit sm:pt-12 max-md:pt-4 md:px-6 max-md:px-4 space-y-1'>
								{[
									{ title: 'Requests', page: 'requests' },
									{ title: 'My Swaps / Subleases', page: 'swaps-subleases' },
									{ title: 'My Listings', page: 'my-listings' },
								].map((item) => (
									<p
										className={`px-2 py-2 text-sm font-[500] text-[#344054] ${
											page.page === item.page ? 'bg-[#F4EBFF] text-[#101828]' : ' hover:bg-[#F9FAFB]'
										} rounded-md hover:cursor-pointer`}
										onClick={() => setPage(item)}
									>
										{item.title}
									</p>
								))}
							</div>
						</div>
						{sideBar.type === 'drawer' ? (
							<div className='fixed left-0 z-20 flex flex-col h-screen items-start justify-center bg-transparent pr-4'>
								<div className={`${!sideBar.visible ? 'opacity-100' : 'opacity-0 w-0'} transition-opacity duration-1000`}>
									<div
										className='cursor-pointer p-2 w-fit  rounded-r-lg bg-white shadow-[0_-4px_20px_4px_rgba(0,0,0,0.1)]'
										onClick={() => {
											setSideBar({ visible: true, type: 'drawer' })
										}}
									>
										<Icon path={mdiArrowRight} size={0.8} className='text-center leading-8 text-[#475467]' />
									</div>
								</div>
							</div>
						) : null}
						<div
							className={`${sideBar.type === 'drawer' ? `w-full ` : 'w-3/4'}  h-full`}
							onClick={() => {
								if (sideBar.visible && sideBar.type === 'drawer') {
									setSideBar({ visible: false, type: 'drawer' })
								}
							}}
						>
							<div className='flex flex-col min-h-[96vh] pt-24  !h-fit basis-[80%] px-6 space-y-1 overflow-y-scroll'>
								<p className='text-[#101828] text-[30px] font-[600] pb-8'>{page.title}</p>
								{(page.page === 'requests' && receivedRequests && receivedRequests?.length > 0) ||
								(page.page === 'swaps-subleases' && userRequests && userRequests?.length > 0) ||
								(page.page === 'my-listings' && userListings && userListings?.length > 0) ? (
									<div className='flex flex-col space-y-4 pb-16 sm:mr-36'>
										{page.page === 'requests'
											? receivedRequests?.map((request, index) => <RequestCard type={'received'} request={request} index={index} />)
											: page.page === 'swaps-subleases'
											? userRequests?.map((request, index) => <RequestCard type={'sent'} request={request} index={index} />)
											: page.page === 'my-listings'
											? userListings?.map((listing, index) => <MyListingCard listing={listing} index={index} navigator={navigator} setModalData={setModalData} />)
											: null}
									</div>
								) : loading ? (
									<div className='flex flex-col justify-center items-center h-full'>
										<div className='my-auto align-middle'>
											<Loader />
										</div>
									</div>
								) : (
									<p className='text-[#919191] font-[500] text-lg pb-7 pl-2'>
										{page.page === 'requests'
											? 'No Requests'
											: page.page === 'swaps-subleases'
											? 'No Swaps / Subleases'
											: page.page === 'my-listings'
											? 'No Listings Added'
											: null}
									</p>
								)}
							</div>
						</div>
					</div>
				)}

				<Footer />
				<Modal
					open={modalData.visible}
					footer={
						<div className='w-full items-center justify-end flex flex-row' key='footer'>
							{[
								{ type: 'cancel', className: 'btn-secondary', title: 'CANCEL', onClick: () => setModalData({ visible: false }) },
								{
									type: 'submit',
									className: 'btn-delete',
									title: 'DELETE',
									onClick: () => {
										deleteProperty(modalData.listing?.property?._id)
											.then(() => {
												setModalData({ visible: false })
											})
											.catch((error) => {
												console.log({ error })
												setModalData({ visible: false })
											})
									},
								},
							]?.map((button, index) => {
								return (
									<Button id={button?.type} className={button?.className} style={{ height: 40 }} onClick={button?.onClick} key={'button-' + index} loading={loading}>
										{button?.title}
									</Button>
								)
							})}
						</div>
					}
				>
					<div className='flex flex-col items-center justify-center my-12 px-16'>
						{/* <p className='text-[#D92D20] text-lg font-[500] mt-8'>Delete Property</p> */}
						<Icon size={3} path={mdiDeleteOutline} className='text-[#D92D20]' />

						<p className='text-[#475467] text-base font-[400] my-8 text-center'>
							Are you sure you want to delete&nbsp;{modalData.listing?.property?.title}&nbsp;?
						</p>
					</div>
				</Modal>
			</div>
		</ResizeObserver>
	)
}

export default RequestBookings
