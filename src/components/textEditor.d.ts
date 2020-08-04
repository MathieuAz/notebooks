import { LitElement } from "lit-element";
import { Cell } from "../notebookContent";
import { CellEvent } from "./cell";
export declare type SupportedLanguage = "javascript" | "typescript" | "markdown" | "css" | "html" | "python";
export declare type WordWrapSetting = "off" | "on" | "wordWrapColumn" | "bounded";
/**
 * StarboardTextEditor abstracts over different text editors that are loaded dynamically.
 * The user can choose: monaco for desktop devices, or a more minimal editor for mobile phones.
 *
 * TODO: this file needs a big cleanup..
 */
export declare class StarboardTextEditor extends LitElement {
    private editorMountpoint;
    private emit;
    private cell;
    private opts;
    editorInstance?: any;
    constructor(cell: Cell, opts: {
        language?: SupportedLanguage;
    }, emit: (event: CellEvent) => void);
    connectedCallback(): void;
    handleDblClick(): void;
    firstUpdated(changedProperties: any): void;
    initEditor(): void;
    switchToCodeMirrorEditor(): void;
    switchToMonacoEditor(): void;
    createRenderRoot(): this;
    render(): import("lit-element").TemplateResult;
    focus(): void;
    dispose(): void;
}
