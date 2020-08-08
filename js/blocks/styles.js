/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./blocks/styles/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./blocks/styles/heading/heading.js":
/*!******************************************!*\
  !*** ./blocks/styles/heading/heading.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _src_js_admin_heading_getHeadingTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../src/js/admin/heading/_getHeadingTypes */ "./src/js/admin/heading/_getHeadingTypes.js");
/* harmony import */ var _src_js_admin_function_toBool__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../src/js/admin/function/_toBool */ "./src/js/admin/function/_toBool.js");
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





var types = Object(_src_js_admin_heading_getHeadingTypes__WEBPACK_IMPORTED_MODULE_1__["default"])();

var option = window.ystdtbBlockEditorHeading;

var _iterator = _createForOfIteratorHelper(types),
    _step;

try {
  for (_iterator.s(); !(_step = _iterator.n()).done;) {
    var item = _step.value;

    if (!!option[item.level] && Object(_src_js_admin_function_toBool__WEBPACK_IMPORTED_MODULE_2__["default"])(option[item.level]['useCustomStyle'])) {
      var style = {
        name: "ystdtb-".concat(item.level),
        label: item.label
      };
      Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockStyle"])('core/heading', style);
      Object(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__["registerBlockStyle"])('ystdb/heading', style);
    }
  }
} catch (err) {
  _iterator.e(err);
} finally {
  _iterator.f();
}

/***/ }),

/***/ "./blocks/styles/index.js":
/*!********************************!*\
  !*** ./blocks/styles/index.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heading_heading__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heading/heading */ "./blocks/styles/heading/heading.js");


/***/ }),

/***/ "./src/js/admin/function/_toBool.js":
/*!******************************************!*\
  !*** ./src/js/admin/function/_toBool.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _toBool; });
function _toBool(value) {
  if (true === value || 'true' === value || 1 === value || '1' === value) {
    return true;
  }

  return false;
}

/***/ }),

/***/ "./src/js/admin/heading/_getHeadingTypes.js":
/*!**************************************************!*\
  !*** ./src/js/admin/heading/_getHeadingTypes.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _getHeadingTypes; });
function _getHeadingTypes() {
  return [{
    level: "h1",
    label: "h1",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "h2",
    label: "h2",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "h3",
    label: "h3",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "h4",
    label: "h4",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "h5",
    label: "h5",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "h6",
    label: "h6",
    description: "本文内の見出しデザイン設定"
  }, {
    level: "sidebar",
    label: "サイドバー",
    description: "サイドバーのウィジェットタイトル デザイン設定"
  }, {
    level: "footer",
    label: "フッター",
    description: "フッターのウィジェットタイトル デザイン設定"
  }, {
    level: "post-title",
    label: "投稿タイトル",
    description: "投稿詳細ページのタイトル デザイン設定"
  }, {
    level: "page-title",
    label: "固定ページタイトル",
    description: "固定ページのタイトル デザイン設定"
  }, {
    level: "archive-title",
    label: "一覧ページタイトル",
    description: "投稿一覧ページタイトル デザイン設定"
  }];
}

/***/ }),

/***/ "@wordpress/blocks":
/*!*****************************************!*\
  !*** external {"this":["wp","blocks"]} ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = this["wp"]["blocks"]; }());

/***/ })

/******/ });
//# sourceMappingURL=styles.js.map