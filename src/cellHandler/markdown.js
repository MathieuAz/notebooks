/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { render } from "lit-html";
import mdlib from "markdown-it";
import { hookMarkdownIt } from "../highlight";
import { CellHandler } from "./base";
import { getDefaultControlsTemplate } from "../components/controls";
import { TextEditIcon, PlayCircleIcon } from "@spectrum-web-components/icons-workflow";
import { StarboardTextEditor } from "../components/textEditor";
const md = new mdlib();
hookMarkdownIt(md);
export const MARKDOWN_CELL_TYPE_DEFINITION = {
    name: "Markdown",
    cellType: "md",
    createHandler: (c) => new MarkdownCellHandler(c),
};
export class MarkdownCellHandler extends CellHandler {
    constructor(cell) {
        super(cell);
        this.isInEditMode = false;
    }
    getControls() {
        let editOrRunButton;
        if (this.isInEditMode) {
            editOrRunButton = {
                icon: PlayCircleIcon,
                tooltip: "Render as HTML",
                callback: () => this.emit({ type: "RUN_CELL" }),
            };
        }
        else {
            editOrRunButton = {
                icon: TextEditIcon,
                tooltip: "Edit Markdown",
                callback: () => this.enterEditMode(),
            };
        }
        return getDefaultControlsTemplate({ buttons: [editOrRunButton] });
    }
    attach(params) {
        this.elements = params.elements;
        this.emit = params.emit;
        this.run();
    }
    setupEditor() {
        const topElement = this.elements.topElement;
        topElement.innerHTML = "";
        this.editor = new StarboardTextEditor(this.cell, { language: "markdown" }, this.emit);
        topElement.appendChild(this.editor);
    }
    enterEditMode() {
        this.isInEditMode = true;
        this.setupEditor();
        render(this.getControls(), this.elements.topControlsElement);
    }
    async run() {
        const topElement = this.elements.topElement;
        if (this.editor !== undefined) {
            this.editor.dispose();
            delete this.editor;
        }
        const htmlContent = md.render(this.cell.textContent);
        const wrapped = `<div class="markdown-body">${htmlContent}</div>`;
        topElement.classList.remove("cell-editor");
        topElement.innerHTML = wrapped;
        topElement.children[0].addEventListener("dblclick", (_event) => this.enterEditMode());
        this.isInEditMode = false;
        render(this.getControls(), this.elements.topControlsElement);
    }
    async dispose() {
        if (this.editor) {
            this.editor.dispose();
        }
    }
    focusEditor() {
        if (this.editor) {
            this.editor.focus();
        }
    }
}
//# sourceMappingURL=markdown.js.map