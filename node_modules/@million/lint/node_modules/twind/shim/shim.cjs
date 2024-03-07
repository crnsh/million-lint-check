var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
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

// src/shim/index.ts
__markAsModule(exports);
__export(exports, {
  disconnect: () => disconnect,
  setup: () => setup
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/shim/index.ts
var import_observe = __toModule(require("twind/observe"));
__exportStar(exports, __toModule(require("twind")));
if (typeof document !== "undefined" && typeof addEventListener == "function") {
  onload = () => {
    const script = document.querySelector('script[type="twind-config"]');
    setup(script ? JSON.parse(script.innerHTML) : {});
  };
  if (document.readyState === "loading") {
    addEventListener("DOMContentLoaded", onload);
  } else {
    timeoutRef = setTimeout(onload);
  }
}
var onload;
var timeoutRef;
var observer = (0, import_observe.createObserver)();
var disconnect = () => {
  if (onload) {
    removeEventListener("DOMContentLoaded", onload);
    clearTimeout(timeoutRef);
  }
  observer.disconnect();
};
var setup = (_a = {}) => {
  var {
    target = document.documentElement
  } = _a, config = __rest(_a, [
    "target"
  ]);
  if (Object.keys(config).length) {
    (0, import_observe.setup)(config);
  }
  disconnect();
  observer.observe(target);
  target.hidden = false;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disconnect,
  setup
});
//# sourceMappingURL=shim.cjs.map
