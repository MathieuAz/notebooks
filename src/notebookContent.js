/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { uuid } from 'uuidv4';
import { parseNotebookContent } from "./parser";
export function textToNotebookContent(text) {
    const { cells: parsedCells, frontMatter } = parseNotebookContent(text);
    const cells = parsedCells.map((pc) => {
        return {
            cellType: pc.type,
            textContent: pc.lines.join("\n"),
            properties: pc.properties,
            id: uuid(),
        };
    });
    const nbContent = {
        frontMatter,
        cells,
    };
    return nbContent;
}
export function notebookContentToText(nb) {
    let text = "";
    if (nb.frontMatter.length > 0) {
        text += nb.frontMatter + "\n";
    }
    return text + nb.cells.map(cellToText).join("\n");
}
export function cellToText(cell) {
    const cellText = `\`\`\` ${cell.cellType}\n${cell.textContent}`;
    return cellText;
}
function requireIndexOfCellId(cells, id) {
    if (id === undefined) {
        return cells.length - 1;
    }
    const idx = cells.findIndex((c) => (id === c.id));
    if (idx === -1) {
        throw new Error(`Cell with id ${id} doesn't exist`);
    }
    return idx;
}
export function addCellToNotebookContent(nb, position, adjacentCellId, id) {
    let idx;
    let cellType;
    if (position === "end") {
        idx = nb.cells.length;
        cellType = nb.cells.length === 0 ? "js" : nb.cells[nb.cells.length - 1].cellType;
    }
    else {
        idx = requireIndexOfCellId(nb.cells, adjacentCellId);
        cellType = idx === 0 && adjacentCellId === undefined ? "js" : nb.cells[idx].cellType;
    }
    if (position === "after") {
        idx += 1;
    }
    const cell = {
        cellType,
        textContent: "",
        properties: [],
        id: (id || uuid()),
    };
    nb.cells.splice(idx, 0, cell);
}
export function removeCellFromNotebookById(nb, id) {
    const idx = requireIndexOfCellId(nb.cells, id);
    nb.cells.splice(idx, 1);
}
export function changeCellType(nb, id, newCellType) {
    const idx = requireIndexOfCellId(nb.cells, id);
    const cellAsString = cellToText(nb.cells[idx]);
    const newCell = textToNotebookContent(cellAsString).cells[0];
    newCell.cellType = newCellType;
    nb.cells.splice(idx, 1, newCell);
}
//# sourceMappingURL=notebookContent.js.map