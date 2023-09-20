import React, { useContext, useEffect, useState } from 'react'
import { Modal, Upload } from 'antd'
import { firebase } from '@auth'
import { Form } from '@components'
import { ListingContext } from '../helpers/context'
import { mdiPlus } from '@mdi/js'
import Icon from '@mdi/react'
const getBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result)
		reader.onerror = (error) => reject(error)
	})

const normFile = (e) => {
	if (Array.isArray(e)) return e
	return e && e.fileList
}
const PropertyPictures = () => {
	const [previewOpen, setPreviewOpen] = useState(false)
	const [previewImage, setPreviewImage] = useState('')
	const [previewTitle, setPreviewTitle] = useState('')
	const { form, setLoading } = useContext(ListingContext)
	const loggedInUser = JSON.parse(localStorage.getItem('user'))
	const formWatch = Form.useWatch(undefined, form)

	const DocumentUpload = async ({ file, onProgress, onSuccess, onError }) => {
		setLoading(true)
		const response = firebase.storage
			.ref()
			.child(
				`public/images/properties/${loggedInUser.id}/${form.getFieldValue(['location', 'address'])}-${form.getFieldValue('photos')?.length}-${file.name}`
			)
			.put(file)
		response.on(
			'state_changed',
			(snapshot) => onProgress({ percent: (snapshot.bytesTransferred / snapshot.totalBytes) * 100 }),
			(error) => onError(error),
			() => onSuccess(null, response.metadata_)
		)
	}
	const handlePreview = async (file) => {
		if (!file.url && !file.preview) {
			file.preview = await getBase64(file.originFileObj)
		}
		setPreviewImage(file.url || file.preview)
		setPreviewOpen(true)
		setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1))
	}
	const ChangeFileList = async ({ fileList }) => {
		if (fileList.length > 0) {
			fileList.forEach((file, index) => {
				if (!file.url && file.status === 'done') {
					const response = firebase.storage
						.ref()
						.child(
							`public/images/properties/${loggedInUser.id}/${form.getFieldValue(['location', 'address'])}-${form.getFieldValue('photos')?.length}-${file.name}`
						)
					response.getDownloadURL().then((result) => {
						fileList[index].url = result
						setLoading(false)
					})
				}
			})
		}
	}
	const handleCancel = () => setPreviewOpen(false)

	return (
		<>
			<p className='text-[#333333] font-[700] text-2xl pb-7 pl-2'>Upload House Pictures</p>

			<Form.Item
				key={'photo-upload'}
				name={['photos']}
				rules={[{ required: true, message: `Please upload at least one photo` }]}
				valuePropName='fileList'
				getValueFromEvent={normFile}
			>
				<Upload
					className='max-md:w-full'
					customRequest={DocumentUpload}
					listType='picture-card'
					onPreview={handlePreview}
					multiple={true}
					onChange={ChangeFileList}
				>
					<div className='bg-[#B3A7C9B2] h-full w-full flex flex-row items-center justify-center rounded-lg border border-solid border-[#664F94]'>
						<Icon path={mdiPlus} size={1.5} className='text-[#333333]' />
					</div>
				</Upload>
			</Form.Item>

			<Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
				<img
					alt='example'
					style={{
						width: '100%',
					}}
					src={previewImage}
				/>
			</Modal>
		</>
	)
}
export default PropertyPictures
