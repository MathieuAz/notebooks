import { MessageCallback } from "console-feed/lib/Hook";
export declare class ConsoleCatcher {
    private currentHook?;
    constructor(console: Console);
    hook(callback: MessageCallback): void;
    unhook(callback: MessageCallback): void;
}
