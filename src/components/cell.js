/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, property, customElement, query } from 'lit-element';
import { getCellTypeDefinitionForCellType, getAvailableCellTypes } from '../cellHandler/registry';
import { AssetsAddedIcon, DeleteIcon } from "@spectrum-web-components/icons-workflow";
let CellElement = class CellElement extends LitElement {
    constructor(cell, runtime, eventListener) {
        super();
        this.cell = cell;
        this.runtime = runtime;
        this.eventListener = eventListener;
        this.setAttribute("tabindex", "0");
    }
    createRenderRoot() {
        return this;
    }
    connectedCallback() {
        super.connectedCallback();
        this.cellTypeDefinition = getCellTypeDefinitionForCellType(this.cell.cellType);
        this.cellHandler = this.cellTypeDefinition.createHandler(this.cell);
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                if (event.ctrlKey) {
                    this.emit({ type: "RUN_CELL", focusNextCell: false, insertNewCell: false });
                }
                else if (event.shiftKey) {
                    this.emit({ type: "RUN_CELL", focusNextCell: true, insertNewCell: false });
                }
                else if (event.altKey) {
                    this.emit({ type: "RUN_CELL", focusNextCell: true, insertNewCell: true });
                }
            }
        });
        this.cellHandler.attach({
            runtime: this.runtime,
            elements: {
                topElement: this.topElement,
                topControlsElement: this.topControlsElement,
                bottomElement: this.bottomElement,
                bottomControlsElement: this.bottomControlsElement
            },
            emit: (e) => this.emit(e),
        });
    }
    emit(event) {
        this.eventListener(event);
    }
    run() {
        this.cellHandler.run();
    }
    focusEditor() {
        this.focus();
        this.cellHandler.focusEditor();
    }
    changeCellType(newCellType) {
        this.emit({
            type: "CHANGE_CELL_TYPE", newCellType: newCellType,
        });
    }
    handleCellTypeSelectButton() {
        this.cellTypePickerElement.classList.toggle("popover-active");
        if (this.cellTypePickerElement.classList.contains("popover-active")) {
            // TODO: refactor this. the idea is to detect clicks outside the element to close the popover.
            setTimeout(() => {
                const listenerFunc = (e) => {
                    if (!this.cellTypePickerElement.contains(e.target)) {
                        this.cellTypePickerElement.classList.remove("popover-active");
                        document.removeEventListener("click", listenerFunc);
                    }
                };
                document.addEventListener("click", listenerFunc);
            });
        }
    }
    render() {
        return html `
        <section class="cell-container">
            <div class="cell-controls cell-controls-corner"></div>
            <div class="cell-controls cell-controls-above">
                <div class="cell-popover-root">
                    <button title="Change Cell Type" class="cell-controls-button cell-controls-button-language" @click=${() => this.handleCellTypeSelectButton()}>${this.cellTypeDefinition.name}</button>
                    <div class="cell-popover cell-type-popover">
                        <b style="margin-bottom: 6px">Change Cell Type</b>

                        ${getAvailableCellTypes().map((ct) => html `
                            <button class="cell-popover-selection-button" @click=${() => this.changeCellType(ct.cellType)} >${ct.name} <span style="opacity: 0.6; float:right; font-size: 11px; font-family: monospace">${ct.cellType}</span></button>
                        `)}

                        <button class="cell-controls-button cell-popover-close-button" @click=${() => this.cellTypePickerElement.classList.remove("popover-active")}>Cancel</button>
                    </div>
                </div>
                <button @click="${() => this.emit({ type: "REMOVE_CELL" })}" class="cell-controls-button" title="Remove Cell">
                    ${DeleteIcon({ width: 18, height: 18 })}
                </button>
                <button @click="${() => this.emit({ type: "INSERT_CELL", position: "before" })}" class="cell-controls-button cell-controls-button-add" title="Add Cell Here">
                    ${AssetsAddedIcon({ width: 20, height: 20 })}
                </button>
            </div>

            <div class="cell-controls cell-controls-left cell-controls-left-top"></div>
            <div class="cell-top"></div>
            <div class="cell-controls cell-controls-left cell-controls-left-bottom"></div>
            <div class="cell-bottom"></div>
        </section>
    `;
    }
};
__decorate([
    query('.cell-top')
], CellElement.prototype, "topElement", void 0);
__decorate([
    query('.cell-controls-left-top')
], CellElement.prototype, "topControlsElement", void 0);
__decorate([
    query('.cell-bottom')
], CellElement.prototype, "bottomElement", void 0);
__decorate([
    query('.cell-controls-left-bottom')
], CellElement.prototype, "bottomControlsElement", void 0);
__decorate([
    query('.cell-type-popover')
], CellElement.prototype, "cellTypePickerElement", void 0);
__decorate([
    property({ type: Object })
], CellElement.prototype, "cell", void 0);
__decorate([
    property({ attribute: false })
], CellElement.prototype, "runtime", void 0);
__decorate([
    property()
], CellElement.prototype, "eventListener", void 0);
CellElement = __decorate([
    customElement('starboard-cell')
], CellElement);
export { CellElement };
//# sourceMappingURL=cell.js.map