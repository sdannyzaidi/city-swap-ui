import { useState } from 'react'
import { AUTH_EVENTS, SignupFlowEnum } from '../../../auth/helpers/enums'
import { AlertBanner } from '@components'
import { Form, Layout, notification } from 'antd'
import StepsHeader from './StepsHeader'
import StepsFooter from './StepsFooter'

const StepsSignup = ({ dispatch, dispatchLoading, alert, setAlert }) => {
	const [form] = Form.useForm()
	const [page, setPage] = useState(0)
	const [otp, setOtp] = useState('')
	const pages = SignupFlowEnum?.pages
	const [promiseLoading, setPromiseLoading] = useState(false)
	const [termsAndConditions, setTermsAndConditions] = useState(false)
	const [finishFunction] = pages?.[page]?.useFinishFunction ? pages?.[page]?.useFinishFunction() : []

	const disableFunction = pages?.[page]?.checkButtonDisable
	const maxPage = pages?.length
	const buttonfuncs = {
		cancel: () => navigator(-1),
		back: () => (page <= 0 ? navigator(-1) : setPage((prev) => prev - 1)),
		next: () => (page >= maxPage ? () => {} : setPage((prev) => prev + 1)),
		validateNext: () =>
			page >= maxPage
				? () => {}
				: form
						.validateFields()
						.then(() => setPage((prev) => prev + 1))
						.catch((e) => console.log(e)),
		dispatch: () =>
			form
				.validateFields()
				.then(() =>
					dispatch({
						type: AUTH_EVENTS.SIGNUP,
						payload: { ...form.getFieldsValue(true) },
					})
				)
				.catch((e) => console.log(e)),
		submit: () => handleFinish(),
		custom: (button) => button.function(),
	}

	const handleValueChanges = (changedFields) => {
		if (changedFields?.termsAndConditions !== undefined) {
			setTermsAndConditions(changedFields?.termsAndConditions)
		}
	}

	const handleFinish = () => {
		form
			.validateFields()
			.then(async () => {
				setPromiseLoading(true)
				return await finishFunction({ values: { ...form.getFieldsValue(true) }, backendOTP: otp, setOtp })
					.then((response) => response)
					.catch((e) => {
						console.log(e)
						return { type: 'error', message: 'Error', description: e.message }
					})
			})
			.then(async (queryresult) => {
				console.log({ queryresult })
				if (queryresult?.type) {
					notification[queryresult?.type]({
						message: queryresult.message,
						description: queryresult.description,
						duration: '5',
					})
				}
				setPromiseLoading(false)
				if (page !== maxPage && queryresult?.type !== 'error') {
					setPage((prev) => prev + 1)
				}
			})
			.catch((e) => {
				console.log(e)
			})
	}
	return (
		<Layout className='flex flex-col py-4 px-10 !w-full bg-white items-start'>
			<div className='font-bold text-[24px] mb-8'>Create an Account</div>
			{alert.type !== '' && AlertBanner(alert, setAlert)}
			<Layout.Header className={`flex flex-col !w-full  items-start justify-between py-2 bg-white ${pages?.length === 1 ? 'px-6' : 'px-0'}`}>
				<StepsHeader page={page} pages={pages} />
			</Layout.Header>

			<Layout.Content className='overflow-scroll bg-white p-6'>
				<Form layout='vertical' form={form} onValuesChange={handleValueChanges} scrollToFirstError={{ behavior: 'smooth', block: 'center' }}>
					{pages?.[page]?.columns?.map((column) => (
						<div key={page} className={`${column?.widthClassName} `}>
							<column.element
								{...{
									otp,
									setOtp,
									form,
									index: page,
									finishFunction,
									setPromiseLoading,
									termsAndConditions,
									formValues: form.getFieldsValue(true),
								}}
							/>
						</div>
					))}
				</Form>
			</Layout.Content>
			<Layout.Footer className='h-16 bg-white !p-2'>
				<StepsFooter
					page={page}
					pages={pages}
					promiseLoading={promiseLoading}
					buttonfuncs={buttonfuncs}
					disableFunction={disableFunction}
					dispatchLoading={dispatchLoading}
					termsAndConditions={termsAndConditions}
				/>
			</Layout.Footer>
		</Layout>
	)
}

export default StepsSignup
