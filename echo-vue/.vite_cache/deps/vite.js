import {
  VERSION,
  arraify,
  build,
  buildErrorMessage,
  createFilter,
  createLogger,
  createServer,
  defineConfig,
  fetchModule,
  formatPostcssSourceMap,
  isFileServingAllowed,
  isInNodeModules$1,
  loadConfigFromFile,
  loadEnv,
  mergeAlias,
  mergeConfig,
  normalizePath$3,
  optimizeDeps,
  preprocessCSS,
  preview,
  require_assert,
  require_buffer,
  require_child_process,
  require_crypto,
  require_http,
  require_https,
  require_main,
  require_module,
  require_net,
  require_node_assert,
  require_node_buffer,
  require_node_child_process,
  require_node_crypto,
  require_node_dns,
  require_node_events,
  require_node_readline,
  require_node_stream,
  require_node_string_decoder,
  require_node_util,
  require_node_v8,
  require_node_worker_threads,
  require_node_zlib,
  require_querystring,
  require_tls,
  require_zlib,
  resolveConfig,
  resolveEnvPrefix,
  rollupVersion,
  searchForWorkspaceRoot,
  send,
  sortUserPlugins,
  transformWithEsbuild
} from "./chunk-UGCJFHR6.js";
import {
  require_events,
  require_node_os,
  require_os,
  require_stream,
  require_util
} from "./chunk-KPGLAEFU.js";
import {
  parseAst,
  parseAstAsync,
  require_node_fs,
  require_node_perf_hooks,
  require_promises,
  require_tty
} from "./chunk-RX7BTZZI.js";
import {
  require_node_http
} from "./chunk-X45QO7DX.js";
import {
  require_node_https
} from "./chunk-OZBCPRVH.js";
import {
  require_node_module,
  require_node_url
} from "./chunk-G2ZEZZAJ.js";
import {
  require_node_path
} from "./chunk-M2MSWSHF.js";
import {
  require_url
} from "./chunk-MPVQUUHK.js";
import {
  require_fs
} from "./chunk-I5RSIQOR.js";
import {
  require_path
} from "./chunk-4XRL7ZXG.js";
import {
  __publicField,
  __toESM
} from "./chunk-ZSMWDLMK.js";

// node_modules/vite/dist/node/index.js
var import_esbuild = __toESM(require_main());
var import_node_fs = __toESM(require_node_fs());

