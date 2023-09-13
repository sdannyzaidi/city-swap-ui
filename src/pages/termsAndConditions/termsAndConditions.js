import { PrimaryHeader, Footer } from '@components'
import { useEffect } from 'react'

const TermsAndConditions = () => {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}, [])
	return (
		<div className='overflow-y-scroll h-full flex flex-col justify-between'>
			<PrimaryHeader />
			<div className='flex flex-col lg:px-32 md:px-12 max-md:px-6 items-center pt-32 pb-32 min-h-[700px]'>
				<p className='font-bold text-[#9B83CB] text-[36px] leading-[40px] pb-12'>Terms and Conditions </p>
				<p className='font-bold text-[#9B83CB] text-[16px] leading-[28px] uppercase w-full text-start'>Member Terms and Conditions</p>

				<div className='flex flex-col items-start space-y-6 pt-4'>
					<p className=' text-[#272C2D] font-[700] text-lg '>1. Introduction</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						1.1.These terms of membership (“Terms”) set out the contract between City Swapp and any individual who is accepted by us for City Swapp membership
						(“Member” or “you”).
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						1.2.These Terms apply to all services offered by City Swapp to Members, and their guests (if applicable), together with any other applicable terms and
						conditions notified to you by City Swapp from time to time.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						1.3.These Terms shall be governed by and construed in accordance with the laws of Australia, irrespective of the nationality of the Member.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						1.4.Other services offered by third parties with the permission of City Swapp are subject to separate terms and conditions which will be notified to
						you at the time such offers are made.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>2. Your relationship with City Swapp</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>2.1.By becoming a Member you are appointing City Swapp as your agent to:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						2.1.1.introduce you to other Members who have listed their Home (as defined in term 2.2) which you may like to accept as an Exchange (as defined in
						term 5.1). For the purposes of these Terms, when you stay in another Member’s Home you are a “Guest”;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						2.1.2.introduce you to other Members who would like to stay in the Home that you have listed. For the purposes of these Terms, when another Member
						stays in your Home you are a “Host”;{' '}
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						2.2.You acknowledge that City Swapp does not own, control or in any way manage any property listed on the City Swapp platform (“Home”) and that City
						Swapp makes no promise or representation whatsoever in relation to any Home including, but not limited to, the level of cleanliness of a Home. You
						must make your own enquiries and satisfy yourself on such matters.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						2.3.We make no promise or statement that your City Swapp membership will produce any particular outcome - for example, Exchanges into specific Homes
						or locations.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>3. Membership</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>3.1.By applying for City Swapp membership you confirm that:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>3.1.1.you are at least 18 years of age (or older if required by applicable local laws);</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.1.2.the City Swapp sign up process, in the form required by City Swapp from time to time, has or will be completed and submitted to City Swapp,
						either by you or on your behalf (“Application”);
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>3.1.3.you:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.1.3.1.are the owner, or co-owner, of the applicable Home you wish to list on the City Swapp Platform (“Platform”); or
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.1.3.2.have the approval of the owner or co-owners of the applicable Home you wish to list/sublease on the Platform;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.1.4.if you agree an Exchange or sublease with another Member, such booking shall be in respect of the Home listed on the Platform; and
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.1.5.you shall pay all applicable subleasing fees to the host at the time and in the manner specified by the host. If it's a swap, there are no fees
						being exchanged between members.{' '}
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.2.We reserve the right to refuse any application for membership at our discretion including, without limitation, where we are required to do so by
						the laws, rules or regulations of any local, state, national or federal governmental entity or by judicial, public, regulatory or law enforcement
						authority or court.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.3.Where there is a legal requirement in certain jurisdictions for City Swapp to facilitate the collection of information for reporting purposes, you
						instruct and authorize City Swapp to collect and report such information as may be required about you and your property to the relevant authorities.
						City Swapp reserves the right to suspend or terminate your membership and/or refuse or remove any listing or cancel any booking (s) at our discretion
						should you fail to provide us with information and / or documentation that we deem sufficient to support any such reporting obligation required by
						law, until such information and / or documentation is provided by you.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.4.In the event that City Swapp suspend or terminate your membership and/or refuse or remove any listing or cancel any booking (s) pursuant to term
						3.3, City Swapp shall be under no obligation to refund the membership fee paid, the scheme points and/or any fees associated with canceled booking (s)
						either in whole or in part.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.5.Without prejudice to any other rights or remedies City Swapp may have, City Swapp reserves the right at its sole discretion to carry out
						background checks and/or refuse, cancel or terminate a membership, membership application or membership renewal if City Swapp becomes aware that a
						Member, or prospective member:
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						{' '}
						3.5.1. has or may have a criminal conviction that, in City Swapp reasonable opinion, may impact the Member’s ability to act as a Host and/or a Guest;
						or 3.5.2. has or may have previously behaved in a way that has called into question their ability to meet City Swapp’s expectations of its Hosts
						and/or Guests (as outlined in these Terms and the Member Exclusion Policy)
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.6.City Swapp shall use its reasonable endeavors to investigate any information and/or allegations it receives in relation to term 3.5 and shall only
						terminate a membership if it is satisfied (acting reasonably) that there is substance to such information and/or allegation.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.7.In the event that City Swapp refuse, cancel or terminate your membership, membership application or membership renewal pursuant to terms 3.5 and
						3.6 City Swapp shall be under no obligation to refund the membership fee paid (either in whole or part) and any such refund issued shall be entirely
						at the discretion of City Swapp.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.8.If accepted, your membership shall start on the day on which (a) City Swapp has received, processed and accepted your Application; and (b) City
						Swapp has received the applicable membership fee. City Swapp may terminate/refuse membership if we do not receive the applicable fee.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>3.9.Membership is personal to you and cannot be transferred or sold.</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.10. City Swapp shall not be liable for any damages caused by the members at the sublease/swap properties between members. Members should speak to
						their insurance provider if there are any damages/disputes of some sort.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.11. City Swapp shall be permitted to take instructions from, and disclose information about the membership, to either co-owner or resident.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.12. If we are given conflicting instructions from co-owners or residents, we are entitled to take the first set of instructions received and act on
						those instructions. If we continue to receive conflicting instructions from co-owners or residents, we may, at our reasonable discretion:
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>3.12.1. suspend or cancel </p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						3.12.2. terminate your membership. Should City Swapp terminate your membership pursuant to this term, it shall be under no obligation to refund the
						membership fee paid (either in whole or in part) and any such refund issued shall be entirely at City Swapp’s discretion, unless such instructions can
						be promptly reconciled or resolved.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>4. Listings</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.1.In order to be able to list your Home on the Platform you must:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.1.1.be a current City Swapp Member; and</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.1.2.have paid all applicable fees (including but not limited to membership fees).</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.2.When you list your Home with us, you agree, represent and warrant:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.1.that you have the full legal right to use, and permit others to use, your Home in accordance with the City Swapp service;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.2.that you will accurately describe your Home on the Platform and will upload a minimum of 12 images which accurately depict the rooms and/or
						spaces within your Home. You confirm that:
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.2.1.you have the necessary rights, licenses, permissions and/or consents to use any intellectual property rights contained within any image and/or
						description of your Home; and
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.2.2.the images and information used accurately reflect the Home (such as the number and size of rooms etc.),
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.3.that you are not using the Platform for any commercial purposes including rental, sale or onward exchange to a third party;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.2.4.that your Home is in good, safe and useable condition; and</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.2.5.that you have any necessary licenses, permissions, consents and insurances to lawfully allow your Home to be used in accordance with the City
						Swapp service.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.3.By listing your Home with us, you hereby grant City Swapp a non-exclusive, royalty free, worldwide, irrevocable license to use the image(s) and/or
						description of your Home in any advertising, marketing and/or promotional material relating to the Platform.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.4.We reserve the right to refuse and/or remove any listing at our discretion. We may do this if we think the Home is unsuitable or if we reasonably
						believe the listing to be inaccurate.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.5.We recommend that you add your Home as a listing as early as possible once your Home’s availability is known to you to increase your chances of
						finding a successful swap.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.6.You may withdraw the listing at any time unless:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.6.1.the listing has already been assigned to another Member;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>4.6.2.you have received a confirmed Exchange in respect of that listing</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						4.7.Where we are able to, we try to ensure that listings are accurate and complete however we cannot guarantee this and accept no responsibility for
						inaccurate listings and/or your reliance on them.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>5. Intellectual Property</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						5.1 City Swapp respects the intellectual property rights of others and expects you to do the same when you use the Platform.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						5.2 Where you post or upload to the City Swapp Platform any content of any type, including text or images, you undertake that you have the legal
						rights to do so.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						5.3 You agree that we have the right, at our discretion, and where we see appropriate, to remove any suspected copyright infringement material from
						the Platform. In circumstances where Members repeatedly infringe, or are repeatedly charged with infringing the copyright or other intellectual
						property rights of others, we may suspend or terminate your membership with immediate effect.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						5.4 In the event that City Swapp suspend or terminate your membership pursuant to term 5.3, City Swapp shall be under no obligation to refund the
						membership fee paid, the scheme points and/or any fees associated with canceled booking (s) either in whole or in part.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>6. Exchanges</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>6.1.Before you can swap your Home with another Member, you must:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>6.1.1.have listed your Home on the Platform</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						6.2.If you agree to enter into an Exchange with another Member the terms of the arrangement and/or agreement regarding the Exchange are solely between
						you and the other Member. City Swapp is not a party to such agreements. You therefore acknowledge and agree that, save as set out in these Terms, City
						Swapp does not have any responsibility or liability for any such arrangement, agreement, relationship or other dealing between you and another Member.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>7. Fees and Payments</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						7.1.In consideration of the performance of the services by City Swapp, you agree to pay City Swapp any applicable fees as outlined within these Terms
						or notified to you from time to time. The current applicable fees are published on the City Swapp website. All fees are subject to reasonable change,
						at City Swapp’s sole discretion, from time to time.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						7.2.All fees are inclusive of any value added tax or other applicable sales tax, which shall be payable by you.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						7.3.City Swapp shall not be obliged to perform the services until all applicable fees are received by us. All sums must be paid by debit card, credit
						card or bank transfer.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						7.4.If payment is made by credit or debit card, you confirm that you own the credit or debit card you provided us with the details of (and any
						subsequent or replacement card you ask us to use in relation to any payment to be made under these Terms). All credit and debit card holders are
						subject to validation checks and authorisation by the card issuer. If the issuer of your card refuses to authorize payment, we will not be responsible
						for any non-provision of any aspect of the services. We are not responsible for your card issuer or bank charging you as a result of our processing of
						your credit or debit card payment.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>8. Communications with other Members</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						8.1.The Platform allows Members to communicate with each other solely for the purpose of arranging Exchanges or subleasing info shares. When
						communicating with other Members, you agree not to send communications that:
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>8.1.1.are unsolicited or unlawful;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>8.1.2.are of a commercial or business benefit and/or purposes;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>8.1.3.are charity requests or petitions;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						8.1.4.contain any content which is defamatory, obscene, or may have the effect of being harassing, threatening or abusive to another Member,
						individual or group of individuals on the basis of religion, gender, sexual orientation, race, ethnicity, age or disability or which is otherwise
						inappropriate;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						8.1.5.shall or may interrupt, damage, impair or render the Platform and/or City Swapp service less efficient;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>8.1.6.transfer files containing viruses, Trojans, malware or other harmful programmes;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						8.1.7.authorise, encourage or assist any other person to copy, modify, reverse-engineer, decompile, disassemble, alter or otherwise tamper with any
						software (including source code), databases and other technology that forms part of the Platform and/or the City Swapp service; or
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>8.1.8.are otherwise inappropriate.</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						8.2.You agree to repay City Swapp for any losses or damages it suffers as a result of any claims or legal proceedings brought against us by any third
						party arising out of your breach or alleged breach of these Terms.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>9. Sale of your Home</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>9.1.You must notify us as soon as possible in the event that:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>9.1.1.you sell or transfer the legal rights to your Home;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						9.1.2.your Home becomes uninhabitable due to fire, flooding, subsidence or any other reason beyond your control; or
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>9.1.3.Your Home is repossessed.</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						9.2.If you decide to sell or transfer the legal rights to your Home during your membership, you must make your Home inactive on the City Swapp website
						and, if you have a confirmed Exchange, in relation to your Home, contact the Guest(s) immediately.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						9.3.If you receive notification from a Host that they are selling their Home and you have a confirmed Exchange booking as a Guest in respect of that
						Home, please contact our Customer Services team by using the details provided on our ‘Get In Touch’ page on the City Swapp contact us page.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>10. Cancellation</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>10.2.Your cancellation will only take effect once you have:</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>10.2.1.notified your Guest or Host; and</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>10.2.2.notified City Swapp.</p>
					You can notify City Swapp using the contact details provided on our ‘Get In Touch’ page: https://www.City Swapp.com/contact
					<p className=' text-[#272C2D] font-[700] text-lg '>11. Termination of your membership by you</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						11.1.You may terminate or suspend your membership at any time by giving us notice in writing, provided that you have not received a confirmed Exchange
						in respect of your listing.{' '}
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>11.2.Upon termination you shall lose all rights to use the City Swapp service.</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						11.3.In the event that you terminate your membership you shall not be entitled to a refund of any fees paid, whether in whole or in part.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>12. Termination of your membership by us</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.We reserve the right to terminate or suspend your membership and cancel any outstanding confirmed Exchanges if any of the following occur:
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>12.1.1.you fail to comply with any of these Terms;</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.2.you fail to pay any sums due to City Swapp or any associated company or any other party in connection with the City Swapp service or any
						relevant travel arrangements;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.3.you choose to issue legal proceedings against City Swapp or its associated companies;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.4.you are found to be a vexatious or serial complainant who threatens or uses physical violence and/or harasses, abuses or is verbally aggressive
						to our employees or another Member;
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.5.you abuse your rights as a Member and/or act in a manner that is contrary to the interests of City Swapp; or
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.1.6.your continued membership is or becomes contrary to any law, rule, regulation or statutory instrument or if we are required to terminate it by
						any judicial, governmental, regulatory or law enforcement body or court.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						12.2.Where we suspend your membership for non-payment in accordance with these Terms we also reserve the right to terminate your membership at our
						option at any time in the event that outstanding payments remain unpaid. Suspended Members may be readmitted to full membership on payment of all
						outstanding sums and completion of any required documentation. For the avoidance of doubt, suspended Members are not entitled to any benefits of City
						Swapp membership during the period of suspension.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>13. Complaints</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						13.1.City Swapp does not own, manage or operate any Home and is not liable for their description and/or presentation. As each Home is different,
						standards may vary enormously. If you have an issue with a Home please contact your Host in the first instance. If you are still dissatisfied and
						decide not to occupy the Home then City Swapp shall have no liability for any costs and expenses incurred (including, without limitation, the cost of
						alternative accommodation) unless prior authorisation to incur such costs has been given by City Swapp in writing.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>14. Our liability to you</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						14.1.As City Swapp is not responsible for and does not own, manage or operate any Homes we cannot accept any liability for any act or omission on the
						part of any Member. Your use of the Home may be subject to additional rules or terms imposed by the Member who owns the Home. City Swapp’s maximum
						liability if we are found to be at fault in relation to any service we provide is limited to the sums received by us for the Exchange in connection
						with which we are found to be at fault. We do not exclude or limit any liability for death or personal injury which arises out of our own negligence
						or that of City Swapp employees acting in the course of their employment or for our own criminal act.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						14.2.City Swapp is not liable for any damage, loss or theft of or to personal property which occurs through your Guests’ use of a Home.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						14.3.City Swapp accepts no liability for the acts and omissions of any third parties providing non-exchange related programmes or services to you.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg '>15. Communicating with you</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						15.1.City Swapp processes personal data and responds to requests you may have concerning personal data in accordance with its Privacy Policy, a copy
						of which is available at https://www.City Swapp.com/privacy-policy .
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg'>16. Other Services</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						16.1.Without limitation, City Swapp does not provide flights, coach or train travel, car hire, insurance, ferries, cruises or tours. Such services may
						be purchased from independent third party suppliers and will be subject to the terms and conditions of the suppliers concerned.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						16.2.City Swapp reserves the right to vary, withdraw or add to the services it provides at any time, with or without notice.
					</p>
					<p className=' text-[#272C2D] font-[700] text-lg'>17. General</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.1.These Terms and City Swapp’s policies and procedures may be changed by City Swapp at its sole discretion from time to time. Members will be
						notified of any such changes by publication on City Swapp’s website(s) and such changes will be effective as soon as they are published.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.2.The fees and prices charged by City Swapp are subject to regular review and any fee/price changes resulting from this review will take effect
						immediately. Such price and fee changes will be published on City Swapp’ website(s) (or notified to Members by letter or email at City Swapp’ option).
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.3.Please see City Swapp’ website(s) for our latest Terms. The latest Terms published on City Swapp’ website(s) supersede and replace all prior
						versions.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.4.You may not assign, transfer, declare on trust or otherwise dispose of any of your rights under these Terms or any other person without the prior
						written consent of City Swapp. City Swapp may assign these Terms to any third party and any such assignment shall be binding on Members when notice of
						assignment is given to them. Notice may be given on City Swapp’ website(s), in other City Swapp publications or by letter or email.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.5.City Swapp shall not be liable for any delay in performing or failure to perform its obligations under these Terms if such delay or failure
						results from any circumstances outside its reasonable control. Such delay or failure shall not constitute a breach of these Terms and the time for its
						performance shall be extended by such period as is equal to that during which performance is prevented.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.6.These Terms constitute the entire agreement between the parties, supersede any previous agreement or understanding and may not be varied except
						in writing by you and City Swapp. All other terms and conditions, express or implied by statute or otherwise, are excluded to the fullest extent
						permitted by law.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.7.Nothing in these Terms is expressly or impliedly intended to confer on any third party any right to enforce any of its provisions pursuant to the
						Contract (Rights of Third Parties) Act 1999.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.8.No waiver by either party of any breach of these Terms by the other shall be considered as a waiver of any subsequent breach of the same of any
						other provision.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.9.Any provision of these Terms which is held to be invalid or unenforceable in any jurisdiction shall be ineffective to the extent of such
						invalidity or unenforceability without invalidating or rendering unenforceable the remaining provisions of these Terms, and any such invalidity or
						unenforceability in any jurisdiction shall not invalidate or render unenforceable such provisions in any other jurisdiction.
					</p>
					<p className='text-base text-[#272C2D] font-[400] pl-4'>
						17.10.Any notice required or permitted to be given by either party to the other under these Terms shall be in writing and addressed to City Swapp at
						its registered office and to you at the address given as your correspondence address (or such other address as may at the relevant time have been
						notified to the party giving notice pursuant to this provision).
					</p>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default TermsAndConditions
