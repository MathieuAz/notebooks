import { Cell } from "../notebookContent";
import { JavascriptRuntime } from "./javascript/runtime";
import { CellEvent } from "../components/cell";
export interface CellHandlerAttachParameters {
    runtime: JavascriptRuntime;
    elements: CellElements;
    emit: (event: CellEvent) => void;
}
export interface CellElements {
    topElement: HTMLElement;
    bottomElement: HTMLElement;
    topControlsElement: HTMLElement;
    bottomControlsElement: HTMLElement;
}
export declare abstract class CellHandler {
    protected cell: Cell;
    constructor(cell: Cell);
    abstract attach(param: CellHandlerAttachParameters): void;
    run(): Promise<any>;
    dispose(): Promise<void>;
    focusEditor(): void;
}