// node_modules/vite/dist/node/runtime.js
var VALID_ID_PREFIX = "/@id/";
var NULL_BYTE_PLACEHOLDER = "__x00__";
var SOURCEMAPPING_URL = "sourceMa";
SOURCEMAPPING_URL += "ppingURL";
var isWindows = typeof process < "u" && process.platform === "win32";
function wrapId(id) {
  return id.startsWith(VALID_ID_PREFIX) ? id : VALID_ID_PREFIX + id.replace("\0", NULL_BYTE_PLACEHOLDER);
}
function unwrapId(id) {
  return id.startsWith(VALID_ID_PREFIX) ? id.slice(VALID_ID_PREFIX.length).replace(NULL_BYTE_PLACEHOLDER, "\0") : id;
}
var windowsSlashRE = /\\/g;
function slash(p) {
  return p.replace(windowsSlashRE, "/");
}
var postfixRE = /[?#].*$/;
function cleanUrl(url) {
  return url.replace(postfixRE, "");
}
function isPrimitive(value) {
  return !value || typeof value != "object" && typeof value != "function";
}
function withTrailingSlash(path) {
  return path[path.length - 1] !== "/" ? `${path}/` : path;
}
var AsyncFunction = (async function() {
}).constructor;
var _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  return input && input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
var _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
var _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  return typeof process < "u" && typeof process.cwd == "function" ? process.cwd().replace(/\\/g, "/") : "/";
}
var resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "", resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    !path || path.length === 0 || (resolvedPath = `${path}/${resolvedPath}`, resolvedAbsolute = isAbsolute(path));
  }
  return resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute), resolvedAbsolute && !isAbsolute(resolvedPath) ? `/${resolvedPath}` : resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "", lastSegmentLength = 0, lastSlash = -1, dots = 0, char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length)
      char = path[index];
    else {
      if (char === "/")
        break;
      char = "/";
    }
    if (char === "/") {
      if (!(lastSlash === index - 1 || dots === 1)) if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            lastSlashIndex === -1 ? (res = "", lastSegmentLength = 0) : (res = res.slice(0, lastSlashIndex), lastSegmentLength = res.length - 1 - res.lastIndexOf("/")), lastSlash = index, dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "", lastSegmentLength = 0, lastSlash = index, dots = 0;
            continue;
          }
        }
        allowAboveRoot && (res += res.length > 0 ? "/.." : "..", lastSegmentLength = 2);
      } else
        res.length > 0 ? res += `/${path.slice(lastSlash + 1, index)}` : res = path.slice(lastSlash + 1, index), lastSegmentLength = index - lastSlash - 1;
      lastSlash = index, dots = 0;
    } else char === "." && dots !== -1 ? ++dots : dots = -1;
  }
  return res;
}
var isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
var dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  return segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0]) && (segments[0] += "/"), segments.join("/") || (isAbsolute(p) ? "/" : ".");
};
var decodeBase64 = typeof atob < "u" ? atob : (str) => Buffer.from(str, "base64").toString("utf-8");
var CHAR_FORWARD_SLASH = 47;
var CHAR_BACKWARD_SLASH = 92;
var percentRegEx = /%/g;
var backslashRegEx = /\\/g;
var newlineRegEx = /\n/g;
var carriageReturnRegEx = /\r/g;
var tabRegEx = /\t/g;
var questionRegex = /\?/g;
var hashRegex = /#/g;
function encodePathChars(filepath) {
  return filepath.indexOf("%") !== -1 && (filepath = filepath.replace(percentRegEx, "%25")), !isWindows && filepath.indexOf("\\") !== -1 && (filepath = filepath.replace(backslashRegEx, "%5C")), filepath.indexOf(`
`) !== -1 && (filepath = filepath.replace(newlineRegEx, "%0A")), filepath.indexOf("\r") !== -1 && (filepath = filepath.replace(carriageReturnRegEx, "%0D")), filepath.indexOf("	") !== -1 && (filepath = filepath.replace(tabRegEx, "%09")), filepath;
}
var posixDirname = dirname;
var posixResolve = resolve;
function posixPathToFileHref(posixPath) {
  let resolved = posixResolve(posixPath);
  const filePathLast = posixPath.charCodeAt(posixPath.length - 1);
  return (filePathLast === CHAR_FORWARD_SLASH || isWindows && filePathLast === CHAR_BACKWARD_SLASH) && resolved[resolved.length - 1] !== "/" && (resolved += "/"), resolved = encodePathChars(resolved), resolved.indexOf("?") !== -1 && (resolved = resolved.replace(questionRegex, "%3F")), resolved.indexOf("#") !== -1 && (resolved = resolved.replace(hashRegex, "%23")), new URL(`file://${resolved}`).href;
}
function toWindowsPath(path) {
  return path.replace(/\//g, "\\");
}
var comma = 44;
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var intToChar = new Uint8Array(64);
var charToInt = new Uint8Array(128);
for (let i = 0; i < chars.length; i++) {
  const c = chars.charCodeAt(i);
  intToChar[i] = c, charToInt[c] = i;
}
function decodeInteger(reader, relative) {
  let value = 0, shift = 0, integer = 0;
  do {
    const c = reader.next();
    integer = charToInt[c], value |= (integer & 31) << shift, shift += 5;
  } while (integer & 32);
  const shouldNegate = value & 1;
  return value >>>= 1, shouldNegate && (value = -2147483648 | -value), relative + value;
}
function hasMoreVlq(reader, max) {
  return reader.pos >= max ? false : reader.peek() !== comma;
}
var StringReader = class {
  constructor(buffer) {
    this.pos = 0, this.buffer = buffer;
  }
  next() {
    return this.buffer.charCodeAt(this.pos++);
  }
  peek() {
    return this.buffer.charCodeAt(this.pos);
  }
  indexOf(char) {
    const { buffer, pos } = this, idx = buffer.indexOf(char, pos);
    return idx === -1 ? buffer.length : idx;
  }
};
function decode(mappings) {
  const { length } = mappings, reader = new StringReader(mappings), decoded = [];
  let genColumn = 0, sourcesIndex = 0, sourceLine = 0, sourceColumn = 0, namesIndex = 0;
  do {
    const semi = reader.indexOf(";"), line = [];
    let sorted = true, lastCol = 0;
    for (genColumn = 0; reader.pos < semi; ) {
      let seg;
      genColumn = decodeInteger(reader, genColumn), genColumn < lastCol && (sorted = false), lastCol = genColumn, hasMoreVlq(reader, semi) ? (sourcesIndex = decodeInteger(reader, sourcesIndex), sourceLine = decodeInteger(reader, sourceLine), sourceColumn = decodeInteger(reader, sourceColumn), hasMoreVlq(reader, semi) ? (namesIndex = decodeInteger(reader, namesIndex), seg = [genColumn, sourcesIndex, sourceLine, sourceColumn, namesIndex]) : seg = [genColumn, sourcesIndex, sourceLine, sourceColumn]) : seg = [genColumn], line.push(seg), reader.pos++;
    }
    sorted || sort(line), decoded.push(line), reader.pos = semi + 1;
  } while (reader.pos <= length);
  return decoded;
}
function sort(line) {
  line.sort(sortComparator);
}
function sortComparator(a, b) {
  return a[0] - b[0];
}
var COLUMN = 0;
var SOURCES_INDEX = 1;
var SOURCE_LINE = 2;
var SOURCE_COLUMN = 3;
var NAMES_INDEX = 4;
var found = false;
function binarySearch(haystack, needle, low, high) {
  for (; low <= high; ) {
    const mid = low + (high - low >> 1), cmp = haystack[mid][COLUMN] - needle;
    if (cmp === 0)
      return found = true, mid;
    cmp < 0 ? low = mid + 1 : high = mid - 1;
  }
  return found = false, low - 1;
}
function upperBound(haystack, needle, index) {
  for (let i = index + 1; i < haystack.length && haystack[i][COLUMN] === needle; index = i++)
    ;
  return index;
}
function lowerBound(haystack, needle, index) {
  for (let i = index - 1; i >= 0 && haystack[i][COLUMN] === needle; index = i--)
    ;
  return index;
}
function memoizedBinarySearch(haystack, needle, state, key) {
  const { lastKey, lastNeedle, lastIndex } = state;
  let low = 0, high = haystack.length - 1;
  if (key === lastKey) {
    if (needle === lastNeedle)
      return found = lastIndex !== -1 && haystack[lastIndex][COLUMN] === needle, lastIndex;
    needle >= lastNeedle ? low = lastIndex === -1 ? 0 : lastIndex : high = lastIndex;
  }
  return state.lastKey = key, state.lastNeedle = needle, state.lastIndex = binarySearch(haystack, needle, low, high);
}
var LINE_GTR_ZERO = "`line` must be greater than 0 (lines start at line 1)";
var COL_GTR_EQ_ZERO = "`column` must be greater than or equal to 0 (columns start at column 0)";
var LEAST_UPPER_BOUND = -1;
var GREATEST_LOWER_BOUND = 1;
function decodedMappings(map) {
  var _a;
  return (_a = map)._decoded || (_a._decoded = decode(map._encoded));
}
function originalPositionFor(map, needle) {
  let { line, column, bias } = needle;
  if (line--, line < 0)
    throw new Error(LINE_GTR_ZERO);
  if (column < 0)
    throw new Error(COL_GTR_EQ_ZERO);
  const decoded = decodedMappings(map);
  if (line >= decoded.length)
    return OMapping(null, null, null, null);
  const segments = decoded[line], index = traceSegmentInternal(segments, map._decodedMemo, line, column, bias || GREATEST_LOWER_BOUND);
  if (index === -1)
    return OMapping(null, null, null, null);
  const segment = segments[index];
  if (segment.length === 1)
    return OMapping(null, null, null, null);
  const { names, resolvedSources } = map;
  return OMapping(resolvedSources[segment[SOURCES_INDEX]], segment[SOURCE_LINE] + 1, segment[SOURCE_COLUMN], segment.length === 5 ? names[segment[NAMES_INDEX]] : null);
}
function OMapping(source, line, column, name) {
  return { source, line, column, name };
}
function traceSegmentInternal(segments, memo, line, column, bias) {
  let index = memoizedBinarySearch(segments, column, memo, line);
  return found ? index = (bias === LEAST_UPPER_BOUND ? upperBound : lowerBound)(segments, column, index) : bias === LEAST_UPPER_BOUND && index++, index === -1 || index === segments.length ? -1 : index;
}
var DecodedMap = class {
  constructor(map, from) {
    __publicField(this, "_encoded");
    __publicField(this, "_decoded");
    __publicField(this, "_decodedMemo");
    __publicField(this, "url");
    __publicField(this, "version");
    __publicField(this, "names", []);
    __publicField(this, "resolvedSources");
    this.map = map;
    const { mappings, names, sources } = map;
    this.version = map.version, this.names = names || [], this._encoded = mappings || "", this._decodedMemo = memoizedState(), this.url = from, this.resolvedSources = (sources || []).map(
      (s) => posixResolve(s || "", from)
    );
  }
};
function memoizedState() {
  return {
    lastKey: -1,
    lastNeedle: -1,
    lastIndex: -1
  };
}
function getOriginalPosition(map, needle) {
  const result = originalPositionFor(map, needle);
  return result.column == null ? null : result;
}
var VITE_RUNTIME_SOURCEMAPPING_REGEXP = new RegExp(
  `//# ${SOURCEMAPPING_URL}=data:application/json;base64,(.+)`
);
var ModuleCacheMap = class extends Map {
  constructor(root, entries) {
    super(entries);
    __publicField(this, "root");
    this.root = withTrailingSlash(root);
  }
  normalize(fsPath) {
    return normalizeModuleId(fsPath, this.root);
  }
  /**
   * Assign partial data to the map
   */
  update(fsPath, mod) {
    return fsPath = this.normalize(fsPath), super.has(fsPath) ? Object.assign(super.get(fsPath), mod) : this.setByModuleId(fsPath, mod), this;
  }
  setByModuleId(modulePath, mod) {
    return super.set(modulePath, mod);
  }
  set(fsPath, mod) {
    return this.setByModuleId(this.normalize(fsPath), mod);
  }
  getByModuleId(modulePath) {
    super.has(modulePath) || this.setByModuleId(modulePath, {});
    const mod = super.get(modulePath);
    return mod.imports || Object.assign(mod, {
      imports: /* @__PURE__ */ new Set(),
      importers: /* @__PURE__ */ new Set()
    }), mod;
  }
  get(fsPath) {
    return this.getByModuleId(this.normalize(fsPath));
  }
  deleteByModuleId(modulePath) {
    return super.delete(modulePath);
  }
  delete(fsPath) {
    return this.deleteByModuleId(this.normalize(fsPath));
  }
  invalidate(id) {
    var _a;
    const module = this.get(id);
    module.evaluated = false, module.meta = void 0, module.map = void 0, module.promise = void 0, module.exports = void 0, (_a = module.imports) == null ? void 0 : _a.clear();
  }
  isImported({
    importedId,
    importedBy
  }, seen = /* @__PURE__ */ new Set()) {
    var _a;
    if (importedId = this.normalize(importedId), importedBy = this.normalize(importedBy), importedBy === importedId) return true;
    if (seen.has(importedId)) return false;
    seen.add(importedId);
    const importers = (_a = this.getByModuleId(importedId)) == null ? void 0 : _a.importers;
    if (!importers) return false;
    if (importers.has(importedBy)) return true;
    for (const importer of importers)
      if (this.isImported({
        importedBy,
        importedId: importer
      }))
        return true;
    return false;
  }
  /**
   * Invalidate modules that dependent on the given modules, up to the main entry
   */
  invalidateDepTree(ids, invalidated = /* @__PURE__ */ new Set()) {
    for (const _id of ids) {
      const id = this.normalize(_id);
      if (invalidated.has(id)) continue;
      invalidated.add(id);
      const mod = super.get(id);
      (mod == null ? void 0 : mod.importers) && this.invalidateDepTree(mod.importers, invalidated), super.delete(id);
    }
    return invalidated;
  }
  /**
   * Invalidate dependency modules of the given modules, down to the bottom-level dependencies
   */
  invalidateSubDepTree(ids, invalidated = /* @__PURE__ */ new Set()) {
    for (const _id of ids) {
      const id = this.normalize(_id);
      if (invalidated.has(id)) continue;
      invalidated.add(id);
      const subIds = Array.from(super.entries()).filter(([, mod]) => {
        var _a;
        return (_a = mod.importers) == null ? void 0 : _a.has(id);
      }).map(([key]) => key);
      subIds.length && this.invalidateSubDepTree(subIds, invalidated), super.delete(id);
    }
    return invalidated;
  }
  getSourceMap(moduleId) {
    var _a;
    const mod = this.get(moduleId);
    if (mod.map) return mod.map;
    if (!mod.meta || !("code" in mod.meta)) return null;
    const mapString = (_a = VITE_RUNTIME_SOURCEMAPPING_REGEXP.exec(mod.meta.code)) == null ? void 0 : _a[1];
    if (!mapString) return null;
    const baseFile = mod.meta.file || moduleId.split("?")[0];
    return mod.map = new DecodedMap(JSON.parse(decodeBase64(mapString)), baseFile), mod.map;
  }
};
var prefixedBuiltins = /* @__PURE__ */ new Set(["node:test"]);
function normalizeModuleId(file, root) {
  if (prefixedBuiltins.has(file)) return file;
  let unixFile = slash(file).replace(/^\/@fs\//, isWindows ? "" : "/").replace(/^node:/, "").replace(/^\/+/, "/");
  return unixFile.startsWith(root) && (unixFile = unixFile.slice(root.length - 1)), unixFile.replace(/^file:\//, "/");
}
var HMRContext = class {
  constructor(hmrClient, ownerPath) {
    __publicField(this, "newListeners");
    this.hmrClient = hmrClient, this.ownerPath = ownerPath, hmrClient.dataMap.has(ownerPath) || hmrClient.dataMap.set(ownerPath, {});
    const mod = hmrClient.hotModulesMap.get(ownerPath);
    mod && (mod.callbacks = []);
    const staleListeners = hmrClient.ctxToListenersMap.get(ownerPath);
    if (staleListeners)
      for (const [event, staleFns] of staleListeners) {
        const listeners = hmrClient.customListenersMap.get(event);
        listeners && hmrClient.customListenersMap.set(
          event,
          listeners.filter((l) => !staleFns.includes(l))
        );
      }
    this.newListeners = /* @__PURE__ */ new Map(), hmrClient.ctxToListenersMap.set(ownerPath, this.newListeners);
  }
  get data() {
    return this.hmrClient.dataMap.get(this.ownerPath);
  }
  accept(deps, callback) {
    if (typeof deps == "function" || !deps)
      this.acceptDeps([this.ownerPath], ([mod]) => deps == null ? void 0 : deps(mod));
    else if (typeof deps == "string")
      this.acceptDeps([deps], ([mod]) => callback == null ? void 0 : callback(mod));
    else if (Array.isArray(deps))
      this.acceptDeps(deps, callback);
    else
      throw new Error("invalid hot.accept() usage.");
  }
  // export names (first arg) are irrelevant on the client side, they're
  // extracted in the server for propagation
  acceptExports(_, callback) {
    this.acceptDeps([this.ownerPath], ([mod]) => callback == null ? void 0 : callback(mod));
  }
  dispose(cb) {
    this.hmrClient.disposeMap.set(this.ownerPath, cb);
  }
  prune(cb) {
    this.hmrClient.pruneMap.set(this.ownerPath, cb);
  }
  // Kept for backward compatibility (#11036)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  decline() {
  }
  invalidate(message) {
    this.hmrClient.notifyListeners("vite:invalidate", {
      path: this.ownerPath,
      message
    }), this.send("vite:invalidate", { path: this.ownerPath, message }), this.hmrClient.logger.debug(
      `[vite] invalidate ${this.ownerPath}${message ? `: ${message}` : ""}`
    );
  }
  on(event, cb) {
    const addToMap = (map) => {
      const existing = map.get(event) || [];
      existing.push(cb), map.set(event, existing);
    };
    addToMap(this.hmrClient.customListenersMap), addToMap(this.newListeners);
  }
  off(event, cb) {
    const removeFromMap = (map) => {
      const existing = map.get(event);
      if (existing === void 0)
        return;
      const pruned = existing.filter((l) => l !== cb);
      if (pruned.length === 0) {
        map.delete(event);
        return;
      }
      map.set(event, pruned);
    };
    removeFromMap(this.hmrClient.customListenersMap), removeFromMap(this.newListeners);
  }
  send(event, data) {
    this.hmrClient.messenger.send(
      JSON.stringify({ type: "custom", event, data })
    );
  }
  acceptDeps(deps, callback = () => {
  }) {
    const mod = this.hmrClient.hotModulesMap.get(this.ownerPath) || {
      id: this.ownerPath,
      callbacks: []
    };
    mod.callbacks.push({
      deps,
      fn: callback
    }), this.hmrClient.hotModulesMap.set(this.ownerPath, mod);
  }
};
var HMRMessenger = class {
  constructor(connection) {
    __publicField(this, "queue", []);
    this.connection = connection;
  }
  send(message) {
    this.queue.push(message), this.flush();
  }
  flush() {
    this.connection.isReady() && (this.queue.forEach((msg) => this.connection.send(msg)), this.queue = []);
  }
};
var HMRClient = class {
  constructor(logger, connection, importUpdatedModule) {
    __publicField(this, "hotModulesMap", /* @__PURE__ */ new Map());
    __publicField(this, "disposeMap", /* @__PURE__ */ new Map());
    __publicField(this, "pruneMap", /* @__PURE__ */ new Map());
    __publicField(this, "dataMap", /* @__PURE__ */ new Map());
    __publicField(this, "customListenersMap", /* @__PURE__ */ new Map());
    __publicField(this, "ctxToListenersMap", /* @__PURE__ */ new Map());
    __publicField(this, "messenger");
    __publicField(this, "updateQueue", []);
    __publicField(this, "pendingUpdateQueue", false);
    this.logger = logger, this.importUpdatedModule = importUpdatedModule, this.messenger = new HMRMessenger(connection);
  }
  async notifyListeners(event, data) {
    const cbs = this.customListenersMap.get(event);
    cbs && await Promise.allSettled(cbs.map((cb) => cb(data)));
  }
  clear() {
    this.hotModulesMap.clear(), this.disposeMap.clear(), this.pruneMap.clear(), this.dataMap.clear(), this.customListenersMap.clear(), this.ctxToListenersMap.clear();
  }
  // After an HMR update, some modules are no longer imported on the page
  // but they may have left behind side effects that need to be cleaned up
  // (.e.g style injections)
  async prunePaths(paths) {
    await Promise.all(
      paths.map((path) => {
        const disposer = this.disposeMap.get(path);
        if (disposer) return disposer(this.dataMap.get(path));
      })
    ), paths.forEach((path) => {
      const fn = this.pruneMap.get(path);
      fn && fn(this.dataMap.get(path));
    });
  }
  warnFailedUpdate(err, path) {
    err.message.includes("fetch") || this.logger.error(err), this.logger.error(
      `[hmr] Failed to reload ${path}. This could be due to syntax errors or importing non-existent modules. (see errors above)`
    );
  }
  /**
   * buffer multiple hot updates triggered by the same src change
   * so that they are invoked in the same order they were sent.
   * (otherwise the order may be inconsistent because of the http request round trip)
   */
  async queueUpdate(payload) {
    if (this.updateQueue.push(this.fetchUpdate(payload)), !this.pendingUpdateQueue) {
      this.pendingUpdateQueue = true, await Promise.resolve(), this.pendingUpdateQueue = false;
      const loading = [...this.updateQueue];
      this.updateQueue = [], (await Promise.all(loading)).forEach((fn) => fn && fn());
    }
  }
  async fetchUpdate(update) {
    const { path, acceptedPath } = update, mod = this.hotModulesMap.get(path);
    if (!mod)
      return;
    let fetchedModule;
    const isSelfUpdate = path === acceptedPath, qualifiedCallbacks = mod.callbacks.filter(
      ({ deps }) => deps.includes(acceptedPath)
    );
    if (isSelfUpdate || qualifiedCallbacks.length > 0) {
      const disposer = this.disposeMap.get(acceptedPath);
      disposer && await disposer(this.dataMap.get(acceptedPath));
      try {
        fetchedModule = await this.importUpdatedModule(update);
      } catch (e) {
        this.warnFailedUpdate(e, acceptedPath);
      }
    }
    return () => {
      for (const { deps, fn } of qualifiedCallbacks)
        fn(
          deps.map((dep) => dep === acceptedPath ? fetchedModule : void 0)
        );
      const loggedPath = isSelfUpdate ? path : `${acceptedPath} via ${path}`;
      this.logger.debug(`[vite] hot updated: ${loggedPath}`);
    };
  }
};
function analyzeImportedModDifference(mod, rawId, moduleType, metadata) {
  var _a;
  if (!(metadata == null ? void 0 : metadata.isDynamicImport) && ((_a = metadata == null ? void 0 : metadata.importedNames) == null ? void 0 : _a.length)) {
    const missingBindings = metadata.importedNames.filter((s) => !(s in mod));
    if (missingBindings.length) {
      const lastBinding = missingBindings[missingBindings.length - 1];
      throw moduleType === "module" ? new SyntaxError(
        `[vite] The requested module '${rawId}' does not provide an export named '${lastBinding}'`
      ) : new SyntaxError(`[vite] Named export '${lastBinding}' not found. The requested module '${rawId}' is a CommonJS module, which may not support all module.exports as named exports.
CommonJS modules can always be imported via the default export, for example using:

import pkg from '${rawId}';
const {${missingBindings.join(", ")}} = pkg;
`);
    }
  }
}
var ssrModuleExportsKey = "__vite_ssr_exports__";
var ssrImportKey = "__vite_ssr_import__";
var ssrDynamicImportKey = "__vite_ssr_dynamic_import__";
var ssrExportAllKey = "__vite_ssr_exportAll__";
var ssrImportMetaKey = "__vite_ssr_import_meta__";
var noop = () => {
};
var silentConsole = {
  debug: noop,
  error: noop
};
function createHMRHandler(runtime) {
  const queue = new Queue();
  return (payload) => queue.enqueue(() => handleHMRPayload(runtime, payload));
}
async function handleHMRPayload(runtime, payload) {
  const hmrClient = runtime.hmrClient;
  if (!(!hmrClient || runtime.isDestroyed()))
    switch (payload.type) {
      case "connected":
        hmrClient.logger.debug("[vite] connected."), hmrClient.messenger.flush();
        break;
      case "update":
        await hmrClient.notifyListeners("vite:beforeUpdate", payload), await Promise.all(
          payload.updates.map(async (update) => {
            if (update.type === "js-update")
              return update.acceptedPath = unwrapId(update.acceptedPath), update.path = unwrapId(update.path), hmrClient.queueUpdate(update);
            hmrClient.logger.error(
              "[vite] css hmr is not supported in runtime mode."
            );
          })
        ), await hmrClient.notifyListeners("vite:afterUpdate", payload);
        break;
      case "custom": {
        await hmrClient.notifyListeners(payload.event, payload.data);
        break;
      }
      case "full-reload": {
        const { triggeredBy } = payload, clearEntrypoints = triggeredBy ? [...runtime.entrypoints].filter(
          (entrypoint) => runtime.moduleCache.isImported({
            importedId: triggeredBy,
            importedBy: entrypoint
          })
        ) : [...runtime.entrypoints];
        if (!clearEntrypoints.length) break;
        hmrClient.logger.debug("[vite] program reload"), await hmrClient.notifyListeners("vite:beforeFullReload", payload), runtime.moduleCache.clear();
        for (const id of clearEntrypoints)
          await runtime.executeUrl(id);
        break;
      }
      case "prune":
        await hmrClient.notifyListeners("vite:beforePrune", payload), await hmrClient.prunePaths(payload.paths);
        break;
      case "error": {
        await hmrClient.notifyListeners("vite:error", payload);
        const err = payload.err;
        hmrClient.logger.error(
          `[vite] Internal Server Error
${err.message}
${err.stack}`
        );
        break;
      }
      default:
        return payload;
    }
}
var Queue = class {
  constructor() {
    __publicField(this, "queue", []);
    __publicField(this, "pending", false);
  }
  enqueue(promise) {
    return new Promise((resolve2, reject) => {
      this.queue.push({
        promise,
        resolve: resolve2,
        reject
      }), this.dequeue();
    });
  }
  dequeue() {
    if (this.pending)
      return false;
    const item = this.queue.shift();
    return item ? (this.pending = true, item.promise().then(item.resolve).catch(item.reject).finally(() => {
      this.pending = false, this.dequeue();
    }), true) : false;
  }
};
var sourceMapCache = {};
var fileContentsCache = {};
var moduleGraphs = /* @__PURE__ */ new Set();
var retrieveFileHandlers = /* @__PURE__ */ new Set();
var retrieveSourceMapHandlers = /* @__PURE__ */ new Set();
var createExecHandlers = (handlers) => (...args) => {
  for (const handler of handlers) {
    const result = handler(...args);
    if (result) return result;
  }
  return null;
};
var retrieveFileFromHandlers = createExecHandlers(retrieveFileHandlers);
var retrieveSourceMapFromHandlers = createExecHandlers(
  retrieveSourceMapHandlers
);
var overridden = false;
var originalPrepare = Error.prepareStackTrace;
function resetInterceptor(runtime, options) {
  moduleGraphs.delete(runtime.moduleCache), options.retrieveFile && retrieveFileHandlers.delete(options.retrieveFile), options.retrieveSourceMap && retrieveSourceMapHandlers.delete(options.retrieveSourceMap), moduleGraphs.size === 0 && (Error.prepareStackTrace = originalPrepare, overridden = false);
}
function interceptStackTrace(runtime, options = {}) {
  return overridden || (Error.prepareStackTrace = prepareStackTrace, overridden = true), moduleGraphs.add(runtime.moduleCache), options.retrieveFile && retrieveFileHandlers.add(options.retrieveFile), options.retrieveSourceMap && retrieveSourceMapHandlers.add(options.retrieveSourceMap), () => resetInterceptor(runtime, options);
}
function supportRelativeURL(file, url) {
  if (!file) return url;
  const dir = posixDirname(slash(file)), match = /^\w+:\/\/[^/]*/.exec(dir);
  let protocol = match ? match[0] : "";
  const startPath = dir.slice(protocol.length);
  return protocol && /^\/\w:/.test(startPath) ? (protocol += "/", protocol + slash(posixResolve(startPath, url))) : protocol + posixResolve(startPath, url);
}
function getRuntimeSourceMap(position) {
  for (const moduleCache of moduleGraphs) {
    const sourceMap = moduleCache.getSourceMap(position.source);
    if (sourceMap)
      return {
        url: position.source,
        map: sourceMap,
        vite: true
      };
  }
  return null;
}
function retrieveFile(path) {
  if (path in fileContentsCache) return fileContentsCache[path];
  const content = retrieveFileFromHandlers(path);
  return typeof content == "string" ? (fileContentsCache[path] = content, content) : null;
}
function retrieveSourceMapURL(source) {
  const fileData = retrieveFile(source);
  if (!fileData) return null;
  const re = /\/\/[@#]\s*sourceMappingURL=([^\s'"]+)\s*$|\/\*[@#]\s*sourceMappingURL=[^\s*'"]+\s*\*\/\s*$/gm;
  let lastMatch, match;
  for (; match = re.exec(fileData); ) lastMatch = match;
  return lastMatch ? lastMatch[1] : null;
}
var reSourceMap = /^data:application\/json[^,]+base64,/;
function retrieveSourceMap(source) {
  const urlAndMap = retrieveSourceMapFromHandlers(source);
  if (urlAndMap) return urlAndMap;
  let sourceMappingURL = retrieveSourceMapURL(source);
  if (!sourceMappingURL) return null;
  let sourceMapData;
  if (reSourceMap.test(sourceMappingURL)) {
    const rawData = sourceMappingURL.slice(sourceMappingURL.indexOf(",") + 1);
    sourceMapData = Buffer.from(rawData, "base64").toString(), sourceMappingURL = source;
  } else
    sourceMappingURL = supportRelativeURL(source, sourceMappingURL), sourceMapData = retrieveFile(sourceMappingURL);
  return sourceMapData ? {
    url: sourceMappingURL,
    map: sourceMapData
  } : null;
}
function mapSourcePosition(position) {
  var _a;
  if (!position.source) return position;
  let sourceMap = getRuntimeSourceMap(position);
  if (sourceMap || (sourceMap = sourceMapCache[position.source]), !sourceMap) {
    const urlAndMap = retrieveSourceMap(position.source);
    if (urlAndMap && urlAndMap.map) {
      const url = urlAndMap.url;
      sourceMap = sourceMapCache[position.source] = {
        url,
        map: new DecodedMap(
          typeof urlAndMap.map == "string" ? JSON.parse(urlAndMap.map) : urlAndMap.map,
          url
        )
      };
      const contents = (_a = sourceMap.map) == null ? void 0 : _a.map.sourcesContent;
      sourceMap.map && contents && sourceMap.map.resolvedSources.forEach((source, i) => {
        const content = contents[i];
        if (content && source && url) {
          const contentUrl = supportRelativeURL(url, source);
          fileContentsCache[contentUrl] = content;
        }
      });
    } else
      sourceMap = sourceMapCache[position.source] = {
        url: null,
        map: null
      };
  }
  if (sourceMap && sourceMap.map && sourceMap.url) {
    const originalPosition = getOriginalPosition(sourceMap.map, position);
    if (originalPosition && originalPosition.source != null)
      return originalPosition.source = supportRelativeURL(
        sourceMap.url,
        originalPosition.source
      ), sourceMap.vite && (originalPosition._vite = true), originalPosition;
  }
  return position;
}
function mapEvalOrigin(origin) {
  let match = /^eval at ([^(]+) \((.+):(\d+):(\d+)\)$/.exec(origin);
  if (match) {
    const position = mapSourcePosition({
      name: null,
      source: match[2],
      line: +match[3],
      column: +match[4] - 1
    });
    return `eval at ${match[1]} (${position.source}:${position.line}:${position.column + 1})`;
  }
  return match = /^eval at ([^(]+) \((.+)\)$/.exec(origin), match ? `eval at ${match[1]} (${mapEvalOrigin(match[2])})` : origin;
}
function CallSiteToString() {
  let fileName, fileLocation = "";
  if (this.isNative())
    fileLocation = "native";
  else {
    fileName = this.getScriptNameOrSourceURL(), !fileName && this.isEval() && (fileLocation = this.getEvalOrigin(), fileLocation += ", "), fileName ? fileLocation += fileName : fileLocation += "<anonymous>";
    const lineNumber = this.getLineNumber();
    if (lineNumber != null) {
      fileLocation += `:${lineNumber}`;
      const columnNumber = this.getColumnNumber();
      columnNumber && (fileLocation += `:${columnNumber}`);
    }
  }
  let line = "";
  const functionName = this.getFunctionName();
  let addSuffix = true;
  const isConstructor = this.isConstructor();
  if (this.isToplevel() || isConstructor)
    isConstructor ? line += `new ${functionName || "<anonymous>"}` : functionName ? line += functionName : (line += fileLocation, addSuffix = false);
  else {
    let typeName = this.getTypeName();
    typeName === "[object Object]" && (typeName = "null");
    const methodName = this.getMethodName();
    functionName ? (typeName && functionName.indexOf(typeName) !== 0 && (line += `${typeName}.`), line += functionName, methodName && functionName.indexOf(`.${methodName}`) !== functionName.length - methodName.length - 1 && (line += ` [as ${methodName}]`)) : line += `${typeName}.${methodName || "<anonymous>"}`;
  }
  return addSuffix && (line += ` (${fileLocation})`), line;
}
function cloneCallSite(frame) {
  const object = {};
  return Object.getOwnPropertyNames(Object.getPrototypeOf(frame)).forEach((name) => {
    const key = name;
    object[key] = /^(?:is|get)/.test(name) ? function() {
      return frame[key].call(frame);
    } : frame[key];
  }), object.toString = CallSiteToString, object;
}
function wrapCallSite(frame, state) {
  if (state === void 0 && (state = { nextPosition: null, curPosition: null }), frame.isNative())
    return state.curPosition = null, frame;
  const source = frame.getFileName() || frame.getScriptNameOrSourceURL();
  if (source) {
    const line = frame.getLineNumber();
    let column = frame.getColumnNumber() - 1;
    const headerLength = 62;
    line === 1 && column > headerLength && !frame.isEval() && (column -= headerLength);
    const position = mapSourcePosition({
      name: null,
      source,
      line,
      column
    });
    state.curPosition = position, frame = cloneCallSite(frame);
    const originalFunctionName = frame.getFunctionName;
    return frame.getFunctionName = function() {
      const name = state.nextPosition == null ? originalFunctionName() : state.nextPosition.name || originalFunctionName();
      return name === "eval" && "_vite" in position ? null : name;
    }, frame.getFileName = function() {
      return position.source ?? void 0;
    }, frame.getLineNumber = function() {
      return position.line;
    }, frame.getColumnNumber = function() {
      return position.column + 1;
    }, frame.getScriptNameOrSourceURL = function() {
      return position.source;
    }, frame;
  }
  let origin = frame.isEval() && frame.getEvalOrigin();
  return origin && (origin = mapEvalOrigin(origin), frame = cloneCallSite(frame), frame.getEvalOrigin = function() {
    return origin || void 0;
  }), frame;
}
function prepareStackTrace(error, stack) {
  const name = error.name || "Error", message = error.message || "", errorString = `${name}: ${message}`, state = { nextPosition: null, curPosition: null }, processedStack = [];
  for (let i = stack.length - 1; i >= 0; i--)
    processedStack.push(`
    at ${wrapCallSite(stack[i], state)}`), state.nextPosition = state.curPosition;
  return state.curPosition = state.nextPosition = null, errorString + processedStack.reverse().join("");
}
function enableSourceMapSupport(runtime) {
  if (runtime.options.sourcemapInterceptor === "node") {
    if (typeof process > "u")
      throw new TypeError(
        `Cannot use "sourcemapInterceptor: 'node'" because global "process" variable is not available.`
      );
    if (typeof process.setSourceMapsEnabled != "function")
      throw new TypeError(
        `Cannot use "sourcemapInterceptor: 'node'" because "process.setSourceMapsEnabled" function is not available. Please use Node >= 16.6.0.`
      );
    const isEnabledAlready = process.sourceMapsEnabled ?? false;
    return process.setSourceMapsEnabled(true), () => !isEnabledAlready && process.setSourceMapsEnabled(false);
  }
  return interceptStackTrace(
    runtime,
    typeof runtime.options.sourcemapInterceptor == "object" ? runtime.options.sourcemapInterceptor : void 0
  );
}
var ViteRuntime = class {
  constructor(options, runner, debug) {
    /**
     * Holds the cache of modules
     * Keys of the map are ids
     */
    __publicField(this, "moduleCache");
    __publicField(this, "hmrClient");
    __publicField(this, "entrypoints", /* @__PURE__ */ new Set());
    __publicField(this, "idToUrlMap", /* @__PURE__ */ new Map());
    __publicField(this, "fileToIdMap", /* @__PURE__ */ new Map());
    __publicField(this, "envProxy", new Proxy({}, {
      get(_, p) {
        throw new Error(
          `[vite-runtime] Dynamic access of "import.meta.env" is not supported. Please, use "import.meta.env.${String(p)}" instead.`
        );
      }
    }));
    __publicField(this, "_destroyed", false);
    __publicField(this, "_resetSourceMapSupport");
    this.options = options, this.runner = runner, this.debug = debug, this.moduleCache = options.moduleCache ?? new ModuleCacheMap(options.root), typeof options.hmr == "object" && (this.hmrClient = new HMRClient(
      options.hmr.logger === false ? silentConsole : options.hmr.logger || console,
      options.hmr.connection,
      ({ acceptedPath, ssrInvalidates }) => (this.moduleCache.invalidate(acceptedPath), ssrInvalidates && this.invalidateFiles(ssrInvalidates), this.executeUrl(acceptedPath))
    ), options.hmr.connection.onUpdate(createHMRHandler(this))), options.sourcemapInterceptor !== false && (this._resetSourceMapSupport = enableSourceMapSupport(this));
  }
  /**
   * URL to execute. Accepts file path, server path or id relative to the root.
   */
  async executeUrl(url) {
    url = this.normalizeEntryUrl(url);
    const fetchedModule = await this.cachedModule(url);
    return await this.cachedRequest(url, fetchedModule);
  }
  /**
   * Entrypoint URL to execute. Accepts file path, server path or id relative to the root.
   * In the case of a full reload triggered by HMR, this is the module that will be reloaded.
   * If this method is called multiple times, all entrypoints will be reloaded one at a time.
   */
  async executeEntrypoint(url) {
    url = this.normalizeEntryUrl(url);
    const fetchedModule = await this.cachedModule(url);
    return await this.cachedRequest(url, fetchedModule, [], {
      entrypoint: true
    });
  }
  /**
   * Clear all caches including HMR listeners.
   */
  clearCache() {
    var _a;
    this.moduleCache.clear(), this.idToUrlMap.clear(), this.entrypoints.clear(), (_a = this.hmrClient) == null ? void 0 : _a.clear();
  }
  /**
   * Clears all caches, removes all HMR listeners, and resets source map support.
   * This method doesn't stop the HMR connection.
   */
  async destroy() {
    var _a;
    (_a = this._resetSourceMapSupport) == null ? void 0 : _a.call(this), this.clearCache(), this.hmrClient = void 0, this._destroyed = true;
  }
  /**
   * Returns `true` if the runtime has been destroyed by calling `destroy()` method.
   */
  isDestroyed() {
    return this._destroyed;
  }
  invalidateFiles(files) {
    files.forEach((file) => {
      const ids = this.fileToIdMap.get(file);
      ids && ids.forEach((id) => this.moduleCache.invalidate(id));
    });
  }
  // we don't use moduleCache.normalize because this URL doesn't have to follow the same rules
  // this URL is something that user passes down manually, and is later resolved by fetchModule
  // moduleCache.normalize is used on resolved "file" property
  normalizeEntryUrl(url) {
    if (url[0] === ".")
      return url;
    url.startsWith("file://") && (url = url.slice(isWindows ? 8 : 7)), url = slash(url);
    const _root = this.options.root, root = _root[_root.length - 1] === "/" ? _root : `${_root}/`;
    return url.startsWith(root) ? url.slice(root.length - 1) : url[0] === "/" ? url : wrapId(url);
  }
  processImport(exports, fetchResult, metadata) {
    if (!("externalize" in fetchResult))
      return exports;
    const { id, type } = fetchResult;
    return type !== "module" && type !== "commonjs" || analyzeImportedModDifference(exports, id, type, metadata), exports;
  }
  async cachedRequest(id, fetchedModule, callstack = [], metadata) {
    const moduleId = fetchedModule.id;
    (metadata == null ? void 0 : metadata.entrypoint) && this.entrypoints.add(moduleId);
    const mod = this.moduleCache.getByModuleId(moduleId), { imports, importers } = mod, importee = callstack[callstack.length - 1];
    if (importee && importers.add(importee), (callstack.includes(moduleId) || Array.from(imports.values()).some((i) => importers.has(i))) && mod.exports)
      return this.processImport(mod.exports, fetchedModule, metadata);
    let debugTimer;
    this.debug && (debugTimer = setTimeout(() => {
      const getStack = () => `stack:
${[...callstack, moduleId].reverse().map((p) => `  - ${p}`).join(`
`)}`;
      this.debug(
        `[vite-runtime] module ${moduleId} takes over 2s to load.
${getStack()}`
      );
    }, 2e3));
    try {
      if (mod.promise)
        return this.processImport(await mod.promise, fetchedModule, metadata);
      const promise = this.directRequest(id, fetchedModule, callstack);
      return mod.promise = promise, mod.evaluated = false, this.processImport(await promise, fetchedModule, metadata);
    } finally {
      mod.evaluated = true, debugTimer && clearTimeout(debugTimer);
    }
  }
  async cachedModule(id, importer) {
    var _a;
    if (this._destroyed)
      throw new Error("[vite] Vite runtime has been destroyed.");
    const normalized = this.idToUrlMap.get(id);
    if (normalized) {
      const mod2 = this.moduleCache.getByModuleId(normalized);
      if (mod2.meta)
        return mod2.meta;
    }
    (_a = this.debug) == null ? void 0 : _a.call(this, "[vite-runtime] fetching", id);
    const fetchedModule = id.startsWith("data:") ? { externalize: id, type: "builtin" } : await this.options.fetchModule(id, importer), idQuery = id.split("?")[1], query = idQuery ? `?${idQuery}` : "", file = "file" in fetchedModule ? fetchedModule.file : void 0, fullFile = file ? `${file}${query}` : id, moduleId = this.moduleCache.normalize(fullFile), mod = this.moduleCache.getByModuleId(moduleId);
    if (fetchedModule.id = moduleId, mod.meta = fetchedModule, file) {
      const fileModules = this.fileToIdMap.get(file) || [];
      fileModules.push(moduleId), this.fileToIdMap.set(file, fileModules);
    }
    return this.idToUrlMap.set(id, moduleId), this.idToUrlMap.set(unwrapId(id), moduleId), fetchedModule;
  }
  // override is allowed, consider this a public API
  async directRequest(id, fetchResult, _callstack) {
    var _a, _b;
    const moduleId = fetchResult.id, callstack = [..._callstack, moduleId], mod = this.moduleCache.getByModuleId(moduleId), request = async (dep, metadata) => {
      const fetchedModule = await this.cachedModule(dep, moduleId);
      return this.moduleCache.getByModuleId(fetchedModule.id).importers.add(moduleId), mod.imports.add(fetchedModule.id), this.cachedRequest(dep, fetchedModule, callstack, metadata);
    }, dynamicRequest = async (dep) => (dep = String(dep), dep[0] === "." && (dep = posixResolve(posixDirname(id), dep)), request(dep, { isDynamicImport: true }));
    if ("externalize" in fetchResult) {
      const { externalize } = fetchResult;
      (_a = this.debug) == null ? void 0 : _a.call(this, "[vite-runtime] externalizing", externalize);
      const exports2 = await this.runner.runExternalModule(externalize);
      return mod.exports = exports2, exports2;
    }
    const { code, file } = fetchResult;
    if (code == null) {
      const importer = callstack[callstack.length - 2];
      throw new Error(
        `[vite-runtime] Failed to load "${id}"${importer ? ` imported from ${importer}` : ""}`
      );
    }
    const modulePath = cleanUrl(file || moduleId), href = posixPathToFileHref(modulePath), filename = modulePath, dirname2 = posixDirname(modulePath), meta = {
      filename: isWindows ? toWindowsPath(filename) : filename,
      dirname: isWindows ? toWindowsPath(dirname2) : dirname2,
      url: href,
      env: this.envProxy,
      resolve(id2, parent) {
        throw new Error(
          '[vite-runtime] "import.meta.resolve" is not supported.'
        );
      },
      // should be replaced during transformation
      glob() {
        throw new Error('[vite-runtime] "import.meta.glob" is not supported.');
      }
    }, exports = /* @__PURE__ */ Object.create(null);
    Object.defineProperty(exports, Symbol.toStringTag, {
      value: "Module",
      enumerable: false,
      configurable: false
    }), mod.exports = exports;
    let hotContext;
    this.hmrClient && Object.defineProperty(meta, "hot", {
      enumerable: true,
      get: () => {
        var _a2;
        if (!this.hmrClient)
          throw new Error("[vite-runtime] HMR client was destroyed.");
        return (_a2 = this.debug) == null ? void 0 : _a2.call(this, "[vite-runtime] creating hmr context for", moduleId), hotContext || (hotContext = new HMRContext(this.hmrClient, moduleId)), hotContext;
      },
      set: (value) => {
        hotContext = value;
      }
    });
    const context = {
      [ssrImportKey]: request,
      [ssrDynamicImportKey]: dynamicRequest,
      [ssrModuleExportsKey]: exports,
      [ssrExportAllKey]: (obj) => exportAll(exports, obj),
      [ssrImportMetaKey]: meta
    };
    return (_b = this.debug) == null ? void 0 : _b.call(this, "[vite-runtime] executing", href), await this.runner.runViteModule(context, code, id), exports;
  }
};
function exportAll(exports, sourceModule) {
  if (exports !== sourceModule && !(isPrimitive(sourceModule) || Array.isArray(sourceModule) || sourceModule instanceof Promise)) {
    for (const key in sourceModule)
      if (key !== "default" && key !== "__esModule")
        try {
          Object.defineProperty(exports, key, {
            enumerable: true,
            configurable: true,
            get: () => sourceModule[key]
          });
        } catch {
        }
  }
}
var ESModulesRunner = class {
  async runViteModule(context, code) {
    await new AsyncFunction(
      ssrModuleExportsKey,
      ssrImportMetaKey,
      ssrImportKey,
      ssrDynamicImportKey,
      ssrExportAllKey,
      // source map should already be inlined by Vite
      '"use strict";' + code
    )(
      context[ssrModuleExportsKey],
      context[ssrImportMetaKey],
      context[ssrImportKey],
      context[ssrDynamicImportKey],
      context[ssrExportAllKey]
    ), Object.seal(context[ssrModuleExportsKey]);
  }
  runExternalModule(filepath) {
    return import(filepath);
  }
};

// node_modules/vite/dist/node/index.js
var import_promises = __toESM(require_promises());
var import_node_path = __toESM(require_node_path());
var import_node_url = __toESM(require_node_url());
var import_node_util = __toESM(require_node_util());
var import_node_perf_hooks = __toESM(require_node_perf_hooks());
var import_node_module = __toESM(require_node_module());
var import_tty = __toESM(require_tty());
var import_path = __toESM(require_path());
var import_fs = __toESM(require_fs());
var import_node_events = __toESM(require_node_events());
var import_node_stream = __toESM(require_node_stream());
var import_node_string_decoder = __toESM(require_node_string_decoder());
var import_node_child_process = __toESM(require_node_child_process());
var import_node_http = __toESM(require_node_http());
var import_node_https = __toESM(require_node_https());
var import_util = __toESM(require_util());
var import_net = __toESM(require_net());
var import_events = __toESM(require_events());
var import_url = __toESM(require_url());
var import_http = __toESM(require_http());
var import_stream = __toESM(require_stream());
var import_os = __toESM(require_os());
var import_child_process = __toESM(require_child_process());
var import_node_os = __toESM(require_node_os());
var import_node_crypto = __toESM(require_node_crypto());
var import_node_dns = __toESM(require_node_dns());
var import_crypto = __toESM(require_crypto());
var import_module = __toESM(require_module());
var import_node_assert = __toESM(require_node_assert());
var import_node_v8 = __toESM(require_node_v8());
var import_node_worker_threads = __toESM(require_node_worker_threads());
var import_node_buffer = __toESM(require_node_buffer());
var import_querystring = __toESM(require_querystring());
var import_node_readline = __toESM(require_node_readline());
var import_zlib = __toESM(require_zlib());
var import_buffer = __toESM(require_buffer());
var import_https = __toESM(require_https());
var import_tls = __toESM(require_tls());
var import_assert = __toESM(require_assert());
var import_node_zlib = __toESM(require_node_zlib());
var CSS_LANGS_RE = (
  // eslint-disable-next-line regexp/no-unused-capturing-group
  /\.(css|less|sass|scss|styl|stylus|pcss|postcss|sss)(?:$|\?)/
);
var isCSSRequest = (request) => CSS_LANGS_RE.test(request);
var SplitVendorChunkCache = class {
  constructor() {
    __publicField(this, "cache");
    this.cache = /* @__PURE__ */ new Map();
  }
  reset() {
    this.cache = /* @__PURE__ */ new Map();
  }
};
function splitVendorChunk(options = {}) {
  const cache = options.cache ?? new SplitVendorChunkCache();
  return (id, { getModuleInfo }) => {
    if (isInNodeModules$1(id) && !isCSSRequest(id) && staticImportedByEntry(id, getModuleInfo, cache.cache)) {
      return "vendor";
    }
  };
}
function staticImportedByEntry(id, getModuleInfo, cache, importStack = []) {
  if (cache.has(id)) {
    return cache.get(id);
  }
  if (importStack.includes(id)) {
    cache.set(id, false);
    return false;
  }
  const mod = getModuleInfo(id);
  if (!mod) {
    cache.set(id, false);
    return false;
  }
  if (mod.isEntry) {
    cache.set(id, true);
    return true;
  }
  const someImporterIs = mod.importers.some(
    (importer) => staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  );
  cache.set(id, someImporterIs);
  return someImporterIs;
}
function splitVendorChunkPlugin() {
  const caches = [];
  function createSplitVendorChunk(output, config) {
    const cache = new SplitVendorChunkCache();
    caches.push(cache);
    const build2 = config.build ?? {};
    const format = output == null ? void 0 : output.format;
    if (!build2.ssr && !build2.lib && format !== "umd" && format !== "iife") {
      return splitVendorChunk({ cache });
    }
  }
  return {
    name: "vite:split-vendor-chunk",
    config(config) {
      var _a, _b;
      let outputs = (_b = (_a = config == null ? void 0 : config.build) == null ? void 0 : _a.rollupOptions) == null ? void 0 : _b.output;
      if (outputs) {
        outputs = arraify(outputs);
        for (const output of outputs) {
          const viteManualChunks = createSplitVendorChunk(output, config);
          if (viteManualChunks) {
            if (output.manualChunks) {
              if (typeof output.manualChunks === "function") {
                const userManualChunks = output.manualChunks;
                output.manualChunks = (id, api) => {
                  return userManualChunks(id, api) ?? viteManualChunks(id, api);
                };
              } else {
                console.warn(
                  "(!) the `splitVendorChunk` plugin doesn't have any effect when using the object form of `build.rollupOptions.output.manualChunks`. Consider using the function form instead."
                );
              }
            } else {
              output.manualChunks = viteManualChunks;
            }
          }
        }
      } else {
        return {
          build: {
            rollupOptions: {
              output: {
                manualChunks: createSplitVendorChunk({}, config)
              }
            }
          }
        };
      }
    },
    buildStart() {
      caches.forEach((cache) => cache.reset());
    }
  };
}
var ServerHMRBroadcasterClient = class {
  constructor(hmrChannel) {
    this.hmrChannel = hmrChannel;
  }
  send(...args) {
    let payload;
    if (typeof args[0] === "string") {
      payload = {
        type: "custom",
        event: args[0],
        data: args[1]
      };
    } else {
      payload = args[0];
    }
    if (payload.type !== "custom") {
      throw new Error(
        "Cannot send non-custom events from the client to the server."
      );
    }
    this.hmrChannel.send(payload);
  }
};
var ServerHMRConnector = class {
  constructor(server) {
    __publicField(this, "handlers", []);
    __publicField(this, "hmrChannel");
    __publicField(this, "hmrClient");
    __publicField(this, "connected", false);
    var _a;
    const hmrChannel = (_a = server.hot) == null ? void 0 : _a.channels.find(
      (c) => c.name === "ssr"
    );
    if (!hmrChannel) {
      throw new Error(
        "Your version of Vite doesn't support HMR during SSR. Please, use Vite 5.1 or higher."
      );
    }
    this.hmrClient = new ServerHMRBroadcasterClient(hmrChannel);
    hmrChannel.api.outsideEmitter.on("send", (payload) => {
      this.handlers.forEach((listener) => listener(payload));
    });
    this.hmrChannel = hmrChannel;
  }
  isReady() {
    return this.connected;
  }
  send(message) {
    const payload = JSON.parse(message);
    this.hmrChannel.api.innerEmitter.emit(
      payload.event,
      payload.data,
      this.hmrClient
    );
  }
  onUpdate(handler) {
    this.handlers.push(handler);
    handler({ type: "connected" });
    this.connected = true;
  }
};
function createHMROptions(server, options) {
  var _a;
  if (server.config.server.hmr === false || options.hmr === false) {
    return false;
  }
  const connection = new ServerHMRConnector(server);
  return {
    connection,
    logger: (_a = options.hmr) == null ? void 0 : _a.logger
  };
}
var prepareStackTrace2 = {
  retrieveFile(id) {
    if ((0, import_node_fs.existsSync)(id)) {
      return (0, import_node_fs.readFileSync)(id, "utf-8");
    }
  }
};
function resolveSourceMapOptions(options) {
  if (options.sourcemapInterceptor != null) {
    if (options.sourcemapInterceptor === "prepareStackTrace") {
      return prepareStackTrace2;
    }
    if (typeof options.sourcemapInterceptor === "object") {
      return { ...prepareStackTrace2, ...options.sourcemapInterceptor };
    }
    return options.sourcemapInterceptor;
  }
  if (typeof process !== "undefined" && "setSourceMapsEnabled" in process) {
    return "node";
  }
  return prepareStackTrace2;
}
async function createViteRuntime(server, options = {}) {
  const hmr = createHMROptions(server, options);
  return new ViteRuntime(
    {
      ...options,
      root: server.config.root,
      fetchModule: server.ssrFetchModule,
      hmr,
      sourcemapInterceptor: resolveSourceMapOptions(options)
    },
    options.runner || new ESModulesRunner()
  );
}
var export_esbuildVersion = import_esbuild.version;
export {
  ServerHMRConnector,
  build,
  buildErrorMessage,
  createFilter,
  createLogger,
  createServer,
  createViteRuntime,
  defineConfig,
  export_esbuildVersion as esbuildVersion,
  fetchModule,
  formatPostcssSourceMap,
  isCSSRequest,
  isFileServingAllowed,
  loadConfigFromFile,
  loadEnv,
  mergeAlias,
  mergeConfig,
  normalizePath$3 as normalizePath,
  optimizeDeps,
  parseAst,
  parseAstAsync,
  preprocessCSS,
  preview,
  resolveConfig,
  resolveEnvPrefix,
  rollupVersion,
  searchForWorkspaceRoot,
  send,
  sortUserPlugins,
  splitVendorChunk,
  splitVendorChunkPlugin,
  transformWithEsbuild,
  VERSION as version
};
//# sourceMappingURL=vite.js.map
