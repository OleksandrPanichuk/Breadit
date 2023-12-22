type TypeImageData = {
    file: {
        url:string 
    }
    caption?:string 
    stretched?:boolean
    withBorder?: boolean
  withBackground?: boolean
}

export type TypeImageClassNames = {
    img?: string
    figure?: string
    figcaption?: string
  }

 export  type TypeImageRendererProps = {
    data: TypeImageData
   
    className?: TypeImageClassNames
  }