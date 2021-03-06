/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import "./styles/main.scss";
import "./components/notebook";

import "iframe-resizer/js/iframeResizer.contentWindow.js";

// Globals available to the user in the notebook
import * as lithtml from "lit-html";
(window as any).html = lithtml.html;
(window as any).svg = lithtml.svg;
(window as any).lithtml = lithtml;

declare const GITHUB_REPOSITORY: string;

const query = new URLSearchParams(window.location.search);
if(query.get('file')) {
    const fileName = query.get('file');
    const notebookFromFile = `https://raw.githubusercontent.com/${GITHUB_REPOSITORY}/notes/${fileName}`;
    fetch(notebookFromFile)
        .then(data => data.text())
        .then(text => {
            (window as any).initialNotebookContent = text;
        })
        .finally(init);
} else {
    list();
}

function init() {
    document.body.innerHTML += `
        <base target="_parent" />
        <starboard-notebook>
        </starboard-notebook>
    `;
}

type GitGetTreeResponseTreeItem = {
    mode: string;
    path: string;
    sha: string;
    size?: number;
    type: string;
    url: string;
};
type GitGetTreeResponse = {
    sha: string;
    tree: Array<GitGetTreeResponseTreeItem>;
    truncated: boolean;
    url: string;
};

async function list() {
    const data = await fetch(`https://api.github.com/repos/${GITHUB_REPOSITORY}/git/trees/notes?recursive=1`);
    const json = await data.json() as GitGetTreeResponse;
    const tree = json.tree;
    const html = tree
        .filter(({type}) => type === 'blob')
        .filter(({path}) => !path.startsWith('.'))
        .map(({path}) => `
        <li><a href="?file=${path}">${path}</a></li>
        `)
        .join('');
    document.body.innerHTML += `
    <h1>List of available notebooks</h1>
    <ul>
        ${html}
    </ul>
    `;
}
