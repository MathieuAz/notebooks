import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { Cell } from '../notebookContent';
import { CellEvent } from '../components/cell';
export declare type MonacoEditorSupportedLanguage = "javascript" | "typescript" | "markdown" | "css" | "html" | "python";
export declare function createMonacoEditor(element: HTMLElement, cell: Cell, opts: {
    language?: MonacoEditorSupportedLanguage;
    wordWrap?: "off" | "on" | "wordWrapColumn" | "bounded";
}, emit?: (event: CellEvent) => void): Promise<monaco.editor.IStandaloneCodeEditor>;
