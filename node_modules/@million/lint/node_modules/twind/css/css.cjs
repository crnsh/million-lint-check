var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __assign = Object.assign;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
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

// src/css/index.ts
__markAsModule(exports);
__export(exports, {
  animation: () => animation,
  css: () => css,
  keyframes: () => keyframes,
  screen: () => screen
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/css/index.ts
var import_twind = __toModule(require("twind"));

// src/internal/util.ts
var includes = (value, search) => !!~value.indexOf(search);
var join = (parts, separator = "-") => parts.join(separator);
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
var buildMediaQuery = (screen2) => {
  if (!Array.isArray(screen2)) {
    screen2 = [screen2];
  }
  return "@media " + join(screen2.map((screen3) => {
    if (typeof screen3 == "string") {
      screen3 = {min: screen3};
    }
    return screen3.raw || join(Object.keys(screen3).map((feature) => `(${feature}-width:${screen3[feature]})`), " and ");
  }), ",");
};

// src/css/index.ts
__exportStar(exports, __toModule(require("twind")));
var translate = (tokens, context) => {
  const collect = (target, token) => Array.isArray(token) ? token.reduce(collect, target) : merge(target, evalThunk(token, context), context);
  return tokens.reduce(collect, {});
};
var newRule = /\s*(?:([\w-%@]+)\s*:?\s*([^{;]+?)\s*(?:;|$|})|([^;}{]*?)\s*{)|(})/gi;
var ruleClean = /\/\*[\s\S]*?\*\/|\s+|\n/gm;
var decorate = (selectors, currentBlock) => selectors.reduceRight((rules, selector) => ({[selector]: rules}), currentBlock);
var saveBlock = (rules, selectors, currentBlock) => {
  if (currentBlock) {
    rules.push(decorate(selectors, currentBlock));
  }
};
var interleave = (strings, interpolations, context) => {
  let buffer = strings[0];
  const result = [];
  for (let index = 0; index < interpolations.length; ) {
    const interpolation = evalThunk(interpolations[index], context);
    if (interpolation && typeof interpolation == "object") {
      result.push(buffer, interpolation);
      buffer = strings[++index];
    } else {
      buffer += (interpolation || "") + strings[++index];
    }
  }
  result.push(buffer);
  return result;
};
var astish = (values, context) => {
  const selectors = [];
  const rules = [];
  let currentBlock;
  let match;
  for (let index = 0; index < values.length; index++) {
    const value = values[index];
    if (typeof value == "string") {
      while (match = newRule.exec(value.replace(ruleClean, " "))) {
        if (!match[0])
          continue;
        if (match[4]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.pop();
        }
        if (match[3]) {
          currentBlock = saveBlock(rules, selectors, currentBlock);
          selectors.push(match[3]);
        } else if (!match[4]) {
          if (!currentBlock)
            currentBlock = {};
          const value2 = match[2] && /\S/.test(match[2]) ? match[2] : values[++index];
          if (value2) {
            if (match[1] == "@apply") {
              merge(currentBlock, evalThunk((0, import_twind.apply)(value2), context), context);
            } else {
              currentBlock[match[1]] = value2;
            }
          }
        }
      }
    } else {
      currentBlock = saveBlock(rules, selectors, currentBlock);
      rules.push(decorate(selectors, value));
    }
  }
  saveBlock(rules, selectors, currentBlock);
  return rules;
};
var cssFactory = (tokens, context) => translate(Array.isArray(tokens[0]) && Array.isArray(tokens[0].raw) ? astish(interleave(tokens[0], tokens.slice(1), context), context) : tokens, context);
var css = (...tokens) => (0, import_twind.directive)(cssFactory, tokens);
var keyframesFactory = (tokens, context) => {
  const waypoints = cssFactory(tokens, context);
  const id = (0, import_twind.hash)(JSON.stringify(waypoints));
  context.tw(() => ({[`@keyframes ${id}`]: waypoints}));
  return id;
};
var keyframes = (...tokens) => (0, import_twind.directive)(keyframesFactory, tokens);
var animation = (value, waypoints) => waypoints === void 0 ? (...args) => animation(value, keyframes(...args)) : css(__assign(__assign({}, value && typeof value == "object" ? value : {animation: value}), {
  animationName: typeof waypoints == "function" ? waypoints : keyframes(waypoints)
}));
var screenFactory = ({size, rules}, context) => {
  const media = buildMediaQuery(context.theme("screens", size));
  return rules === void 0 ? media : {
    [media]: typeof rules == "function" ? evalThunk(rules, context) : cssFactory([rules], context)
  };
};
var screen = (size, rules) => (0, import_twind.directive)(screenFactory, {size, rules});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  animation,
  css,
  keyframes,
  screen
});
//# sourceMappingURL=css.cjs.map
