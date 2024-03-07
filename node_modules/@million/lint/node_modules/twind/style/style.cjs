var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __assign = Object.assign;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __rest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// src/style/index.ts
__markAsModule(exports);
__export(exports, {
  style: () => style
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/style/index.ts
var import_twind = __toModule(require("twind"));

// src/internal/util.ts
var includes = (value, search) => !!~value.indexOf(search);
var hyphenate = (value) => value.replace(/[A-Z]/g, "-$&").toLowerCase();
var evalThunk = (value, context) => {
  while (typeof value == "function") {
    value = value(context);
  }
  return value;
};
var isCSSProperty = (key, value) => !includes("@:&", key[0]) && (includes("rg", (typeof value)[5]) || Array.isArray(value));
var merge = (target, source, context) => source ? Object.keys(source).reduce((target2, key) => {
  const value = evalThunk(source[key], context);
  if (isCSSProperty(key, value)) {
    target2[hyphenate(key)] = value;
  } else {
    target2[key] = key[0] == "@" && includes("figa", key[1]) ? (target2[key] || []).concat(value) : merge(target2[key] || {}, value, context);
  }
  return target2;
}, target) : target;
var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));

// src/style/index.ts
__exportStar(exports, __toModule(require("twind/css")));
var styled$ = (rules, context) => rules.reduce((result, rule) => {
  if (typeof rule == "string") {
    rule = (0, import_twind.apply)(rule);
  }
  if (typeof rule == "function") {
    return merge(result, evalThunk(rule, context), context);
  }
  if (rule) {
    return merge(result, rule, context);
  }
  return result;
}, {});
var buildMediaRule = (key, value) => ({
  [key[0] == "@" ? key : `@screen ${key}`]: typeof value == "string" ? (0, import_twind.apply)(value) : value
});
var createStyle = (config = {}, base) => {
  const {base: baseStyle, variants = {}, defaults, matches = []} = config;
  const id = (0, import_twind.hash)(JSON.stringify([base == null ? void 0 : base.className, baseStyle, variants, defaults, matches]));
  const className = (base ? base.className + " " : "") + id;
  const selector = (base || "") + "." + id;
  return Object.defineProperties((allProps) => {
    const _a = __assign(__assign({}, defaults), allProps), {tw, css, class: localClass, className: localClassName} = _a, props = __rest(_a, ["tw", "css", "class", "className"]);
    const rules = [
      base && base(props),
      {
        _: className + (localClassName ? " " + localClassName : "") + (localClass ? " " + localClass : "")
      },
      baseStyle
    ];
    Object.keys(variants).forEach((variantKey) => {
      const variant = variants[variantKey];
      const propsValue = props[variantKey];
      if (propsValue === Object(propsValue)) {
        Object.keys(propsValue).forEach((key) => {
          const value = variant[propsValue[key]];
          rules.push(key == "initial" ? value : buildMediaRule(key, value));
        });
      } else {
        rules.push(variant[propsValue]);
      }
    });
    matches.forEach((matcher) => {
      const ruleIndex = rules.push(matcher.use) - 1;
      if (!Object.keys(matcher).every((variantKey) => {
        const propsValue = props[variantKey];
        const compoundValue = String(matcher[variantKey]);
        if (propsValue === Object(propsValue)) {
          Object.keys(propsValue).forEach((key) => {
            if (key != "initial" && compoundValue == String(propsValue[key])) {
              rules.push(buildMediaRule(key, rules[ruleIndex]));
            }
          });
          return true;
        }
        return variantKey == "use" || compoundValue == String(propsValue);
      })) {
        rules.length = ruleIndex;
      }
    });
    rules.push((0, import_twind.apply)(tw), css);
    return (0, import_twind.directive)(styled$, rules);
  }, {
    toString: {
      value: () => selector
    },
    className: {
      value: className
    },
    selector: {
      value: selector
    }
  });
};
var style = (base, config) => typeof base == "function" ? createStyle(config, base) : createStyle(base);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  style
});
//# sourceMappingURL=style.cjs.map
