import { Alert } from 'antd'

export const AlertBanner = (alert, setAlert) => (
	<Alert
		type={alert.type}
		message={alert.message}
		showIcon
		closable
		className={`font-bold text-left mb-6 ${alert.type}`}
		afterClose={() => setAlert({ type: '', message: '' })}
	/>
)

export default AlertBanner
