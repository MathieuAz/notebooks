import { Cell } from "../notebookContent";
import { CellHandler, CellHandlerAttachParameters } from "./base";
export declare const CSS_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    createHandler: (c: Cell) => CSSCellHandler;
};
export declare class CSSCellHandler extends CellHandler {
    private elements;
    private editor;
    private emit;
    constructor(cell: Cell);
    private getControls;
    attach(params: CellHandlerAttachParameters): void;
    run(): Promise<void>;
    focusEditor(): void;
    dispose(): Promise<void>;
}
