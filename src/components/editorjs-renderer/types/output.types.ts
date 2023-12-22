import { OutputBlockData } from "@editorjs/editorjs"
import { TypeHeadingsClassNames, TypeImageClassNames , TypeListClassNames, TypeTableClassNames} from "."






export interface IEditorOutputProps  {
    data:TypeOutputData
    className?:string
    classNames?: TypeClassNames
}

export type TypeClassNames = {
    header?: TypeHeadingsClassNames
    image?:TypeImageClassNames 
    delimiter?:string 
    table?:TypeTableClassNames 
    code?:string 
    paragraph?:string
    list?:TypeListClassNames 
    embed?:string
}

export type TypeOutputData  = {
    blocks: TypeBlock[]
    time?: number
    version?: string
  }

export type BlockTypes = 'header' |'image' | 'delimiter' | 'table'| 'code'|'paragraph' | 'embed' | 'list'

export type TypeBlock = OutputBlockData & {
    type: BlockTypes
}