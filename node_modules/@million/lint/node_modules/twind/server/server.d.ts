import { Sheet, SheetInit } from 'twind';
export * from 'twind';
export * from 'twind/sheets';

interface AsyncVirtualSheet extends Sheet {
    readonly target: readonly string[];
    init: SheetInit;
    reset: () => void;
    enable: () => void;
    disable: () => void;
}
declare const asyncVirtualSheet: () => AsyncVirtualSheet;

export { AsyncVirtualSheet, asyncVirtualSheet };
//# sourceMappingURL=server.d.ts.map
