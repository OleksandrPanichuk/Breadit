import { cn } from '@/lib/utils'
import { TypeWarningRendererProps } from '../types'
import parse from 'html-react-parser'
import { CSSProperties } from 'react'

const defaultClassNames = {
	container: 'w-full my-5 mx-2 flex items-center justify-start',
	icon: 'w-[1.875rem] ',
	title: 'uppercase  mx-1 text-[90%]',
	message: 'text-[goldenrod] text-left text-[90%]',
	circle: 'fill-[#EFCE4A]'
}

const defaultStyles: { [key: string]: CSSProperties } = {
	line: {
		fill: 'none',
		stroke: '#FFFFFF',
		strokeWidth: 5,
		strokeLinecap: 'round',
		strokeMiterlimit: 10
	}
}
export const Warning = ({ data, className }: TypeWarningRendererProps) => {
	if (!data || !data.message || typeof data.message != 'string') return <></>
	return (
		<div className={cn(defaultClassNames.container, className?.container)}>
			<svg
				className={cn(defaultClassNames.icon, className?.icon)}
				version="1.1"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				x="0px"
				y="0px"
				viewBox="0 0 50 50"
				xmlSpace="preserve"
			>
				<circle className={defaultClassNames.circle} cx="25" cy="25" r="25" />
				<line style={defaultStyles.line} x1="25" y1="10" x2="25" y2="28" />
				<line style={defaultStyles.line} x1="25" y1="37" x2="25" y2="39" />
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
				<g></g>
			</svg>
			<p className={cn(defaultClassNames.title, className?.title)}>
				{parse(data.title || 'Warning')}:
			</p>
			<p className={cn(defaultClassNames.message, className?.message)}>
				{parse(data.message)}
			</p>
		</div>
	)
}
