import { TW } from 'twind';
export * from 'twind';

/**
 * [[include:src/observe/README.md]]
 *
 * @packageDocumentation
 * @module twind/observe
 */

/**
 * Options for {@link createObserver}.
 */
interface ShimConfiguration {
    /**
     * Custom {@link twind.tw | tw} instance to use (default: {@link twind.tw}).
     */
    tw?: TW;
}
/** Provides the ability to watch for changes being made to the DOM tree. */
interface TwindObserver {
    /**
     * Stops observer from observing any mutations.
     */
    disconnect(): TwindObserver;
    /**
     * Observe an additional element.
     */
    observe(target: Node): TwindObserver;
}
/**
 * Creates a new {@link TwindObserver}.
 *
 * @param options to use
 */
declare const createObserver: ({ tw }?: ShimConfiguration) => TwindObserver;
/**
 * Creates a new {@link TwindObserver} and {@link TwindObserver.observe | start observing} the passed target element.
 * @param this to bind
 * @param target to shim
 * @param config to use
 */
declare function observe(this: ShimConfiguration | undefined | void, target: Node, config?: ShimConfiguration | undefined | void): TwindObserver;

export { ShimConfiguration, TwindObserver, createObserver, observe };
//# sourceMappingURL=observe.d.ts.map
