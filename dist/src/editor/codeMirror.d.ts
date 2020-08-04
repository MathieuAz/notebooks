import { EditorView } from "@codemirror/next/view";
import { Cell } from "../notebookContent";
import { CellEvent } from "../components/cell";
export declare function createCodeMirrorEditor(element: HTMLElement, cell: Cell, opts: {
    language?: string;
    wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
}, _emit?: (event: CellEvent) => void): EditorView;
