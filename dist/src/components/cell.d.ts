import { LitElement } from 'lit-element';
import { Cell } from '../notebookContent';
import { JavascriptRuntime } from '../cellHandler/javascript/runtime';
export declare type CellEvent = {
    id?: string;
    type: "RUN_CELL";
    focusNextCell?: boolean;
    insertNewCell?: boolean;
} | {
    id?: string;
    type: "INSERT_CELL";
    position: "before" | "after";
} | {
    id?: string;
    type: "REMOVE_CELL";
} | {
    id?: string;
    type: "CHANGE_CELL_TYPE";
    newCellType: string;
} | {
    id?: string;
    type: "SAVE";
};
export declare class CellElement extends LitElement {
    private topElement;
    private topControlsElement;
    private bottomElement;
    private bottomControlsElement;
    private cellTypePickerElement;
    private cellTypeDefinition;
    private cellHandler;
    cell: Cell;
    private runtime;
    private eventListener;
    constructor(cell: Cell, runtime: JavascriptRuntime, eventListener: (event: CellEvent) => void);
    createRenderRoot(): this;
    connectedCallback(): void;
    firstUpdated(changedProperties: any): void;
    private emit;
    run(): void;
    focusEditor(): void;
    changeCellType(newCellType: string): void;
    handleCellTypeSelectButton(): void;
    render(): import("lit-element").TemplateResult;
}
