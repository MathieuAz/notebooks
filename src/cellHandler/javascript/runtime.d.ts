import { ConsoleCatcher } from '../../console/console';
declare global {
    interface Window {
        $_: any;
        eval: (command: string) => any;
    }
}
interface RunResult {
    error: boolean;
    command: string;
    value?: any;
}
export declare class JavascriptRuntime {
    consoleCatcher: ConsoleCatcher;
    constructor();
    run(command: string): Promise<RunResult>;
}
export {};
