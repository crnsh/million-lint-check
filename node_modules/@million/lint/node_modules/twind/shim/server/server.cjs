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

// src/shim/server/index.ts
__markAsModule(exports);
__export(exports, {
  shim: () => shim
});

// node_modules/distilt/shim-node-cjs.js
var import_url = __toModule(require("url"));
var shim_import_meta_url = /* @__PURE__ */ (0, import_url.pathToFileURL)(__filename);

// src/shim/server/index.ts
var import_Tokenizer = __toModule(require("htmlparser2/lib/Tokenizer"));
var import_twind = __toModule(require("twind"));
__exportStar(exports, __toModule(require("twind")));
__exportStar(exports, __toModule(require("twind/sheets")));
var Tokenizer = import_Tokenizer.default.default || import_Tokenizer.default;
var noop = () => void 0;
var shim = (markup, options = {}) => {
  const {tw = import_twind.tw} = typeof options == "function" ? {tw: options} : options;
  let lastAttribName = "";
  let lastChunkStart = 0;
  const chunks = [];
  const tokenizer = new Tokenizer({
    decodeEntities: false,
    xmlMode: false
  }, {
    onattribend: noop,
    onattribdata: (value) => {
      if (lastAttribName == "class") {
        const currentIndex = tokenizer.getAbsoluteIndex();
        const startIndex = currentIndex - value.length;
        const parsedClassNames = tw(value);
        if (parsedClassNames !== value) {
          chunks.push(markup.slice(lastChunkStart, startIndex));
          chunks.push(parsedClassNames);
          lastChunkStart = currentIndex;
        }
      }
      lastAttribName = "";
    },
    onattribname: (name) => {
      lastAttribName = name;
    },
    oncdata: noop,
    onclosetag: noop,
    oncomment: noop,
    ondeclaration: noop,
    onend: noop,
    onerror: noop,
    onopentagend: noop,
    onopentagname: noop,
    onprocessinginstruction: noop,
    onselfclosingtag: noop,
    ontext: noop
  });
  tokenizer.end(markup);
  if (!chunks.length) {
    return markup;
  }
  return chunks.join("") + markup.slice(lastChunkStart || 0, markup.length);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shim
});
//# sourceMappingURL=server.cjs.map
