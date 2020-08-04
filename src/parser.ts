/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import { split } from "eol";

export interface ParsedCell {
    type: string;
    properties: string[];
    lines: string[];
}


export function parseNotebookContent(notebookContentString: string) {
    const cellLines = split(notebookContentString);
    const cells = [];
    let currentCell: ParsedCell | undefined = undefined;

    // default to MD
    currentCell = {
        type: 'md',
        properties: [],
        lines: [],
    };
    cells.push(currentCell);

    for (const line of cellLines) {

        if (line.slice(0, 3) === "```") {
            const flags = line.split(/[ \t]+/).filter(s => s !== "" && s.match(/^`*$/) === null);
            const [type, ...properties] = flags;

            currentCell = {
                type: type || 'md',
                properties,
                lines: []
            };

            cells.push(currentCell);

            continue;
        } else {
            if (currentCell.type !== 'md' || currentCell.lines.length || !line.match(/^(\s)*$/))
                currentCell.lines.push(line);
        }
    }

    return {
        frontMatter: cells
            .filter(cell => cell.type === 'frontmatter')
            .map(cell => cell.lines.join('\n'))
            .join('\n'),
        cells: cells
            .filter(cell => cell.type !== 'frontmatter')
            .filter(cell => cell.lines.length)
    };
}
