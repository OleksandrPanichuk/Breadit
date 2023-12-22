type TypeListData = {
    style:'ordered' | 'unordered'
    items: string[]
}

export type TypeListClassNames = {
    container?: string
    listItem?: string
}

export type  TypeListRendererProps = {
    data: TypeListData
    className?: TypeListClassNames 
}