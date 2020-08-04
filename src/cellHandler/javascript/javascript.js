/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { html, render } from "lit-html";
import { CellHandler } from "../base";
import { getDefaultControlsTemplate } from "../../components/controls";
import { isProbablyTemplateResult, isProbablyModule } from "../../util";
import { PlayCircleIcon, ClockIcon } from "@spectrum-web-components/icons-workflow";
import { ConsoleOutputElement } from "../../components/consoleOutput";
import { StarboardTextEditor } from '../../components/textEditor';
export const JAVASCRIPT_CELL_TYPE_DEFINITION = {
    name: "Javascript",
    cellType: "js",
    createHandler: (c) => new JavascriptCellHandler(c),
};
export class JavascriptCellHandler extends CellHandler {
    constructor(cell) {
        super(cell);
        this.isCurrentlyRunning = false;
        this.lastRunId = 0;
    }
    getControls() {
        const icon = this.isCurrentlyRunning ? ClockIcon : PlayCircleIcon;
        const tooltip = "Run Cell";
        const runButton = {
            icon,
            tooltip,
            callback: () => this.emit({ type: "RUN_CELL" }),
        };
        return getDefaultControlsTemplate({ buttons: [runButton] });
    }
    attach(params) {
        this.elements = params.elements;
        this.runtime = params.runtime;
        this.emit = params.emit;
        const topElement = this.elements.topElement;
        render(this.getControls(), this.elements.topControlsElement);
        this.editor = new StarboardTextEditor(this.cell, { language: "javascript" }, this.emit);
        topElement.appendChild(this.editor);
    }
    async run() {
        this.lastRunId++;
        const currentRunId = this.lastRunId;
        this.isCurrentlyRunning = true;
        render(this.getControls(), this.elements.topControlsElement);
        this.outputElement = new ConsoleOutputElement();
        this.outputElement.logs = [];
        const htmlOutput = document.createElement("div");
        render(html `${this.outputElement}${htmlOutput}`, this.elements.bottomElement);
        const output = [];
        this.outputElement.logs = [];
        // For deduplication, limits the updates to only one per animation frame.
        let hasUpdateScheduled = false;
        const callback = (msg) => {
            msg.data.forEach((e, i) => {
                if (isProbablyModule(e)) {
                    msg.data[i] = Object.assign({}, e);
                }
            });
            output.push(msg);
            if (!hasUpdateScheduled) {
                window.setTimeout(() => {
                    if (this.outputElement) {
                        this.outputElement.logs = [...output];
                    }
                    hasUpdateScheduled = true;
                });
            }
        };
        this.runtime.consoleCatcher.hook(callback);
        const outVal = await this.runtime.run(this.cell.textContent);
        window.setTimeout(() => this.runtime.consoleCatcher.unhook(callback));
        const val = outVal.value;
        if (isProbablyModule(val)) {
            output.push({
                method: "result",
                data: [Object.assign({}, val)]
            });
        }
        else if (val instanceof HTMLElement) {
            htmlOutput.appendChild(val);
        }
        else if (isProbablyTemplateResult(val)) {
            // console.log("Val is TemplateResult");
            render(html `${val}`, htmlOutput);
        }
        else {
            // console.log(val, val instanceof TemplateResult);
            if (val !== undefined) { // Don't show undefined output
                if (outVal.error) {
                    console.error(val); // NOTE: perhaps problematic for async code, don't want to loop this!
                    if (val.stack !== undefined) {
                        let stackToPrint = val.stack;
                        const errMsg = val.toString();
                        if (stackToPrint.startsWith(errMsg)) { // Prevent duplicate error msg in Chrome
                            stackToPrint = stackToPrint.substr(errMsg.length);
                        }
                        output.push({
                            method: "error",
                            data: [errMsg, stackToPrint]
                        });
                    }
                    else {
                        output.push({
                            method: "error",
                            data: [val]
                        });
                    }
                }
                else {
                    output.push({
                        method: "result",
                        data: [val]
                    });
                }
            }
        }
        if (this.lastRunId === currentRunId) {
            this.isCurrentlyRunning = false;
            render(this.getControls(), this.elements.topControlsElement);
        }
        this.outputElement.logs = output;
    }
    focusEditor() {
        this.editor.focus();
    }
    async dispose() {
        this.editor.remove();
    }
}
//# sourceMappingURL=javascript.js.map