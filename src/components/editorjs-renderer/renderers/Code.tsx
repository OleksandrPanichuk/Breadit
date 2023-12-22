'use client'

import { TypeCodeRendererProps } from '../types'
import { cn } from '@/lib/utils'

export const Code = ({ data, className }: TypeCodeRendererProps) => {
	return (
		<pre
			className={cn(
				` overflow-x-auto my-4  bg-gray-800 p-4 rounded-md border-zinc-200 `,
				className
			)}
		>
			<code className="text-gray-100 text-sm  whitespace-break-spaces w-full block">
				{data.code}
			</code>
		</pre>
	)
}
