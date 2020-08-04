export declare function isProbablyTemplateResult(value: any): boolean;
export declare function isProbablyModule(value: any): boolean;
/**
 * Checks the state of a promise more or less 'right now'.
 * @param p
 */
export declare function promiseState(p: Promise<any>): Promise<"pending" | "fulfilled" | "rejected">;
/**
 * Inserts HTML element into parent's children at given index.
 * @param parent
 * @param child element to be inserted
 * @param index where to insert, should be a positive number, defaults to 0.
*/
export declare function insertHTMLChildAtIndex(parent: HTMLElement, child: HTMLElement, index?: number): void;
