import HeaderIcon from '../../assets/drive-assets/logo.svg'

const HeaderLogo = ({ width }) => {
	return (
		<div className='mr-4' key='header-logo' id='-blxlogo'>
			<img className='' src={HeaderIcon} alt='' style={{ width: width > 640 ? '40px' : '30px', height: 'auto' }} />
		</div>
	)
}

export default HeaderLogo
