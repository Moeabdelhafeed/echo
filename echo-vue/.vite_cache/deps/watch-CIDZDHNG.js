import {
  createFilter,
  fseventsImporter,
  getAugmentedNamespace,
  getDefaultExportFromCjs,
  rollupInternal
} from "./chunk-OE24RCBY.js";
import {
  require_events,
  require_node_os,
  require_os,
  require_stream,
  require_util
} from "./chunk-KPGLAEFU.js";
import {
  require_native,
  require_node_perf_hooks,
  require_node_process,
  require_promises,
  require_tty
} from "./chunk-RX7BTZZI.js";
import {
  require_node_path
} from "./chunk-M2MSWSHF.js";
import {
  require_fs
} from "./chunk-I5RSIQOR.js";
import {
  require_path
} from "./chunk-4XRL7ZXG.js";
import {
  __toESM
} from "./chunk-ZSMWDLMK.js";

// node_modules/rollup/dist/es/shared/watch.js
var import_node_path = __toESM(require_node_path(), 1);
var import_node_process = __toESM(require_node_process(), 1);
var import_path = __toESM(require_path(), 1);
var import_fs = __toESM(require_fs(), 1);
var import_util = __toESM(require_util(), 1);
var import_stream = __toESM(require_stream(), 1);
var import_os = __toESM(require_os(), 1);
var import_events = __toESM(require_events(), 1);
var import_node_os = __toESM(require_node_os(), 1);
var import_native = __toESM(require_native(), 1);
var import_node_perf_hooks = __toESM(require_node_perf_hooks(), 1);
var import_promises = __toESM(require_promises(), 1);
var import_tty = __toESM(require_tty(), 1);
var chokidar$1 = {};
var utils$2 = {};
var constants$3;
var hasRequiredConstants$3;
function requireConstants$3() {
  if (hasRequiredConstants$3) return constants$3;
  hasRequiredConstants$3 = 1;
  const path2 = import_path.default;
  const WIN_SLASH = "\\\\/";
  const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
  const DOT_LITERAL = "\\.";
  const PLUS_LITERAL = "\\+";
  const QMARK_LITERAL = "\\?";
  const SLASH_LITERAL = "\\/";
  const ONE_CHAR = "(?=.)";
  const QMARK = "[^/]";
  const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
  const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
  const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
  const NO_DOT = `(?!${DOT_LITERAL})`;
  const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
  const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
  const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
  const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
  const STAR = `${QMARK}*?`;
  const POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  };
  const WINDOWS_CHARS = {
    ...POSIX_CHARS,
    SLASH_LITERAL: `[${WIN_SLASH}]`,
    QMARK: WIN_NO_SLASH,
    STAR: `${WIN_NO_SLASH}*?`,
    DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
    NO_DOT: `(?!${DOT_LITERAL})`,
    NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
    NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
    START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
    END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
  };
  const POSIX_REGEX_SOURCE = {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9"
  };
  constants$3 = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    // regular expressions
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    // Replace globs with equivalent patterns to reduce parsing time.
    REPLACEMENTS: {
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    // Digits
    CHAR_0: 48,
    /* 0 */
    CHAR_9: 57,
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: 65,
    /* A */
    CHAR_LOWERCASE_A: 97,
    /* a */
    CHAR_UPPERCASE_Z: 90,
    /* Z */
    CHAR_LOWERCASE_Z: 122,
    /* z */
    CHAR_LEFT_PARENTHESES: 40,
    /* ( */
    CHAR_RIGHT_PARENTHESES: 41,
    /* ) */
    CHAR_ASTERISK: 42,
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: 38,
    /* & */
    CHAR_AT: 64,
    /* @ */
    CHAR_BACKWARD_SLASH: 92,
    /* \ */
    CHAR_CARRIAGE_RETURN: 13,
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: 94,
    /* ^ */
    CHAR_COLON: 58,
    /* : */
    CHAR_COMMA: 44,
    /* , */
    CHAR_DOT: 46,
    /* . */
    CHAR_DOUBLE_QUOTE: 34,
    /* " */
    CHAR_EQUAL: 61,
    /* = */
    CHAR_EXCLAMATION_MARK: 33,
    /* ! */
    CHAR_FORM_FEED: 12,
    /* \f */
    CHAR_FORWARD_SLASH: 47,
    /* / */
    CHAR_GRAVE_ACCENT: 96,
    /* ` */
    CHAR_HASH: 35,
    /* # */
    CHAR_HYPHEN_MINUS: 45,
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: 60,
    /* < */
    CHAR_LEFT_CURLY_BRACE: 123,
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: 91,
    /* [ */
    CHAR_LINE_FEED: 10,
    /* \n */
    CHAR_NO_BREAK_SPACE: 160,
    /* \u00A0 */
    CHAR_PERCENT: 37,
    /* % */
    CHAR_PLUS: 43,
    /* + */
    CHAR_QUESTION_MARK: 63,
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    /* > */
    CHAR_RIGHT_CURLY_BRACE: 125,
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    /* ] */
    CHAR_SEMICOLON: 59,
    /* ; */
    CHAR_SINGLE_QUOTE: 39,
    /* ' */
    CHAR_SPACE: 32,
    /*   */
    CHAR_TAB: 9,
    /* \t */
    CHAR_UNDERSCORE: 95,
    /* _ */
    CHAR_VERTICAL_LINE: 124,
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    /* \uFEFF */
    SEP: path2.sep,
    /**
     * Create EXTGLOB_CHARS
     */
    extglobChars(chars) {
      return {
        "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
        "?": { type: "qmark", open: "(?:", close: ")?" },
        "+": { type: "plus", open: "(?:", close: ")+" },
        "*": { type: "star", open: "(?:", close: ")*" },
        "@": { type: "at", open: "(?:", close: ")" }
      };
    },
    /**
     * Create GLOB_CHARS
     */
    globChars(win32) {
      return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
  };
  return constants$3;
}
var hasRequiredUtils$2;
function requireUtils$2() {
  if (hasRequiredUtils$2) return utils$2;
  hasRequiredUtils$2 = 1;
  (function(exports) {
    const path2 = import_path.default;
    const win32 = process.platform === "win32";
    const {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = requireConstants$3();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  })(utils$2);
  return utils$2;
}
var scan_1$1;
var hasRequiredScan$1;
function requireScan$1() {
  if (hasRequiredScan$1) return scan_1$1;
  hasRequiredScan$1 = 1;
  const utils2 = requireUtils$2();
  const {
    CHAR_ASTERISK,
    /* * */
    CHAR_AT,
    /* @ */
    CHAR_BACKWARD_SLASH,
    /* \ */
    CHAR_COMMA,
    /* , */
    CHAR_DOT,
    /* . */
    CHAR_EXCLAMATION_MARK,
    /* ! */
    CHAR_FORWARD_SLASH,
    /* / */
    CHAR_LEFT_CURLY_BRACE,
    /* { */
    CHAR_LEFT_PARENTHESES,
    /* ( */
    CHAR_LEFT_SQUARE_BRACKET,
    /* [ */
    CHAR_PLUS,
    /* + */
    CHAR_QUESTION_MARK,
    /* ? */
    CHAR_RIGHT_CURLY_BRACE,
    /* } */
    CHAR_RIGHT_PARENTHESES,
    /* ) */
    CHAR_RIGHT_SQUARE_BRACKET
    /* ] */
  } = requireConstants$3();
  const isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  };
  const depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1;
    }
  };
  const scan = (input, options) => {
    const opts = options || {};
    const length = input.length - 1;
    const scanToEnd = opts.parts === true || opts.scanToEnd === true;
    const slashes = [];
    const tokens = [];
    const parts = [];
    let str = input;
    let index = -1;
    let start = 0;
    let lastIndex = 0;
    let isBrace = false;
    let isBracket = false;
    let isGlob2 = false;
    let isExtglob2 = false;
    let isGlobstar = false;
    let braceEscaped = false;
    let backslashes = false;
    let negated = false;
    let negatedExtglob = false;
    let finished = false;
    let braces = 0;
    let prev;
    let code;
    let token = { value: "", depth: 0, isGlob: false };
    const eos = () => index >= length;
    const peek = () => str.charCodeAt(index + 1);
    const advance = () => {
      prev = code;
      return str.charCodeAt(++index);
    };
    while (index < length) {
      code = advance();
      let next;
      if (code === CHAR_BACKWARD_SLASH) {
        backslashes = token.backslashes = true;
        code = advance();
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braceEscaped = true;
        }
        continue;
      }
      if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
        braces++;
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            continue;
          }
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (braceEscaped !== true && code === CHAR_COMMA) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_RIGHT_CURLY_BRACE) {
            braces--;
            if (braces === 0) {
              braceEscaped = false;
              isBrace = token.isBrace = true;
              finished = true;
              break;
            }
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_FORWARD_SLASH) {
        slashes.push(index);
        tokens.push(token);
        token = { value: "", depth: 0, isGlob: false };
        if (finished === true) continue;
        if (prev === CHAR_DOT && index === start + 1) {
          start += 2;
          continue;
        }
        lastIndex = index + 1;
        continue;
      }
      if (opts.noext !== true) {
        const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
          isGlob2 = token.isGlob = true;
          isExtglob2 = token.isExtglob = true;
          finished = true;
          if (code === CHAR_EXCLAMATION_MARK && index === start) {
            negatedExtglob = true;
          }
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob2 = token.isGlob = true;
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
      }
      if (code === CHAR_ASTERISK) {
        if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_QUESTION_MARK) {
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_LEFT_SQUARE_BRACKET) {
        while (eos() !== true && (next = advance())) {
          if (next === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            isBracket = token.isBracket = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            break;
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
        negated = token.negated = true;
        start++;
        continue;
      }
      if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
        isGlob2 = token.isGlob = true;
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_LEFT_PARENTHESES) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (isGlob2 === true) {
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
    }
    if (opts.noext === true) {
      isExtglob2 = false;
      isGlob2 = false;
    }
    let base = str;
    let prefix = "";
    let glob = "";
    if (start > 0) {
      prefix = str.slice(0, start);
      str = str.slice(start);
      lastIndex -= start;
    }
    if (base && isGlob2 === true && lastIndex > 0) {
      base = str.slice(0, lastIndex);
      glob = str.slice(lastIndex);
    } else if (isGlob2 === true) {
      base = "";
      glob = str;
    } else {
      base = str;
    }
    if (base && base !== "" && base !== "/" && base !== str) {
      if (isPathSeparator(base.charCodeAt(base.length - 1))) {
        base = base.slice(0, -1);
      }
    }
    if (opts.unescape === true) {
      if (glob) glob = utils2.removeBackslashes(glob);
      if (base && backslashes === true) {
        base = utils2.removeBackslashes(base);
      }
    }
    const state = {
      prefix,
      input,
      start,
      base,
      glob,
      isBrace,
      isBracket,
      isGlob: isGlob2,
      isExtglob: isExtglob2,
      isGlobstar,
      negated,
      negatedExtglob
    };
    if (opts.tokens === true) {
      state.maxDepth = 0;
      if (!isPathSeparator(code)) {
        tokens.push(token);
      }
      state.tokens = tokens;
    }
    if (opts.parts === true || opts.tokens === true) {
      let prevIndex;
      for (let idx = 0; idx < slashes.length; idx++) {
        const n = prevIndex ? prevIndex + 1 : start;
        const i = slashes[idx];
        const value = input.slice(n, i);
        if (opts.tokens) {
          if (idx === 0 && start !== 0) {
            tokens[idx].isPrefix = true;
            tokens[idx].value = prefix;
          } else {
            tokens[idx].value = value;
          }
          depth(tokens[idx]);
          state.maxDepth += tokens[idx].depth;
        }
        if (idx !== 0 || value !== "") {
          parts.push(value);
        }
        prevIndex = i;
      }
      if (prevIndex && prevIndex + 1 < input.length) {
        const value = input.slice(prevIndex + 1);
        parts.push(value);
        if (opts.tokens) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
      }
      state.slashes = slashes;
      state.parts = parts;
    }
    return state;
  };
  scan_1$1 = scan;
  return scan_1$1;
}
var parse_1$2;
var hasRequiredParse$2;
function requireParse$2() {
  if (hasRequiredParse$2) return parse_1$2;
  hasRequiredParse$2 = 1;
  const constants2 = requireConstants$3();
  const utils2 = requireUtils$2();
  const {
    MAX_LENGTH,
    POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS
  } = constants2;
  const expandRange = (args, options) => {
    if (typeof options.expandRange === "function") {
      return options.expandRange(...args, options);
    }
    args.sort();
    const value = `[${args.join("-")}]`;
    return value;
  };
  const syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
  };
  const parse = (input, options) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    input = REPLACEMENTS[input] || input;
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    let len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    const bos = { type: "bos", value: "", output: opts.prepend || "" };
    const tokens = [bos];
    const capture = opts.capture ? "" : "?:";
    const win32 = utils2.isWindows(options);
    const PLATFORM_CHARS = constants2.globChars(win32);
    const EXTGLOB_CHARS = constants2.extglobChars(PLATFORM_CHARS);
    const {
      DOT_LITERAL,
      PLUS_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    } = PLATFORM_CHARS;
    const globstar = (opts2) => {
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const nodot = opts.dot ? "" : NO_DOT;
    const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    if (typeof opts.noext === "boolean") {
      opts.noextglob = opts.noext;
    }
    const state = {
      input,
      index: -1,
      start: 0,
      dot: opts.dot === true,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: false,
      negated: false,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: false,
      tokens
    };
    input = utils2.removePrefix(input, state);
    len = input.length;
    const extglobs = [];
    const braces = [];
    const stack = [];
    let prev = bos;
    let value;
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index] || "";
    const remaining = () => input.slice(state.index + 1);
    const consume = (value2 = "", num = 0) => {
      state.consumed += value2;
      state.index += num;
    };
    const append = (token) => {
      state.output += token.output != null ? token.output : token.value;
      consume(token.value);
    };
    const negate = () => {
      let count = 1;
      while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
        advance();
        state.start++;
        count++;
      }
      if (count % 2 === 0) {
        return false;
      }
      state.negated = true;
      state.start++;
      return true;
    };
    const increment = (type) => {
      state[type]++;
      stack.push(type);
    };
    const decrement = (type) => {
      state[type]--;
      stack.pop();
    };
    const push = (tok) => {
      if (prev.type === "globstar") {
        const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
        const isExtglob2 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
        if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob2) {
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "star";
          prev.value = "*";
          prev.output = star;
          state.output += prev.output;
        }
      }
      if (extglobs.length && tok.type !== "paren") {
        extglobs[extglobs.length - 1].inner += tok.value;
      }
      if (tok.value || tok.output) append(tok);
      if (prev && prev.type === "text" && tok.type === "text") {
        prev.value += tok.value;
        prev.output = (prev.output || "") + tok.value;
        return;
      }
      tok.prev = prev;
      tokens.push(tok);
      prev = tok;
    };
    const extglobOpen = (type, value2) => {
      const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
      token.prev = prev;
      token.parens = state.parens;
      token.output = state.output;
      const output = (opts.capture ? "(" : "") + token.open;
      increment("parens");
      push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
      push({ type: "paren", extglob: true, value: advance(), output });
      extglobs.push(token);
    };
    const extglobClose = (token) => {
      let output = token.close + (opts.capture ? ")" : "");
      let rest;
      if (token.type === "negate") {
        let extglobStar = star;
        if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
          extglobStar = globstar(opts);
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`;
        }
        if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
          const expression = parse(rest, { ...options, fastpaths: false }).output;
          output = token.close = `)${expression})${extglobStar})`;
        }
        if (token.prev.type === "bos") {
          state.negatedExtglob = true;
        }
      }
      push({ type: "paren", extglob: true, value, output });
      decrement("parens");
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false;
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
        if (first === "\\") {
          backslashes = true;
          return m;
        }
        if (first === "?") {
          if (esc) {
            return esc + first + (rest ? QMARK.repeat(rest.length) : "");
          }
          if (index === 0) {
            return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
          }
          return QMARK.repeat(chars.length);
        }
        if (first === ".") {
          return DOT_LITERAL.repeat(chars.length);
        }
        if (first === "*") {
          if (esc) {
            return esc + first + (rest ? star : "");
          }
          return star;
        }
        return esc ? m : `\\${m}`;
      });
      if (backslashes === true) {
        if (opts.unescape === true) {
          output = output.replace(/\\/g, "");
        } else {
          output = output.replace(/\\+/g, (m) => {
            return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
          });
        }
      }
      if (output === input && opts.contains === true) {
        state.output = input;
        return state;
      }
      state.output = utils2.wrapOutput(output, state, options);
      return state;
    }
    while (!eos()) {
      value = advance();
      if (value === "\0") {
        continue;
      }
      if (value === "\\") {
        const next = peek();
        if (next === "/" && opts.bash !== true) {
          continue;
        }
        if (next === "." || next === ";") {
          continue;
        }
        if (!next) {
          value += "\\";
          push({ type: "text", value });
          continue;
        }
        const match = /^\\+/.exec(remaining());
        let slashes = 0;
        if (match && match[0].length > 2) {
          slashes = match[0].length;
          state.index += slashes;
          if (slashes % 2 !== 0) {
            value += "\\";
          }
        }
        if (opts.unescape === true) {
          value = advance();
        } else {
          value += advance();
        }
        if (state.brackets === 0) {
          push({ type: "text", value });
          continue;
        }
      }
      if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
        if (opts.posix !== false && value === ":") {
          const inner = prev.value.slice(1);
          if (inner.includes("[")) {
            prev.posix = true;
            if (inner.includes(":")) {
              const idx = prev.value.lastIndexOf("[");
              const pre = prev.value.slice(0, idx);
              const rest2 = prev.value.slice(idx + 2);
              const posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix;
                state.backtrack = true;
                advance();
                if (!bos.output && tokens.indexOf(prev) === 1) {
                  bos.output = ONE_CHAR;
                }
                continue;
              }
            }
          }
        }
        if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
          value = `\\${value}`;
        }
        if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
          value = `\\${value}`;
        }
        if (opts.posix === true && value === "!" && prev.value === "[") {
          value = "^";
        }
        prev.value += value;
        append({ value });
        continue;
      }
      if (state.quotes === 1 && value !== '"') {
        value = utils2.escapeRegex(value);
        prev.value += value;
        append({ value });
        continue;
      }
      if (value === '"') {
        state.quotes = state.quotes === 1 ? 0 : 1;
        if (opts.keepQuotes === true) {
          push({ type: "text", value });
        }
        continue;
      }
      if (value === "(") {
        increment("parens");
        push({ type: "paren", value });
        continue;
      }
      if (value === ")") {
        if (state.parens === 0 && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "("));
        }
        const extglob = extglobs[extglobs.length - 1];
        if (extglob && state.parens === extglob.parens + 1) {
          extglobClose(extglobs.pop());
          continue;
        }
        push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
        decrement("parens");
        continue;
      }
      if (value === "[") {
        if (opts.nobracket === true || !remaining().includes("]")) {
          if (opts.nobracket !== true && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("closing", "]"));
          }
          value = `\\${value}`;
        } else {
          increment("brackets");
        }
        push({ type: "bracket", value });
        continue;
      }
      if (value === "]") {
        if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        if (state.brackets === 0) {
          if (opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "["));
          }
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        decrement("brackets");
        const prevValue = prev.value.slice(1);
        if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
          value = `/${value}`;
        }
        prev.value += value;
        append({ value });
        if (opts.literalBrackets === false || utils2.hasRegexChars(prevValue)) {
          continue;
        }
        const escaped = utils2.escapeRegex(prev.value);
        state.output = state.output.slice(0, -prev.value.length);
        if (opts.literalBrackets === true) {
          state.output += escaped;
          prev.value = escaped;
          continue;
        }
        prev.value = `(${capture}${escaped}|${prev.value})`;
        state.output += prev.value;
        continue;
      }
      if (value === "{" && opts.nobrace !== true) {
        increment("braces");
        const open = {
          type: "brace",
          value,
          output: "(",
          outputIndex: state.output.length,
          tokensIndex: state.tokens.length
        };
        braces.push(open);
        push(open);
        continue;
      }
      if (value === "}") {
        const brace = braces[braces.length - 1];
        if (opts.nobrace === true || !brace) {
          push({ type: "text", value, output: value });
          continue;
        }
        let output = ")";
        if (brace.dots === true) {
          const arr = tokens.slice();
          const range = [];
          for (let i = arr.length - 1; i >= 0; i--) {
            tokens.pop();
            if (arr[i].type === "brace") {
              break;
            }
            if (arr[i].type !== "dots") {
              range.unshift(arr[i].value);
            }
          }
          output = expandRange(range, opts);
          state.backtrack = true;
        }
        if (brace.comma !== true && brace.dots !== true) {
          const out = state.output.slice(0, brace.outputIndex);
          const toks = state.tokens.slice(brace.tokensIndex);
          brace.value = brace.output = "\\{";
          value = output = "\\}";
          state.output = out;
          for (const t of toks) {
            state.output += t.output || t.value;
          }
        }
        push({ type: "brace", value, output });
        decrement("braces");
        braces.pop();
        continue;
      }
      if (value === "|") {
        if (extglobs.length > 0) {
          extglobs[extglobs.length - 1].conditions++;
        }
        push({ type: "text", value });
        continue;
      }
      if (value === ",") {
        let output = value;
        const brace = braces[braces.length - 1];
        if (brace && stack[stack.length - 1] === "braces") {
          brace.comma = true;
          output = "|";
        }
        push({ type: "comma", value, output });
        continue;
      }
      if (value === "/") {
        if (prev.type === "dot" && state.index === state.start + 1) {
          state.start = state.index + 1;
          state.consumed = "";
          state.output = "";
          tokens.pop();
          prev = bos;
          continue;
        }
        push({ type: "slash", value, output: SLASH_LITERAL });
        continue;
      }
      if (value === ".") {
        if (state.braces > 0 && prev.type === "dot") {
          if (prev.value === ".") prev.output = DOT_LITERAL;
          const brace = braces[braces.length - 1];
          prev.type = "dots";
          prev.output += value;
          prev.value += value;
          brace.dots = true;
          continue;
        }
        if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
          push({ type: "text", value, output: DOT_LITERAL });
          continue;
        }
        push({ type: "dot", value, output: DOT_LITERAL });
        continue;
      }
      if (value === "?") {
        const isGroup = prev && prev.value === "(";
        if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("qmark", value);
          continue;
        }
        if (prev && prev.type === "paren") {
          const next = peek();
          let output = value;
          if (next === "<" && !utils2.supportsLookbehinds()) {
            throw new Error("Node.js v10 or higher is required for regex lookbehinds");
          }
          if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
            output = `\\${value}`;
          }
          push({ type: "text", value, output });
          continue;
        }
        if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
          push({ type: "qmark", value, output: QMARK_NO_DOT });
          continue;
        }
        push({ type: "qmark", value, output: QMARK });
        continue;
      }
      if (value === "!") {
        if (opts.noextglob !== true && peek() === "(") {
          if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
            extglobOpen("negate", value);
            continue;
          }
        }
        if (opts.nonegate !== true && state.index === 0) {
          negate();
          continue;
        }
      }
      if (value === "+") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("plus", value);
          continue;
        }
        if (prev && prev.value === "(" || opts.regex === false) {
          push({ type: "plus", value, output: PLUS_LITERAL });
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
          push({ type: "plus", value });
          continue;
        }
        push({ type: "plus", value: PLUS_LITERAL });
        continue;
      }
      if (value === "@") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          push({ type: "at", extglob: true, value, output: "" });
          continue;
        }
        push({ type: "text", value });
        continue;
      }
      if (value !== "*") {
        if (value === "$" || value === "^") {
          value = `\\${value}`;
        }
        const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
        if (match) {
          value += match[0];
          state.index += match[0].length;
        }
        push({ type: "text", value });
        continue;
      }
      if (prev && (prev.type === "globstar" || prev.star === true)) {
        prev.type = "star";
        prev.star = true;
        prev.value += value;
        prev.output = star;
        state.backtrack = true;
        state.globstar = true;
        consume(value);
        continue;
      }
      let rest = remaining();
      if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
        extglobOpen("star", value);
        continue;
      }
      if (prev.type === "star") {
        if (opts.noglobstar === true) {
          consume(value);
          continue;
        }
        const prior = prev.prev;
        const before = prior.prev;
        const isStart = prior.type === "slash" || prior.type === "bos";
        const afterStar = before && (before.type === "star" || before.type === "globstar");
        if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
          push({ type: "star", value, output: "" });
          continue;
        }
        const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
        const isExtglob2 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
        if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob2) {
          push({ type: "star", value, output: "" });
          continue;
        }
        while (rest.slice(0, 3) === "/**") {
          const after = input[state.index + 4];
          if (after && after !== "/") {
            break;
          }
          rest = rest.slice(3);
          consume("/**", 3);
        }
        if (prior.type === "bos" && eos()) {
          prev.type = "globstar";
          prev.value += value;
          prev.output = globstar(opts);
          state.output = prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
          prev.value += value;
          state.globstar = true;
          state.output += prior.output + prev.output;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
          const end = rest[1] !== void 0 ? "|$" : "";
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
          prev.value += value;
          state.output += prior.output + prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
          continue;
        }
        if (prior.type === "bos" && rest[0] === "/") {
          prev.type = "globstar";
          prev.value += value;
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
          state.output = prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
          continue;
        }
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "globstar";
        prev.output = globstar(opts);
        prev.value += value;
        state.output += prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      const token = { type: "star", value, output: star };
      if (opts.bash === true) {
        token.output = ".*?";
        if (prev.type === "bos" || prev.type === "slash") {
          token.output = nodot + token.output;
        }
        push(token);
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
        token.output = value;
        push(token);
        continue;
      }
      if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
        if (prev.type === "dot") {
          state.output += NO_DOT_SLASH;
          prev.output += NO_DOT_SLASH;
        } else if (opts.dot === true) {
          state.output += NO_DOTS_SLASH;
          prev.output += NO_DOTS_SLASH;
        } else {
          state.output += nodot;
          prev.output += nodot;
        }
        if (peek() !== "*") {
          state.output += ONE_CHAR;
          prev.output += ONE_CHAR;
        }
      }
      push(token);
    }
    while (state.brackets > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
      state.output = utils2.escapeLast(state.output, "[");
      decrement("brackets");
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
      state.output = utils2.escapeLast(state.output, "(");
      decrement("parens");
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
      state.output = utils2.escapeLast(state.output, "{");
      decrement("braces");
    }
    if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
      push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
    }
    if (state.backtrack === true) {
      state.output = "";
      for (const token of state.tokens) {
        state.output += token.output != null ? token.output : token.value;
        if (token.suffix) {
          state.output += token.suffix;
        }
      }
    }
    return state;
  };
  parse.fastpaths = (input, options) => {
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    const len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    const win32 = utils2.isWindows(options);
    const {
      DOT_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOTS_SLASH,
      STAR,
      START_ANCHOR
    } = constants2.globChars(win32);
    const nodot = opts.dot ? NO_DOTS : NO_DOT;
    const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    const capture = opts.capture ? "" : "?:";
    const state = { negated: false, prefix: "" };
    let star = opts.bash === true ? ".*?" : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    const globstar = (opts2) => {
      if (opts2.noglobstar === true) return star;
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = (str) => {
      switch (str) {
        case "*":
          return `${nodot}${ONE_CHAR}${star}`;
        case ".*":
          return `${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*.*":
          return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*/*":
          return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
        case "**":
          return nodot + globstar(opts);
        case "**/*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
        case "**/*.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "**/.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
        default: {
          const match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match) return;
          const source2 = create(match[1]);
          if (!source2) return;
          return source2 + DOT_LITERAL + match[2];
        }
      }
    };
    const output = utils2.removePrefix(input, state);
    let source = create(output);
    if (source && opts.strictSlashes !== true) {
      source += `${SLASH_LITERAL}?`;
    }
    return source;
  };
  parse_1$2 = parse;
  return parse_1$2;
}
var picomatch_1$1;
var hasRequiredPicomatch$3;
function requirePicomatch$3() {
  if (hasRequiredPicomatch$3) return picomatch_1$1;
  hasRequiredPicomatch$3 = 1;
  const path2 = import_path.default;
  const scan = requireScan$1();
  const parse = requireParse$2();
  const utils2 = requireUtils$2();
  const constants2 = requireConstants$3();
  const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
  const picomatch2 = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
      const fns = glob.map((input) => picomatch2(input, options, returnState));
      const arrayMatcher = (str) => {
        for (const isMatch of fns) {
          const state2 = isMatch(str);
          if (state2) return state2;
        }
        return false;
      };
      return arrayMatcher;
    }
    const isState = isObject(glob) && glob.tokens && glob.input;
    if (glob === "" || typeof glob !== "string" && !isState) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const opts = options || {};
    const posix = utils2.isWindows(options);
    const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
    const state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
      const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
      isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
      const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix });
      const result = { glob, state, regex, posix, input, output, match, isMatch };
      if (typeof opts.onResult === "function") {
        opts.onResult(result);
      }
      if (isMatch === false) {
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (isIgnored(input)) {
        if (typeof opts.onIgnore === "function") {
          opts.onIgnore(result);
        }
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (typeof opts.onMatch === "function") {
        opts.onMatch(result);
      }
      return returnObject ? result : true;
    };
    if (returnState) {
      matcher.state = state;
    }
    return matcher;
  };
  picomatch2.test = (input, regex, options, { glob, posix } = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    if (input === "") {
      return { isMatch: false, output: "" };
    }
    const opts = options || {};
    const format = opts.format || (posix ? utils2.toPosixSlashes : null);
    let match = input === glob;
    let output = match && format ? format(input) : input;
    if (match === false) {
      output = format ? format(input) : input;
      match = output === glob;
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch2.matchBase(input, regex, options, posix);
      } else {
        match = regex.exec(output);
      }
    }
    return { isMatch: Boolean(match), match, output };
  };
  picomatch2.matchBase = (input, glob, options, posix = utils2.isWindows(options)) => {
    const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
    return regex.test(path2.basename(input));
  };
  picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
  picomatch2.parse = (pattern, options) => {
    if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
    return parse(pattern, { ...options, fastpaths: false });
  };
  picomatch2.scan = (input, options) => scan(input, options);
  picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return state.output;
    }
    const opts = options || {};
    const prepend = opts.contains ? "" : "^";
    const append = opts.contains ? "" : "$";
    let source = `${prepend}(?:${state.output})${append}`;
    if (state && state.negated === true) {
      source = `^(?!${source}).*$`;
    }
    const regex = picomatch2.toRegex(source, options);
    if (returnState === true) {
      regex.state = state;
    }
    return regex;
  };
  picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== "string") {
      throw new TypeError("Expected a non-empty string");
    }
    let parsed = { negated: false, fastpaths: true };
    if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
      parsed.output = parse.fastpaths(input, options);
    }
    if (!parsed.output) {
      parsed = parse(input, options);
    }
    return picomatch2.compileRe(parsed, options, returnOutput, returnState);
  };
  picomatch2.toRegex = (source, options) => {
    try {
      const opts = options || {};
      return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
    } catch (err) {
      if (options && options.debug === true) throw err;
      return /$^/;
    }
  };
  picomatch2.constants = constants2;
  picomatch_1$1 = picomatch2;
  return picomatch_1$1;
}
var picomatch$1;
var hasRequiredPicomatch$2;
function requirePicomatch$2() {
  if (hasRequiredPicomatch$2) return picomatch$1;
  hasRequiredPicomatch$2 = 1;
  picomatch$1 = requirePicomatch$3();
  return picomatch$1;
}
var readdirp_1;
var hasRequiredReaddirp;
function requireReaddirp() {
  if (hasRequiredReaddirp) return readdirp_1;
  hasRequiredReaddirp = 1;
  const fs = import_fs.default;
  const { Readable } = import_stream.default;
  const sysPath = import_path.default;
  const { promisify } = import_util.default;
  const picomatch2 = requirePicomatch$2();
  const readdir = promisify(fs.readdir);
  const stat = promisify(fs.stat);
  const lstat = promisify(fs.lstat);
  const realpath = promisify(fs.realpath);
  const BANG = "!";
  const RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
  const NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
  const FILE_TYPE = "files";
  const DIR_TYPE = "directories";
  const FILE_DIR_TYPE = "files_directories";
  const EVERYTHING_TYPE = "all";
  const ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];
  const isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
  const [maj, min] = process.versions.node.split(".").slice(0, 2).map((n) => Number.parseInt(n, 10));
  const wantBigintFsStats = process.platform === "win32" && (maj > 10 || maj === 10 && min >= 5);
  const normalizeFilter = (filter) => {
    if (filter === void 0) return;
    if (typeof filter === "function") return filter;
    if (typeof filter === "string") {
      const glob = picomatch2(filter.trim());
      return (entry) => glob(entry.basename);
    }
    if (Array.isArray(filter)) {
      const positive = [];
      const negative = [];
      for (const item of filter) {
        const trimmed = item.trim();
        if (trimmed.charAt(0) === BANG) {
          negative.push(picomatch2(trimmed.slice(1)));
        } else {
          positive.push(picomatch2(trimmed));
        }
      }
      if (negative.length > 0) {
        if (positive.length > 0) {
          return (entry) => positive.some((f) => f(entry.basename)) && !negative.some((f) => f(entry.basename));
        }
        return (entry) => !negative.some((f) => f(entry.basename));
      }
      return (entry) => positive.some((f) => f(entry.basename));
    }
  };
  class ReaddirpStream extends Readable {
    static get defaultOptions() {
      return {
        root: ".",
        /* eslint-disable no-unused-vars */
        fileFilter: (path2) => true,
        directoryFilter: (path2) => true,
        /* eslint-enable no-unused-vars */
        type: FILE_TYPE,
        lstat: false,
        depth: 2147483648,
        alwaysStat: false
      };
    }
    constructor(options = {}) {
      super({
        objectMode: true,
        autoDestroy: true,
        highWaterMark: options.highWaterMark || 4096
      });
      const opts = { ...ReaddirpStream.defaultOptions, ...options };
      const { root, type } = opts;
      this._fileFilter = normalizeFilter(opts.fileFilter);
      this._directoryFilter = normalizeFilter(opts.directoryFilter);
      const statMethod = opts.lstat ? lstat : stat;
      if (wantBigintFsStats) {
        this._stat = (path2) => statMethod(path2, { bigint: true });
      } else {
        this._stat = statMethod;
      }
      this._maxDepth = opts.depth;
      this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
      this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
      this._wantsEverything = type === EVERYTHING_TYPE;
      this._root = sysPath.resolve(root);
      this._isDirent = "Dirent" in fs && !opts.alwaysStat;
      this._statsProp = this._isDirent ? "dirent" : "stats";
      this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
      this.parents = [this._exploreDir(root, 1)];
      this.reading = false;
      this.parent = void 0;
    }
    async _read(batch) {
      if (this.reading) return;
      this.reading = true;
      try {
        while (!this.destroyed && batch > 0) {
          const { path: path2, depth, files = [] } = this.parent || {};
          if (files.length > 0) {
            const slice = files.splice(0, batch).map((dirent) => this._formatEntry(dirent, path2));
            for (const entry of await Promise.all(slice)) {
              if (this.destroyed) return;
              const entryType = await this._getEntryType(entry);
              if (entryType === "directory" && this._directoryFilter(entry)) {
                if (depth <= this._maxDepth) {
                  this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
                }
                if (this._wantsDir) {
                  this.push(entry);
                  batch--;
                }
              } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
                if (this._wantsFile) {
                  this.push(entry);
                  batch--;
                }
              }
            }
          } else {
            const parent = this.parents.pop();
            if (!parent) {
              this.push(null);
              break;
            }
            this.parent = await parent;
            if (this.destroyed) return;
          }
        }
      } catch (error) {
        this.destroy(error);
      } finally {
        this.reading = false;
      }
    }
    async _exploreDir(path2, depth) {
      let files;
      try {
        files = await readdir(path2, this._rdOptions);
      } catch (error) {
        this._onError(error);
      }
      return { files, depth, path: path2 };
    }
    async _formatEntry(dirent, path2) {
      let entry;
      try {
        const basename = this._isDirent ? dirent.name : dirent;
        const fullPath = sysPath.resolve(sysPath.join(path2, basename));
        entry = { path: sysPath.relative(this._root, fullPath), fullPath, basename };
        entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
      } catch (err) {
        this._onError(err);
      }
      return entry;
    }
    _onError(err) {
      if (isNormalFlowError(err) && !this.destroyed) {
        this.emit("warn", err);
      } else {
        this.destroy(err);
      }
    }
    async _getEntryType(entry) {
      const stats = entry && entry[this._statsProp];
      if (!stats) {
        return;
      }
      if (stats.isFile()) {
        return "file";
      }
      if (stats.isDirectory()) {
        return "directory";
      }
      if (stats && stats.isSymbolicLink()) {
        const full = entry.fullPath;
        try {
          const entryRealPath = await realpath(full);
          const entryRealPathStats = await lstat(entryRealPath);
          if (entryRealPathStats.isFile()) {
            return "file";
          }
          if (entryRealPathStats.isDirectory()) {
            const len = entryRealPath.length;
            if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
              const recursiveError = new Error(
                `Circular symlink detected: "${full}" points to "${entryRealPath}"`
              );
              recursiveError.code = RECURSIVE_ERROR_CODE;
              return this._onError(recursiveError);
            }
            return "directory";
          }
        } catch (error) {
          this._onError(error);
        }
      }
    }
    _includeAsFile(entry) {
      const stats = entry && entry[this._statsProp];
      return stats && this._wantsEverything && !stats.isDirectory();
    }
  }
  const readdirp = (root, options = {}) => {
    let type = options.entryType || options.type;
    if (type === "both") type = FILE_DIR_TYPE;
    if (type) options.type = type;
    if (!root) {
      throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
    } else if (typeof root !== "string") {
      throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
    } else if (type && !ALL_TYPES.includes(type)) {
      throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
    }
    options.root = root;
    return new ReaddirpStream(options);
  };
  const readdirpPromise = (root, options = {}) => {
    return new Promise((resolve, reject) => {
      const files = [];
      readdirp(root, options).on("data", (entry) => files.push(entry)).on("end", () => resolve(files)).on("error", (error) => reject(error));
    });
  };
  readdirp.promise = readdirpPromise;
  readdirp.ReaddirpStream = ReaddirpStream;
  readdirp.default = readdirp;
  readdirp_1 = readdirp;
  return readdirp_1;
}
var anymatch = { exports: {} };
var utils$1 = {};
var constants$2;
var hasRequiredConstants$2;
function requireConstants$2() {
  if (hasRequiredConstants$2) return constants$2;
  hasRequiredConstants$2 = 1;
  const path2 = import_path.default;
  const WIN_SLASH = "\\\\/";
  const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
  const DOT_LITERAL = "\\.";
  const PLUS_LITERAL = "\\+";
  const QMARK_LITERAL = "\\?";
  const SLASH_LITERAL = "\\/";
  const ONE_CHAR = "(?=.)";
  const QMARK = "[^/]";
  const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
  const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
  const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
  const NO_DOT = `(?!${DOT_LITERAL})`;
  const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
  const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
  const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
  const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
  const STAR = `${QMARK}*?`;
  const POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
  };
  const WINDOWS_CHARS = {
    ...POSIX_CHARS,
    SLASH_LITERAL: `[${WIN_SLASH}]`,
    QMARK: WIN_NO_SLASH,
    STAR: `${WIN_NO_SLASH}*?`,
    DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
    NO_DOT: `(?!${DOT_LITERAL})`,
    NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
    NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
    QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
    START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
    END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
  };
  const POSIX_REGEX_SOURCE = {
    alnum: "a-zA-Z0-9",
    alpha: "a-zA-Z",
    ascii: "\\x00-\\x7F",
    blank: " \\t",
    cntrl: "\\x00-\\x1F\\x7F",
    digit: "0-9",
    graph: "\\x21-\\x7E",
    lower: "a-z",
    print: "\\x20-\\x7E ",
    punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
    space: " \\t\\r\\n\\v\\f",
    upper: "A-Z",
    word: "A-Za-z0-9_",
    xdigit: "A-Fa-f0-9"
  };
  constants$2 = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    // regular expressions
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    // Replace globs with equivalent patterns to reduce parsing time.
    REPLACEMENTS: {
      "***": "*",
      "**/**": "**",
      "**/**/**": "**"
    },
    // Digits
    CHAR_0: 48,
    /* 0 */
    CHAR_9: 57,
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: 65,
    /* A */
    CHAR_LOWERCASE_A: 97,
    /* a */
    CHAR_UPPERCASE_Z: 90,
    /* Z */
    CHAR_LOWERCASE_Z: 122,
    /* z */
    CHAR_LEFT_PARENTHESES: 40,
    /* ( */
    CHAR_RIGHT_PARENTHESES: 41,
    /* ) */
    CHAR_ASTERISK: 42,
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: 38,
    /* & */
    CHAR_AT: 64,
    /* @ */
    CHAR_BACKWARD_SLASH: 92,
    /* \ */
    CHAR_CARRIAGE_RETURN: 13,
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: 94,
    /* ^ */
    CHAR_COLON: 58,
    /* : */
    CHAR_COMMA: 44,
    /* , */
    CHAR_DOT: 46,
    /* . */
    CHAR_DOUBLE_QUOTE: 34,
    /* " */
    CHAR_EQUAL: 61,
    /* = */
    CHAR_EXCLAMATION_MARK: 33,
    /* ! */
    CHAR_FORM_FEED: 12,
    /* \f */
    CHAR_FORWARD_SLASH: 47,
    /* / */
    CHAR_GRAVE_ACCENT: 96,
    /* ` */
    CHAR_HASH: 35,
    /* # */
    CHAR_HYPHEN_MINUS: 45,
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: 60,
    /* < */
    CHAR_LEFT_CURLY_BRACE: 123,
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: 91,
    /* [ */
    CHAR_LINE_FEED: 10,
    /* \n */
    CHAR_NO_BREAK_SPACE: 160,
    /* \u00A0 */
    CHAR_PERCENT: 37,
    /* % */
    CHAR_PLUS: 43,
    /* + */
    CHAR_QUESTION_MARK: 63,
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    /* > */
    CHAR_RIGHT_CURLY_BRACE: 125,
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    /* ] */
    CHAR_SEMICOLON: 59,
    /* ; */
    CHAR_SINGLE_QUOTE: 39,
    /* ' */
    CHAR_SPACE: 32,
    /*   */
    CHAR_TAB: 9,
    /* \t */
    CHAR_UNDERSCORE: 95,
    /* _ */
    CHAR_VERTICAL_LINE: 124,
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    /* \uFEFF */
    SEP: path2.sep,
    /**
     * Create EXTGLOB_CHARS
     */
    extglobChars(chars) {
      return {
        "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
        "?": { type: "qmark", open: "(?:", close: ")?" },
        "+": { type: "plus", open: "(?:", close: ")+" },
        "*": { type: "star", open: "(?:", close: ")*" },
        "@": { type: "at", open: "(?:", close: ")" }
      };
    },
    /**
     * Create GLOB_CHARS
     */
    globChars(win32) {
      return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
  };
  return constants$2;
}
var hasRequiredUtils$1;
function requireUtils$1() {
  if (hasRequiredUtils$1) return utils$1;
  hasRequiredUtils$1 = 1;
  (function(exports) {
    const path2 = import_path.default;
    const win32 = process.platform === "win32";
    const {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = requireConstants$2();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path2.sep === "\\";
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  })(utils$1);
  return utils$1;
}
var scan_1;
var hasRequiredScan;
function requireScan() {
  if (hasRequiredScan) return scan_1;
  hasRequiredScan = 1;
  const utils2 = requireUtils$1();
  const {
    CHAR_ASTERISK,
    /* * */
    CHAR_AT,
    /* @ */
    CHAR_BACKWARD_SLASH,
    /* \ */
    CHAR_COMMA,
    /* , */
    CHAR_DOT,
    /* . */
    CHAR_EXCLAMATION_MARK,
    /* ! */
    CHAR_FORWARD_SLASH,
    /* / */
    CHAR_LEFT_CURLY_BRACE,
    /* { */
    CHAR_LEFT_PARENTHESES,
    /* ( */
    CHAR_LEFT_SQUARE_BRACKET,
    /* [ */
    CHAR_PLUS,
    /* + */
    CHAR_QUESTION_MARK,
    /* ? */
    CHAR_RIGHT_CURLY_BRACE,
    /* } */
    CHAR_RIGHT_PARENTHESES,
    /* ) */
    CHAR_RIGHT_SQUARE_BRACKET
    /* ] */
  } = requireConstants$2();
  const isPathSeparator = (code) => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
  };
  const depth = (token) => {
    if (token.isPrefix !== true) {
      token.depth = token.isGlobstar ? Infinity : 1;
    }
  };
  const scan = (input, options) => {
    const opts = options || {};
    const length = input.length - 1;
    const scanToEnd = opts.parts === true || opts.scanToEnd === true;
    const slashes = [];
    const tokens = [];
    const parts = [];
    let str = input;
    let index = -1;
    let start = 0;
    let lastIndex = 0;
    let isBrace = false;
    let isBracket = false;
    let isGlob2 = false;
    let isExtglob2 = false;
    let isGlobstar = false;
    let braceEscaped = false;
    let backslashes = false;
    let negated = false;
    let negatedExtglob = false;
    let finished = false;
    let braces = 0;
    let prev;
    let code;
    let token = { value: "", depth: 0, isGlob: false };
    const eos = () => index >= length;
    const peek = () => str.charCodeAt(index + 1);
    const advance = () => {
      prev = code;
      return str.charCodeAt(++index);
    };
    while (index < length) {
      code = advance();
      let next;
      if (code === CHAR_BACKWARD_SLASH) {
        backslashes = token.backslashes = true;
        code = advance();
        if (code === CHAR_LEFT_CURLY_BRACE) {
          braceEscaped = true;
        }
        continue;
      }
      if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
        braces++;
        while (eos() !== true && (code = advance())) {
          if (code === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braces++;
            continue;
          }
          if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (braceEscaped !== true && code === CHAR_COMMA) {
            isBrace = token.isBrace = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            if (scanToEnd === true) {
              continue;
            }
            break;
          }
          if (code === CHAR_RIGHT_CURLY_BRACE) {
            braces--;
            if (braces === 0) {
              braceEscaped = false;
              isBrace = token.isBrace = true;
              finished = true;
              break;
            }
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_FORWARD_SLASH) {
        slashes.push(index);
        tokens.push(token);
        token = { value: "", depth: 0, isGlob: false };
        if (finished === true) continue;
        if (prev === CHAR_DOT && index === start + 1) {
          start += 2;
          continue;
        }
        lastIndex = index + 1;
        continue;
      }
      if (opts.noext !== true) {
        const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
          isGlob2 = token.isGlob = true;
          isExtglob2 = token.isExtglob = true;
          finished = true;
          if (code === CHAR_EXCLAMATION_MARK && index === start) {
            negatedExtglob = true;
          }
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                isGlob2 = token.isGlob = true;
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
      }
      if (code === CHAR_ASTERISK) {
        if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_QUESTION_MARK) {
        isGlob2 = token.isGlob = true;
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (code === CHAR_LEFT_SQUARE_BRACKET) {
        while (eos() !== true && (next = advance())) {
          if (next === CHAR_BACKWARD_SLASH) {
            backslashes = token.backslashes = true;
            advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            isBracket = token.isBracket = true;
            isGlob2 = token.isGlob = true;
            finished = true;
            break;
          }
        }
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
      if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
        negated = token.negated = true;
        start++;
        continue;
      }
      if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
        isGlob2 = token.isGlob = true;
        if (scanToEnd === true) {
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_LEFT_PARENTHESES) {
              backslashes = token.backslashes = true;
              code = advance();
              continue;
            }
            if (code === CHAR_RIGHT_PARENTHESES) {
              finished = true;
              break;
            }
          }
          continue;
        }
        break;
      }
      if (isGlob2 === true) {
        finished = true;
        if (scanToEnd === true) {
          continue;
        }
        break;
      }
    }
    if (opts.noext === true) {
      isExtglob2 = false;
      isGlob2 = false;
    }
    let base = str;
    let prefix = "";
    let glob = "";
    if (start > 0) {
      prefix = str.slice(0, start);
      str = str.slice(start);
      lastIndex -= start;
    }
    if (base && isGlob2 === true && lastIndex > 0) {
      base = str.slice(0, lastIndex);
      glob = str.slice(lastIndex);
    } else if (isGlob2 === true) {
      base = "";
      glob = str;
    } else {
      base = str;
    }
    if (base && base !== "" && base !== "/" && base !== str) {
      if (isPathSeparator(base.charCodeAt(base.length - 1))) {
        base = base.slice(0, -1);
      }
    }
    if (opts.unescape === true) {
      if (glob) glob = utils2.removeBackslashes(glob);
      if (base && backslashes === true) {
        base = utils2.removeBackslashes(base);
      }
    }
    const state = {
      prefix,
      input,
      start,
      base,
      glob,
      isBrace,
      isBracket,
      isGlob: isGlob2,
      isExtglob: isExtglob2,
      isGlobstar,
      negated,
      negatedExtglob
    };
    if (opts.tokens === true) {
      state.maxDepth = 0;
      if (!isPathSeparator(code)) {
        tokens.push(token);
      }
      state.tokens = tokens;
    }
    if (opts.parts === true || opts.tokens === true) {
      let prevIndex;
      for (let idx = 0; idx < slashes.length; idx++) {
        const n = prevIndex ? prevIndex + 1 : start;
        const i = slashes[idx];
        const value = input.slice(n, i);
        if (opts.tokens) {
          if (idx === 0 && start !== 0) {
            tokens[idx].isPrefix = true;
            tokens[idx].value = prefix;
          } else {
            tokens[idx].value = value;
          }
          depth(tokens[idx]);
          state.maxDepth += tokens[idx].depth;
        }
        if (idx !== 0 || value !== "") {
          parts.push(value);
        }
        prevIndex = i;
      }
      if (prevIndex && prevIndex + 1 < input.length) {
        const value = input.slice(prevIndex + 1);
        parts.push(value);
        if (opts.tokens) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
      }
      state.slashes = slashes;
      state.parts = parts;
    }
    return state;
  };
  scan_1 = scan;
  return scan_1;
}
var parse_1$1;
var hasRequiredParse$1;
function requireParse$1() {
  if (hasRequiredParse$1) return parse_1$1;
  hasRequiredParse$1 = 1;
  const constants2 = requireConstants$2();
  const utils2 = requireUtils$1();
  const {
    MAX_LENGTH,
    POSIX_REGEX_SOURCE,
    REGEX_NON_SPECIAL_CHARS,
    REGEX_SPECIAL_CHARS_BACKREF,
    REPLACEMENTS
  } = constants2;
  const expandRange = (args, options) => {
    if (typeof options.expandRange === "function") {
      return options.expandRange(...args, options);
    }
    args.sort();
    const value = `[${args.join("-")}]`;
    return value;
  };
  const syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
  };
  const parse = (input, options) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    input = REPLACEMENTS[input] || input;
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    let len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    const bos = { type: "bos", value: "", output: opts.prepend || "" };
    const tokens = [bos];
    const capture = opts.capture ? "" : "?:";
    const win32 = utils2.isWindows(options);
    const PLATFORM_CHARS = constants2.globChars(win32);
    const EXTGLOB_CHARS = constants2.extglobChars(PLATFORM_CHARS);
    const {
      DOT_LITERAL,
      PLUS_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    } = PLATFORM_CHARS;
    const globstar = (opts2) => {
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const nodot = opts.dot ? "" : NO_DOT;
    const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    if (typeof opts.noext === "boolean") {
      opts.noextglob = opts.noext;
    }
    const state = {
      input,
      index: -1,
      start: 0,
      dot: opts.dot === true,
      consumed: "",
      output: "",
      prefix: "",
      backtrack: false,
      negated: false,
      brackets: 0,
      braces: 0,
      parens: 0,
      quotes: 0,
      globstar: false,
      tokens
    };
    input = utils2.removePrefix(input, state);
    len = input.length;
    const extglobs = [];
    const braces = [];
    const stack = [];
    let prev = bos;
    let value;
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index] || "";
    const remaining = () => input.slice(state.index + 1);
    const consume = (value2 = "", num = 0) => {
      state.consumed += value2;
      state.index += num;
    };
    const append = (token) => {
      state.output += token.output != null ? token.output : token.value;
      consume(token.value);
    };
    const negate = () => {
      let count = 1;
      while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
        advance();
        state.start++;
        count++;
      }
      if (count % 2 === 0) {
        return false;
      }
      state.negated = true;
      state.start++;
      return true;
    };
    const increment = (type) => {
      state[type]++;
      stack.push(type);
    };
    const decrement = (type) => {
      state[type]--;
      stack.pop();
    };
    const push = (tok) => {
      if (prev.type === "globstar") {
        const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
        const isExtglob2 = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
        if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob2) {
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "star";
          prev.value = "*";
          prev.output = star;
          state.output += prev.output;
        }
      }
      if (extglobs.length && tok.type !== "paren") {
        extglobs[extglobs.length - 1].inner += tok.value;
      }
      if (tok.value || tok.output) append(tok);
      if (prev && prev.type === "text" && tok.type === "text") {
        prev.value += tok.value;
        prev.output = (prev.output || "") + tok.value;
        return;
      }
      tok.prev = prev;
      tokens.push(tok);
      prev = tok;
    };
    const extglobOpen = (type, value2) => {
      const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
      token.prev = prev;
      token.parens = state.parens;
      token.output = state.output;
      const output = (opts.capture ? "(" : "") + token.open;
      increment("parens");
      push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
      push({ type: "paren", extglob: true, value: advance(), output });
      extglobs.push(token);
    };
    const extglobClose = (token) => {
      let output = token.close + (opts.capture ? ")" : "");
      let rest;
      if (token.type === "negate") {
        let extglobStar = star;
        if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
          extglobStar = globstar(opts);
        }
        if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
          output = token.close = `)$))${extglobStar}`;
        }
        if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
          const expression = parse(rest, { ...options, fastpaths: false }).output;
          output = token.close = `)${expression})${extglobStar})`;
        }
        if (token.prev.type === "bos") {
          state.negatedExtglob = true;
        }
      }
      push({ type: "paren", extglob: true, value, output });
      decrement("parens");
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
      let backslashes = false;
      let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
        if (first === "\\") {
          backslashes = true;
          return m;
        }
        if (first === "?") {
          if (esc) {
            return esc + first + (rest ? QMARK.repeat(rest.length) : "");
          }
          if (index === 0) {
            return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
          }
          return QMARK.repeat(chars.length);
        }
        if (first === ".") {
          return DOT_LITERAL.repeat(chars.length);
        }
        if (first === "*") {
          if (esc) {
            return esc + first + (rest ? star : "");
          }
          return star;
        }
        return esc ? m : `\\${m}`;
      });
      if (backslashes === true) {
        if (opts.unescape === true) {
          output = output.replace(/\\/g, "");
        } else {
          output = output.replace(/\\+/g, (m) => {
            return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
          });
        }
      }
      if (output === input && opts.contains === true) {
        state.output = input;
        return state;
      }
      state.output = utils2.wrapOutput(output, state, options);
      return state;
    }
    while (!eos()) {
      value = advance();
      if (value === "\0") {
        continue;
      }
      if (value === "\\") {
        const next = peek();
        if (next === "/" && opts.bash !== true) {
          continue;
        }
        if (next === "." || next === ";") {
          continue;
        }
        if (!next) {
          value += "\\";
          push({ type: "text", value });
          continue;
        }
        const match = /^\\+/.exec(remaining());
        let slashes = 0;
        if (match && match[0].length > 2) {
          slashes = match[0].length;
          state.index += slashes;
          if (slashes % 2 !== 0) {
            value += "\\";
          }
        }
        if (opts.unescape === true) {
          value = advance();
        } else {
          value += advance();
        }
        if (state.brackets === 0) {
          push({ type: "text", value });
          continue;
        }
      }
      if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
        if (opts.posix !== false && value === ":") {
          const inner = prev.value.slice(1);
          if (inner.includes("[")) {
            prev.posix = true;
            if (inner.includes(":")) {
              const idx = prev.value.lastIndexOf("[");
              const pre = prev.value.slice(0, idx);
              const rest2 = prev.value.slice(idx + 2);
              const posix = POSIX_REGEX_SOURCE[rest2];
              if (posix) {
                prev.value = pre + posix;
                state.backtrack = true;
                advance();
                if (!bos.output && tokens.indexOf(prev) === 1) {
                  bos.output = ONE_CHAR;
                }
                continue;
              }
            }
          }
        }
        if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
          value = `\\${value}`;
        }
        if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
          value = `\\${value}`;
        }
        if (opts.posix === true && value === "!" && prev.value === "[") {
          value = "^";
        }
        prev.value += value;
        append({ value });
        continue;
      }
      if (state.quotes === 1 && value !== '"') {
        value = utils2.escapeRegex(value);
        prev.value += value;
        append({ value });
        continue;
      }
      if (value === '"') {
        state.quotes = state.quotes === 1 ? 0 : 1;
        if (opts.keepQuotes === true) {
          push({ type: "text", value });
        }
        continue;
      }
      if (value === "(") {
        increment("parens");
        push({ type: "paren", value });
        continue;
      }
      if (value === ")") {
        if (state.parens === 0 && opts.strictBrackets === true) {
          throw new SyntaxError(syntaxError("opening", "("));
        }
        const extglob = extglobs[extglobs.length - 1];
        if (extglob && state.parens === extglob.parens + 1) {
          extglobClose(extglobs.pop());
          continue;
        }
        push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
        decrement("parens");
        continue;
      }
      if (value === "[") {
        if (opts.nobracket === true || !remaining().includes("]")) {
          if (opts.nobracket !== true && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("closing", "]"));
          }
          value = `\\${value}`;
        } else {
          increment("brackets");
        }
        push({ type: "bracket", value });
        continue;
      }
      if (value === "]") {
        if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        if (state.brackets === 0) {
          if (opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "["));
          }
          push({ type: "text", value, output: `\\${value}` });
          continue;
        }
        decrement("brackets");
        const prevValue = prev.value.slice(1);
        if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
          value = `/${value}`;
        }
        prev.value += value;
        append({ value });
        if (opts.literalBrackets === false || utils2.hasRegexChars(prevValue)) {
          continue;
        }
        const escaped = utils2.escapeRegex(prev.value);
        state.output = state.output.slice(0, -prev.value.length);
        if (opts.literalBrackets === true) {
          state.output += escaped;
          prev.value = escaped;
          continue;
        }
        prev.value = `(${capture}${escaped}|${prev.value})`;
        state.output += prev.value;
        continue;
      }
      if (value === "{" && opts.nobrace !== true) {
        increment("braces");
        const open = {
          type: "brace",
          value,
          output: "(",
          outputIndex: state.output.length,
          tokensIndex: state.tokens.length
        };
        braces.push(open);
        push(open);
        continue;
      }
      if (value === "}") {
        const brace = braces[braces.length - 1];
        if (opts.nobrace === true || !brace) {
          push({ type: "text", value, output: value });
          continue;
        }
        let output = ")";
        if (brace.dots === true) {
          const arr = tokens.slice();
          const range = [];
          for (let i = arr.length - 1; i >= 0; i--) {
            tokens.pop();
            if (arr[i].type === "brace") {
              break;
            }
            if (arr[i].type !== "dots") {
              range.unshift(arr[i].value);
            }
          }
          output = expandRange(range, opts);
          state.backtrack = true;
        }
        if (brace.comma !== true && brace.dots !== true) {
          const out = state.output.slice(0, brace.outputIndex);
          const toks = state.tokens.slice(brace.tokensIndex);
          brace.value = brace.output = "\\{";
          value = output = "\\}";
          state.output = out;
          for (const t of toks) {
            state.output += t.output || t.value;
          }
        }
        push({ type: "brace", value, output });
        decrement("braces");
        braces.pop();
        continue;
      }
      if (value === "|") {
        if (extglobs.length > 0) {
          extglobs[extglobs.length - 1].conditions++;
        }
        push({ type: "text", value });
        continue;
      }
      if (value === ",") {
        let output = value;
        const brace = braces[braces.length - 1];
        if (brace && stack[stack.length - 1] === "braces") {
          brace.comma = true;
          output = "|";
        }
        push({ type: "comma", value, output });
        continue;
      }
      if (value === "/") {
        if (prev.type === "dot" && state.index === state.start + 1) {
          state.start = state.index + 1;
          state.consumed = "";
          state.output = "";
          tokens.pop();
          prev = bos;
          continue;
        }
        push({ type: "slash", value, output: SLASH_LITERAL });
        continue;
      }
      if (value === ".") {
        if (state.braces > 0 && prev.type === "dot") {
          if (prev.value === ".") prev.output = DOT_LITERAL;
          const brace = braces[braces.length - 1];
          prev.type = "dots";
          prev.output += value;
          prev.value += value;
          brace.dots = true;
          continue;
        }
        if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
          push({ type: "text", value, output: DOT_LITERAL });
          continue;
        }
        push({ type: "dot", value, output: DOT_LITERAL });
        continue;
      }
      if (value === "?") {
        const isGroup = prev && prev.value === "(";
        if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("qmark", value);
          continue;
        }
        if (prev && prev.type === "paren") {
          const next = peek();
          let output = value;
          if (next === "<" && !utils2.supportsLookbehinds()) {
            throw new Error("Node.js v10 or higher is required for regex lookbehinds");
          }
          if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
            output = `\\${value}`;
          }
          push({ type: "text", value, output });
          continue;
        }
        if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
          push({ type: "qmark", value, output: QMARK_NO_DOT });
          continue;
        }
        push({ type: "qmark", value, output: QMARK });
        continue;
      }
      if (value === "!") {
        if (opts.noextglob !== true && peek() === "(") {
          if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
            extglobOpen("negate", value);
            continue;
          }
        }
        if (opts.nonegate !== true && state.index === 0) {
          negate();
          continue;
        }
      }
      if (value === "+") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          extglobOpen("plus", value);
          continue;
        }
        if (prev && prev.value === "(" || opts.regex === false) {
          push({ type: "plus", value, output: PLUS_LITERAL });
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
          push({ type: "plus", value });
          continue;
        }
        push({ type: "plus", value: PLUS_LITERAL });
        continue;
      }
      if (value === "@") {
        if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
          push({ type: "at", extglob: true, value, output: "" });
          continue;
        }
        push({ type: "text", value });
        continue;
      }
      if (value !== "*") {
        if (value === "$" || value === "^") {
          value = `\\${value}`;
        }
        const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
        if (match) {
          value += match[0];
          state.index += match[0].length;
        }
        push({ type: "text", value });
        continue;
      }
      if (prev && (prev.type === "globstar" || prev.star === true)) {
        prev.type = "star";
        prev.star = true;
        prev.value += value;
        prev.output = star;
        state.backtrack = true;
        state.globstar = true;
        consume(value);
        continue;
      }
      let rest = remaining();
      if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
        extglobOpen("star", value);
        continue;
      }
      if (prev.type === "star") {
        if (opts.noglobstar === true) {
          consume(value);
          continue;
        }
        const prior = prev.prev;
        const before = prior.prev;
        const isStart = prior.type === "slash" || prior.type === "bos";
        const afterStar = before && (before.type === "star" || before.type === "globstar");
        if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
          push({ type: "star", value, output: "" });
          continue;
        }
        const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
        const isExtglob2 = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
        if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob2) {
          push({ type: "star", value, output: "" });
          continue;
        }
        while (rest.slice(0, 3) === "/**") {
          const after = input[state.index + 4];
          if (after && after !== "/") {
            break;
          }
          rest = rest.slice(3);
          consume("/**", 3);
        }
        if (prior.type === "bos" && eos()) {
          prev.type = "globstar";
          prev.value += value;
          prev.output = globstar(opts);
          state.output = prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
          prev.value += value;
          state.globstar = true;
          state.output += prior.output + prev.output;
          consume(value);
          continue;
        }
        if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
          const end = rest[1] !== void 0 ? "|$" : "";
          state.output = state.output.slice(0, -(prior.output + prev.output).length);
          prior.output = `(?:${prior.output}`;
          prev.type = "globstar";
          prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
          prev.value += value;
          state.output += prior.output + prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
          continue;
        }
        if (prior.type === "bos" && rest[0] === "/") {
          prev.type = "globstar";
          prev.value += value;
          prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
          state.output = prev.output;
          state.globstar = true;
          consume(value + advance());
          push({ type: "slash", value: "/", output: "" });
          continue;
        }
        state.output = state.output.slice(0, -prev.output.length);
        prev.type = "globstar";
        prev.output = globstar(opts);
        prev.value += value;
        state.output += prev.output;
        state.globstar = true;
        consume(value);
        continue;
      }
      const token = { type: "star", value, output: star };
      if (opts.bash === true) {
        token.output = ".*?";
        if (prev.type === "bos" || prev.type === "slash") {
          token.output = nodot + token.output;
        }
        push(token);
        continue;
      }
      if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
        token.output = value;
        push(token);
        continue;
      }
      if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
        if (prev.type === "dot") {
          state.output += NO_DOT_SLASH;
          prev.output += NO_DOT_SLASH;
        } else if (opts.dot === true) {
          state.output += NO_DOTS_SLASH;
          prev.output += NO_DOTS_SLASH;
        } else {
          state.output += nodot;
          prev.output += nodot;
        }
        if (peek() !== "*") {
          state.output += ONE_CHAR;
          prev.output += ONE_CHAR;
        }
      }
      push(token);
    }
    while (state.brackets > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
      state.output = utils2.escapeLast(state.output, "[");
      decrement("brackets");
    }
    while (state.parens > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
      state.output = utils2.escapeLast(state.output, "(");
      decrement("parens");
    }
    while (state.braces > 0) {
      if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
      state.output = utils2.escapeLast(state.output, "{");
      decrement("braces");
    }
    if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
      push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
    }
    if (state.backtrack === true) {
      state.output = "";
      for (const token of state.tokens) {
        state.output += token.output != null ? token.output : token.value;
        if (token.suffix) {
          state.output += token.suffix;
        }
      }
    }
    return state;
  };
  parse.fastpaths = (input, options) => {
    const opts = { ...options };
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    const len = input.length;
    if (len > max) {
      throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    const win32 = utils2.isWindows(options);
    const {
      DOT_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOTS_SLASH,
      STAR,
      START_ANCHOR
    } = constants2.globChars(win32);
    const nodot = opts.dot ? NO_DOTS : NO_DOT;
    const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    const capture = opts.capture ? "" : "?:";
    const state = { negated: false, prefix: "" };
    let star = opts.bash === true ? ".*?" : STAR;
    if (opts.capture) {
      star = `(${star})`;
    }
    const globstar = (opts2) => {
      if (opts2.noglobstar === true) return star;
      return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = (str) => {
      switch (str) {
        case "*":
          return `${nodot}${ONE_CHAR}${star}`;
        case ".*":
          return `${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*.*":
          return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "*/*":
          return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
        case "**":
          return nodot + globstar(opts);
        case "**/*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
        case "**/*.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
        case "**/.*":
          return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
        default: {
          const match = /^(.*?)\.(\w+)$/.exec(str);
          if (!match) return;
          const source2 = create(match[1]);
          if (!source2) return;
          return source2 + DOT_LITERAL + match[2];
        }
      }
    };
    const output = utils2.removePrefix(input, state);
    let source = create(output);
    if (source && opts.strictSlashes !== true) {
      source += `${SLASH_LITERAL}?`;
    }
    return source;
  };
  parse_1$1 = parse;
  return parse_1$1;
}
var picomatch_1;
var hasRequiredPicomatch$1;
function requirePicomatch$1() {
  if (hasRequiredPicomatch$1) return picomatch_1;
  hasRequiredPicomatch$1 = 1;
  const path2 = import_path.default;
  const scan = requireScan();
  const parse = requireParse$1();
  const utils2 = requireUtils$1();
  const constants2 = requireConstants$2();
  const isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
  const picomatch2 = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
      const fns = glob.map((input) => picomatch2(input, options, returnState));
      const arrayMatcher = (str) => {
        for (const isMatch of fns) {
          const state2 = isMatch(str);
          if (state2) return state2;
        }
        return false;
      };
      return arrayMatcher;
    }
    const isState = isObject(glob) && glob.tokens && glob.input;
    if (glob === "" || typeof glob !== "string" && !isState) {
      throw new TypeError("Expected pattern to be a non-empty string");
    }
    const opts = options || {};
    const posix = utils2.isWindows(options);
    const regex = isState ? picomatch2.compileRe(glob, options) : picomatch2.makeRe(glob, options, false, true);
    const state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
      const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
      isIgnored = picomatch2(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
      const { isMatch, match, output } = picomatch2.test(input, regex, options, { glob, posix });
      const result = { glob, state, regex, posix, input, output, match, isMatch };
      if (typeof opts.onResult === "function") {
        opts.onResult(result);
      }
      if (isMatch === false) {
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (isIgnored(input)) {
        if (typeof opts.onIgnore === "function") {
          opts.onIgnore(result);
        }
        result.isMatch = false;
        return returnObject ? result : false;
      }
      if (typeof opts.onMatch === "function") {
        opts.onMatch(result);
      }
      return returnObject ? result : true;
    };
    if (returnState) {
      matcher.state = state;
    }
    return matcher;
  };
  picomatch2.test = (input, regex, options, { glob, posix } = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected input to be a string");
    }
    if (input === "") {
      return { isMatch: false, output: "" };
    }
    const opts = options || {};
    const format = opts.format || (posix ? utils2.toPosixSlashes : null);
    let match = input === glob;
    let output = match && format ? format(input) : input;
    if (match === false) {
      output = format ? format(input) : input;
      match = output === glob;
    }
    if (match === false || opts.capture === true) {
      if (opts.matchBase === true || opts.basename === true) {
        match = picomatch2.matchBase(input, regex, options, posix);
      } else {
        match = regex.exec(output);
      }
    }
    return { isMatch: Boolean(match), match, output };
  };
  picomatch2.matchBase = (input, glob, options, posix = utils2.isWindows(options)) => {
    const regex = glob instanceof RegExp ? glob : picomatch2.makeRe(glob, options);
    return regex.test(path2.basename(input));
  };
  picomatch2.isMatch = (str, patterns, options) => picomatch2(patterns, options)(str);
  picomatch2.parse = (pattern, options) => {
    if (Array.isArray(pattern)) return pattern.map((p) => picomatch2.parse(p, options));
    return parse(pattern, { ...options, fastpaths: false });
  };
  picomatch2.scan = (input, options) => scan(input, options);
  picomatch2.compileRe = (state, options, returnOutput = false, returnState = false) => {
    if (returnOutput === true) {
      return state.output;
    }
    const opts = options || {};
    const prepend = opts.contains ? "" : "^";
    const append = opts.contains ? "" : "$";
    let source = `${prepend}(?:${state.output})${append}`;
    if (state && state.negated === true) {
      source = `^(?!${source}).*$`;
    }
    const regex = picomatch2.toRegex(source, options);
    if (returnState === true) {
      regex.state = state;
    }
    return regex;
  };
  picomatch2.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== "string") {
      throw new TypeError("Expected a non-empty string");
    }
    let parsed = { negated: false, fastpaths: true };
    if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
      parsed.output = parse.fastpaths(input, options);
    }
    if (!parsed.output) {
      parsed = parse(input, options);
    }
    return picomatch2.compileRe(parsed, options, returnOutput, returnState);
  };
  picomatch2.toRegex = (source, options) => {
    try {
      const opts = options || {};
      return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
    } catch (err) {
      if (options && options.debug === true) throw err;
      return /$^/;
    }
  };
  picomatch2.constants = constants2;
  picomatch_1 = picomatch2;
  return picomatch_1;
}
var picomatch;
var hasRequiredPicomatch;
function requirePicomatch() {
  if (hasRequiredPicomatch) return picomatch;
  hasRequiredPicomatch = 1;
  picomatch = requirePicomatch$1();
  return picomatch;
}
var normalizePath;
var hasRequiredNormalizePath;
function requireNormalizePath() {
  if (hasRequiredNormalizePath) return normalizePath;
  hasRequiredNormalizePath = 1;
  normalizePath = function(path2, stripTrailing) {
    if (typeof path2 !== "string") {
      throw new TypeError("expected path to be a string");
    }
    if (path2 === "\\" || path2 === "/") return "/";
    var len = path2.length;
    if (len <= 1) return path2;
    var prefix = "";
    if (len > 4 && path2[3] === "\\") {
      var ch = path2[2];
      if ((ch === "?" || ch === ".") && path2.slice(0, 2) === "\\\\") {
        path2 = path2.slice(2);
        prefix = "//";
      }
    }
    var segs = path2.split(/[/\\]+/);
    if (stripTrailing !== false && segs[segs.length - 1] === "") {
      segs.pop();
    }
    return prefix + segs.join("/");
  };
  return normalizePath;
}
var anymatch_1 = anymatch.exports;
var hasRequiredAnymatch;
function requireAnymatch() {
  if (hasRequiredAnymatch) return anymatch.exports;
  hasRequiredAnymatch = 1;
  Object.defineProperty(anymatch_1, "__esModule", { value: true });
  const picomatch2 = requirePicomatch();
  const normalizePath2 = requireNormalizePath();
  const BANG = "!";
  const DEFAULT_OPTIONS = { returnIndex: false };
  const arrify = (item) => Array.isArray(item) ? item : [item];
  const createPattern = (matcher, options) => {
    if (typeof matcher === "function") {
      return matcher;
    }
    if (typeof matcher === "string") {
      const glob = picomatch2(matcher, options);
      return (string) => matcher === string || glob(string);
    }
    if (matcher instanceof RegExp) {
      return (string) => matcher.test(string);
    }
    return (string) => false;
  };
  const matchPatterns = (patterns, negPatterns, args, returnIndex) => {
    const isList = Array.isArray(args);
    const _path = isList ? args[0] : args;
    if (!isList && typeof _path !== "string") {
      throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
    }
    const path2 = normalizePath2(_path, false);
    for (let index = 0; index < negPatterns.length; index++) {
      const nglob = negPatterns[index];
      if (nglob(path2)) {
        return returnIndex ? -1 : false;
      }
    }
    const applied = isList && [path2].concat(args.slice(1));
    for (let index = 0; index < patterns.length; index++) {
      const pattern = patterns[index];
      if (isList ? pattern(...applied) : pattern(path2)) {
        return returnIndex ? index : true;
      }
    }
    return returnIndex ? -1 : false;
  };
  const anymatch$1 = (matchers, testString, options = DEFAULT_OPTIONS) => {
    if (matchers == null) {
      throw new TypeError("anymatch: specify first argument");
    }
    const opts = typeof options === "boolean" ? { returnIndex: options } : options;
    const returnIndex = opts.returnIndex || false;
    const mtchers = arrify(matchers);
    const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG).map((item) => item.slice(1)).map((item) => picomatch2(item, opts));
    const patterns = mtchers.filter((item) => typeof item !== "string" || typeof item === "string" && item.charAt(0) !== BANG).map((matcher) => createPattern(matcher, opts));
    if (testString == null) {
      return (testString2, ri = false) => {
        const returnIndex2 = typeof ri === "boolean" ? ri : false;
        return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
      };
    }
    return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
  };
  anymatch$1.default = anymatch$1;
  anymatch.exports = anymatch$1;
  return anymatch.exports;
}
var isExtglob;
var hasRequiredIsExtglob;
function requireIsExtglob() {
  if (hasRequiredIsExtglob) return isExtglob;
  hasRequiredIsExtglob = 1;
  isExtglob = function isExtglob2(str) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    var match;
    while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
      if (match[2]) return true;
      str = str.slice(match.index + match[0].length);
    }
    return false;
  };
  return isExtglob;
}
var isGlob;
var hasRequiredIsGlob;
function requireIsGlob() {
  if (hasRequiredIsGlob) return isGlob;
  hasRequiredIsGlob = 1;
  var isExtglob2 = requireIsExtglob();
  var chars = { "{": "}", "(": ")", "[": "]" };
  var strictCheck = function(str) {
    if (str[0] === "!") {
      return true;
    }
    var index = 0;
    var pipeIndex = -2;
    var closeSquareIndex = -2;
    var closeCurlyIndex = -2;
    var closeParenIndex = -2;
    var backSlashIndex = -2;
    while (index < str.length) {
      if (str[index] === "*") {
        return true;
      }
      if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
        return true;
      }
      if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
        if (closeSquareIndex < index) {
          closeSquareIndex = str.indexOf("]", index);
        }
        if (closeSquareIndex > index) {
          if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
            return true;
          }
          backSlashIndex = str.indexOf("\\", index);
          if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
            return true;
          }
        }
      }
      if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
        closeCurlyIndex = str.indexOf("}", index);
        if (closeCurlyIndex > index) {
          backSlashIndex = str.indexOf("\\", index);
          if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
            return true;
          }
        }
      }
      if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
        closeParenIndex = str.indexOf(")", index);
        if (closeParenIndex > index) {
          backSlashIndex = str.indexOf("\\", index);
          if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
            return true;
          }
        }
      }
      if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
        if (pipeIndex < index) {
          pipeIndex = str.indexOf("|", index);
        }
        if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
          closeParenIndex = str.indexOf(")", pipeIndex);
          if (closeParenIndex > pipeIndex) {
            backSlashIndex = str.indexOf("\\", pipeIndex);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
      }
      if (str[index] === "\\") {
        var open = str[index + 1];
        index += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index);
          if (n !== -1) {
            index = n + 1;
          }
        }
        if (str[index] === "!") {
          return true;
        }
      } else {
        index++;
      }
    }
    return false;
  };
  var relaxedCheck = function(str) {
    if (str[0] === "!") {
      return true;
    }
    var index = 0;
    while (index < str.length) {
      if (/[*?{}()[\]]/.test(str[index])) {
        return true;
      }
      if (str[index] === "\\") {
        var open = str[index + 1];
        index += 2;
        var close = chars[open];
        if (close) {
          var n = str.indexOf(close, index);
          if (n !== -1) {
            index = n + 1;
          }
        }
        if (str[index] === "!") {
          return true;
        }
      } else {
        index++;
      }
    }
    return false;
  };
  isGlob = function isGlob2(str, options) {
    if (typeof str !== "string" || str === "") {
      return false;
    }
    if (isExtglob2(str)) {
      return true;
    }
    var check = strictCheck;
    if (options && options.strict === false) {
      check = relaxedCheck;
    }
    return check(str);
  };
  return isGlob;
}
var globParent;
var hasRequiredGlobParent;
function requireGlobParent() {
  if (hasRequiredGlobParent) return globParent;
  hasRequiredGlobParent = 1;
  var isGlob2 = requireIsGlob();
  var pathPosixDirname = import_path.default.posix.dirname;
  var isWin32 = import_os.default.platform() === "win32";
  var slash = "/";
  var backslash = /\\/g;
  var enclosure = /[\{\[].*[\}\]]$/;
  var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
  var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
  globParent = function globParent2(str, opts) {
    var options = Object.assign({ flipBackslashes: true }, opts);
    if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
      str = str.replace(backslash, slash);
    }
    if (enclosure.test(str)) {
      str += slash;
    }
    str += "a";
    do {
      str = pathPosixDirname(str);
    } while (isGlob2(str) || globby.test(str));
    return str.replace(escaped, "$1");
  };
  return globParent;
}
var utils = {};
var hasRequiredUtils;
function requireUtils() {
  if (hasRequiredUtils) return utils;
  hasRequiredUtils = 1;
  (function(exports) {
    exports.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false;
      if (!exports.isInteger(min) || !exports.isInteger(max)) return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node) return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports.encloseBrace = (node) => {
      if (node.type !== "brace") return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports.isInvalidBrace = (block) => {
      if (block.type !== "brace") return false;
      if (block.invalid === true || block.dollar) return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text") acc.push(node.value);
      if (node.type === "range") node.type = "text";
      return acc;
    }, []);
    exports.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  })(utils);
  return utils;
}
var stringify;
var hasRequiredStringify;
function requireStringify() {
  if (hasRequiredStringify) return stringify;
  hasRequiredStringify = 1;
  const utils2 = requireUtils();
  stringify = (ast, options = {}) => {
    const stringify2 = (node, parent = {}) => {
      const invalidBlock = options.escapeInvalid && utils2.isInvalidBrace(parent);
      const invalidNode = node.invalid === true && options.escapeInvalid === true;
      let output = "";
      if (node.value) {
        if ((invalidBlock || invalidNode) && utils2.isOpenOrClose(node)) {
          return "\\" + node.value;
        }
        return node.value;
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes) {
        for (const child of node.nodes) {
          output += stringify2(child);
        }
      }
      return output;
    };
    return stringify2(ast);
  };
  return stringify;
}
var isNumber;
var hasRequiredIsNumber;
function requireIsNumber() {
  if (hasRequiredIsNumber) return isNumber;
  hasRequiredIsNumber = 1;
  isNumber = function(num) {
    if (typeof num === "number") {
      return num - num === 0;
    }
    if (typeof num === "string" && num.trim() !== "") {
      return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
  };
  return isNumber;
}
var toRegexRange_1;
var hasRequiredToRegexRange;
function requireToRegexRange() {
  if (hasRequiredToRegexRange) return toRegexRange_1;
  hasRequiredToRegexRange = 1;
  const isNumber2 = requireIsNumber();
  const toRegexRange = (min, max, options) => {
    if (isNumber2(min) === false) {
      throw new TypeError("toRegexRange: expected the first argument to be a number");
    }
    if (max === void 0 || min === max) {
      return String(min);
    }
    if (isNumber2(max) === false) {
      throw new TypeError("toRegexRange: expected the second argument to be a number.");
    }
    let opts = { relaxZeros: true, ...options };
    if (typeof opts.strictZeros === "boolean") {
      opts.relaxZeros = opts.strictZeros === false;
    }
    let relax = String(opts.relaxZeros);
    let shorthand = String(opts.shorthand);
    let capture = String(opts.capture);
    let wrap = String(opts.wrap);
    let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
    if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
      return toRegexRange.cache[cacheKey].result;
    }
    let a = Math.min(min, max);
    let b = Math.max(min, max);
    if (Math.abs(a - b) === 1) {
      let result = min + "|" + max;
      if (opts.capture) {
        return `(${result})`;
      }
      if (opts.wrap === false) {
        return result;
      }
      return `(?:${result})`;
    }
    let isPadded = hasPadding(min) || hasPadding(max);
    let state = { min, max, a, b };
    let positives = [];
    let negatives = [];
    if (isPadded) {
      state.isPadded = isPadded;
      state.maxLen = String(state.max).length;
    }
    if (a < 0) {
      let newMin = b < 0 ? Math.abs(b) : 1;
      negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
      a = state.a = 0;
    }
    if (b >= 0) {
      positives = splitToPatterns(a, b, state, opts);
    }
    state.negatives = negatives;
    state.positives = positives;
    state.result = collatePatterns(negatives, positives);
    if (opts.capture === true) {
      state.result = `(${state.result})`;
    } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
      state.result = `(?:${state.result})`;
    }
    toRegexRange.cache[cacheKey] = state;
    return state.result;
  };
  function collatePatterns(neg, pos, options) {
    let onlyNegative = filterPatterns(neg, pos, "-", false) || [];
    let onlyPositive = filterPatterns(pos, neg, "", false) || [];
    let intersected = filterPatterns(neg, pos, "-?", true) || [];
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
    return subpatterns.join("|");
  }
  function splitToRanges(min, max) {
    let nines = 1;
    let zeros = 1;
    let stop = countNines(min, nines);
    let stops = /* @__PURE__ */ new Set([max]);
    while (min <= stop && stop <= max) {
      stops.add(stop);
      nines += 1;
      stop = countNines(min, nines);
    }
    stop = countZeros(max + 1, zeros) - 1;
    while (min < stop && stop <= max) {
      stops.add(stop);
      zeros += 1;
      stop = countZeros(max + 1, zeros) - 1;
    }
    stops = [...stops];
    stops.sort(compare);
    return stops;
  }
  function rangeToPattern(start, stop, options) {
    if (start === stop) {
      return { pattern: start, count: [], digits: 0 };
    }
    let zipped = zip(start, stop);
    let digits = zipped.length;
    let pattern = "";
    let count = 0;
    for (let i = 0; i < digits; i++) {
      let [startDigit, stopDigit] = zipped[i];
      if (startDigit === stopDigit) {
        pattern += startDigit;
      } else if (startDigit !== "0" || stopDigit !== "9") {
        pattern += toCharacterClass(startDigit, stopDigit);
      } else {
        count++;
      }
    }
    if (count) {
      pattern += options.shorthand === true ? "\\d" : "[0-9]";
    }
    return { pattern, count: [count], digits };
  }
  function splitToPatterns(min, max, tok, options) {
    let ranges = splitToRanges(min, max);
    let tokens = [];
    let start = min;
    let prev;
    for (let i = 0; i < ranges.length; i++) {
      let max2 = ranges[i];
      let obj = rangeToPattern(String(start), String(max2), options);
      let zeros = "";
      if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
        if (prev.count.length > 1) {
          prev.count.pop();
        }
        prev.count.push(obj.count[0]);
        prev.string = prev.pattern + toQuantifier(prev.count);
        start = max2 + 1;
        continue;
      }
      if (tok.isPadded) {
        zeros = padZeros(max2, tok, options);
      }
      obj.string = zeros + obj.pattern + toQuantifier(obj.count);
      tokens.push(obj);
      start = max2 + 1;
      prev = obj;
    }
    return tokens;
  }
  function filterPatterns(arr, comparison, prefix, intersection, options) {
    let result = [];
    for (let ele of arr) {
      let { string } = ele;
      if (!intersection && !contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
      if (intersection && contains(comparison, "string", string)) {
        result.push(prefix + string);
      }
    }
    return result;
  }
  function zip(a, b) {
    let arr = [];
    for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
    return arr;
  }
  function compare(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
  }
  function contains(arr, key, val) {
    return arr.some((ele) => ele[key] === val);
  }
  function countNines(min, len) {
    return Number(String(min).slice(0, -len) + "9".repeat(len));
  }
  function countZeros(integer, zeros) {
    return integer - integer % Math.pow(10, zeros);
  }
  function toQuantifier(digits) {
    let [start = 0, stop = ""] = digits;
    if (stop || start > 1) {
      return `{${start + (stop ? "," + stop : "")}}`;
    }
    return "";
  }
  function toCharacterClass(a, b, options) {
    return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
  }
  function hasPadding(str) {
    return /^-?(0+)\d/.test(str);
  }
  function padZeros(value, tok, options) {
    if (!tok.isPadded) {
      return value;
    }
    let diff = Math.abs(tok.maxLen - String(value).length);
    let relax = options.relaxZeros !== false;
    switch (diff) {
      case 0:
        return "";
      case 1:
        return relax ? "0?" : "0";
      case 2:
        return relax ? "0{0,2}" : "00";
      default: {
        return relax ? `0{0,${diff}}` : `0{${diff}}`;
      }
    }
  }
  toRegexRange.cache = {};
  toRegexRange.clearCache = () => toRegexRange.cache = {};
  toRegexRange_1 = toRegexRange;
  return toRegexRange_1;
}
var fillRange;
var hasRequiredFillRange;
function requireFillRange() {
  if (hasRequiredFillRange) return fillRange;
  hasRequiredFillRange = 1;
  const util = import_util.default;
  const toRegexRange = requireToRegexRange();
  const isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
  const transform = (toNumber) => {
    return (value) => toNumber === true ? Number(value) : String(value);
  };
  const isValidValue = (value) => {
    return typeof value === "number" || typeof value === "string" && value !== "";
  };
  const isNumber2 = (num) => Number.isInteger(+num);
  const zeros = (input) => {
    let value = `${input}`;
    let index = -1;
    if (value[0] === "-") value = value.slice(1);
    if (value === "0") return false;
    while (value[++index] === "0") ;
    return index > 0;
  };
  const stringify2 = (start, end, options) => {
    if (typeof start === "string" || typeof end === "string") {
      return true;
    }
    return options.stringify === true;
  };
  const pad = (input, maxLength, toNumber) => {
    if (maxLength > 0) {
      let dash = input[0] === "-" ? "-" : "";
      if (dash) input = input.slice(1);
      input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
    }
    if (toNumber === false) {
      return String(input);
    }
    return input;
  };
  const toMaxLen = (input, maxLength) => {
    let negative = input[0] === "-" ? "-" : "";
    if (negative) {
      input = input.slice(1);
      maxLength--;
    }
    while (input.length < maxLength) input = "0" + input;
    return negative ? "-" + input : input;
  };
  const toSequence = (parts, options, maxLen) => {
    parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    let prefix = options.capture ? "" : "?:";
    let positives = "";
    let negatives = "";
    let result;
    if (parts.positives.length) {
      positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
    }
    if (parts.negatives.length) {
      negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
    }
    if (positives && negatives) {
      result = `${positives}|${negatives}`;
    } else {
      result = positives || negatives;
    }
    if (options.wrap) {
      return `(${prefix}${result})`;
    }
    return result;
  };
  const toRange = (a, b, isNumbers, options) => {
    if (isNumbers) {
      return toRegexRange(a, b, { wrap: false, ...options });
    }
    let start = String.fromCharCode(a);
    if (a === b) return start;
    let stop = String.fromCharCode(b);
    return `[${start}-${stop}]`;
  };
  const toRegex = (start, end, options) => {
    if (Array.isArray(start)) {
      let wrap = options.wrap === true;
      let prefix = options.capture ? "" : "?:";
      return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
    }
    return toRegexRange(start, end, options);
  };
  const rangeError = (...args) => {
    return new RangeError("Invalid range arguments: " + util.inspect(...args));
  };
  const invalidRange = (start, end, options) => {
    if (options.strictRanges === true) throw rangeError([start, end]);
    return [];
  };
  const invalidStep = (step, options) => {
    if (options.strictRanges === true) {
      throw new TypeError(`Expected step "${step}" to be a number`);
    }
    return [];
  };
  const fillNumbers = (start, end, step = 1, options = {}) => {
    let a = Number(start);
    let b = Number(end);
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
      if (options.strictRanges === true) throw rangeError([start, end]);
      return [];
    }
    if (a === 0) a = 0;
    if (b === 0) b = 0;
    let descending = a > b;
    let startString = String(start);
    let endString = String(end);
    let stepString = String(step);
    step = Math.max(Math.abs(step), 1);
    let padded = zeros(startString) || zeros(endString) || zeros(stepString);
    let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
    let toNumber = padded === false && stringify2(start, end, options) === false;
    let format = options.transform || transform(toNumber);
    if (options.toRegex && step === 1) {
      return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
    }
    let parts = { negatives: [], positives: [] };
    let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      if (options.toRegex === true && step > 1) {
        push(a);
      } else {
        range.push(pad(format(a, index), maxLen, toNumber));
      }
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
    }
    return range;
  };
  const fillLetters = (start, end, step = 1, options = {}) => {
    if (!isNumber2(start) && start.length > 1 || !isNumber2(end) && end.length > 1) {
      return invalidRange(start, end, options);
    }
    let format = options.transform || ((val) => String.fromCharCode(val));
    let a = `${start}`.charCodeAt(0);
    let b = `${end}`.charCodeAt(0);
    let descending = a > b;
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (options.toRegex && step === 1) {
      return toRange(min, max, false, options);
    }
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
      range.push(format(a, index));
      a = descending ? a - step : a + step;
      index++;
    }
    if (options.toRegex === true) {
      return toRegex(range, null, { wrap: false, options });
    }
    return range;
  };
  const fill = (start, end, step, options = {}) => {
    if (end == null && isValidValue(start)) {
      return [start];
    }
    if (!isValidValue(start) || !isValidValue(end)) {
      return invalidRange(start, end, options);
    }
    if (typeof step === "function") {
      return fill(start, end, 1, { transform: step });
    }
    if (isObject(step)) {
      return fill(start, end, 0, step);
    }
    let opts = { ...options };
    if (opts.capture === true) opts.wrap = true;
    step = step || opts.step || 1;
    if (!isNumber2(step)) {
      if (step != null && !isObject(step)) return invalidStep(step, opts);
      return fill(start, end, 1, step);
    }
    if (isNumber2(start) && isNumber2(end)) {
      return fillNumbers(start, end, step, opts);
    }
    return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
  };
  fillRange = fill;
  return fillRange;
}
var compile_1;
var hasRequiredCompile;
function requireCompile() {
  if (hasRequiredCompile) return compile_1;
  hasRequiredCompile = 1;
  const fill = requireFillRange();
  const utils2 = requireUtils();
  const compile = (ast, options = {}) => {
    const walk = (node, parent = {}) => {
      const invalidBlock = utils2.isInvalidBrace(parent);
      const invalidNode = node.invalid === true && options.escapeInvalid === true;
      const invalid = invalidBlock === true || invalidNode === true;
      const prefix = options.escapeInvalid === true ? "\\" : "";
      let output = "";
      if (node.isOpen === true) {
        return prefix + node.value;
      }
      if (node.isClose === true) {
        console.log("node.isClose", prefix, node.value);
        return prefix + node.value;
      }
      if (node.type === "open") {
        return invalid ? prefix + node.value : "(";
      }
      if (node.type === "close") {
        return invalid ? prefix + node.value : ")";
      }
      if (node.type === "comma") {
        return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
      }
      if (node.value) {
        return node.value;
      }
      if (node.nodes && node.ranges > 0) {
        const args = utils2.reduce(node.nodes);
        const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
        if (range.length !== 0) {
          return args.length > 1 && range.length > 1 ? `(${range})` : range;
        }
      }
      if (node.nodes) {
        for (const child of node.nodes) {
          output += walk(child, node);
        }
      }
      return output;
    };
    return walk(ast);
  };
  compile_1 = compile;
  return compile_1;
}
var expand_1;
var hasRequiredExpand;
function requireExpand() {
  if (hasRequiredExpand) return expand_1;
  hasRequiredExpand = 1;
  const fill = requireFillRange();
  const stringify2 = requireStringify();
  const utils2 = requireUtils();
  const append = (queue = "", stash = "", enclose = false) => {
    const result = [];
    queue = [].concat(queue);
    stash = [].concat(stash);
    if (!stash.length) return queue;
    if (!queue.length) {
      return enclose ? utils2.flatten(stash).map((ele) => `{${ele}}`) : stash;
    }
    for (const item of queue) {
      if (Array.isArray(item)) {
        for (const value of item) {
          result.push(append(value, stash, enclose));
        }
      } else {
        for (let ele of stash) {
          if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
          result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
        }
      }
    }
    return utils2.flatten(result);
  };
  const expand = (ast, options = {}) => {
    const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
    const walk = (node, parent = {}) => {
      node.queue = [];
      let p = parent;
      let q = parent.queue;
      while (p.type !== "brace" && p.type !== "root" && p.parent) {
        p = p.parent;
        q = p.queue;
      }
      if (node.invalid || node.dollar) {
        q.push(append(q.pop(), stringify2(node, options)));
        return;
      }
      if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
        q.push(append(q.pop(), ["{}"]));
        return;
      }
      if (node.nodes && node.ranges > 0) {
        const args = utils2.reduce(node.nodes);
        if (utils2.exceedsLimit(...args, options.step, rangeLimit)) {
          throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
        }
        let range = fill(...args, options);
        if (range.length === 0) {
          range = stringify2(node, options);
        }
        q.push(append(q.pop(), range));
        node.nodes = [];
        return;
      }
      const enclose = utils2.encloseBrace(node);
      let queue = node.queue;
      let block = node;
      while (block.type !== "brace" && block.type !== "root" && block.parent) {
        block = block.parent;
        queue = block.queue;
      }
      for (let i = 0; i < node.nodes.length; i++) {
        const child = node.nodes[i];
        if (child.type === "comma" && node.type === "brace") {
          if (i === 1) queue.push("");
          queue.push("");
          continue;
        }
        if (child.type === "close") {
          q.push(append(q.pop(), queue, enclose));
          continue;
        }
        if (child.value && child.type !== "open") {
          queue.push(append(queue.pop(), child.value));
          continue;
        }
        if (child.nodes) {
          walk(child, node);
        }
      }
      return queue;
    };
    return utils2.flatten(walk(ast));
  };
  expand_1 = expand;
  return expand_1;
}
var constants$1;
var hasRequiredConstants$1;
function requireConstants$1() {
  if (hasRequiredConstants$1) return constants$1;
  hasRequiredConstants$1 = 1;
  constants$1 = {
    MAX_LENGTH: 1e4,
    // Digits
    CHAR_0: "0",
    /* 0 */
    CHAR_9: "9",
    /* 9 */
    // Alphabet chars.
    CHAR_UPPERCASE_A: "A",
    /* A */
    CHAR_LOWERCASE_A: "a",
    /* a */
    CHAR_UPPERCASE_Z: "Z",
    /* Z */
    CHAR_LOWERCASE_Z: "z",
    /* z */
    CHAR_LEFT_PARENTHESES: "(",
    /* ( */
    CHAR_RIGHT_PARENTHESES: ")",
    /* ) */
    CHAR_ASTERISK: "*",
    /* * */
    // Non-alphabetic chars.
    CHAR_AMPERSAND: "&",
    /* & */
    CHAR_AT: "@",
    /* @ */
    CHAR_BACKSLASH: "\\",
    /* \ */
    CHAR_BACKTICK: "`",
    /* ` */
    CHAR_CARRIAGE_RETURN: "\r",
    /* \r */
    CHAR_CIRCUMFLEX_ACCENT: "^",
    /* ^ */
    CHAR_COLON: ":",
    /* : */
    CHAR_COMMA: ",",
    /* , */
    CHAR_DOLLAR: "$",
    /* . */
    CHAR_DOT: ".",
    /* . */
    CHAR_DOUBLE_QUOTE: '"',
    /* " */
    CHAR_EQUAL: "=",
    /* = */
    CHAR_EXCLAMATION_MARK: "!",
    /* ! */
    CHAR_FORM_FEED: "\f",
    /* \f */
    CHAR_FORWARD_SLASH: "/",
    /* / */
    CHAR_HASH: "#",
    /* # */
    CHAR_HYPHEN_MINUS: "-",
    /* - */
    CHAR_LEFT_ANGLE_BRACKET: "<",
    /* < */
    CHAR_LEFT_CURLY_BRACE: "{",
    /* { */
    CHAR_LEFT_SQUARE_BRACKET: "[",
    /* [ */
    CHAR_LINE_FEED: "\n",
    /* \n */
    CHAR_NO_BREAK_SPACE: " ",
    /* \u00A0 */
    CHAR_PERCENT: "%",
    /* % */
    CHAR_PLUS: "+",
    /* + */
    CHAR_QUESTION_MARK: "?",
    /* ? */
    CHAR_RIGHT_ANGLE_BRACKET: ">",
    /* > */
    CHAR_RIGHT_CURLY_BRACE: "}",
    /* } */
    CHAR_RIGHT_SQUARE_BRACKET: "]",
    /* ] */
    CHAR_SEMICOLON: ";",
    /* ; */
    CHAR_SINGLE_QUOTE: "'",
    /* ' */
    CHAR_SPACE: " ",
    /*   */
    CHAR_TAB: "	",
    /* \t */
    CHAR_UNDERSCORE: "_",
    /* _ */
    CHAR_VERTICAL_LINE: "|",
    /* | */
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
    /* \uFEFF */
  };
  return constants$1;
}
var parse_1;
var hasRequiredParse;
function requireParse() {
  if (hasRequiredParse) return parse_1;
  hasRequiredParse = 1;
  const stringify2 = requireStringify();
  const {
    MAX_LENGTH,
    CHAR_BACKSLASH,
    /* \ */
    CHAR_BACKTICK,
    /* ` */
    CHAR_COMMA,
    /* , */
    CHAR_DOT,
    /* . */
    CHAR_LEFT_PARENTHESES,
    /* ( */
    CHAR_RIGHT_PARENTHESES,
    /* ) */
    CHAR_LEFT_CURLY_BRACE,
    /* { */
    CHAR_RIGHT_CURLY_BRACE,
    /* } */
    CHAR_LEFT_SQUARE_BRACKET,
    /* [ */
    CHAR_RIGHT_SQUARE_BRACKET,
    /* ] */
    CHAR_DOUBLE_QUOTE,
    /* " */
    CHAR_SINGLE_QUOTE,
    /* ' */
    CHAR_NO_BREAK_SPACE,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE
  } = requireConstants$1();
  const parse = (input, options = {}) => {
    if (typeof input !== "string") {
      throw new TypeError("Expected a string");
    }
    const opts = options || {};
    const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    if (input.length > max) {
      throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
    }
    const ast = { type: "root", input, nodes: [] };
    const stack = [ast];
    let block = ast;
    let prev = ast;
    let brackets = 0;
    const length = input.length;
    let index = 0;
    let depth = 0;
    let value;
    const advance = () => input[index++];
    const push = (node) => {
      if (node.type === "text" && prev.type === "dot") {
        prev.type = "text";
      }
      if (prev && prev.type === "text" && node.type === "text") {
        prev.value += node.value;
        return;
      }
      block.nodes.push(node);
      node.parent = block;
      node.prev = prev;
      prev = node;
      return node;
    };
    push({ type: "bos" });
    while (index < length) {
      block = stack[stack.length - 1];
      value = advance();
      if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
        continue;
      }
      if (value === CHAR_BACKSLASH) {
        push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
        continue;
      }
      if (value === CHAR_RIGHT_SQUARE_BRACKET) {
        push({ type: "text", value: "\\" + value });
        continue;
      }
      if (value === CHAR_LEFT_SQUARE_BRACKET) {
        brackets++;
        let next;
        while (index < length && (next = advance())) {
          value += next;
          if (next === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            continue;
          }
          if (next === CHAR_BACKSLASH) {
            value += advance();
            continue;
          }
          if (next === CHAR_RIGHT_SQUARE_BRACKET) {
            brackets--;
            if (brackets === 0) {
              break;
            }
          }
        }
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_LEFT_PARENTHESES) {
        block = push({ type: "paren", nodes: [] });
        stack.push(block);
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_RIGHT_PARENTHESES) {
        if (block.type !== "paren") {
          push({ type: "text", value });
          continue;
        }
        block = stack.pop();
        push({ type: "text", value });
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
        const open = value;
        let next;
        if (options.keepQuotes !== true) {
          value = "";
        }
        while (index < length && (next = advance())) {
          if (next === CHAR_BACKSLASH) {
            value += next + advance();
            continue;
          }
          if (next === open) {
            if (options.keepQuotes === true) value += next;
            break;
          }
          value += next;
        }
        push({ type: "text", value });
        continue;
      }
      if (value === CHAR_LEFT_CURLY_BRACE) {
        depth++;
        const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
        const brace = {
          type: "brace",
          open: true,
          close: false,
          dollar,
          depth,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        block = push(brace);
        stack.push(block);
        push({ type: "open", value });
        continue;
      }
      if (value === CHAR_RIGHT_CURLY_BRACE) {
        if (block.type !== "brace") {
          push({ type: "text", value });
          continue;
        }
        const type = "close";
        block = stack.pop();
        block.close = true;
        push({ type, value });
        depth--;
        block = stack[stack.length - 1];
        continue;
      }
      if (value === CHAR_COMMA && depth > 0) {
        if (block.ranges > 0) {
          block.ranges = 0;
          const open = block.nodes.shift();
          block.nodes = [open, { type: "text", value: stringify2(block) }];
        }
        push({ type: "comma", value });
        block.commas++;
        continue;
      }
      if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
        const siblings = block.nodes;
        if (depth === 0 || siblings.length === 0) {
          push({ type: "text", value });
          continue;
        }
        if (prev.type === "dot") {
          block.range = [];
          prev.value += value;
          prev.type = "range";
          if (block.nodes.length !== 3 && block.nodes.length !== 5) {
            block.invalid = true;
            block.ranges = 0;
            prev.type = "text";
            continue;
          }
          block.ranges++;
          block.args = [];
          continue;
        }
        if (prev.type === "range") {
          siblings.pop();
          const before = siblings[siblings.length - 1];
          before.value += prev.value + value;
          prev = before;
          block.ranges--;
          continue;
        }
        push({ type: "dot", value });
        continue;
      }
      push({ type: "text", value });
    }
    do {
      block = stack.pop();
      if (block.type !== "root") {
        block.nodes.forEach((node) => {
          if (!node.nodes) {
            if (node.type === "open") node.isOpen = true;
            if (node.type === "close") node.isClose = true;
            if (!node.nodes) node.type = "text";
            node.invalid = true;
          }
        });
        const parent = stack[stack.length - 1];
        const index2 = parent.nodes.indexOf(block);
        parent.nodes.splice(index2, 1, ...block.nodes);
      }
    } while (stack.length > 0);
    push({ type: "eos" });
    return ast;
  };
  parse_1 = parse;
  return parse_1;
}
var braces_1;
var hasRequiredBraces;
function requireBraces() {
  if (hasRequiredBraces) return braces_1;
  hasRequiredBraces = 1;
  const stringify2 = requireStringify();
  const compile = requireCompile();
  const expand = requireExpand();
  const parse = requireParse();
  const braces = (input, options = {}) => {
    let output = [];
    if (Array.isArray(input)) {
      for (const pattern of input) {
        const result = braces.create(pattern, options);
        if (Array.isArray(result)) {
          output.push(...result);
        } else {
          output.push(result);
        }
      }
    } else {
      output = [].concat(braces.create(input, options));
    }
    if (options && options.expand === true && options.nodupes === true) {
      output = [...new Set(output)];
    }
    return output;
  };
  braces.parse = (input, options = {}) => parse(input, options);
  braces.stringify = (input, options = {}) => {
    if (typeof input === "string") {
      return stringify2(braces.parse(input, options), options);
    }
    return stringify2(input, options);
  };
  braces.compile = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    return compile(input, options);
  };
  braces.expand = (input, options = {}) => {
    if (typeof input === "string") {
      input = braces.parse(input, options);
    }
    let result = expand(input, options);
    if (options.noempty === true) {
      result = result.filter(Boolean);
    }
    if (options.nodupes === true) {
      result = [...new Set(result)];
    }
    return result;
  };
  braces.create = (input, options = {}) => {
    if (input === "" || input.length < 3) {
      return [input];
    }
    return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
  };
  braces_1 = braces;
  return braces_1;
}
var require$$0 = [
  "3dm",
  "3ds",
  "3g2",
  "3gp",
  "7z",
  "a",
  "aac",
  "adp",
  "afdesign",
  "afphoto",
  "afpub",
  "ai",
  "aif",
  "aiff",
  "alz",
  "ape",
  "apk",
  "appimage",
  "ar",
  "arj",
  "asf",
  "au",
  "avi",
  "bak",
  "baml",
  "bh",
  "bin",
  "bk",
  "bmp",
  "btif",
  "bz2",
  "bzip2",
  "cab",
  "caf",
  "cgm",
  "class",
  "cmx",
  "cpio",
  "cr2",
  "cur",
  "dat",
  "dcm",
  "deb",
  "dex",
  "djvu",
  "dll",
  "dmg",
  "dng",
  "doc",
  "docm",
  "docx",
  "dot",
  "dotm",
  "dra",
  "DS_Store",
  "dsk",
  "dts",
  "dtshd",
  "dvb",
  "dwg",
  "dxf",
  "ecelp4800",
  "ecelp7470",
  "ecelp9600",
  "egg",
  "eol",
  "eot",
  "epub",
  "exe",
  "f4v",
  "fbs",
  "fh",
  "fla",
  "flac",
  "flatpak",
  "fli",
  "flv",
  "fpx",
  "fst",
  "fvt",
  "g3",
  "gh",
  "gif",
  "graffle",
  "gz",
  "gzip",
  "h261",
  "h263",
  "h264",
  "icns",
  "ico",
  "ief",
  "img",
  "ipa",
  "iso",
  "jar",
  "jpeg",
  "jpg",
  "jpgv",
  "jpm",
  "jxr",
  "key",
  "ktx",
  "lha",
  "lib",
  "lvp",
  "lz",
  "lzh",
  "lzma",
  "lzo",
  "m3u",
  "m4a",
  "m4v",
  "mar",
  "mdi",
  "mht",
  "mid",
  "midi",
  "mj2",
  "mka",
  "mkv",
  "mmr",
  "mng",
  "mobi",
  "mov",
  "movie",
  "mp3",
  "mp4",
  "mp4a",
  "mpeg",
  "mpg",
  "mpga",
  "mxu",
  "nef",
  "npx",
  "numbers",
  "nupkg",
  "o",
  "odp",
  "ods",
  "odt",
  "oga",
  "ogg",
  "ogv",
  "otf",
  "ott",
  "pages",
  "pbm",
  "pcx",
  "pdb",
  "pdf",
  "pea",
  "pgm",
  "pic",
  "png",
  "pnm",
  "pot",
  "potm",
  "potx",
  "ppa",
  "ppam",
  "ppm",
  "pps",
  "ppsm",
  "ppsx",
  "ppt",
  "pptm",
  "pptx",
  "psd",
  "pya",
  "pyc",
  "pyo",
  "pyv",
  "qt",
  "rar",
  "ras",
  "raw",
  "resources",
  "rgb",
  "rip",
  "rlc",
  "rmf",
  "rmvb",
  "rpm",
  "rtf",
  "rz",
  "s3m",
  "s7z",
  "scpt",
  "sgi",
  "shar",
  "snap",
  "sil",
  "sketch",
  "slk",
  "smv",
  "snk",
  "so",
  "stl",
  "suo",
  "sub",
  "swf",
  "tar",
  "tbz",
  "tbz2",
  "tga",
  "tgz",
  "thmx",
  "tif",
  "tiff",
  "tlz",
  "ttc",
  "ttf",
  "txz",
  "udf",
  "uvh",
  "uvi",
  "uvm",
  "uvp",
  "uvs",
  "uvu",
  "viv",
  "vob",
  "war",
  "wav",
  "wax",
  "wbmp",
  "wdp",
  "weba",
  "webm",
  "webp",
  "whl",
  "wim",
  "wm",
  "wma",
  "wmv",
  "wmx",
  "woff",
  "woff2",
  "wrm",
  "wvx",
  "xbm",
  "xif",
  "xla",
  "xlam",
  "xls",
  "xlsb",
  "xlsm",
  "xlsx",
  "xlt",
  "xltm",
  "xltx",
  "xm",
  "xmind",
  "xpi",
  "xpm",
  "xwd",
  "xz",
  "z",
  "zip",
  "zipx"
];
var binaryExtensions;
var hasRequiredBinaryExtensions;
function requireBinaryExtensions() {
  if (hasRequiredBinaryExtensions) return binaryExtensions;
  hasRequiredBinaryExtensions = 1;
  binaryExtensions = require$$0;
  return binaryExtensions;
}
var isBinaryPath;
var hasRequiredIsBinaryPath;
function requireIsBinaryPath() {
  if (hasRequiredIsBinaryPath) return isBinaryPath;
  hasRequiredIsBinaryPath = 1;
  const path2 = import_path.default;
  const binaryExtensions2 = requireBinaryExtensions();
  const extensions = new Set(binaryExtensions2);
  isBinaryPath = (filePath) => extensions.has(path2.extname(filePath).slice(1).toLowerCase());
  return isBinaryPath;
}
var constants = {};
var hasRequiredConstants;
function requireConstants() {
  if (hasRequiredConstants) return constants;
  hasRequiredConstants = 1;
  (function(exports) {
    const { sep } = import_path.default;
    const { platform: platform2 } = process;
    const os = import_os.default;
    exports.EV_ALL = "all";
    exports.EV_READY = "ready";
    exports.EV_ADD = "add";
    exports.EV_CHANGE = "change";
    exports.EV_ADD_DIR = "addDir";
    exports.EV_UNLINK = "unlink";
    exports.EV_UNLINK_DIR = "unlinkDir";
    exports.EV_RAW = "raw";
    exports.EV_ERROR = "error";
    exports.STR_DATA = "data";
    exports.STR_END = "end";
    exports.STR_CLOSE = "close";
    exports.FSEVENT_CREATED = "created";
    exports.FSEVENT_MODIFIED = "modified";
    exports.FSEVENT_DELETED = "deleted";
    exports.FSEVENT_MOVED = "moved";
    exports.FSEVENT_CLONED = "cloned";
    exports.FSEVENT_UNKNOWN = "unknown";
    exports.FSEVENT_FLAG_MUST_SCAN_SUBDIRS = 1;
    exports.FSEVENT_TYPE_FILE = "file";
    exports.FSEVENT_TYPE_DIRECTORY = "directory";
    exports.FSEVENT_TYPE_SYMLINK = "symlink";
    exports.KEY_LISTENERS = "listeners";
    exports.KEY_ERR = "errHandlers";
    exports.KEY_RAW = "rawEmitters";
    exports.HANDLER_KEYS = [exports.KEY_LISTENERS, exports.KEY_ERR, exports.KEY_RAW];
    exports.DOT_SLASH = `.${sep}`;
    exports.BACK_SLASH_RE = /\\/g;
    exports.DOUBLE_SLASH_RE = /\/\//;
    exports.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
    exports.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
    exports.REPLACER_RE = /^\.[/\\]/;
    exports.SLASH = "/";
    exports.SLASH_SLASH = "//";
    exports.BRACE_START = "{";
    exports.BANG = "!";
    exports.ONE_DOT = ".";
    exports.TWO_DOTS = "..";
    exports.STAR = "*";
    exports.GLOBSTAR = "**";
    exports.ROOT_GLOBSTAR = "/**/*";
    exports.SLASH_GLOBSTAR = "/**";
    exports.DIR_SUFFIX = "Dir";
    exports.ANYMATCH_OPTS = { dot: true };
    exports.STRING_TYPE = "string";
    exports.FUNCTION_TYPE = "function";
    exports.EMPTY_STR = "";
    exports.EMPTY_FN = () => {
    };
    exports.IDENTITY_FN = (val) => val;
    exports.isWindows = platform2 === "win32";
    exports.isMacos = platform2 === "darwin";
    exports.isLinux = platform2 === "linux";
    exports.isIBMi = os.type() === "OS400";
  })(constants);
  return constants;
}
var nodefsHandler;
var hasRequiredNodefsHandler;
function requireNodefsHandler() {
  if (hasRequiredNodefsHandler) return nodefsHandler;
  hasRequiredNodefsHandler = 1;
  const fs = import_fs.default;
  const sysPath = import_path.default;
  const { promisify } = import_util.default;
  const isBinaryPath2 = requireIsBinaryPath();
  const {
    isWindows,
    isLinux,
    EMPTY_FN,
    EMPTY_STR,
    KEY_LISTENERS,
    KEY_ERR,
    KEY_RAW,
    HANDLER_KEYS,
    EV_CHANGE,
    EV_ADD,
    EV_ADD_DIR,
    EV_ERROR,
    STR_DATA,
    STR_END,
    BRACE_START,
    STAR
  } = requireConstants();
  const THROTTLE_MODE_WATCH = "watch";
  const open = promisify(fs.open);
  const stat = promisify(fs.stat);
  const lstat = promisify(fs.lstat);
  const close = promisify(fs.close);
  const fsrealpath = promisify(fs.realpath);
  const statMethods = { lstat, stat };
  const foreach = (val, fn) => {
    if (val instanceof Set) {
      val.forEach(fn);
    } else {
      fn(val);
    }
  };
  const addAndConvert = (main, prop, item) => {
    let container = main[prop];
    if (!(container instanceof Set)) {
      main[prop] = container = /* @__PURE__ */ new Set([container]);
    }
    container.add(item);
  };
  const clearItem = (cont) => (key) => {
    const set = cont[key];
    if (set instanceof Set) {
      set.clear();
    } else {
      delete cont[key];
    }
  };
  const delFromSet = (main, prop, item) => {
    const container = main[prop];
    if (container instanceof Set) {
      container.delete(item);
    } else if (container === item) {
      delete main[prop];
    }
  };
  const isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
  const FsWatchInstances = /* @__PURE__ */ new Map();
  function createFsWatchInstance(path2, options, listener, errHandler, emitRaw) {
    const handleEvent = (rawEvent, evPath) => {
      listener(path2);
      emitRaw(rawEvent, evPath, { watchedPath: path2 });
      if (evPath && path2 !== evPath) {
        fsWatchBroadcast(
          sysPath.resolve(path2, evPath),
          KEY_LISTENERS,
          sysPath.join(path2, evPath)
        );
      }
    };
    try {
      return fs.watch(path2, options, handleEvent);
    } catch (error) {
      errHandler(error);
    }
  }
  const fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
    const cont = FsWatchInstances.get(fullPath);
    if (!cont) return;
    foreach(cont[type], (listener) => {
      listener(val1, val2, val3);
    });
  };
  const setFsWatchListener = (path2, fullPath, options, handlers) => {
    const { listener, errHandler, rawEmitter } = handlers;
    let cont = FsWatchInstances.get(fullPath);
    let watcher;
    if (!options.persistent) {
      watcher = createFsWatchInstance(
        path2,
        options,
        listener,
        errHandler,
        rawEmitter
      );
      return watcher.close.bind(watcher);
    }
    if (cont) {
      addAndConvert(cont, KEY_LISTENERS, listener);
      addAndConvert(cont, KEY_ERR, errHandler);
      addAndConvert(cont, KEY_RAW, rawEmitter);
    } else {
      watcher = createFsWatchInstance(
        path2,
        options,
        fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
        errHandler,
        // no need to use broadcast here
        fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
      );
      if (!watcher) return;
      watcher.on(EV_ERROR, async (error) => {
        const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
        cont.watcherUnusable = true;
        if (isWindows && error.code === "EPERM") {
          try {
            const fd = await open(path2, "r");
            await close(fd);
            broadcastErr(error);
          } catch (err) {
          }
        } else {
          broadcastErr(error);
        }
      });
      cont = {
        listeners: listener,
        errHandlers: errHandler,
        rawEmitters: rawEmitter,
        watcher
      };
      FsWatchInstances.set(fullPath, cont);
    }
    return () => {
      delFromSet(cont, KEY_LISTENERS, listener);
      delFromSet(cont, KEY_ERR, errHandler);
      delFromSet(cont, KEY_RAW, rawEmitter);
      if (isEmptySet(cont.listeners)) {
        cont.watcher.close();
        FsWatchInstances.delete(fullPath);
        HANDLER_KEYS.forEach(clearItem(cont));
        cont.watcher = void 0;
        Object.freeze(cont);
      }
    };
  };
  const FsWatchFileInstances = /* @__PURE__ */ new Map();
  const setFsWatchFileListener = (path2, fullPath, options, handlers) => {
    const { listener, rawEmitter } = handlers;
    let cont = FsWatchFileInstances.get(fullPath);
    const copts = cont && cont.options;
    if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
      fs.unwatchFile(fullPath);
      cont = void 0;
    }
    if (cont) {
      addAndConvert(cont, KEY_LISTENERS, listener);
      addAndConvert(cont, KEY_RAW, rawEmitter);
    } else {
      cont = {
        listeners: listener,
        rawEmitters: rawEmitter,
        options,
        watcher: fs.watchFile(fullPath, options, (curr, prev) => {
          foreach(cont.rawEmitters, (rawEmitter2) => {
            rawEmitter2(EV_CHANGE, fullPath, { curr, prev });
          });
          const currmtime = curr.mtimeMs;
          if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
            foreach(cont.listeners, (listener2) => listener2(path2, curr));
          }
        })
      };
      FsWatchFileInstances.set(fullPath, cont);
    }
    return () => {
      delFromSet(cont, KEY_LISTENERS, listener);
      delFromSet(cont, KEY_RAW, rawEmitter);
      if (isEmptySet(cont.listeners)) {
        FsWatchFileInstances.delete(fullPath);
        fs.unwatchFile(fullPath);
        cont.options = cont.watcher = void 0;
        Object.freeze(cont);
      }
    };
  };
  class NodeFsHandler {
    /**
     * @param {import("../index").FSWatcher} fsW
     */
    constructor(fsW) {
      this.fsw = fsW;
      this._boundHandleError = (error) => fsW._handleError(error);
    }
    /**
     * Watch file for changes with fs_watchFile or fs_watch.
     * @param {String} path to file or dir
     * @param {Function} listener on fs change
     * @returns {Function} closer for the watcher instance
     */
    _watchWithNodeFs(path2, listener) {
      const opts = this.fsw.options;
      const directory = sysPath.dirname(path2);
      const basename = sysPath.basename(path2);
      const parent = this.fsw._getWatchedDir(directory);
      parent.add(basename);
      const absolutePath = sysPath.resolve(path2);
      const options = { persistent: opts.persistent };
      if (!listener) listener = EMPTY_FN;
      let closer;
      if (opts.usePolling) {
        options.interval = opts.enableBinaryInterval && isBinaryPath2(basename) ? opts.binaryInterval : opts.interval;
        closer = setFsWatchFileListener(path2, absolutePath, options, {
          listener,
          rawEmitter: this.fsw._emitRaw
        });
      } else {
        closer = setFsWatchListener(path2, absolutePath, options, {
          listener,
          errHandler: this._boundHandleError,
          rawEmitter: this.fsw._emitRaw
        });
      }
      return closer;
    }
    /**
     * Watch a file and emit add event if warranted.
     * @param {Path} file Path
     * @param {fs.Stats} stats result of fs_stat
     * @param {Boolean} initialAdd was the file added at watch instantiation?
     * @returns {Function} closer for the watcher instance
     */
    _handleFile(file, stats, initialAdd) {
      if (this.fsw.closed) {
        return;
      }
      const dirname = sysPath.dirname(file);
      const basename = sysPath.basename(file);
      const parent = this.fsw._getWatchedDir(dirname);
      let prevStats = stats;
      if (parent.has(basename)) return;
      const listener = async (path2, newStats) => {
        if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5)) return;
        if (!newStats || newStats.mtimeMs === 0) {
          try {
            const newStats2 = await stat(file);
            if (this.fsw.closed) return;
            const at = newStats2.atimeMs;
            const mt = newStats2.mtimeMs;
            if (!at || at <= mt || mt !== prevStats.mtimeMs) {
              this.fsw._emit(EV_CHANGE, file, newStats2);
            }
            if (isLinux && prevStats.ino !== newStats2.ino) {
              this.fsw._closeFile(path2);
              prevStats = newStats2;
              this.fsw._addPathCloser(path2, this._watchWithNodeFs(file, listener));
            } else {
              prevStats = newStats2;
            }
          } catch (error) {
            this.fsw._remove(dirname, basename);
          }
        } else if (parent.has(basename)) {
          const at = newStats.atimeMs;
          const mt = newStats.mtimeMs;
          if (!at || at <= mt || mt !== prevStats.mtimeMs) {
            this.fsw._emit(EV_CHANGE, file, newStats);
          }
          prevStats = newStats;
        }
      };
      const closer = this._watchWithNodeFs(file, listener);
      if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
        if (!this.fsw._throttle(EV_ADD, file, 0)) return;
        this.fsw._emit(EV_ADD, file, stats);
      }
      return closer;
    }
    /**
     * Handle symlinks encountered while reading a dir.
     * @param {Object} entry returned by readdirp
     * @param {String} directory path of dir being read
     * @param {String} path of this item
     * @param {String} item basename of this item
     * @returns {Promise<Boolean>} true if no more processing is needed for this entry.
     */
    async _handleSymlink(entry, directory, path2, item) {
      if (this.fsw.closed) {
        return;
      }
      const full = entry.fullPath;
      const dir = this.fsw._getWatchedDir(directory);
      if (!this.fsw.options.followSymlinks) {
        this.fsw._incrReadyCount();
        let linkPath;
        try {
          linkPath = await fsrealpath(path2);
        } catch (e) {
          this.fsw._emitReady();
          return true;
        }
        if (this.fsw.closed) return;
        if (dir.has(item)) {
          if (this.fsw._symlinkPaths.get(full) !== linkPath) {
            this.fsw._symlinkPaths.set(full, linkPath);
            this.fsw._emit(EV_CHANGE, path2, entry.stats);
          }
        } else {
          dir.add(item);
          this.fsw._symlinkPaths.set(full, linkPath);
          this.fsw._emit(EV_ADD, path2, entry.stats);
        }
        this.fsw._emitReady();
        return true;
      }
      if (this.fsw._symlinkPaths.has(full)) {
        return true;
      }
      this.fsw._symlinkPaths.set(full, true);
    }
    _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
      directory = sysPath.join(directory, EMPTY_STR);
      if (!wh.hasGlob) {
        throttler = this.fsw._throttle("readdir", directory, 1e3);
        if (!throttler) return;
      }
      const previous = this.fsw._getWatchedDir(wh.path);
      const current = /* @__PURE__ */ new Set();
      let stream = this.fsw._readdirp(directory, {
        fileFilter: (entry) => wh.filterPath(entry),
        directoryFilter: (entry) => wh.filterDir(entry),
        depth: 0
      }).on(STR_DATA, async (entry) => {
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        const item = entry.path;
        let path2 = sysPath.join(directory, item);
        current.add(item);
        if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path2, item)) {
          return;
        }
        if (this.fsw.closed) {
          stream = void 0;
          return;
        }
        if (item === target || !target && !previous.has(item)) {
          this.fsw._incrReadyCount();
          path2 = sysPath.join(dir, sysPath.relative(dir, path2));
          this._addToNodeFs(path2, initialAdd, wh, depth + 1);
        }
      }).on(EV_ERROR, this._boundHandleError);
      return new Promise(
        (resolve) => stream.once(STR_END, () => {
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          const wasThrottled = throttler ? throttler.clear() : false;
          resolve();
          previous.getChildren().filter((item) => {
            return item !== directory && !current.has(item) && // in case of intersecting globs;
            // a path may have been filtered out of this readdir, but
            // shouldn't be removed because it matches a different glob
            (!wh.hasGlob || wh.filterPath({
              fullPath: sysPath.resolve(directory, item)
            }));
          }).forEach((item) => {
            this.fsw._remove(directory, item);
          });
          stream = void 0;
          if (wasThrottled) this._handleRead(directory, false, wh, target, dir, depth, throttler);
        })
      );
    }
    /**
     * Read directory to add / remove files from `@watched` list and re-read it on change.
     * @param {String} dir fs path
     * @param {fs.Stats} stats
     * @param {Boolean} initialAdd
     * @param {Number} depth relative to user-supplied path
     * @param {String} target child path targeted for watch
     * @param {Object} wh Common watch helpers for this path
     * @param {String} realpath
     * @returns {Promise<Function>} closer for the watcher instance.
     */
    async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath) {
      const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
      const tracked = parentDir.has(sysPath.basename(dir));
      if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
        if (!wh.hasGlob || wh.globFilter(dir)) this.fsw._emit(EV_ADD_DIR, dir, stats);
      }
      parentDir.add(sysPath.basename(dir));
      this.fsw._getWatchedDir(dir);
      let throttler;
      let closer;
      const oDepth = this.fsw.options.depth;
      if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath)) {
        if (!target) {
          await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
          if (this.fsw.closed) return;
        }
        closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
          if (stats2 && stats2.mtimeMs === 0) return;
          this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
        });
      }
      return closer;
    }
    /**
     * Handle added file, directory, or glob pattern.
     * Delegates call to _handleFile / _handleDir after checks.
     * @param {String} path to file or ir
     * @param {Boolean} initialAdd was the file added at watch instantiation?
     * @param {Object} priorWh depth relative to user-supplied path
     * @param {Number} depth Child path actually targeted for watch
     * @param {String=} target Child path actually targeted for watch
     * @returns {Promise}
     */
    async _addToNodeFs(path2, initialAdd, priorWh, depth, target) {
      const ready = this.fsw._emitReady;
      if (this.fsw._isIgnored(path2) || this.fsw.closed) {
        ready();
        return false;
      }
      const wh = this.fsw._getWatchHelpers(path2, depth);
      if (!wh.hasGlob && priorWh) {
        wh.hasGlob = priorWh.hasGlob;
        wh.globFilter = priorWh.globFilter;
        wh.filterPath = (entry) => priorWh.filterPath(entry);
        wh.filterDir = (entry) => priorWh.filterDir(entry);
      }
      try {
        const stats = await statMethods[wh.statMethod](wh.watchPath);
        if (this.fsw.closed) return;
        if (this.fsw._isIgnored(wh.watchPath, stats)) {
          ready();
          return false;
        }
        const follow = this.fsw.options.followSymlinks && !path2.includes(STAR) && !path2.includes(BRACE_START);
        let closer;
        if (stats.isDirectory()) {
          const absPath = sysPath.resolve(path2);
          const targetPath = follow ? await fsrealpath(path2) : path2;
          if (this.fsw.closed) return;
          closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
          if (this.fsw.closed) return;
          if (absPath !== targetPath && targetPath !== void 0) {
            this.fsw._symlinkPaths.set(absPath, targetPath);
          }
        } else if (stats.isSymbolicLink()) {
          const targetPath = follow ? await fsrealpath(path2) : path2;
          if (this.fsw.closed) return;
          const parent = sysPath.dirname(wh.watchPath);
          this.fsw._getWatchedDir(parent).add(wh.watchPath);
          this.fsw._emit(EV_ADD, wh.watchPath, stats);
          closer = await this._handleDir(parent, stats, initialAdd, depth, path2, wh, targetPath);
          if (this.fsw.closed) return;
          if (targetPath !== void 0) {
            this.fsw._symlinkPaths.set(sysPath.resolve(path2), targetPath);
          }
        } else {
          closer = this._handleFile(wh.watchPath, stats, initialAdd);
        }
        ready();
        this.fsw._addPathCloser(path2, closer);
        return false;
      } catch (error) {
        if (this.fsw._handleError(error)) {
          ready();
          return path2;
        }
      }
    }
  }
  nodefsHandler = NodeFsHandler;
  return nodefsHandler;
}
var fseventsHandler = { exports: {} };
var require$$3 = getAugmentedNamespace(fseventsImporter);
var hasRequiredFseventsHandler;
function requireFseventsHandler() {
  if (hasRequiredFseventsHandler) return fseventsHandler.exports;
  hasRequiredFseventsHandler = 1;
  const fs = import_fs.default;
  const sysPath = import_path.default;
  const { promisify } = import_util.default;
  let fsevents;
  try {
    fsevents = require$$3.getFsEvents();
  } catch (error) {
    if (process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR) console.error(error);
  }
  if (fsevents) {
    const mtch = process.version.match(/v(\d+)\.(\d+)/);
    if (mtch && mtch[1] && mtch[2]) {
      const maj = Number.parseInt(mtch[1], 10);
      const min = Number.parseInt(mtch[2], 10);
      if (maj === 8 && min < 16) {
        fsevents = void 0;
      }
    }
  }
  const {
    EV_ADD,
    EV_CHANGE,
    EV_ADD_DIR,
    EV_UNLINK,
    EV_ERROR,
    STR_DATA,
    STR_END,
    FSEVENT_CREATED,
    FSEVENT_MODIFIED,
    FSEVENT_DELETED,
    FSEVENT_MOVED,
    // FSEVENT_CLONED,
    FSEVENT_UNKNOWN,
    FSEVENT_FLAG_MUST_SCAN_SUBDIRS,
    FSEVENT_TYPE_FILE,
    FSEVENT_TYPE_DIRECTORY,
    FSEVENT_TYPE_SYMLINK,
    ROOT_GLOBSTAR,
    DIR_SUFFIX,
    DOT_SLASH,
    FUNCTION_TYPE,
    EMPTY_FN,
    IDENTITY_FN
  } = requireConstants();
  const Depth = (value) => isNaN(value) ? {} : { depth: value };
  const stat = promisify(fs.stat);
  const lstat = promisify(fs.lstat);
  const realpath = promisify(fs.realpath);
  const statMethods = { stat, lstat };
  const FSEventsWatchers = /* @__PURE__ */ new Map();
  const consolidateThreshhold = 10;
  const wrongEventFlags = /* @__PURE__ */ new Set([
    69888,
    70400,
    71424,
    72704,
    73472,
    131328,
    131840,
    262912
  ]);
  const createFSEventsInstance = (path2, callback) => {
    const stop = fsevents.watch(path2, callback);
    return { stop };
  };
  function setFSEventsListener(path2, realPath, listener, rawEmitter) {
    let watchPath = sysPath.extname(realPath) ? sysPath.dirname(realPath) : realPath;
    const parentPath = sysPath.dirname(watchPath);
    let cont = FSEventsWatchers.get(watchPath);
    if (couldConsolidate(parentPath)) {
      watchPath = parentPath;
    }
    const resolvedPath = sysPath.resolve(path2);
    const hasSymlink = resolvedPath !== realPath;
    const filteredListener = (fullPath, flags, info) => {
      if (hasSymlink) fullPath = fullPath.replace(realPath, resolvedPath);
      if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath.sep)) listener(fullPath, flags, info);
    };
    let watchedParent = false;
    for (const watchedPath of FSEventsWatchers.keys()) {
      if (realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep) === 0) {
        watchPath = watchedPath;
        cont = FSEventsWatchers.get(watchPath);
        watchedParent = true;
        break;
      }
    }
    if (cont || watchedParent) {
      cont.listeners.add(filteredListener);
    } else {
      cont = {
        listeners: /* @__PURE__ */ new Set([filteredListener]),
        rawEmitter,
        watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
          if (!cont.listeners.size) return;
          if (flags & FSEVENT_FLAG_MUST_SCAN_SUBDIRS) return;
          const info = fsevents.getInfo(fullPath, flags);
          cont.listeners.forEach((list) => {
            list(fullPath, flags, info);
          });
          cont.rawEmitter(info.event, fullPath, info);
        })
      };
      FSEventsWatchers.set(watchPath, cont);
    }
    return () => {
      const lst = cont.listeners;
      lst.delete(filteredListener);
      if (!lst.size) {
        FSEventsWatchers.delete(watchPath);
        if (cont.watcher) return cont.watcher.stop().then(() => {
          cont.rawEmitter = cont.watcher = void 0;
          Object.freeze(cont);
        });
      }
    };
  }
  const couldConsolidate = (path2) => {
    let count = 0;
    for (const watchPath of FSEventsWatchers.keys()) {
      if (watchPath.indexOf(path2) === 0) {
        count++;
        if (count >= consolidateThreshhold) {
          return true;
        }
      }
    }
    return false;
  };
  const canUse = () => fsevents && FSEventsWatchers.size < 128;
  const calcDepth = (path2, root) => {
    let i = 0;
    while (!path2.indexOf(root) && (path2 = sysPath.dirname(path2)) !== root) i++;
    return i;
  };
  const sameTypes = (info, stats) => info.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() || info.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() || info.type === FSEVENT_TYPE_FILE && stats.isFile();
  class FsEventsHandler {
    /**
     * @param {import('../index').FSWatcher} fsw
     */
    constructor(fsw) {
      this.fsw = fsw;
    }
    checkIgnored(path2, stats) {
      const ipaths = this.fsw._ignoredPaths;
      if (this.fsw._isIgnored(path2, stats)) {
        ipaths.add(path2);
        if (stats && stats.isDirectory()) {
          ipaths.add(path2 + ROOT_GLOBSTAR);
        }
        return true;
      }
      ipaths.delete(path2);
      ipaths.delete(path2 + ROOT_GLOBSTAR);
    }
    addOrChange(path2, fullPath, realPath, parent, watchedDir, item, info, opts) {
      const event = watchedDir.has(item) ? EV_CHANGE : EV_ADD;
      this.handleEvent(event, path2, fullPath, realPath, parent, watchedDir, item, info, opts);
    }
    async checkExists(path2, fullPath, realPath, parent, watchedDir, item, info, opts) {
      try {
        const stats = await stat(path2);
        if (this.fsw.closed) return;
        if (sameTypes(info, stats)) {
          this.addOrChange(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
        } else {
          this.handleEvent(EV_UNLINK, path2, fullPath, realPath, parent, watchedDir, item, info, opts);
        }
      } catch (error) {
        if (error.code === "EACCES") {
          this.addOrChange(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
        } else {
          this.handleEvent(EV_UNLINK, path2, fullPath, realPath, parent, watchedDir, item, info, opts);
        }
      }
    }
    handleEvent(event, path2, fullPath, realPath, parent, watchedDir, item, info, opts) {
      if (this.fsw.closed || this.checkIgnored(path2)) return;
      if (event === EV_UNLINK) {
        const isDirectory = info.type === FSEVENT_TYPE_DIRECTORY;
        if (isDirectory || watchedDir.has(item)) {
          this.fsw._remove(parent, item, isDirectory);
        }
      } else {
        if (event === EV_ADD) {
          if (info.type === FSEVENT_TYPE_DIRECTORY) this.fsw._getWatchedDir(path2);
          if (info.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
            const curDepth = opts.depth === void 0 ? void 0 : calcDepth(fullPath, realPath) + 1;
            return this._addToFsEvents(path2, false, true, curDepth);
          }
          this.fsw._getWatchedDir(parent).add(item);
        }
        const eventName = info.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
        this.fsw._emit(eventName, path2);
        if (eventName === EV_ADD_DIR) this._addToFsEvents(path2, false, true);
      }
    }
    /**
     * Handle symlinks encountered during directory scan
     * @param {String} watchPath  - file/dir path to be watched with fsevents
     * @param {String} realPath   - real path (in case of symlinks)
     * @param {Function} transform  - path transformer
     * @param {Function} globFilter - path filter in case a glob pattern was provided
     * @returns {Function} closer for the watcher instance
    */
    _watchWithFsEvents(watchPath, realPath, transform, globFilter) {
      if (this.fsw.closed || this.fsw._isIgnored(watchPath)) return;
      const opts = this.fsw.options;
      const watchCallback = async (fullPath, flags, info) => {
        if (this.fsw.closed) return;
        if (opts.depth !== void 0 && calcDepth(fullPath, realPath) > opts.depth) return;
        const path2 = transform(sysPath.join(
          watchPath,
          sysPath.relative(watchPath, fullPath)
        ));
        if (globFilter && !globFilter(path2)) return;
        const parent = sysPath.dirname(path2);
        const item = sysPath.basename(path2);
        const watchedDir = this.fsw._getWatchedDir(
          info.type === FSEVENT_TYPE_DIRECTORY ? path2 : parent
        );
        if (wrongEventFlags.has(flags) || info.event === FSEVENT_UNKNOWN) {
          if (typeof opts.ignored === FUNCTION_TYPE) {
            let stats;
            try {
              stats = await stat(path2);
            } catch (error) {
            }
            if (this.fsw.closed) return;
            if (this.checkIgnored(path2, stats)) return;
            if (sameTypes(info, stats)) {
              this.addOrChange(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
            } else {
              this.handleEvent(EV_UNLINK, path2, fullPath, realPath, parent, watchedDir, item, info, opts);
            }
          } else {
            this.checkExists(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        } else {
          switch (info.event) {
            case FSEVENT_CREATED:
            case FSEVENT_MODIFIED:
              return this.addOrChange(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
            case FSEVENT_DELETED:
            case FSEVENT_MOVED:
              return this.checkExists(path2, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        }
      };
      const closer = setFSEventsListener(
        watchPath,
        realPath,
        watchCallback,
        this.fsw._emitRaw
      );
      this.fsw._emitReady();
      return closer;
    }
    /**
     * Handle symlinks encountered during directory scan
     * @param {String} linkPath path to symlink
     * @param {String} fullPath absolute path to the symlink
     * @param {Function} transform pre-existing path transformer
     * @param {Number} curDepth level of subdirectories traversed to where symlink is
     * @returns {Promise<void>}
     */
    async _handleFsEventsSymlink(linkPath, fullPath, transform, curDepth) {
      if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath)) return;
      this.fsw._symlinkPaths.set(fullPath, true);
      this.fsw._incrReadyCount();
      try {
        const linkTarget = await realpath(linkPath);
        if (this.fsw.closed) return;
        if (this.fsw._isIgnored(linkTarget)) {
          return this.fsw._emitReady();
        }
        this.fsw._incrReadyCount();
        this._addToFsEvents(linkTarget || linkPath, (path2) => {
          let aliasedPath = linkPath;
          if (linkTarget && linkTarget !== DOT_SLASH) {
            aliasedPath = path2.replace(linkTarget, linkPath);
          } else if (path2 !== DOT_SLASH) {
            aliasedPath = sysPath.join(linkPath, path2);
          }
          return transform(aliasedPath);
        }, false, curDepth);
      } catch (error) {
        if (this.fsw._handleError(error)) {
          return this.fsw._emitReady();
        }
      }
    }
    /**
     *
     * @param {Path} newPath
     * @param {fs.Stats} stats
     */
    emitAdd(newPath, stats, processPath, opts, forceAdd) {
      const pp = processPath(newPath);
      const isDir = stats.isDirectory();
      const dirObj = this.fsw._getWatchedDir(sysPath.dirname(pp));
      const base = sysPath.basename(pp);
      if (isDir) this.fsw._getWatchedDir(pp);
      if (dirObj.has(base)) return;
      dirObj.add(base);
      if (!opts.ignoreInitial || forceAdd === true) {
        this.fsw._emit(isDir ? EV_ADD_DIR : EV_ADD, pp, stats);
      }
    }
    initWatch(realPath, path2, wh, processPath) {
      if (this.fsw.closed) return;
      const closer = this._watchWithFsEvents(
        wh.watchPath,
        sysPath.resolve(realPath || wh.watchPath),
        processPath,
        wh.globFilter
      );
      this.fsw._addPathCloser(path2, closer);
    }
    /**
     * Handle added path with fsevents
     * @param {String} path file/dir path or glob pattern
     * @param {Function|Boolean=} transform converts working path to what the user expects
     * @param {Boolean=} forceAdd ensure add is emitted
     * @param {Number=} priorDepth Level of subdirectories already traversed.
     * @returns {Promise<void>}
     */
    async _addToFsEvents(path2, transform, forceAdd, priorDepth) {
      if (this.fsw.closed) {
        return;
      }
      const opts = this.fsw.options;
      const processPath = typeof transform === FUNCTION_TYPE ? transform : IDENTITY_FN;
      const wh = this.fsw._getWatchHelpers(path2);
      try {
        const stats = await statMethods[wh.statMethod](wh.watchPath);
        if (this.fsw.closed) return;
        if (this.fsw._isIgnored(wh.watchPath, stats)) {
          throw null;
        }
        if (stats.isDirectory()) {
          if (!wh.globFilter) this.emitAdd(processPath(path2), stats, processPath, opts, forceAdd);
          if (priorDepth && priorDepth > opts.depth) return;
          this.fsw._readdirp(wh.watchPath, {
            fileFilter: (entry) => wh.filterPath(entry),
            directoryFilter: (entry) => wh.filterDir(entry),
            ...Depth(opts.depth - (priorDepth || 0))
          }).on(STR_DATA, (entry) => {
            if (this.fsw.closed) {
              return;
            }
            if (entry.stats.isDirectory() && !wh.filterPath(entry)) return;
            const joinedPath = sysPath.join(wh.watchPath, entry.path);
            const { fullPath } = entry;
            if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
              const curDepth = opts.depth === void 0 ? void 0 : calcDepth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;
              this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
            } else {
              this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
            }
          }).on(EV_ERROR, EMPTY_FN).on(STR_END, () => {
            this.fsw._emitReady();
          });
        } else {
          this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
          this.fsw._emitReady();
        }
      } catch (error) {
        if (!error || this.fsw._handleError(error)) {
          this.fsw._emitReady();
          this.fsw._emitReady();
        }
      }
      if (opts.persistent && forceAdd !== true) {
        if (typeof transform === FUNCTION_TYPE) {
          this.initWatch(void 0, path2, wh, processPath);
        } else {
          let realPath;
          try {
            realPath = await realpath(wh.watchPath);
          } catch (e) {
          }
          this.initWatch(realPath, path2, wh, processPath);
        }
      }
    }
  }
  fseventsHandler.exports = FsEventsHandler;
  fseventsHandler.exports.canUse = canUse;
  return fseventsHandler.exports;
}
var hasRequiredChokidar;
function requireChokidar() {
  if (hasRequiredChokidar) return chokidar$1;
  hasRequiredChokidar = 1;
  const { EventEmitter } = import_events.default;
  const fs = import_fs.default;
  const sysPath = import_path.default;
  const { promisify } = import_util.default;
  const readdirp = requireReaddirp();
  const anymatch2 = requireAnymatch().default;
  const globParent2 = requireGlobParent();
  const isGlob2 = requireIsGlob();
  const braces = requireBraces();
  const normalizePath2 = requireNormalizePath();
  const NodeFsHandler = requireNodefsHandler();
  const FsEventsHandler = requireFseventsHandler();
  const {
    EV_ALL,
    EV_READY,
    EV_ADD,
    EV_CHANGE,
    EV_UNLINK,
    EV_ADD_DIR,
    EV_UNLINK_DIR,
    EV_RAW,
    EV_ERROR,
    STR_CLOSE,
    STR_END,
    BACK_SLASH_RE,
    DOUBLE_SLASH_RE,
    SLASH_OR_BACK_SLASH_RE,
    DOT_RE,
    REPLACER_RE,
    SLASH,
    SLASH_SLASH,
    BRACE_START,
    BANG,
    ONE_DOT,
    TWO_DOTS,
    GLOBSTAR,
    SLASH_GLOBSTAR,
    ANYMATCH_OPTS,
    STRING_TYPE,
    FUNCTION_TYPE,
    EMPTY_STR,
    EMPTY_FN,
    isWindows,
    isMacos,
    isIBMi
  } = requireConstants();
  const stat = promisify(fs.stat);
  const readdir = promisify(fs.readdir);
  const arrify = (value = []) => Array.isArray(value) ? value : [value];
  const flatten = (list, result = []) => {
    list.forEach((item) => {
      if (Array.isArray(item)) {
        flatten(item, result);
      } else {
        result.push(item);
      }
    });
    return result;
  };
  const unifyPaths = (paths_) => {
    const paths = flatten(arrify(paths_));
    if (!paths.every((p) => typeof p === STRING_TYPE)) {
      throw new TypeError(`Non-string provided as watch path: ${paths}`);
    }
    return paths.map(normalizePathToUnix);
  };
  const toUnix = (string) => {
    let str = string.replace(BACK_SLASH_RE, SLASH);
    let prepend = false;
    if (str.startsWith(SLASH_SLASH)) {
      prepend = true;
    }
    while (str.match(DOUBLE_SLASH_RE)) {
      str = str.replace(DOUBLE_SLASH_RE, SLASH);
    }
    if (prepend) {
      str = SLASH + str;
    }
    return str;
  };
  const normalizePathToUnix = (path2) => toUnix(sysPath.normalize(toUnix(path2)));
  const normalizeIgnored = (cwd = EMPTY_STR) => (path2) => {
    if (typeof path2 !== STRING_TYPE) return path2;
    return normalizePathToUnix(sysPath.isAbsolute(path2) ? path2 : sysPath.join(cwd, path2));
  };
  const getAbsolutePath = (path2, cwd) => {
    if (sysPath.isAbsolute(path2)) {
      return path2;
    }
    if (path2.startsWith(BANG)) {
      return BANG + sysPath.join(cwd, path2.slice(1));
    }
    return sysPath.join(cwd, path2);
  };
  const undef = (opts, key) => opts[key] === void 0;
  class DirEntry {
    /**
     * @param {Path} dir
     * @param {Function} removeWatcher
     */
    constructor(dir, removeWatcher) {
      this.path = dir;
      this._removeWatcher = removeWatcher;
      this.items = /* @__PURE__ */ new Set();
    }
    add(item) {
      const { items } = this;
      if (!items) return;
      if (item !== ONE_DOT && item !== TWO_DOTS) items.add(item);
    }
    async remove(item) {
      const { items } = this;
      if (!items) return;
      items.delete(item);
      if (items.size > 0) return;
      const dir = this.path;
      try {
        await readdir(dir);
      } catch (err) {
        if (this._removeWatcher) {
          this._removeWatcher(sysPath.dirname(dir), sysPath.basename(dir));
        }
      }
    }
    has(item) {
      const { items } = this;
      if (!items) return;
      return items.has(item);
    }
    /**
     * @returns {Array<String>}
     */
    getChildren() {
      const { items } = this;
      if (!items) return;
      return [...items.values()];
    }
    dispose() {
      this.items.clear();
      delete this.path;
      delete this._removeWatcher;
      delete this.items;
      Object.freeze(this);
    }
  }
  const STAT_METHOD_F = "stat";
  const STAT_METHOD_L = "lstat";
  class WatchHelper {
    constructor(path2, watchPath, follow, fsw) {
      this.fsw = fsw;
      this.path = path2 = path2.replace(REPLACER_RE, EMPTY_STR);
      this.watchPath = watchPath;
      this.fullWatchPath = sysPath.resolve(watchPath);
      this.hasGlob = watchPath !== path2;
      if (path2 === EMPTY_STR) this.hasGlob = false;
      this.globSymlink = this.hasGlob && follow ? void 0 : false;
      this.globFilter = this.hasGlob ? anymatch2(path2, void 0, ANYMATCH_OPTS) : false;
      this.dirParts = this.getDirParts(path2);
      this.dirParts.forEach((parts) => {
        if (parts.length > 1) parts.pop();
      });
      this.followSymlinks = follow;
      this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
    }
    checkGlobSymlink(entry) {
      if (this.globSymlink === void 0) {
        this.globSymlink = entry.fullParentDir === this.fullWatchPath ? false : { realPath: entry.fullParentDir, linkPath: this.fullWatchPath };
      }
      if (this.globSymlink) {
        return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
      }
      return entry.fullPath;
    }
    entryPath(entry) {
      return sysPath.join(
        this.watchPath,
        sysPath.relative(this.watchPath, this.checkGlobSymlink(entry))
      );
    }
    filterPath(entry) {
      const { stats } = entry;
      if (stats && stats.isSymbolicLink()) return this.filterDir(entry);
      const resolvedPath = this.entryPath(entry);
      const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE ? this.globFilter(resolvedPath) : true;
      return matchesGlob && this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
    }
    getDirParts(path2) {
      if (!this.hasGlob) return [];
      const parts = [];
      const expandedPath = path2.includes(BRACE_START) ? braces.expand(path2) : [path2];
      expandedPath.forEach((path3) => {
        parts.push(sysPath.relative(this.watchPath, path3).split(SLASH_OR_BACK_SLASH_RE));
      });
      return parts;
    }
    filterDir(entry) {
      if (this.hasGlob) {
        const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
        let globstar = false;
        this.unmatchedGlob = !this.dirParts.some((parts) => {
          return parts.every((part, i) => {
            if (part === GLOBSTAR) globstar = true;
            return globstar || !entryParts[0][i] || anymatch2(part, entryParts[0][i], ANYMATCH_OPTS);
          });
        });
      }
      return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
    }
  }
  class FSWatcher extends EventEmitter {
    // Not indenting methods for history sake; for now.
    constructor(_opts) {
      super();
      const opts = {};
      if (_opts) Object.assign(opts, _opts);
      this._watched = /* @__PURE__ */ new Map();
      this._closers = /* @__PURE__ */ new Map();
      this._ignoredPaths = /* @__PURE__ */ new Set();
      this._throttled = /* @__PURE__ */ new Map();
      this._symlinkPaths = /* @__PURE__ */ new Map();
      this._streams = /* @__PURE__ */ new Set();
      this.closed = false;
      if (undef(opts, "persistent")) opts.persistent = true;
      if (undef(opts, "ignoreInitial")) opts.ignoreInitial = false;
      if (undef(opts, "ignorePermissionErrors")) opts.ignorePermissionErrors = false;
      if (undef(opts, "interval")) opts.interval = 100;
      if (undef(opts, "binaryInterval")) opts.binaryInterval = 300;
      if (undef(opts, "disableGlobbing")) opts.disableGlobbing = false;
      opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;
      if (undef(opts, "useFsEvents")) opts.useFsEvents = !opts.usePolling;
      const canUseFsEvents = FsEventsHandler.canUse();
      if (!canUseFsEvents) opts.useFsEvents = false;
      if (undef(opts, "usePolling") && !opts.useFsEvents) {
        opts.usePolling = isMacos;
      }
      if (isIBMi) {
        opts.usePolling = true;
      }
      const envPoll = process.env.CHOKIDAR_USEPOLLING;
      if (envPoll !== void 0) {
        const envLower = envPoll.toLowerCase();
        if (envLower === "false" || envLower === "0") {
          opts.usePolling = false;
        } else if (envLower === "true" || envLower === "1") {
          opts.usePolling = true;
        } else {
          opts.usePolling = !!envLower;
        }
      }
      const envInterval = process.env.CHOKIDAR_INTERVAL;
      if (envInterval) {
        opts.interval = Number.parseInt(envInterval, 10);
      }
      if (undef(opts, "atomic")) opts.atomic = !opts.usePolling && !opts.useFsEvents;
      if (opts.atomic) this._pendingUnlinks = /* @__PURE__ */ new Map();
      if (undef(opts, "followSymlinks")) opts.followSymlinks = true;
      if (undef(opts, "awaitWriteFinish")) opts.awaitWriteFinish = false;
      if (opts.awaitWriteFinish === true) opts.awaitWriteFinish = {};
      const awf = opts.awaitWriteFinish;
      if (awf) {
        if (!awf.stabilityThreshold) awf.stabilityThreshold = 2e3;
        if (!awf.pollInterval) awf.pollInterval = 100;
        this._pendingWrites = /* @__PURE__ */ new Map();
      }
      if (opts.ignored) opts.ignored = arrify(opts.ignored);
      let readyCalls = 0;
      this._emitReady = () => {
        readyCalls++;
        if (readyCalls >= this._readyCount) {
          this._emitReady = EMPTY_FN;
          this._readyEmitted = true;
          process.nextTick(() => this.emit(EV_READY));
        }
      };
      this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
      this._readyEmitted = false;
      this.options = opts;
      if (opts.useFsEvents) {
        this._fsEventsHandler = new FsEventsHandler(this);
      } else {
        this._nodeFsHandler = new NodeFsHandler(this);
      }
      Object.freeze(opts);
    }
    // Public methods
    /**
     * Adds paths to be watched on an existing FSWatcher instance
     * @param {Path|Array<Path>} paths_
     * @param {String=} _origAdd private; for handling non-existent paths to be watched
     * @param {Boolean=} _internal private; indicates a non-user add
     * @returns {FSWatcher} for chaining
     */
    add(paths_, _origAdd, _internal) {
      const { cwd, disableGlobbing } = this.options;
      this.closed = false;
      let paths = unifyPaths(paths_);
      if (cwd) {
        paths = paths.map((path2) => {
          const absPath = getAbsolutePath(path2, cwd);
          if (disableGlobbing || !isGlob2(path2)) {
            return absPath;
          }
          return normalizePath2(absPath);
        });
      }
      paths = paths.filter((path2) => {
        if (path2.startsWith(BANG)) {
          this._ignoredPaths.add(path2.slice(1));
          return false;
        }
        this._ignoredPaths.delete(path2);
        this._ignoredPaths.delete(path2 + SLASH_GLOBSTAR);
        this._userIgnored = void 0;
        return true;
      });
      if (this.options.useFsEvents && this._fsEventsHandler) {
        if (!this._readyCount) this._readyCount = paths.length;
        if (this.options.persistent) this._readyCount += paths.length;
        paths.forEach((path2) => this._fsEventsHandler._addToFsEvents(path2));
      } else {
        if (!this._readyCount) this._readyCount = 0;
        this._readyCount += paths.length;
        Promise.all(
          paths.map(async (path2) => {
            const res = await this._nodeFsHandler._addToNodeFs(path2, !_internal, 0, 0, _origAdd);
            if (res) this._emitReady();
            return res;
          })
        ).then((results) => {
          if (this.closed) return;
          results.filter((item) => item).forEach((item) => {
            this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
          });
        });
      }
      return this;
    }
    /**
     * Close watchers or start ignoring events from specified paths.
     * @param {Path|Array<Path>} paths_ - string or array of strings, file/directory paths and/or globs
     * @returns {FSWatcher} for chaining
    */
    unwatch(paths_) {
      if (this.closed) return this;
      const paths = unifyPaths(paths_);
      const { cwd } = this.options;
      paths.forEach((path2) => {
        if (!sysPath.isAbsolute(path2) && !this._closers.has(path2)) {
          if (cwd) path2 = sysPath.join(cwd, path2);
          path2 = sysPath.resolve(path2);
        }
        this._closePath(path2);
        this._ignoredPaths.add(path2);
        if (this._watched.has(path2)) {
          this._ignoredPaths.add(path2 + SLASH_GLOBSTAR);
        }
        this._userIgnored = void 0;
      });
      return this;
    }
    /**
     * Close watchers and remove all listeners from watched paths.
     * @returns {Promise<void>}.
    */
    close() {
      if (this.closed) return this._closePromise;
      this.closed = true;
      this.removeAllListeners();
      const closers = [];
      this._closers.forEach((closerList) => closerList.forEach((closer) => {
        const promise = closer();
        if (promise instanceof Promise) closers.push(promise);
      }));
      this._streams.forEach((stream) => stream.destroy());
      this._userIgnored = void 0;
      this._readyCount = 0;
      this._readyEmitted = false;
      this._watched.forEach((dirent) => dirent.dispose());
      ["closers", "watched", "streams", "symlinkPaths", "throttled"].forEach((key) => {
        this[`_${key}`].clear();
      });
      this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
      return this._closePromise;
    }
    /**
     * Expose list of watched paths
     * @returns {Object} for chaining
    */
    getWatched() {
      const watchList = {};
      this._watched.forEach((entry, dir) => {
        const key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
        watchList[key || ONE_DOT] = entry.getChildren().sort();
      });
      return watchList;
    }
    emitWithAll(event, args) {
      this.emit(...args);
      if (event !== EV_ERROR) this.emit(EV_ALL, ...args);
    }
    // Common helpers
    // --------------
    /**
     * Normalize and emit events.
     * Calling _emit DOES NOT MEAN emit() would be called!
     * @param {EventName} event Type of event
     * @param {Path} path File or directory path
     * @param {*=} val1 arguments to be passed with event
     * @param {*=} val2
     * @param {*=} val3
     * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
     */
    async _emit(event, path2, val1, val2, val3) {
      if (this.closed) return;
      const opts = this.options;
      if (isWindows) path2 = sysPath.normalize(path2);
      if (opts.cwd) path2 = sysPath.relative(opts.cwd, path2);
      const args = [event, path2];
      if (val3 !== void 0) args.push(val1, val2, val3);
      else if (val2 !== void 0) args.push(val1, val2);
      else if (val1 !== void 0) args.push(val1);
      const awf = opts.awaitWriteFinish;
      let pw;
      if (awf && (pw = this._pendingWrites.get(path2))) {
        pw.lastChange = /* @__PURE__ */ new Date();
        return this;
      }
      if (opts.atomic) {
        if (event === EV_UNLINK) {
          this._pendingUnlinks.set(path2, args);
          setTimeout(() => {
            this._pendingUnlinks.forEach((entry, path3) => {
              this.emit(...entry);
              this.emit(EV_ALL, ...entry);
              this._pendingUnlinks.delete(path3);
            });
          }, typeof opts.atomic === "number" ? opts.atomic : 100);
          return this;
        }
        if (event === EV_ADD && this._pendingUnlinks.has(path2)) {
          event = args[0] = EV_CHANGE;
          this._pendingUnlinks.delete(path2);
        }
      }
      if (awf && (event === EV_ADD || event === EV_CHANGE) && this._readyEmitted) {
        const awfEmit = (err, stats) => {
          if (err) {
            event = args[0] = EV_ERROR;
            args[1] = err;
            this.emitWithAll(event, args);
          } else if (stats) {
            if (args.length > 2) {
              args[2] = stats;
            } else {
              args.push(stats);
            }
            this.emitWithAll(event, args);
          }
        };
        this._awaitWriteFinish(path2, awf.stabilityThreshold, event, awfEmit);
        return this;
      }
      if (event === EV_CHANGE) {
        const isThrottled = !this._throttle(EV_CHANGE, path2, 50);
        if (isThrottled) return this;
      }
      if (opts.alwaysStat && val1 === void 0 && (event === EV_ADD || event === EV_ADD_DIR || event === EV_CHANGE)) {
        const fullPath = opts.cwd ? sysPath.join(opts.cwd, path2) : path2;
        let stats;
        try {
          stats = await stat(fullPath);
        } catch (err) {
        }
        if (!stats || this.closed) return;
        args.push(stats);
      }
      this.emitWithAll(event, args);
      return this;
    }
    /**
     * Common handler for errors
     * @param {Error} error
     * @returns {Error|Boolean} The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
     */
    _handleError(error) {
      const code = error && error.code;
      if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
        this.emit(EV_ERROR, error);
      }
      return error || this.closed;
    }
    /**
     * Helper utility for throttling
     * @param {ThrottleType} actionType type being throttled
     * @param {Path} path being acted upon
     * @param {Number} timeout duration of time to suppress duplicate actions
     * @returns {Object|false} tracking object or false if action should be suppressed
     */
    _throttle(actionType, path2, timeout) {
      if (!this._throttled.has(actionType)) {
        this._throttled.set(actionType, /* @__PURE__ */ new Map());
      }
      const action = this._throttled.get(actionType);
      const actionPath = action.get(path2);
      if (actionPath) {
        actionPath.count++;
        return false;
      }
      let timeoutObject;
      const clear = () => {
        const item = action.get(path2);
        const count = item ? item.count : 0;
        action.delete(path2);
        clearTimeout(timeoutObject);
        if (item) clearTimeout(item.timeoutObject);
        return count;
      };
      timeoutObject = setTimeout(clear, timeout);
      const thr = { timeoutObject, clear, count: 0 };
      action.set(path2, thr);
      return thr;
    }
    _incrReadyCount() {
      return this._readyCount++;
    }
    /**
     * Awaits write operation to finish.
     * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
     * @param {Path} path being acted upon
     * @param {Number} threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
     * @param {EventName} event
     * @param {Function} awfEmit Callback to be called when ready for event to be emitted.
     */
    _awaitWriteFinish(path2, threshold, event, awfEmit) {
      let timeoutHandler;
      let fullPath = path2;
      if (this.options.cwd && !sysPath.isAbsolute(path2)) {
        fullPath = sysPath.join(this.options.cwd, path2);
      }
      const now = /* @__PURE__ */ new Date();
      const awaitWriteFinish = (prevStat) => {
        fs.stat(fullPath, (err, curStat) => {
          if (err || !this._pendingWrites.has(path2)) {
            if (err && err.code !== "ENOENT") awfEmit(err);
            return;
          }
          const now2 = Number(/* @__PURE__ */ new Date());
          if (prevStat && curStat.size !== prevStat.size) {
            this._pendingWrites.get(path2).lastChange = now2;
          }
          const pw = this._pendingWrites.get(path2);
          const df = now2 - pw.lastChange;
          if (df >= threshold) {
            this._pendingWrites.delete(path2);
            awfEmit(void 0, curStat);
          } else {
            timeoutHandler = setTimeout(
              awaitWriteFinish,
              this.options.awaitWriteFinish.pollInterval,
              curStat
            );
          }
        });
      };
      if (!this._pendingWrites.has(path2)) {
        this._pendingWrites.set(path2, {
          lastChange: now,
          cancelWait: () => {
            this._pendingWrites.delete(path2);
            clearTimeout(timeoutHandler);
            return event;
          }
        });
        timeoutHandler = setTimeout(
          awaitWriteFinish,
          this.options.awaitWriteFinish.pollInterval
        );
      }
    }
    _getGlobIgnored() {
      return [...this._ignoredPaths.values()];
    }
    /**
     * Determines whether user has asked to ignore this path.
     * @param {Path} path filepath or dir
     * @param {fs.Stats=} stats result of fs.stat
     * @returns {Boolean}
     */
    _isIgnored(path2, stats) {
      if (this.options.atomic && DOT_RE.test(path2)) return true;
      if (!this._userIgnored) {
        const { cwd } = this.options;
        const ign = this.options.ignored;
        const ignored = ign && ign.map(normalizeIgnored(cwd));
        const paths = arrify(ignored).filter((path3) => typeof path3 === STRING_TYPE && !isGlob2(path3)).map((path3) => path3 + SLASH_GLOBSTAR);
        const list = this._getGlobIgnored().map(normalizeIgnored(cwd)).concat(ignored, paths);
        this._userIgnored = anymatch2(list, void 0, ANYMATCH_OPTS);
      }
      return this._userIgnored([path2, stats]);
    }
    _isntIgnored(path2, stat2) {
      return !this._isIgnored(path2, stat2);
    }
    /**
     * Provides a set of common helpers and properties relating to symlink and glob handling.
     * @param {Path} path file, directory, or glob pattern being watched
     * @param {Number=} depth at any depth > 0, this isn't a glob
     * @returns {WatchHelper} object containing helpers for this path
     */
    _getWatchHelpers(path2, depth) {
      const watchPath = depth || this.options.disableGlobbing || !isGlob2(path2) ? path2 : globParent2(path2);
      const follow = this.options.followSymlinks;
      return new WatchHelper(path2, watchPath, follow, this);
    }
    // Directory helpers
    // -----------------
    /**
     * Provides directory tracking objects
     * @param {String} directory path of the directory
     * @returns {DirEntry} the directory's tracking object
     */
    _getWatchedDir(directory) {
      if (!this._boundRemove) this._boundRemove = this._remove.bind(this);
      const dir = sysPath.resolve(directory);
      if (!this._watched.has(dir)) this._watched.set(dir, new DirEntry(dir, this._boundRemove));
      return this._watched.get(dir);
    }
    // File helpers
    // ------------
    /**
     * Check for read permissions.
     * Based on this answer on SO: https://stackoverflow.com/a/11781404/1358405
     * @param {fs.Stats} stats - object, result of fs_stat
     * @returns {Boolean} indicates whether the file can be read
    */
    _hasReadPermissions(stats) {
      if (this.options.ignorePermissionErrors) return true;
      const md = stats && Number.parseInt(stats.mode, 10);
      const st = md & 511;
      const it = Number.parseInt(st.toString(8)[0], 10);
      return Boolean(4 & it);
    }
    /**
     * Handles emitting unlink events for
     * files and directories, and via recursion, for
     * files and directories within directories that are unlinked
     * @param {String} directory within which the following item is located
     * @param {String} item      base path of item/directory
     * @returns {void}
    */
    _remove(directory, item, isDirectory) {
      const path2 = sysPath.join(directory, item);
      const fullPath = sysPath.resolve(path2);
      isDirectory = isDirectory != null ? isDirectory : this._watched.has(path2) || this._watched.has(fullPath);
      if (!this._throttle("remove", path2, 100)) return;
      if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
        this.add(directory, item, true);
      }
      const wp = this._getWatchedDir(path2);
      const nestedDirectoryChildren = wp.getChildren();
      nestedDirectoryChildren.forEach((nested) => this._remove(path2, nested));
      const parent = this._getWatchedDir(directory);
      const wasTracked = parent.has(item);
      parent.remove(item);
      if (this._symlinkPaths.has(fullPath)) {
        this._symlinkPaths.delete(fullPath);
      }
      let relPath = path2;
      if (this.options.cwd) relPath = sysPath.relative(this.options.cwd, path2);
      if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
        const event = this._pendingWrites.get(relPath).cancelWait();
        if (event === EV_ADD) return;
      }
      this._watched.delete(path2);
      this._watched.delete(fullPath);
      const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK;
      if (wasTracked && !this._isIgnored(path2)) this._emit(eventName, path2);
      if (!this.options.useFsEvents) {
        this._closePath(path2);
      }
    }
    /**
     * Closes all watchers for a path
     * @param {Path} path
     */
    _closePath(path2) {
      this._closeFile(path2);
      const dir = sysPath.dirname(path2);
      this._getWatchedDir(dir).remove(sysPath.basename(path2));
    }
    /**
     * Closes only file-specific watchers
     * @param {Path} path
     */
    _closeFile(path2) {
      const closers = this._closers.get(path2);
      if (!closers) return;
      closers.forEach((closer) => closer());
      this._closers.delete(path2);
    }
    /**
     *
     * @param {Path} path
     * @param {Function} closer
     */
    _addPathCloser(path2, closer) {
      if (!closer) return;
      let list = this._closers.get(path2);
      if (!list) {
        list = [];
        this._closers.set(path2, list);
      }
      list.push(closer);
    }
    _readdirp(root, opts) {
      if (this.closed) return;
      const options = { type: EV_ALL, alwaysStat: true, lstat: true, ...opts };
      let stream = readdirp(root, options);
      this._streams.add(stream);
      stream.once(STR_CLOSE, () => {
        stream = void 0;
      });
      stream.once(STR_END, () => {
        if (stream) {
          this._streams.delete(stream);
          stream = void 0;
        }
      });
      return stream;
    }
  }
  chokidar$1.FSWatcher = FSWatcher;
  const watch = (paths, options) => {
    const watcher = new FSWatcher(options);
    watcher.add(paths);
    return watcher;
  };
  chokidar$1.watch = watch;
  return chokidar$1;
}
var chokidarExports = requireChokidar();
var chokidar = getDefaultExportFromCjs(chokidarExports);
var FileWatcher = class {
  constructor(task, chokidarOptions) {
    this.transformWatchers = /* @__PURE__ */ new Map();
    this.chokidarOptions = chokidarOptions;
    this.task = task;
    this.watcher = this.createWatcher(null);
  }
  close() {
    this.watcher.close();
    for (const watcher of this.transformWatchers.values()) {
      watcher.close();
    }
  }
  unwatch(id) {
    this.watcher.unwatch(id);
    const transformWatcher = this.transformWatchers.get(id);
    if (transformWatcher) {
      this.transformWatchers.delete(id);
      transformWatcher.close();
    }
  }
  watch(id, isTransformDependency) {
    if (isTransformDependency) {
      const watcher = this.transformWatchers.get(id) ?? this.createWatcher(id);
      watcher.add(id);
      this.transformWatchers.set(id, watcher);
    } else {
      this.watcher.add(id);
    }
  }
  createWatcher(transformWatcherId) {
    const task = this.task;
    const isLinux = (0, import_node_os.platform)() === "linux";
    const isTransformDependency = transformWatcherId !== null;
    const handleChange = (id, event) => {
      const changedId = transformWatcherId || id;
      if (isLinux) {
        watcher.unwatch(changedId);
        watcher.add(changedId);
      }
      task.invalidate(changedId, { event, isTransformDependency });
    };
    const watcher = chokidar.watch([], this.chokidarOptions).on("add", (id) => handleChange(id, "create")).on("change", (id) => handleChange(id, "update")).on("unlink", (id) => handleChange(id, "delete"));
    return watcher;
  }
};
var eventsRewrites = {
  create: {
    create: "buggy",
    delete: null,
    //delete file from map
    update: "create"
  },
  delete: {
    create: "update",
    delete: "buggy",
    update: "buggy"
  },
  update: {
    create: "buggy",
    delete: "delete",
    update: "update"
  }
};
var Watcher = class {
  constructor(optionsList, emitter) {
    this.buildDelay = 0;
    this.buildTimeout = null;
    this.closed = false;
    this.invalidatedIds = /* @__PURE__ */ new Map();
    this.rerun = false;
    this.running = true;
    this.emitter = emitter;
    emitter.close = this.close.bind(this);
    this.tasks = optionsList.map((options) => new Task(this, options));
    for (const { watch } of optionsList) {
      if (watch && typeof watch.buildDelay === "number") {
        this.buildDelay = Math.max(this.buildDelay, watch.buildDelay);
      }
    }
    import_node_process.default.nextTick(() => this.run());
  }
  async close() {
    if (this.closed)
      return;
    this.closed = true;
    if (this.buildTimeout)
      clearTimeout(this.buildTimeout);
    for (const task of this.tasks) {
      task.close();
    }
    await this.emitter.emit("close");
    this.emitter.removeAllListeners();
  }
  invalidate(file) {
    if (file) {
      const previousEvent = this.invalidatedIds.get(file.id);
      const event = previousEvent ? eventsRewrites[previousEvent][file.event] : file.event;
      if (event === "buggy") {
        this.invalidatedIds.set(file.id, file.event);
      } else if (event === null) {
        this.invalidatedIds.delete(file.id);
      } else {
        this.invalidatedIds.set(file.id, event);
      }
    }
    if (this.running) {
      this.rerun = true;
      return;
    }
    if (this.buildTimeout)
      clearTimeout(this.buildTimeout);
    this.buildTimeout = setTimeout(async () => {
      this.buildTimeout = null;
      try {
        await Promise.all([...this.invalidatedIds].map(([id, event]) => this.emitter.emit("change", id, { event })));
        this.invalidatedIds.clear();
        await this.emitter.emit("restart");
        this.emitter.removeListenersForCurrentRun();
        this.run();
      } catch (error) {
        this.invalidatedIds.clear();
        await this.emitter.emit("event", {
          code: "ERROR",
          error,
          result: null
        });
        await this.emitter.emit("event", {
          code: "END"
        });
      }
    }, this.buildDelay);
  }
  async run() {
    this.running = true;
    await this.emitter.emit("event", {
      code: "START"
    });
    for (const task of this.tasks) {
      await task.run();
    }
    this.running = false;
    await this.emitter.emit("event", {
      code: "END"
    });
    if (this.rerun) {
      this.rerun = false;
      this.invalidate();
    }
  }
};
var Task = class {
  constructor(watcher, options) {
    this.cache = { modules: [] };
    this.watchFiles = [];
    this.closed = false;
    this.invalidated = true;
    this.watched = /* @__PURE__ */ new Set();
    this.watcher = watcher;
    this.options = options;
    this.skipWrite = Boolean(options.watch && options.watch.skipWrite);
    this.outputs = this.options.output;
    this.outputFiles = this.outputs.map((output) => {
      if (output.file || output.dir)
        return import_node_path.default.resolve(output.file || output.dir);
      return void 0;
    });
    const watchOptions = this.options.watch || {};
    this.filter = createFilter(watchOptions.include, watchOptions.exclude);
    this.fileWatcher = new FileWatcher(this, {
      ...watchOptions.chokidar,
      disableGlobbing: true,
      ignoreInitial: true
    });
  }
  close() {
    this.closed = true;
    this.fileWatcher.close();
  }
  invalidate(id, details) {
    this.invalidated = true;
    if (details.isTransformDependency) {
      for (const module of this.cache.modules) {
        if (!module.transformDependencies.includes(id))
          continue;
        module.originalCode = null;
      }
    }
    this.watcher.invalidate({ event: details.event, id });
  }
  async run() {
    if (!this.invalidated)
      return;
    this.invalidated = false;
    const options = {
      ...this.options,
      cache: this.cache
    };
    const start = Date.now();
    await this.watcher.emitter.emit("event", {
      code: "BUNDLE_START",
      input: this.options.input,
      output: this.outputFiles
    });
    let result = null;
    try {
      result = await rollupInternal(options, this.watcher.emitter);
      if (this.closed) {
        return;
      }
      this.updateWatchedFiles(result);
      if (!this.skipWrite) {
        await Promise.all(this.outputs.map((output) => result.write(output)));
        if (this.closed) {
          return;
        }
        this.updateWatchedFiles(result);
      }
      await this.watcher.emitter.emit("event", {
        code: "BUNDLE_END",
        duration: Date.now() - start,
        input: this.options.input,
        output: this.outputFiles,
        result
      });
    } catch (error) {
      if (!this.closed) {
        if (Array.isArray(error.watchFiles)) {
          for (const id of error.watchFiles) {
            this.watchFile(id);
          }
        }
        if (error.id) {
          this.cache.modules = this.cache.modules.filter((module) => module.id !== error.id);
        }
      }
      await this.watcher.emitter.emit("event", {
        code: "ERROR",
        error,
        result
      });
    }
  }
  updateWatchedFiles(result) {
    const previouslyWatched = this.watched;
    this.watched = /* @__PURE__ */ new Set();
    this.watchFiles = result.watchFiles;
    this.cache = result.cache;
    for (const id of this.watchFiles) {
      this.watchFile(id);
    }
    for (const module of this.cache.modules) {
      for (const depId of module.transformDependencies) {
        this.watchFile(depId, true);
      }
    }
    for (const id of previouslyWatched) {
      if (!this.watched.has(id)) {
        this.fileWatcher.unwatch(id);
      }
    }
  }
  watchFile(id, isTransformDependency = false) {
    if (!this.filter(id))
      return;
    this.watched.add(id);
    if (this.outputFiles.includes(id)) {
      throw new Error("Cannot import the generated bundle");
    }
    this.fileWatcher.watch(id, isTransformDependency);
  }
};
export {
  Task,
  Watcher
};
/*! Bundled license information:

rollup/dist/es/shared/watch.js:
  (*
    @license
  	Rollup.js v4.24.0
  	Wed, 02 Oct 2024 09:36:48 GMT - commit d3c000f4fd453e39a354299f0cfaa6831f56d7d8
  
  	https://github.com/rollup/rollup
  
  	Released under the MIT License.
  *)
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=watch-CIDZDHNG.js.map
