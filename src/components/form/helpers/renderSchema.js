import { renderFormItem } from './renderFormItem'
import { checkArray } from './functions'

export const rowRenderer = (fields, index, type) => {
	const visibleFields = fields?.filter((field) => !field.hidden)
	const hiddenFields = fields?.filter((field) => field.hidden)
	const maxWidth = 216
	const padding = 16
	const minWidth = ((maxWidth - padding) / (maxWidth * 2)) * 100
	return (
		<div key={`RowRenderer_${index}`} className={'flex items-start ' + (type === 'filter' ? 'flex-wrap' : 'flex-row')}>
			{visibleFields.map((field, index) =>
				type === 'filter' ? (
					<div
						key={field.name}
						className={`${index % 2 && 'ml-4'} ${field.className}`}
						style={{ width: `${index === visibleFields.length - 1 && !(index % 2) ? 100 : minWidth}%` }}
					>
						{renderFormItem(field)}
					</div>
				) : (
					<div key={field.name} className={`${index > 0 && 'ml-6'} ${field.className}`} style={{ width: `${100 / visibleFields.length}%` }}>
						{renderFormItem(field)}
					</div>
				)
			)}
			{hiddenFields.map((field) => (
				<div key={field.name} className='hidden'>
					{renderFormItem(field)}
				</div>
			))}
		</div>
	)
}
export const renderSchema = (Schema, type) => {
	return Schema.map((SchemaObject, rowIndex) =>
		SchemaObject.fields ? (
			<div className=''>
				<div className='font-semibold text-lg text-black-400 my-2'>{SchemaObject.title}</div>
				<div className='flex flex-col'>
					{SchemaObject.fields.map((schema, index) => (checkArray(schema) ? rowRenderer(schema, index, type) : renderFormItem(schema)))}
				</div>
			</div>
		) : checkArray(SchemaObject) ? (
			rowRenderer(SchemaObject, rowIndex)
		) : (
			renderFormItem(SchemaObject)
		)
	)
}
