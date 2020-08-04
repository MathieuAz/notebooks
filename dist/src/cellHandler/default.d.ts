import { Cell } from "../notebookContent";
import { CellHandler, CellHandlerAttachParameters } from "./base";
export declare const DEFAULT_CELL_TYPE_DEFINITION: {
    name: string;
    cellType: string;
    createHandler: (c: Cell) => DefaultCellHandler;
};
/**
 * The cell handler that gets used when there is an unknown cell type
 */
export declare class DefaultCellHandler extends CellHandler {
    constructor(cell: Cell);
    attach(params: CellHandlerAttachParameters): void;
}
