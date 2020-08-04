/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
import "./styles/main.scss";
import "./components/notebook";
import "iframe-resizer/js/iframeResizer.contentWindow.js";
// Globals available to the user in the notebook
import * as lithtml from "lit-html";
window.html = lithtml.html;
window.svg = lithtml.svg;
window.lithtml = lithtml;
const query = new URLSearchParams(window.location.search);
if (query.get('file')) {
    const fileName = query.get('file');
    const notebookFromFile = `https://raw.githubusercontent.com/Sheraff/notebooks/notes/${fileName}`;
    fetch(notebookFromFile)
        .then(data => data.text())
        .then(text => {
        window.initialNotebookContent = text;
    })
        .finally(init);
}
else {
    list();
}
function init() {
    document.body.innerHTML += `
        <base target="_parent" />
        <starboard-notebook>
        </starboard-notebook>
    `;
}
async function list() {
    const data = await fetch('https://api.github.com/repos/Sheraff/notebooks/git/trees/notes?recursive=1');
    const json = await data.json();
    const tree = json.tree;
    const html = tree
        .filter(({ type }) => type === 'blob')
        .map(({ path }) => `
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
//# sourceMappingURL=main.js.map