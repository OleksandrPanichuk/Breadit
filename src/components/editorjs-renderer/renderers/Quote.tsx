import { cn } from '@/lib/utils'
import { TypeQuoteRendererProps } from '../types'
import parse from 'html-react-parser'

const defaultQuoteClassNames =
	'w-full flex justify-center items-center my-[5px] text-left my-4'
const defaultContentClassNames =
	'rounded-md bg-zinc-100 min-w-[15rem] w-[80%] my-[5px] p-2 flex flex-col justify-between items-start border border border-zinc-200'
const defaultAuthorClassNames = 'font-bold mx-[5px] mb-[5px]'

export const Quote = ({ data, className }: TypeQuoteRendererProps) => {
	if (!data || !data.text || typeof data.text != 'string') return <></>

	const caption =
		data.caption && typeof data.caption === 'string' ? data.caption : 'Unknown'
	if (data.alignment && typeof data.alignment === 'string')
		defaultQuoteClassNames.concat(`text-${data.alignment}`)

	return (
		<blockquote  className={cn(defaultQuoteClassNames, className?.container)}>
			<span  className={cn(defaultContentClassNames, className?.content)}>
				<p  className={className?.message}>
					<strong>&quot;</strong>
					{parse(data.text)}
					<strong>&quot;</strong>
				</p>
				<cite className={cn(defaultAuthorClassNames, className?.author)}>
					<strong>
						<small>{parse(caption)}</small>
					</strong>
				</cite>
			</span>
		</blockquote>
	)
}
