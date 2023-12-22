import { TypeImageRendererProps } from '../types'
import ImagePrimary from 'next/image'
import parse from 'html-react-parser'
import { cn } from '@/lib/utils'


const defaultImageClassNames = '   object-contain '
const defaultFigureClassNames = `relative flex flex-col justify-center items-center aspect-video my-5 w-full max-w-full  overflow-hidden`
const defaultFigcaptionClassNames = 'absolute top-2 right-2 py-[5px] px-[10px] text-xs bg-zinc-200 bg-opacity-30 text-zinc-700 shadow-md  rounded-sm cursor-default'

export const Image = ({ data, className }: TypeImageRendererProps) => {
	if (!data || !data.file || !data.file.url) return <></>

	let imageClassName =  defaultImageClassNames
	imageClassName.concat(data.stretched ? 'w-full' : '')

	const figureClassNames = defaultFigureClassNames
	if (!data.withBorder) figureClassNames.concat('border-none') 
	if (!data.withBackground) figureClassNames.concat("bg-none")


	return (
		<figure className={cn(figureClassNames, className?.figure)}>
			<ImagePrimary
				src={data.file.url}
				alt={data.caption || ''}
				className={cn(imageClassName, className?.img)}
				fill
			
			/>
			{data.caption && (
				<figcaption className={cn(defaultFigcaptionClassNames, className?.figcaption)}>
					{parse(data.caption)}
				</figcaption>
			)}
		</figure>
	)
}
