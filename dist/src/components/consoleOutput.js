/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, LitElement, property, html } from "lit-element";
import { render, createElement as h } from 'preact/compat';
/* eslint @typescript-eslint/ban-ts-comment: off */
//@ts-ignore
import { Console } from "console-feed";
// React functional component render function
const StarboardConsoleOutput = (props) => {
    return h(Console, { logs: props.logs, variant: "dark" });
};
let ConsoleOutputElement = class ConsoleOutputElement extends LitElement {
    constructor() {
        super(...arguments);
        this.logs = [];
    }
    createRenderRoot() {
        return this;
    }
    render() {
        const el = StarboardConsoleOutput({ logs: this.logs });
        const rootEl = document.createElement('div');
        rootEl.setAttribute("style", "background-color: rgb(36, 36, 36)");
        render(el, rootEl);
        if (el) {
            return html `${rootEl}`;
        }
        else {
            return html `Something went wrong rendering the console output.`;
        }
    }
};
__decorate([
    property({ attribute: false })
], ConsoleOutputElement.prototype, "logs", void 0);
ConsoleOutputElement = __decorate([
    customElement('starboard-console-output')
], ConsoleOutputElement);
export { ConsoleOutputElement };
//# sourceMappingURL=consoleOutput.js.map