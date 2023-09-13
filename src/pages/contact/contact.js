import { PrimaryHeader, Footer, Form } from '@components'
import { Button } from 'antd'
import { useEffect } from 'react'

const Contact = () => {
	const [form] = Form.useForm()
	const handleFinish = (values) => {
		console.log(values)
	}
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<Form layout='vertical' onFinish={handleFinish}>
				<div className='flex flex-col lg:px-32 md:px-12 max-ms:px-6 items-center pt-32 pb-32 min-h-[700px] w-full'>
					<p className='font-bold text-[#9B83CB] text-[36px] leading-[40px] pb-12'>Contact Us</p>
					<p className='text-base text-[#272C2D] font-[400] pb-6 w-full text-start'>
						Enter your details below and we will get back to you as soon as possible.
					</p>
					<div className='flex flex-col items-start w-full'>
						{Form.renderFormItem({
							type: 'input',
							inputType: 'textArea',
							rows: 10,
							itemClassName: 'w-full',
							placeholder: 'Enter your message here',
							className: 'w-full',
							// label: 'Message',
							required: true,
							message: 'Please enter a message to send',
							name: ['message'],
						})}
					</div>
					<div className='w-full flex flex-row justify-end'>
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
				</div>
			</Form>

			<Footer />
		</div>
	)
}

export default Contact
