import { Form } from '@components'
import PrimaryHeader from '../../components/headers/primaryHeader'
import Icon from '@mdi/react'
import { mdiEmail } from '@mdi/js'
import { Button, notification } from 'antd'
import { useNavigate } from 'react-router-dom'
import useUpdateUser from './hooks/useUpdateUser'

const Profile = () => {
	const navigator = useNavigate()
	const user = JSON.parse(localStorage.getItem('user'))
	const [updateUser, loading] = useUpdateUser()
	const [form] = Form.useForm()
	console.log(user)
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
				<div className='min-h-[70vh] mx-64 my-16 py-8 px-8 h-fit self-center bg-[#F9FAFB] rounded-lg flex flex-col'>
					<p className='text-[#101828] text-[30px] font-[600] pb-8'>Profile</p>
					<div className='flex flex-col space-y-1 pb-8 mb-8 border-b border-solid border-[#EAECF0]'>
						<p className='text-[#101828] text-lg font-[600]'>Personal info</p>
						<p className='text-[#475467] text-sm font-[400]'>Update your photo and personal details here.</p>
					</div>
					<div className='w-full flex flex-row items-start mb-6 border-b border-solid border-[#EAECF0]'>
						<p className='flex basis-1/3 text-[#344054] text-sm font-[600]'>Name</p>
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
					<div className='w-full flex flex-row items-start mb-6 border-b border-solid border-[#EAECF0]'>
						<p className='flex basis-1/3 text-[#344054] text-sm font-[600]'>Email</p>
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
				</div>
			</Form>
			<div className={`w-full flex flex-row justify-end items-center px-64 pb-16`}>
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
					className='btn-primary'
					onClick={() => {
						form.submit()
					}}
				>
					Submit
				</Button>
			</div>
			<div className='w-full bg-[#664F94] h-[280px]'></div>
		</div>
	)
}

export default Profile
