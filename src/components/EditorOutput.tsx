'use client'
import dynamic from 'next/dynamic'
import { FC } from 'react'
import CustomCodeRenderer from '@/components/renderers/CustomCodeRenderer'
import CustomImageRenderer from '@/components/renderers/CustomImageRenderer'

const Output = dynamic(
	async () => (await import('editorjs-react-renderer')).default,
	{
		ssr: false
	}
)

const renderers = {
	code: CustomCodeRenderer,
	image: CustomImageRenderer
}

const style = {
	paragraph: {
		fontSize: '0.875rem',
		lineHeight: '1.25rem'
	}
}

interface IEditorOutputProps {
	content: any
}

const EditorOutput: FC<IEditorOutputProps> = ({ content }) => {
	return (
		<Output
			renderers={renderers}
			style={style}
			data={content}
			className="text-sm"
		/>
	)
}

export default EditorOutput
