"use client"
import React from 'react'
import { IEditorOutputProps } from './types'
import { nanoid } from 'nanoid'
import { getRenderer } from './output.helpers'

const EditorOutput = ({
	data,
	className,
	classNames 
}: IEditorOutputProps) => {
	if (!data || typeof data !== 'object') return <></>
	if (!classNames || typeof classNames !== 'object') classNames = {} 

	return (
		<div className={className}>
			{data.blocks.map((block) => {  
				const id = nanoid()
				const Renderer = getRenderer(block.type)
		
				if (!Renderer) return <></>

 				return <Renderer key={id} data={block.data} className={classNames?.[block.type]  as any} />
			})}
		</div>
	)
}


export default EditorOutput