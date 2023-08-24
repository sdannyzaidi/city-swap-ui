import { useCallback, useEffect, useState } from 'react'
import PrimaryHeader from '../../components/headers/primaryHeader'
import { listingsAtom } from '@atoms'
import { useRecoilState } from 'recoil'
import RequestCard from './components/requestCard'
import OldListingsCard from './components/swapCard'
import MyListingCard from './components/myListingCard'
import Loader from '../../components/utility/loader'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import Icon from '@mdi/react'
import { mdiDeleteOutline } from '@mdi/js'

const RequestBookings = () => {
	const navigator = useNavigate()
	const [page, setPage] = useState({ title: 'Requests', page: 'requests' })
	const [modalData, setModalData] = useState({ visible: false })
	const [data, setData] = useRecoilState(listingsAtom)
	const [loading, setLoading] = useState(false)
	const fetchData = useCallback(async () => {
		setLoading(true)
		const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}propertyInfo/`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
		if (response.status === 200) {
			const data = await response.json()
			console.log({ data })
			setData(data)
			setLoading(false)
		} else {
			console.log(response)
			setLoading(false)
		}
	}, [])
	useEffect(() => {
		fetchData()
	}, [])
	return (
		<div className='overflow-y-scroll'>
			<PrimaryHeader />
			<div className='flex flex-row min-h-[96vh] h-fit'>
				<div className='flex flex-col min-h-[96vh] pt-12 !h-full basis-[20%] px-6 border-r border-solid  border-[#F2F4F7] space-y-1'>
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
				<div className='flex flex-col min-h-[96vh] pt-12  !h-fit basis-[80%] px-6 space-y-1'>
					<p className='text-[#101828] text-[30px] font-[600] pb-8'>{page.title}</p>
					{data && data?.length > 0 ? (
						<div className='flex flex-col space-y-4 pb-16 mr-36'>
							{data.map((listing, index) =>
								page.page === 'requests' ? (
									<RequestCard listing={listing} index={index} />
								) : page.page === 'swaps-subleases' ? (
									<OldListingsCard listing={listing} index={index} />
								) : page.page === 'my-listings' ? (
									<MyListingCard listing={listing} index={index} navigator={navigator} setModalData={setModalData} />
								) : null
							)}
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

			<div className='w-full bg-[#664F94] h-[280px]'></div>
			<Modal
				open={modalData.visible}
				footer={
					<div className='w-full items-center justify-end flex flex-row' key='footer'>
						{[
							{ type: 'cancel', className: 'btn-secondary', title: 'CANCEL', onClick: () => setModalData({ visible: false }) },
							{ type: 'submit', className: 'btn-delete', title: 'DELETE', onClick: () => setModalData({ visible: false }) },
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
	)
}

export default RequestBookings
