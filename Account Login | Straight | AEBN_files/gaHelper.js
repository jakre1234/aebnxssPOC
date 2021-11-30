var app =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 215);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 21:
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ }),

/***/ 215:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(216);


/***/ }),

/***/ 216:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _stringify=__webpack_require__(21);var _stringify2=_interopRequireDefault(_stringify);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var KEY_NAME='_event_ids';var COOKIE_EXPIRE_DAYS=365;var EVENT_SIZE_LIMIT=500;function readFromStorage(key){if(!window.Storage){var value='; '+document.cookie;var parts=value.split('; '+key+'=');if(parts.length===2){return parts.pop().split(';').shift()}}else{return window.localStorage.getItem(key)}}function writeToStorage(key,value,expireDays){if(!window.Storage){var expiresDate=new Date;expiresDate.setDate(expiresDate.getDate()+expireDays);document.cookie=key+'='+value+';expires='+expiresDate.toUTCString()}else{window.localStorage.setItem(key,value)}}function okToSendEvent(eventUUID){try{if(eventUUID!=='undefined'&&eventUUID!=null){var data=JSON.parse(readFromStorage(KEY_NAME)||'[]');if(data.indexOf(eventUUID)>-1){return false}else{data.push(eventUUID);if(data.length>EVENT_SIZE_LIMIT){data.shift()}writeToStorage(KEY_NAME,(0,_stringify2.default)(data),COOKIE_EXPIRE_DAYS)}}}catch(e){console.error('Error checking if ok to send: ',e)}return true}module.exports={okToSendEvent:okToSendEvent};

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ })

/******/ });
//# sourceMappingURL=gaHelper.bundle.js.map