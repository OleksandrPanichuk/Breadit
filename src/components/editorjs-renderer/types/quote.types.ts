type TypeQuoteData = {
    text: string
    caption?: string
    alignment?: string
}

export type TypeQuoteClassNames = {
    container?: string
    content?: string
    author?: string
    message?: string
}

export type TypeQuoteRendererProps = {
    data: TypeQuoteData
    className?: TypeQuoteClassNames
}