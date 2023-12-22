type TypeWarningData = {
    message: string
    title?: string
}

export type TypeWarningClassNames = {
    container?: string
    icon?: string
    title?: string
    message?: string
  }

export type TypeWarningRendererProps = {
    data:TypeWarningData
    className?:TypeWarningClassNames
}