import React from 'react'
import { Form, Input, Select, DatePicker, Upload, Divider, Radio, Cascader, Checkbox, Button, Image, Tooltip } from 'antd'
import { Picker } from 'antd-mobile'
import { PlusOutlined, CaretDownOutlined, MinusCircleTwoTone } from '@ant-design/icons'

import { firebase } from '@auth'
import Icon from '@mdi/react'
import { mdiCloudUploadOutline, mdiPlus } from '@mdi/js'
import { renderSchema } from './renderSchema'
const { RangePicker } = DatePicker
// const { RangePicker: MobileRangePicker } = MobileDatePicker

const PhoneNumberCode = ({ code }) => <div className='bg-secondaryBackground text-sm font-[400] text-black-400'>{code}</div>

const normFile = (e) => {
	if (Array.isArray(e)) return e
	return e && e.fileList
}
export const renderFormItem = (field) => {
	const DocumentUpload = async ({ file, onProgress, onSuccess, onError }) => {
		field.setLoading && field.setLoading(true)
		const response = firebase.storage.ref().child(`public/images/${field.collection}/${field.uploadLink}-${file.name}`).put(file)
		response.on(
			'state_changed',
			(snapshot) => onProgress({ percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }),
			(error) => onError(error),
			() => onSuccess(null, response.metadata_)
		)
	}

	const ChangeFileList = async ({ fileList }) => {
		if (fileList.length > 0) {
			fileList.forEach((file, index) => {
				if (!file.url && file.status === 'done') {
					const response = firebase.storage.ref().child(`public/images/${field.collection}/${field.uploadLink}-${file.name}`)
					response.getDownloadURL().then((result) => {
						fileList[index].url = result
						field.setLoading && field.setLoading(false)
					})
				}
			})
		}
	}
	if (field.type === 'text') {
		return <div className={field.className}>{field.value}</div>
	} else if (field.type === 'input') {
		return (
			<Form.Item
				key={field.key || field.label}
				label={field.label}
				name={field.name}
				className={field.itemClassName}
				rules={[
					{
						required: field.required,
						message: field.message,
						...(field.inputType === 'number' && {
							validator: (_, value = '') => {
								if (value?.toString().length > 0) {
									if (value < 0) {
										return Promise.reject(new Error(`This value cannot be negative.`))
									} else if (parseFloat(value) < field.minValue) {
										return Promise.reject(new Error(`This value cannot be less than ${field.minValue}`))
									} else if (parseFloat(value) > field.maxValue + (field.subtractCurrValue ? parseFloat(value) : 0)) {
										return Promise.reject(
											new Error(field.message || `This value cannot be greater than ${field.maxValue + (field.subtractCurrValue ? parseFloat(value) : 0)}`)
										)
									} else {
										return Promise.resolve()
									}
								} else if (!field.required) {
									return Promise.resolve(value)
								} else {
									return Promise.reject(new Error(field.message))
								}
							},
						}),
					},
				]}
				tooltip={field.tooltip}
				initialValue={field.initialValue}
				hidden={field.hidden}
			>
				{field.inputType === 'textArea' ? (
					<Input.TextArea className={`input-field TextAreaField ${field.textWidth}`} rows={field.rows} placeholder={field.placeholder} />
				) : (
					<Input
						className={field.elementClassName || 'input-field add-on'}
						// type={field.inputType}
						onInput={
							field.inputType === 'number'
								? (e) => {
										e.target.value = e.target.value.replace(/[^0-9.]*/g, '')
								  }
								: undefined
						}
						placeholder={field.placeholder}
						disabled={field.action === 'view' || field.disabled === true ? true : false}
						addonBefore={field.addonBefore}
						addonAfter={field.addonAfter}
					/>
				)}
			</Form.Item>
		)
	} else if (field.type === 'number') {
		return (
			<Form.Item
				key={field.key || field.label}
				label={field.label}
				name={field.name}
				className={field.itemClassName}
				rules={[
					{
						required: field.required,
						validator: (_, value = '') => {
							if (value?.toString().length > 0) {
								if (value < 0) {
									return Promise.reject(new Error(`This value cannot be negative.`))
								} else if (parseInt(value) < field.minValue) {
									return Promise.reject(new Error(`This value cannot be less than ${field.minValue}`))
								} else if (parseInt(value) > field.maxValue) {
									return Promise.reject(new Error(field.message || `This value cannot be greater than ${field.maxValue}`))
								} else {
									return Promise.resolve()
								}
							} else if (!field.required) {
								return Promise.resolve(value)
							} else {
								return Promise.reject(new Error(field.message))
							}
						},
					},
				]}
				tooltip={field.tooltip}
				initialValue={field.initialValue}
				shouldUpdate={field.shouldUpdate || false}
			>
				<Input
					className={
						field.elementClassName || (field.addonBefore || field.addonAfter ? `InputField ${field.className}` : `InputField w-full ${field.className}`)
					}
					type='number'
					onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
					disabled={field.action === 'view' || field.disabled === true ? true : false}
					placeholder={field.placeholder}
					addonBefore={field.addonBefore}
					addonAfter={field.addonAfter}
					onWheel={(event) => event.currentTarget.blur()}
				/>
			</Form.Item>
		)
	} else if (field.type === 'password') {
		return (
			<Form.Item
				key={field.name}
				name={field.name}
				label={field.label}
				className={field.itemClassName}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				initialValue={field.initialValue}
			>
				<Input.Password
					className='input-field'
					addonAfter={field.addonAfter}
					addonBefore={field.addonBefore}
					disabled={field.disabled}
					placeholder={field.placeholder}
					type={field.inputType}
				/>
			</Form.Item>
		)
	} else if (field.type === 'cnic') {
		return (
			<Form.Item
				key={field.name}
				label={field.label}
				name={field.name}
				rules={[
					{
						required: field.required,
						validator: (rule, value = '') => {
							if (value?.toString().length > 0) {
								const specials = /\d/g
								if (value < 0) {
									return Promise.reject(new Error(`CNIC Number cannot be negative.`))
								} else if (value.toString().length !== 13) {
									return Promise.reject(new Error(`CNIC must be of 13 digits.`))
								} else if (value?.toString().length > 0) {
									if (specials.test(value.toString())) return Promise.resolve()
									else return Promise.reject(new Error(`Invalid characters used.`))
								} else {
									return Promise.resolve()
								}
							} else if (!field.required) {
								return Promise.resolve(value)
							} else {
								return Promise.reject(new Error(field.message))
							}
						},
					},
				]}
				tooltip={field.tooltip}
			>
				<Input
					className={`${field.className || `InputField`} AddOn`}
					type='number'
					onInput={(e) => (e.target.value = e.target.value.slice(0, 13))}
					disabled={field.disabled === true ? true : false}
					placeholder={field.placeholder}
					addonBefore={field.addonBefore}
					addonAfter={field.addonAfter}
				/>
			</Form.Item>
		)
	} else if (field.type === 'phoneNumber') {
		const initialValue = () => {
			let temp = field?.initialValue?.replace('+92', '')
			return temp?.length > 3 ? temp?.substring(0, 3) + ' ' + temp?.substring(3) : temp
		}
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				initialValue={initialValue()}
				className={field.itemClassName}
				rules={[
					{
						required: field.required,
						validator: async (_, value = '') => {
							if (value.toString().length > 0) {
								if (value < 0) {
									return Promise.reject(new Error(`Phone Number cannot be negative.`))
								} else if (value.toString().replace(' ', '').length !== 10) {
									return Promise.reject(new Error(`Phone Number must be of 10 digits.`))
								} else {
									return Promise.resolve()
								}
							} else if (!field.required) {
								return Promise.resolve(value)
							} else {
								return Promise.reject(new Error(field.message))
							}
						},
					},
				]}
				tooltip={field.tooltip}
			>
				<Input
					className={field.elementClassName || 'InputField AddOn'}
					onInput={(e) => {
						let temp = e.target.value.replace(/[^0-9]/g, '').slice(0, 10)
						e.target.value = temp.length > 3 ? temp.substring(0, 3) + ' ' + temp.substring(3) : temp
					}}
					disabled={field.action === 'view' || field.disabled === true ? true : false}
					addonBefore={field.addonBefore || <PhoneNumberCode code={'+92'} />}
					addonAfter={field.addonAfter}
				/>
			</Form.Item>
		)
	} else if (field.type === 'vehicleRegistration') {
		const vehicleInitValue = () => field?.initialValue?.toUpperCase()
		return (
			<Form.Item
				key={field.name}
				label={field.label}
				name={field.name}
				initialValue={vehicleInitValue()}
				rules={[
					{
						required: field.required,
						validator: (rule, value = '') => {
							const specials = /^[a-zA-Z]+[0-9]+$/g
							if (value?.toString().length > 0) {
								if (specials.test(value.toString())) {
									return Promise.resolve()
								} else {
									return Promise.reject(new Error(`Vehicle Registration Number is badly formattted.`))
								}
							} else if (!field.required) {
								return Promise.resolve(value)
							} else {
								return Promise.reject(new Error(field.message))
							}
						},
					},
				]}
				tooltip={field.tooltip}
			>
				<Input className={`${field.className || `InputField`} AddOn`} placeholder='e.g abc123' disabled={field.disabled} />
			</Form.Item>
		)
	} else if (field.type === 'picture-upload') {
		const UploadProps = {
			listType: 'picture-card',
			accept: 'image/png, image/jpg, image/jpeg',
			customRequest: DocumentUpload,
			onChange: ChangeFileList,
		}
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				valuePropName='fileList'
				getValueFromEvent={normFile}
			>
				<Upload listType='picture-card' onChange={ChangeFileList}>
					<div>
						<PlusOutlined />
						<div
							style={{
								marginTop: 8,
							}}
						>
							Upload
						</div>
					</div>
				</Upload>
			</Form.Item>
		)
	} else if (field.type === 'profile-picture-upload') {
		const UploadProps = {
			listType: 'picture-card',
			accept: 'image/png, image/jpg, image/jpeg, image/svg',
			customRequest: DocumentUpload,
			onChange: ChangeFileList,
		}
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				valuePropName='file'
				getValueFromEvent={normFile}
				className='profilePicture'
			>
				<Upload.Dragger {...UploadProps} className='profile-picture !h-32 !w-96'>
					<div className='flex flex-col items-center justify-center'>
						<div className='p-2 rounded-full bg-[#F2F4F7]'>
							<Icon path={mdiCloudUploadOutline} size={1} className=' text-[#475467]' />
						</div>
						<div className='mt-3 px-3'>
							<span className='text-[#9B83CB] font-semibold text-sm'>Click to upload</span>
							<span className='text-[#475467] text-sm font-normal'> or drag and drop</span>
						</div>
						<div className='text-[#475467] text-xs font-normal'>SVG, PNG, JPG (max. 800x400px)</div>
					</div>
				</Upload.Dragger>
			</Form.Item>
		)
	}
	// else if (field.type === 'upload') {
	// 	const UploadProps = {
	// 		listType: 'picture',
	// 		maxCount: field.maxCount,
	// 		multiple: field.multiple,
	// 		accept: 'image/png, image/jpg, image/jpeg, application/pdf',
	// 		customRequest: DocumentUpload,
	// 		onChange: ChangeFileList,
	// 		className: 'FullWidth FlexColumnBox',
	// 	}
	// 	return (
	// 		<Form.Item
	// 			key={field.label}
	// 			label={field.label}
	// 			name={field.name}
	// 			rules={[{ required: field.required, message: field.message }]}
	// 			tooltip={field.tooltip}
	// 			valuePropName='fileList'
	// 			getValueFromEvent={normFile}
	// 		>
	// 			{field.uploadType === 'button' ? (
	// 				<Upload {...UploadProps} style={{ width: 'auto' }}>
	// 					<Button className='btn-primary-highlight' style={{ height: 48 }} block>
	// 						<div className='flex items-center'>
	// 							{field?.icon ? (
	// 								<Icon path={field?.icon} size={1} className='text-primary-800' />
	// 							) : (
	// 								<p className='NoMargin'>
	// 									<PaperClipOutlined style={{ fontSize: 24, color: '#0066CC' }} />
	// 								</p>
	// 							)}
	// 							<p className='BoldFont FontSize12 PrimaryColor' style={{ marginLeft: 12 }}>
	// 								UPLOAD
	// 							</p>
	// 						</div>
	// 					</Button>
	// 				</Upload>
	// 			) : (
	// 				<Upload.Dragger {...UploadProps}>
	// 					<p className='NoMargin'>
	// 						<PaperClipOutlined style={{ fontSize: 36, color: '#0066CC' }} />
	// 					</p>
	// 					<p className='SectionTitle'>Upload Document</p>
	// 				</Upload.Dragger>
	// 			)}
	// 		</Form.Item>
	// 	)
	// }
	else if (field.type === 'radioGroup') {
		return (
			<Form.Item
				key={field.label}
				name={field.name}
				label={field.label}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				initialValue={field.initialValue}
			>
				{field.button === true ? (
					<Radio.Group
						onChange={(e) => {
							if (field.clearData) {
								field.formReference.setFieldsValue(field.clearData)
							}
						}}
						buttonStyle='solid'
					>
						{field.options?.map((option, index) =>
							field.valueProperty && field.displayProperty ? (
								<Radio.Button key={`radio-${field.name}-${index}`} value={option[field.valueProperty]}>
									{option[field.displayProperty]}
								</Radio.Button>
							) : (
								<Radio.Button key={option} value={option}>
									{option}
								</Radio.Button>
							)
						)}
					</Radio.Group>
				) : (
					<Radio.Group>
						{field.options.map((option) => (
							<Radio key={option} value={option.key}>
								{option.long}
							</Radio>
						))}
					</Radio.Group>
				)}
			</Form.Item>
		)
	} else if (field.type === 'dateTime') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				className={field.itemClassName}
				dependencies={field.dependencies}
				initialValue={field.initialValue}
			>
				<DatePicker
					style={{ width: '100%' }}
					className={field.elementClassName || `input-field ${field.className}`}
					disabled={field.disabled === true ? true : false}
					disabledDate={field.disabledDate}
					disabledTime={field.disabledTime}
					format={field.format}
					showNow={field.showNow}
					defaultPickerValue={field.defaultPickerValue}
					showTime={field.showTime !== false ? { defaultValue: field.defaultTimeValue } : false}
				/>
			</Form.Item>
		)
	} else if (field.type === 'dateRange') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				className={field.itemClassName}
				dependencies={field.dependencies}
				initialValue={field.initialValue}
			>
				<RangePicker
					style={{ width: '100%' }}
					className={field.elementClassName || `input-field range-picker ${field.className}`}
					dropdownClassName={'range-picker'}
					disabled={field.disabled === true ? true : false}
					disabledDate={field.disabledDate}
					disabledTime={field.disabledTime}
					format={field.format}
					showNow={field.showNow}
					defaultPickerValue={field.defaultPickerValue}
					showTime={field.showTime !== false ? { defaultValue: field.defaultTimeValue } : false}
				/>
			</Form.Item>
		)
	} else if (field.type === 'select') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				initialValue={field.initialValue}
				tooltip={field.tooltip}
				noStyle={field.noStyle}
				className={field.itemClassName}
			>
				<Select
					style={{ width: '100%' }}
					className={'select-field ' + field.elementClassName || ''}
					suffixIcon={<CaretDownOutlined className={field.iconClassName} />}
					mode={field.mode}
					disabled={field.action === 'view' || field.disabled === true}
					filterOption={(input, option) => {
						field.dependent && field.form.setFieldValue(field.dependent, input)
						return option.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0 || (field?.defaultOption && option?.children === field?.defaultOption)
					}}
					showSearch={field.showSearch}
					placeholder={field.placeholder}
					maxTagCount='responsive'
					tokenSeparators={field.tokenSeparators}
					allowClear={field.allowClear}
					// onChange={(val) => field.setEmptyValues && field.form.setFieldsValue(field.setEmptyValues.reduce((prev, curr) => ({ ...prev, [curr]: '' }), {}))}
				>
					{field.options?.map((option, index) =>
						field.valueProperty && field.displayProperty ? (
							<Select.Option key={`select-${field.name}-${index}`} value={option[field.valueProperty]}>
								{option[field.displayProperty]}
							</Select.Option>
						) : (
							<Select.Option key={option} value={option}>
								{option}
							</Select.Option>
						)
					)}
				</Select>
			</Form.Item>
		)
	} else if (field.type === 'recentSelect') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
			>
				<Select
					className='SelectField'
					suffixIcon={<CaretDownOutlined />}
					filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
					showSearch={field.showSearch}
					placeholder={field.placeholder}
					onChange={(event) => {
						if (field.displayProperty === 'formattedAddress') {
							const setField = field.setField
							const parentField = field.form?.getFieldValue(setField[0])
							parentField[setField[1]] = { ...parentField[setField[1]], ...JSON.parse(event) }
							field.form?.resetFields([setField[0]])
							field.form?.setFieldsValue({ [setField[0]]: parentField })
						} else if (field.valueProperty !== 'containerNumber') {
							field.form?.setFieldsValue({ [field.setField]: { ...JSON.parse(event) } })
						}
					}}
					allowClear={field.allowClear}
				>
					{field.options?.map((option, index) => (
						<Select.Option key={index} value={JSON.stringify(option)}>
							{option[field.displayProperty]}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
		)
	} else if (field.type === 'emails') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				tooltip={field.tooltip}
				rules={[
					{
						required: true,
						validator: (_, value) => {
							const expression = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) //eslint-disable-line
							if (value) {
								if (expression.test(value[value.length - 1])) {
									return Promise.resolve()
								} else {
									return Promise.reject(new Error('Please enter valid emails.'))
								}
							} else {
								return Promise.reject(new Error(field.message))
							}
						},
					},
				]}
				initialValue={field.initialValue}
				style={{ margin: 0 }}
			>
				<Select
					className='EmailsField'
					mode={field.mode}
					disabled={field.disabled}
					showSearch={field.showSearch}
					placeholder={field.placeholder}
					maxTagCount='responsive'
					tokenSeparators={field.tokenSeparators}
					onChange={(value) => {
						const expression = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) //eslint-disable-line
						if (value && !expression.test(value[value.length - 1])) {
							value.pop()
						}
					}}
					// tagRender={({ label }) => (
					// 	<Tag closeIcon={<CloseCircleFilled className='ml-1 flex items-center justify-center' />} closable={true} className='flex items-center font-inter'>
					// 		{label}
					// 	</Tag>
					// )}
				>
					{field.options?.map((option) => (
						<Select.Option key={option} value={option}>
							{option}
						</Select.Option>
					))}
				</Select>
			</Form.Item>
		)
	} else if (field.type === 'cascader') {
		return (
			<Form.Item
				key={field.label}
				label={field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
			>
				<Cascader className='CascaderField' options={field.options} expandTrigger='hover' />
			</Form.Item>
		)
	} else if (field.type === 'checkbox') {
		return (
			<Form.Item
				key={field.key || field.label}
				name={field.name}
				rules={[{ required: field.required, message: field.message }]}
				tooltip={field.tooltip}
				initialValue={field.initialValue}
				className={field.className || 'm-0'}
				valuePropName='checked'
			>
				<Checkbox
					onChange={(e) => {
						if (field.fillData && Object.values(field.fillData).length > 0) {
							if (e.target.checked) {
								field.formReference.setFieldsValue(field.fillData)
							} else {
								field.formReference.setFieldsValue(field.clearData)
							}
						}
					}}
					defaultChecked={field.initialValue}
				>
					{field.label}
				</Checkbox>
			</Form.Item>
		)
	} else if (field.type === 'dynamicFields') {
		return (
			<Form.List key={field.label} name={field.name} label={field.label} initialValue={field.initialValue}>
				{(fields, { add, remove }) => (
					<>
						{fields.map((singleEntryField, singleEntryFieldIndex) =>
							field.groups ? (
								<div key={singleEntryField.name}>
									<div className='mb-6 flex items-center'>
										<Divider className='SectionTitle' orientation='left' plain>
											{field.label} # {singleEntryFieldIndex + 1}
										</Divider>
										{fields.length > field.minEntries && (
											<Button
												className='ml-6 bg-red-100'
												onClick={() => {
													remove(singleEntryField.name)
												}}
											>
												Delete Entry
											</Button>
										)}
									</div>
									{field.groups.map((groupEntry) => (
										<div className={`flex items-start`}>
											{groupEntry?.map((item, index) => (
												<div className={`w-full ${index > 0 ? 'ml-6' : ''}`}>{renderFormItem({ ...item, name: [singleEntryField.name, item.name] })}</div>
											))}
										</div>
									))}
								</div>
							) : (
								<div key={singleEntryField.key} className='flex items-center'>
									{field.fields?.map((item, index) => (
										<div className={`${item.hidden ? 'w-0' : 'w-full'}  ${index !== 0 ? 'ml-6' : ''}`}>
											{renderFormItem({ ...item, name: [singleEntryField.name, item.name] })}
										</div>
									))}
									{fields.length > field.minEntries && (
										<MinusCircleTwoTone
											twoToneColor='#FF0000'
											className='ml-6'
											onClick={() => {
												remove(singleEntryField.name)
											}}
										/>
									)}
								</div>
							)
						)}
						<Tooltip title={fields.length >= field.maxEntries ? 'You can not add more fields' : ''}>
							<div className={fields.length === field.maxEntries ? 'cursor-not-allowed h-fit w-fit' : 'cursor-pointer h-fit w-fit'}>
								<Form.Item noStyle>
									<Button
										className={`btn-ghost ${fields.length === field.maxEntries ? '!text-black-75 no-hover' : 'text-primary-800 cursor-pointer'} font-[600]`}
										onClick={() => add()}
									>
										<Icon path={mdiPlus} size={1} className={`${fields.length === field.maxEntries ? 'text-black-75' : 'text-primary-800'} mr-2`} />
										{fields.length === 0 ? 'Add ' : 'Add Another'} {field.label}
									</Button>
								</Form.Item>
							</div>
						</Tooltip>
					</>
				)}
			</Form.List>
		)
	} else if (field.type === 'dependency') {
		return (
			<Form.Item
				key={field.name + 'dependency'}
				shouldUpdate={(prevValues, currentValues) => {
					if (Array.isArray(field.independent)) {
						return prevValues?.[field.independent[0]]?.[field.independent[1]] !== currentValues?.[field.independent[0]]?.[field.independent[1]]
					} else return prevValues[field.independent] !== currentValues[field.independent]
				}}
				noStyle
			>
				{({ getFieldValue }) => {
					const fieldValue = Array.isArray(field.independent) ? getFieldValue(field.independent[0]) : getFieldValue(field.independent)
					return field.condition(fieldValue) ? renderSchema(field.successSchema) : renderSchema(field.failureSchema)
				}}
			</Form.Item>
		)
	} else if (field.type === 'divider') {
		return <Divider key={'divider'} className='text-gray-500' dashed />
	} else if (field.type === 'icon') {
		return (
			<div className='!flex !flex-col !justify-center !items-center !w-fit cursor-pointer'>
				<Icon path={field?.icon} size={1} className='text-red-800 align-middle text-center' onClick={field?.onClick} />
			</div>
		)
	}
}
