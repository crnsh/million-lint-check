import { Configuration } from 'twind';
export * from 'twind';

/**
 * [[include:src/shim/README.md]]
 *
 * @packageDocumentation
 * @module twind/shim
 */

/**
 * Options for {@link setup}.
 */
interface ShimConfiguration extends Configuration {
    /**
     * The root element to shim (default: `document.documentElement`).
     */
    target?: HTMLElement;
}
/**
 * Stop shimming/observing all nodes.
 */
declare const disconnect: () => void;
/**
 * Configure the default {@link tw} and starts {@link observe | observing} the
 * {@link ShimConfiguration.target | target element} (default: `document.documentElement`).
 *
 * You do not need to call this method. As an alternativ you can provide a
 * `<script type="twind-config">...</script>` element within the document.
 * The content must be valid JSON and all {@link twind.setup | twind setup options}
 * (including hash) are supported.
 */
declare const setup: ({ target, ...config }?: ShimConfiguration) => void;

export { ShimConfiguration, disconnect, setup };
//# sourceMappingURL=shim.d.ts.map
