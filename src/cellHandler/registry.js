/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { DefaultCellHandler, DEFAULT_CELL_TYPE_DEFINITION } from "./default";
import { MARKDOWN_CELL_TYPE_DEFINITION } from "./markdown";
import { JAVASCRIPT_CELL_TYPE_DEFINITION } from "./javascript/javascript";
import { HTML_CELL_TYPE_DEFINITION } from "./html";
import { CSS_CELL_TYPE_DEFINITION } from "./css";
const PLAINTEXT_CELL_TYPE_DEFINITION = {
    name: "Plaintext",
    cellType: "plaintext",
    createHandler: (c) => new DefaultCellHandler(c),
};
const builtinCellTypes = [
    MARKDOWN_CELL_TYPE_DEFINITION,
    JAVASCRIPT_CELL_TYPE_DEFINITION,
    HTML_CELL_TYPE_DEFINITION,
    CSS_CELL_TYPE_DEFINITION,
    PLAINTEXT_CELL_TYPE_DEFINITION,
];
export const registry = new Map();
builtinCellTypes.forEach((e) => registry.set(e.cellType, e));
export function getCellTypeDefinitionForCellType(cellType) {
    if (registry.has(cellType)) {
        return registry.get(cellType);
    }
    else {
        console.log(`No cell handler found for cell type ${cellType}. Available cell handlers: ${Array.from(registry.keys())}`);
        return {
            ...DEFAULT_CELL_TYPE_DEFINITION,
            cellType: cellType,
            name: `Unknown type "${cellType}"`,
        };
    }
}
export function getAvailableCellTypes() {
    return [...registry.values()];
}
//# sourceMappingURL=registry.js.map