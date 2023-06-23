import { renderFormItem } from './helpers/renderFormItem'
import { renderSchema } from './helpers/renderSchema'
import { Form as AntdForm } from 'antd'

// const Form = (props) => <AntdForm>{props.children}</AntdForm>
// type AntdFormType = typeof AntdForm
// interface FormType extends AntdFormType  {
//     renderFormItem: typeof renderFormItem
// }

// declare const Form:FormType

const Form = {
	...AntdForm,
	renderFormItem,
	renderSchema,
}

export default Form
