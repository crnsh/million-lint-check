var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
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

// src/observe/index.ts
__markAsModule(exports);
__export(exports, {
  createObserver: () => createObserver,
  observe: () => observe
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/observe/index.ts
var import_twind = __toModule(require("twind"));

// src/internal/util.ts
var ensureMaxSize = (map, max) => {
  if (map.size > max) {
    map.delete(map.keys().next().value);
  }
};
var escape = typeof CSS !== "undefined" && CSS.escape || ((className) => className.replace(/[!"'`*+.,;:\\/<=>?@#$%&^|~()[\]{}]/g, "\\$&").replace(/^\d/, "\\3$& "));

// src/observe/index.ts
__exportStar(exports, __toModule(require("twind")));
var caches = new WeakMap();
var getCache = (tw) => {
  let rulesToClassCache = caches.get(tw);
  if (!rulesToClassCache) {
    rulesToClassCache = new Map();
    caches.set(tw, rulesToClassCache);
  }
  return rulesToClassCache;
};
var uniq = (value, index, values) => values.indexOf(value) == index;
var createObserver = ({tw = import_twind.tw} = {}) => {
  if (typeof MutationObserver == "function") {
    const rulesToClassCache = getCache(tw);
    const handleMutation = ({target, addedNodes}) => {
      var _a;
      const rules = (_a = target.getAttribute) == null ? void 0 : _a.call(target, "class");
      if (rules) {
        let className = rulesToClassCache.get(rules);
        if (!className) {
          className = tw(rules).split(/ +/g).filter(uniq).join(" ");
          rulesToClassCache.set(rules, className);
          rulesToClassCache.set(className, className);
          ensureMaxSize(rulesToClassCache, 3e4);
        }
        if (rules !== className) {
          ;
          target.setAttribute("class", className);
        }
      }
      for (let index = addedNodes.length; index--; ) {
        const node = addedNodes[index];
        handleMutations([
          {
            target: node,
            addedNodes: node.children || []
          }
        ]);
      }
    };
    const handleMutations = (mutations) => {
      mutations.forEach(handleMutation);
      mutations = observer.takeRecords();
      if (mutations)
        mutations.forEach(handleMutation);
    };
    const observer = new MutationObserver(handleMutations);
    return {
      observe(target) {
        handleMutations([{target, addedNodes: [target]}]);
        observer.observe(target, {
          attributes: true,
          attributeFilter: ["class"],
          subtree: true,
          childList: true
        });
        return this;
      },
      disconnect() {
        observer.disconnect();
        return this;
      }
    };
  }
  return {
    observe() {
      return this;
    },
    disconnect() {
      return this;
    }
  };
};
function observe(target, config = typeof this == "function" ? void 0 : this) {
  return createObserver(config).observe(target);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createObserver,
  observe
});
//# sourceMappingURL=observe.cjs.map
