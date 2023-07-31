import { Switch as AntdSwitch } from 'antd'

const Switch = ({ value, onChange }) => <AntdSwitch className='my-auto ml-2' checked={value} onChange={(val) => onChange(val)} />

export default Switch
