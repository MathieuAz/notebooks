import { LitElement } from 'lit-element';
import { IFramePage } from 'iframe-resizer';
declare global {
    interface Window {
        parentIFrame: IFramePage;
        iFrameResizer: {
            onReady: () => void;
            onMessage: (msg: any) => void;
        };
    }
}
export declare class StarboardNotebook extends LitElement {
    private notebookContent;
    private runtime;
    private cellElements;
    private cellsParentElement;
    createRenderRoot(): this;
    insertCell(position: "end" | "before" | "after", adjacentCellId?: string): void;
    removeCell(id: string): void;
    changeCellType(id: string, newCellType: string): void;
    runCell(id: string, focusNext: boolean, insertNewCell: boolean): void;
    save(): void;
    connectedCallback(): void;
    firstUpdated(changedProperties: any): void;
    performUpdate(): void;
    private onCellChanged;
    render(): import("lit-element").TemplateResult;
}
