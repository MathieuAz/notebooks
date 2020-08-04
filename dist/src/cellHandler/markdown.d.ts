import { Cell } from "../notebookContent";
import { CellHandler, CellHandlerAttachParameters } from "./base";
export declare const MARKDOWN_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    createHandler: (c: Cell) => MarkdownCellHandler;
};
export declare class MarkdownCellHandler extends CellHandler {
    private isInEditMode;
    private elements;
    private emit;
    private editor;
    constructor(cell: Cell);
    private getControls;
    attach(params: CellHandlerAttachParameters): void;
    private setupEditor;
    enterEditMode(): void;
    run(): Promise<void>;
    dispose(): Promise<void>;
    focusEditor(): void;
}
