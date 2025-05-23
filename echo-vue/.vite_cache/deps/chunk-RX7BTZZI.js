import {
  require_node_path
} from "./chunk-M2MSWSHF.js";
import {
  __commonJS,
  __require,
  __toESM
} from "./chunk-ZSMWDLMK.js";

// browser-external:node:fs
var require_node_fs = __commonJS({
  "browser-external:node:fs"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:fs" has been externalized for browser compatibility. Cannot access "node:fs.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:process
var require_node_process = __commonJS({
  "browser-external:node:process"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:process" has been externalized for browser compatibility. Cannot access "node:process.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/rollup/dist/native.js
var require_native = __commonJS({
  "node_modules/rollup/dist/native.js"(exports, module) {
    var { existsSync } = require_node_fs();
    var path = require_node_path();
    var { platform, arch, report } = require_node_process();
    var isMusl = () => !report.getReport().header.glibcVersionRuntime;
    var bindingsByPlatformAndArch = {
      android: {
        arm: { base: "android-arm-eabi" },
        arm64: { base: "android-arm64" }
      },
      darwin: {
        arm64: { base: "darwin-arm64" },
        x64: { base: "darwin-x64" }
      },
      linux: {
        arm: { base: "linux-arm-gnueabihf", musl: "linux-arm-musleabihf" },
        arm64: { base: "linux-arm64-gnu", musl: "linux-arm64-musl" },
        ppc64: { base: "linux-powerpc64le-gnu", musl: null },
        riscv64: { base: "linux-riscv64-gnu", musl: null },
        s390x: { base: "linux-s390x-gnu", musl: null },
        x64: { base: "linux-x64-gnu", musl: "linux-x64-musl" }
      },
      win32: {
        arm64: { base: "win32-arm64-msvc" },
        ia32: { base: "win32-ia32-msvc" },
        x64: { base: "win32-x64-msvc" }
      }
    };
    var msvcLinkFilenameByArch = {
      arm64: "vc_redist.arm64.exe",
      ia32: "vc_redist.x86.exe",
      x64: "vc_redist.x64.exe"
    };
    var packageBase = getPackageBase();
    var localName = `./rollup.${packageBase}.node`;
    var requireWithFriendlyError = (id) => {
      try {
        return __require(id);
      } catch (error2) {
        if (platform === "win32" && error2 instanceof Error && error2.code === "ERR_DLOPEN_FAILED" && error2.message.includes("The specified module could not be found")) {
          const msvcDownloadLink = `https://aka.ms/vs/17/release/${msvcLinkFilenameByArch[arch]}`;
          throw new Error(
            `Failed to load module ${id}. Required DLL was not found. This error usually happens when Microsoft Visual C++ Redistributable is not installed. You can download it from ${msvcDownloadLink}`,
            { cause: error2 }
          );
        }
        throw new Error(
          `Cannot find module ${id}. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try \`npm i\` again after removing both package-lock.json and node_modules directory.`,
          { cause: error2 }
        );
      }
    };
    var { parse: parse2, parseAsync: parseAsync2, xxhashBase64Url, xxhashBase36, xxhashBase16 } = requireWithFriendlyError(
      existsSync(path.join(__dirname, localName)) ? localName : `@rollup/rollup-${packageBase}`
    );
    function getPackageBase() {
      var _a;
      const imported = (_a = bindingsByPlatformAndArch[platform]) == null ? void 0 : _a[arch];
      if (!imported) {
        throwUnsupportedError(false);
      }
      if ("musl" in imported && isMusl()) {
        return imported.musl || throwUnsupportedError(true);
      }
      return imported.base;
    }
    function throwUnsupportedError(isMusl2) {
      throw new Error(
        `Your current platform "${platform}${isMusl2 ? " (musl)" : ""}" and architecture "${arch}" combination is not yet supported by the native Rollup build. Please use the WASM build "@rollup/wasm-node" instead.

The following platform-architecture combinations are supported:
${Object.entries(bindingsByPlatformAndArch).flatMap(
          ([platformName, architectures]) => Object.entries(architectures).flatMap(([architectureName, { musl }]) => {
            const name = `${platformName}-${architectureName}`;
            return musl ? [name, `${name} (musl)`] : [name];
          })
        ).join("\n")}

If this is important to you, please consider supporting Rollup to make a native build for your platform and architecture available.`
      );
    }
    module.exports.parse = parse2;
    module.exports.parseAsync = parseAsync2;
    module.exports.xxhashBase64Url = xxhashBase64Url;
    module.exports.xxhashBase36 = xxhashBase36;
    module.exports.xxhashBase16 = xxhashBase16;
  }
});

// browser-external:node:fs/promises
var require_promises = __commonJS({
  "browser-external:node:fs/promises"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:fs/promises" has been externalized for browser compatibility. Cannot access "node:fs/promises.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:node:perf_hooks
var require_node_perf_hooks = __commonJS({
  "browser-external:node:perf_hooks"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "node:perf_hooks" has been externalized for browser compatibility. Cannot access "node:perf_hooks.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// browser-external:tty
var require_tty = __commonJS({
  "browser-external:tty"(exports, module) {
    module.exports = Object.create(new Proxy({}, {
      get(_, key) {
        if (key !== "__esModule" && key !== "__proto__" && key !== "constructor" && key !== "splice") {
          console.warn(`Module "tty" has been externalized for browser compatibility. Cannot access "tty.${key}" in client code. See https://vitejs.dev/guide/troubleshooting.html#module-externalized-for-browser-compatibility for more details.`);
        }
      }
    }));
  }
});

// node_modules/rollup/dist/es/shared/parseAst.js
var import_native = __toESM(require_native(), 1);
var import_node_path = __toESM(require_node_path(), 1);
var ArrowFunctionExpression = "ArrowFunctionExpression";
var BlockStatement = "BlockStatement";
var CallExpression = "CallExpression";
var CatchClause = "CatchClause";
var ExportDefaultDeclaration = "ExportDefaultDeclaration";
var ExpressionStatement = "ExpressionStatement";
var Identifier = "Identifier";
var Literal = "Literal";
var PanicError = "PanicError";
var ParseError = "ParseError";
var Program = "Program";
var Property = "Property";
var ReturnStatement = "ReturnStatement";
var StaticBlock = "StaticBlock";
var TemplateLiteral = "TemplateLiteral";
var VariableDeclarator = "VariableDeclarator";
var BLANK = Object.freeze(/* @__PURE__ */ Object.create(null));
var EMPTY_OBJECT = Object.freeze({});
var EMPTY_ARRAY = Object.freeze([]);
var EMPTY_SET = Object.freeze(new class extends Set {
  add() {
    throw new Error("Cannot add to empty set");
  }
}());
var FIXED_STRINGS = [
  "var",
  "let",
  "const",
  "init",
  "get",
  "set",
  "constructor",
  "method",
  "-",
  "+",
  "!",
  "~",
  "typeof",
  "void",
  "delete",
  "++",
  "--",
  "==",
  "!=",
  "===",
  "!==",
  "<",
  "<=",
  ">",
  ">=",
  "<<",
  ">>",
  ">>>",
  "+",
  "-",
  "*",
  "/",
  "%",
  "|",
  "^",
  "&",
  "||",
  "&&",
  "in",
  "instanceof",
  "**",
  "??",
  "=",
  "+=",
  "-=",
  "*=",
  "/=",
  "%=",
  "<<=",
  ">>=",
  ">>>=",
  "|=",
  "^=",
  "&=",
  "**=",
  "&&=",
  "||=",
  "??=",
  "pure",
  "noSideEffects",
  "sourcemap",
  "using",
  "await using"
];
var ANNOTATION_KEY = "_rollupAnnotations";
var INVALID_ANNOTATION_KEY = "_rollupRemoved";
var convertAnnotations = (position, buffer) => {
  if (position === 0)
    return EMPTY_ARRAY;
  const length = buffer[position++];
  const list = [];
  for (let index = 0; index < length; index++) {
    list.push(convertAnnotation(buffer[position++], buffer));
  }
  return list;
};
var convertAnnotation = (position, buffer) => {
  const start = buffer[position++];
  const end = buffer[position++];
  const type = FIXED_STRINGS[buffer[position]];
  return { end, start, type };
};
function rangeContains(range, index) {
  return range.start <= index && index < range.end;
}
function getLocator(source, options = {}) {
  const { offsetLine = 0, offsetColumn = 0 } = options;
  let start = 0;
  const ranges = source.split("\n").map((line, i2) => {
    const end = start + line.length + 1;
    const range = { start, end, line: i2 };
    start = end;
    return range;
  });
  let i = 0;
  function locator(search, index) {
    if (typeof search === "string") {
      search = source.indexOf(search, index ?? 0);
    }
    if (search === -1) return void 0;
    let range = ranges[i];
    const d = search >= range.end ? 1 : -1;
    while (range) {
      if (rangeContains(range, search)) {
        return {
          line: offsetLine + range.line,
          column: offsetColumn + search - range.start,
          character: search
        };
      }
      i += d;
      range = ranges[i];
    }
  }
  return locator;
}
function locate(source, search, options) {
  return getLocator(source, options)(search, options && options.startIndex);
}
function spaces(index) {
  let result = "";
  while (index--)
    result += " ";
  return result;
}
function tabsToSpaces(value) {
  return value.replace(/^\t+/, (match) => match.split("	").join("  "));
}
var LINE_TRUNCATE_LENGTH = 120;
var MIN_CHARACTERS_SHOWN_AFTER_LOCATION = 10;
var ELLIPSIS = "...";
function getCodeFrame(source, line, column) {
  let lines = source.split("\n");
  if (line > lines.length)
    return "";
  const maxLineLength = Math.max(tabsToSpaces(lines[line - 1].slice(0, column)).length + MIN_CHARACTERS_SHOWN_AFTER_LOCATION + ELLIPSIS.length, LINE_TRUNCATE_LENGTH);
  const frameStart = Math.max(0, line - 3);
  let frameEnd = Math.min(line + 2, lines.length);
  lines = lines.slice(frameStart, frameEnd);
  while (!/\S/.test(lines[lines.length - 1])) {
    lines.pop();
    frameEnd -= 1;
  }
  const digits = String(frameEnd).length;
  return lines.map((sourceLine, index) => {
    const isErrorLine = frameStart + index + 1 === line;
    let lineNumber = String(index + frameStart + 1);
    while (lineNumber.length < digits)
      lineNumber = ` ${lineNumber}`;
    let displayedLine = tabsToSpaces(sourceLine);
    if (displayedLine.length > maxLineLength) {
      displayedLine = `${displayedLine.slice(0, maxLineLength - ELLIPSIS.length)}${ELLIPSIS}`;
    }
    if (isErrorLine) {
      const indicator = spaces(digits + 2 + tabsToSpaces(sourceLine.slice(0, column)).length) + "^";
      return `${lineNumber}: ${displayedLine}
${indicator}`;
    }
    return `${lineNumber}: ${displayedLine}`;
  }).join("\n");
}
var LOGLEVEL_SILENT = "silent";
var LOGLEVEL_ERROR = "error";
var LOGLEVEL_WARN = "warn";
var LOGLEVEL_INFO = "info";
var LOGLEVEL_DEBUG = "debug";
var logLevelPriority = {
  [LOGLEVEL_DEBUG]: 0,
  [LOGLEVEL_INFO]: 1,
  [LOGLEVEL_SILENT]: 3,
  [LOGLEVEL_WARN]: 2
};
var ABSOLUTE_PATH_REGEX = /^(?:\/|(?:[A-Za-z]:)?[/\\|])/;
var RELATIVE_PATH_REGEX = /^\.?\.(\/|$)/;
function isAbsolute(path) {
  return ABSOLUTE_PATH_REGEX.test(path);
}
function isRelative(path) {
  return RELATIVE_PATH_REGEX.test(path);
}
var BACKSLASH_REGEX = /\\/g;
function normalize(path) {
  return path.replace(BACKSLASH_REGEX, "/");
}
function printQuotedStringList(list, verbs) {
  const isSingleItem = list.length <= 1;
  const quotedList = list.map((item) => `"${item}"`);
  let output = isSingleItem ? quotedList[0] : `${quotedList.slice(0, -1).join(", ")} and ${quotedList.slice(-1)[0]}`;
  if (verbs) {
    output += ` ${isSingleItem ? verbs[0] : verbs[1]}`;
  }
  return output;
}
var ANY_SLASH_REGEX = /[/\\]/;
function relative(from, to) {
  const fromParts = from.split(ANY_SLASH_REGEX).filter(Boolean);
  const toParts = to.split(ANY_SLASH_REGEX).filter(Boolean);
  if (fromParts[0] === ".")
    fromParts.shift();
  if (toParts[0] === ".")
    toParts.shift();
  while (fromParts[0] && toParts[0] && fromParts[0] === toParts[0]) {
    fromParts.shift();
    toParts.shift();
  }
  while (toParts[0] === ".." && fromParts.length > 0) {
    toParts.shift();
    fromParts.pop();
  }
  while (fromParts.pop()) {
    toParts.unshift("..");
  }
  return toParts.join("/");
}
function getAliasName(id) {
  const base = (0, import_node_path.basename)(id);
  return base.slice(0, Math.max(0, base.length - (0, import_node_path.extname)(id).length));
}
function relativeId(id) {
  if (!isAbsolute(id))
    return id;
  return relative((0, import_node_path.resolve)(), id);
}
function isPathFragment(name) {
  return name[0] === "/" || name[0] === "." && (name[1] === "/" || name[1] === ".") || isAbsolute(name);
}
var UPPER_DIR_REGEX = /^(\.\.\/)*\.\.$/;
function getImportPath(importerId, targetPath, stripJsExtension, ensureFileName) {
  while (targetPath.startsWith("../")) {
    targetPath = targetPath.slice(3);
    importerId = "_/" + importerId;
  }
  let relativePath = normalize(relative((0, import_node_path.dirname)(importerId), targetPath));
  if (stripJsExtension && relativePath.endsWith(".js")) {
    relativePath = relativePath.slice(0, -3);
  }
  if (ensureFileName) {
    if (relativePath === "")
      return "../" + (0, import_node_path.basename)(targetPath);
    if (UPPER_DIR_REGEX.test(relativePath)) {
      return [...relativePath.split("/"), "..", (0, import_node_path.basename)(targetPath)].join("/");
    }
  }
  return relativePath ? relativePath.startsWith("..") ? relativePath : "./" + relativePath : ".";
}
function isValidUrl(url) {
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
}
function getRollupUrl(snippet) {
  return `https://rollupjs.org/${snippet}`;
}
function addTrailingSlashIfMissed(url) {
  if (!url.endsWith("/")) {
    return url + "/";
  }
  return url;
}
var URL_AVOIDING_EVAL = "troubleshooting/#avoiding-eval";
var URL_NAME_IS_NOT_EXPORTED = "troubleshooting/#error-name-is-not-exported-by-module";
var URL_THIS_IS_UNDEFINED = "troubleshooting/#error-this-is-undefined";
var URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY = "troubleshooting/#warning-treating-module-as-external-dependency";
var URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT = "troubleshooting/#warning-sourcemap-is-likely-to-be-incorrect";
var URL_JSX = "configuration-options/#jsx";
var URL_OUTPUT_AMD_ID = "configuration-options/#output-amd-id";
var URL_OUTPUT_AMD_BASEPATH = "configuration-options/#output-amd-basepath";
var URL_OUTPUT_DIR = "configuration-options/#output-dir";
var URL_OUTPUT_EXPORTS = "configuration-options/#output-exports";
var URL_OUTPUT_EXTEND = "configuration-options/#output-extend";
var URL_OUTPUT_EXTERNALIMPORTATTRIBUTES = "configuration-options/#output-externalimportattributes";
var URL_OUTPUT_FORMAT = "configuration-options/#output-format";
var URL_OUTPUT_GENERATEDCODE = "configuration-options/#output-generatedcode";
var URL_OUTPUT_GLOBALS = "configuration-options/#output-globals";
var URL_OUTPUT_INLINEDYNAMICIMPORTS = "configuration-options/#output-inlinedynamicimports";
var URL_OUTPUT_INTEROP = "configuration-options/#output-interop";
var URL_OUTPUT_MANUALCHUNKS = "configuration-options/#output-manualchunks";
var URL_OUTPUT_NAME = "configuration-options/#output-name";
var URL_OUTPUT_SOURCEMAPBASEURL = "configuration-options/#output-sourcemapbaseurl";
var URL_OUTPUT_SOURCEMAPFILE = "configuration-options/#output-sourcemapfile";
var URL_PRESERVEENTRYSIGNATURES = "configuration-options/#preserveentrysignatures";
var URL_TREESHAKE = "configuration-options/#treeshake";
var URL_TREESHAKE_PURE = "configuration-options/#pure";
var URL_TREESHAKE_NOSIDEEFFECTS = "configuration-options/#no-side-effects";
var URL_TREESHAKE_MODULESIDEEFFECTS = "configuration-options/#treeshake-modulesideeffects";
var URL_WATCH = "configuration-options/#watch";
var URL_GENERATEBUNDLE = "plugin-development/#generatebundle";
function error(base) {
  throw base instanceof Error ? base : getRollupError(base);
}
function getRollupError(base) {
  augmentLogMessage(base);
  const errorInstance = Object.assign(new Error(base.message), base);
  Object.defineProperty(errorInstance, "name", {
    value: "RollupError",
    writable: true
  });
  return errorInstance;
}
function augmentCodeLocation(properties, pos, source, id) {
  if (typeof pos === "object") {
    const { line, column } = pos;
    properties.loc = { column, file: id, line };
  } else {
    properties.pos = pos;
    const location = locate(source, pos, { offsetLine: 1 });
    if (!location) {
      return;
    }
    const { line, column } = location;
    properties.loc = { column, file: id, line };
  }
  if (properties.frame === void 0) {
    const { line, column } = properties.loc;
    properties.frame = getCodeFrame(source, line, column);
  }
}
var symbolAugmented = Symbol("augmented");
function augmentLogMessage(log) {
  var _a;
  if (!(log.plugin || log.loc) || log[symbolAugmented]) {
    return;
  }
  log[symbolAugmented] = true;
  let prefix = "";
  if (log.plugin) {
    prefix += `[plugin ${log.plugin}] `;
  }
  const id = log.id || ((_a = log.loc) == null ? void 0 : _a.file);
  if (id) {
    const position = log.loc ? ` (${log.loc.line}:${log.loc.column})` : "";
    prefix += `${relativeId(id)}${position}: `;
  }
  const oldMessage = log.message;
  log.message = prefix + log.message;
  tweakStackMessage(log, oldMessage);
}
var ADDON_ERROR = "ADDON_ERROR";
var ALREADY_CLOSED = "ALREADY_CLOSED";
var AMBIGUOUS_EXTERNAL_NAMESPACES = "AMBIGUOUS_EXTERNAL_NAMESPACES";
var ANONYMOUS_PLUGIN_CACHE = "ANONYMOUS_PLUGIN_CACHE";
var ASSET_NOT_FINALISED = "ASSET_NOT_FINALISED";
var ASSET_NOT_FOUND = "ASSET_NOT_FOUND";
var ASSET_SOURCE_ALREADY_SET = "ASSET_SOURCE_ALREADY_SET";
var ASSET_SOURCE_MISSING = "ASSET_SOURCE_MISSING";
var BAD_LOADER = "BAD_LOADER";
var CANNOT_CALL_NAMESPACE = "CANNOT_CALL_NAMESPACE";
var CANNOT_EMIT_FROM_OPTIONS_HOOK = "CANNOT_EMIT_FROM_OPTIONS_HOOK";
var CHUNK_NOT_GENERATED = "CHUNK_NOT_GENERATED";
var CHUNK_INVALID = "CHUNK_INVALID";
var CIRCULAR_DEPENDENCY = "CIRCULAR_DEPENDENCY";
var CIRCULAR_REEXPORT = "CIRCULAR_REEXPORT";
var CONST_REASSIGN = "CONST_REASSIGN";
var CYCLIC_CROSS_CHUNK_REEXPORT = "CYCLIC_CROSS_CHUNK_REEXPORT";
var DEPRECATED_FEATURE = "DEPRECATED_FEATURE";
var DUPLICATE_ARGUMENT_NAME = "DUPLICATE_ARGUMENT_NAME";
var DUPLICATE_EXPORT = "DUPLICATE_EXPORT";
var DUPLICATE_PLUGIN_NAME = "DUPLICATE_PLUGIN_NAME";
var EMPTY_BUNDLE = "EMPTY_BUNDLE";
var EVAL = "EVAL";
var EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS = "EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS";
var EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES = "EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES";
var EXTERNAL_SYNTHETIC_EXPORTS = "EXTERNAL_SYNTHETIC_EXPORTS";
var FILE_NAME_CONFLICT = "FILE_NAME_CONFLICT";
var FILE_NOT_FOUND = "FILE_NOT_FOUND";
var FIRST_SIDE_EFFECT = "FIRST_SIDE_EFFECT";
var ILLEGAL_IDENTIFIER_AS_NAME = "ILLEGAL_IDENTIFIER_AS_NAME";
var ILLEGAL_REASSIGNMENT = "ILLEGAL_REASSIGNMENT";
var INCONSISTENT_IMPORT_ATTRIBUTES = "INCONSISTENT_IMPORT_ATTRIBUTES";
var INVALID_ANNOTATION = "INVALID_ANNOTATION";
var INPUT_HOOK_IN_OUTPUT_PLUGIN = "INPUT_HOOK_IN_OUTPUT_PLUGIN";
var INVALID_CHUNK = "INVALID_CHUNK";
var INVALID_EXPORT_OPTION = "INVALID_EXPORT_OPTION";
var INVALID_EXTERNAL_ID = "INVALID_EXTERNAL_ID";
var INVALID_IMPORT_ATTRIBUTE = "INVALID_IMPORT_ATTRIBUTE";
var INVALID_LOG_POSITION = "INVALID_LOG_POSITION";
var INVALID_OPTION = "INVALID_OPTION";
var INVALID_PLUGIN_HOOK = "INVALID_PLUGIN_HOOK";
var INVALID_ROLLUP_PHASE = "INVALID_ROLLUP_PHASE";
var INVALID_SETASSETSOURCE = "INVALID_SETASSETSOURCE";
var INVALID_TLA_FORMAT = "INVALID_TLA_FORMAT";
var MISSING_EXPORT = "MISSING_EXPORT";
var MISSING_GLOBAL_NAME = "MISSING_GLOBAL_NAME";
var MISSING_IMPLICIT_DEPENDANT = "MISSING_IMPLICIT_DEPENDANT";
var MISSING_JSX_EXPORT = "MISSING_JSX_EXPORT";
var MISSING_NAME_OPTION_FOR_IIFE_EXPORT = "MISSING_NAME_OPTION_FOR_IIFE_EXPORT";
var MISSING_NODE_BUILTINS = "MISSING_NODE_BUILTINS";
var MISSING_OPTION = "MISSING_OPTION";
var MIXED_EXPORTS = "MIXED_EXPORTS";
var MODULE_LEVEL_DIRECTIVE = "MODULE_LEVEL_DIRECTIVE";
var NAMESPACE_CONFLICT = "NAMESPACE_CONFLICT";
var NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE = "NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE";
var OPTIMIZE_CHUNK_STATUS = "OPTIMIZE_CHUNK_STATUS";
var PARSE_ERROR = "PARSE_ERROR";
var PLUGIN_ERROR = "PLUGIN_ERROR";
var REDECLARATION_ERROR = "REDECLARATION_ERROR";
var RESERVED_NAMESPACE = "RESERVED_NAMESPACE";
var SHIMMED_EXPORT = "SHIMMED_EXPORT";
var SOURCEMAP_BROKEN = "SOURCEMAP_BROKEN";
var SOURCEMAP_ERROR = "SOURCEMAP_ERROR";
var SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT = "SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT";
var THIS_IS_UNDEFINED = "THIS_IS_UNDEFINED";
var UNEXPECTED_NAMED_IMPORT = "UNEXPECTED_NAMED_IMPORT";
var UNKNOWN_OPTION = "UNKNOWN_OPTION";
var UNRESOLVED_ENTRY = "UNRESOLVED_ENTRY";
var UNRESOLVED_IMPORT = "UNRESOLVED_IMPORT";
var UNUSED_EXTERNAL_IMPORT = "UNUSED_EXTERNAL_IMPORT";
var VALIDATION_ERROR = "VALIDATION_ERROR";
function logAddonNotGenerated(message, hook, plugin) {
  return {
    code: ADDON_ERROR,
    message: `Could not retrieve "${hook}". Check configuration of plugin "${plugin}".
	Error Message: ${message}`
  };
}
function logAlreadyClosed() {
  return {
    code: ALREADY_CLOSED,
    message: 'Bundle is already closed, no more calls to "generate" or "write" are allowed.'
  };
}
function logAmbiguousExternalNamespaces(binding, reexportingModule, usedModule, sources) {
  return {
    binding,
    code: AMBIGUOUS_EXTERNAL_NAMESPACES,
    ids: sources,
    message: `Ambiguous external namespace resolution: "${relativeId(reexportingModule)}" re-exports "${binding}" from one of the external modules ${printQuotedStringList(sources.map((module) => relativeId(module)))}, guessing "${relativeId(usedModule)}".`,
    reexporter: reexportingModule
  };
}
function logAnonymousPluginCache() {
  return {
    code: ANONYMOUS_PLUGIN_CACHE,
    message: "A plugin is trying to use the Rollup cache but is not declaring a plugin name or cacheKey."
  };
}
function logAssetNotFinalisedForFileName(name) {
  return {
    code: ASSET_NOT_FINALISED,
    message: `Plugin error - Unable to get file name for asset "${name}". Ensure that the source is set and that generate is called first. If you reference assets via import.meta.ROLLUP_FILE_URL_<referenceId>, you need to either have set their source after "renderStart" or need to provide an explicit "fileName" when emitting them.`
  };
}
function logAssetReferenceIdNotFoundForSetSource(assetReferenceId) {
  return {
    code: ASSET_NOT_FOUND,
    message: `Plugin error - Unable to set the source for unknown asset "${assetReferenceId}".`
  };
}
function logAssetSourceAlreadySet(name) {
  return {
    code: ASSET_SOURCE_ALREADY_SET,
    message: `Unable to set the source for asset "${name}", source already set.`
  };
}
function logNoAssetSourceSet(assetName) {
  return {
    code: ASSET_SOURCE_MISSING,
    message: `Plugin error creating asset "${assetName}" - no asset source set.`
  };
}
function logBadLoader(id) {
  return {
    code: BAD_LOADER,
    message: `Error loading "${relativeId(id)}": plugin load hook should return a string, a { code, map } object, or nothing/null.`
  };
}
function logCannotCallNamespace(name) {
  return {
    code: CANNOT_CALL_NAMESPACE,
    message: `Cannot call a namespace ("${name}").`
  };
}
function logCannotEmitFromOptionsHook() {
  return {
    code: CANNOT_EMIT_FROM_OPTIONS_HOOK,
    message: `Cannot emit files or set asset sources in the "outputOptions" hook, use the "renderStart" hook instead.`
  };
}
function logChunkNotGeneratedForFileName(name) {
  return {
    code: CHUNK_NOT_GENERATED,
    message: `Plugin error - Unable to get file name for emitted chunk "${name}". You can only get file names once chunks have been generated after the "renderStart" hook.`
  };
}
function logChunkInvalid({ fileName, code }, { pos, message }) {
  const errorProperties = {
    code: CHUNK_INVALID,
    message: `Chunk "${fileName}" is not valid JavaScript: ${message}.`
  };
  augmentCodeLocation(errorProperties, pos, code, fileName);
  return errorProperties;
}
function logCircularDependency(cyclePath) {
  return {
    code: CIRCULAR_DEPENDENCY,
    ids: cyclePath,
    message: `Circular dependency: ${cyclePath.map(relativeId).join(" -> ")}`
  };
}
function logCircularReexport(exportName, exporter) {
  return {
    code: CIRCULAR_REEXPORT,
    exporter,
    message: `"${exportName}" cannot be exported from "${relativeId(exporter)}" as it is a reexport that references itself.`
  };
}
function logCyclicCrossChunkReexport(exportName, exporter, reexporter, importer, preserveModules) {
  return {
    code: CYCLIC_CROSS_CHUNK_REEXPORT,
    exporter,
    id: importer,
    message: `Export "${exportName}" of module "${relativeId(exporter)}" was reexported through module "${relativeId(reexporter)}" while both modules are dependencies of each other and will end up in different chunks by current Rollup settings. This scenario is not well supported at the moment as it will produce a circular dependency between chunks and will likely lead to broken execution order.
Either change the import in "${relativeId(importer)}" to point directly to the exporting module or ${preserveModules ? 'do not use "output.preserveModules"' : 'reconfigure "output.manualChunks"'} to ensure these modules end up in the same chunk.`,
    reexporter
  };
}
function logDeprecation(deprecation, urlSnippet, plugin) {
  return {
    code: DEPRECATED_FEATURE,
    message: deprecation,
    url: getRollupUrl(urlSnippet),
    ...{}
  };
}
function logConstVariableReassignError() {
  return {
    code: CONST_REASSIGN,
    message: "Cannot reassign a variable declared with `const`"
  };
}
function logDuplicateArgumentNameError(name) {
  return {
    code: DUPLICATE_ARGUMENT_NAME,
    message: `Duplicate argument name "${name}"`
  };
}
function logDuplicateExportError(name) {
  return { code: DUPLICATE_EXPORT, message: `Duplicate export "${name}"` };
}
function logDuplicatePluginName(plugin) {
  return {
    code: DUPLICATE_PLUGIN_NAME,
    message: `The plugin name ${plugin} is being used twice in the same build. Plugin names must be distinct or provide a cacheKey (please post an issue to the plugin if you are a plugin user).`
  };
}
function logEmptyChunk(chunkName) {
  return {
    code: EMPTY_BUNDLE,
    message: `Generated an empty chunk: "${chunkName}".`,
    names: [chunkName]
  };
}
function logEval(id) {
  return {
    code: EVAL,
    id,
    message: `Use of eval in "${relativeId(id)}" is strongly discouraged as it poses security risks and may cause issues with minification.`,
    url: getRollupUrl(URL_AVOIDING_EVAL)
  };
}
function logExternalSyntheticExports(id, importer) {
  return {
    code: EXTERNAL_SYNTHETIC_EXPORTS,
    exporter: id,
    message: `External "${id}" cannot have "syntheticNamedExports" enabled (imported by "${relativeId(importer)}").`
  };
}
function logFileNameConflict(fileName) {
  return {
    code: FILE_NAME_CONFLICT,
    message: `The emitted file "${fileName}" overwrites a previously emitted file of the same name.`
  };
}
function logFileReferenceIdNotFoundForFilename(assetReferenceId) {
  return {
    code: FILE_NOT_FOUND,
    message: `Plugin error - Unable to get file name for unknown file "${assetReferenceId}".`
  };
}
function logFirstSideEffect(source, id, { line, column }) {
  return {
    code: FIRST_SIDE_EFFECT,
    message: `First side effect in ${relativeId(id)} is at (${line}:${column})
${getCodeFrame(source, line, column)}`
  };
}
function logIllegalIdentifierAsName(name) {
  return {
    code: ILLEGAL_IDENTIFIER_AS_NAME,
    message: `Given name "${name}" is not a legal JS identifier. If you need this, you can try "output.extend: true".`,
    url: getRollupUrl(URL_OUTPUT_EXTEND)
  };
}
function logIllegalImportReassignment(name, importingId) {
  return {
    code: ILLEGAL_REASSIGNMENT,
    message: `Illegal reassignment of import "${name}" in "${relativeId(importingId)}".`
  };
}
function logInconsistentImportAttributes(existingAttributes, newAttributes, source, importer) {
  return {
    code: INCONSISTENT_IMPORT_ATTRIBUTES,
    message: `Module "${relativeId(importer)}" tried to import "${relativeId(source)}" with ${formatAttributes(newAttributes)} attributes, but it was already imported elsewhere with ${formatAttributes(existingAttributes)} attributes. Please ensure that import attributes for the same module are always consistent.`
  };
}
var formatAttributes = (attributes) => {
  const entries = Object.entries(attributes);
  if (entries.length === 0)
    return "no";
  return entries.map(([key, value]) => `"${key}": "${value}"`).join(", ");
};
function logInvalidAnnotation(comment, id, type) {
  return {
    code: INVALID_ANNOTATION,
    id,
    message: `A comment

"${comment}"

in "${relativeId(id)}" contains an annotation that Rollup cannot interpret due to the position of the comment. The comment will be removed to avoid issues.`,
    url: getRollupUrl(type === "noSideEffects" ? URL_TREESHAKE_NOSIDEEFFECTS : URL_TREESHAKE_PURE)
  };
}
function logInputHookInOutputPlugin(pluginName, hookName) {
  return {
    code: INPUT_HOOK_IN_OUTPUT_PLUGIN,
    message: `The "${hookName}" hook used by the output plugin ${pluginName} is a build time hook and will not be run for that plugin. Either this plugin cannot be used as an output plugin, or it should have an option to configure it as an output plugin.`
  };
}
function logCannotAssignModuleToChunk(moduleId, assignToAlias, currentAlias) {
  return {
    code: INVALID_CHUNK,
    message: `Cannot assign "${relativeId(moduleId)}" to the "${assignToAlias}" chunk as it is already in the "${currentAlias}" chunk.`
  };
}
function tweakStackMessage(error2, oldMessage) {
  if (!error2.stack) {
    return error2;
  }
  error2.stack = error2.stack.replace(oldMessage, error2.message);
  return error2;
}
function logInvalidExportOptionValue(optionValue) {
  return {
    code: INVALID_EXPORT_OPTION,
    message: `"output.exports" must be "default", "named", "none", "auto", or left unspecified (defaults to "auto"), received "${optionValue}".`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function logIncompatibleExportOptionValue(optionValue, keys, entryModule) {
  return {
    code: INVALID_EXPORT_OPTION,
    message: `"${optionValue}" was specified for "output.exports", but entry module "${relativeId(entryModule)}" has the following exports: ${printQuotedStringList(keys)}`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function logInternalIdCannotBeExternal(source, importer) {
  return {
    code: INVALID_EXTERNAL_ID,
    message: `"${source}" is imported as an external by "${relativeId(importer)}", but is already an existing non-external module id.`
  };
}
function logImportOptionsAreInvalid(importer) {
  return {
    code: INVALID_IMPORT_ATTRIBUTE,
    message: `Rollup could not statically analyze the options argument of a dynamic import in "${relativeId(importer)}". Dynamic import options need to be an object with a nested attributes object.`
  };
}
function logImportAttributeIsInvalid(importer) {
  return {
    code: INVALID_IMPORT_ATTRIBUTE,
    message: `Rollup could not statically analyze an import attribute of a dynamic import in "${relativeId(importer)}". Import attributes need to have string keys and values. The attribute will be removed.`
  };
}
function logInvalidLogPosition(plugin) {
  return {
    code: INVALID_LOG_POSITION,
    message: `Plugin "${plugin}" tried to add a file position to a log or warning. This is only supported in the "transform" hook at the moment and will be ignored.`
  };
}
function logInvalidOption(option, urlSnippet, explanation, value) {
  return {
    code: INVALID_OPTION,
    message: `Invalid value ${value === void 0 ? "" : `${JSON.stringify(value)} `}for option "${option}" - ${explanation}.`,
    url: getRollupUrl(urlSnippet)
  };
}
function logInvalidAddonPluginHook(hook, plugin) {
  return {
    code: INVALID_PLUGIN_HOOK,
    hook,
    message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a string, a function hook or an object with a "handler" string or function.`,
    plugin
  };
}
function logInvalidFunctionPluginHook(hook, plugin) {
  return {
    code: INVALID_PLUGIN_HOOK,
    hook,
    message: `Error running plugin hook "${hook}" for plugin "${plugin}", expected a function hook or an object with a "handler" function.`,
    plugin
  };
}
function logInvalidRollupPhaseForChunkEmission() {
  return {
    code: INVALID_ROLLUP_PHASE,
    message: `Cannot emit chunks after module loading has finished.`
  };
}
function logInvalidSetAssetSourceCall() {
  return {
    code: INVALID_SETASSETSOURCE,
    message: `setAssetSource cannot be called in transform for caching reasons. Use emitFile with a source, or call setAssetSource in another hook.`
  };
}
function logInvalidFormatForTopLevelAwait(id, format) {
  return {
    code: INVALID_TLA_FORMAT,
    id,
    message: `Module format "${format}" does not support top-level await. Use the "es" or "system" output formats rather.`
  };
}
function logMissingEntryExport(binding, exporter) {
  return {
    binding,
    code: MISSING_EXPORT,
    exporter,
    message: `Exported variable "${binding}" is not defined in "${relativeId(exporter)}".`,
    url: getRollupUrl(URL_NAME_IS_NOT_EXPORTED)
  };
}
function logMissingExport(binding, importingModule, exporter) {
  const isJson = (0, import_node_path.extname)(exporter) === ".json";
  return {
    binding,
    code: MISSING_EXPORT,
    exporter,
    id: importingModule,
    message: `"${binding}" is not exported by "${relativeId(exporter)}", imported by "${relativeId(importingModule)}".${isJson ? " (Note that you need @rollup/plugin-json to import JSON files)" : ""}`,
    url: getRollupUrl(URL_NAME_IS_NOT_EXPORTED)
  };
}
function logMissingGlobalName(externalId, guess) {
  return {
    code: MISSING_GLOBAL_NAME,
    id: externalId,
    message: `No name was provided for external module "${externalId}" in "output.globals" – guessing "${guess}".`,
    names: [guess],
    url: getRollupUrl(URL_OUTPUT_GLOBALS)
  };
}
function logImplicitDependantCannotBeExternal(unresolvedId, implicitlyLoadedBefore) {
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" cannot be external.`
  };
}
function logUnresolvedImplicitDependant(unresolvedId, implicitlyLoadedBefore) {
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(unresolvedId)}" that should be implicitly loaded before "${relativeId(implicitlyLoadedBefore)}" could not be resolved.`
  };
}
function logImplicitDependantIsNotIncluded(module) {
  const implicitDependencies = [...module.implicitlyLoadedBefore].map((dependency) => relativeId(dependency.id)).sort();
  return {
    code: MISSING_IMPLICIT_DEPENDANT,
    message: `Module "${relativeId(module.id)}" that should be implicitly loaded before ${printQuotedStringList(implicitDependencies)} is not included in the module graph. Either it was not imported by an included module or only via a tree-shaken dynamic import, or no imported bindings were used and it had otherwise no side-effects.`
  };
}
function logMissingJsxExport(name, exporter, importer) {
  return {
    code: MISSING_JSX_EXPORT,
    exporter,
    id: importer,
    message: `Export "${name}" is not defined in module "${relativeId(exporter)}" even though it is needed in "${relativeId(importer)}" to provide JSX syntax. Please check your "jsx" option.`,
    names: [name],
    url: getRollupUrl(URL_JSX)
  };
}
function logMissingNameOptionForIifeExport() {
  return {
    code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
    message: `If you do not supply "output.name", you may not be able to access the exports of an IIFE bundle.`,
    url: getRollupUrl(URL_OUTPUT_NAME)
  };
}
function logMissingNameOptionForUmdExport() {
  return {
    code: MISSING_NAME_OPTION_FOR_IIFE_EXPORT,
    message: 'You must supply "output.name" for UMD bundles that have exports so that the exports are accessible in environments without a module loader.',
    url: getRollupUrl(URL_OUTPUT_NAME)
  };
}
function logMissingNodeBuiltins(externalBuiltins) {
  return {
    code: MISSING_NODE_BUILTINS,
    ids: externalBuiltins,
    message: `Creating a browser bundle that depends on Node.js built-in modules (${printQuotedStringList(externalBuiltins)}). You might need to include https://github.com/FredKSchott/rollup-plugin-polyfill-node`
  };
}
function logMissingFileOrDirOption() {
  return {
    code: MISSING_OPTION,
    message: 'You must specify "output.file" or "output.dir" for the build.',
    url: getRollupUrl(URL_OUTPUT_DIR)
  };
}
function logMixedExport(facadeModuleId, name) {
  return {
    code: MIXED_EXPORTS,
    id: facadeModuleId,
    message: `Entry module "${relativeId(facadeModuleId)}" is using named and default exports together. Consumers of your bundle will have to use \`${name || "chunk"}.default\` to access the default export, which may not be what you want. Use \`output.exports: "named"\` to disable this warning.`,
    url: getRollupUrl(URL_OUTPUT_EXPORTS)
  };
}
function logModuleLevelDirective(directive2, id) {
  return {
    code: MODULE_LEVEL_DIRECTIVE,
    id,
    message: `Module level directives cause errors when bundled, "${directive2}" in "${relativeId(id)}" was ignored.`
  };
}
function logNamespaceConflict(binding, reexportingModuleId, sources) {
  return {
    binding,
    code: NAMESPACE_CONFLICT,
    ids: sources,
    message: `Conflicting namespaces: "${relativeId(reexportingModuleId)}" re-exports "${binding}" from one of the modules ${printQuotedStringList(sources.map((moduleId) => relativeId(moduleId)))} (will be ignored).`,
    reexporter: reexportingModuleId
  };
}
function logNoTransformMapOrAstWithoutCode(pluginName) {
  return {
    code: NO_TRANSFORM_MAP_OR_AST_WITHOUT_CODE,
    message: `The plugin "${pluginName}" returned a "map" or "ast" without returning a "code". This will be ignored.`
  };
}
function logOptimizeChunkStatus(chunks, smallChunks, pointInTime) {
  return {
    code: OPTIMIZE_CHUNK_STATUS,
    message: `${pointInTime}, there are
${chunks} chunks, of which
${smallChunks} are below minChunkSize.`
  };
}
function logParseError(message, pos) {
  return { code: PARSE_ERROR, message, pos };
}
function logRedeclarationError(name) {
  return {
    code: REDECLARATION_ERROR,
    message: `Identifier "${name}" has already been declared`
  };
}
function logReservedNamespace(namespace) {
  return {
    code: RESERVED_NAMESPACE,
    message: `You have overided reserved namespace "${namespace}"`
  };
}
function logModuleParseError(error2, moduleId) {
  let message = error2.message.replace(/ \(\d+:\d+\)$/, "");
  if (moduleId.endsWith(".json")) {
    message += " (Note that you need @rollup/plugin-json to import JSON files)";
  } else if (!moduleId.endsWith(".js")) {
    message += " (Note that you need plugins to import files that are not JavaScript)";
  }
  return tweakStackMessage({
    cause: error2,
    code: PARSE_ERROR,
    id: moduleId,
    message,
    stack: error2.stack
  }, error2.message);
}
function logPluginError(error2, plugin, { hook, id } = {}) {
  const code = error2.code;
  if (!error2.pluginCode && code != null && (typeof code !== "string" || !code.startsWith("PLUGIN_"))) {
    error2.pluginCode = code;
  }
  error2.code = PLUGIN_ERROR;
  error2.plugin = plugin;
  if (hook) {
    error2.hook = hook;
  }
  if (id) {
    error2.id = id;
  }
  return error2;
}
function logShimmedExport(id, binding) {
  return {
    binding,
    code: SHIMMED_EXPORT,
    exporter: id,
    message: `Missing export "${binding}" has been shimmed in module "${relativeId(id)}".`
  };
}
function logSourcemapBroken(plugin) {
  return {
    code: SOURCEMAP_BROKEN,
    message: `Sourcemap is likely to be incorrect: a plugin (${plugin}) was used to transform files, but didn't generate a sourcemap for the transformation. Consult the plugin documentation for help`,
    plugin,
    url: getRollupUrl(URL_SOURCEMAP_IS_LIKELY_TO_BE_INCORRECT)
  };
}
function logConflictingSourcemapSources(filename) {
  return {
    code: SOURCEMAP_BROKEN,
    message: `Multiple conflicting contents for sourcemap source ${filename}`
  };
}
function logInvalidSourcemapForError(error2, id, column, line, pos) {
  return {
    cause: error2,
    code: SOURCEMAP_ERROR,
    id,
    loc: {
      column,
      file: id,
      line
    },
    message: `Error when using sourcemap for reporting an error: ${error2.message}`,
    pos
  };
}
function logSyntheticNamedExportsNeedNamespaceExport(id, syntheticNamedExportsOption) {
  return {
    code: SYNTHETIC_NAMED_EXPORTS_NEED_NAMESPACE_EXPORT,
    exporter: id,
    message: `Module "${relativeId(id)}" that is marked with \`syntheticNamedExports: ${JSON.stringify(syntheticNamedExportsOption)}\` needs ${typeof syntheticNamedExportsOption === "string" && syntheticNamedExportsOption !== "default" ? `an explicit export named "${syntheticNamedExportsOption}"` : "a default export"} that does not reexport an unresolved named export of the same module.`
  };
}
function logThisIsUndefined() {
  return {
    code: THIS_IS_UNDEFINED,
    message: `The 'this' keyword is equivalent to 'undefined' at the top level of an ES module, and has been rewritten`,
    url: getRollupUrl(URL_THIS_IS_UNDEFINED)
  };
}
function logUnexpectedNamedImport(id, imported, isReexport) {
  const importType = isReexport ? "reexport" : "import";
  return {
    code: UNEXPECTED_NAMED_IMPORT,
    exporter: id,
    message: `The named export "${imported}" was ${importType}ed from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". Either remove or change this ${importType} or change the value of the "output.interop" option.`,
    url: getRollupUrl(URL_OUTPUT_INTEROP)
  };
}
function logUnexpectedNamespaceReexport(id) {
  return {
    code: UNEXPECTED_NAMED_IMPORT,
    exporter: id,
    message: `There was a namespace "*" reexport from the external module "${relativeId(id)}" even though its interop type is "defaultOnly". This will be ignored as namespace reexports only reexport named exports. If this is not intended, either remove or change this reexport or change the value of the "output.interop" option.`,
    url: getRollupUrl(URL_OUTPUT_INTEROP)
  };
}
function logUnknownOption(optionType, unknownOptions, validOptions) {
  return {
    code: UNKNOWN_OPTION,
    message: `Unknown ${optionType}: ${unknownOptions.join(", ")}. Allowed options: ${validOptions.join(", ")}`
  };
}
function logEntryCannotBeExternal(unresolvedId) {
  return {
    code: UNRESOLVED_ENTRY,
    message: `Entry module "${relativeId(unresolvedId)}" cannot be external.`
  };
}
function logExternalModulesCannotBeIncludedInManualChunks(source) {
  return {
    code: EXTERNAL_MODULES_CANNOT_BE_INCLUDED_IN_MANUAL_CHUNKS,
    message: `"${source}" cannot be included in manualChunks because it is resolved as an external module by the "external" option or plugins.`
  };
}
function logExternalModulesCannotBeTransformedToModules(source) {
  return {
    code: EXTERNAL_MODULES_CANNOT_BE_TRANSFORMED_TO_MODULES,
    message: `${source} is resolved as a module now, but it was an external module before. Please check whether there are conflicts in your Rollup options "external" and "manualChunks", manualChunks cannot include external modules.`
  };
}
function logUnresolvedEntry(unresolvedId) {
  return {
    code: UNRESOLVED_ENTRY,
    message: `Could not resolve entry module "${relativeId(unresolvedId)}".`
  };
}
function logUnresolvedImport(source, importer) {
  return {
    code: UNRESOLVED_IMPORT,
    exporter: source,
    id: importer,
    message: `Could not resolve "${source}" from "${relativeId(importer)}"`
  };
}
function logUnresolvedImportTreatedAsExternal(source, importer) {
  return {
    code: UNRESOLVED_IMPORT,
    exporter: source,
    id: importer,
    message: `"${source}" is imported by "${relativeId(importer)}", but could not be resolved – treating it as an external dependency.`,
    url: getRollupUrl(URL_TREATING_MODULE_AS_EXTERNAL_DEPENDENCY)
  };
}
function logUnusedExternalImports(externalId, names, importers) {
  return {
    code: UNUSED_EXTERNAL_IMPORT,
    exporter: externalId,
    ids: importers,
    message: `${printQuotedStringList(names, [
      "is",
      "are"
    ])} imported from external module "${externalId}" but never used in ${printQuotedStringList(importers.map((importer) => relativeId(importer)))}.`,
    names
  };
}
function logFailedValidation(message) {
  return {
    code: VALIDATION_ERROR,
    message
  };
}
function warnDeprecation(deprecation, urlSnippet, activeDeprecation, options, plugin) {
  warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, options.onLog, options.strictDeprecations);
}
function warnDeprecationWithOptions(deprecation, urlSnippet, activeDeprecation, log, strictDeprecations, plugin) {
  if (activeDeprecation || strictDeprecations) {
    const warning = logDeprecation(deprecation, urlSnippet);
    if (strictDeprecations) {
      return error(warning);
    }
    log(LOGLEVEL_WARN, warning);
  }
}
function convertProgram(buffer) {
  const node = convertNode(0, buffer);
  switch (node.type) {
    case PanicError: {
      return error(getRollupError(logParseError(node.message)));
    }
    case ParseError: {
      return error(getRollupError(logParseError(node.message, node.start)));
    }
    default: {
      return node;
    }
  }
}
var nodeConverters = [
  function panicError(position, buffer) {
    return {
      type: "PanicError",
      start: buffer[position],
      end: buffer[position + 1],
      message: buffer.convertString(buffer[position + 2])
    };
  },
  function parseError(position, buffer) {
    return {
      type: "ParseError",
      start: buffer[position],
      end: buffer[position + 1],
      message: buffer.convertString(buffer[position + 2])
    };
  },
  function arrayExpression(position, buffer) {
    return {
      type: "ArrayExpression",
      start: buffer[position],
      end: buffer[position + 1],
      elements: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function arrayPattern(position, buffer) {
    return {
      type: "ArrayPattern",
      start: buffer[position],
      end: buffer[position + 1],
      elements: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function arrowFunctionExpression(position, buffer) {
    const flags = buffer[position + 2];
    const annotations = convertAnnotations(buffer[position + 3], buffer);
    return {
      type: "ArrowFunctionExpression",
      start: buffer[position],
      end: buffer[position + 1],
      async: (flags & 1) === 1,
      expression: (flags & 2) === 2,
      generator: (flags & 4) === 4,
      ...annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {},
      params: convertNodeList(buffer[position + 4], buffer),
      body: convertNode(buffer[position + 5], buffer),
      id: null
    };
  },
  function assignmentExpression(position, buffer) {
    return {
      type: "AssignmentExpression",
      start: buffer[position],
      end: buffer[position + 1],
      operator: FIXED_STRINGS[buffer[position + 2]],
      left: convertNode(buffer[position + 3], buffer),
      right: convertNode(buffer[position + 4], buffer)
    };
  },
  function assignmentPattern(position, buffer) {
    return {
      type: "AssignmentPattern",
      start: buffer[position],
      end: buffer[position + 1],
      left: convertNode(buffer[position + 2], buffer),
      right: convertNode(buffer[position + 3], buffer)
    };
  },
  function awaitExpression(position, buffer) {
    return {
      type: "AwaitExpression",
      start: buffer[position],
      end: buffer[position + 1],
      argument: convertNode(buffer[position + 2], buffer)
    };
  },
  function binaryExpression(position, buffer) {
    return {
      type: "BinaryExpression",
      start: buffer[position],
      end: buffer[position + 1],
      operator: FIXED_STRINGS[buffer[position + 2]],
      left: convertNode(buffer[position + 3], buffer),
      right: convertNode(buffer[position + 4], buffer)
    };
  },
  function blockStatement(position, buffer) {
    return {
      type: "BlockStatement",
      start: buffer[position],
      end: buffer[position + 1],
      body: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function breakStatement(position, buffer) {
    const labelPosition = buffer[position + 2];
    return {
      type: "BreakStatement",
      start: buffer[position],
      end: buffer[position + 1],
      label: labelPosition === 0 ? null : convertNode(labelPosition, buffer)
    };
  },
  function callExpression(position, buffer) {
    const flags = buffer[position + 2];
    const annotations = convertAnnotations(buffer[position + 3], buffer);
    return {
      type: "CallExpression",
      start: buffer[position],
      end: buffer[position + 1],
      optional: (flags & 1) === 1,
      ...annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {},
      callee: convertNode(buffer[position + 4], buffer),
      arguments: convertNodeList(buffer[position + 5], buffer)
    };
  },
  function catchClause(position, buffer) {
    const parameterPosition = buffer[position + 2];
    return {
      type: "CatchClause",
      start: buffer[position],
      end: buffer[position + 1],
      param: parameterPosition === 0 ? null : convertNode(parameterPosition, buffer),
      body: convertNode(buffer[position + 3], buffer)
    };
  },
  function chainExpression(position, buffer) {
    return {
      type: "ChainExpression",
      start: buffer[position],
      end: buffer[position + 1],
      expression: convertNode(buffer[position + 2], buffer)
    };
  },
  function classBody(position, buffer) {
    return {
      type: "ClassBody",
      start: buffer[position],
      end: buffer[position + 1],
      body: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function classDeclaration(position, buffer) {
    const idPosition = buffer[position + 3];
    const superClassPosition = buffer[position + 4];
    return {
      type: "ClassDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      decorators: convertNodeList(buffer[position + 2], buffer),
      id: idPosition === 0 ? null : convertNode(idPosition, buffer),
      superClass: superClassPosition === 0 ? null : convertNode(superClassPosition, buffer),
      body: convertNode(buffer[position + 5], buffer)
    };
  },
  function classExpression(position, buffer) {
    const idPosition = buffer[position + 3];
    const superClassPosition = buffer[position + 4];
    return {
      type: "ClassExpression",
      start: buffer[position],
      end: buffer[position + 1],
      decorators: convertNodeList(buffer[position + 2], buffer),
      id: idPosition === 0 ? null : convertNode(idPosition, buffer),
      superClass: superClassPosition === 0 ? null : convertNode(superClassPosition, buffer),
      body: convertNode(buffer[position + 5], buffer)
    };
  },
  function conditionalExpression(position, buffer) {
    return {
      type: "ConditionalExpression",
      start: buffer[position],
      end: buffer[position + 1],
      test: convertNode(buffer[position + 2], buffer),
      consequent: convertNode(buffer[position + 3], buffer),
      alternate: convertNode(buffer[position + 4], buffer)
    };
  },
  function continueStatement(position, buffer) {
    const labelPosition = buffer[position + 2];
    return {
      type: "ContinueStatement",
      start: buffer[position],
      end: buffer[position + 1],
      label: labelPosition === 0 ? null : convertNode(labelPosition, buffer)
    };
  },
  function debuggerStatement(position, buffer) {
    return {
      type: "DebuggerStatement",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function decorator(position, buffer) {
    return {
      type: "Decorator",
      start: buffer[position],
      end: buffer[position + 1],
      expression: convertNode(buffer[position + 2], buffer)
    };
  },
  function directive(position, buffer) {
    return {
      type: "ExpressionStatement",
      start: buffer[position],
      end: buffer[position + 1],
      directive: buffer.convertString(buffer[position + 2]),
      expression: convertNode(buffer[position + 3], buffer)
    };
  },
  function doWhileStatement(position, buffer) {
    return {
      type: "DoWhileStatement",
      start: buffer[position],
      end: buffer[position + 1],
      body: convertNode(buffer[position + 2], buffer),
      test: convertNode(buffer[position + 3], buffer)
    };
  },
  function emptyStatement(position, buffer) {
    return {
      type: "EmptyStatement",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function exportAllDeclaration(position, buffer) {
    const exportedPosition = buffer[position + 2];
    return {
      type: "ExportAllDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      exported: exportedPosition === 0 ? null : convertNode(exportedPosition, buffer),
      source: convertNode(buffer[position + 3], buffer),
      attributes: convertNodeList(buffer[position + 4], buffer)
    };
  },
  function exportDefaultDeclaration(position, buffer) {
    return {
      type: "ExportDefaultDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      declaration: convertNode(buffer[position + 2], buffer)
    };
  },
  function exportNamedDeclaration(position, buffer) {
    const sourcePosition = buffer[position + 3];
    const declarationPosition = buffer[position + 5];
    return {
      type: "ExportNamedDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      specifiers: convertNodeList(buffer[position + 2], buffer),
      source: sourcePosition === 0 ? null : convertNode(sourcePosition, buffer),
      attributes: convertNodeList(buffer[position + 4], buffer),
      declaration: declarationPosition === 0 ? null : convertNode(declarationPosition, buffer)
    };
  },
  function exportSpecifier(position, buffer) {
    const local = convertNode(buffer[position + 2], buffer);
    const exportedPosition = buffer[position + 3];
    return {
      type: "ExportSpecifier",
      start: buffer[position],
      end: buffer[position + 1],
      local,
      exported: exportedPosition === 0 ? { ...local } : convertNode(exportedPosition, buffer)
    };
  },
  function expressionStatement(position, buffer) {
    return {
      type: "ExpressionStatement",
      start: buffer[position],
      end: buffer[position + 1],
      expression: convertNode(buffer[position + 2], buffer)
    };
  },
  function forInStatement(position, buffer) {
    return {
      type: "ForInStatement",
      start: buffer[position],
      end: buffer[position + 1],
      left: convertNode(buffer[position + 2], buffer),
      right: convertNode(buffer[position + 3], buffer),
      body: convertNode(buffer[position + 4], buffer)
    };
  },
  function forOfStatement(position, buffer) {
    const flags = buffer[position + 2];
    return {
      type: "ForOfStatement",
      start: buffer[position],
      end: buffer[position + 1],
      await: (flags & 1) === 1,
      left: convertNode(buffer[position + 3], buffer),
      right: convertNode(buffer[position + 4], buffer),
      body: convertNode(buffer[position + 5], buffer)
    };
  },
  function forStatement(position, buffer) {
    const initPosition = buffer[position + 2];
    const testPosition = buffer[position + 3];
    const updatePosition = buffer[position + 4];
    return {
      type: "ForStatement",
      start: buffer[position],
      end: buffer[position + 1],
      init: initPosition === 0 ? null : convertNode(initPosition, buffer),
      test: testPosition === 0 ? null : convertNode(testPosition, buffer),
      update: updatePosition === 0 ? null : convertNode(updatePosition, buffer),
      body: convertNode(buffer[position + 5], buffer)
    };
  },
  function functionDeclaration(position, buffer) {
    const flags = buffer[position + 2];
    const annotations = convertAnnotations(buffer[position + 3], buffer);
    const idPosition = buffer[position + 4];
    return {
      type: "FunctionDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      async: (flags & 1) === 1,
      generator: (flags & 2) === 2,
      ...annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {},
      id: idPosition === 0 ? null : convertNode(idPosition, buffer),
      params: convertNodeList(buffer[position + 5], buffer),
      body: convertNode(buffer[position + 6], buffer),
      expression: false
    };
  },
  function functionExpression(position, buffer) {
    const flags = buffer[position + 2];
    const annotations = convertAnnotations(buffer[position + 3], buffer);
    const idPosition = buffer[position + 4];
    return {
      type: "FunctionExpression",
      start: buffer[position],
      end: buffer[position + 1],
      async: (flags & 1) === 1,
      generator: (flags & 2) === 2,
      ...annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {},
      id: idPosition === 0 ? null : convertNode(idPosition, buffer),
      params: convertNodeList(buffer[position + 5], buffer),
      body: convertNode(buffer[position + 6], buffer),
      expression: false
    };
  },
  function identifier(position, buffer) {
    return {
      type: "Identifier",
      start: buffer[position],
      end: buffer[position + 1],
      name: buffer.convertString(buffer[position + 2])
    };
  },
  function ifStatement(position, buffer) {
    const alternatePosition = buffer[position + 4];
    return {
      type: "IfStatement",
      start: buffer[position],
      end: buffer[position + 1],
      test: convertNode(buffer[position + 2], buffer),
      consequent: convertNode(buffer[position + 3], buffer),
      alternate: alternatePosition === 0 ? null : convertNode(alternatePosition, buffer)
    };
  },
  function importAttribute(position, buffer) {
    return {
      type: "ImportAttribute",
      start: buffer[position],
      end: buffer[position + 1],
      key: convertNode(buffer[position + 2], buffer),
      value: convertNode(buffer[position + 3], buffer)
    };
  },
  function importDeclaration(position, buffer) {
    return {
      type: "ImportDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      specifiers: convertNodeList(buffer[position + 2], buffer),
      source: convertNode(buffer[position + 3], buffer),
      attributes: convertNodeList(buffer[position + 4], buffer)
    };
  },
  function importDefaultSpecifier(position, buffer) {
    return {
      type: "ImportDefaultSpecifier",
      start: buffer[position],
      end: buffer[position + 1],
      local: convertNode(buffer[position + 2], buffer)
    };
  },
  function importExpression(position, buffer) {
    const optionsPosition = buffer[position + 3];
    return {
      type: "ImportExpression",
      start: buffer[position],
      end: buffer[position + 1],
      source: convertNode(buffer[position + 2], buffer),
      options: optionsPosition === 0 ? null : convertNode(optionsPosition, buffer)
    };
  },
  function importNamespaceSpecifier(position, buffer) {
    return {
      type: "ImportNamespaceSpecifier",
      start: buffer[position],
      end: buffer[position + 1],
      local: convertNode(buffer[position + 2], buffer)
    };
  },
  function importSpecifier(position, buffer) {
    const importedPosition = buffer[position + 2];
    const local = convertNode(buffer[position + 3], buffer);
    return {
      type: "ImportSpecifier",
      start: buffer[position],
      end: buffer[position + 1],
      imported: importedPosition === 0 ? { ...local } : convertNode(importedPosition, buffer),
      local
    };
  },
  function jsxAttribute(position, buffer) {
    const valuePosition = buffer[position + 3];
    return {
      type: "JSXAttribute",
      start: buffer[position],
      end: buffer[position + 1],
      name: convertNode(buffer[position + 2], buffer),
      value: valuePosition === 0 ? null : convertNode(valuePosition, buffer)
    };
  },
  function jsxClosingElement(position, buffer) {
    return {
      type: "JSXClosingElement",
      start: buffer[position],
      end: buffer[position + 1],
      name: convertNode(buffer[position + 2], buffer)
    };
  },
  function jsxClosingFragment(position, buffer) {
    return {
      type: "JSXClosingFragment",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function jsxElement(position, buffer) {
    const closingElementPosition = buffer[position + 4];
    return {
      type: "JSXElement",
      start: buffer[position],
      end: buffer[position + 1],
      openingElement: convertNode(buffer[position + 2], buffer),
      children: convertNodeList(buffer[position + 3], buffer),
      closingElement: closingElementPosition === 0 ? null : convertNode(closingElementPosition, buffer)
    };
  },
  function jsxEmptyExpression(position, buffer) {
    return {
      type: "JSXEmptyExpression",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function jsxExpressionContainer(position, buffer) {
    return {
      type: "JSXExpressionContainer",
      start: buffer[position],
      end: buffer[position + 1],
      expression: convertNode(buffer[position + 2], buffer)
    };
  },
  function jsxFragment(position, buffer) {
    return {
      type: "JSXFragment",
      start: buffer[position],
      end: buffer[position + 1],
      openingFragment: convertNode(buffer[position + 2], buffer),
      children: convertNodeList(buffer[position + 3], buffer),
      closingFragment: convertNode(buffer[position + 4], buffer)
    };
  },
  function jsxIdentifier(position, buffer) {
    return {
      type: "JSXIdentifier",
      start: buffer[position],
      end: buffer[position + 1],
      name: buffer.convertString(buffer[position + 2])
    };
  },
  function jsxMemberExpression(position, buffer) {
    return {
      type: "JSXMemberExpression",
      start: buffer[position],
      end: buffer[position + 1],
      object: convertNode(buffer[position + 2], buffer),
      property: convertNode(buffer[position + 3], buffer)
    };
  },
  function jsxNamespacedName(position, buffer) {
    return {
      type: "JSXNamespacedName",
      start: buffer[position],
      end: buffer[position + 1],
      namespace: convertNode(buffer[position + 2], buffer),
      name: convertNode(buffer[position + 3], buffer)
    };
  },
  function jsxOpeningElement(position, buffer) {
    const flags = buffer[position + 2];
    return {
      type: "JSXOpeningElement",
      start: buffer[position],
      end: buffer[position + 1],
      selfClosing: (flags & 1) === 1,
      name: convertNode(buffer[position + 3], buffer),
      attributes: convertNodeList(buffer[position + 4], buffer)
    };
  },
  function jsxOpeningFragment(position, buffer) {
    return {
      type: "JSXOpeningFragment",
      start: buffer[position],
      end: buffer[position + 1],
      attributes: [],
      selfClosing: false
    };
  },
  function jsxSpreadAttribute(position, buffer) {
    return {
      type: "JSXSpreadAttribute",
      start: buffer[position],
      end: buffer[position + 1],
      argument: convertNode(buffer[position + 2], buffer)
    };
  },
  function jsxSpreadChild(position, buffer) {
    return {
      type: "JSXSpreadChild",
      start: buffer[position],
      end: buffer[position + 1],
      expression: convertNode(buffer[position + 2], buffer)
    };
  },
  function jsxText(position, buffer) {
    return {
      type: "JSXText",
      start: buffer[position],
      end: buffer[position + 1],
      value: buffer.convertString(buffer[position + 2]),
      raw: buffer.convertString(buffer[position + 3])
    };
  },
  function labeledStatement(position, buffer) {
    return {
      type: "LabeledStatement",
      start: buffer[position],
      end: buffer[position + 1],
      label: convertNode(buffer[position + 2], buffer),
      body: convertNode(buffer[position + 3], buffer)
    };
  },
  function literalBigInt(position, buffer) {
    const bigint = buffer.convertString(buffer[position + 2]);
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      bigint,
      raw: buffer.convertString(buffer[position + 3]),
      value: BigInt(bigint)
    };
  },
  function literalBoolean(position, buffer) {
    const flags = buffer[position + 2];
    const value = (flags & 1) === 1;
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      value,
      raw: value ? "true" : "false"
    };
  },
  function literalNull(position, buffer) {
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      raw: "null",
      value: null
    };
  },
  function literalNumber(position, buffer) {
    const rawPosition = buffer[position + 2];
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      raw: rawPosition === 0 ? void 0 : buffer.convertString(rawPosition),
      value: new DataView(buffer.buffer).getFloat64(position + 3 << 2, true)
    };
  },
  function literalRegExp(position, buffer) {
    const flags = buffer.convertString(buffer[position + 2]);
    const pattern = buffer.convertString(buffer[position + 3]);
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      raw: `/${pattern}/${flags}`,
      regex: { flags, pattern },
      value: new RegExp(pattern, flags)
    };
  },
  function literalString(position, buffer) {
    const rawPosition = buffer[position + 3];
    return {
      type: "Literal",
      start: buffer[position],
      end: buffer[position + 1],
      value: buffer.convertString(buffer[position + 2]),
      raw: rawPosition === 0 ? void 0 : buffer.convertString(rawPosition)
    };
  },
  function logicalExpression(position, buffer) {
    return {
      type: "LogicalExpression",
      start: buffer[position],
      end: buffer[position + 1],
      operator: FIXED_STRINGS[buffer[position + 2]],
      left: convertNode(buffer[position + 3], buffer),
      right: convertNode(buffer[position + 4], buffer)
    };
  },
  function memberExpression(position, buffer) {
    const flags = buffer[position + 2];
    return {
      type: "MemberExpression",
      start: buffer[position],
      end: buffer[position + 1],
      computed: (flags & 1) === 1,
      optional: (flags & 2) === 2,
      object: convertNode(buffer[position + 3], buffer),
      property: convertNode(buffer[position + 4], buffer)
    };
  },
  function metaProperty(position, buffer) {
    return {
      type: "MetaProperty",
      start: buffer[position],
      end: buffer[position + 1],
      meta: convertNode(buffer[position + 2], buffer),
      property: convertNode(buffer[position + 3], buffer)
    };
  },
  function methodDefinition(position, buffer) {
    const flags = buffer[position + 2];
    return {
      type: "MethodDefinition",
      start: buffer[position],
      end: buffer[position + 1],
      static: (flags & 1) === 1,
      computed: (flags & 2) === 2,
      decorators: convertNodeList(buffer[position + 3], buffer),
      key: convertNode(buffer[position + 4], buffer),
      value: convertNode(buffer[position + 5], buffer),
      kind: FIXED_STRINGS[buffer[position + 6]]
    };
  },
  function newExpression(position, buffer) {
    const annotations = convertAnnotations(buffer[position + 2], buffer);
    return {
      type: "NewExpression",
      start: buffer[position],
      end: buffer[position + 1],
      ...annotations.length > 0 ? { [ANNOTATION_KEY]: annotations } : {},
      callee: convertNode(buffer[position + 3], buffer),
      arguments: convertNodeList(buffer[position + 4], buffer)
    };
  },
  function objectExpression(position, buffer) {
    return {
      type: "ObjectExpression",
      start: buffer[position],
      end: buffer[position + 1],
      properties: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function objectPattern(position, buffer) {
    return {
      type: "ObjectPattern",
      start: buffer[position],
      end: buffer[position + 1],
      properties: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function privateIdentifier(position, buffer) {
    return {
      type: "PrivateIdentifier",
      start: buffer[position],
      end: buffer[position + 1],
      name: buffer.convertString(buffer[position + 2])
    };
  },
  function program(position, buffer) {
    const invalidAnnotations = convertAnnotations(buffer[position + 3], buffer);
    return {
      type: "Program",
      start: buffer[position],
      end: buffer[position + 1],
      body: convertNodeList(buffer[position + 2], buffer),
      ...invalidAnnotations.length > 0 ? { [INVALID_ANNOTATION_KEY]: invalidAnnotations } : {},
      sourceType: "module"
    };
  },
  function property(position, buffer) {
    const flags = buffer[position + 2];
    const keyPosition = buffer[position + 3];
    const value = convertNode(buffer[position + 4], buffer);
    return {
      type: "Property",
      start: buffer[position],
      end: buffer[position + 1],
      method: (flags & 1) === 1,
      shorthand: (flags & 2) === 2,
      computed: (flags & 4) === 4,
      key: keyPosition === 0 ? { ...value } : convertNode(keyPosition, buffer),
      value,
      kind: FIXED_STRINGS[buffer[position + 5]]
    };
  },
  function propertyDefinition(position, buffer) {
    const flags = buffer[position + 2];
    const valuePosition = buffer[position + 5];
    return {
      type: "PropertyDefinition",
      start: buffer[position],
      end: buffer[position + 1],
      static: (flags & 1) === 1,
      computed: (flags & 2) === 2,
      decorators: convertNodeList(buffer[position + 3], buffer),
      key: convertNode(buffer[position + 4], buffer),
      value: valuePosition === 0 ? null : convertNode(valuePosition, buffer)
    };
  },
  function restElement(position, buffer) {
    return {
      type: "RestElement",
      start: buffer[position],
      end: buffer[position + 1],
      argument: convertNode(buffer[position + 2], buffer)
    };
  },
  function returnStatement(position, buffer) {
    const argumentPosition = buffer[position + 2];
    return {
      type: "ReturnStatement",
      start: buffer[position],
      end: buffer[position + 1],
      argument: argumentPosition === 0 ? null : convertNode(argumentPosition, buffer)
    };
  },
  function sequenceExpression(position, buffer) {
    return {
      type: "SequenceExpression",
      start: buffer[position],
      end: buffer[position + 1],
      expressions: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function spreadElement(position, buffer) {
    return {
      type: "SpreadElement",
      start: buffer[position],
      end: buffer[position + 1],
      argument: convertNode(buffer[position + 2], buffer)
    };
  },
  function staticBlock(position, buffer) {
    return {
      type: "StaticBlock",
      start: buffer[position],
      end: buffer[position + 1],
      body: convertNodeList(buffer[position + 2], buffer)
    };
  },
  function superElement(position, buffer) {
    return {
      type: "Super",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function switchCase(position, buffer) {
    const testPosition = buffer[position + 2];
    return {
      type: "SwitchCase",
      start: buffer[position],
      end: buffer[position + 1],
      test: testPosition === 0 ? null : convertNode(testPosition, buffer),
      consequent: convertNodeList(buffer[position + 3], buffer)
    };
  },
  function switchStatement(position, buffer) {
    return {
      type: "SwitchStatement",
      start: buffer[position],
      end: buffer[position + 1],
      discriminant: convertNode(buffer[position + 2], buffer),
      cases: convertNodeList(buffer[position + 3], buffer)
    };
  },
  function taggedTemplateExpression(position, buffer) {
    return {
      type: "TaggedTemplateExpression",
      start: buffer[position],
      end: buffer[position + 1],
      tag: convertNode(buffer[position + 2], buffer),
      quasi: convertNode(buffer[position + 3], buffer)
    };
  },
  function templateElement(position, buffer) {
    const flags = buffer[position + 2];
    const cookedPosition = buffer[position + 3];
    const cooked = cookedPosition === 0 ? void 0 : buffer.convertString(cookedPosition);
    const raw = buffer.convertString(buffer[position + 4]);
    return {
      type: "TemplateElement",
      start: buffer[position],
      end: buffer[position + 1],
      tail: (flags & 1) === 1,
      value: { cooked, raw }
    };
  },
  function templateLiteral(position, buffer) {
    return {
      type: "TemplateLiteral",
      start: buffer[position],
      end: buffer[position + 1],
      quasis: convertNodeList(buffer[position + 2], buffer),
      expressions: convertNodeList(buffer[position + 3], buffer)
    };
  },
  function thisExpression(position, buffer) {
    return {
      type: "ThisExpression",
      start: buffer[position],
      end: buffer[position + 1]
    };
  },
  function throwStatement(position, buffer) {
    return {
      type: "ThrowStatement",
      start: buffer[position],
      end: buffer[position + 1],
      argument: convertNode(buffer[position + 2], buffer)
    };
  },
  function tryStatement(position, buffer) {
    const handlerPosition = buffer[position + 3];
    const finalizerPosition = buffer[position + 4];
    return {
      type: "TryStatement",
      start: buffer[position],
      end: buffer[position + 1],
      block: convertNode(buffer[position + 2], buffer),
      handler: handlerPosition === 0 ? null : convertNode(handlerPosition, buffer),
      finalizer: finalizerPosition === 0 ? null : convertNode(finalizerPosition, buffer)
    };
  },
  function unaryExpression(position, buffer) {
    return {
      type: "UnaryExpression",
      start: buffer[position],
      end: buffer[position + 1],
      operator: FIXED_STRINGS[buffer[position + 2]],
      argument: convertNode(buffer[position + 3], buffer),
      prefix: true
    };
  },
  function updateExpression(position, buffer) {
    const flags = buffer[position + 2];
    return {
      type: "UpdateExpression",
      start: buffer[position],
      end: buffer[position + 1],
      prefix: (flags & 1) === 1,
      operator: FIXED_STRINGS[buffer[position + 3]],
      argument: convertNode(buffer[position + 4], buffer)
    };
  },
  function variableDeclaration(position, buffer) {
    return {
      type: "VariableDeclaration",
      start: buffer[position],
      end: buffer[position + 1],
      kind: FIXED_STRINGS[buffer[position + 2]],
      declarations: convertNodeList(buffer[position + 3], buffer)
    };
  },
  function variableDeclarator(position, buffer) {
    const initPosition = buffer[position + 3];
    return {
      type: "VariableDeclarator",
      start: buffer[position],
      end: buffer[position + 1],
      id: convertNode(buffer[position + 2], buffer),
      init: initPosition === 0 ? null : convertNode(initPosition, buffer)
    };
  },
  function whileStatement(position, buffer) {
    return {
      type: "WhileStatement",
      start: buffer[position],
      end: buffer[position + 1],
      test: convertNode(buffer[position + 2], buffer),
      body: convertNode(buffer[position + 3], buffer)
    };
  },
  function yieldExpression(position, buffer) {
    const flags = buffer[position + 2];
    const argumentPosition = buffer[position + 3];
    return {
      type: "YieldExpression",
      start: buffer[position],
      end: buffer[position + 1],
      delegate: (flags & 1) === 1,
      argument: argumentPosition === 0 ? null : convertNode(argumentPosition, buffer)
    };
  }
];
function convertNode(position, buffer) {
  const nodeType = buffer[position];
  const converter = nodeConverters[nodeType];
  if (!converter) {
    console.trace();
    throw new Error(`Unknown node type: ${nodeType}`);
  }
  return converter(position + 1, buffer);
}
function convertNodeList(position, buffer) {
  if (position === 0)
    return EMPTY_ARRAY;
  const length = buffer[position++];
  const list = [];
  for (let index = 0; index < length; index++) {
    const nodePosition = buffer[position++];
    list.push(nodePosition ? convertNode(nodePosition, buffer) : null);
  }
  return list;
}
function getAstBuffer(astBuffer) {
  const array = new Uint32Array(astBuffer.buffer);
  let convertString;
  if (typeof Buffer !== "undefined" && astBuffer instanceof Buffer) {
    convertString = (position) => {
      const length = array[position++];
      const bytePosition = position << 2;
      return astBuffer.toString("utf8", bytePosition, bytePosition + length);
    };
  } else {
    const textDecoder = new TextDecoder();
    convertString = (position) => {
      const length = array[position++];
      const bytePosition = position << 2;
      return textDecoder.decode(astBuffer.subarray(bytePosition, bytePosition + length));
    };
  }
  return Object.assign(array, { convertString });
}
var parseAst = (input, { allowReturnOutsideFunction = false, jsx = false } = {}) => convertProgram(getAstBuffer((0, import_native.parse)(input, allowReturnOutsideFunction, jsx)));
var parseAstAsync = async (input, { allowReturnOutsideFunction = false, jsx = false, signal } = {}) => convertProgram(getAstBuffer(await (0, import_native.parseAsync)(input, allowReturnOutsideFunction, jsx, signal)));

export {
  require_node_fs,
  require_node_process,
  require_native,
  ArrowFunctionExpression,
  BlockStatement,
  CallExpression,
  CatchClause,
  ExportDefaultDeclaration,
  ExpressionStatement,
  Identifier,
  Literal,
  Program,
  Property,
  ReturnStatement,
  StaticBlock,
  TemplateLiteral,
  VariableDeclarator,
  BLANK,
  EMPTY_OBJECT,
  EMPTY_ARRAY,
  EMPTY_SET,
  FIXED_STRINGS,
  ANNOTATION_KEY,
  INVALID_ANNOTATION_KEY,
  convertAnnotations,
  locate,
  LOGLEVEL_ERROR,
  LOGLEVEL_WARN,
  LOGLEVEL_INFO,
  LOGLEVEL_DEBUG,
  logLevelPriority,
  isAbsolute,
  isRelative,
  normalize,
  printQuotedStringList,
  relative,
  getAliasName,
  relativeId,
  isPathFragment,
  getImportPath,
  isValidUrl,
  addTrailingSlashIfMissed,
  URL_JSX,
  URL_OUTPUT_AMD_ID,
  URL_OUTPUT_AMD_BASEPATH,
  URL_OUTPUT_DIR,
  URL_OUTPUT_EXTERNALIMPORTATTRIBUTES,
  URL_OUTPUT_FORMAT,
  URL_OUTPUT_GENERATEDCODE,
  URL_OUTPUT_INLINEDYNAMICIMPORTS,
  URL_OUTPUT_INTEROP,
  URL_OUTPUT_MANUALCHUNKS,
  URL_OUTPUT_SOURCEMAPBASEURL,
  URL_OUTPUT_SOURCEMAPFILE,
  URL_PRESERVEENTRYSIGNATURES,
  URL_TREESHAKE,
  URL_TREESHAKE_MODULESIDEEFFECTS,
  URL_WATCH,
  URL_GENERATEBUNDLE,
  error,
  getRollupError,
  augmentCodeLocation,
  augmentLogMessage,
  logAddonNotGenerated,
  logAlreadyClosed,
  logAmbiguousExternalNamespaces,
  logAnonymousPluginCache,
  logAssetNotFinalisedForFileName,
  logAssetReferenceIdNotFoundForSetSource,
  logAssetSourceAlreadySet,
  logNoAssetSourceSet,
  logBadLoader,
  logCannotCallNamespace,
  logCannotEmitFromOptionsHook,
  logChunkNotGeneratedForFileName,
  logChunkInvalid,
  logCircularDependency,
  logCircularReexport,
  logCyclicCrossChunkReexport,
  logConstVariableReassignError,
  logDuplicateArgumentNameError,
  logDuplicateExportError,
  logDuplicatePluginName,
  logEmptyChunk,
  logEval,
  logExternalSyntheticExports,
  logFileNameConflict,
  logFileReferenceIdNotFoundForFilename,
  logFirstSideEffect,
  logIllegalIdentifierAsName,
  logIllegalImportReassignment,
  logInconsistentImportAttributes,
  logInvalidAnnotation,
  logInputHookInOutputPlugin,
  logCannotAssignModuleToChunk,
  logInvalidExportOptionValue,
  logIncompatibleExportOptionValue,
  logInternalIdCannotBeExternal,
  logImportOptionsAreInvalid,
  logImportAttributeIsInvalid,
  logInvalidLogPosition,
  logInvalidOption,
  logInvalidAddonPluginHook,
  logInvalidFunctionPluginHook,
  logInvalidRollupPhaseForChunkEmission,
  logInvalidSetAssetSourceCall,
  logInvalidFormatForTopLevelAwait,
  logMissingEntryExport,
  logMissingExport,
  logMissingGlobalName,
  logImplicitDependantCannotBeExternal,
  logUnresolvedImplicitDependant,
  logImplicitDependantIsNotIncluded,
  logMissingJsxExport,
  logMissingNameOptionForIifeExport,
  logMissingNameOptionForUmdExport,
  logMissingNodeBuiltins,
  logMissingFileOrDirOption,
  logMixedExport,
  logModuleLevelDirective,
  logNamespaceConflict,
  logNoTransformMapOrAstWithoutCode,
  logOptimizeChunkStatus,
  logParseError,
  logRedeclarationError,
  logReservedNamespace,
  logModuleParseError,
  logPluginError,
  logShimmedExport,
  logSourcemapBroken,
  logConflictingSourcemapSources,
  logInvalidSourcemapForError,
  logSyntheticNamedExportsNeedNamespaceExport,
  logThisIsUndefined,
  logUnexpectedNamedImport,
  logUnexpectedNamespaceReexport,
  logUnknownOption,
  logEntryCannotBeExternal,
  logExternalModulesCannotBeIncludedInManualChunks,
  logExternalModulesCannotBeTransformedToModules,
  logUnresolvedEntry,
  logUnresolvedImport,
  logUnresolvedImportTreatedAsExternal,
  logUnusedExternalImports,
  logFailedValidation,
  warnDeprecation,
  convertNode,
  getAstBuffer,
  parseAst,
  parseAstAsync,
  require_promises,
  require_node_perf_hooks,
  require_tty
};
/*! Bundled license information:

rollup/dist/es/shared/parseAst.js:
  (*
    @license
  	Rollup.js v4.24.0
  	Wed, 02 Oct 2024 09:36:48 GMT - commit d3c000f4fd453e39a354299f0cfaa6831f56d7d8
  
  	https://github.com/rollup/rollup
  
  	Released under the MIT License.
  *)
*/
//# sourceMappingURL=chunk-RX7BTZZI.js.map
