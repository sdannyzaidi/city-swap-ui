import { PrimaryHeader, Footer } from '@components'
import { Collapse } from 'antd'
import { useEffect } from 'react'

const FAQs = () => {
	const questions = [
		{
			key: '1',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>Do i need to be a homeowner to join city swapp?</p>,
			children: (
				<div>
					<p className='text-[#272C2D] text-[16px] font-[400]'>
						Not necessarily. For swapping, it is an agreement between two homes. If you are not the legal owner of your home (for example, if you are renting the
						property), we always recommend first discussing home swapping with your landlord, housing agent or other relevant persons before agreeing a swap, as
						they may need to review their insurance policy.
					</p>
					<p className='text-[#272C2D] text-[16px] font-[400] pt-6'>
						For subleasing, it is an agreement between two members. If you are not the legal owner of your home (for example, if you are renting the property), we
						always recommend first discussing subleasing with your landlord, housing agent or other relevant persons before agreeing to sublease, as they may need
						to review their insurance policy.
					</p>
				</div>
			),
		},
		{
			key: '2',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>Do I need to be a member to swap or sublease on city swapp?</p>,
			children: <p className='text-[#272C2D] text-[16px] font-[400]'>Yes.</p>,
		},
		{
			key: '3',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How does the free trial work?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					You can use the site just like a member for a month - completely free of charge. It is the perfect opportunity to see if swapping/subleasing is for
					you. During the one month membership, you can set up your home’s listing, explore the wide variety of homes that are available worldwide and get in
					touch with any of our members to start arranging swaps and subleases. At the end of your one month, your trial will become a paid annual membership.
					However, if City Swapp is not for you then you can decide not to continue after your free trial period and cancel online.
				</p>
			),
		},
		{
			key: '4',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How do I start a free trial?</p>,
			children: (
				<div>
					<p className='text-[#272C2D] text-[16px] font-[400]'>Starting a free trial with City Swapp is super easy!</p>
					<p className='text-[#272C2D] text-[16px] font-[400] pb-4'>
						First, you will need to create an account. Next, you will need to follow these simple steps:
					</p>
					<p className='text-[#272C2D] text-[16px] font-[400] pl-4 pb-2'>
						1. Log into your account, and click 'Start my free trial' in the top right-hand corner.
					</p>
					<p className='text-[#272C2D] text-[16px] font-[400] pl-4 pb-2'>2. You will then be able to see our available membership plan and select it.&nbsp;</p>
					<p className='text-[#272C2D] text-[16px] font-[400] pl-4 pb-2'>
						3. Once you have selected your membership plan, you will be prompted to add your credit card information which will enable the free trial to begin.
					</p>

					<p className='text-[#272C2D] text-[16px] font-[400]'>
						Your free trial is the ideal time to test out the website and explore the immense home swapping and subleasing options that are available to you. And
						of course, if you decide that home swapping or subleasing isn’t for you, then you can cancel your membership. If you have any questions, please reach
						out to us. Our Customer Service team would love to help!
					</p>
				</div>
			),
		},
		{
			key: '5',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>Is there a limit to how many times I can swap or sublease?</p>,
			children: <p className='text-[#272C2D] text-[16px] font-[400]'>Nope, you can swap or sublease as many times as you like during your membership!</p>,
		},
		{
			key: '6',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How does City Swapp keep my personal details secure?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					We take the safety and wellbeing of our members very seriously. If someone doesn’t have a membership with City Swapp, they will not be able to see the
					full details of your profile. This includes your exact location, your phone number, email address etc.
				</p>
			),
		},
		{
			key: '7',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How do I hand over or exchange keys?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					You can leave your keys with the neighbors or friends. You can also invest in an outdoor code lock box.
				</p>
			),
		},
		{
			key: '8',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How do I share my personal details with a member?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					We are committed to maintaining your privacy and protecting scams, phishing attacks and fraudulent payments, so we require all messages to be handled
					through City Swapp site. This enables us to provide a great level of service, and allows us to ensure that all interactions are meeting our Terms of
					Use.\n\n Once you agree on a trip with a member of City Swapp community ( and if you want to communicate off-site), you can exchange your personal
					details such as your email address or your phone number.
				</p>
			),
		},
		{
			key: '9',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How do reviews work?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					After any trip agreed through the site, City Swapp will drop you an email asking you to post a review on your stay. Reviews consist of a star rating
					out of 5, along with a comment section where you can let other members know about your experience. The home and your hosts. These reviews will be
					posted on your host’s profile.
				</p>
			),
		},
		{
			key: '10',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>What do I do if I’ve damaged something in my host’s home?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					We understand that accidental damage can happen on a trip. If something has been damaged, we would encourage you to reach out to your host immediately
					and let them know. It’s always best to have an honest conversation and find a resolution. Most hosts will be happy if you offer to pay to repair or
					replace items that have been damaged. They may even have insurance to protect against accidental damage caused by someone staying in their home – so
					get in touch with them, and we’re confident that you’ll find a simple solution.
				</p>
			),
		},
		{
			key: '11',
			label: (
				<p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>
					Why can’t I share my phone number or email address before I agree to a trip?
				</p>
			),
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					This is for your safety – and to ensure you have a consistently great experience with City Swapp! To maintain your privacy and protect you from scams,
					phishing attacks and fraudulent payments, we require all messages to be handled through the site. This enables us to provide a good level of service,
					and it ensures that all interactions adhere to our Terms of Use. Once you agree to a swap/sublease with another member, you can exchange details to
					communicate off-site.
				</p>
			),
		},
		{
			key: '12',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>How do I report a member?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					City Swapp has a friendly and welcoming community. However, if you are uncomfortable with a member’s behavior, please do let our Customer Service team
					know by emailing CitySwapp@gmail.com. We will follow up on any reports made to us, and look into the other member’s activity. Your safety, security
					and happiness are of the utmost importance to us.
				</p>
			),
		},
		{
			key: '13',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>What do I do if a guest causes damage in my home?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					City Swapp has a wonderful community of considerate home swappers/ subleasers. The very nature of home swapping means that our members are a
					houseproud bunch, so they take care of any homes they stay in as though they were their own. Of course, on rare occasions accidental damage can occur.
					In these instances, we’d always advise that the best course of action is to communicate with one another. With small things, such as a broken glass,
					most members will work out a fair amount of compensation together with their host. However, it’s a great idea to have a chat with your home insurance
					provider about any protection or packages that they offer for home swapping/ subleasing.
				</p>
			),
		},
		{
			key: '14',
			label: <p className='text-[#9B83CB] text-[16px] font-[700] uppercase tracking-[2%]'>Do we have to swap at the same time?</p>,
			children: (
				<p className='text-[#272C2D] text-[16px] font-[400]'>
					Yes you do. If the host can’t swap on the same dates as you, we recommend searching for the other subleasing places that are available in the platform
					and sublease your property instead in our platform to cover the rent.
				</p>
			),
		},
	]
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<div className='flex flex-col lg:px-32 md:px-12 max-ms:px-6 items-center pt-32 pb-32 min-h-[700px] w-full'>
				<p className='font-bold text-[#9B83CB] text-[36px] leading-[40px] pb-12'>Frequently asked questions</p>
				<div className='flex flex-col items-start w-full'>
					<Collapse defaultActiveKey={['1']} className='w-full'>
						{questions.map((question) => (
							<Collapse.Panel header={question.label} key={question.key}>
								{question.children}
							</Collapse.Panel>
						))}
					</Collapse>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default FAQs
