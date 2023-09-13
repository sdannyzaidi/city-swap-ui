import { Footer, Form } from '@components'
import PrimaryHeader from '../../components/headers/primaryHeader'
import Icon from '@mdi/react'
import { mdiEmail, mdiLogout } from '@mdi/js'
import { Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import useUpdateUser from './hooks/useUpdateUser'
import { firebase } from '../../auth/firebase/config'
import { userAtom } from '@atoms'
import { useSetRecoilState } from 'recoil'

const Profile = () => {
	const navigator = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'))
	const [updateUser, loading] = useUpdateUser()
	const setUserAtom = useSetRecoilState(userAtom)
	const [form] = Form.useForm()
	// console.log(user)
	return (
		<div className='overflow-y-scroll'>
			<PrimaryHeader />
			<Form
				form={form}
				onFinish={(values) =>
					updateUser(values).then((response) => {
						if (response.status === 200) {
							notification['success']({
								message: 'User Updated Successfully',
								duration: 5,
								onClick: () => {
									notification.close()
								},
							})
							navigator('home')
						} else {
							console.log(response)
							notification['error']({
								message: 'User Update Failed',
								duration: 5,
								onClick: () => {
									notification.close()
								},
							})
						}
					})
				}
			>
				<div className='min-h-[70vh] lg:mx-64 sm:mx-16 max-md:mx-4 sm:mb-16 sm:mt-32 max-md:mb-4 max-md:mt-16 py-8 md:px-8 max-md:px-4 h-fit self-center bg-[#F9FAFB] rounded-lg flex flex-col'>
					<p className='text-[#101828] sm:text-[30px] max-md:text-[24px] font-[600] sm:pb-8 max-md:pb-4'>Profile</p>
					<div className='flex flex-col space-y-1 pb-8 mb-8 border-b border-solid border-[#EAECF0]'>
						<p className='text-[#101828] text-lg font-[600] max-md:hidden'>Personal info</p>
						<p className='text-[#475467] text-sm font-[400]'>Update your photo and personal details here.</p>
					</div>
					<div className='w-full flex md:flex-row max-md:flex-col items-start mb-6 border-b border-solid border-[#EAECF0]'>
						<p className='flex basis-1/3 text-[#344054]  max-md:pb-2 text-sm font-[600]'>Name</p>
						<div className='flex basis-2/3 '>
							{Form.renderSchema([
								{
									type: 'input',
									initialValue: user?.name,
									name: ['name'],
								},
							])}
						</div>
					</div>
					<div className='w-full flex md:flex-row max-md:flex-col items-start mb-6 border-b border-solid border-[#EAECF0]'>
						<p className='flex basis-1/3 text-[#344054]  max-md:pb-2 text-sm font-[600]'>Email</p>
						<div className='flex basis-2/3 '>
							{Form.renderSchema([
								{
									addonBefore: <Icon path={mdiEmail} size={1} className='text-[#4754677d]' />,
									type: 'input',
									initialValue: user?.email,
									name: ['email'],
								},
							])}
						</div>
					</div>
					<div className='w-full flex md:flex-row max-md:flex-col items-start border-b border-solid border-[#EAECF0]'>
						<p className='flex basis-1/3 text-[#344054]  max-md:pb-2 text-sm font-[600]'>Membership</p>
						<div className='flex basis-2/3 '>
							{Form.renderSchema([
								{
									addonBefore: <Icon path={mdiEmail} size={1} className='text-[#4754677d]' />,
									type: 'input',
									initialValue: user?.email,
									name: ['email'],
								},
							])}
						</div>
					</div>
					<div className='w-full flex flex-row items-center bg-white  rounded-lg  my-6 py-3 border border-solid border-[#EAECF0]'>
						<p
							className={`flex flex-row items-center py-2 px-4 text-sm font-[500] text-[#344054] ${' hover:bg-[#F9FAFB]'} rounded-md hover:cursor-pointer`}
							onClick={() => {
								firebase.auth().signOut()
								localStorage.setItem('user', JSON.stringify(null))
								localStorage.setItem('token', JSON.stringify(null))
								setUserAtom(null)
								navigator('/home/about')
							}}
						>
							<Icon path={mdiLogout} size={1} className='text-red-400' />
							<p size={1} className='text-red-400 pl-2 '>
								Logout
							</p>
						</p>
					</div>
				</div>
			</Form>
			<div className={`w-full flex flex-row justify-end items-center md:px-64 max-md:px-4 pb-16`}>
				<Button
					className='btn-secondary mr-6'
					// disabled={loading || otherLoading}
					onClick={() => {
						navigator('/home')
					}}
				>
					CANCEL
				</Button>

				<Button
					// loading={loading || otherLoading}
					className='btn-primary !h-10 text-lg'
					loading={loading}
					onClick={() => {
						form.submit()
					}}
				>
					SUBMIT
				</Button>
			</div>
			<Footer />
		</div>
	)
}

export default Profile
