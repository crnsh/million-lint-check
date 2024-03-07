import { TW } from 'twind';
export * from 'twind';
export * from 'twind/sheets';

/**
 * Options for {@link shim}.
 */
interface ShimOptions {
    /**
     * Custom {@link twind.tw | tw} instance to use (default: {@link twind.tw}).
     */
    tw?: TW;
}
/**
 * Shim the passed html.
 *
 * 1. tokenize the markup and process element classes with either the
 *    {@link twind.tw | default/global tw} instance or a {@link ShimOptions.tw | custom} instance
 * 2. populate the provided sheet with the generated rules
 * 3. output the HTML markup with the final element classes

 * @param markup the html to shim
 * @param options to use
 * @return the HTML markup with the final element classes
 */
declare const shim: (markup: string, options?: TW | ShimOptions) => string;

export { ShimOptions, shim };
//# sourceMappingURL=server.d.ts.map
