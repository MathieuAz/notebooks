export interface ParsedCell {
    type: string;
    properties: string[];
    lines: string[];
}
export declare function parseNotebookContent(notebookContentString: string): {
    frontMatter: string;
    cells: ParsedCell[];
};
