import { Steps } from 'antd'

const { Step } = Steps

const StepsHeader = ({ pages, page, showBackIcon = false, buttonfuncs }) => {
	return (
		<>
			<div className='flex w-full h-full flex-grow-0 flex-row items-center justify-start bg-white'>
				<Steps direction='horizontal' size='small' current={page} progressDot items={pages?.map((page) => ({ title: page.title }))}>
					{pages
						?.filter((page) => !page.resultPage)
						?.map((pageData, index) => (
							<Step key={`step-${index}`} className='items-center' status={index < page ? 'finish' : 'process'} />
						))}
				</Steps>
			</div>
		</>
	)
}

export default StepsHeader
