export type TypeChecklistRendererProps  = {
    className?:string 
    data: TypeChecklistData
}
type TypeChecklistData = {
    items: {
        text:string 
        checked:boolean
    }[]
}