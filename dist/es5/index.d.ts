export declare type WithKnownUsage<T> = {
    proxy: T;
    usage: Set<string>;
    usedKeys: Array<string>;
    resetUsage(): void;
};
export declare function withKnowUsage<T extends Object>(source: T): WithKnownUsage<T>;
