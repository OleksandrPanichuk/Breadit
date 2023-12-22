import { cn } from '@/lib/utils'
import { TypeParagraphRendererProps } from '../types'
import parse from 'html-react-parser'

export const Paragraph = ({ data, className }: TypeParagraphRendererProps) => {
	let content = null

	if (typeof data === 'string') content = data
	else if (
		typeof data === 'object' &&
		data.text &&
		typeof data.text === 'string'
	)
		content = data.text

	return  content ? <p className={cn('my-2',className)}>{ parse(content) }</p> : <></>;
}
