import { CSSRules, Directive, Token } from 'twind';
export * from 'twind/css';

/**
 * [[include:src/style/README.md]]
 *
 * @packageDocumentation
 * @module twind/style
 */

declare type StrictMorphVariant<T> = T extends number ? `${T}` | T : T extends 'true' ? true | T : T extends 'false' ? false | T : T;
declare type MorphVariant<T> = T extends number ? `${T}` | T : T extends 'true' ? boolean | T : T extends 'false' ? boolean | T : T extends `${number}` ? number | T : T;
declare type StyleToken = string | CSSRules | Directive<CSSRules>;
declare type VariantsOf<T> = T extends Style<infer Variants> ? {
    [key in keyof Variants]: MorphVariant<keyof Variants[key]>;
} : never;
declare type DefaultVariants<Variants> = {
    [key in keyof Variants]?: StrictMorphVariant<keyof Variants[key]> | (Record<string, StrictMorphVariant<keyof Variants[key]>> & {
        initial?: StrictMorphVariant<keyof Variants[key]>;
    });
};
declare type VariantsProps<Variants> = {
    [key in keyof Variants]?: MorphVariant<keyof Variants[key]> | (Record<string, MorphVariant<keyof Variants[key]>> & {
        initial?: MorphVariant<keyof Variants[key]>;
    });
};
declare type VariantMatchers<Variants> = {
    [key in keyof Variants]?: StrictMorphVariant<keyof Variants[key]>;
};
interface StyleConfig<Variants, BaseVariants = {}> {
    base?: StyleToken;
    variants?: Variants & {
        [variant in keyof BaseVariants]?: {
            [key in keyof BaseVariants[variant]]?: StyleToken;
        };
    };
    defaults?: DefaultVariants<Variants & BaseVariants>;
    matches?: (VariantMatchers<Variants & BaseVariants> & {
        use: StyleToken;
    })[];
}
interface StyleFunction {
    <Variants>(config?: StyleConfig<Variants>): Style<Variants> & string;
    <Variants, BaseVariants>(base: Style<BaseVariants>, config?: StyleConfig<Variants, BaseVariants>): Style<BaseVariants & Variants> & string;
}
interface BaseStyleProps {
    tw?: Token;
    css?: CSSRules;
    class?: string;
    className?: string;
}
declare type StyleProps<Variants> = VariantsProps<Variants> & BaseStyleProps;
interface Style<Variants> {
    /**
     * CSS Class associated with the current component.
     *
     * ```jsx
     * const button = style({
     *   base: {
     *     color: "DarkSlateGray"
     *   }
     * })
     *
     * <div className={tw(button())} />
     * ```
     * <br />
     */
    (props?: StyleProps<Variants>): Directive<CSSRules>;
    /**
     * CSS Selector associated with the current component.
     *
     * ```js
     * const button = style({
     *   base: {
     *     color: "DarkSlateGray"
     *   }
     * })
     *
     * const article = style({
     *   base: {
     *     [button]: { boxShadow: "0 0 0 5px" }
     *   }
     * })
     * ```
     */
    toString(): string;
    /**
     * CSS Class associated with the current component.
     *
     * ```js
     * const button = style({
     *   base: {
     *     color: "DarkSlateGray"
     *   }
     * })
     *
     * <div className={button.className} />
     * ```
     */
    readonly className: string;
    /**
     * CSS Selector associated with the current component.
     *
     * ```js
     * const button = style({
     *   base: {
     *     color: "DarkSlateGray"
     *   }
     * })
     *
     * const Card = styled({
     *   base: {
     *     [Button.selector]: { boxShadow: "0 0 0 5px" }
     *   }
     * })
     * ```
     */
    readonly selector: string;
}
declare const style: StyleFunction;

export { BaseStyleProps, DefaultVariants, MorphVariant, StrictMorphVariant, Style, StyleConfig, StyleFunction, StyleProps, StyleToken, VariantMatchers, VariantsOf, VariantsProps, style };
//# sourceMappingURL=style.d.ts.map
