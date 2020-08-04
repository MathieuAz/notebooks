/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, LitElement, html, query } from "lit-element";
import mdlib from "markdown-it";
import { hookMarkdownIt } from "../highlight";
import { render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";
import { DeviceDesktopIcon, DevicePhoneIcon } from "@spectrum-web-components/icons-workflow";
let codeMirrorModule;
let monacoModule;
// Global state shared between all editors
let currentEditor = "";
const md = new mdlib();
hookMarkdownIt(md);
/**
 * StarboardTextEditor abstracts over different text editors that are loaded dynamically.
 * The user can choose: monaco for desktop devices, or a more minimal editor for mobile phones.
 *
 * TODO: this file needs a big cleanup..
 */
let StarboardTextEditor = class StarboardTextEditor extends LitElement {
    constructor(cell, opts, emit) {
        super();
        this.opts = {};
        this.emit = emit;
        this.cell = cell;
        this.opts = opts;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    handleDblClick() {
        if (currentEditor === "") {
            this.switchToMonacoEditor();
        }
        else {
            this.initEditor();
        }
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        if (currentEditor === "codemirror" || currentEditor === "monaco") {
            this.initEditor();
        }
        else {
            this.editorMountpoint.addEventListener("dblclick", () => this.handleDblClick(), { once: true, passive: true });
            const mdText = md.render("```" + `${this.opts.language}\n${this.cell.textContent}\n` + "```");
            render(html `
            <div class="cell-popover cell-select-editor-popover">
                    <div style="display: flex; align-items: center;">
                        <b style="font-size: 1em; margin-right: 4px">Please select an editor</b>
                        <button @click=${() => this.switchToMonacoEditor()} title="Monaco Editor (advanced, desktop only)" class="cell-popover-icon-button">${DeviceDesktopIcon({ width: 12, height: 12 })} Monaco</button>
                        <button @click=${() => this.switchToCodeMirrorEditor()} title="CodeMirror Editor (simpler, touchscreen friendly)" class="cell-popover-icon-button">${DevicePhoneIcon({ width: 12, height: 12 })} CodeMirror</button>
                    </div>
                    <span style="font-size: 0.85em"><b>Monaco</b> is more powerful, but is larger (4MB) and has poor touchscreen support.</span>
                </div>
            ${unsafeHTML(mdText)}
            `, this.editorMountpoint);
        }
    }
    initEditor() {
        if (currentEditor === "codemirror") {
            this.switchToCodeMirrorEditor();
        }
        else if (currentEditor === "monaco") {
            this.switchToMonacoEditor();
        }
    }
    switchToCodeMirrorEditor() {
        if (currentEditor === "monaco" && this.editorInstance) {
            this.editorInstance.dispose();
        }
        currentEditor = "codemirror";
        if (!codeMirrorModule) {
            codeMirrorModule = import(/* webpackChunkName: codemirror-editor */ "../editor/codeMirror");
            this.querySelectorAll(".cell-select-editor-popover").forEach((e) => e.innerHTML = "<b>Loading CodeMirror editor..</b>");
        }
        codeMirrorModule.then((m) => {
            this.editorMountpoint.innerHTML = "";
            this.editorInstance = m.createCodeMirrorEditor(this.editorMountpoint, this.cell, this.opts, this.emit);
        });
    }
    switchToMonacoEditor() {
        if (currentEditor === "codemirror" && this.editorInstance) {
            this.editorInstance.dom.remove();
        }
        currentEditor = "monaco";
        if (!monacoModule) {
            monacoModule = import(/* webpackChunkName: monaco-editor */ "../editor/monaco");
            this.querySelectorAll(".cell-select-editor-popover").forEach((e) => e.innerHTML = "<b>Loading Monaco editor..</b>");
        }
        monacoModule.then((m) => {
            this.editorMountpoint.innerHTML = "";
            this.editorInstance = m.createMonacoEditor(this.editorMountpoint, this.cell, this.opts, this.emit);
        });
    }
    createRenderRoot() {
        return this;
    }
    render() {
        return html `
        <div class="starboard-text-editor" tabIndex="0"></div>
        `;
    }
    focus() {
        if (this.editorInstance) {
            this.editorInstance.focus();
        }
    }
    dispose() {
        this.remove();
    }
};
__decorate([
    query(".starboard-text-editor")
], StarboardTextEditor.prototype, "editorMountpoint", void 0);
StarboardTextEditor = __decorate([
    customElement('starboard-text-editor')
], StarboardTextEditor);
export { StarboardTextEditor };
//# sourceMappingURL=textEditor.js.map