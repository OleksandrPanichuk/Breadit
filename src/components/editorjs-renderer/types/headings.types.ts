type TypeHeadingsData = {
    level:1 | 2 | 3 | 4 | 5 | 6
    text:string
}
export type TypeHeadingsRendererProps = {
    data: TypeHeadingsData
    className?:TypeHeadingsClassNames
}

export type TypeHeadingsClassNames = {
    h1?: string
    h2?: string 
    h3?: string
    h4?: string
    h5?: string 
    h6?: string 
}