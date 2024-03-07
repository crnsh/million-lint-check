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

// src/server/index.ts
__markAsModule(exports);
__export(exports, {
  asyncVirtualSheet: () => asyncVirtualSheet
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/server/index.ts
var import_async_hooks = __toModule(require("async_hooks"));
var import_sheets = __toModule(require("twind/sheets"));
__exportStar(exports, __toModule(require("twind")));
__exportStar(exports, __toModule(require("twind/sheets")));
var asyncVirtualSheet = () => {
  const sheet = (0, import_sheets.virtualSheet)();
  const initial = sheet.reset();
  const store = new Map();
  const asyncHook = (0, import_async_hooks.createHook)({
    init(asyncId, type, triggerAsyncId) {
      const snapshot = store.get(triggerAsyncId);
      if (snapshot) {
        store.set(asyncId, snapshot);
      }
    },
    before(asyncId) {
      const snapshot = store.get(asyncId);
      if (snapshot) {
        sheet.reset(snapshot.state);
      }
    },
    after(asyncId) {
      const snapshot = store.get(asyncId);
      if (snapshot) {
        snapshot.state = sheet.reset(initial);
      }
    },
    destroy(asyncId) {
      store.delete(asyncId);
    }
  }).enable();
  return {
    get target() {
      return sheet.target;
    },
    insert: sheet.insert,
    init: sheet.init,
    reset: () => {
      const asyncId = (0, import_async_hooks.executionAsyncId)();
      const snapshot = store.get(asyncId);
      if (snapshot) {
        snapshot.state = void 0;
      } else {
        store.set(asyncId, {state: void 0});
      }
      sheet.reset();
    },
    enable: () => asyncHook.enable(),
    disable: () => asyncHook.disable()
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  asyncVirtualSheet
});
//# sourceMappingURL=server.cjs.map
