import { TemplateResult } from "lit-html";
export interface ControlButton {
    icon: (iconOpts: {
        width: number;
        height: number;
    } | undefined) => (string | TemplateResult);
    tooltip: string;
    hide?: boolean;
    callback: () => any | Promise<any>;
}
export interface ControlsDefinition {
    buttons: ControlButton[];
}
export declare function getDefaultControlsTemplate(controls: ControlsDefinition): TemplateResult;
