export interface Cell {
    cellType: string;
    textContent: string;
    properties: any[];
    /**
     * Every cell has a unique ID, this is not persisted between runs.
     */
    id: string;
}
export interface NotebookContent {
    /**
     * Text before the first cell
     */
    frontMatter: string;
    cells: Cell[];
}
export declare function textToNotebookContent(text: string): NotebookContent;
export declare function notebookContentToText(nb: NotebookContent): string;
export declare function cellToText(cell: Cell): string;
export declare function addCellToNotebookContent(nb: NotebookContent, position: "end" | "before" | "after", adjacentCellId?: string, id?: string): void;
export declare function removeCellFromNotebookById(nb: NotebookContent, id: string): void;
export declare function changeCellType(nb: NotebookContent, id: string, newCellType: string): void;
