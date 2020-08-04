import { Cell } from "../../notebookContent";
import { CellHandler, CellHandlerAttachParameters } from "../base";
export declare const JAVASCRIPT_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    createHandler: (c: Cell) => JavascriptCellHandler;
};
export declare class JavascriptCellHandler extends CellHandler {
    private elements;
    private editor;
    private runtime;
    private emit;
    private isCurrentlyRunning;
    private lastRunId;
    private outputElement?;
    constructor(cell: Cell);
    private getControls;
    attach(params: CellHandlerAttachParameters): void;
    run(): Promise<void>;
    focusEditor(): void;
    dispose(): Promise<void>;
}
