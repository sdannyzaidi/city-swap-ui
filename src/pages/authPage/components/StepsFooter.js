import { Button } from 'antd'

const StepsFooter = ({ pages, page, buttonfuncs, promiseLoading, disableFunction, termsAndConditions, dispatchLoading }) => (
	<div className='flex w-full flex-row items-center justify-center' key='footer'>
		{pages?.[page]?.buttons
			?.filter((button) => !(button?.type === 'next' && !pages?.[page + 1]))
			?.map((button, index) => {
				return (
					<Button
						id={button?.type}
						disabled={disableFunction ? disableFunction?.({ termsAndConditions }) : false}
						className={`${button?.className} ml-3 !h-14 !w-80`}
						style={{ height: 40 }}
						onClick={buttonfuncs[button?.type]}
						loading={promiseLoading || dispatchLoading}
						key={'button-' + index}
					>
						{button?.title}
					</Button>
				)
			})}
	</div>
)
export default StepsFooter
