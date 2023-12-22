export type TypeTableClassNames = {
    table?: string
    tr?: string
    td?: string
    tbody?:string
    thead?:string
    th?:string
  }

type TypeTableData = {
  content: string[][]
  withHeadings?:boolean
}

export type TypeTableRendererProps = {
    data: TypeTableData
    className?:TypeTableClassNames
}