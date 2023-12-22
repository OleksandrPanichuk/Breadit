import { Checkbox } from "@/components/ui/Checkbox";
import { TypeChecklistRendererProps } from "../types";
import parse from 'html-react-parser'
import { cn } from "@/lib/utils";

export const Checklist = ({data, className}:TypeChecklistRendererProps) => {
  return <ul className="my-4">
    {data.items.map((checkbox, index) => (
      <li key={index} className={cn('flex items-center gap-x-2',className)}>
        <Checkbox id={index.toString()} aria-readonly checked={checkbox.checked}  />
        <label htmlFor={index.toString()}>{parse(checkbox.text)}</label>
      </li>
    ))}
  </ul>;
};
