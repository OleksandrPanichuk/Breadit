import { BlockTypes } from "./types";
import { Headings, Code, Delimiter, Embed, Image, Paragraph, Table, List } from "./renderers";





export const getRenderer = (type:BlockTypes) => {
    switch (type) {
        case 'header' : return Headings
        case 'code' : return Code
        case 'delimiter' : return Delimiter
        case 'embed' : return Embed
        case 'image' : return Image
        case 'list' : return List
        case 'paragraph' : return Paragraph
        case 'table' : return Table
        default : return null
    }
}