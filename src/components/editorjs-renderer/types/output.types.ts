import { OutputBlockData } from "@editorjs/editorjs"
import { TypeHeadingsClassNames, TypeImageClassNames , TypeListClassNames, TypeQuoteClassNames, TypeWarningClassNames, TypeTableClassNames} from "."






export interface IEditorOutputProps  {
    data:TypeOutputData
    className?:string
    classNames?: TypeClassNames
}

export type TypeClassNames = {
    header?: TypeHeadingsClassNames
    quote?:TypeQuoteClassNames
    image?:TypeImageClassNames 
    delimiter?:string 
    table?:TypeTableClassNames 
    code?:string 
    checklist?:string 
    paragraph?:string
    warning?:TypeWarningClassNames 
    list?:TypeListClassNames 
    embed?:string
}

export type TypeOutputData  = {
    blocks: TypeBlock[]
    time?: number
    version?: string
  }

export type BlockTypes = 'header' | 'quote' | 'image' | 'delimiter' | 'table'| 'code' | 'checklist' |'paragraph' | 'warning' | 'embed' | 'list'

export type TypeBlock = OutputBlockData & {
    type: BlockTypes
}