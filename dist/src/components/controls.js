/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { html } from "lit-html";
export function getDefaultControlsTemplate(controls) {
    const buttons = controls.buttons;
    return html `
        ${buttons.map((button) => html `
            <button @click="${button.callback}" class="cell-controls-button ${button.hide ? "auto-hide" : ""} " title="${button.tooltip}">
                ${button.icon({ width: 20, height: 20 })}
            </button>
            `)}
    `;
}
//# sourceMappingURL=controls.js.map