import { cn } from "@/lib/utils";
import { TypeEmbedRendererProps } from "../types";
import parse from 'html-react-parser'

export const Embed = ({data, className}:TypeEmbedRendererProps) => {
  return   <figure  className={cn('flex flex-col justify-center  items-center my-5 w-full max-w-full aspect-video', className)}>
  <iframe className={'max-w-full h-full  aspect-video rounded-[5px] shadow-none outline-none border-none'} src={ data.embed } ></iframe>
  { data.caption && <figcaption className="px-[10px] py-[5px] text-xs rounded-sm cursor-default" >{ parse(data.caption) }</figcaption> }
</figure>
};
