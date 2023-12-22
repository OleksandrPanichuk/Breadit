import { cn } from "@/lib/utils";
import { TypeHeadingsRendererProps } from "../types";
import parse from 'html-react-parser'

export const Headings = ({data, className}:TypeHeadingsRendererProps) => {
  switch(data.level) {
    case 1 : return <h1 className={cn('editor-title__h1', className?.h1)}>{parse(data.text)}</h1>
    case 2 : return <h2 className={cn('editor-title__h2', className?.h2)}>{parse(data.text)}</h2>
    case 3 : return <h3 className={cn('editor-title__h3',className?.h3)}>{parse(data.text)}</h3>
    case 4 : return <h4 className={cn('editor-title__h4',className?.h4)}>{parse(data.text)}</h4>
    case 5 : return <h5 className={cn('editor-title__h5',className?.h5)}>{parse(data.text)}</h5>
    case 6 : return <h6 className={cn('editor-title__h6',className?.h6)}>{parse(data.text)}</h6>
    default: return <h3 className={cn('editor-title__h3',className?.h3)}>{parse(data.text)}</h3>
  }
};
