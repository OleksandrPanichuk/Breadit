import { BlockTypes } from "./types";
import { Headings, Checklist, Code, Delimiter, Embed, Image, Paragraph, Quote, Table, List, Warning } from "./renderers";





export const getRenderer = (type:BlockTypes) => {
    switch (type) {
        case 'header' : return Headings
        case 'checklist' : return Checklist
        case 'code' : return Code
        case 'delimiter' : return Delimiter
        case 'embed' : return Embed
        case 'image' : return Image
        case 'list' : return List
        case 'paragraph' : return Paragraph
        case 'quote' : return Quote
        case 'table' : return Table
        case 'warning' : return Warning
        default : return null
    }
}