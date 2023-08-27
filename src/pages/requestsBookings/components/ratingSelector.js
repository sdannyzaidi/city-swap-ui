import Icon from '@mdi/react'

const { mdiStar, mdiStarOutline } = require('@mdi/js')

const RatingSelector = ({ onChange, value }) => {
	return (
		<div className='flex flex-row items-center space-x-2'>
			{Array.from({ length: value }, (_, index) => (
				<div onClick={() => onChange(index + 1)}>
					<Icon key={index} path={mdiStar} size={1.3} className='text-[#FFAC33]' />
				</div>
			))}
			{Array.from({ length: 5 - value }, (_, index) => (
				<div onClick={() => onChange(value + index + 1)}>
					<Icon key={index} path={mdiStarOutline} size={1.3} className='text-[#FFAC33]' />
				</div>
			))}
		</div>
	)
}
export default RatingSelector
