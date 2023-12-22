'use client'

import hljs from 'highlight.js'
import { TypeCodeRendererProps } from '../types'
import { cn } from '@/lib/utils'
import 'highlight.js/styles/github-dark.css'
import { useEffect, useRef } from 'react'
export const Code = ({ data, className }: TypeCodeRendererProps) => {
	const codeRef = useRef<HTMLElement | null>(null)

	useEffect(() => {
		if (codeRef.current) {
			hljs.highlightBlock(codeRef.current)
		}
	}, [data.code])
	return (
		<pre
			className={cn(` overflow-x-auto my-4  rounded-md border-zinc-200 `, className)}
		>
			<code  ref={codeRef}>{data.code}</code>
		</pre>
	)
}
