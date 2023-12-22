'use client'
import {
	Table as TablePrimary,
	TableBody,
	TableCell,
	TableRow,
	TableHeader,
	TableHead
} from '@/components/ui/Table'
import { TypeTableRendererProps } from '../types'
import { nanoid } from 'nanoid'
import parse from 'html-react-parser'
import { cn } from '@/lib/utils'

export const Table = ({ data, className }: TypeTableRendererProps) => {
	if (!data || !data.content || !Array.isArray(data.content)) return <></>
	let headings: string[] = []
	let content = data.content

	if (data.withHeadings) {
		headings = [...data.content[0]]
		content = [...data.content].splice(1)
	}



	return (
		<div className={'rounded-md border my-4'}>
      <TablePrimary className={className?.table}>
			{!!data.withHeadings && !!headings?.length && (
				<TableHeader className={className?.thead}>
					<TableRow className={cn('flex bg-muted/25 hover:bg-muted/75', className?.tr)}>
						{headings.map((cell) => (
							<TableHead className={cn( 'text-lg  text-zinc-700  flex-1 flex items-center',className?.th)} key={nanoid()}>
								{parse(cell)}
							</TableHead>
						))}
					</TableRow>
				</TableHeader>
			)}
			<TableBody className={className?.tbody}>
				{content.map((row) => (
					<TableRow key={nanoid()} className={cn('flex',className?.tr)}>
						{row.map((cell) => (
							<TableCell className={cn('flex-1', className?.td)} key={nanoid()}>
								{parse(cell)}
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</TablePrimary>
    </div>
	)
}
