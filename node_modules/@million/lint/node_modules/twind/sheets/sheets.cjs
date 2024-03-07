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

// src/sheets/index.ts
__markAsModule(exports);
__export(exports, {
  domSheet: () => domSheet,
  getStyleTag: () => getStyleTag,
  getStyleTagProperties: () => getStyleTagProperties,
  virtualSheet: () => virtualSheet
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/internal/dom.ts
var STYLE_ELEMENT_ID = "__twind";
var getStyleElement = (nonce) => {
  let element = self[STYLE_ELEMENT_ID];
  if (!element) {
    element = document.head.appendChild(document.createElement("style"));
    element.id = STYLE_ELEMENT_ID;
    nonce && (element.nonce = nonce);
    element.appendChild(document.createTextNode(""));
  }
  return element;
};

// src/sheets/index.ts
var domSheet = ({
  nonce,
  target = getStyleElement(nonce)
} = {}) => {
  const offset = target.childNodes.length;
  return {
    target,
    insert: (rule, index) => target.insertBefore(document.createTextNode(rule), target.childNodes[offset + index])
  };
};
var createStorage = () => {
  const callbacks = [];
  let state = [];
  const invoke = (callback, index) => state[index] = callback(state[index]);
  return {
    init: (callback) => invoke(callback, callbacks.push(callback) - 1),
    reset: (snapshot = []) => {
      ;
      [snapshot, state] = [state, snapshot];
      callbacks.forEach(invoke);
      return snapshot;
    }
  };
};
var virtualSheet = () => {
  const storage = createStorage();
  let target;
  storage.init((value = []) => target = value);
  return Object.defineProperties({
    get target() {
      return [...target];
    },
    insert: (rule, index) => target.splice(index, 0, rule)
  }, Object.getOwnPropertyDescriptors(storage));
};
var getStyleTagProperties = (sheet) => ({
  id: STYLE_ELEMENT_ID,
  textContent: (Array.isArray(sheet) ? sheet : sheet.target).join("")
});
var getStyleTag = (sheet, attributes) => {
  const {id, textContent} = getStyleTagProperties(sheet);
  attributes = __assign(__assign({}, attributes), {id});
  return `<style${Object.keys(attributes).reduce((attrs, key) => `${attrs} ${key}=${JSON.stringify(attributes[key])}`, "")}>${textContent}</style>`;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  domSheet,
  getStyleTag,
  getStyleTagProperties,
  virtualSheet
});
//# sourceMappingURL=sheets.cjs.map
