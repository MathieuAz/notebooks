/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
export function createCellProxy(cell, changedCallback) {
    return new Proxy(cell, {
        set: (target, prop, value) => {
            if (prop === "textContent") {
                if (typeof value !== "string") {
                    throw new TypeError("textContent must be a string");
                }
            }
            else if (prop === "id") {
                throw new Error("ID can not be changed.");
            }
            target[prop] = value;
            changedCallback();
            return true;
        }
    });
}
//# sourceMappingURL=cellProxy.js.map