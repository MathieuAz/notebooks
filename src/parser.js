/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import { split } from "eol";
export function parseNotebookContent(notebookContentString) {
    const allLines = split(notebookContentString);
    // All lines after the frontmatter
    let cellLines = [];
    let frontMatter = "";
    // All lines before the first cell make up the front matter.
    for (const [i, line] of allLines.entries()) {
        if (line.slice(0, 3) === "```") {
            frontMatter = allLines.slice(0, i).join("\n");
            cellLines = allLines.slice(i);
            break;
        }
    }
    const cells = [];
    let currentCell = undefined;
    for (const line of cellLines) {
        if (line.slice(0, 3) === "```") {
            if (cells.length && cells[cells.length - 1].lines.length === 0)
                cells.pop();
            const flags = line.split(/[ \t]+/).filter(s => s !== "" && s.match(/^`*$/) === null);
            const [type, ...properties] = flags;
            currentCell = {
                type: type || 'md',
                properties,
                lines: []
            };
            cells.push(currentCell);
            continue;
        }
        if (currentCell === undefined) { // This really only happens in case of an invalid notebook cell header
            frontMatter += line + "\n";
        }
        else {
            if (!line.match(/^(\s)*$/))
                currentCell.lines.push(line);
        }
    }
    return {
        frontMatter,
        cells
    };
}
//# sourceMappingURL=parser.js.map