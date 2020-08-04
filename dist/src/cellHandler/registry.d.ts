import { CellHandler } from "./base";
import { Cell } from "../notebookContent";
export interface CellTypeDefinition {
    createHandler(cell: Cell): CellHandler;
    /**
     * Name for human consumption, e.g. "Javascript"
     */
    name: string;
    cellType: string;
}
export declare const registry: Map<string, CellTypeDefinition>;
export declare function getCellTypeDefinitionForCellType(cellType: string): CellTypeDefinition;
export declare function getAvailableCellTypes(): CellTypeDefinition[];
