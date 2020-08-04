/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import Hook from "console-feed/lib/Hook";
export class ConsoleCatcher {
    constructor(console) {
        Hook(console, (msg) => {
            if (this.currentHook) {
                this.currentHook(msg);
            }
        }, false);
    }
    hook(callback) {
        this.currentHook = callback;
    }
    unhook(callback) {
        if (this.currentHook === callback) {
            this.currentHook = undefined;
        }
    }
}
//# sourceMappingURL=console.js.map