import {
  lib
} from "./chunk-IDGMCLDH.js";
import {
  postcss_default
} from "./chunk-B2BST3Q5.js";
import {
  commonjsGlobal,
  getDefaultExportFromCjs,
  require_crypto
} from "./chunk-UGCJFHR6.js";
import {
  require_util
} from "./chunk-KPGLAEFU.js";
import "./chunk-RX7BTZZI.js";
import "./chunk-X45QO7DX.js";
import "./chunk-OZBCPRVH.js";
import {
  require_node_module,
  require_node_url
} from "./chunk-G2ZEZZAJ.js";
import {
  require_node_path
} from "./chunk-M2MSWSHF.js";
import "./chunk-MPVQUUHK.js";
import {
  require_fs
} from "./chunk-I5RSIQOR.js";
import {
  require_path
} from "./chunk-4XRL7ZXG.js";
import {
  __toESM
} from "./chunk-ZSMWDLMK.js";

// node_modules/vite/dist/node/chunks/dep-BaJt-LTH.js
var import_fs = __toESM(require_fs(), 1);
var import_path = __toESM(require_path(), 1);
var import_crypto = __toESM(require_crypto(), 1);
var import_util = __toESM(require_util(), 1);
var import_node_url = __toESM(require_node_url(), 1);
var import_node_path = __toESM(require_node_path(), 1);
var import_node_module = __toESM(require_node_module(), 1);
var __filename = (0, import_node_url.fileURLToPath)(import.meta.url);
var __dirname = (0, import_node_path.dirname)(__filename);
var require2 = (0, import_node_module.createRequire)(import.meta.url);
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    var e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (var k in e) {
        if (k !== "default" && !(k in n)) {
          n[k] = e[k];
        }
      }
    }
  }
  return n;
}
var build = { exports: {} };
var fs = {};
Object.defineProperty(fs, "__esModule", {
  value: true
});
fs.getFileSystem = getFileSystem;
fs.setFileSystem = setFileSystem;
var fileSystem = {
  readFile: () => {
    throw Error("readFile not implemented");
  },
  writeFile: () => {
    throw Error("writeFile not implemented");
  }
};
function setFileSystem(fs2) {
  fileSystem.readFile = fs2.readFile;
  fileSystem.writeFile = fs2.writeFile;
}
function getFileSystem() {
  return fileSystem;
}
var pluginFactory = {};
var unquote$1 = {};
Object.defineProperty(unquote$1, "__esModule", {
  value: true
});
unquote$1.default = unquote;
var reg = /['"]/;
function unquote(str2) {
  if (!str2) {
    return "";
  }
  if (reg.test(str2.charAt(0))) {
    str2 = str2.substr(1);
  }
  if (reg.test(str2.charAt(str2.length - 1))) {
    str2 = str2.substr(0, str2.length - 1);
  }
  return str2;
}
var Parser$1 = {};
var matchValueName = /[$]?[\w-]+/g;
var replaceValueSymbols$2 = (value, replacements) => {
  let matches;
  while (matches = matchValueName.exec(value)) {
    const replacement = replacements[matches[0]];
    if (replacement) {
      value = value.slice(0, matches.index) + replacement + value.slice(matchValueName.lastIndex);
      matchValueName.lastIndex -= matches[0].length - replacement.length;
    }
  }
  return value;
};
var replaceValueSymbols_1 = replaceValueSymbols$2;
var replaceValueSymbols$1 = replaceValueSymbols_1;
var replaceSymbols$1 = (css, replacements) => {
  css.walk((node2) => {
    if (node2.type === "decl" && node2.value) {
      node2.value = replaceValueSymbols$1(node2.value.toString(), replacements);
    } else if (node2.type === "rule" && node2.selector) {
      node2.selector = replaceValueSymbols$1(
        node2.selector.toString(),
        replacements
      );
    } else if (node2.type === "atrule" && node2.params) {
      node2.params = replaceValueSymbols$1(node2.params.toString(), replacements);
    }
  });
};
var replaceSymbols_1 = replaceSymbols$1;
var importPattern = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;
var balancedQuotes = /^("[^"]*"|'[^']*'|[^"']+)$/;
var getDeclsObject = (rule) => {
  const object2 = {};
  rule.walkDecls((decl) => {
    const before = decl.raws.before ? decl.raws.before.trim() : "";
    object2[before + decl.prop] = decl.value;
  });
  return object2;
};
var extractICSS$2 = (css, removeRules = true, mode = "auto") => {
  const icssImports = {};
  const icssExports = {};
  function addImports(node2, path2) {
    const unquoted = path2.replace(/'|"/g, "");
    icssImports[unquoted] = Object.assign(
      icssImports[unquoted] || {},
      getDeclsObject(node2)
    );
    if (removeRules) {
      node2.remove();
    }
  }
  function addExports(node2) {
    Object.assign(icssExports, getDeclsObject(node2));
    if (removeRules) {
      node2.remove();
    }
  }
  css.each((node2) => {
    if (node2.type === "rule" && mode !== "at-rule") {
      if (node2.selector.slice(0, 7) === ":import") {
        const matches = importPattern.exec(node2.selector);
        if (matches) {
          addImports(node2, matches[1]);
        }
      }
      if (node2.selector === ":export") {
        addExports(node2);
      }
    }
    if (node2.type === "atrule" && mode !== "rule") {
      if (node2.name === "icss-import") {
        const matches = balancedQuotes.exec(node2.params);
        if (matches) {
          addImports(node2, matches[1]);
        }
      }
      if (node2.name === "icss-export") {
        addExports(node2);
      }
    }
  });
  return { icssImports, icssExports };
};
var extractICSS_1 = extractICSS$2;
var createImports = (imports, postcss2, mode = "rule") => {
  return Object.keys(imports).map((path2) => {
    const aliases = imports[path2];
    const declarations = Object.keys(aliases).map(
      (key) => postcss2.decl({
        prop: key,
        value: aliases[key],
        raws: { before: "\n  " }
      })
    );
    const hasDeclarations = declarations.length > 0;
    const rule = mode === "rule" ? postcss2.rule({
      selector: `:import('${path2}')`,
      raws: { after: hasDeclarations ? "\n" : "" }
    }) : postcss2.atRule({
      name: "icss-import",
      params: `'${path2}'`,
      raws: { after: hasDeclarations ? "\n" : "" }
    });
    if (hasDeclarations) {
      rule.append(declarations);
    }
    return rule;
  });
};
var createExports = (exports, postcss2, mode = "rule") => {
  const declarations = Object.keys(exports).map(
    (key) => postcss2.decl({
      prop: key,
      value: exports[key],
      raws: { before: "\n  " }
    })
  );
  if (declarations.length === 0) {
    return [];
  }
  const rule = mode === "rule" ? postcss2.rule({
    selector: `:export`,
    raws: { after: "\n" }
  }) : postcss2.atRule({
    name: "icss-export",
    raws: { after: "\n" }
  });
  rule.append(declarations);
  return [rule];
};
var createICSSRules$1 = (imports, exports, postcss2, mode) => [
  ...createImports(imports, postcss2, mode),
  ...createExports(exports, postcss2, mode)
];
var createICSSRules_1 = createICSSRules$1;
var replaceValueSymbols = replaceValueSymbols_1;
var replaceSymbols = replaceSymbols_1;
var extractICSS$1 = extractICSS_1;
var createICSSRules = createICSSRules_1;
var src$4 = {
  replaceValueSymbols,
  replaceSymbols,
  extractICSS: extractICSS$1,
  createICSSRules
};
Object.defineProperty(Parser$1, "__esModule", {
  value: true
});
Parser$1.default = void 0;
var _icssUtils = src$4;
var importRegexp = /^:import\((.+)\)$/;
var Parser = class {
  constructor(pathFetcher, trace) {
    this.pathFetcher = pathFetcher;
    this.plugin = this.plugin.bind(this);
    this.exportTokens = {};
    this.translations = {};
    this.trace = trace;
  }
  plugin() {
    const parser2 = this;
    return {
      postcssPlugin: "css-modules-parser",
      async OnceExit(css) {
        await Promise.all(parser2.fetchAllImports(css));
        parser2.linkImportedSymbols(css);
        return parser2.extractExports(css);
      }
    };
  }
  fetchAllImports(css) {
    let imports = [];
    css.each((node2) => {
      if (node2.type == "rule" && node2.selector.match(importRegexp)) {
        imports.push(this.fetchImport(node2, css.source.input.from, imports.length));
      }
    });
    return imports;
  }
  linkImportedSymbols(css) {
    (0, _icssUtils.replaceSymbols)(css, this.translations);
  }
  extractExports(css) {
    css.each((node2) => {
      if (node2.type == "rule" && node2.selector == ":export") this.handleExport(node2);
    });
  }
  handleExport(exportNode) {
    exportNode.each((decl) => {
      if (decl.type == "decl") {
        Object.keys(this.translations).forEach((translation) => {
          decl.value = decl.value.replace(translation, this.translations[translation]);
        });
        this.exportTokens[decl.prop] = decl.value;
      }
    });
    exportNode.remove();
  }
  async fetchImport(importNode, relativeTo, depNr) {
    const file = importNode.selector.match(importRegexp)[1];
    const depTrace = this.trace + String.fromCharCode(depNr);
    const exports = await this.pathFetcher(file, relativeTo, depTrace);
    try {
      importNode.each((decl) => {
        if (decl.type == "decl") {
          this.translations[decl.prop] = exports[decl.value];
        }
      });
      importNode.remove();
    } catch (err) {
      console.log(err);
    }
  }
};
Parser$1.default = Parser;
var saveJSON$1 = {};
Object.defineProperty(saveJSON$1, "__esModule", {
  value: true
});
saveJSON$1.default = saveJSON;
var _fs$2 = fs;
function saveJSON(cssFile, json) {
  return new Promise((resolve, reject) => {
    const {
      writeFile
    } = (0, _fs$2.getFileSystem)();
    writeFile(`${cssFile}.json`, JSON.stringify(json), (e) => e ? reject(e) : resolve(json));
  });
}
var localsConvention = {};
var INFINITY = 1 / 0;
var symbolTag = "[object Symbol]";
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
var rsComboSymbolsRange = "\\u20d0-\\u20f0";
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['’]";
var rsAstral = "[" + rsAstralRange + "]";
var rsBreak = "[" + rsBreakRange + "]";
var rsCombo = "[" + rsComboMarksRange + rsComboSymbolsRange + "]";
var rsDigits = "\\d+";
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = "[" + rsUpperRange + "]";
var rsZWJ = "\\u200d";
var rsLowerMisc = "(?:" + rsLower + "|" + rsMisc + ")";
var rsUpperMisc = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptLowerContr = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptUpperContr = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange + "]?";
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
var reApos = RegExp(rsApos, "g");
var reComboMark = RegExp(rsCombo, "g");
var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptLowerContr + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsUpperMisc + "+" + rsOptUpperContr + "(?=" + [rsBreak, rsUpper + rsLowerMisc, "$"].join("|") + ")",
  rsUpper + "?" + rsLowerMisc + "+" + rsOptLowerContr,
  rsUpper + "+" + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join("|"), "g");
var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + "]");
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
var deburredLetters = {
  // Latin-1 Supplement block.
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "Ç": "C",
  "ç": "c",
  "Ð": "D",
  "ð": "d",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "Ñ": "N",
  "ñ": "n",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "Ý": "Y",
  "ý": "y",
  "ÿ": "y",
  "Æ": "Ae",
  "æ": "ae",
  "Þ": "Th",
  "þ": "th",
  "ß": "ss",
  // Latin Extended-A block.
  "Ā": "A",
  "Ă": "A",
  "Ą": "A",
  "ā": "a",
  "ă": "a",
  "ą": "a",
  "Ć": "C",
  "Ĉ": "C",
  "Ċ": "C",
  "Č": "C",
  "ć": "c",
  "ĉ": "c",
  "ċ": "c",
  "č": "c",
  "Ď": "D",
  "Đ": "D",
  "ď": "d",
  "đ": "d",
  "Ē": "E",
  "Ĕ": "E",
  "Ė": "E",
  "Ę": "E",
  "Ě": "E",
  "ē": "e",
  "ĕ": "e",
  "ė": "e",
  "ę": "e",
  "ě": "e",
  "Ĝ": "G",
  "Ğ": "G",
  "Ġ": "G",
  "Ģ": "G",
  "ĝ": "g",
  "ğ": "g",
  "ġ": "g",
  "ģ": "g",
  "Ĥ": "H",
  "Ħ": "H",
  "ĥ": "h",
  "ħ": "h",
  "Ĩ": "I",
  "Ī": "I",
  "Ĭ": "I",
  "Į": "I",
  "İ": "I",
  "ĩ": "i",
  "ī": "i",
  "ĭ": "i",
  "į": "i",
  "ı": "i",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "ĸ": "k",
  "Ĺ": "L",
  "Ļ": "L",
  "Ľ": "L",
  "Ŀ": "L",
  "Ł": "L",
  "ĺ": "l",
  "ļ": "l",
  "ľ": "l",
  "ŀ": "l",
  "ł": "l",
  "Ń": "N",
  "Ņ": "N",
  "Ň": "N",
  "Ŋ": "N",
  "ń": "n",
  "ņ": "n",
  "ň": "n",
  "ŋ": "n",
  "Ō": "O",
  "Ŏ": "O",
  "Ő": "O",
  "ō": "o",
  "ŏ": "o",
  "ő": "o",
  "Ŕ": "R",
  "Ŗ": "R",
  "Ř": "R",
  "ŕ": "r",
  "ŗ": "r",
  "ř": "r",
  "Ś": "S",
  "Ŝ": "S",
  "Ş": "S",
  "Š": "S",
  "ś": "s",
  "ŝ": "s",
  "ş": "s",
  "š": "s",
  "Ţ": "T",
  "Ť": "T",
  "Ŧ": "T",
  "ţ": "t",
  "ť": "t",
  "ŧ": "t",
  "Ũ": "U",
  "Ū": "U",
  "Ŭ": "U",
  "Ů": "U",
  "Ű": "U",
  "Ų": "U",
  "ũ": "u",
  "ū": "u",
  "ŭ": "u",
  "ů": "u",
  "ű": "u",
  "ų": "u",
  "Ŵ": "W",
  "ŵ": "w",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Ź": "Z",
  "Ż": "Z",
  "Ž": "Z",
  "ź": "z",
  "ż": "z",
  "ž": "z",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Œ": "Oe",
  "œ": "oe",
  "ŉ": "'n",
  "ſ": "ss"
};
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root$2 = freeGlobal || freeSelf || Function("return this")();
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index2 = -1, length = array ? array.length : 0;
  while (++index2 < length) {
    accumulator = iteratee(accumulator, array[index2], index2, array);
  }
  return accumulator;
}
function asciiToArray(string3) {
  return string3.split("");
}
function asciiWords(string3) {
  return string3.match(reAsciiWord) || [];
}
function basePropertyOf(object2) {
  return function(key) {
    return object2 == null ? void 0 : object2[key];
  };
}
var deburrLetter = basePropertyOf(deburredLetters);
function hasUnicode(string3) {
  return reHasUnicode.test(string3);
}
function hasUnicodeWord(string3) {
  return reHasUnicodeWord.test(string3);
}
function stringToArray(string3) {
  return hasUnicode(string3) ? unicodeToArray(string3) : asciiToArray(string3);
}
function unicodeToArray(string3) {
  return string3.match(reUnicode) || [];
}
function unicodeWords(string3) {
  return string3.match(reUnicodeWord) || [];
}
var objectProto = Object.prototype;
var objectToString = objectProto.toString;
var Symbol$1 = root$2.Symbol;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0;
var symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseSlice(array, start, end) {
  var index2 = -1, length = array.length;
  if (start < 0) {
    start = -start > length ? 0 : length + start;
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : end - start >>> 0;
  start >>>= 0;
  var result = Array(length);
  while (++index2 < length) {
    result[index2] = array[index2 + start];
  }
  return result;
}
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
function castSlice(array, start, end) {
  var length = array.length;
  end = end === void 0 ? length : end;
  return !start && end >= length ? array : baseSlice(array, start, end);
}
function createCaseFirst(methodName) {
  return function(string3) {
    string3 = toString(string3);
    var strSymbols = hasUnicode(string3) ? stringToArray(string3) : void 0;
    var chr = strSymbols ? strSymbols[0] : string3.charAt(0);
    var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string3.slice(1);
    return chr[methodName]() + trailing;
  };
}
function createCompounder(callback) {
  return function(string3) {
    return arrayReduce(words(deburr(string3).replace(reApos, "")), callback, "");
  };
}
function isObjectLike(value) {
  return !!value && typeof value == "object";
}
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
function toString(value) {
  return value == null ? "" : baseToString(value);
}
var camelCase = createCompounder(function(result, word2, index2) {
  word2 = word2.toLowerCase();
  return result + (index2 ? capitalize(word2) : word2);
});
function capitalize(string3) {
  return upperFirst(toString(string3).toLowerCase());
}
function deburr(string3) {
  string3 = toString(string3);
  return string3 && string3.replace(reLatin, deburrLetter).replace(reComboMark, "");
}
var upperFirst = createCaseFirst("toUpperCase");
function words(string3, pattern, guard) {
  string3 = toString(string3);
  pattern = pattern;
  if (pattern === void 0) {
    return hasUnicodeWord(string3) ? unicodeWords(string3) : asciiWords(string3);
  }
  return string3.match(pattern) || [];
}
var lodash_camelcase = camelCase;
Object.defineProperty(localsConvention, "__esModule", {
  value: true
});
localsConvention.makeLocalsConventionReducer = makeLocalsConventionReducer;
var _lodash = _interopRequireDefault$5(lodash_camelcase);
function _interopRequireDefault$5(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function dashesCamelCase(string3) {
  return string3.replace(/-+(\w)/g, (_, firstLetter) => firstLetter.toUpperCase());
}
function makeLocalsConventionReducer(localsConvention2, inputFile) {
  const isFunc = typeof localsConvention2 === "function";
  return (tokens, [className3, value]) => {
    if (isFunc) {
      const convention = localsConvention2(className3, value, inputFile);
      tokens[convention] = value;
      return tokens;
    }
    switch (localsConvention2) {
      case "camelCase":
        tokens[className3] = value;
        tokens[(0, _lodash.default)(className3)] = value;
        break;
      case "camelCaseOnly":
        tokens[(0, _lodash.default)(className3)] = value;
        break;
      case "dashes":
        tokens[className3] = value;
        tokens[dashesCamelCase(className3)] = value;
        break;
      case "dashesOnly":
        tokens[dashesCamelCase(className3)] = value;
        break;
    }
    return tokens;
  };
}
var FileSystemLoader$1 = {};
Object.defineProperty(FileSystemLoader$1, "__esModule", {
  value: true
});
FileSystemLoader$1.default = void 0;
var _postcss$1 = _interopRequireDefault$4(postcss_default);
var _path = _interopRequireDefault$4(import_path.default);
var _Parser$1 = _interopRequireDefault$4(Parser$1);
var _fs$1 = fs;
function _interopRequireDefault$4(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var Core = class _Core {
  constructor(plugins) {
    this.plugins = plugins || _Core.defaultPlugins;
  }
  async load(sourceString, sourcePath, trace, pathFetcher) {
    const parser2 = new _Parser$1.default(pathFetcher, trace);
    const plugins = this.plugins.concat([parser2.plugin()]);
    const result = await (0, _postcss$1.default)(plugins).process(sourceString, {
      from: sourcePath
    });
    return {
      injectableSource: result.css,
      exportTokens: parser2.exportTokens
    };
  }
};
var traceKeySorter = (a, b) => {
  if (a.length < b.length) {
    return a < b.substring(0, a.length) ? -1 : 1;
  }
  if (a.length > b.length) {
    return a.substring(0, b.length) <= b ? -1 : 1;
  }
  return a < b ? -1 : 1;
};
var FileSystemLoader = class {
  constructor(root3, plugins, fileResolve) {
    if (root3 === "/" && process.platform === "win32") {
      const cwdDrive = process.cwd().slice(0, 3);
      if (!/^[A-Za-z]:\\$/.test(cwdDrive)) {
        throw new Error(`Failed to obtain root from "${process.cwd()}".`);
      }
      root3 = cwdDrive;
    }
    this.root = root3;
    this.fileResolve = fileResolve;
    this.sources = {};
    this.traces = {};
    this.importNr = 0;
    this.core = new Core(plugins);
    this.tokensByFile = {};
    this.fs = (0, _fs$1.getFileSystem)();
  }
  async fetch(_newPath, relativeTo, _trace) {
    const newPath = _newPath.replace(/^["']|["']$/g, "");
    const trace = _trace || String.fromCharCode(this.importNr++);
    const useFileResolve = typeof this.fileResolve === "function";
    const fileResolvedPath = useFileResolve ? await this.fileResolve(newPath, relativeTo) : await Promise.resolve();
    if (fileResolvedPath && !_path.default.isAbsolute(fileResolvedPath)) {
      throw new Error('The returned path from the "fileResolve" option must be absolute.');
    }
    const relativeDir = _path.default.dirname(relativeTo);
    const rootRelativePath = fileResolvedPath || _path.default.resolve(relativeDir, newPath);
    let fileRelativePath = fileResolvedPath || _path.default.resolve(_path.default.resolve(this.root, relativeDir), newPath);
    if (!useFileResolve && newPath[0] !== "." && !_path.default.isAbsolute(newPath)) {
      try {
        fileRelativePath = require2.resolve(newPath);
      } catch (e) {
      }
    }
    const tokens = this.tokensByFile[fileRelativePath];
    if (tokens) return tokens;
    return new Promise((resolve, reject) => {
      this.fs.readFile(fileRelativePath, "utf-8", async (err, source) => {
        if (err) reject(err);
        const {
          injectableSource,
          exportTokens
        } = await this.core.load(source, rootRelativePath, trace, this.fetch.bind(this));
        this.sources[fileRelativePath] = injectableSource;
        this.traces[trace] = fileRelativePath;
        this.tokensByFile[fileRelativePath] = exportTokens;
        resolve(exportTokens);
      });
    });
  }
  get finalSource() {
    const traces = this.traces;
    const sources = this.sources;
    let written = /* @__PURE__ */ new Set();
    return Object.keys(traces).sort(traceKeySorter).map((key) => {
      const filename = traces[key];
      if (written.has(filename)) {
        return null;
      }
      written.add(filename);
      return sources[filename];
    }).join("");
  }
};
FileSystemLoader$1.default = FileSystemLoader;
var scoping = {};
var src$3 = { exports: {} };
var PERMANENT_MARKER = 2;
var TEMPORARY_MARKER = 1;
function createError(node2, graph) {
  const er = new Error("Nondeterministic import's order");
  const related = graph[node2];
  const relatedNode = related.find(
    (relatedNode2) => graph[relatedNode2].indexOf(node2) > -1
  );
  er.nodes = [node2, relatedNode];
  return er;
}
function walkGraph(node2, graph, state, result, strict) {
  if (state[node2] === PERMANENT_MARKER) {
    return;
  }
  if (state[node2] === TEMPORARY_MARKER) {
    if (strict) {
      return createError(node2, graph);
    }
    return;
  }
  state[node2] = TEMPORARY_MARKER;
  const children = graph[node2];
  const length = children.length;
  for (let i = 0; i < length; ++i) {
    const error = walkGraph(children[i], graph, state, result, strict);
    if (error instanceof Error) {
      return error;
    }
  }
  state[node2] = PERMANENT_MARKER;
  result.push(node2);
}
function topologicalSort$1(graph, strict) {
  const result = [];
  const state = {};
  const nodes = Object.keys(graph);
  const length = nodes.length;
  for (let i = 0; i < length; ++i) {
    const er = walkGraph(nodes[i], graph, state, result, strict);
    if (er instanceof Error) {
      return er;
    }
  }
  return result;
}
var topologicalSort_1 = topologicalSort$1;
var topologicalSort = topologicalSort_1;
var matchImports$1 = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
var icssImport = /^:import\((?:"([^"]+)"|'([^']+)')\)/;
var VISITED_MARKER = 1;
function addImportToGraph(importId, parentId, graph, visited) {
  const siblingsId = parentId + "_siblings";
  const visitedId = parentId + "_" + importId;
  if (visited[visitedId] !== VISITED_MARKER) {
    if (!Array.isArray(visited[siblingsId])) {
      visited[siblingsId] = [];
    }
    const siblings = visited[siblingsId];
    if (Array.isArray(graph[importId])) {
      graph[importId] = graph[importId].concat(siblings);
    } else {
      graph[importId] = siblings.slice();
    }
    visited[visitedId] = VISITED_MARKER;
    siblings.push(importId);
  }
}
src$3.exports = (options = {}) => {
  let importIndex = 0;
  const createImportedName = typeof options.createImportedName !== "function" ? (importName) => `i__imported_${importName.replace(/\W/g, "_")}_${importIndex++}` : options.createImportedName;
  const failOnWrongOrder = options.failOnWrongOrder;
  return {
    postcssPlugin: "postcss-modules-extract-imports",
    prepare() {
      const graph = {};
      const visited = {};
      const existingImports = {};
      const importDecls = {};
      const imports = {};
      return {
        Once(root3, postcss2) {
          root3.walkRules((rule) => {
            const matches = icssImport.exec(rule.selector);
            if (matches) {
              const [
                ,
                /*match*/
                doubleQuotePath,
                singleQuotePath
              ] = matches;
              const importPath = doubleQuotePath || singleQuotePath;
              addImportToGraph(importPath, "root", graph, visited);
              existingImports[importPath] = rule;
            }
          });
          root3.walkDecls(/^composes$/, (declaration) => {
            const matches = declaration.value.match(matchImports$1);
            if (!matches) {
              return;
            }
            let tmpSymbols;
            let [
              ,
              /*match*/
              symbols,
              doubleQuotePath,
              singleQuotePath,
              global
            ] = matches;
            if (global) {
              tmpSymbols = symbols.split(/\s+/).map((s) => `global(${s})`);
            } else {
              const importPath = doubleQuotePath || singleQuotePath;
              let parent = declaration.parent;
              let parentIndexes = "";
              while (parent.type !== "root") {
                parentIndexes = parent.parent.index(parent) + "_" + parentIndexes;
                parent = parent.parent;
              }
              const { selector: selector3 } = declaration.parent;
              const parentRule = `_${parentIndexes}${selector3}`;
              addImportToGraph(importPath, parentRule, graph, visited);
              importDecls[importPath] = declaration;
              imports[importPath] = imports[importPath] || {};
              tmpSymbols = symbols.split(/\s+/).map((s) => {
                if (!imports[importPath][s]) {
                  imports[importPath][s] = createImportedName(s, importPath);
                }
                return imports[importPath][s];
              });
            }
            declaration.value = tmpSymbols.join(" ");
          });
          const importsOrder = topologicalSort(graph, failOnWrongOrder);
          if (importsOrder instanceof Error) {
            const importPath = importsOrder.nodes.find(
              (importPath2) => (
                // eslint-disable-next-line no-prototype-builtins
                importDecls.hasOwnProperty(importPath2)
              )
            );
            const decl = importDecls[importPath];
            throw decl.error(
              "Failed to resolve order of composed modules " + importsOrder.nodes.map((importPath2) => "`" + importPath2 + "`").join(", ") + ".",
              {
                plugin: "postcss-modules-extract-imports",
                word: "composes"
              }
            );
          }
          let lastImportRule;
          importsOrder.forEach((path2) => {
            const importedSymbols = imports[path2];
            let rule = existingImports[path2];
            if (!rule && importedSymbols) {
              rule = postcss2.rule({
                selector: `:import("${path2}")`,
                raws: { after: "\n" }
              });
              if (lastImportRule) {
                root3.insertAfter(lastImportRule, rule);
              } else {
                root3.prepend(rule);
              }
            }
            lastImportRule = rule;
            if (!importedSymbols) {
              return;
            }
            Object.keys(importedSymbols).forEach((importedSymbol) => {
              rule.append(
                postcss2.decl({
                  value: importedSymbol,
                  prop: importedSymbols[importedSymbol],
                  raws: { before: "\n  " }
                })
              );
            });
          });
        }
      };
    }
  };
};
src$3.exports.postcss = true;
var srcExports$2 = src$3.exports;
var wasmHash = { exports: {} };
var hasRequiredWasmHash;
function requireWasmHash() {
  if (hasRequiredWasmHash) return wasmHash.exports;
  hasRequiredWasmHash = 1;
  const MAX_SHORT_STRING = Math.floor((65536 - 64) / 4) & ~3;
  class WasmHash {
    /**
     * @param {WebAssembly.Instance} instance wasm instance
     * @param {WebAssembly.Instance[]} instancesPool pool of instances
     * @param {number} chunkSize size of data chunks passed to wasm
     * @param {number} digestSize size of digest returned by wasm
     */
    constructor(instance, instancesPool, chunkSize, digestSize) {
      const exports = (
        /** @type {any} */
        instance.exports
      );
      exports.init();
      this.exports = exports;
      this.mem = Buffer.from(exports.memory.buffer, 0, 65536);
      this.buffered = 0;
      this.instancesPool = instancesPool;
      this.chunkSize = chunkSize;
      this.digestSize = digestSize;
    }
    reset() {
      this.buffered = 0;
      this.exports.init();
    }
    /**
     * @param {Buffer | string} data data
     * @param {BufferEncoding=} encoding encoding
     * @returns {this} itself
     */
    update(data, encoding) {
      if (typeof data === "string") {
        while (data.length > MAX_SHORT_STRING) {
          this._updateWithShortString(data.slice(0, MAX_SHORT_STRING), encoding);
          data = data.slice(MAX_SHORT_STRING);
        }
        this._updateWithShortString(data, encoding);
        return this;
      }
      this._updateWithBuffer(data);
      return this;
    }
    /**
     * @param {string} data data
     * @param {BufferEncoding=} encoding encoding
     * @returns {void}
     */
    _updateWithShortString(data, encoding) {
      const { exports, buffered, mem, chunkSize } = this;
      let endPos;
      if (data.length < 70) {
        if (!encoding || encoding === "utf-8" || encoding === "utf8") {
          endPos = buffered;
          for (let i = 0; i < data.length; i++) {
            const cc = data.charCodeAt(i);
            if (cc < 128) {
              mem[endPos++] = cc;
            } else if (cc < 2048) {
              mem[endPos] = cc >> 6 | 192;
              mem[endPos + 1] = cc & 63 | 128;
              endPos += 2;
            } else {
              endPos += mem.write(data.slice(i), endPos, encoding);
              break;
            }
          }
        } else if (encoding === "latin1") {
          endPos = buffered;
          for (let i = 0; i < data.length; i++) {
            const cc = data.charCodeAt(i);
            mem[endPos++] = cc;
          }
        } else {
          endPos = buffered + mem.write(data, buffered, encoding);
        }
      } else {
        endPos = buffered + mem.write(data, buffered, encoding);
      }
      if (endPos < chunkSize) {
        this.buffered = endPos;
      } else {
        const l = endPos & ~(this.chunkSize - 1);
        exports.update(l);
        const newBuffered = endPos - l;
        this.buffered = newBuffered;
        if (newBuffered > 0) {
          mem.copyWithin(0, l, endPos);
        }
      }
    }
    /**
     * @param {Buffer} data data
     * @returns {void}
     */
    _updateWithBuffer(data) {
      const { exports, buffered, mem } = this;
      const length = data.length;
      if (buffered + length < this.chunkSize) {
        data.copy(mem, buffered, 0, length);
        this.buffered += length;
      } else {
        const l = buffered + length & ~(this.chunkSize - 1);
        if (l > 65536) {
          let i = 65536 - buffered;
          data.copy(mem, buffered, 0, i);
          exports.update(65536);
          const stop = l - buffered - 65536;
          while (i < stop) {
            data.copy(mem, 0, i, i + 65536);
            exports.update(65536);
            i += 65536;
          }
          data.copy(mem, 0, i, l - buffered);
          exports.update(l - buffered - i);
        } else {
          data.copy(mem, buffered, 0, l - buffered);
          exports.update(l);
        }
        const newBuffered = length + buffered - l;
        this.buffered = newBuffered;
        if (newBuffered > 0) {
          data.copy(mem, 0, length - newBuffered, length);
        }
      }
    }
    digest(type) {
      const { exports, buffered, mem, digestSize } = this;
      exports.final(buffered);
      this.instancesPool.push(this);
      const hex = mem.toString("latin1", 0, digestSize);
      if (type === "hex") {
        return hex;
      }
      if (type === "binary" || !type) {
        return Buffer.from(hex, "hex");
      }
      return Buffer.from(hex, "hex").toString(type);
    }
  }
  const create = (wasmModule, instancesPool, chunkSize, digestSize) => {
    if (instancesPool.length > 0) {
      const old = instancesPool.pop();
      old.reset();
      return old;
    } else {
      return new WasmHash(
        new WebAssembly.Instance(wasmModule),
        instancesPool,
        chunkSize,
        digestSize
      );
    }
  };
  wasmHash.exports = create;
  wasmHash.exports.MAX_SHORT_STRING = MAX_SHORT_STRING;
  return wasmHash.exports;
}
var xxhash64_1;
var hasRequiredXxhash64;
function requireXxhash64() {
  if (hasRequiredXxhash64) return xxhash64_1;
  hasRequiredXxhash64 = 1;
  const create = requireWasmHash();
  const xxhash64 = new WebAssembly.Module(
    Buffer.from(
      // 1173 bytes
      "AGFzbQEAAAABCAJgAX8AYAAAAwQDAQAABQMBAAEGGgV+AUIAC34BQgALfgFCAAt+AUIAC34BQgALByIEBGluaXQAAAZ1cGRhdGUAAQVmaW5hbAACBm1lbW9yeQIACrUIAzAAQtbrgu7q/Yn14AAkAELP1tO+0ser2UIkAUIAJAJC+erQ0OfJoeThACQDQgAkBAvUAQIBfwR+IABFBEAPCyMEIACtfCQEIwAhAiMBIQMjAiEEIwMhBQNAIAIgASkDAELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiECIAMgASkDCELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEDIAQgASkDEELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEEIAUgASkDGELP1tO+0ser2UJ+fEIfiUKHla+vmLbem55/fiEFIAAgAUEgaiIBSw0ACyACJAAgAyQBIAQkAiAFJAMLqwYCAX8EfiMEQgBSBH4jACICQgGJIwEiA0IHiXwjAiIEQgyJfCMDIgVCEol8IAJCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0gA0LP1tO+0ser2UJ+Qh+JQoeVr6+Ytt6bnn9+hUKHla+vmLbem55/fkKdo7Xqg7GNivoAfSAEQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef36FQoeVr6+Ytt6bnn9+Qp2jteqDsY2K+gB9IAVCz9bTvtLHq9lCfkIfiUKHla+vmLbem55/foVCh5Wvr5i23puef35CnaO16oOxjYr6AH0FQsXP2bLx5brqJwsjBCAArXx8IQIDQCABQQhqIABNBEAgAiABKQMAQs/W077Sx6vZQn5CH4lCh5Wvr5i23puef36FQhuJQoeVr6+Ytt6bnn9+Qp2jteqDsY2K+gB9IQIgAUEIaiEBDAELCyABQQRqIABNBEACfyACIAE1AgBCh5Wvr5i23puef36FQheJQs/W077Sx6vZQn5C+fPd8Zn2masWfCECIAFBBGoLIQELA0AgACABRwRAIAIgATEAAELFz9my8eW66id+hUILiUKHla+vmLbem55/fiECIAFBAWohAQwBCwtBACACIAJCIYiFQs/W077Sx6vZQn4iAiACQh2IhUL5893xmfaZqxZ+IgIgAkIgiIUiAkIgiCIDQv//A4NCIIYgA0KAgPz/D4NCEIiEIgNC/4GAgPAfg0IQhiADQoD+g4CA4D+DQgiIhCIDQo+AvIDwgcAHg0IIhiADQvCBwIeAnoD4AINCBIiEIgNChoyYsODAgYMGfEIEiEKBgoSIkKDAgAGDQid+IANCsODAgYOGjJgwhHw3AwBBCCACQv////8PgyICQv//A4NCIIYgAkKAgPz/D4NCEIiEIgJC/4GAgPAfg0IQhiACQoD+g4CA4D+DQgiIhCICQo+AvIDwgcAHg0IIhiACQvCBwIeAnoD4AINCBIiEIgJChoyYsODAgYMGfEIEiEKBgoSIkKDAgAGDQid+IAJCsODAgYOGjJgwhHw3AwAL",
      "base64"
    )
  );
  xxhash64_1 = create.bind(null, xxhash64, [], 32, 16);
  return xxhash64_1;
}
var BatchedHash_1;
var hasRequiredBatchedHash;
function requireBatchedHash() {
  if (hasRequiredBatchedHash) return BatchedHash_1;
  hasRequiredBatchedHash = 1;
  const MAX_SHORT_STRING = requireWasmHash().MAX_SHORT_STRING;
  class BatchedHash2 {
    constructor(hash2) {
      this.string = void 0;
      this.encoding = void 0;
      this.hash = hash2;
    }
    /**
     * Update hash {@link https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding}
     * @param {string|Buffer} data data
     * @param {string=} inputEncoding data encoding
     * @returns {this} updated hash
     */
    update(data, inputEncoding) {
      if (this.string !== void 0) {
        if (typeof data === "string" && inputEncoding === this.encoding && this.string.length + data.length < MAX_SHORT_STRING) {
          this.string += data;
          return this;
        }
        this.hash.update(this.string, this.encoding);
        this.string = void 0;
      }
      if (typeof data === "string") {
        if (data.length < MAX_SHORT_STRING && // base64 encoding is not valid since it may contain padding chars
        (!inputEncoding || !inputEncoding.startsWith("ba"))) {
          this.string = data;
          this.encoding = inputEncoding;
        } else {
          this.hash.update(data, inputEncoding);
        }
      } else {
        this.hash.update(data);
      }
      return this;
    }
    /**
     * Calculates the digest {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     * @param {string=} encoding encoding of the return value
     * @returns {string|Buffer} digest
     */
    digest(encoding) {
      if (this.string !== void 0) {
        this.hash.update(this.string, this.encoding);
      }
      return this.hash.digest(encoding);
    }
  }
  BatchedHash_1 = BatchedHash2;
  return BatchedHash_1;
}
var md4_1;
var hasRequiredMd4;
function requireMd4() {
  if (hasRequiredMd4) return md4_1;
  hasRequiredMd4 = 1;
  const create = requireWasmHash();
  const md4 = new WebAssembly.Module(
    Buffer.from(
      // 2150 bytes
      "AGFzbQEAAAABCAJgAX8AYAAAAwUEAQAAAAUDAQABBhoFfwFBAAt/AUEAC38BQQALfwFBAAt/AUEACwciBARpbml0AAAGdXBkYXRlAAIFZmluYWwAAwZtZW1vcnkCAAqFEAQmAEGBxpS6BiQBQYnXtv5+JAJB/rnrxXkkA0H2qMmBASQEQQAkAAvMCgEYfyMBIQojAiEGIwMhByMEIQgDQCAAIAVLBEAgBSgCCCINIAcgBiAFKAIEIgsgCCAHIAUoAgAiDCAKIAggBiAHIAhzcXNqakEDdyIDIAYgB3Nxc2pqQQd3IgEgAyAGc3FzampBC3chAiAFKAIUIg8gASACIAUoAhAiCSADIAEgBSgCDCIOIAYgAyACIAEgA3Nxc2pqQRN3IgQgASACc3FzampBA3ciAyACIARzcXNqakEHdyEBIAUoAiAiEiADIAEgBSgCHCIRIAQgAyAFKAIYIhAgAiAEIAEgAyAEc3FzampBC3ciAiABIANzcXNqakETdyIEIAEgAnNxc2pqQQN3IQMgBSgCLCIVIAQgAyAFKAIoIhQgAiAEIAUoAiQiEyABIAIgAyACIARzcXNqakEHdyIBIAMgBHNxc2pqQQt3IgIgASADc3FzampBE3chBCAPIBAgCSAVIBQgEyAFKAI4IhYgAiAEIAUoAjQiFyABIAIgBSgCMCIYIAMgASAEIAEgAnNxc2pqQQN3IgEgAiAEc3FzampBB3ciAiABIARzcXNqakELdyIDIAkgAiAMIAEgBSgCPCIJIAQgASADIAEgAnNxc2pqQRN3IgEgAiADcnEgAiADcXJqakGZ84nUBWpBA3ciAiABIANycSABIANxcmpqQZnzidQFakEFdyIEIAEgAnJxIAEgAnFyaiASakGZ84nUBWpBCXciAyAPIAQgCyACIBggASADIAIgBHJxIAIgBHFyampBmfOJ1AVqQQ13IgEgAyAEcnEgAyAEcXJqakGZ84nUBWpBA3ciAiABIANycSABIANxcmpqQZnzidQFakEFdyIEIAEgAnJxIAEgAnFyampBmfOJ1AVqQQl3IgMgECAEIAIgFyABIAMgAiAEcnEgAiAEcXJqakGZ84nUBWpBDXciASADIARycSADIARxcmogDWpBmfOJ1AVqQQN3IgIgASADcnEgASADcXJqakGZ84nUBWpBBXciBCABIAJycSABIAJxcmpqQZnzidQFakEJdyIDIBEgBCAOIAIgFiABIAMgAiAEcnEgAiAEcXJqakGZ84nUBWpBDXciASADIARycSADIARxcmpqQZnzidQFakEDdyICIAEgA3JxIAEgA3FyampBmfOJ1AVqQQV3IgQgASACcnEgASACcXJqakGZ84nUBWpBCXciAyAMIAIgAyAJIAEgAyACIARycSACIARxcmpqQZnzidQFakENdyIBcyAEc2pqQaHX5/YGakEDdyICIAQgASACcyADc2ogEmpBodfn9gZqQQl3IgRzIAFzampBodfn9gZqQQt3IgMgAiADIBggASADIARzIAJzampBodfn9gZqQQ93IgFzIARzaiANakGh1+f2BmpBA3ciAiAUIAQgASACcyADc2pqQaHX5/YGakEJdyIEcyABc2pqQaHX5/YGakELdyIDIAsgAiADIBYgASADIARzIAJzampBodfn9gZqQQ93IgFzIARzampBodfn9gZqQQN3IgIgEyAEIAEgAnMgA3NqakGh1+f2BmpBCXciBHMgAXNqakGh1+f2BmpBC3chAyAKIA4gAiADIBcgASADIARzIAJzampBodfn9gZqQQ93IgFzIARzampBodfn9gZqQQN3IgJqIQogBiAJIAEgESADIAIgFSAEIAEgAnMgA3NqakGh1+f2BmpBCXciBHMgAXNqakGh1+f2BmpBC3ciAyAEcyACc2pqQaHX5/YGakEPd2ohBiADIAdqIQcgBCAIaiEIIAVBQGshBQwBCwsgCiQBIAYkAiAHJAMgCCQECw0AIAAQASMAIABqJAAL/wQCA38BfiMAIABqrUIDhiEEIABByABqQUBxIgJBCGshAyAAIgFBAWohACABQYABOgAAA0AgACACSUEAIABBB3EbBEAgAEEAOgAAIABBAWohAAwBCwsDQCAAIAJJBEAgAEIANwMAIABBCGohAAwBCwsgAyAENwMAIAIQAUEAIwGtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEIIwKtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEQIwOtIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAEEYIwStIgRC//8DgyAEQoCA/P8Pg0IQhoQiBEL/gYCA8B+DIARCgP6DgIDgP4NCCIaEIgRCj4C8gPCBwAeDQgiGIARC8IHAh4CegPgAg0IEiIQiBEKGjJiw4MCBgwZ8QgSIQoGChIiQoMCAAYNCJ34gBEKw4MCBg4aMmDCEfDcDAAs=",
      "base64"
    )
  );
  md4_1 = create.bind(null, md4, [], 64, 32);
  return md4_1;
}
var BulkUpdateDecorator_1;
var hasRequiredBulkUpdateDecorator;
function requireBulkUpdateDecorator() {
  if (hasRequiredBulkUpdateDecorator) return BulkUpdateDecorator_1;
  hasRequiredBulkUpdateDecorator = 1;
  const BULK_SIZE = 2e3;
  const digestCaches = {};
  class BulkUpdateDecorator2 {
    /**
     * @param {Hash | function(): Hash} hashOrFactory function to create a hash
     * @param {string=} hashKey key for caching
     */
    constructor(hashOrFactory, hashKey) {
      this.hashKey = hashKey;
      if (typeof hashOrFactory === "function") {
        this.hashFactory = hashOrFactory;
        this.hash = void 0;
      } else {
        this.hashFactory = void 0;
        this.hash = hashOrFactory;
      }
      this.buffer = "";
    }
    /**
     * Update hash {@link https://nodejs.org/api/crypto.html#crypto_hash_update_data_inputencoding}
     * @param {string|Buffer} data data
     * @param {string=} inputEncoding data encoding
     * @returns {this} updated hash
     */
    update(data, inputEncoding) {
      if (inputEncoding !== void 0 || typeof data !== "string" || data.length > BULK_SIZE) {
        if (this.hash === void 0) {
          this.hash = this.hashFactory();
        }
        if (this.buffer.length > 0) {
          this.hash.update(this.buffer);
          this.buffer = "";
        }
        this.hash.update(data, inputEncoding);
      } else {
        this.buffer += data;
        if (this.buffer.length > BULK_SIZE) {
          if (this.hash === void 0) {
            this.hash = this.hashFactory();
          }
          this.hash.update(this.buffer);
          this.buffer = "";
        }
      }
      return this;
    }
    /**
     * Calculates the digest {@link https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding}
     * @param {string=} encoding encoding of the return value
     * @returns {string|Buffer} digest
     */
    digest(encoding) {
      let digestCache;
      const buffer = this.buffer;
      if (this.hash === void 0) {
        const cacheKey = `${this.hashKey}-${encoding}`;
        digestCache = digestCaches[cacheKey];
        if (digestCache === void 0) {
          digestCache = digestCaches[cacheKey] = /* @__PURE__ */ new Map();
        }
        const cacheEntry = digestCache.get(buffer);
        if (cacheEntry !== void 0) {
          return cacheEntry;
        }
        this.hash = this.hashFactory();
      }
      if (buffer.length > 0) {
        this.hash.update(buffer);
      }
      const digestResult = this.hash.digest(encoding);
      if (digestCache !== void 0) {
        digestCache.set(buffer, digestResult);
      }
      return digestResult;
    }
  }
  BulkUpdateDecorator_1 = BulkUpdateDecorator2;
  return BulkUpdateDecorator_1;
}
var baseEncodeTables = {
  26: "abcdefghijklmnopqrstuvwxyz",
  32: "123456789abcdefghjkmnpqrstuvwxyz",
  // no 0lio
  36: "0123456789abcdefghijklmnopqrstuvwxyz",
  49: "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  // no lIO
  52: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  58: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  // no 0lIO
  62: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  64: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_"
};
function divmod32(uint32Array, divisor) {
  let carry = 0;
  for (let i = uint32Array.length - 1; i >= 0; i--) {
    const value = carry * 4294967296 + uint32Array[i];
    carry = value % divisor;
    uint32Array[i] = Math.floor(value / divisor);
  }
  return carry;
}
function encodeBufferToBase(buffer, base, length) {
  const encodeTable = baseEncodeTables[base];
  if (!encodeTable) {
    throw new Error("Unknown encoding base" + base);
  }
  const limit = Math.ceil(buffer.length * 8 / Math.log2(base));
  length = Math.min(length, limit);
  const uint32Array = new Uint32Array(Math.ceil(buffer.length / 4));
  buffer.copy(Buffer.from(uint32Array.buffer));
  let output = "";
  for (let i = 0; i < length; i++) {
    output = encodeTable[divmod32(uint32Array, base)] + output;
  }
  return output;
}
var crypto = void 0;
var createXXHash64 = void 0;
var createMd4 = void 0;
var BatchedHash = void 0;
var BulkUpdateDecorator = void 0;
function getHashDigest$1(buffer, algorithm, digestType, maxLength) {
  algorithm = algorithm || "xxhash64";
  maxLength = maxLength || 9999;
  let hash2;
  if (algorithm === "xxhash64") {
    if (createXXHash64 === void 0) {
      createXXHash64 = requireXxhash64();
      if (BatchedHash === void 0) {
        BatchedHash = requireBatchedHash();
      }
    }
    hash2 = new BatchedHash(createXXHash64());
  } else if (algorithm === "md4") {
    if (createMd4 === void 0) {
      createMd4 = requireMd4();
      if (BatchedHash === void 0) {
        BatchedHash = requireBatchedHash();
      }
    }
    hash2 = new BatchedHash(createMd4());
  } else if (algorithm === "native-md4") {
    if (typeof crypto === "undefined") {
      crypto = import_crypto.default;
      if (BulkUpdateDecorator === void 0) {
        BulkUpdateDecorator = requireBulkUpdateDecorator();
      }
    }
    hash2 = new BulkUpdateDecorator(() => crypto.createHash("md4"), "md4");
  } else {
    if (typeof crypto === "undefined") {
      crypto = import_crypto.default;
      if (BulkUpdateDecorator === void 0) {
        BulkUpdateDecorator = requireBulkUpdateDecorator();
      }
    }
    hash2 = new BulkUpdateDecorator(
      () => crypto.createHash(algorithm),
      algorithm
    );
  }
  hash2.update(buffer);
  if (digestType === "base26" || digestType === "base32" || digestType === "base36" || digestType === "base49" || digestType === "base52" || digestType === "base58" || digestType === "base62") {
    return encodeBufferToBase(hash2.digest(), digestType.substr(4), maxLength);
  } else {
    return hash2.digest(digestType || "hex").substr(0, maxLength);
  }
}
var getHashDigest_1 = getHashDigest$1;
var path$1 = import_path.default;
var getHashDigest = getHashDigest_1;
function interpolateName$1(loaderContext, name, options = {}) {
  let filename;
  const hasQuery = loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1;
  if (typeof name === "function") {
    filename = name(
      loaderContext.resourcePath,
      hasQuery ? loaderContext.resourceQuery : void 0
    );
  } else {
    filename = name || "[hash].[ext]";
  }
  const context = options.context;
  const content = options.content;
  const regExp = options.regExp;
  let ext = "bin";
  let basename = "file";
  let directory = "";
  let folder = "";
  let query = "";
  if (loaderContext.resourcePath) {
    const parsed = path$1.parse(loaderContext.resourcePath);
    let resourcePath = loaderContext.resourcePath;
    if (parsed.ext) {
      ext = parsed.ext.substr(1);
    }
    if (parsed.dir) {
      basename = parsed.name;
      resourcePath = parsed.dir + path$1.sep;
    }
    if (typeof context !== "undefined") {
      directory = path$1.relative(context, resourcePath + "_").replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
      directory = directory.substr(0, directory.length - 1);
    } else {
      directory = resourcePath.replace(/\\/g, "/").replace(/\.\.(\/)?/g, "_$1");
    }
    if (directory.length === 1) {
      directory = "";
    } else if (directory.length > 1) {
      folder = path$1.basename(directory);
    }
  }
  if (loaderContext.resourceQuery && loaderContext.resourceQuery.length > 1) {
    query = loaderContext.resourceQuery;
    const hashIdx = query.indexOf("#");
    if (hashIdx >= 0) {
      query = query.substr(0, hashIdx);
    }
  }
  let url = filename;
  if (content) {
    url = url.replace(
      /\[(?:([^[:\]]+):)?(?:hash|contenthash)(?::([a-z]+\d*))?(?::(\d+))?\]/gi,
      (all, hashType, digestType, maxLength) => getHashDigest(content, hashType, digestType, parseInt(maxLength, 10))
    );
  }
  url = url.replace(/\[ext\]/gi, () => ext).replace(/\[name\]/gi, () => basename).replace(/\[path\]/gi, () => directory).replace(/\[folder\]/gi, () => folder).replace(/\[query\]/gi, () => query);
  if (regExp && loaderContext.resourcePath) {
    const match = loaderContext.resourcePath.match(new RegExp(regExp));
    match && match.forEach((matched, i) => {
      url = url.replace(new RegExp("\\[" + i + "\\]", "ig"), matched);
    });
  }
  if (typeof loaderContext.options === "object" && typeof loaderContext.options.customInterpolateName === "function") {
    url = loaderContext.options.customInterpolateName.call(
      loaderContext,
      url,
      name,
      options
    );
  }
  return url;
}
var interpolateName_1 = interpolateName$1;
var interpolateName = interpolateName_1;
var path = import_path.default;
var genericNames = function createGenerator(pattern, options) {
  options = options || {};
  var context = options && typeof options.context === "string" ? options.context : process.cwd();
  var hashPrefix = options && typeof options.hashPrefix === "string" ? options.hashPrefix : "";
  return function generate(localName, filepath) {
    var name = pattern.replace(/\[local\]/gi, localName);
    var loaderContext = {
      resourcePath: filepath
    };
    var loaderOptions = {
      content: hashPrefix + path.relative(context, filepath).replace(/\\/g, "/") + "\0" + localName,
      context
    };
    var genericName = interpolateName(loaderContext, name, loaderOptions);
    return genericName.replace(new RegExp("[^a-zA-Z0-9\\-_ -￿]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
  };
};
var src$2 = { exports: {} };
var dist = { exports: {} };
var processor = { exports: {} };
var parser = { exports: {} };
var root$1 = { exports: {} };
var container = { exports: {} };
var node$1 = { exports: {} };
var util = {};
var unesc = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = unesc2;
  function gobbleHex(str2) {
    var lower = str2.toLowerCase();
    var hex = "";
    var spaceTerminated = false;
    for (var i = 0; i < 6 && lower[i] !== void 0; i++) {
      var code = lower.charCodeAt(i);
      var valid = code >= 97 && code <= 102 || code >= 48 && code <= 57;
      spaceTerminated = code === 32;
      if (!valid) {
        break;
      }
      hex += lower[i];
    }
    if (hex.length === 0) {
      return void 0;
    }
    var codePoint = parseInt(hex, 16);
    var isSurrogate = codePoint >= 55296 && codePoint <= 57343;
    if (isSurrogate || codePoint === 0 || codePoint > 1114111) {
      return ["�", hex.length + (spaceTerminated ? 1 : 0)];
    }
    return [String.fromCodePoint(codePoint), hex.length + (spaceTerminated ? 1 : 0)];
  }
  var CONTAINS_ESCAPE = /\\/;
  function unesc2(str2) {
    var needToProcess = CONTAINS_ESCAPE.test(str2);
    if (!needToProcess) {
      return str2;
    }
    var ret = "";
    for (var i = 0; i < str2.length; i++) {
      if (str2[i] === "\\") {
        var gobbled = gobbleHex(str2.slice(i + 1, i + 7));
        if (gobbled !== void 0) {
          ret += gobbled[0];
          i += gobbled[1];
          continue;
        }
        if (str2[i + 1] === "\\") {
          ret += "\\";
          i++;
          continue;
        }
        if (str2.length === i + 1) {
          ret += str2[i];
        }
        continue;
      }
      ret += str2[i];
    }
    return ret;
  }
  module.exports = exports.default;
})(unesc, unesc.exports);
var unescExports = unesc.exports;
var getProp = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = getProp2;
  function getProp2(obj) {
    for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      props[_key - 1] = arguments[_key];
    }
    while (props.length > 0) {
      var prop = props.shift();
      if (!obj[prop]) {
        return void 0;
      }
      obj = obj[prop];
    }
    return obj;
  }
  module.exports = exports.default;
})(getProp, getProp.exports);
var getPropExports = getProp.exports;
var ensureObject = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = ensureObject2;
  function ensureObject2(obj) {
    for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      props[_key - 1] = arguments[_key];
    }
    while (props.length > 0) {
      var prop = props.shift();
      if (!obj[prop]) {
        obj[prop] = {};
      }
      obj = obj[prop];
    }
  }
  module.exports = exports.default;
})(ensureObject, ensureObject.exports);
var ensureObjectExports = ensureObject.exports;
var stripComments = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = stripComments2;
  function stripComments2(str2) {
    var s = "";
    var commentStart = str2.indexOf("/*");
    var lastEnd = 0;
    while (commentStart >= 0) {
      s = s + str2.slice(lastEnd, commentStart);
      var commentEnd = str2.indexOf("*/", commentStart + 2);
      if (commentEnd < 0) {
        return s;
      }
      lastEnd = commentEnd + 2;
      commentStart = str2.indexOf("/*", lastEnd);
    }
    s = s + str2.slice(lastEnd);
    return s;
  }
  module.exports = exports.default;
})(stripComments, stripComments.exports);
var stripCommentsExports = stripComments.exports;
util.__esModule = true;
util.unesc = util.stripComments = util.getProp = util.ensureObject = void 0;
var _unesc = _interopRequireDefault$3(unescExports);
util.unesc = _unesc["default"];
var _getProp = _interopRequireDefault$3(getPropExports);
util.getProp = _getProp["default"];
var _ensureObject = _interopRequireDefault$3(ensureObjectExports);
util.ensureObject = _ensureObject["default"];
var _stripComments = _interopRequireDefault$3(stripCommentsExports);
util.stripComments = _stripComments["default"];
function _interopRequireDefault$3(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _util = util;
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  var cloneNode = function cloneNode2(obj, parent) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }
    var cloned = new obj.constructor();
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) {
        continue;
      }
      var value = obj[i];
      var type = typeof value;
      if (i === "parent" && type === "object") {
        if (parent) {
          cloned[i] = parent;
        }
      } else if (value instanceof Array) {
        cloned[i] = value.map(function(j) {
          return cloneNode2(j, cloned);
        });
      } else {
        cloned[i] = cloneNode2(value, cloned);
      }
    }
    return cloned;
  };
  var Node = function() {
    function Node2(opts) {
      if (opts === void 0) {
        opts = {};
      }
      Object.assign(this, opts);
      this.spaces = this.spaces || {};
      this.spaces.before = this.spaces.before || "";
      this.spaces.after = this.spaces.after || "";
    }
    var _proto = Node2.prototype;
    _proto.remove = function remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
      this.parent = void 0;
      return this;
    };
    _proto.replaceWith = function replaceWith() {
      if (this.parent) {
        for (var index2 in arguments) {
          this.parent.insertBefore(this, arguments[index2]);
        }
        this.remove();
      }
      return this;
    };
    _proto.next = function next() {
      return this.parent.at(this.parent.index(this) + 1);
    };
    _proto.prev = function prev() {
      return this.parent.at(this.parent.index(this) - 1);
    };
    _proto.clone = function clone(overrides) {
      if (overrides === void 0) {
        overrides = {};
      }
      var cloned = cloneNode(this);
      for (var name in overrides) {
        cloned[name] = overrides[name];
      }
      return cloned;
    };
    _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
      if (!this.raws) {
        this.raws = {};
      }
      var originalValue = this[name];
      var originalEscaped = this.raws[name];
      this[name] = originalValue + value;
      if (originalEscaped || valueEscaped !== value) {
        this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
      } else {
        delete this.raws[name];
      }
    };
    _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
      if (!this.raws) {
        this.raws = {};
      }
      this[name] = value;
      this.raws[name] = valueEscaped;
    };
    _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
      this[name] = value;
      if (this.raws) {
        delete this.raws[name];
      }
    };
    _proto.isAtPosition = function isAtPosition(line, column) {
      if (this.source && this.source.start && this.source.end) {
        if (this.source.start.line > line) {
          return false;
        }
        if (this.source.end.line < line) {
          return false;
        }
        if (this.source.start.line === line && this.source.start.column > column) {
          return false;
        }
        if (this.source.end.line === line && this.source.end.column < column) {
          return false;
        }
        return true;
      }
      return void 0;
    };
    _proto.stringifyProperty = function stringifyProperty(name) {
      return this.raws && this.raws[name] || this[name];
    };
    _proto.valueToString = function valueToString() {
      return String(this.stringifyProperty("value"));
    };
    _proto.toString = function toString2() {
      return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
    };
    _createClass(Node2, [{
      key: "rawSpaceBefore",
      get: function get() {
        var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;
        if (rawSpace === void 0) {
          rawSpace = this.spaces && this.spaces.before;
        }
        return rawSpace || "";
      },
      set: function set(raw) {
        (0, _util.ensureObject)(this, "raws", "spaces");
        this.raws.spaces.before = raw;
      }
    }, {
      key: "rawSpaceAfter",
      get: function get() {
        var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;
        if (rawSpace === void 0) {
          rawSpace = this.spaces.after;
        }
        return rawSpace || "";
      },
      set: function set(raw) {
        (0, _util.ensureObject)(this, "raws", "spaces");
        this.raws.spaces.after = raw;
      }
    }]);
    return Node2;
  }();
  exports["default"] = Node;
  module.exports = exports.default;
})(node$1, node$1.exports);
var nodeExports = node$1.exports;
var types = {};
types.__esModule = true;
types.UNIVERSAL = types.TAG = types.STRING = types.SELECTOR = types.ROOT = types.PSEUDO = types.NESTING = types.ID = types.COMMENT = types.COMBINATOR = types.CLASS = types.ATTRIBUTE = void 0;
var TAG = "tag";
types.TAG = TAG;
var STRING = "string";
types.STRING = STRING;
var SELECTOR = "selector";
types.SELECTOR = SELECTOR;
var ROOT = "root";
types.ROOT = ROOT;
var PSEUDO = "pseudo";
types.PSEUDO = PSEUDO;
var NESTING = "nesting";
types.NESTING = NESTING;
var ID = "id";
types.ID = ID;
var COMMENT = "comment";
types.COMMENT = COMMENT;
var COMBINATOR = "combinator";
types.COMBINATOR = COMBINATOR;
var CLASS = "class";
types.CLASS = CLASS;
var ATTRIBUTE = "attribute";
types.ATTRIBUTE = ATTRIBUTE;
var UNIVERSAL = "universal";
types.UNIVERSAL = UNIVERSAL;
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var types$1 = _interopRequireWildcard(types);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _createForOfIteratorHelperLoose(o, allowArrayLike) {
    var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
    if (it) return (it = it.call(o)).next.bind(it);
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike) {
      if (it) o = it;
      var i = 0;
      return function() {
        if (i >= o.length) return { done: true };
        return { done: false, value: o[i++] };
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Container = function(_Node) {
    _inheritsLoose(Container2, _Node);
    function Container2(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      if (!_this.nodes) {
        _this.nodes = [];
      }
      return _this;
    }
    var _proto = Container2.prototype;
    _proto.append = function append(selector3) {
      selector3.parent = this;
      this.nodes.push(selector3);
      return this;
    };
    _proto.prepend = function prepend(selector3) {
      selector3.parent = this;
      this.nodes.unshift(selector3);
      return this;
    };
    _proto.at = function at2(index2) {
      return this.nodes[index2];
    };
    _proto.index = function index2(child) {
      if (typeof child === "number") {
        return child;
      }
      return this.nodes.indexOf(child);
    };
    _proto.removeChild = function removeChild(child) {
      child = this.index(child);
      this.at(child).parent = void 0;
      this.nodes.splice(child, 1);
      var index2;
      for (var id3 in this.indexes) {
        index2 = this.indexes[id3];
        if (index2 >= child) {
          this.indexes[id3] = index2 - 1;
        }
      }
      return this;
    };
    _proto.removeAll = function removeAll() {
      for (var _iterator = _createForOfIteratorHelperLoose(this.nodes), _step; !(_step = _iterator()).done; ) {
        var node2 = _step.value;
        node2.parent = void 0;
      }
      this.nodes = [];
      return this;
    };
    _proto.empty = function empty() {
      return this.removeAll();
    };
    _proto.insertAfter = function insertAfter(oldNode, newNode) {
      newNode.parent = this;
      var oldIndex = this.index(oldNode);
      this.nodes.splice(oldIndex + 1, 0, newNode);
      newNode.parent = this;
      var index2;
      for (var id3 in this.indexes) {
        index2 = this.indexes[id3];
        if (oldIndex <= index2) {
          this.indexes[id3] = index2 + 1;
        }
      }
      return this;
    };
    _proto.insertBefore = function insertBefore(oldNode, newNode) {
      newNode.parent = this;
      var oldIndex = this.index(oldNode);
      this.nodes.splice(oldIndex, 0, newNode);
      newNode.parent = this;
      var index2;
      for (var id3 in this.indexes) {
        index2 = this.indexes[id3];
        if (index2 <= oldIndex) {
          this.indexes[id3] = index2 + 1;
        }
      }
      return this;
    };
    _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
      var found = void 0;
      this.each(function(node2) {
        if (node2.atPosition) {
          var foundChild = node2.atPosition(line, col);
          if (foundChild) {
            found = foundChild;
            return false;
          }
        } else if (node2.isAtPosition(line, col)) {
          found = node2;
          return false;
        }
      });
      return found;
    };
    _proto.atPosition = function atPosition(line, col) {
      if (this.isAtPosition(line, col)) {
        return this._findChildAtPosition(line, col) || this;
      } else {
        return void 0;
      }
    };
    _proto._inferEndPosition = function _inferEndPosition() {
      if (this.last && this.last.source && this.last.source.end) {
        this.source = this.source || {};
        this.source.end = this.source.end || {};
        Object.assign(this.source.end, this.last.source.end);
      }
    };
    _proto.each = function each(callback) {
      if (!this.lastEach) {
        this.lastEach = 0;
      }
      if (!this.indexes) {
        this.indexes = {};
      }
      this.lastEach++;
      var id3 = this.lastEach;
      this.indexes[id3] = 0;
      if (!this.length) {
        return void 0;
      }
      var index2, result;
      while (this.indexes[id3] < this.length) {
        index2 = this.indexes[id3];
        result = callback(this.at(index2), index2);
        if (result === false) {
          break;
        }
        this.indexes[id3] += 1;
      }
      delete this.indexes[id3];
      if (result === false) {
        return false;
      }
    };
    _proto.walk = function walk(callback) {
      return this.each(function(node2, i) {
        var result = callback(node2, i);
        if (result !== false && node2.length) {
          result = node2.walk(callback);
        }
        if (result === false) {
          return false;
        }
      });
    };
    _proto.walkAttributes = function walkAttributes(callback) {
      var _this2 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.ATTRIBUTE) {
          return callback.call(_this2, selector3);
        }
      });
    };
    _proto.walkClasses = function walkClasses(callback) {
      var _this3 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.CLASS) {
          return callback.call(_this3, selector3);
        }
      });
    };
    _proto.walkCombinators = function walkCombinators(callback) {
      var _this4 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.COMBINATOR) {
          return callback.call(_this4, selector3);
        }
      });
    };
    _proto.walkComments = function walkComments(callback) {
      var _this5 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.COMMENT) {
          return callback.call(_this5, selector3);
        }
      });
    };
    _proto.walkIds = function walkIds(callback) {
      var _this6 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.ID) {
          return callback.call(_this6, selector3);
        }
      });
    };
    _proto.walkNesting = function walkNesting(callback) {
      var _this7 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.NESTING) {
          return callback.call(_this7, selector3);
        }
      });
    };
    _proto.walkPseudos = function walkPseudos(callback) {
      var _this8 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.PSEUDO) {
          return callback.call(_this8, selector3);
        }
      });
    };
    _proto.walkTags = function walkTags(callback) {
      var _this9 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.TAG) {
          return callback.call(_this9, selector3);
        }
      });
    };
    _proto.walkUniversals = function walkUniversals(callback) {
      var _this10 = this;
      return this.walk(function(selector3) {
        if (selector3.type === types$1.UNIVERSAL) {
          return callback.call(_this10, selector3);
        }
      });
    };
    _proto.split = function split(callback) {
      var _this11 = this;
      var current = [];
      return this.reduce(function(memo, node2, index2) {
        var split2 = callback.call(_this11, node2);
        current.push(node2);
        if (split2) {
          memo.push(current);
          current = [];
        } else if (index2 === _this11.length - 1) {
          memo.push(current);
        }
        return memo;
      }, []);
    };
    _proto.map = function map(callback) {
      return this.nodes.map(callback);
    };
    _proto.reduce = function reduce(callback, memo) {
      return this.nodes.reduce(callback, memo);
    };
    _proto.every = function every(callback) {
      return this.nodes.every(callback);
    };
    _proto.some = function some(callback) {
      return this.nodes.some(callback);
    };
    _proto.filter = function filter(callback) {
      return this.nodes.filter(callback);
    };
    _proto.sort = function sort(callback) {
      return this.nodes.sort(callback);
    };
    _proto.toString = function toString2() {
      return this.map(String).join("");
    };
    _createClass(Container2, [{
      key: "first",
      get: function get() {
        return this.at(0);
      }
    }, {
      key: "last",
      get: function get() {
        return this.at(this.length - 1);
      }
    }, {
      key: "length",
      get: function get() {
        return this.nodes.length;
      }
    }]);
    return Container2;
  }(_node["default"]);
  exports["default"] = Container;
  module.exports = exports.default;
})(container, container.exports);
var containerExports = container.exports;
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _container = _interopRequireDefault2(containerExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Root = function(_Container) {
    _inheritsLoose(Root2, _Container);
    function Root2(opts) {
      var _this;
      _this = _Container.call(this, opts) || this;
      _this.type = _types2.ROOT;
      return _this;
    }
    var _proto = Root2.prototype;
    _proto.toString = function toString2() {
      var str2 = this.reduce(function(memo, selector3) {
        memo.push(String(selector3));
        return memo;
      }, []).join(",");
      return this.trailingComma ? str2 + "," : str2;
    };
    _proto.error = function error(message, options) {
      if (this._error) {
        return this._error(message, options);
      } else {
        return new Error(message);
      }
    };
    _createClass(Root2, [{
      key: "errorGenerator",
      set: function set(handler) {
        this._error = handler;
      }
    }]);
    return Root2;
  }(_container["default"]);
  exports["default"] = Root;
  module.exports = exports.default;
})(root$1, root$1.exports);
var rootExports = root$1.exports;
var selector$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _container = _interopRequireDefault2(containerExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Selector = function(_Container) {
    _inheritsLoose(Selector2, _Container);
    function Selector2(opts) {
      var _this;
      _this = _Container.call(this, opts) || this;
      _this.type = _types2.SELECTOR;
      return _this;
    }
    return Selector2;
  }(_container["default"]);
  exports["default"] = Selector;
  module.exports = exports.default;
})(selector$1, selector$1.exports);
var selectorExports = selector$1.exports;
var className$1 = { exports: {} };
var object = {};
var hasOwnProperty$1 = object.hasOwnProperty;
var merge = function merge2(options, defaults) {
  if (!options) {
    return defaults;
  }
  var result = {};
  for (var key in defaults) {
    result[key] = hasOwnProperty$1.call(options, key) ? options[key] : defaults[key];
  }
  return result;
};
var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;
var cssesc = function cssesc2(string3, options) {
  options = merge(options, cssesc2.options);
  if (options.quotes != "single" && options.quotes != "double") {
    options.quotes = "single";
  }
  var quote = options.quotes == "double" ? '"' : "'";
  var isIdentifier2 = options.isIdentifier;
  var firstChar = string3.charAt(0);
  var output = "";
  var counter = 0;
  var length = string3.length;
  while (counter < length) {
    var character = string3.charAt(counter++);
    var codePoint = character.charCodeAt();
    var value = void 0;
    if (codePoint < 32 || codePoint > 126) {
      if (codePoint >= 55296 && codePoint <= 56319 && counter < length) {
        var extra = string3.charCodeAt(counter++);
        if ((extra & 64512) == 56320) {
          codePoint = ((codePoint & 1023) << 10) + (extra & 1023) + 65536;
        } else {
          counter--;
        }
      }
      value = "\\" + codePoint.toString(16).toUpperCase() + " ";
    } else {
      if (options.escapeEverything) {
        if (regexAnySingleEscape.test(character)) {
          value = "\\" + character;
        } else {
          value = "\\" + codePoint.toString(16).toUpperCase() + " ";
        }
      } else if (/[\t\n\f\r\x0B]/.test(character)) {
        value = "\\" + codePoint.toString(16).toUpperCase() + " ";
      } else if (character == "\\" || !isIdentifier2 && (character == '"' && quote == character || character == "'" && quote == character) || isIdentifier2 && regexSingleEscape.test(character)) {
        value = "\\" + character;
      } else {
        value = character;
      }
    }
    output += value;
  }
  if (isIdentifier2) {
    if (/^-[-\d]/.test(output)) {
      output = "\\-" + output.slice(1);
    } else if (/\d/.test(firstChar)) {
      output = "\\3" + firstChar + " " + output.slice(1);
    }
  }
  output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
    if ($1 && $1.length % 2) {
      return $0;
    }
    return ($1 || "") + $2;
  });
  if (!isIdentifier2 && options.wrap) {
    return quote + output + quote;
  }
  return output;
};
cssesc.options = {
  "escapeEverything": false,
  "isIdentifier": false,
  "quotes": "single",
  "wrap": false
};
cssesc.version = "3.0.0";
var cssesc_1 = cssesc;
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _cssesc = _interopRequireDefault2(cssesc_1);
  var _util = util;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var ClassName = function(_Node) {
    _inheritsLoose(ClassName2, _Node);
    function ClassName2(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.CLASS;
      _this._constructed = true;
      return _this;
    }
    var _proto = ClassName2.prototype;
    _proto.valueToString = function valueToString() {
      return "." + _Node.prototype.valueToString.call(this);
    };
    _createClass(ClassName2, [{
      key: "value",
      get: function get() {
        return this._value;
      },
      set: function set(v) {
        if (this._constructed) {
          var escaped = (0, _cssesc["default"])(v, {
            isIdentifier: true
          });
          if (escaped !== v) {
            (0, _util.ensureObject)(this, "raws");
            this.raws.value = escaped;
          } else if (this.raws) {
            delete this.raws.value;
          }
        }
        this._value = v;
      }
    }]);
    return ClassName2;
  }(_node["default"]);
  exports["default"] = ClassName;
  module.exports = exports.default;
})(className$1, className$1.exports);
var classNameExports = className$1.exports;
var comment$2 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Comment = function(_Node) {
    _inheritsLoose(Comment2, _Node);
    function Comment2(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.COMMENT;
      return _this;
    }
    return Comment2;
  }(_node["default"]);
  exports["default"] = Comment;
  module.exports = exports.default;
})(comment$2, comment$2.exports);
var commentExports = comment$2.exports;
var id$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var ID2 = function(_Node) {
    _inheritsLoose(ID3, _Node);
    function ID3(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.ID;
      return _this;
    }
    var _proto = ID3.prototype;
    _proto.valueToString = function valueToString() {
      return "#" + _Node.prototype.valueToString.call(this);
    };
    return ID3;
  }(_node["default"]);
  exports["default"] = ID2;
  module.exports = exports.default;
})(id$1, id$1.exports);
var idExports = id$1.exports;
var tag$1 = { exports: {} };
var namespace = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _cssesc = _interopRequireDefault2(cssesc_1);
  var _util = util;
  var _node = _interopRequireDefault2(nodeExports);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Namespace = function(_Node) {
    _inheritsLoose(Namespace2, _Node);
    function Namespace2() {
      return _Node.apply(this, arguments) || this;
    }
    var _proto = Namespace2.prototype;
    _proto.qualifiedName = function qualifiedName(value) {
      if (this.namespace) {
        return this.namespaceString + "|" + value;
      } else {
        return value;
      }
    };
    _proto.valueToString = function valueToString() {
      return this.qualifiedName(_Node.prototype.valueToString.call(this));
    };
    _createClass(Namespace2, [{
      key: "namespace",
      get: function get() {
        return this._namespace;
      },
      set: function set(namespace2) {
        if (namespace2 === true || namespace2 === "*" || namespace2 === "&") {
          this._namespace = namespace2;
          if (this.raws) {
            delete this.raws.namespace;
          }
          return;
        }
        var escaped = (0, _cssesc["default"])(namespace2, {
          isIdentifier: true
        });
        this._namespace = namespace2;
        if (escaped !== namespace2) {
          (0, _util.ensureObject)(this, "raws");
          this.raws.namespace = escaped;
        } else if (this.raws) {
          delete this.raws.namespace;
        }
      }
    }, {
      key: "ns",
      get: function get() {
        return this._namespace;
      },
      set: function set(namespace2) {
        this.namespace = namespace2;
      }
    }, {
      key: "namespaceString",
      get: function get() {
        if (this.namespace) {
          var ns = this.stringifyProperty("namespace");
          if (ns === true) {
            return "";
          } else {
            return ns;
          }
        } else {
          return "";
        }
      }
    }]);
    return Namespace2;
  }(_node["default"]);
  exports["default"] = Namespace;
  module.exports = exports.default;
})(namespace, namespace.exports);
var namespaceExports = namespace.exports;
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _namespace = _interopRequireDefault2(namespaceExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Tag = function(_Namespace) {
    _inheritsLoose(Tag2, _Namespace);
    function Tag2(opts) {
      var _this;
      _this = _Namespace.call(this, opts) || this;
      _this.type = _types2.TAG;
      return _this;
    }
    return Tag2;
  }(_namespace["default"]);
  exports["default"] = Tag;
  module.exports = exports.default;
})(tag$1, tag$1.exports);
var tagExports = tag$1.exports;
var string$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var String2 = function(_Node) {
    _inheritsLoose(String3, _Node);
    function String3(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.STRING;
      return _this;
    }
    return String3;
  }(_node["default"]);
  exports["default"] = String2;
  module.exports = exports.default;
})(string$1, string$1.exports);
var stringExports = string$1.exports;
var pseudo$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _container = _interopRequireDefault2(containerExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Pseudo = function(_Container) {
    _inheritsLoose(Pseudo2, _Container);
    function Pseudo2(opts) {
      var _this;
      _this = _Container.call(this, opts) || this;
      _this.type = _types2.PSEUDO;
      return _this;
    }
    var _proto = Pseudo2.prototype;
    _proto.toString = function toString2() {
      var params = this.length ? "(" + this.map(String).join(",") + ")" : "";
      return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join("");
    };
    return Pseudo2;
  }(_container["default"]);
  exports["default"] = Pseudo;
  module.exports = exports.default;
})(pseudo$1, pseudo$1.exports);
var pseudoExports = pseudo$1.exports;
var attribute$1 = {};
var node = import_util.default.deprecate;
(function(exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  exports.unescapeValue = unescapeValue;
  var _cssesc = _interopRequireDefault2(cssesc_1);
  var _unesc2 = _interopRequireDefault2(unescExports);
  var _namespace = _interopRequireDefault2(namespaceExports);
  var _types2 = types;
  var _CSSESC_QUOTE_OPTIONS;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var deprecate = node;
  var WRAPPED_IN_QUOTES = /^('|")([^]*)\1$/;
  var warnOfDeprecatedValueAssignment = deprecate(function() {
  }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead.");
  var warnOfDeprecatedQuotedAssignment = deprecate(function() {
  }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
  var warnOfDeprecatedConstructor = deprecate(function() {
  }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
  function unescapeValue(value) {
    var deprecatedUsage = false;
    var quoteMark = null;
    var unescaped = value;
    var m = unescaped.match(WRAPPED_IN_QUOTES);
    if (m) {
      quoteMark = m[1];
      unescaped = m[2];
    }
    unescaped = (0, _unesc2["default"])(unescaped);
    if (unescaped !== value) {
      deprecatedUsage = true;
    }
    return {
      deprecatedUsage,
      unescaped,
      quoteMark
    };
  }
  function handleDeprecatedContructorOpts(opts) {
    if (opts.quoteMark !== void 0) {
      return opts;
    }
    if (opts.value === void 0) {
      return opts;
    }
    warnOfDeprecatedConstructor();
    var _unescapeValue = unescapeValue(opts.value), quoteMark = _unescapeValue.quoteMark, unescaped = _unescapeValue.unescaped;
    if (!opts.raws) {
      opts.raws = {};
    }
    if (opts.raws.value === void 0) {
      opts.raws.value = opts.value;
    }
    opts.value = unescaped;
    opts.quoteMark = quoteMark;
    return opts;
  }
  var Attribute = function(_Namespace) {
    _inheritsLoose(Attribute2, _Namespace);
    function Attribute2(opts) {
      var _this;
      if (opts === void 0) {
        opts = {};
      }
      _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
      _this.type = _types2.ATTRIBUTE;
      _this.raws = _this.raws || {};
      Object.defineProperty(_this.raws, "unquoted", {
        get: deprecate(function() {
          return _this.value;
        }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
        set: deprecate(function() {
          return _this.value;
        }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
      });
      _this._constructed = true;
      return _this;
    }
    var _proto = Attribute2.prototype;
    _proto.getQuotedValue = function getQuotedValue(options) {
      if (options === void 0) {
        options = {};
      }
      var quoteMark = this._determineQuoteMark(options);
      var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
      var escaped = (0, _cssesc["default"])(this._value, cssescopts);
      return escaped;
    };
    _proto._determineQuoteMark = function _determineQuoteMark(options) {
      return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
    };
    _proto.setValue = function setValue(value, options) {
      if (options === void 0) {
        options = {};
      }
      this._value = value;
      this._quoteMark = this._determineQuoteMark(options);
      this._syncRawValue();
    };
    _proto.smartQuoteMark = function smartQuoteMark(options) {
      var v = this.value;
      var numSingleQuotes = v.replace(/[^']/g, "").length;
      var numDoubleQuotes = v.replace(/[^"]/g, "").length;
      if (numSingleQuotes + numDoubleQuotes === 0) {
        var escaped = (0, _cssesc["default"])(v, {
          isIdentifier: true
        });
        if (escaped === v) {
          return Attribute2.NO_QUOTE;
        } else {
          var pref = this.preferredQuoteMark(options);
          if (pref === Attribute2.NO_QUOTE) {
            var quote = this.quoteMark || options.quoteMark || Attribute2.DOUBLE_QUOTE;
            var opts = CSSESC_QUOTE_OPTIONS[quote];
            var quoteValue = (0, _cssesc["default"])(v, opts);
            if (quoteValue.length < escaped.length) {
              return quote;
            }
          }
          return pref;
        }
      } else if (numDoubleQuotes === numSingleQuotes) {
        return this.preferredQuoteMark(options);
      } else if (numDoubleQuotes < numSingleQuotes) {
        return Attribute2.DOUBLE_QUOTE;
      } else {
        return Attribute2.SINGLE_QUOTE;
      }
    };
    _proto.preferredQuoteMark = function preferredQuoteMark(options) {
      var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;
      if (quoteMark === void 0) {
        quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
      }
      if (quoteMark === void 0) {
        quoteMark = Attribute2.DOUBLE_QUOTE;
      }
      return quoteMark;
    };
    _proto._syncRawValue = function _syncRawValue() {
      var rawValue = (0, _cssesc["default"])(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
      if (rawValue === this._value) {
        if (this.raws) {
          delete this.raws.value;
        }
      } else {
        this.raws.value = rawValue;
      }
    };
    _proto._handleEscapes = function _handleEscapes(prop, value) {
      if (this._constructed) {
        var escaped = (0, _cssesc["default"])(value, {
          isIdentifier: true
        });
        if (escaped !== value) {
          this.raws[prop] = escaped;
        } else {
          delete this.raws[prop];
        }
      }
    };
    _proto._spacesFor = function _spacesFor(name) {
      var attrSpaces = {
        before: "",
        after: ""
      };
      var spaces = this.spaces[name] || {};
      var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
      return Object.assign(attrSpaces, spaces, rawSpaces);
    };
    _proto._stringFor = function _stringFor(name, spaceName, concat) {
      if (spaceName === void 0) {
        spaceName = name;
      }
      if (concat === void 0) {
        concat = defaultAttrConcat;
      }
      var attrSpaces = this._spacesFor(spaceName);
      return concat(this.stringifyProperty(name), attrSpaces);
    };
    _proto.offsetOf = function offsetOf(name) {
      var count = 1;
      var attributeSpaces = this._spacesFor("attribute");
      count += attributeSpaces.before.length;
      if (name === "namespace" || name === "ns") {
        return this.namespace ? count : -1;
      }
      if (name === "attributeNS") {
        return count;
      }
      count += this.namespaceString.length;
      if (this.namespace) {
        count += 1;
      }
      if (name === "attribute") {
        return count;
      }
      count += this.stringifyProperty("attribute").length;
      count += attributeSpaces.after.length;
      var operatorSpaces = this._spacesFor("operator");
      count += operatorSpaces.before.length;
      var operator = this.stringifyProperty("operator");
      if (name === "operator") {
        return operator ? count : -1;
      }
      count += operator.length;
      count += operatorSpaces.after.length;
      var valueSpaces = this._spacesFor("value");
      count += valueSpaces.before.length;
      var value = this.stringifyProperty("value");
      if (name === "value") {
        return value ? count : -1;
      }
      count += value.length;
      count += valueSpaces.after.length;
      var insensitiveSpaces = this._spacesFor("insensitive");
      count += insensitiveSpaces.before.length;
      if (name === "insensitive") {
        return this.insensitive ? count : -1;
      }
      return -1;
    };
    _proto.toString = function toString2() {
      var _this2 = this;
      var selector3 = [this.rawSpaceBefore, "["];
      selector3.push(this._stringFor("qualifiedAttribute", "attribute"));
      if (this.operator && (this.value || this.value === "")) {
        selector3.push(this._stringFor("operator"));
        selector3.push(this._stringFor("value"));
        selector3.push(this._stringFor("insensitiveFlag", "insensitive", function(attrValue, attrSpaces) {
          if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
            attrSpaces.before = " ";
          }
          return defaultAttrConcat(attrValue, attrSpaces);
        }));
      }
      selector3.push("]");
      selector3.push(this.rawSpaceAfter);
      return selector3.join("");
    };
    _createClass(Attribute2, [{
      key: "quoted",
      get: function get() {
        var qm = this.quoteMark;
        return qm === "'" || qm === '"';
      },
      set: function set(value) {
        warnOfDeprecatedQuotedAssignment();
      }
      /**
       * returns a single (`'`) or double (`"`) quote character if the value is quoted.
       * returns `null` if the value is not quoted.
       * returns `undefined` if the quotation state is unknown (this can happen when
       * the attribute is constructed without specifying a quote mark.)
       */
    }, {
      key: "quoteMark",
      get: function get() {
        return this._quoteMark;
      },
      set: function set(quoteMark) {
        if (!this._constructed) {
          this._quoteMark = quoteMark;
          return;
        }
        if (this._quoteMark !== quoteMark) {
          this._quoteMark = quoteMark;
          this._syncRawValue();
        }
      }
    }, {
      key: "qualifiedAttribute",
      get: function get() {
        return this.qualifiedName(this.raws.attribute || this.attribute);
      }
    }, {
      key: "insensitiveFlag",
      get: function get() {
        return this.insensitive ? "i" : "";
      }
    }, {
      key: "value",
      get: function get() {
        return this._value;
      },
      set: (
        /**
         * Before 3.0, the value had to be set to an escaped value including any wrapped
         * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
         * is unescaped during parsing and any quote marks are removed.
         *
         * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
         * a deprecation warning is raised when the new value contains any characters that would
         * require escaping (including if it contains wrapped quotes).
         *
         * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
         * how the new value is quoted.
         */
        function set(v) {
          if (this._constructed) {
            var _unescapeValue2 = unescapeValue(v), deprecatedUsage = _unescapeValue2.deprecatedUsage, unescaped = _unescapeValue2.unescaped, quoteMark = _unescapeValue2.quoteMark;
            if (deprecatedUsage) {
              warnOfDeprecatedValueAssignment();
            }
            if (unescaped === this._value && quoteMark === this._quoteMark) {
              return;
            }
            this._value = unescaped;
            this._quoteMark = quoteMark;
            this._syncRawValue();
          } else {
            this._value = v;
          }
        }
      )
    }, {
      key: "insensitive",
      get: function get() {
        return this._insensitive;
      },
      set: function set(insensitive) {
        if (!insensitive) {
          this._insensitive = false;
          if (this.raws && (this.raws.insensitiveFlag === "I" || this.raws.insensitiveFlag === "i")) {
            this.raws.insensitiveFlag = void 0;
          }
        }
        this._insensitive = insensitive;
      }
    }, {
      key: "attribute",
      get: function get() {
        return this._attribute;
      },
      set: function set(name) {
        this._handleEscapes("attribute", name);
        this._attribute = name;
      }
    }]);
    return Attribute2;
  }(_namespace["default"]);
  exports["default"] = Attribute;
  Attribute.NO_QUOTE = null;
  Attribute.SINGLE_QUOTE = "'";
  Attribute.DOUBLE_QUOTE = '"';
  var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
    "'": {
      quotes: "single",
      wrap: true
    },
    '"': {
      quotes: "double",
      wrap: true
    }
  }, _CSSESC_QUOTE_OPTIONS[null] = {
    isIdentifier: true
  }, _CSSESC_QUOTE_OPTIONS);
  function defaultAttrConcat(attrValue, attrSpaces) {
    return "" + attrSpaces.before + attrValue + attrSpaces.after;
  }
})(attribute$1);
var universal$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _namespace = _interopRequireDefault2(namespaceExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Universal = function(_Namespace) {
    _inheritsLoose(Universal2, _Namespace);
    function Universal2(opts) {
      var _this;
      _this = _Namespace.call(this, opts) || this;
      _this.type = _types2.UNIVERSAL;
      _this.value = "*";
      return _this;
    }
    return Universal2;
  }(_namespace["default"]);
  exports["default"] = Universal;
  module.exports = exports.default;
})(universal$1, universal$1.exports);
var universalExports = universal$1.exports;
var combinator$2 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Combinator = function(_Node) {
    _inheritsLoose(Combinator2, _Node);
    function Combinator2(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.COMBINATOR;
      return _this;
    }
    return Combinator2;
  }(_node["default"]);
  exports["default"] = Combinator;
  module.exports = exports.default;
})(combinator$2, combinator$2.exports);
var combinatorExports = combinator$2.exports;
var nesting$1 = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _node = _interopRequireDefault2(nodeExports);
  var _types2 = types;
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
      o2.__proto__ = p2;
      return o2;
    };
    return _setPrototypeOf(o, p);
  }
  var Nesting = function(_Node) {
    _inheritsLoose(Nesting2, _Node);
    function Nesting2(opts) {
      var _this;
      _this = _Node.call(this, opts) || this;
      _this.type = _types2.NESTING;
      _this.value = "&";
      return _this;
    }
    return Nesting2;
  }(_node["default"]);
  exports["default"] = Nesting;
  module.exports = exports.default;
})(nesting$1, nesting$1.exports);
var nestingExports = nesting$1.exports;
var sortAscending = { exports: {} };
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = sortAscending2;
  function sortAscending2(list) {
    return list.sort(function(a, b) {
      return a - b;
    });
  }
  module.exports = exports.default;
})(sortAscending, sortAscending.exports);
var sortAscendingExports = sortAscending.exports;
var tokenize = {};
var tokenTypes = {};
tokenTypes.__esModule = true;
tokenTypes.word = tokenTypes.tilde = tokenTypes.tab = tokenTypes.str = tokenTypes.space = tokenTypes.slash = tokenTypes.singleQuote = tokenTypes.semicolon = tokenTypes.plus = tokenTypes.pipe = tokenTypes.openSquare = tokenTypes.openParenthesis = tokenTypes.newline = tokenTypes.greaterThan = tokenTypes.feed = tokenTypes.equals = tokenTypes.doubleQuote = tokenTypes.dollar = tokenTypes.cr = tokenTypes.comment = tokenTypes.comma = tokenTypes.combinator = tokenTypes.colon = tokenTypes.closeSquare = tokenTypes.closeParenthesis = tokenTypes.caret = tokenTypes.bang = tokenTypes.backslash = tokenTypes.at = tokenTypes.asterisk = tokenTypes.ampersand = void 0;
var ampersand = 38;
tokenTypes.ampersand = ampersand;
var asterisk = 42;
tokenTypes.asterisk = asterisk;
var at = 64;
tokenTypes.at = at;
var comma = 44;
tokenTypes.comma = comma;
var colon = 58;
tokenTypes.colon = colon;
var semicolon = 59;
tokenTypes.semicolon = semicolon;
var openParenthesis = 40;
tokenTypes.openParenthesis = openParenthesis;
var closeParenthesis = 41;
tokenTypes.closeParenthesis = closeParenthesis;
var openSquare = 91;
tokenTypes.openSquare = openSquare;
var closeSquare = 93;
tokenTypes.closeSquare = closeSquare;
var dollar = 36;
tokenTypes.dollar = dollar;
var tilde = 126;
tokenTypes.tilde = tilde;
var caret = 94;
tokenTypes.caret = caret;
var plus = 43;
tokenTypes.plus = plus;
var equals = 61;
tokenTypes.equals = equals;
var pipe = 124;
tokenTypes.pipe = pipe;
var greaterThan = 62;
tokenTypes.greaterThan = greaterThan;
var space = 32;
tokenTypes.space = space;
var singleQuote = 39;
tokenTypes.singleQuote = singleQuote;
var doubleQuote = 34;
tokenTypes.doubleQuote = doubleQuote;
var slash = 47;
tokenTypes.slash = slash;
var bang = 33;
tokenTypes.bang = bang;
var backslash = 92;
tokenTypes.backslash = backslash;
var cr = 13;
tokenTypes.cr = cr;
var feed = 12;
tokenTypes.feed = feed;
var newline = 10;
tokenTypes.newline = newline;
var tab = 9;
tokenTypes.tab = tab;
var str = singleQuote;
tokenTypes.str = str;
var comment$1 = -1;
tokenTypes.comment = comment$1;
var word = -2;
tokenTypes.word = word;
var combinator$1 = -3;
tokenTypes.combinator = combinator$1;
(function(exports) {
  exports.__esModule = true;
  exports.FIELDS = void 0;
  exports["default"] = tokenize2;
  var t = _interopRequireWildcard(tokenTypes);
  var _unescapable, _wordDelimiters;
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
  var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
  var hex = {};
  var hexChars = "0123456789abcdefABCDEF";
  for (var i = 0; i < hexChars.length; i++) {
    hex[hexChars.charCodeAt(i)] = true;
  }
  function consumeWord(css, start) {
    var next = start;
    var code;
    do {
      code = css.charCodeAt(next);
      if (wordDelimiters[code]) {
        return next - 1;
      } else if (code === t.backslash) {
        next = consumeEscape(css, next) + 1;
      } else {
        next++;
      }
    } while (next < css.length);
    return next - 1;
  }
  function consumeEscape(css, start) {
    var next = start;
    var code = css.charCodeAt(next + 1);
    if (unescapable[code]) ;
    else if (hex[code]) {
      var hexDigits = 0;
      do {
        next++;
        hexDigits++;
        code = css.charCodeAt(next + 1);
      } while (hex[code] && hexDigits < 6);
      if (hexDigits < 6 && code === t.space) {
        next++;
      }
    } else {
      next++;
    }
    return next;
  }
  var FIELDS = {
    TYPE: 0,
    START_LINE: 1,
    START_COL: 2,
    END_LINE: 3,
    END_COL: 4,
    START_POS: 5,
    END_POS: 6
  };
  exports.FIELDS = FIELDS;
  function tokenize2(input) {
    var tokens = [];
    var css = input.css.valueOf();
    var _css = css, length = _css.length;
    var offset = -1;
    var line = 1;
    var start = 0;
    var end = 0;
    var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;
    function unclosed(what, fix) {
      if (input.safe) {
        css += fix;
        next = css.length - 1;
      } else {
        throw input.error("Unclosed " + what, line, start - offset, start);
      }
    }
    while (start < length) {
      code = css.charCodeAt(start);
      if (code === t.newline) {
        offset = start;
        line += 1;
      }
      switch (code) {
        case t.space:
        case t.tab:
        case t.newline:
        case t.cr:
        case t.feed:
          next = start;
          do {
            next += 1;
            code = css.charCodeAt(next);
            if (code === t.newline) {
              offset = next;
              line += 1;
            }
          } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);
          tokenType = t.space;
          endLine = line;
          endColumn = next - offset - 1;
          end = next;
          break;
        case t.plus:
        case t.greaterThan:
        case t.tilde:
        case t.pipe:
          next = start;
          do {
            next += 1;
            code = css.charCodeAt(next);
          } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);
          tokenType = t.combinator;
          endLine = line;
          endColumn = start - offset;
          end = next;
          break;
        case t.asterisk:
        case t.ampersand:
        case t.bang:
        case t.comma:
        case t.equals:
        case t.dollar:
        case t.caret:
        case t.openSquare:
        case t.closeSquare:
        case t.colon:
        case t.semicolon:
        case t.openParenthesis:
        case t.closeParenthesis:
          next = start;
          tokenType = code;
          endLine = line;
          endColumn = start - offset;
          end = next + 1;
          break;
        case t.singleQuote:
        case t.doubleQuote:
          quote = code === t.singleQuote ? "'" : '"';
          next = start;
          do {
            escaped = false;
            next = css.indexOf(quote, next + 1);
            if (next === -1) {
              unclosed("quote", quote);
            }
            escapePos = next;
            while (css.charCodeAt(escapePos - 1) === t.backslash) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);
          tokenType = t.str;
          endLine = line;
          endColumn = start - offset;
          end = next + 1;
          break;
        default:
          if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
            next = css.indexOf("*/", start + 2) + 1;
            if (next === 0) {
              unclosed("comment", "*/");
            }
            content = css.slice(start, next + 1);
            lines = content.split("\n");
            last = lines.length - 1;
            if (last > 0) {
              nextLine = line + last;
              nextOffset = next - lines[last].length;
            } else {
              nextLine = line;
              nextOffset = offset;
            }
            tokenType = t.comment;
            line = nextLine;
            endLine = nextLine;
            endColumn = next - nextOffset;
          } else if (code === t.slash) {
            next = start;
            tokenType = code;
            endLine = line;
            endColumn = start - offset;
            end = next + 1;
          } else {
            next = consumeWord(css, start);
            tokenType = t.word;
            endLine = line;
            endColumn = next - offset;
          }
          end = next + 1;
          break;
      }
      tokens.push([
        tokenType,
        // [0] Token type
        line,
        // [1] Starting line
        start - offset,
        // [2] Starting column
        endLine,
        // [3] Ending line
        endColumn,
        // [4] Ending column
        start,
        // [5] Start position / Source index
        end
        // [6] End position
      ]);
      if (nextOffset) {
        offset = nextOffset;
        nextOffset = null;
      }
      start = end;
    }
    return tokens;
  }
})(tokenize);
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _root2 = _interopRequireDefault2(rootExports);
  var _selector2 = _interopRequireDefault2(selectorExports);
  var _className2 = _interopRequireDefault2(classNameExports);
  var _comment2 = _interopRequireDefault2(commentExports);
  var _id2 = _interopRequireDefault2(idExports);
  var _tag2 = _interopRequireDefault2(tagExports);
  var _string2 = _interopRequireDefault2(stringExports);
  var _pseudo2 = _interopRequireDefault2(pseudoExports);
  var _attribute2 = _interopRequireWildcard(attribute$1);
  var _universal2 = _interopRequireDefault2(universalExports);
  var _combinator2 = _interopRequireDefault2(combinatorExports);
  var _nesting2 = _interopRequireDefault2(nestingExports);
  var _sortAscending = _interopRequireDefault2(sortAscendingExports);
  var _tokenize = _interopRequireWildcard(tokenize);
  var tokens = _interopRequireWildcard(tokenTypes);
  var types$1 = _interopRequireWildcard(types);
  var _util = util;
  var _WHITESPACE_TOKENS, _Object$assign;
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
  var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));
  function tokenStart(token) {
    return {
      line: token[_tokenize.FIELDS.START_LINE],
      column: token[_tokenize.FIELDS.START_COL]
    };
  }
  function tokenEnd(token) {
    return {
      line: token[_tokenize.FIELDS.END_LINE],
      column: token[_tokenize.FIELDS.END_COL]
    };
  }
  function getSource(startLine, startColumn, endLine, endColumn) {
    return {
      start: {
        line: startLine,
        column: startColumn
      },
      end: {
        line: endLine,
        column: endColumn
      }
    };
  }
  function getTokenSource(token) {
    return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
  }
  function getTokenSourceSpan(startToken, endToken) {
    if (!startToken) {
      return void 0;
    }
    return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
  }
  function unescapeProp(node2, prop) {
    var value = node2[prop];
    if (typeof value !== "string") {
      return;
    }
    if (value.indexOf("\\") !== -1) {
      (0, _util.ensureObject)(node2, "raws");
      node2[prop] = (0, _util.unesc)(value);
      if (node2.raws[prop] === void 0) {
        node2.raws[prop] = value;
      }
    }
    return node2;
  }
  function indexesOf(array, item) {
    var i = -1;
    var indexes = [];
    while ((i = array.indexOf(item, i + 1)) !== -1) {
      indexes.push(i);
    }
    return indexes;
  }
  function uniqs() {
    var list = Array.prototype.concat.apply([], arguments);
    return list.filter(function(item, i) {
      return i === list.indexOf(item);
    });
  }
  var Parser2 = function() {
    function Parser3(rule, options) {
      if (options === void 0) {
        options = {};
      }
      this.rule = rule;
      this.options = Object.assign({
        lossy: false,
        safe: false
      }, options);
      this.position = 0;
      this.css = typeof this.rule === "string" ? this.rule : this.rule.selector;
      this.tokens = (0, _tokenize["default"])({
        css: this.css,
        error: this._errorGenerator(),
        safe: this.options.safe
      });
      var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
      this.root = new _root2["default"]({
        source: rootSource
      });
      this.root.errorGenerator = this._errorGenerator();
      var selector3 = new _selector2["default"]({
        source: {
          start: {
            line: 1,
            column: 1
          }
        },
        sourceIndex: 0
      });
      this.root.append(selector3);
      this.current = selector3;
      this.loop();
    }
    var _proto = Parser3.prototype;
    _proto._errorGenerator = function _errorGenerator() {
      var _this = this;
      return function(message, errorOptions) {
        if (typeof _this.rule === "string") {
          return new Error(message);
        }
        return _this.rule.error(message, errorOptions);
      };
    };
    _proto.attribute = function attribute3() {
      var attr = [];
      var startingToken = this.currToken;
      this.position++;
      while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
        attr.push(this.currToken);
        this.position++;
      }
      if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
        return this.expected("closing square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
      }
      var len = attr.length;
      var node2 = {
        source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
        sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
      };
      if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
        return this.expected("attribute", attr[0][_tokenize.FIELDS.START_POS]);
      }
      var pos = 0;
      var spaceBefore = "";
      var commentBefore = "";
      var lastAdded = null;
      var spaceAfterMeaningfulToken = false;
      while (pos < len) {
        var token = attr[pos];
        var content = this.content(token);
        var next = attr[pos + 1];
        switch (token[_tokenize.FIELDS.TYPE]) {
          case tokens.space:
            spaceAfterMeaningfulToken = true;
            if (this.options.lossy) {
              break;
            }
            if (lastAdded) {
              (0, _util.ensureObject)(node2, "spaces", lastAdded);
              var prevContent = node2.spaces[lastAdded].after || "";
              node2.spaces[lastAdded].after = prevContent + content;
              var existingComment = (0, _util.getProp)(node2, "raws", "spaces", lastAdded, "after") || null;
              if (existingComment) {
                node2.raws.spaces[lastAdded].after = existingComment + content;
              }
            } else {
              spaceBefore = spaceBefore + content;
              commentBefore = commentBefore + content;
            }
            break;
          case tokens.asterisk:
            if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
              node2.operator = content;
              lastAdded = "operator";
            } else if ((!node2.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
              if (spaceBefore) {
                (0, _util.ensureObject)(node2, "spaces", "attribute");
                node2.spaces.attribute.before = spaceBefore;
                spaceBefore = "";
              }
              if (commentBefore) {
                (0, _util.ensureObject)(node2, "raws", "spaces", "attribute");
                node2.raws.spaces.attribute.before = spaceBefore;
                commentBefore = "";
              }
              node2.namespace = (node2.namespace || "") + content;
              var rawValue = (0, _util.getProp)(node2, "raws", "namespace") || null;
              if (rawValue) {
                node2.raws.namespace += content;
              }
              lastAdded = "namespace";
            }
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.dollar:
            if (lastAdded === "value") {
              var oldRawValue = (0, _util.getProp)(node2, "raws", "value");
              node2.value += "$";
              if (oldRawValue) {
                node2.raws.value = oldRawValue + "$";
              }
              break;
            }
          case tokens.caret:
            if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
              node2.operator = content;
              lastAdded = "operator";
            }
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.combinator:
            if (content === "~" && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
              node2.operator = content;
              lastAdded = "operator";
            }
            if (content !== "|") {
              spaceAfterMeaningfulToken = false;
              break;
            }
            if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
              node2.operator = content;
              lastAdded = "operator";
            } else if (!node2.namespace && !node2.attribute) {
              node2.namespace = true;
            }
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.word:
            if (next && this.content(next) === "|" && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
            !node2.operator && !node2.namespace) {
              node2.namespace = content;
              lastAdded = "namespace";
            } else if (!node2.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
              if (spaceBefore) {
                (0, _util.ensureObject)(node2, "spaces", "attribute");
                node2.spaces.attribute.before = spaceBefore;
                spaceBefore = "";
              }
              if (commentBefore) {
                (0, _util.ensureObject)(node2, "raws", "spaces", "attribute");
                node2.raws.spaces.attribute.before = commentBefore;
                commentBefore = "";
              }
              node2.attribute = (node2.attribute || "") + content;
              var _rawValue = (0, _util.getProp)(node2, "raws", "attribute") || null;
              if (_rawValue) {
                node2.raws.attribute += content;
              }
              lastAdded = "attribute";
            } else if (!node2.value && node2.value !== "" || lastAdded === "value" && !(spaceAfterMeaningfulToken || node2.quoteMark)) {
              var _unescaped = (0, _util.unesc)(content);
              var _oldRawValue = (0, _util.getProp)(node2, "raws", "value") || "";
              var oldValue = node2.value || "";
              node2.value = oldValue + _unescaped;
              node2.quoteMark = null;
              if (_unescaped !== content || _oldRawValue) {
                (0, _util.ensureObject)(node2, "raws");
                node2.raws.value = (_oldRawValue || oldValue) + content;
              }
              lastAdded = "value";
            } else {
              var insensitive = content === "i" || content === "I";
              if ((node2.value || node2.value === "") && (node2.quoteMark || spaceAfterMeaningfulToken)) {
                node2.insensitive = insensitive;
                if (!insensitive || content === "I") {
                  (0, _util.ensureObject)(node2, "raws");
                  node2.raws.insensitiveFlag = content;
                }
                lastAdded = "insensitive";
                if (spaceBefore) {
                  (0, _util.ensureObject)(node2, "spaces", "insensitive");
                  node2.spaces.insensitive.before = spaceBefore;
                  spaceBefore = "";
                }
                if (commentBefore) {
                  (0, _util.ensureObject)(node2, "raws", "spaces", "insensitive");
                  node2.raws.spaces.insensitive.before = commentBefore;
                  commentBefore = "";
                }
              } else if (node2.value || node2.value === "") {
                lastAdded = "value";
                node2.value += content;
                if (node2.raws.value) {
                  node2.raws.value += content;
                }
              }
            }
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.str:
            if (!node2.attribute || !node2.operator) {
              return this.error("Expected an attribute followed by an operator preceding the string.", {
                index: token[_tokenize.FIELDS.START_POS]
              });
            }
            var _unescapeValue = (0, _attribute2.unescapeValue)(content), unescaped = _unescapeValue.unescaped, quoteMark = _unescapeValue.quoteMark;
            node2.value = unescaped;
            node2.quoteMark = quoteMark;
            lastAdded = "value";
            (0, _util.ensureObject)(node2, "raws");
            node2.raws.value = content;
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.equals:
            if (!node2.attribute) {
              return this.expected("attribute", token[_tokenize.FIELDS.START_POS], content);
            }
            if (node2.value) {
              return this.error('Unexpected "=" found; an operator was already defined.', {
                index: token[_tokenize.FIELDS.START_POS]
              });
            }
            node2.operator = node2.operator ? node2.operator + content : content;
            lastAdded = "operator";
            spaceAfterMeaningfulToken = false;
            break;
          case tokens.comment:
            if (lastAdded) {
              if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === "insensitive") {
                var lastComment = (0, _util.getProp)(node2, "spaces", lastAdded, "after") || "";
                var rawLastComment = (0, _util.getProp)(node2, "raws", "spaces", lastAdded, "after") || lastComment;
                (0, _util.ensureObject)(node2, "raws", "spaces", lastAdded);
                node2.raws.spaces[lastAdded].after = rawLastComment + content;
              } else {
                var lastValue = node2[lastAdded] || "";
                var rawLastValue = (0, _util.getProp)(node2, "raws", lastAdded) || lastValue;
                (0, _util.ensureObject)(node2, "raws");
                node2.raws[lastAdded] = rawLastValue + content;
              }
            } else {
              commentBefore = commentBefore + content;
            }
            break;
          default:
            return this.error('Unexpected "' + content + '" found.', {
              index: token[_tokenize.FIELDS.START_POS]
            });
        }
        pos++;
      }
      unescapeProp(node2, "attribute");
      unescapeProp(node2, "namespace");
      this.newNode(new _attribute2["default"](node2));
      this.position++;
    };
    _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
      if (stopPosition < 0) {
        stopPosition = this.tokens.length;
      }
      var startPosition = this.position;
      var nodes = [];
      var space2 = "";
      var lastComment = void 0;
      do {
        if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
          if (!this.options.lossy) {
            space2 += this.content();
          }
        } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
          var spaces = {};
          if (space2) {
            spaces.before = space2;
            space2 = "";
          }
          lastComment = new _comment2["default"]({
            value: this.content(),
            source: getTokenSource(this.currToken),
            sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
            spaces
          });
          nodes.push(lastComment);
        }
      } while (++this.position < stopPosition);
      if (space2) {
        if (lastComment) {
          lastComment.spaces.after = space2;
        } else if (!this.options.lossy) {
          var firstToken = this.tokens[startPosition];
          var lastToken = this.tokens[this.position - 1];
          nodes.push(new _string2["default"]({
            value: "",
            source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
            sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
            spaces: {
              before: space2,
              after: ""
            }
          }));
        }
      }
      return nodes;
    };
    _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
      var _this2 = this;
      if (requiredSpace === void 0) {
        requiredSpace = false;
      }
      var space2 = "";
      var rawSpace = "";
      nodes.forEach(function(n) {
        var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
        var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
        space2 += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
        rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
      });
      if (rawSpace === space2) {
        rawSpace = void 0;
      }
      var result = {
        space: space2,
        rawSpace
      };
      return result;
    };
    _proto.isNamedCombinator = function isNamedCombinator(position) {
      if (position === void 0) {
        position = this.position;
      }
      return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
    };
    _proto.namedCombinator = function namedCombinator() {
      if (this.isNamedCombinator()) {
        var nameRaw = this.content(this.tokens[this.position + 1]);
        var name = (0, _util.unesc)(nameRaw).toLowerCase();
        var raws = {};
        if (name !== nameRaw) {
          raws.value = "/" + nameRaw + "/";
        }
        var node2 = new _combinator2["default"]({
          value: "/" + name + "/",
          source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
          sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
          raws
        });
        this.position = this.position + 3;
        return node2;
      } else {
        this.unexpected();
      }
    };
    _proto.combinator = function combinator3() {
      var _this3 = this;
      if (this.content() === "|") {
        return this.namespace();
      }
      var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);
      if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
        var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
        if (nodes.length > 0) {
          var last = this.current.last;
          if (last) {
            var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes), space2 = _this$convertWhitespa.space, rawSpace = _this$convertWhitespa.rawSpace;
            if (rawSpace !== void 0) {
              last.rawSpaceAfter += rawSpace;
            }
            last.spaces.after += space2;
          } else {
            nodes.forEach(function(n) {
              return _this3.newNode(n);
            });
          }
        }
        return;
      }
      var firstToken = this.currToken;
      var spaceOrDescendantSelectorNodes = void 0;
      if (nextSigTokenPos > this.position) {
        spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
      }
      var node2;
      if (this.isNamedCombinator()) {
        node2 = this.namedCombinator();
      } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
        node2 = new _combinator2["default"]({
          value: this.content(),
          source: getTokenSource(this.currToken),
          sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
        });
        this.position++;
      } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) ;
      else if (!spaceOrDescendantSelectorNodes) {
        this.unexpected();
      }
      if (node2) {
        if (spaceOrDescendantSelectorNodes) {
          var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes), _space = _this$convertWhitespa2.space, _rawSpace = _this$convertWhitespa2.rawSpace;
          node2.spaces.before = _space;
          node2.rawSpaceBefore = _rawSpace;
        }
      } else {
        var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true), _space2 = _this$convertWhitespa3.space, _rawSpace2 = _this$convertWhitespa3.rawSpace;
        if (!_rawSpace2) {
          _rawSpace2 = _space2;
        }
        var spaces = {};
        var raws = {
          spaces: {}
        };
        if (_space2.endsWith(" ") && _rawSpace2.endsWith(" ")) {
          spaces.before = _space2.slice(0, _space2.length - 1);
          raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
        } else if (_space2.startsWith(" ") && _rawSpace2.startsWith(" ")) {
          spaces.after = _space2.slice(1);
          raws.spaces.after = _rawSpace2.slice(1);
        } else {
          raws.value = _rawSpace2;
        }
        node2 = new _combinator2["default"]({
          value: " ",
          source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
          sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
          spaces,
          raws
        });
      }
      if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
        node2.spaces.after = this.optionalSpace(this.content());
        this.position++;
      }
      return this.newNode(node2);
    };
    _proto.comma = function comma2() {
      if (this.position === this.tokens.length - 1) {
        this.root.trailingComma = true;
        this.position++;
        return;
      }
      this.current._inferEndPosition();
      var selector3 = new _selector2["default"]({
        source: {
          start: tokenStart(this.tokens[this.position + 1])
        },
        sourceIndex: this.tokens[this.position + 1][_tokenize.FIELDS.START_POS]
      });
      this.current.parent.append(selector3);
      this.current = selector3;
      this.position++;
    };
    _proto.comment = function comment3() {
      var current = this.currToken;
      this.newNode(new _comment2["default"]({
        value: this.content(),
        source: getTokenSource(current),
        sourceIndex: current[_tokenize.FIELDS.START_POS]
      }));
      this.position++;
    };
    _proto.error = function error(message, opts) {
      throw this.root.error(message, opts);
    };
    _proto.missingBackslash = function missingBackslash() {
      return this.error("Expected a backslash preceding the semicolon.", {
        index: this.currToken[_tokenize.FIELDS.START_POS]
      });
    };
    _proto.missingParenthesis = function missingParenthesis() {
      return this.expected("opening parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
    };
    _proto.missingSquareBracket = function missingSquareBracket() {
      return this.expected("opening square bracket", this.currToken[_tokenize.FIELDS.START_POS]);
    };
    _proto.unexpected = function unexpected() {
      return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
    };
    _proto.unexpectedPipe = function unexpectedPipe() {
      return this.error("Unexpected '|'.", this.currToken[_tokenize.FIELDS.START_POS]);
    };
    _proto.namespace = function namespace2() {
      var before = this.prevToken && this.content(this.prevToken) || true;
      if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
        this.position++;
        return this.word(before);
      } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
        this.position++;
        return this.universal(before);
      }
      this.unexpectedPipe();
    };
    _proto.nesting = function nesting3() {
      if (this.nextToken) {
        var nextContent = this.content(this.nextToken);
        if (nextContent === "|") {
          this.position++;
          return;
        }
      }
      var current = this.currToken;
      this.newNode(new _nesting2["default"]({
        value: this.content(),
        source: getTokenSource(current),
        sourceIndex: current[_tokenize.FIELDS.START_POS]
      }));
      this.position++;
    };
    _proto.parentheses = function parentheses() {
      var last = this.current.last;
      var unbalanced = 1;
      this.position++;
      if (last && last.type === types$1.PSEUDO) {
        var selector3 = new _selector2["default"]({
          source: {
            start: tokenStart(this.tokens[this.position])
          },
          sourceIndex: this.tokens[this.position][_tokenize.FIELDS.START_POS]
        });
        var cache = this.current;
        last.append(selector3);
        this.current = selector3;
        while (this.position < this.tokens.length && unbalanced) {
          if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
            unbalanced++;
          }
          if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
            unbalanced--;
          }
          if (unbalanced) {
            this.parse();
          } else {
            this.current.source.end = tokenEnd(this.currToken);
            this.current.parent.source.end = tokenEnd(this.currToken);
            this.position++;
          }
        }
        this.current = cache;
      } else {
        var parenStart = this.currToken;
        var parenValue = "(";
        var parenEnd;
        while (this.position < this.tokens.length && unbalanced) {
          if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
            unbalanced++;
          }
          if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
            unbalanced--;
          }
          parenEnd = this.currToken;
          parenValue += this.parseParenthesisToken(this.currToken);
          this.position++;
        }
        if (last) {
          last.appendToPropertyAndEscape("value", parenValue, parenValue);
        } else {
          this.newNode(new _string2["default"]({
            value: parenValue,
            source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
            sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
          }));
        }
      }
      if (unbalanced) {
        return this.expected("closing parenthesis", this.currToken[_tokenize.FIELDS.START_POS]);
      }
    };
    _proto.pseudo = function pseudo3() {
      var _this4 = this;
      var pseudoStr = "";
      var startingToken = this.currToken;
      while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
        pseudoStr += this.content();
        this.position++;
      }
      if (!this.currToken) {
        return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
      }
      if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
        this.splitWord(false, function(first, length) {
          pseudoStr += first;
          _this4.newNode(new _pseudo2["default"]({
            value: pseudoStr,
            source: getTokenSourceSpan(startingToken, _this4.currToken),
            sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
          }));
          if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
            _this4.error("Misplaced parenthesis.", {
              index: _this4.nextToken[_tokenize.FIELDS.START_POS]
            });
          }
        });
      } else {
        return this.expected(["pseudo-class", "pseudo-element"], this.currToken[_tokenize.FIELDS.START_POS]);
      }
    };
    _proto.space = function space2() {
      var content = this.content();
      if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis || this.current.nodes.every(function(node2) {
        return node2.type === "comment";
      })) {
        this.spaces = this.optionalSpace(content);
        this.position++;
      } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
        this.current.last.spaces.after = this.optionalSpace(content);
        this.position++;
      } else {
        this.combinator();
      }
    };
    _proto.string = function string3() {
      var current = this.currToken;
      this.newNode(new _string2["default"]({
        value: this.content(),
        source: getTokenSource(current),
        sourceIndex: current[_tokenize.FIELDS.START_POS]
      }));
      this.position++;
    };
    _proto.universal = function universal3(namespace2) {
      var nextToken = this.nextToken;
      if (nextToken && this.content(nextToken) === "|") {
        this.position++;
        return this.namespace();
      }
      var current = this.currToken;
      this.newNode(new _universal2["default"]({
        value: this.content(),
        source: getTokenSource(current),
        sourceIndex: current[_tokenize.FIELDS.START_POS]
      }), namespace2);
      this.position++;
    };
    _proto.splitWord = function splitWord(namespace2, firstCallback) {
      var _this5 = this;
      var nextToken = this.nextToken;
      var word2 = this.content();
      while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
        this.position++;
        var current = this.content();
        word2 += current;
        if (current.lastIndexOf("\\") === current.length - 1) {
          var next = this.nextToken;
          if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
            word2 += this.requiredSpace(this.content(next));
            this.position++;
          }
        }
        nextToken = this.nextToken;
      }
      var hasClass = indexesOf(word2, ".").filter(function(i) {
        var escapedDot = word2[i - 1] === "\\";
        var isKeyframesPercent = /^\d+\.\d+%$/.test(word2);
        return !escapedDot && !isKeyframesPercent;
      });
      var hasId = indexesOf(word2, "#").filter(function(i) {
        return word2[i - 1] !== "\\";
      });
      var interpolations = indexesOf(word2, "#{");
      if (interpolations.length) {
        hasId = hasId.filter(function(hashIndex) {
          return !~interpolations.indexOf(hashIndex);
        });
      }
      var indices = (0, _sortAscending["default"])(uniqs([0].concat(hasClass, hasId)));
      indices.forEach(function(ind, i) {
        var index2 = indices[i + 1] || word2.length;
        var value = word2.slice(ind, index2);
        if (i === 0 && firstCallback) {
          return firstCallback.call(_this5, value, indices.length);
        }
        var node2;
        var current2 = _this5.currToken;
        var sourceIndex = current2[_tokenize.FIELDS.START_POS] + indices[i];
        var source = getSource(current2[1], current2[2] + ind, current2[3], current2[2] + (index2 - 1));
        if (~hasClass.indexOf(ind)) {
          var classNameOpts = {
            value: value.slice(1),
            source,
            sourceIndex
          };
          node2 = new _className2["default"](unescapeProp(classNameOpts, "value"));
        } else if (~hasId.indexOf(ind)) {
          var idOpts = {
            value: value.slice(1),
            source,
            sourceIndex
          };
          node2 = new _id2["default"](unescapeProp(idOpts, "value"));
        } else {
          var tagOpts = {
            value,
            source,
            sourceIndex
          };
          unescapeProp(tagOpts, "value");
          node2 = new _tag2["default"](tagOpts);
        }
        _this5.newNode(node2, namespace2);
        namespace2 = null;
      });
      this.position++;
    };
    _proto.word = function word2(namespace2) {
      var nextToken = this.nextToken;
      if (nextToken && this.content(nextToken) === "|") {
        this.position++;
        return this.namespace();
      }
      return this.splitWord(namespace2);
    };
    _proto.loop = function loop() {
      while (this.position < this.tokens.length) {
        this.parse(true);
      }
      this.current._inferEndPosition();
      return this.root;
    };
    _proto.parse = function parse(throwOnParenthesis) {
      switch (this.currToken[_tokenize.FIELDS.TYPE]) {
        case tokens.space:
          this.space();
          break;
        case tokens.comment:
          this.comment();
          break;
        case tokens.openParenthesis:
          this.parentheses();
          break;
        case tokens.closeParenthesis:
          if (throwOnParenthesis) {
            this.missingParenthesis();
          }
          break;
        case tokens.openSquare:
          this.attribute();
          break;
        case tokens.dollar:
        case tokens.caret:
        case tokens.equals:
        case tokens.word:
          this.word();
          break;
        case tokens.colon:
          this.pseudo();
          break;
        case tokens.comma:
          this.comma();
          break;
        case tokens.asterisk:
          this.universal();
          break;
        case tokens.ampersand:
          this.nesting();
          break;
        case tokens.slash:
        case tokens.combinator:
          this.combinator();
          break;
        case tokens.str:
          this.string();
          break;
        case tokens.closeSquare:
          this.missingSquareBracket();
        case tokens.semicolon:
          this.missingBackslash();
        default:
          this.unexpected();
      }
    };
    _proto.expected = function expected(description, index2, found) {
      if (Array.isArray(description)) {
        var last = description.pop();
        description = description.join(", ") + " or " + last;
      }
      var an = /^[aeiou]/.test(description[0]) ? "an" : "a";
      if (!found) {
        return this.error("Expected " + an + " " + description + ".", {
          index: index2
        });
      }
      return this.error("Expected " + an + " " + description + ', found "' + found + '" instead.', {
        index: index2
      });
    };
    _proto.requiredSpace = function requiredSpace(space2) {
      return this.options.lossy ? " " : space2;
    };
    _proto.optionalSpace = function optionalSpace(space2) {
      return this.options.lossy ? "" : space2;
    };
    _proto.lossySpace = function lossySpace(space2, required) {
      if (this.options.lossy) {
        return required ? " " : "";
      } else {
        return space2;
      }
    };
    _proto.parseParenthesisToken = function parseParenthesisToken(token) {
      var content = this.content(token);
      if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
        return this.requiredSpace(content);
      } else {
        return content;
      }
    };
    _proto.newNode = function newNode(node2, namespace2) {
      if (namespace2) {
        if (/^ +$/.test(namespace2)) {
          if (!this.options.lossy) {
            this.spaces = (this.spaces || "") + namespace2;
          }
          namespace2 = true;
        }
        node2.namespace = namespace2;
        unescapeProp(node2, "namespace");
      }
      if (this.spaces) {
        node2.spaces.before = this.spaces;
        this.spaces = "";
      }
      return this.current.append(node2);
    };
    _proto.content = function content(token) {
      if (token === void 0) {
        token = this.currToken;
      }
      return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
    };
    _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
      if (startPosition === void 0) {
        startPosition = this.position + 1;
      }
      var searchPosition = startPosition;
      while (searchPosition < this.tokens.length) {
        if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
          searchPosition++;
          continue;
        } else {
          return searchPosition;
        }
      }
      return -1;
    };
    _createClass(Parser3, [{
      key: "currToken",
      get: function get() {
        return this.tokens[this.position];
      }
    }, {
      key: "nextToken",
      get: function get() {
        return this.tokens[this.position + 1];
      }
    }, {
      key: "prevToken",
      get: function get() {
        return this.tokens[this.position - 1];
      }
    }]);
    return Parser3;
  }();
  exports["default"] = Parser2;
  module.exports = exports.default;
})(parser, parser.exports);
var parserExports = parser.exports;
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _parser = _interopRequireDefault2(parserExports);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var Processor = function() {
    function Processor2(func, options) {
      this.func = func || function noop() {
      };
      this.funcRes = null;
      this.options = options;
    }
    var _proto = Processor2.prototype;
    _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
      if (options === void 0) {
        options = {};
      }
      var merged = Object.assign({}, this.options, options);
      if (merged.updateSelector === false) {
        return false;
      } else {
        return typeof rule !== "string";
      }
    };
    _proto._isLossy = function _isLossy(options) {
      if (options === void 0) {
        options = {};
      }
      var merged = Object.assign({}, this.options, options);
      if (merged.lossless === false) {
        return true;
      } else {
        return false;
      }
    };
    _proto._root = function _root2(rule, options) {
      if (options === void 0) {
        options = {};
      }
      var parser2 = new _parser["default"](rule, this._parseOptions(options));
      return parser2.root;
    };
    _proto._parseOptions = function _parseOptions(options) {
      return {
        lossy: this._isLossy(options)
      };
    };
    _proto._run = function _run(rule, options) {
      var _this = this;
      if (options === void 0) {
        options = {};
      }
      return new Promise(function(resolve, reject) {
        try {
          var root3 = _this._root(rule, options);
          Promise.resolve(_this.func(root3)).then(function(transform) {
            var string3 = void 0;
            if (_this._shouldUpdateSelector(rule, options)) {
              string3 = root3.toString();
              rule.selector = string3;
            }
            return {
              transform,
              root: root3,
              string: string3
            };
          }).then(resolve, reject);
        } catch (e) {
          reject(e);
          return;
        }
      });
    };
    _proto._runSync = function _runSync(rule, options) {
      if (options === void 0) {
        options = {};
      }
      var root3 = this._root(rule, options);
      var transform = this.func(root3);
      if (transform && typeof transform.then === "function") {
        throw new Error("Selector processor returned a promise to a synchronous call.");
      }
      var string3 = void 0;
      if (options.updateSelector && typeof rule !== "string") {
        string3 = root3.toString();
        rule.selector = string3;
      }
      return {
        transform,
        root: root3,
        string: string3
      };
    };
    _proto.ast = function ast(rule, options) {
      return this._run(rule, options).then(function(result) {
        return result.root;
      });
    };
    _proto.astSync = function astSync(rule, options) {
      return this._runSync(rule, options).root;
    };
    _proto.transform = function transform(rule, options) {
      return this._run(rule, options).then(function(result) {
        return result.transform;
      });
    };
    _proto.transformSync = function transformSync(rule, options) {
      return this._runSync(rule, options).transform;
    };
    _proto.process = function process2(rule, options) {
      return this._run(rule, options).then(function(result) {
        return result.string || result.root.toString();
      });
    };
    _proto.processSync = function processSync(rule, options) {
      var result = this._runSync(rule, options);
      return result.string || result.root.toString();
    };
    return Processor2;
  }();
  exports["default"] = Processor;
  module.exports = exports.default;
})(processor, processor.exports);
var processorExports = processor.exports;
var selectors = {};
var constructors = {};
constructors.__esModule = true;
constructors.universal = constructors.tag = constructors.string = constructors.selector = constructors.root = constructors.pseudo = constructors.nesting = constructors.id = constructors.comment = constructors.combinator = constructors.className = constructors.attribute = void 0;
var _attribute = _interopRequireDefault$2(attribute$1);
var _className = _interopRequireDefault$2(classNameExports);
var _combinator = _interopRequireDefault$2(combinatorExports);
var _comment = _interopRequireDefault$2(commentExports);
var _id = _interopRequireDefault$2(idExports);
var _nesting = _interopRequireDefault$2(nestingExports);
var _pseudo = _interopRequireDefault$2(pseudoExports);
var _root = _interopRequireDefault$2(rootExports);
var _selector = _interopRequireDefault$2(selectorExports);
var _string = _interopRequireDefault$2(stringExports);
var _tag = _interopRequireDefault$2(tagExports);
var _universal = _interopRequireDefault$2(universalExports);
function _interopRequireDefault$2(obj) {
  return obj && obj.__esModule ? obj : { "default": obj };
}
var attribute = function attribute2(opts) {
  return new _attribute["default"](opts);
};
constructors.attribute = attribute;
var className = function className2(opts) {
  return new _className["default"](opts);
};
constructors.className = className;
var combinator = function combinator2(opts) {
  return new _combinator["default"](opts);
};
constructors.combinator = combinator;
var comment = function comment2(opts) {
  return new _comment["default"](opts);
};
constructors.comment = comment;
var id = function id2(opts) {
  return new _id["default"](opts);
};
constructors.id = id;
var nesting = function nesting2(opts) {
  return new _nesting["default"](opts);
};
constructors.nesting = nesting;
var pseudo = function pseudo2(opts) {
  return new _pseudo["default"](opts);
};
constructors.pseudo = pseudo;
var root = function root2(opts) {
  return new _root["default"](opts);
};
constructors.root = root;
var selector = function selector2(opts) {
  return new _selector["default"](opts);
};
constructors.selector = selector;
var string = function string2(opts) {
  return new _string["default"](opts);
};
constructors.string = string;
var tag = function tag2(opts) {
  return new _tag["default"](opts);
};
constructors.tag = tag;
var universal = function universal2(opts) {
  return new _universal["default"](opts);
};
constructors.universal = universal;
var guards = {};
guards.__esModule = true;
guards.isComment = guards.isCombinator = guards.isClassName = guards.isAttribute = void 0;
guards.isContainer = isContainer;
guards.isIdentifier = void 0;
guards.isNamespace = isNamespace;
guards.isNesting = void 0;
guards.isNode = isNode;
guards.isPseudo = void 0;
guards.isPseudoClass = isPseudoClass;
guards.isPseudoElement = isPseudoElement;
guards.isUniversal = guards.isTag = guards.isString = guards.isSelector = guards.isRoot = void 0;
var _types = types;
var _IS_TYPE;
var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);
function isNode(node2) {
  return typeof node2 === "object" && IS_TYPE[node2.type];
}
function isNodeType(type, node2) {
  return isNode(node2) && node2.type === type;
}
var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
guards.isAttribute = isAttribute;
var isClassName = isNodeType.bind(null, _types.CLASS);
guards.isClassName = isClassName;
var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
guards.isCombinator = isCombinator;
var isComment = isNodeType.bind(null, _types.COMMENT);
guards.isComment = isComment;
var isIdentifier = isNodeType.bind(null, _types.ID);
guards.isIdentifier = isIdentifier;
var isNesting = isNodeType.bind(null, _types.NESTING);
guards.isNesting = isNesting;
var isPseudo = isNodeType.bind(null, _types.PSEUDO);
guards.isPseudo = isPseudo;
var isRoot = isNodeType.bind(null, _types.ROOT);
guards.isRoot = isRoot;
var isSelector = isNodeType.bind(null, _types.SELECTOR);
guards.isSelector = isSelector;
var isString = isNodeType.bind(null, _types.STRING);
guards.isString = isString;
var isTag = isNodeType.bind(null, _types.TAG);
guards.isTag = isTag;
var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
guards.isUniversal = isUniversal;
function isPseudoElement(node2) {
  return isPseudo(node2) && node2.value && (node2.value.startsWith("::") || node2.value.toLowerCase() === ":before" || node2.value.toLowerCase() === ":after" || node2.value.toLowerCase() === ":first-letter" || node2.value.toLowerCase() === ":first-line");
}
function isPseudoClass(node2) {
  return isPseudo(node2) && !isPseudoElement(node2);
}
function isContainer(node2) {
  return !!(isNode(node2) && node2.walk);
}
function isNamespace(node2) {
  return isAttribute(node2) || isTag(node2);
}
(function(exports) {
  exports.__esModule = true;
  var _types2 = types;
  Object.keys(_types2).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _types2[key]) return;
    exports[key] = _types2[key];
  });
  var _constructors = constructors;
  Object.keys(_constructors).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _constructors[key]) return;
    exports[key] = _constructors[key];
  });
  var _guards = guards;
  Object.keys(_guards).forEach(function(key) {
    if (key === "default" || key === "__esModule") return;
    if (key in exports && exports[key] === _guards[key]) return;
    exports[key] = _guards[key];
  });
})(selectors);
(function(module, exports) {
  exports.__esModule = true;
  exports["default"] = void 0;
  var _processor = _interopRequireDefault2(processorExports);
  var selectors$1 = _interopRequireWildcard(selectors);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
    var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return { "default": obj };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
      return cache.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj["default"] = obj;
    if (cache) {
      cache.set(obj, newObj);
    }
    return newObj;
  }
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  var parser2 = function parser3(processor2) {
    return new _processor["default"](processor2);
  };
  Object.assign(parser2, selectors$1);
  delete parser2.__esModule;
  var _default = parser2;
  exports["default"] = _default;
  module.exports = exports.default;
})(dist, dist.exports);
var distExports = dist.exports;
var selectorParser$1 = distExports;
var valueParser = lib;
var { extractICSS } = src$4;
var isSpacing = (node2) => node2.type === "combinator" && node2.value === " ";
function normalizeNodeArray(nodes) {
  const array = [];
  nodes.forEach((x) => {
    if (Array.isArray(x)) {
      normalizeNodeArray(x).forEach((item) => {
        array.push(item);
      });
    } else if (x) {
      array.push(x);
    }
  });
  if (array.length > 0 && isSpacing(array[array.length - 1])) {
    array.pop();
  }
  return array;
}
function localizeNode(rule, mode, localAliasMap) {
  const transform = (node2, context) => {
    if (context.ignoreNextSpacing && !isSpacing(node2)) {
      throw new Error("Missing whitespace after " + context.ignoreNextSpacing);
    }
    if (context.enforceNoSpacing && isSpacing(node2)) {
      throw new Error("Missing whitespace before " + context.enforceNoSpacing);
    }
    let newNodes;
    switch (node2.type) {
      case "root": {
        let resultingGlobal;
        context.hasPureGlobals = false;
        newNodes = node2.nodes.map((n) => {
          const nContext = {
            global: context.global,
            lastWasSpacing: true,
            hasLocals: false,
            explicit: false
          };
          n = transform(n, nContext);
          if (typeof resultingGlobal === "undefined") {
            resultingGlobal = nContext.global;
          } else if (resultingGlobal !== nContext.global) {
            throw new Error(
              'Inconsistent rule global/local result in rule "' + node2 + '" (multiple selectors must result in the same mode for the rule)'
            );
          }
          if (!nContext.hasLocals) {
            context.hasPureGlobals = true;
          }
          return n;
        });
        context.global = resultingGlobal;
        node2.nodes = normalizeNodeArray(newNodes);
        break;
      }
      case "selector": {
        newNodes = node2.map((childNode) => transform(childNode, context));
        node2 = node2.clone();
        node2.nodes = normalizeNodeArray(newNodes);
        break;
      }
      case "combinator": {
        if (isSpacing(node2)) {
          if (context.ignoreNextSpacing) {
            context.ignoreNextSpacing = false;
            context.lastWasSpacing = false;
            context.enforceNoSpacing = false;
            return null;
          }
          context.lastWasSpacing = true;
          return node2;
        }
        break;
      }
      case "pseudo": {
        let childContext;
        const isNested = !!node2.length;
        const isScoped = node2.value === ":local" || node2.value === ":global";
        const isImportExport = node2.value === ":import" || node2.value === ":export";
        if (isImportExport) {
          context.hasLocals = true;
        } else if (isNested) {
          if (isScoped) {
            if (node2.nodes.length === 0) {
              throw new Error(`${node2.value}() can't be empty`);
            }
            if (context.inside) {
              throw new Error(
                `A ${node2.value} is not allowed inside of a ${context.inside}(...)`
              );
            }
            childContext = {
              global: node2.value === ":global",
              inside: node2.value,
              hasLocals: false,
              explicit: true
            };
            newNodes = node2.map((childNode) => transform(childNode, childContext)).reduce((acc, next) => acc.concat(next.nodes), []);
            if (newNodes.length) {
              const { before, after } = node2.spaces;
              const first = newNodes[0];
              const last = newNodes[newNodes.length - 1];
              first.spaces = { before, after: first.spaces.after };
              last.spaces = { before: last.spaces.before, after };
            }
            node2 = newNodes;
            break;
          } else {
            childContext = {
              global: context.global,
              inside: context.inside,
              lastWasSpacing: true,
              hasLocals: false,
              explicit: context.explicit
            };
            newNodes = node2.map(
              (childNode) => transform(childNode, childContext)
            );
            node2 = node2.clone();
            node2.nodes = normalizeNodeArray(newNodes);
            if (childContext.hasLocals) {
              context.hasLocals = true;
            }
          }
          break;
        } else if (isScoped) {
          if (context.inside) {
            throw new Error(
              `A ${node2.value} is not allowed inside of a ${context.inside}(...)`
            );
          }
          const addBackSpacing = !!node2.spaces.before;
          context.ignoreNextSpacing = context.lastWasSpacing ? node2.value : false;
          context.enforceNoSpacing = context.lastWasSpacing ? false : node2.value;
          context.global = node2.value === ":global";
          context.explicit = true;
          return addBackSpacing ? selectorParser$1.combinator({ value: " " }) : null;
        }
        break;
      }
      case "id":
      case "class": {
        if (!node2.value) {
          throw new Error("Invalid class or id selector syntax");
        }
        if (context.global) {
          break;
        }
        const isImportedValue = localAliasMap.has(node2.value);
        const isImportedWithExplicitScope = isImportedValue && context.explicit;
        if (!isImportedValue || isImportedWithExplicitScope) {
          const innerNode = node2.clone();
          innerNode.spaces = { before: "", after: "" };
          node2 = selectorParser$1.pseudo({
            value: ":local",
            nodes: [innerNode],
            spaces: node2.spaces
          });
          context.hasLocals = true;
        }
        break;
      }
    }
    context.lastWasSpacing = false;
    context.ignoreNextSpacing = false;
    context.enforceNoSpacing = false;
    return node2;
  };
  const rootContext = {
    global: mode === "global",
    hasPureGlobals: false
  };
  rootContext.selector = selectorParser$1((root3) => {
    transform(root3, rootContext);
  }).processSync(rule, { updateSelector: false, lossless: true });
  return rootContext;
}
function localizeDeclNode(node2, context) {
  switch (node2.type) {
    case "word":
      if (context.localizeNextItem) {
        if (!context.localAliasMap.has(node2.value)) {
          node2.value = ":local(" + node2.value + ")";
          context.localizeNextItem = false;
        }
      }
      break;
    case "function":
      if (context.options && context.options.rewriteUrl && node2.value.toLowerCase() === "url") {
        node2.nodes.map((nestedNode) => {
          if (nestedNode.type !== "string" && nestedNode.type !== "word") {
            return;
          }
          let newUrl = context.options.rewriteUrl(
            context.global,
            nestedNode.value
          );
          switch (nestedNode.type) {
            case "string":
              if (nestedNode.quote === "'") {
                newUrl = newUrl.replace(/(\\)/g, "\\$1").replace(/'/g, "\\'");
              }
              if (nestedNode.quote === '"') {
                newUrl = newUrl.replace(/(\\)/g, "\\$1").replace(/"/g, '\\"');
              }
              break;
            case "word":
              newUrl = newUrl.replace(/("|'|\)|\\)/g, "\\$1");
              break;
          }
          nestedNode.value = newUrl;
        });
      }
      break;
  }
  return node2;
}
function isWordAFunctionArgument(wordNode, functionNode) {
  return functionNode ? functionNode.nodes.some(
    (functionNodeChild) => functionNodeChild.sourceIndex === wordNode.sourceIndex
  ) : false;
}
function localizeDeclarationValues(localize, declaration, context) {
  const valueNodes = valueParser(declaration.value);
  valueNodes.walk((node2, index2, nodes) => {
    const subContext = {
      options: context.options,
      global: context.global,
      localizeNextItem: localize && !context.global,
      localAliasMap: context.localAliasMap
    };
    nodes[index2] = localizeDeclNode(node2, subContext);
  });
  declaration.value = valueNodes.toString();
}
function localizeDeclaration(declaration, context) {
  const isAnimation = /animation$/i.test(declaration.prop);
  if (isAnimation) {
    const validIdent = /^-?[_a-z][_a-z0-9-]*$/i;
    const animationKeywords = {
      $alternate: 1,
      "$alternate-reverse": 1,
      $backwards: 1,
      $both: 1,
      $ease: 1,
      "$ease-in": 1,
      "$ease-in-out": 1,
      "$ease-out": 1,
      $forwards: 1,
      $infinite: 1,
      $linear: 1,
      $none: Infinity,
      // No matter how many times you write none, it will never be an animation name
      $normal: 1,
      $paused: 1,
      $reverse: 1,
      $running: 1,
      "$step-end": 1,
      "$step-start": 1,
      $initial: Infinity,
      $inherit: Infinity,
      $unset: Infinity
    };
    let parsedAnimationKeywords = {};
    let stepsFunctionNode = null;
    const valueNodes = valueParser(declaration.value).walk((node2) => {
      if (node2.type === "div") {
        parsedAnimationKeywords = {};
      }
      if (node2.type === "function" && node2.value.toLowerCase() === "steps") {
        stepsFunctionNode = node2;
      }
      const value = node2.type === "word" && !isWordAFunctionArgument(node2, stepsFunctionNode) ? node2.value.toLowerCase() : null;
      let shouldParseAnimationName = false;
      if (value && validIdent.test(value)) {
        if ("$" + value in animationKeywords) {
          parsedAnimationKeywords["$" + value] = "$" + value in parsedAnimationKeywords ? parsedAnimationKeywords["$" + value] + 1 : 0;
          shouldParseAnimationName = parsedAnimationKeywords["$" + value] >= animationKeywords["$" + value];
        } else {
          shouldParseAnimationName = true;
        }
      }
      const subContext = {
        options: context.options,
        global: context.global,
        localizeNextItem: shouldParseAnimationName && !context.global,
        localAliasMap: context.localAliasMap
      };
      return localizeDeclNode(node2, subContext);
    });
    declaration.value = valueNodes.toString();
    return;
  }
  const isAnimationName = /animation(-name)?$/i.test(declaration.prop);
  if (isAnimationName) {
    return localizeDeclarationValues(true, declaration, context);
  }
  const hasUrl = /url\(/i.test(declaration.value);
  if (hasUrl) {
    return localizeDeclarationValues(false, declaration, context);
  }
}
src$2.exports = (options = {}) => {
  if (options && options.mode && options.mode !== "global" && options.mode !== "local" && options.mode !== "pure") {
    throw new Error(
      'options.mode must be either "global", "local" or "pure" (default "local")'
    );
  }
  const pureMode = options && options.mode === "pure";
  const globalMode = options && options.mode === "global";
  return {
    postcssPlugin: "postcss-modules-local-by-default",
    prepare() {
      const localAliasMap = /* @__PURE__ */ new Map();
      return {
        Once(root3) {
          const { icssImports } = extractICSS(root3, false);
          Object.keys(icssImports).forEach((key) => {
            Object.keys(icssImports[key]).forEach((prop) => {
              localAliasMap.set(prop, icssImports[key][prop]);
            });
          });
          root3.walkAtRules((atRule) => {
            if (/keyframes$/i.test(atRule.name)) {
              const globalMatch = /^\s*:global\s*\((.+)\)\s*$/.exec(
                atRule.params
              );
              const localMatch = /^\s*:local\s*\((.+)\)\s*$/.exec(
                atRule.params
              );
              let globalKeyframes = globalMode;
              if (globalMatch) {
                if (pureMode) {
                  throw atRule.error(
                    "@keyframes :global(...) is not allowed in pure mode"
                  );
                }
                atRule.params = globalMatch[1];
                globalKeyframes = true;
              } else if (localMatch) {
                atRule.params = localMatch[0];
                globalKeyframes = false;
              } else if (!globalMode) {
                if (atRule.params && !localAliasMap.has(atRule.params)) {
                  atRule.params = ":local(" + atRule.params + ")";
                }
              }
              atRule.walkDecls((declaration) => {
                localizeDeclaration(declaration, {
                  localAliasMap,
                  options,
                  global: globalKeyframes
                });
              });
            } else if (atRule.nodes) {
              atRule.nodes.forEach((declaration) => {
                if (declaration.type === "decl") {
                  localizeDeclaration(declaration, {
                    localAliasMap,
                    options,
                    global: globalMode
                  });
                }
              });
            }
          });
          root3.walkRules((rule) => {
            if (rule.parent && rule.parent.type === "atrule" && /keyframes$/i.test(rule.parent.name)) {
              return;
            }
            const context = localizeNode(rule, options.mode, localAliasMap);
            context.options = options;
            context.localAliasMap = localAliasMap;
            if (pureMode && context.hasPureGlobals) {
              throw rule.error(
                'Selector "' + rule.selector + '" is not pure (pure selectors must contain at least one local class or id)'
              );
            }
            rule.selector = context.selector;
            if (rule.nodes) {
              rule.nodes.forEach(
                (declaration) => localizeDeclaration(declaration, context)
              );
            }
          });
        }
      };
    }
  };
};
src$2.exports.postcss = true;
var srcExports$1 = src$2.exports;
var selectorParser = distExports;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function getSingleLocalNamesForComposes(root3) {
  return root3.nodes.map((node2) => {
    if (node2.type !== "selector" || node2.nodes.length !== 1) {
      throw new Error(
        `composition is only allowed when selector is single :local class name not in "${root3}"`
      );
    }
    node2 = node2.nodes[0];
    if (node2.type !== "pseudo" || node2.value !== ":local" || node2.nodes.length !== 1) {
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' + root3 + '", "' + node2 + '" is weird'
      );
    }
    node2 = node2.first;
    if (node2.type !== "selector" || node2.length !== 1) {
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' + root3 + '", "' + node2 + '" is weird'
      );
    }
    node2 = node2.first;
    if (node2.type !== "class") {
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' + root3 + '", "' + node2 + '" is weird'
      );
    }
    return node2.value;
  });
}
var whitespace = "[\\x20\\t\\r\\n\\f]";
var unescapeRegExp = new RegExp(
  "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)",
  "ig"
);
function unescape(str2) {
  return str2.replace(unescapeRegExp, (_, escaped, escapedWhitespace) => {
    const high = "0x" + escaped - 65536;
    return high !== high || escapedWhitespace ? escaped : high < 0 ? (
      // BMP codepoint
      String.fromCharCode(high + 65536)
    ) : (
      // Supplemental Plane codepoint (surrogate pair)
      String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
    );
  });
}
var plugin = (options = {}) => {
  const generateScopedName = options && options.generateScopedName || plugin.generateScopedName;
  const generateExportEntry = options && options.generateExportEntry || plugin.generateExportEntry;
  const exportGlobals = options && options.exportGlobals;
  return {
    postcssPlugin: "postcss-modules-scope",
    Once(root3, { rule }) {
      const exports = /* @__PURE__ */ Object.create(null);
      function exportScopedName(name, rawName) {
        const scopedName = generateScopedName(
          rawName ? rawName : name,
          root3.source.input.from,
          root3.source.input.css
        );
        const exportEntry = generateExportEntry(
          rawName ? rawName : name,
          scopedName,
          root3.source.input.from,
          root3.source.input.css
        );
        const { key, value } = exportEntry;
        exports[key] = exports[key] || [];
        if (exports[key].indexOf(value) < 0) {
          exports[key].push(value);
        }
        return scopedName;
      }
      function localizeNode2(node2) {
        switch (node2.type) {
          case "selector":
            node2.nodes = node2.map(localizeNode2);
            return node2;
          case "class":
            return selectorParser.className({
              value: exportScopedName(
                node2.value,
                node2.raws && node2.raws.value ? node2.raws.value : null
              )
            });
          case "id": {
            return selectorParser.id({
              value: exportScopedName(
                node2.value,
                node2.raws && node2.raws.value ? node2.raws.value : null
              )
            });
          }
        }
        throw new Error(
          `${node2.type} ("${node2}") is not allowed in a :local block`
        );
      }
      function traverseNode(node2) {
        switch (node2.type) {
          case "pseudo":
            if (node2.value === ":local") {
              if (node2.nodes.length !== 1) {
                throw new Error('Unexpected comma (",") in :local block');
              }
              const selector3 = localizeNode2(node2.first);
              selector3.first.spaces = node2.spaces;
              const nextNode = node2.next();
              if (nextNode && nextNode.type === "combinator" && nextNode.value === " " && /\\[A-F0-9]{1,6}$/.test(selector3.last.value)) {
                selector3.last.spaces.after = " ";
              }
              node2.replaceWith(selector3);
              return;
            }
          case "root":
          case "selector": {
            node2.each(traverseNode);
            break;
          }
          case "id":
          case "class":
            if (exportGlobals) {
              exports[node2.value] = [node2.value];
            }
            break;
        }
        return node2;
      }
      const importedNames = {};
      root3.walkRules(/^:import\(.+\)$/, (rule2) => {
        rule2.walkDecls((decl) => {
          importedNames[decl.prop] = true;
        });
      });
      root3.walkRules((rule2) => {
        let parsedSelector = selectorParser().astSync(rule2);
        rule2.selector = traverseNode(parsedSelector.clone()).toString();
        rule2.walkDecls(/composes|compose-with/i, (decl) => {
          const localNames = getSingleLocalNamesForComposes(parsedSelector);
          const classes = decl.value.split(/\s+/);
          classes.forEach((className3) => {
            const global = /^global\(([^)]+)\)$/.exec(className3);
            if (global) {
              localNames.forEach((exportedName) => {
                exports[exportedName].push(global[1]);
              });
            } else if (hasOwnProperty.call(importedNames, className3)) {
              localNames.forEach((exportedName) => {
                exports[exportedName].push(className3);
              });
            } else if (hasOwnProperty.call(exports, className3)) {
              localNames.forEach((exportedName) => {
                exports[className3].forEach((item) => {
                  exports[exportedName].push(item);
                });
              });
            } else {
              throw decl.error(
                `referenced class name "${className3}" in ${decl.prop} not found`
              );
            }
          });
          decl.remove();
        });
        rule2.walkDecls((decl) => {
          if (!/:local\s*\((.+?)\)/.test(decl.value)) {
            return;
          }
          let tokens = decl.value.split(/(,|'[^']*'|"[^"]*")/);
          tokens = tokens.map((token, idx) => {
            if (idx === 0 || tokens[idx - 1] === ",") {
              let result = token;
              const localMatch = /:local\s*\((.+?)\)/.exec(token);
              if (localMatch) {
                const input = localMatch.input;
                const matchPattern = localMatch[0];
                const matchVal = localMatch[1];
                const newVal = exportScopedName(matchVal);
                result = input.replace(matchPattern, newVal);
              } else {
                return token;
              }
              return result;
            } else {
              return token;
            }
          });
          decl.value = tokens.join("");
        });
      });
      root3.walkAtRules(/keyframes$/i, (atRule) => {
        const localMatch = /^\s*:local\s*\((.+?)\)\s*$/.exec(atRule.params);
        if (!localMatch) {
          return;
        }
        atRule.params = exportScopedName(localMatch[1]);
      });
      const exportedNames = Object.keys(exports);
      if (exportedNames.length > 0) {
        const exportRule = rule({ selector: ":export" });
        exportedNames.forEach(
          (exportedName) => exportRule.append({
            prop: exportedName,
            value: exports[exportedName].join(" "),
            raws: { before: "\n  " }
          })
        );
        root3.append(exportRule);
      }
    }
  };
};
plugin.postcss = true;
plugin.generateScopedName = function(name, path2) {
  const sanitisedPath = path2.replace(/\.[^./\\]+$/, "").replace(/[\W_]+/g, "_").replace(/^_|_$/g, "");
  return `_${sanitisedPath}__${name}`.trim();
};
plugin.generateExportEntry = function(name, scopedName) {
  return {
    key: unescape(name),
    value: unescape(scopedName)
  };
};
var src$1 = plugin;
function hash(str2) {
  var hash2 = 5381, i = str2.length;
  while (i) {
    hash2 = hash2 * 33 ^ str2.charCodeAt(--i);
  }
  return hash2 >>> 0;
}
var stringHash = hash;
var src = { exports: {} };
var ICSSUtils = src$4;
var matchImports = /^(.+?|\([\s\S]+?\))\s+from\s+("[^"]*"|'[^']*'|[\w-]+)$/;
var matchValueDefinition = /(?:\s+|^)([\w-]+):?(.*?)$/;
var matchImport = /^([\w-]+)(?:\s+as\s+([\w-]+))?/;
src.exports = (options) => {
  let importIndex = 0;
  const createImportedName = options && options.createImportedName || ((importName) => `i__const_${importName.replace(/\W/g, "_")}_${importIndex++}`);
  return {
    postcssPlugin: "postcss-modules-values",
    prepare(result) {
      const importAliases = [];
      const definitions = {};
      return {
        Once(root3, postcss2) {
          root3.walkAtRules(/value/i, (atRule) => {
            const matches = atRule.params.match(matchImports);
            if (matches) {
              let [
                ,
                /*match*/
                aliases,
                path2
              ] = matches;
              if (definitions[path2]) {
                path2 = definitions[path2];
              }
              const imports = aliases.replace(/^\(\s*([\s\S]+)\s*\)$/, "$1").split(/\s*,\s*/).map((alias) => {
                const tokens = matchImport.exec(alias);
                if (tokens) {
                  const [
                    ,
                    /*match*/
                    theirName,
                    myName = theirName
                  ] = tokens;
                  const importedName = createImportedName(myName);
                  definitions[myName] = importedName;
                  return { theirName, importedName };
                } else {
                  throw new Error(`@import statement "${alias}" is invalid!`);
                }
              });
              importAliases.push({ path: path2, imports });
              atRule.remove();
              return;
            }
            if (atRule.params.indexOf("@value") !== -1) {
              result.warn("Invalid value definition: " + atRule.params);
            }
            let [, key, value] = `${atRule.params}${atRule.raws.between}`.match(
              matchValueDefinition
            );
            const normalizedValue = value.replace(/\/\*((?!\*\/).*?)\*\//g, "");
            if (normalizedValue.length === 0) {
              result.warn("Invalid value definition: " + atRule.params);
              atRule.remove();
              return;
            }
            let isOnlySpace = /^\s+$/.test(normalizedValue);
            if (!isOnlySpace) {
              value = value.trim();
            }
            definitions[key] = ICSSUtils.replaceValueSymbols(
              value,
              definitions
            );
            atRule.remove();
          });
          if (!Object.keys(definitions).length) {
            return;
          }
          ICSSUtils.replaceSymbols(root3, definitions);
          const exportDeclarations = Object.keys(definitions).map(
            (key) => postcss2.decl({
              value: definitions[key],
              prop: key,
              raws: { before: "\n  " }
            })
          );
          if (exportDeclarations.length > 0) {
            const exportRule = postcss2.rule({
              selector: ":export",
              raws: { after: "\n" }
            });
            exportRule.append(exportDeclarations);
            root3.prepend(exportRule);
          }
          importAliases.reverse().forEach(({ path: path2, imports }) => {
            const importRule = postcss2.rule({
              selector: `:import(${path2})`,
              raws: { after: "\n" }
            });
            imports.forEach(({ theirName, importedName }) => {
              importRule.append({
                value: theirName,
                prop: importedName,
                raws: { before: "\n  " }
              });
            });
            root3.prepend(importRule);
          });
        }
      };
    }
  };
};
src.exports.postcss = true;
var srcExports = src.exports;
Object.defineProperty(scoping, "__esModule", {
  value: true
});
scoping.behaviours = void 0;
scoping.getDefaultPlugins = getDefaultPlugins;
scoping.getDefaultScopeBehaviour = getDefaultScopeBehaviour;
scoping.getScopedNameGenerator = getScopedNameGenerator;
var _postcssModulesExtractImports = _interopRequireDefault$1(srcExports$2);
var _genericNames = _interopRequireDefault$1(genericNames);
var _postcssModulesLocalByDefault = _interopRequireDefault$1(srcExports$1);
var _postcssModulesScope = _interopRequireDefault$1(src$1);
var _stringHash = _interopRequireDefault$1(stringHash);
var _postcssModulesValues = _interopRequireDefault$1(srcExports);
function _interopRequireDefault$1(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var behaviours = {
  LOCAL: "local",
  GLOBAL: "global"
};
scoping.behaviours = behaviours;
function getDefaultPlugins({
  behaviour,
  generateScopedName,
  exportGlobals
}) {
  const scope = (0, _postcssModulesScope.default)({
    generateScopedName,
    exportGlobals
  });
  const plugins = {
    [behaviours.LOCAL]: [_postcssModulesValues.default, (0, _postcssModulesLocalByDefault.default)({
      mode: "local"
    }), _postcssModulesExtractImports.default, scope],
    [behaviours.GLOBAL]: [_postcssModulesValues.default, (0, _postcssModulesLocalByDefault.default)({
      mode: "global"
    }), _postcssModulesExtractImports.default, scope]
  };
  return plugins[behaviour];
}
function isValidBehaviour(behaviour) {
  return Object.keys(behaviours).map((key) => behaviours[key]).indexOf(behaviour) > -1;
}
function getDefaultScopeBehaviour(scopeBehaviour) {
  return scopeBehaviour && isValidBehaviour(scopeBehaviour) ? scopeBehaviour : behaviours.LOCAL;
}
function generateScopedNameDefault(name, filename, css) {
  const i = css.indexOf(`.${name}`);
  const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
  const hash2 = (0, _stringHash.default)(css).toString(36).substr(0, 5);
  return `_${name}_${hash2}_${lineNumber}`;
}
function getScopedNameGenerator(generateScopedName, hashPrefix) {
  const scopedNameGenerator = generateScopedName || generateScopedNameDefault;
  if (typeof scopedNameGenerator === "function") {
    return scopedNameGenerator;
  }
  return (0, _genericNames.default)(scopedNameGenerator, {
    context: process.cwd(),
    hashPrefix
  });
}
Object.defineProperty(pluginFactory, "__esModule", {
  value: true
});
pluginFactory.makePlugin = makePlugin;
var _postcss = _interopRequireDefault(postcss_default);
var _unquote = _interopRequireDefault(unquote$1);
var _Parser = _interopRequireDefault(Parser$1);
var _saveJSON = _interopRequireDefault(saveJSON$1);
var _localsConvention = localsConvention;
var _FileSystemLoader = _interopRequireDefault(FileSystemLoader$1);
var _scoping = scoping;
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var PLUGIN_NAME = "postcss-modules";
function isGlobalModule(globalModules, inputFile) {
  return globalModules.some((regex) => inputFile.match(regex));
}
function getDefaultPluginsList(opts, inputFile) {
  const globalModulesList = opts.globalModulePaths || null;
  const exportGlobals = opts.exportGlobals || false;
  const defaultBehaviour = (0, _scoping.getDefaultScopeBehaviour)(opts.scopeBehaviour);
  const generateScopedName = (0, _scoping.getScopedNameGenerator)(opts.generateScopedName, opts.hashPrefix);
  if (globalModulesList && isGlobalModule(globalModulesList, inputFile)) {
    return (0, _scoping.getDefaultPlugins)({
      behaviour: _scoping.behaviours.GLOBAL,
      generateScopedName,
      exportGlobals
    });
  }
  return (0, _scoping.getDefaultPlugins)({
    behaviour: defaultBehaviour,
    generateScopedName,
    exportGlobals
  });
}
function getLoader(opts, plugins) {
  const root3 = typeof opts.root === "undefined" ? "/" : opts.root;
  return typeof opts.Loader === "function" ? new opts.Loader(root3, plugins, opts.resolve) : new _FileSystemLoader.default(root3, plugins, opts.resolve);
}
function isOurPlugin(plugin2) {
  return plugin2.postcssPlugin === PLUGIN_NAME;
}
function makePlugin(opts) {
  return {
    postcssPlugin: PLUGIN_NAME,
    async OnceExit(css, {
      result
    }) {
      const getJSON = opts.getJSON || _saveJSON.default;
      const inputFile = css.source.input.file;
      const pluginList = getDefaultPluginsList(opts, inputFile);
      const resultPluginIndex = result.processor.plugins.findIndex((plugin2) => isOurPlugin(plugin2));
      if (resultPluginIndex === -1) {
        throw new Error("Plugin missing from options.");
      }
      const earlierPlugins = result.processor.plugins.slice(0, resultPluginIndex);
      const loaderPlugins = [...earlierPlugins, ...pluginList];
      const loader = getLoader(opts, loaderPlugins);
      const fetcher = async (file, relativeTo, depTrace) => {
        const unquoteFile = (0, _unquote.default)(file);
        return loader.fetch.call(loader, unquoteFile, relativeTo, depTrace);
      };
      const parser2 = new _Parser.default(fetcher);
      await (0, _postcss.default)([...pluginList, parser2.plugin()]).process(css, {
        from: inputFile
      });
      const out = loader.finalSource;
      if (out) css.prepend(out);
      if (opts.localsConvention) {
        const reducer = (0, _localsConvention.makeLocalsConventionReducer)(opts.localsConvention, inputFile);
        parser2.exportTokens = Object.entries(parser2.exportTokens).reduce(reducer, {});
      }
      result.messages.push({
        type: "export",
        plugin: "postcss-modules",
        exportTokens: parser2.exportTokens
      });
      return getJSON(css.source.input.file, parser2.exportTokens, result.opts.to);
    }
  };
}
var _fs = import_fs.default;
var _fs2 = fs;
var _pluginFactory = pluginFactory;
(0, _fs2.setFileSystem)({
  readFile: _fs.readFile,
  writeFile: _fs.writeFile
});
build.exports = (opts = {}) => (0, _pluginFactory.makePlugin)(opts);
var postcss = build.exports.postcss = true;
var buildExports = build.exports;
var index = getDefaultExportFromCjs(buildExports);
var index$1 = _mergeNamespaces({
  __proto__: null,
  default: index,
  postcss
}, [buildExports]);
export {
  index$1 as i
};
/*! Bundled license information:

vite/dist/node/chunks/dep-BaJt-LTH.js:
  (*! https://mths.be/cssesc v3.0.0 by @mathias *)
*/
//# sourceMappingURL=dep-BaJt-LTH-YQUDCJJP.js.map
