import { cn } from "@/lib/utils";
import { TypeListRendererProps } from "../types";
import parse from 'html-react-parser'

const validListStyles = ['ordered','unordered']
const  defaultClassNames = {
  orderedList: 'list-decimal px-5 my-4',
  unorderedList: 'list-disc px-5 my-4'
}

export const List = ({data, className}:TypeListRendererProps) => {
  if(!data || !data.items || !Array.isArray(data.items)) return <></>;
  const listType = validListStyles.includes(data.style) ? data.style : 'unordered';
  const content = data.items.map((item, index) => <li key={ index }  className={ className?.listItem }>{ parse(item) }</li>);
  if (content.length <= 0) return <></>;
  const ListTag = listType === 'ordered' ? 'ol' : 'ul'
  const listClassName = listType === 'ordered' ? defaultClassNames.orderedList : defaultClassNames.unorderedList

  return <ListTag className={cn(listClassName, className?.container)}>{content}</ListTag>;
};
