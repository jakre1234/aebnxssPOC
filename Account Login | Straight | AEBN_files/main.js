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
/******/ 	return __webpack_require__(__webpack_require__.s = 92);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(104);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _javascriptCommonLibrary=__webpack_require__(65);var common=_interopRequireWildcard(_javascriptCommonLibrary);var _javascriptMenuLibrary=__webpack_require__(100);var card=_interopRequireWildcard(_javascriptMenuLibrary);var _javascriptSliderLibrary=__webpack_require__(134);var _javascriptSliderLibrary2=_interopRequireDefault(_javascriptSliderLibrary);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}module.exports={card:card,common:common,Slider:_javascriptSliderLibrary2.default};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var ctx = __webpack_require__(11);
var hide = __webpack_require__(13);
var has = __webpack_require__(15);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(43)('wks');
var uid = __webpack_require__(33);
var Symbol = __webpack_require__(4).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var IE8_DOM_DEFINE = __webpack_require__(67);
var toPrimitive = __webpack_require__(46);
var dP = Object.defineProperty;

exports.f = __webpack_require__(9) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(23);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(102), __esModule: true };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(24);
module.exports = __webpack_require__(9) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(41);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(25);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(49);
var defined = __webpack_require__(41);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(123);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(74);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(25);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _promise=__webpack_require__(59);var _promise2=_interopRequireDefault(_promise);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _javascriptCommonLibrary=__webpack_require__(65);var dts=_interopRequireWildcard(_javascriptCommonLibrary);var _templates=__webpack_require__(146);var modalTemplates=_interopRequireWildcard(_templates);var _dtsModalManager=__webpack_require__(148);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var modalIndex=100;var asyncModalIndex=1;var modalManager=new _dtsModalManager.DtsModalManager;var arrModalsInHash=location.hash.match(/(-m)(\d{3}( ||-||[^\d]))/g);if(arrModalsInHash){if(history.state&&history.state.modal){history.go(arrModalsInHash.length*-1)}else{location.replace(location.href.substr(0,location.href.indexOf('#')))}}var DtsModal=function(){function DtsModal(triggerId,options){(0,_classCallCheck3.default)(this,DtsModal);this.elTrigger=document.getElementById(triggerId);this.touchshield=document.createElement('DIV');this.touchshield.id=options.async?'asyncWaitingModal':'dtsModal';this.touchshield.className='dts-touch-shield dts-modal';this.touchshield.innerHTML='\n\t\t\t\t<div id="dtsModalContentControlsWrapper" class="dts-modal-content-wrapper">\n\t\t\t\t<div id="dtsModalDefaultCloser" class="dts-modal-default-closer dts-modal-closer">\n\t\t\t\t\t<i class="dts-icon-close" style="align-self: center; color: white; margin-right: 6px;"></i>\n\t\t\t\t</div>\n\t\t\t\t<div id="dtsModalContentWrapper" class="dts-modal-content dts-default-content-styles">\n\t\t\t\t</div>\n\t\t\t\t<!--- This style attrib MUST stay here! Will not work if it is moved to stylesheet! --->\n\t\t\t\t<div id="dtsIosModalBuffer" class="dts-ios-modal-buffer" style="display: none; height: 100px;"> \n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t\t';document.body.appendChild(this.touchshield);if(!options.async){this.touchshield.id=this.touchshield.id+'-'+modalIndex}this.modalIndex=modalIndex;this.id=this.touchshield.id;this.modalContent=this.touchshield.querySelector('#dtsModalContentWrapper');this.modalContent.id=this.modalContent.id+'-'+this.modalIndex;this.modalContentWrapper=this.touchshield.querySelector('.dts-modal-content-wrapper');this.modalContentWrapper.id=this.modalContentWrapper.id+'-'+this.modalIndex;if(this.modalContent){this.modalContent.addEventListener('click',this.stopEvent.bind(this),false)}else{this.error('Could not find modal content container')}if(this.elTrigger)this.elTrigger.addEventListener('click',this.open.bind(this),false);this.defaultCloser=this.touchshield.querySelector('#dtsModalDefaultCloser');this.defaultCloser.id=this.defaultCloser.id+'-'+this.modalIndex;this.iosBuffer=this.touchshield.querySelector('#dtsIosModalBuffer');this.iosBuffer.id=this.iosBuffer.id+'-'+this.modalIndex;this.children=[];if(!options.async)modalIndex++;this.options=options;if(!options.deferTillOpen)this.buildModal(options)}(0,_createClass3.default)(DtsModal,[{key:'buildModal',value:function buildModal(options){var _this=this;if(options){if(options.css){if(options.css.class){this.modalContentWrapper.classList.add(options.css.class)}}if(options.removeDefaultContentStyles){this.modalContent.classList.remove('dts-default-content-styles')}if(options.disableDefaultCloser||options.confirmation){this.defaultCloser.style.display='none'}else{this.defaultCloser.onclick=this.close.bind(this)}if(!options.disableTouchshieldClose&&!options.confirmation){this.touchshield.onclick=this.close.bind(this)}if(options.contentId){this.loadContent(options.contentId)}if(options.ajax){this.loadAjax(options.ajax)}if(options.html){this.loadHtml(options.html)}if(options.callback){options.callback.call(this)}if(options.template){this.loadTemplate(options.template)}if(options.closers){options.closers.forEach(function(closerId){var elCloser=_this.touchshield.querySelector('#'+closerId);if(elCloser){elCloser.onclick=_this.close.bind(_this);elCloser.classList.add('dts-modal-closer')}})}if(options.async){this.touchshield.classList.add('dts-modal-waiting');this.touchshield.style.display='none'}if(options.confirmation){this.loadConfirmation(options.confirmation)}}}},{key:'open',value:function open(e){if(e)e.stopPropagation();if(this.options.deferTillOpen){if(this.modalContent.children.length>0){for(var i=0;i<this.modalContent.children;i++){this.modalContent.removeChild(this.modalContent.children[0])}this.children=[]}this.modalContent.innerHTML='';this.buildModal(this.options)}if(!this.options.confirmation||dts.cookie.readCookie(this.options.confirmation.cookieNameHideConfirmation)!=1){if(this.options.preOpen){this.preOpen()}modalManager.open(this,this.options.async)}else{if(this.options.confirmation.callbackOK)this.options.confirmation.callbackOK.call(this)}}},{key:'close',value:function close(e){if(e)e.stopPropagation();this.log('Closing',e);if(!this.options.async){modalManager.triggerClose()}else{modalManager.close(this.id)}}},{key:'loadContent',value:function loadContent(id){var elContent=document.getElementById(id);if(elContent){this.appendContent(elContent);elContent.style.display='block'}}},{key:'loadAjax',value:function loadAjax(ajax){var _this2=this;var elContent=document.createElement('DIV');if(!this.dtsAsyncWaitingModal){this.dtsAsyncWaitingModal=dtsAsyncWaitingModal}this.dtsAsyncWaitingModal.open();dts.xhr.post(ajax.url,ajax.data,true,function(status,result){if(ajax.template){var _elContent=document.createElement('DIV');_elContent.innerHTML=modalTemplates[ajax.template.name].render(result);if(_elContent){_this2.appendContent(_elContent)}}else{elContent.innerHTML=ajax.callbackSuccess.call(_this2,result)}if(elContent)_this2.appendContent(elContent);_this2.dtsAsyncWaitingModal.close()})}},{key:'loadTemplate',value:function loadTemplate(template){var elContent=document.createElement('DIV');elContent.innerHTML=modalTemplates[template.name].render(template.data);if(elContent)this.appendContent(elContent)}},{key:'loadConfirmation',value:function loadConfirmation(confirmation){var _this3=this;var elConfirmation=document.createElement('DIV');var htmlConfirmation='';if(confirmation.html)htmlConfirmation+=confirmation.html;htmlConfirmation+='\n\t\t\t<div style="margin: 10px 0">\n\t\t\t\t<button id="dtsBtnConfirmationCancel" class="'+(confirmation.classCancel||'dts-link-button')+' dts-modal-closer" type="button">'+(confirmation.labelCancel||'Cancel')+'</button>\n\t\t\t\t<button id="dtsBtnConfirmationOk" class="'+(confirmation.classOk||'dts-link-button')+'" type="button">'+(confirmation.labelOk||'Continue')+'</button>\n\t\t\t</div>\n\t\t';if(confirmation.cookieNameHideConfirmation){htmlConfirmation+='\n\t\t\t<div>\n\t\t\t\t<span class="dts-form-input-label">\n\t\t\t\t\t<input id="dtsHideConfirmation"  type="checkbox" class="dts-form-field-checkbox" autocomplete="off">\n\t\t\t\t\t<label for="dtsMessagesToggleDontShowWarning">Don\'t show this message again.</label>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t'}elConfirmation.innerHTML=htmlConfirmation;this.modalContent.appendChild(elConfirmation);var elBtnCancel=this.touchshield.querySelector('#dtsBtnConfirmationCancel');var elBtnOk=this.touchshield.querySelector('#dtsBtnConfirmationOk');this.elChkDontShow=this.touchshield.querySelector('#dtsHideConfirmation');if(elBtnCancel){if(confirmation.callbackCancel){elBtnCancel.addEventListener('click',function(){confirmation.callbackCancel();_this3.setDontShow(0);_this3.close()},false)}else{elBtnCancel.addEventListener('click',function(){_this3.setDontShow(0);_this3.close()},false)}}if(elBtnOk){if(confirmation.callbackOK){elBtnOk.addEventListener('click',function(){_this3.runConfirmationCallback(confirmation.callbackOK)},false)}else{elBtnOk.addEventListener('click',this.close.bind(this),false)}}if(this.elChkDontShow)this.elChkDontShow.addEventListener('click',this.toggleCookie.bind(this),false)}},{key:'runConfirmationCallback',value:function runConfirmationCallback(callback){var _this4=this;new _promise2.default(function(resolve,reject){if(callback())resolve()}).then(function(result){if(_this4)_this4.close()})}},{key:'loadHtml',value:function loadHtml(html){var elHtml=document.createElement('DIV');elHtml.innerHTML=html;this.appendContent(elHtml)}},{key:'postProcess',value:function postProcess(){this.log('Running postProcess');if(this.options.postProcess){this.options.postProcess.call(this)}}},{key:'preOpen',value:function preOpen(){if(this.options.preOpen){this.options.preOpen.call(this)}}},{key:'log',value:function log(msg,vars){if(this.options.verbose){console.log(msg);if(vars)console.dir(vars)}}},{key:'setDontShow',value:function setDontShow(val){if(this.elChkDontShow&&val==0)this.elChkDontShow.checked=false;dts.cookie.writeCookie(this.options.confirmation.cookieNameHideConfirmation,val,3650)}},{key:'toggleCookie',value:function toggleCookie(){var cookieVal=dts.cookie.readCookie(this.options.confirmation.cookieNameHideConfirmation);this.setDontShow(cookieVal==1?0:1)}},{key:'appendContent',value:function appendContent(content){var _this5=this;if(content){var contentWrapper=document.createElement('DIV');var contentIndex='content-'+modalIndex;contentWrapper.classList.add(contentIndex);this.children.push(contentWrapper.appendChild(content));this.modalContent.appendChild(contentWrapper);new _promise2.default(function(resolve,reject){if(document.querySelector('.'+contentIndex))resolve()}).then(function(){_this5.postProcess()})}}},{key:'error',value:function error(msg){console.error(msg);return null}},{key:'stopEvent',value:function stopEvent(e){if(e){e.stopPropagation()}}}]);return DtsModal}();module.exports={DtsModal:DtsModal};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(39), __esModule: true };

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(107);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(116);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(109)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(48)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(69);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(15);
var TAG = __webpack_require__(6)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var call = __webpack_require__(78);
var isArrayIter = __webpack_require__(79);
var anObject = __webpack_require__(10);
var toLength = __webpack_require__(35);
var getIterFn = __webpack_require__(62);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function toggleInnerText(node,condition,array){if(condition){node.innerText=array[0]}else{node.innerText=array[1]}}function preventDoubleSubmit(formId,submitButtonId){if(formId&&submitButtonId){var submitButton=document.getElementById(submitButtonId);var form=document.getElementById(formId);var callback=function callback(){disableButton(submitButtonId);form.submit()};submitButton.addEventListener('click',callback)}else{console.error('Missing form id and or submit button id.')}}function disableButton(elementId){var element=document.getElementById(elementId);if(element){if(element.nodeName==='BUTTON'||element.nodeName==='INPUT'){element.disabled=true}}else{console.error('No element with id: ',elementId)}}function disableButtons(elementIds){if(Array.isArray(elementIds)){elementIds.forEach(function(elementId){disableButton(elementId)})}else{disableButton(elementIds)}};function enableButton(elementId){var element=document.getElementById(elementId);if(element){if(element.nodeName==='BUTTON'){element.disabled=false}}else{console.error('No element with id: ',elementId)}}function enableButtons(elementIds){if(Array.isArray(elementIds)){elementIds.forEach(function(elementId){enableButton(elementId)})}else{enableButton(elementIds)}};function checkIfElementIsWithinViewport(element){if(element!=undefined&&element!=null){var element_offsets=element.getBoundingClientRect();return element_offsets.top>=0&&element_offsets.left>=0&&element_offsets.bottom<=window.innerHeight&&element_offsets.right<=window.innerWidth}else{return false}}function _findAllChildrenWithClassInternal(containerElem,className,results){for(var i=0;i<containerElem.childNodes.length;++i){if(containerElem.childNodes[i].className&&containerElem.childNodes[i].className.length>0){var arr=containerElem.childNodes[i].className.split(' ');if(arr.indexOf(className)!=-1){results.push(containerElem.childNodes[i])}}if(containerElem.childNodes[i].childNodes){_findAllChildrenWithClassInternal(containerElem.childNodes[i],className,results)}}}function findAllChildrenWithClass(containerElem,className){var results=[];_findAllChildrenWithClassInternal(containerElem,className,results);return results}function determineCurrentPictureElementSrc(pictureElementId){var picture=document.getElementById(pictureElementId);var result=undefined;if(picture!==undefined){result=picture.getElementsByTagName('img')[0].currentSrc}return result}function copyToClipboard(elem){var isInput=elem.tagName==='INPUT'||elem.tagName==='TEXTAREA';var origSelectionStart,origSelectionEnd;if(isInput){target=elem;origSelectionStart=elem.selectionStart;origSelectionEnd=elem.selectionEnd}else{var targetId='_hiddenCopyText_';target=document.getElementById(targetId);if(!target){var target=document.createElement('textarea');target.style.position='absolute';target.style.left='-9999px';target.style.top='0';target.id=targetId;document.body.appendChild(target)}target.textContent=elem.textContent}var currentFocus=document.activeElement;target.focus();target.setSelectionRange(0,target.value.length);var succeed;try{succeed=document.execCommand('copy')}catch(e){succeed=false}if(currentFocus&&typeof currentFocus.focus==='function'){currentFocus.focus()}if(isInput){elem.setSelectionRange(origSelectionStart,origSelectionEnd)}else{target.textContent=''}return succeed}function replacePageUrlParam(className,paramName,paramValue){var elements=document.getElementsByClassName(className);if(elements){for(var i=0;i<elements.length;++i){var elem=elements[i];for(var j=0;j<elem.attributes.length;j++){var attrib=elem.attributes[j];if(attrib.value){var qidx=attrib.value.indexOf('?');if(qidx!=-1){attrib.value=_replaceUrlParam(attrib.value,paramName,paramValue)}}}}}}function _replaceUrlParam(url,paramName,paramValue){var qidx=url.indexOf('?');if(qidx==-1)return url;var fromIdx=qidx+1;var aidx=url.indexOf('&',fromIdx);while(aidx!=-1){var replacedAttributeAndName=_replaceUrlParamOnAttribute(url.substring(fromIdx,aidx),paramName,paramValue);url=url.substring(0,fromIdx)+replacedAttributeAndName+url.substring(aidx);fromIdx+=replacedAttributeAndName.length+1;aidx=url.indexOf('&',fromIdx)}url=url.substring(0,fromIdx)+_replaceUrlParamOnAttribute(url.substring(fromIdx,url.length),paramName,paramValue);return url}function _replaceUrlParamOnAttribute(attribAndValue,paramName,paramValue){var eqidx=attribAndValue.indexOf('=');if(eqidx==-1)return attribAndValue;var attrName=attribAndValue.substring(0,eqidx);if(attrName==paramName){attribAndValue=attrName+'='+encodeURIComponent(paramValue)}else if(attrName=='f'){var attrValue='';var eqidx=attribAndValue.indexOf('=');if(eqidx!=-1)attrValue=attribAndValue.substring(eqidx+1);attribAndValue=attrName+'='+encodeURIComponent(_replaceUrlParam(decodeURIComponent((attrValue+'').replace(/\+/g,'%20')),paramName,paramValue))}return attribAndValue}function addToArray(arr,element){arr.push(element)};function removeFromArray(arr,element){return arr.filter(function(arrValue){return arrValue!==element})};function areArraysEqual(a,b){return Array.isArray(a)&&Array.isArray(b)&&a.length===b.length&&a.every(function(val,index){return val===b[index]})}function removeBackslashFromString(string){return string.replace(/\\/g,'')};function isIE11(){return /Trident.*rv[ :]*11\./.test(navigator.userAgent)}function matchMedia(query){var mqlList=window.matchMedia(query);return mqlList.matches}function stringReplacement(data,string,replacementChar){var dataString=typeof tags==='Array'?data.join(','):data;var splitString=string.split(replacementChar);splitString[0]=splitString[0]+dataString;return splitString.join('')}module.exports={toggleInnerText:toggleInnerText,preventDoubleSubmit:preventDoubleSubmit,disableButton:disableButton,disableButtons:disableButtons,enableButtons:enableButtons,findAllChildrenWithClass:findAllChildrenWithClass,checkIfElementIsWithinViewport:checkIfElementIsWithinViewport,determineCurrentPictureElementSrc:determineCurrentPictureElementSrc,copyToClipboard:copyToClipboard,replacePageUrlParam:replacePageUrlParam,addToArray:addToArray,removeFromArray:removeFromArray,areArraysEqual:areArraysEqual,removeBackslashFromString:removeBackslashFromString,isIE11:isIE11,matchMedia:matchMedia,stringReplacement:stringReplacement,_replaceUrlParamOnAttribute:_replaceUrlParamOnAttribute};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(10);
var dPs = __webpack_require__(111);
var enumBugKeys = __webpack_require__(50);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(45)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(70).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(47);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(114);
var global = __webpack_require__(4);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(27);
var TO_STRING_TAG = __webpack_require__(6)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function camelCaseHyphenatedString(input){return input.toLowerCase().replace(/-(.)/g,function(match,group1){return group1.toUpperCase()})}var getNumAndUnitsFromString=function getNumAndUnitsFromString(string){var returnVal={};if(typeof string=='string'){var arrMatch=string.match(/^(\d+)(.*)$/);if(arrMatch&&arrMatch.length==3){returnVal={number:parseInt(arrMatch[1]),units:arrMatch[2],string:arrMatch[0]}}}return returnVal};module.exports={camelCaseHyphenatedString:camelCaseHyphenatedString,getNumAndUnitsFromString:getNumAndUnitsFromString};

/***/ }),
/* 41 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(43)('keys');
var uid = __webpack_require__(33);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(2);
var global = __webpack_require__(4);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(22) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(5);
var core = __webpack_require__(2);
var fails = __webpack_require__(16);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var document = __webpack_require__(4).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(8);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(68);
var hide = __webpack_require__(13);
var Iterators = __webpack_require__(27);
var $iterCreate = __webpack_require__(110);
var setToStringTag = __webpack_require__(30);
var getPrototypeOf = __webpack_require__(66);
var ITERATOR = __webpack_require__(6)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(29);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(6);


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(33)('meta');
var isObject = __webpack_require__(8);
var has = __webpack_require__(15);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(16)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(22);
var wksExt = __webpack_require__(51);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 54 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(37);
var createDesc = __webpack_require__(24);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(46);
var has = __webpack_require__(15);
var IE8_DOM_DEFINE = __webpack_require__(67);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(9) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {



/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(12);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(129);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Card=function(){function Card(initiatorId,componentId,eventTypes,common,manager,options){(0,_classCallCheck3.default)(this,Card);this.initiator=document.getElementById(initiatorId);this.component=document.getElementById(componentId);this.eventTypes=eventTypes;this.common=common;this.manager=manager||null;this.options=options||{};this.debug=this.options.debug||false;this.openCloseIconObject=this.options.openCloseIconObject||null;this.componentWrapper=this.component.parentNode;this.visible=false;this.init()}(0,_createClass3.default)(Card,[{key:'init',value:function init(){this.common.events.eventListenerUtility(this.initiator,this.eventTypes,this.toggleComponent.bind(this));if(this.componentWrapper.style.position===''||this.componentWrapper.style.position==='static'||this.componentWrapper.style.position===undefined){this.componentWrapper.style.position='relative'}if(this.debug){console.log('this.componentWrapper.style.position = ',this.componentWrapper.style.position)}}},{key:'setListeners',value:function setListeners(){this.common.events.eventListenerUtility(window,this.eventTypes,this.closeComponent.bind(this),true)}},{key:'closeComponent',value:function closeComponent(){this.component.style.display='none';this.visible=false;if(this.openCloseIconObject!==null){this.toggleOpenCloseIcon()}if(this.debug){console.log('component is closed')}}},{key:'openComponent',value:function openComponent(){this.component.style.display='block';this.visible=true;if(this.openCloseIconObject!==null){this.toggleOpenCloseIcon()}if(this.debug){console.log('component is open')}}},{key:'toggleComponent',value:function toggleComponent(evt){evt.stopPropagation();if(this.debug){console.log('toggleComponent, event = ',evt);console.log('this.visible = ',this.visible)}if(this.visible){this.closeComponent(evt)}else{if(this.manager!==null){this.manager.manageEvent(this.closeComponent.bind(this))}this.setListeners();this.setComponentPosition();this.openComponent()}}},{key:'toggleOpenCloseIcon',value:function toggleOpenCloseIcon(){var openCloseIcon=document.getElementById(this.openCloseIconObject.nodeId);var openCloseValue=this.visible?'openValue':'closeValue';var isIconClass=false;var strIconClass=this.openCloseIconObject[openCloseValue].replace(/^\s*/,'');if(strIconClass.match(/^[a-z0-9-]+$/)){strIconClass=strIconClass.substring(0,9)=='dts-icon-'?strIconClass:'dts-icon-'+strIconClass;isIconClass=true}if(isIconClass){openCloseIcon.innerHTML='<i class="'+strIconClass+'" ></i>'}else{openCloseIcon.innerHTML=this.openCloseIconObject[openCloseValue]}}},{key:'setComponentPosition',value:function setComponentPosition(){var initiatorBoundingRect=this.initiator.getBoundingClientRect();var viewportDimensions=this.common.dom.getViewportDimensions();var componentDimensions=this.common.dom.getElementDimensionsLite(this.component);var positionFit={top:initiatorBoundingRect.top-componentDimensions.height>=0,bottom:initiatorBoundingRect.bottom+componentDimensions.height<=viewportDimensions.height,left:initiatorBoundingRect.left-componentDimensions.width>=0,right:initiatorBoundingRect.right+componentDimensions.width<=viewportDimensions.width,horizontal:componentDimensions.height<=viewportDimensions.height,vertical:componentDimensions.width<=viewportDimensions.width};var viewportCenter={x:viewportDimensions.width/2,y:viewportDimensions.height/2};var initiatorCenter={x:initiatorBoundingRect.width/2+initiatorBoundingRect.left,y:initiatorBoundingRect.height/2+initiatorBoundingRect.top};var initiatorViewPortPosition={x:initiatorCenter.x<=viewportCenter.x?'left':'right',y:initiatorCenter.y<=viewportCenter.y?'top':'bottom'};this.component.style.left='auto';this.component.style.right='auto';this.component.style.top='auto';this.component.style.bottom='auto';if(this.options.componentPosition===undefined){if(initiatorViewPortPosition.y==='top'&&initiatorViewPortPosition.x==='left'){if(positionFit.bottom&&positionFit.horizontal){this.component.style.top=initiatorBoundingRect.height+'px';var i=0;var initiatorLeftPlusComponentWidth=initiatorBoundingRect.left+componentDimensions.width;while(initiatorLeftPlusComponentWidth-i>viewportDimensions.width){i++}this.component.style.left=-i+'px'}else if(positionFit.right&&positionFit.vertical){this.component.style.left=initiatorBoundingRect.width+'px';var _i=0;var initiatorTopPlusComponentHeight=initiatorBoundingRect.top+componentDimensions.height;while(initiatorTopPlusComponentHeight-_i>viewportDimensions.height){_i++}this.component.style.top=-_i+'px'}else{}}if(initiatorViewPortPosition.y==='top'&&initiatorViewPortPosition.x==='right'){if(positionFit.bottom&&positionFit.horizontal){this.component.style.top=initiatorBoundingRect.height+'px';var _i2=0;var initiatorRightMinusComponentWidth=initiatorBoundingRect.right-componentDimensions.width;while(initiatorRightMinusComponentWidth+_i2<0){_i2++}this.component.style.right=-_i2+'px'}else if(positionFit.left&&positionFit.vertical){this.component.style.right=initiatorBoundingRect.width+'px';var _i3=0;var _initiatorTopPlusComponentHeight=initiatorBoundingRect.top+componentDimensions.height;while(_initiatorTopPlusComponentHeight-_i3>viewportDimensions.height){_i3++}this.component.style.top=-_i3+'px'}else{}}if(initiatorViewPortPosition.y==='bottom'&&initiatorViewPortPosition.x==='right'){if(positionFit.top&&positionFit.horizontal){this.component.style.bottom=initiatorBoundingRect.height+'px';var _i4=0;var _initiatorRightMinusComponentWidth=initiatorBoundingRect.right-componentDimensions.width;while(_initiatorRightMinusComponentWidth+_i4<0){_i4++}this.component.style.right=-_i4+'px'}else if(positionFit.left&&positionFit.vertical){this.component.style.right=initiatorBoundingRect.width+'px';var _i5=0;var InitiatorBottomMinusComponentHeight=initiatorBoundingRect.bottom-componentDimensions.height;while(InitiatorBottomMinusComponentHeight+_i5<0){_i5++}this.component.style.bottom=-_i5+'px'}else{}}if(initiatorViewPortPosition.y==='bottom'&&initiatorViewPortPosition.x==='left'){if(positionFit.top&&positionFit.horizontal){this.component.style.bottom=initiatorBoundingRect.height+'px';var _i6=0;var _initiatorLeftPlusComponentWidth=initiatorBoundingRect.left+componentDimensions.width;while(_initiatorLeftPlusComponentWidth-_i6>viewportDimensions.width){_i6++}this.component.style.left=-_i6+'px'}else if(positionFit.right&&positionFit.vertical){this.component.style.left=initiatorBoundingRect.width+'px';var _i7=0;var inititatorBottomMinusComponentHeight=initiatorBoundingRect.bottom-componentDimensions.height;while(inititatorBottomMinusComponentHeight+_i7<0){_i7++}this.component.style.bottom=-_i7+'px'}else{}}}else{if(this.options.componentPosition==='bottom'){this.component.style.top=initiatorBoundingRect.height+2+'px';if(this.options.defaultPositioning===undefined){if(initiatorViewPortPosition.x==='left'){this.component.style.left=0}else{this.component.style.right=0}}return}if(this.options.componentPosition==='top'){this.component.style.bottom=initiatorBoundingRect.height+'px';if(this.options.defaultPositioning===undefined){if(initiatorViewPortPosition.x==='left'){this.component.style.left=0}else{this.component.style.right=0}}return}if(this.options.componentPosition==='left'){this.component.style.right=initiatorBoundingRect.width+'px';if(this.options.defaultPositioning===undefined){if(initiatorViewPortPosition.y==='top'){this.component.style.top=0}else{this.component.style.bottom=0}}return}if(this.options.componentPosition==='right'){this.component.style.left=initiatorBoundingRect.width+'px';if(this.options.defaultPositioning===undefined){if(initiatorViewPortPosition.y==='top'){this.component.style.top=0}else{this.component.style.bottom=0}}return}}if(this.debug){console.log('initiatorBoundingRect = ',initiatorBoundingRect);console.log('viewportDimensions = ',viewportDimensions);console.log('componentDimensions = ',componentDimensions)}}},{key:'initiatorNode',get:function get(){return this.initiator}},{key:'componentNode',get:function get(){return this.component}}]);return Card}();module.exports={Card:Card};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(139), __esModule: true };

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(29);
var TAG = __webpack_require__(6)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(60);
var ITERATOR = __webpack_require__(6)('iterator');
var Iterators = __webpack_require__(27);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(23);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(13);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _cookie=__webpack_require__(94);var cookie=_interopRequireWildcard(_cookie);var _css=__webpack_require__(95);var css=_interopRequireWildcard(_css);var _dom=__webpack_require__(96);var dom=_interopRequireWildcard(_dom);var _strings=__webpack_require__(40);var strings=_interopRequireWildcard(_strings);var _xhr=__webpack_require__(97);var xhr=_interopRequireWildcard(_xhr);var _events=__webpack_require__(98);var events=_interopRequireWildcard(_events);var _queueControl=__webpack_require__(99);var _queueControl2=_interopRequireDefault(_queueControl);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}module.exports={cookie:cookie,css:css,dom:dom,strings:strings,xhr:xhr,events:events,Queue_Control:_queueControl2.default.Queue_Control};

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(15);
var toObject = __webpack_require__(14);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(9) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(45)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(13);


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(15);
var toIObject = __webpack_require__(18);
var arrayIndexOf = __webpack_require__(112)(false);
var IE_PROTO = __webpack_require__(42)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(4).document;
module.exports = document && document.documentElement;


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(29);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(69);
var hiddenKeys = __webpack_require__(50).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var arrCarousels=[];function add(objCarousel){arrCarousels.push(objCarousel)}function pauseCarousels(){arrCarousels.forEach(function(objCarousel){objCarousel.pause()})}function resumeCarousels(){arrCarousels.forEach(function(objCarousel){objCarousel.resume()})}module.exports={add:add,pauseCarousels:pauseCarousels,resumeCarousels:resumeCarousels};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _dtsModal=__webpack_require__(20);var _helpers=__webpack_require__(32);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var VRDirectModal=function(_DtsModal){(0,_inherits3.default)(VRDirectModal,_DtsModal);function VRDirectModal(mediaUrl){var _this;(0,_classCallCheck3.default)(this,VRDirectModal);return _this=(0,_possibleConstructorReturn3.default)(this,(VRDirectModal.__proto__||(0,_getPrototypeOf2.default)(VRDirectModal)).call(this,null,{html:"\t\t\t\n\t\t\t<section id=\"dtsVRDirectModal\" class=\"dts-vr-direct-modal-content\">\n\t\t\t\t<div>\n\t\t\t\t\t<h1 class=\"dts-page-title\">VR Media URL</h1>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"dts-form-field-container\">\n\t\t\t\t\t<label for=\"dtsVRDirectModalCopyTarget\" class=\"dts-form-field-label\">Copy this URL to use with your chosen application:</label>\n\t\t\t\t\t<input id=\"dtsVRDirectModalCopyTarget\" class=\"dts-settings-input\" type=\"text\" value=\""+mediaUrl+"\" readOnly/>\n\t\t\t\t\t<button id=\"dtsVRDirectModalCloseButton\" class=\"dts-link-button\" type=\"button\">Cancel</button>\n\t\t\t\t\t<button id=\"dtsVRDirectModalCopyButton\" class=\"dts-link-button\" type=\"button\">Copy</button>\n\t\t\t\t\t<button id=\"dtsVRDirectModalOpenButton\" class=\"dts-link-button\" type=\"\"button\">Open in Default Browser</button>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t\t",disableDefaultCloser:true,removeDefaultContentStyles:true,closers:["dtsVRDirectModalCloseButton"],postProcess:function postProcess(){var elCopyButton=_this.modalContent.querySelector("#dtsVRDirectModalCopyButton");elCopyButton.addEventListener("click",function(){(0,_helpers.copyToClipboard)(_this.modalContent.querySelector("#dtsVRDirectModalCopyTarget"));_this.close()});var elDirectPlayButton=_this.modalContent.querySelector("#dtsVRDirectModalOpenButton");elDirectPlayButton.addEventListener("click",function(){window.open(mediaUrl,"Video Player");_this.close()})}}))}return VRDirectModal}(_dtsModal.DtsModal);module.exports={VRDirectModal:VRDirectModal};

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(10);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(27);
var ITERATOR = __webpack_require__(6)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(10);
var aFunction = __webpack_require__(23);
var SPECIES = __webpack_require__(6)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(11);
var invoke = __webpack_require__(141);
var html = __webpack_require__(70);
var cel = __webpack_require__(45);
var global = __webpack_require__(4);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(29)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var isObject = __webpack_require__(8);
var newPromiseCapability = __webpack_require__(63);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var core = __webpack_require__(2);
var dP = __webpack_require__(7);
var DESCRIPTORS = __webpack_require__(9);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(6)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(150), __esModule: true };

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _scrollIntoView=__webpack_require__(181);var _scrollIntoView2=_interopRequireDefault(_scrollIntoView);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}module.exports={scrollIntoView:_scrollIntoView2.default};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(187), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(38);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var AutoComplete=function(){function AutoComplete(inputId,values,options){(0,_classCallCheck3.default)(this,AutoComplete);this.input=document.getElementById(inputId);this.array=values.split(',');this.callback=options?options.callback:null;this.stopAutoComplete=options?options.stopAutoComplete:false;this.currentFocus;this.isModal=false;this.input.addEventListener('input',this.showAutoComplete.bind(this),false);this.input.addEventListener('keydown',this.keyAction.bind(this),false);this.input.addEventListener('blur',this.closeAllLists.bind(this),false);document.addEventListener('click',this.closeAllLists.bind(this),false)}(0,_createClass3.default)(AutoComplete,[{key:'showAutoComplete',value:function showAutoComplete(){var _this=this;var autoCompleteWrapper=void 0;var autoCompleteItem=void 0;var inputValue=this.input.value;this.closeAllLists();if(!inputValue||this.stopAutoComplete){return false}this.currentFocus=-1;autoCompleteWrapper=document.createElement('div');autoCompleteWrapper.setAttribute('id','dts'+this.input.id+'AutoCompleteList');autoCompleteWrapper.setAttribute('class','dts-autocomplete-items');this.input.parentNode.appendChild(autoCompleteWrapper);var _loop=function _loop(i){var indexModifier=inputValue.substring(0,1)==='#'?1:0;var compareItem=_this.array[i].substring(0,inputValue.length-indexModifier);var compareInput=inputValue.substring(indexModifier,inputValue.length+indexModifier);if(compareItem.toUpperCase()===compareInput.toUpperCase()){autoCompleteItem=document.createElement('div');autoCompleteItem.innerHTML='#<span class="dts-autocomplete-char-match">'+_this.array[i].substring(0,inputValue.length)+'</span>';autoCompleteItem.innerHTML+=_this.array[i].substring(inputValue.length);autoCompleteItem.addEventListener('click',function(evt){if(_this.callback!==null){_this.callback(_this.array[i])}else{_this.input.value=_this.array[i]}_this.closeAllLists();_this.input.value=''});if(compareInput!==''){autoCompleteWrapper.appendChild(autoCompleteItem)}}};for(var i=0;i<this.array.length;i++){_loop(i)}if(this.isModal){this.setPosition(autoCompleteWrapper)}}},{key:'keyAction',value:function keyAction(evt){var listOfItems=void 0;var autoCompleteWrapper=document.getElementById('dts'+this.input.id+'AutoCompleteList');if(autoCompleteWrapper){listOfItems=autoCompleteWrapper.getElementsByTagName('div')}if(evt.keyCode==40){this.currentFocus++;this.setActive(listOfItems)}else if(evt.keyCode==38){this.currentFocus--;this.setActive(listOfItems)}else if(evt.keyCode==13){evt.preventDefault();if(this.currentFocus>-1){if(listOfItems)listOfItems[this.currentFocus].click()}}}},{key:'setActive',value:function setActive(list){if(!list)return false;this.removeActive(list);if(this.currentFocus>=list.length)this.currentFocus=0;if(this.currentFocus<0)this.currentFocus=list.length-1;list[this.currentFocus].classList.add('dts-autocomplete-active');list[this.currentFocus].scrollIntoView({block:'end'})}},{key:'removeActive',value:function removeActive(list){for(var i=0;i<list.length;i++){list[i].classList.remove('dts-autocomplete-active')}}},{key:'closeAllLists',value:function closeAllLists(evt){var node=void 0;var autoCompleteItems=document.getElementsByClassName('dts-autocomplete-items');if(evt){node=evt.target}for(var i=0;i<autoCompleteItems.length;i++){if(node!=autoCompleteItems[i]&&node!=this.input){autoCompleteItems[i].parentNode.removeChild(autoCompleteItems[i])}}}},{key:'setPosition',value:function setPosition(wrapper){var wrapperDimensions=wrapper.getBoundingClientRect();if(window.innerHeight<wrapperDimensions.top+wrapperDimensions.height){wrapper.style.top='auto';wrapper.style.bottom='109%'}wrapper.style.boxShadow='0 0 3px rgba(0,0,0,0.5)'}}]);return AutoComplete}();module.exports={AutoComplete:AutoComplete};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(93);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);var _delivery=__webpack_require__(138);var delivery=_interopRequireWildcard(_delivery);var _search=__webpack_require__(149);var search=_interopRequireWildcard(_search);var _shopping=__webpack_require__(152);var shopping=_interopRequireWildcard(_shopping);var _utility=__webpack_require__(153);var utility=_interopRequireWildcard(_utility);var _notifications=__webpack_require__(169);var notifications=_interopRequireWildcard(_notifications);var _detailBoxcover=__webpack_require__(170);var detailBoxcover=_interopRequireWildcard(_detailBoxcover);var _dtsCarousel=__webpack_require__(171);var _messages=__webpack_require__(176);var _messages2=_interopRequireDefault(_messages);var _promo=__webpack_require__(180);var promotions=_interopRequireWildcard(_promo);var _thirdParty=__webpack_require__(87);var thirdParty=_interopRequireWildcard(_thirdParty);var _scenePurchase=__webpack_require__(182);var _previewLimitModal=__webpack_require__(183);var _dtsModalVrDirect=__webpack_require__(77);var _FilterSubMenu=__webpack_require__(184);var _FilterMenuManager=__webpack_require__(185);var _tagManagement=__webpack_require__(186);var _dtsModal=__webpack_require__(20);var _dtsModalError=__webpack_require__(201);var _dtsModalScene=__webpack_require__(202);var _tagModalManager=__webpack_require__(203);var _photoswipe=__webpack_require__(204);var _photoswipeUiDefault=__webpack_require__(205);var _dtsModalQuickBuy=__webpack_require__(206);var _PanningIcons=__webpack_require__(207);var _mobileNavigationBehavior=__webpack_require__(208);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}var TAG_XPASS=55001;module.exports={dts:dts,delivery:delivery,search:search,shopping:shopping,utility:utility,notifications:notifications,detailBoxcover:detailBoxcover,Carousel:_dtsCarousel.Carousel,promotions:promotions,thirdParty:thirdParty,ScenePurchase:_scenePurchase.ScenePurchase,messages:_messages2.default,PreviewLimitModal:_previewLimitModal.PreviewLimitModal,VRDirectModal:_dtsModalVrDirect.VRDirectModal,FilterSubMenu:_FilterSubMenu.FilterSubMenu,FilterMenuManager:_FilterMenuManager.FilterMenuManager,TagManagement:_tagManagement.TagManagement,DtsModal:_dtsModal.DtsModal,DtsErrorModal:_dtsModalError.DtsErrorModal,DtsSceneModal:_dtsModalScene.DtsSceneModal,TagModalManager:_tagModalManager.TagModalManager,PhotoSwipe:_photoswipe.PhotoSwipe,PhotoSwipeUI_Default:_photoswipeUiDefault.PhotoSwipeUI_Default,DtsModalQuickBuy:_dtsModalQuickBuy.DtsModalQuickBuy,PanningIconsControl:_PanningIcons.PanningIconsControl,TAG_XPASS:TAG_XPASS,MobileNavigationBehavior:_mobileNavigationBehavior.MobileNavigationBehavior};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _stringify=__webpack_require__(21);var _stringify2=_interopRequireDefault(_stringify);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function readCookie(cookieName){var cookieVal=new RegExp(cookieName+'=([^;]*)').exec(document.cookie);return Array.isArray(cookieVal)&&cookieVal.length>1?cookieVal[1]:null}function writeCookie(cookieName,value,expiresInDays){if(expiresInDays){var d=new Date;d.setTime(d.getTime()+expiresInDays*86400000);var expirationStr=d.toUTCString();document.cookie=cookieName+'='+value+'; path=/; expires='+expirationStr+';'}else{document.cookie=cookieName+'='+value+'; path=/;'}}function deleteCookie(cookieName){document.cookie=cookieName+'=; max-age=-1; path=/;'}function readConfigCookie(cookieName){var ca=document.cookie.split(';');var cValues='';for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)===' '){c=c.substring(1)}if(c.indexOf(cookieName+'=')==0){cValues=c.substring(cookieName.length+1,c.length);break}}var config={};if(cValues!==''){try{config=JSON.parse(cValues)}catch(e){console.error(e)}}return config}function writeConfigCookie(cookieName,config){var d=new Date;d.setTime(d.getTime()+9999*24*60*60*1000);var expires='expires='+d.toUTCString();var cat=(0,_stringify2.default)(config);document.cookie=cookieName+'='+cat+'; '+expires+'; path=/'}module.exports={readCookie:readCookie,writeCookie:writeCookie,deleteCookie:deleteCookie,readConfigCookie:readConfigCookie,writeConfigCookie:writeConfigCookie};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _strings=__webpack_require__(40);function removeAllClasses(el){el.className=''}function replaceClass(el,oldClass,newClass){if(el.classList.contains(oldClass)){el.classList.remove(oldClass);el.classList.add(newClass)}}function addRemoveClassName(node,className){if(node.classList.contains(className)){node.classList.remove(className)}else{node.classList.add(className)}}var getOffsetLeft=function getOffsetLeft(elem,ancestor,offset){var offsetLeftElement=elem.getBoundingClientRect().left;var offsetLeftAncestor=ancestor.getBoundingClientRect().left;if(offset===undefined){offset=0}return Math.round(offsetLeftElement-offsetLeftAncestor-offset)};var getPrefixCSSProperty=function getPrefixCSSProperty(propertyName){var prefixedPropName;var vendorPrefixes=['','ms','Moz','Webkit','O'];var tempDiv=document.createElement('div');for(var i=0;i<vendorPrefixes.length;++i){if(vendorPrefixes[i]===''){prefixedPropName=propertyName}else{prefixedPropName=vendorPrefixes[i]+propertyName.substr(0,1).toUpperCase+propertyName.substr(1)}if(typeof tempDiv.style[prefixedPropName]!='undefined'){return prefixedPropName}}return null};var getClassValue=function getClassValue(cssIdentifierString,selector,propertyName){for(var x=0;x<document.styleSheets.length;x++){if(document.styleSheets[x].href!==null&&document.styleSheets[x].href.indexOf(cssIdentifierString)>0){var classes=document.styleSheets[x].rules||document.styleSheets[x].cssRules||[];for(var j=0;j<classes.length;j++){if(classes[j].selectorText!=undefined&&classes[j].selectorText.indexOf(selector)>=0&&classes[j].selectorText===selector){var jsStyleClassProp=(0,_strings.camelCaseHyphenatedString)(propertyName);return classes[j].style[jsStyleClassProp]}}}}};function applyStyles(element,styleObject){for(var prop in styleObject){element.style[prop]=styleObject[prop]}}module.exports={removeAllClasses:removeAllClasses,replaceClass:replaceClass,addRemoveClassName:addRemoveClassName,getOffsetLeft:getOffsetLeft,getPrefixCSSProperty:getPrefixCSSProperty,getClassValue:getClassValue,applyStyles:applyStyles};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _strings=__webpack_require__(40);function getViewportDimensions(){var viewportWidth=document.documentElement.clientWidth;var viewportHeight=document.documentElement.clientHeight;return{width:viewportWidth,height:viewportHeight}}function getElementDimensionsLite(el){var boundingClientRect=void 0;if(el.style.display==='none'){var styles=el.style;var position=styles.position;var left=styles.left;styles.position='absolute';styles.left=-99999;styles.display='block';boundingClientRect=el.getBoundingClientRect();styles.position=position;styles.left=left;styles.display='none'}else{boundingClientRect=el.getBoundingClientRect()}return boundingClientRect}function getElementDimensions(el,displayTypeOrClass){var dimensions={};var hdden=!(el.offsetWidth||el.offsetHeight);if(hdden){var displayType='block';if(displayTypeOrClass){if(displayTypeOrClass=='block'||displayTypeOrClass=='flex'||displayTypeOrClass=='inline'||displayTypeOrClass=='inline-block'){displayType=displayTypeOrClass}else{}}var origDisplay=el.style.display;var origOpacity=el.style.opacity;var origBoxSizing=el.style.boxSizing;el.style.opacity=0;el.style.display=displayType;el.style.boxSizing='border-box'}dimensions.width=el.offsetWidth;dimensions.height=el.offsetHeight;var computedStyle=window.getComputedStyle(el);if(hdden){el.style.display=origDisplay;el.style.opacity=origOpacity;el.style.boxSizing=origBoxSizing}dimensions.paddingBottom=(0,_strings.getNumAndUnitsFromString)(computedStyle.paddingBottom).number;dimensions.paddingLeft=(0,_strings.getNumAndUnitsFromString)(computedStyle.paddingLeft).number;dimensions.paddingRight=(0,_strings.getNumAndUnitsFromString)(computedStyle.paddingRight).number;dimensions.paddingTop=(0,_strings.getNumAndUnitsFromString)(computedStyle.paddingTop).number;dimensions.borderBottomWidth=(0,_strings.getNumAndUnitsFromString)(computedStyle.borderBottomWidth).number;dimensions.borderLeftWidth=(0,_strings.getNumAndUnitsFromString)(computedStyle.borderLeftWidth).number;dimensions.borderRightWidth=(0,_strings.getNumAndUnitsFromString)(computedStyle.borderRightWidth).number;dimensions.borderTopWidth=(0,_strings.getNumAndUnitsFromString)(computedStyle.borderTopWidth).number;dimensions.marginBottom=(0,_strings.getNumAndUnitsFromString)(computedStyle.marginBottom).number;dimensions.marginLeft=(0,_strings.getNumAndUnitsFromString)(computedStyle.marginLeft).number;dimensions.marginRight=(0,_strings.getNumAndUnitsFromString)(computedStyle.marginRight).number;dimensions.marginTop=(0,_strings.getNumAndUnitsFromString)(computedStyle.marginTop).number;dimensions.outerWidth=dimensions.width+dimensions.paddingLeft+dimensions.paddingRight+dimensions.borderLeftWidth+dimensions.borderRightWidth+dimensions.marginLeft+dimensions.marginRight;dimensions.outerHeight=dimensions.height+dimensions.paddingBottom+dimensions.paddingTop+dimensions.borderBottomWidth+dimensions.borderTopWidth+dimensions.marginBottom+dimensions.marginTop;return dimensions}function getParentNode(currentNode,selector){if(!Element.prototype.matches){Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector}if(!Element.prototype.closest){Element.prototype.closest=function(s){var el=this;if(!document.documentElement.contains(el)){return null}do{if(el.matches(s))return el;el=el.parentElement!==undefined?el.parentElement:el.parentNode}while(el!==null);return null}}return currentNode.closest(selector)}function scrollbarsVisible(node){var scrollbars={horizontal:false,vertical:false};if(node.scrollWidth>node.clientWidth){scrollbars.horizontal.visible=true}if(node.scrollHeight>node.clientHeight){scrollbars.vertical.visible=true}return scrollbars}function returnArrayFromList(list){return[].slice.call(list)}module.exports={getViewportDimensions:getViewportDimensions,getElementDimensionsLite:getElementDimensionsLite,getElementDimensions:getElementDimensions,getParentNode:getParentNode,scrollbarsVisible:scrollbarsVisible,returnArrayFromList:returnArrayFromList};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function encodeParamMap(map){var formData="";for(var property in map){if(map.hasOwnProperty(property)){var value=map[property];if(value){if(formData.length>0){formData=formData+"&"}formData=formData+property+"="+encodeURIComponent(value)}}}return formData}function get(url,asyncFlag,callback,errorCallback){var xmlHttpRequest=new XMLHttpRequest;xmlHttpRequest.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var result;try{result=JSON.parse(this.responseText)}catch(e){result=this.responseText}if(callback){callback(this.status,result)}}else{if(errorCallback){errorCallback(this)}else{console.error("xmlHttpRequest GET Error: ",this.responseText)}}}};xmlHttpRequest.onerror=function(){if(errorCallback){errorCallback(this)}else{console.error("xmlHttpRequest GET Error: ",this.responseText)}};xmlHttpRequest.open("GET",url,asyncFlag);xmlHttpRequest.send();return xmlHttpRequest}function post(url,data,asyncFlag,callback,errorCallback){var xmlHttpRequest=new XMLHttpRequest;xmlHttpRequest.onreadystatechange=function(){if(this.readyState==4){if(this.status==200){var result;try{result=JSON.parse(this.responseText)}catch(e){result=this.responseText}if(callback){callback(this.status,result)}}else{if(errorCallback){errorCallback(this)}else{console.error("XMLHttpRequest POST Error: ",this.responseText)}}}};xmlHttpRequest.onerror=function(){if(errorCallback){errorCallback(this)}else{console.error("XMLHttpRequest POST Error: ",this.responseText)}};xmlHttpRequest.open("POST",url,asyncFlag);xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");xmlHttpRequest.send(encodeParamMap(data));return xmlHttpRequest}module.exports={encodeParamMap:encodeParamMap,get:get,post:post};

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var throttle=function throttle(e,method,scope,timeOut){clearTimeout(method._tId);method._tId=setTimeout(function(){method.call(scope,e)},timeOut)};function eventListenerUtility(node,eventNames,func,once){var callback=function callback(evt){var names=eventNames;var element=node;var onceAndDone=once||false;func(evt);if(onceAndDone){unSetEventListener(element,names,callback)}};setEventListener(node,eventNames,callback)}function unSetEventListener(node,eventNames,func){eventNames.forEach(function(name){node.removeEventListener(name,func)})}function setEventListener(node,eventNames,func){eventNames.forEach(function(name){node.addEventListener(name,func)})}function mediaQueryListenerUtility(testQuery,trueOperation,falseOperation){var mql=window.matchMedia(testQuery);var callback=function callback(mql){'use strict';if(mql.matches){trueOperation()}else{if(falseOperation!==undefined&&typeof falseOperation==='function'){falseOperation()}}};mql.addListener(callback);callback(mql)}function createNewEvent(eventName,bubbles,cancelable){if(typeof Event==='function'){return new Event(eventName,{bubbles:bubbles,cancelable:cancelable})}else{var event=document.createEvent('Event');event.initEvent(eventName,true,true);return event}}module.exports={throttle:throttle,eventListenerUtility:eventListenerUtility,mediaQueryListenerUtility:mediaQueryListenerUtility,createNewEvent:createNewEvent};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var Queue_Control={simulateMouseTouchDragging:false,scrollSpeed:1,initQueue:function initQueue(queueIdOrElement){var queueContainer;if(typeof queueIdOrElement==="string")queueContainer=document.getElementById(queueIdOrElement);else queueContainer=queueIdOrElement;if(queueContainer){if(Queue_Control._hasClass(queueContainer,"queue_control_wrapper")){console.error("Queue already initialized.");return}if(Queue_Control.simulateMouseTouchDragging)queueContainer.addEventListener("dragstart",function(e){e.preventDefault()},false);queueContainer.className+=" queue_control_wrapper";queueContainer.isAndroid=/(android)/i.test(navigator.userAgent);queueContainer.isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);queueContainer.isFirefox=/(firefox)/i.test(navigator.userAgent);queueContainer.leftScrollButton=document.createElement("div");queueContainer.leftScrollButton.addEventListener("click",function(){Queue_Control._leftScrollQueue(queueContainer)});queueContainer.leftScrollButton.className="queue_control_left_arrow queue_control_button_disabled";queueContainer.leftScrollButton.innerHTML="<svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\"><path d=\"m 8.297,11.719 6,6 1.406,-1.406 -4.594,-4.594 4.594,-4.594 -1.406,-1.406 z\" /></svg>";queueContainer.rightScrollButton=document.createElement("div");queueContainer.rightScrollButton.className="queue_control_right_arrow queue_control_button_enabled";queueContainer.rightScrollButton.addEventListener("click",function(){Queue_Control._rightScrollQueue(queueContainer)});queueContainer.rightScrollButton.innerHTML="<svg viewBox=\"0 0 24 24\" width=\"100%\" height=\"100%\"><path d=\"m 15.703,11.719 -6,6 L 8.297,16.313 12.891,11.719 8.297,7.125 9.703,5.719 Z\" /></svg>";queueContainer.scrollingContainer=document.createElement("div");queueContainer.scrollingContainer.className="queue_control_container";queueContainer.scrollingContainer.animateTimerId=-1;queueContainer.scrollingContainer.addEventListener("scroll",function(e){Queue_Control._checkLeftRightEnabled(queueContainer)});window.addEventListener("resize",function(e){Queue_Control._checkLeftRightEnabled(queueContainer)});queueContainer.elementContainer=document.createElement("div");queueContainer.elementContainer.className="queue_control_element_holder";while(queueContainer.children.length>0){var child=queueContainer.children[0];queueContainer.elementContainer.appendChild(child);child.className+=" queue_control_element"}queueContainer.scrollingContainer.appendChild(queueContainer.elementContainer);queueContainer.appendChild(queueContainer.leftScrollButton);queueContainer.appendChild(queueContainer.scrollingContainer);queueContainer.appendChild(queueContainer.rightScrollButton);queueContainer.scrollingContainer.lastMouseX=-1;queueContainer.scrollingContainer.lastVelocityTime=0;queueContainer.scrollingContainer.lastVelocityX=-1;queueContainer.scrollingContainer.lastVelocity=-1;queueContainer.dragState=0;queueContainer.scrollingContainer.addEventListener("touchstart",function(e){if(queueContainer.isFirefox&&queueContainer.isAndroid){if(e.touches!==undefined&&e.touches.length>0){e.clientX=e.touches[0].clientX;e.clientY=e.touches[0].clientY;Queue_Control._mouseDown(queueContainer,e)}}});queueContainer.addEventListener("mousedown",function(e){Queue_Control._mouseDown(queueContainer,e)});queueContainer.addEventListener("mousemove",function(e){Queue_Control._mouseMove(queueContainer,e)});queueContainer.addEventListener("touchmove",function(e){if(queueContainer.isFirefox&&queueContainer.isAndroid){if(e.touches!==undefined&&e.touches.length>0){e.clientX=e.touches[0].clientX;e.clientY=e.touches[0].clientY;e.buttons=1;Queue_Control._mouseMove(queueContainer,e)}}});queueContainer.addEventListener("mouseup",function(e){Queue_Control._mouseUp(queueContainer,e)});queueContainer.addEventListener("touchend",function(e){if(queueContainer.isFirefox&&queueContainer.isAndroid){if(e.touches!==undefined&&e.touches.length>0){e.clientX=e.touches[0].clientX;e.clientY=e.touches[0].clientY;Queue_Control._mouseUp(queueContainer,e)}}});queueContainer.addEventListener("mouseout",function(e){if(Queue_Control.simulateMouseTouchDragging&&e.buttons!=0&&queueContainer.dragState==2){var tg=window.event?e.srcElement:e.target;var reltg=e.relatedTarget?e.relatedTarget:e.toElement;while(reltg&&reltg!=queueContainer&&reltg.nodeName!="BODY"){reltg=reltg.parentNode}if(reltg!=queueContainer){queueContainer.dragState=0;if(queueContainer.dummyEventListener){queueContainer.dummyEventListener.queueDragging=false;queueContainer.dummyEventListener.removeEventListener("click",Queue_Control._dummyEventHandler)}Queue_Control._stopScrollAnimation(queueContainer.scrollingContainer);queueContainer.scrollingContainer.animateTimerId=setTimeout(function(){Queue_Control._mouseScrollQueue(queueContainer.scrollingContainer)},15);queueContainer.scrollingContainer.lastMouseX=-1}}});Queue_Control._checkLeftRightEnabled(queueContainer);setTimeout(function(){Queue_Control._checkLeftRightEnabled(queueContainer)},100);setTimeout(function(){Queue_Control._checkLeftRightEnabled(queueContainer)},500);setTimeout(function(){Queue_Control._checkLeftRightEnabled(queueContainer)},1000)}},_mouseDown:function _mouseDown(queueContainer,e){if(Queue_Control._isMouseDragDisabled(e.target))return;queueContainer.dragX=e.clientX;queueContainer.dragY=e.clientY;queueContainer.dragState=1},_mouseMove:function _mouseMove(queueContainer,e){if(e.buttons!=0&&Queue_Control.simulateMouseTouchDragging){if(queueContainer.dragState==1&&Math.abs(queueContainer.dragY-e.clientY)>15){queueContainer.dragState=0}else if(queueContainer.dragState==1&&Math.abs(queueContainer.dragX-e.clientX)>25){queueContainer.dragState=2;queueContainer.dummyEventListener=e.target;queueContainer.dummyEventListener.queueDragging=true;queueContainer.dummyEventListener.addEventListener("click",Queue_Control._dummyEventHandler);queueContainer.scrollingContainer.lastMouseX=e.clientX}if(queueContainer.dragState!=2)return;e.preventDefault();var timeNow=Date.now();if(queueContainer.scrollingContainer.lastVelocityX==-1){queueContainer.scrollingContainer.lastVelocityX=e.clientX;queueContainer.scrollingContainer.lastVelocityTime=timeNow}else{if(timeNow-queueContainer.scrollingContainer.lastVelocityTime>20&&Math.abs(queueContainer.scrollingContainer.lastVelocityX-e.clientX)>5){queueContainer.scrollingContainer.lastVelocity=(queueContainer.scrollingContainer.lastVelocityX-e.clientX)/(timeNow-queueContainer.scrollingContainer.lastVelocityTime);queueContainer.scrollingContainer.lastVelocityX=e.clientX;queueContainer.scrollingContainer.lastVelocityTime=timeNow}}if(queueContainer.scrollingContainer.lastMouseX>=0){Queue_Control._stopScrollAnimation(queueContainer.scrollingContainer);var deltaX=queueContainer.scrollingContainer.lastMouseX-e.clientX;queueContainer.scrollingContainer.scrollLeft+=deltaX}queueContainer.scrollingContainer.lastMouseX=e.clientX}},_mouseUp:function _mouseUp(queueContainer,e){if(Queue_Control.simulateMouseTouchDragging&&queueContainer.dragState==2){queueContainer.dragState=0;if(queueContainer.dummyEventListener){setTimeout(function(){queueContainer.dummyEventListener.removeEventListener("click",Queue_Control._dummyEventHandler);queueContainer.dummyEventListener.queueDragging=false},200)}Queue_Control._stopScrollAnimation(queueContainer.scrollingContainer);queueContainer.scrollingContainer.animateTimerId=setTimeout(function(){Queue_Control._mouseScrollQueue(queueContainer.scrollingContainer)},15);queueContainer.scrollingContainer.lastMouseX=-1}else if(queueContainer.dummyEventListener&&queueContainer.dragState!=2){queueContainer.dummyEventListener.removeEventListener("click",Queue_Control._dummyEventHandler);queueContainer.dummyEventListener.queueDragging=false}},_dummyEventHandler:function _dummyEventHandler(event){event.preventDefault();return false},_isMouseDragDisabled:function _isMouseDragDisabled(element){if(element&&element.dataset&&element.dataset.disableMouseDrag&&element.dataset.disableMouseDrag=="1")return true;if(Queue_Control._hasClass(element,"queue_control_element_holder"))return false;if(element.parentElement)return Queue_Control._isMouseDragDisabled(element.parentElement)},_hasClass:function _hasClass(elem,classname){if(elem&&elem.className&&elem.className.split){var arr=elem.className.split(" ");if(arr.indexOf(classname)==-1)return false;return true}return false},_addClass:function _addClass(elem,classname){if(!Queue_Control._hasClass(elem,classname))elem.className+=" "+classname},_removeClass:function _removeClass(elem,classnameToRemove){if(elem&&elem.className&&elem.className.split){var newClassName="";var i;var classes=elem.className.split(" ");for(i=0;i<classes.length;i++){if(classes[i]!==classnameToRemove){if(classes[i].trim().length>0)newClassName+=classes[i]+" "}}elem.className=newClassName}},_checkLeftRightEnabled:function _checkLeftRightEnabled(queueContainer){var isSmallPhone=(queueContainer.isAndroid||queueContainer.isIOS)&&queueContainer.offsetWidth<400&&!queueContainer.isFirefox;if(isSmallPhone||queueContainer.scrollingContainer.scrollLeft<=0&&queueContainer.scrollingContainer.scrollLeft+0.5>=queueContainer.elementContainer.scrollWidth-queueContainer.offsetWidth){Queue_Control._addClass(queueContainer.leftScrollButton,"queue_control_button_hidden");Queue_Control._addClass(queueContainer.rightScrollButton,"queue_control_button_hidden")}else{Queue_Control._removeClass(queueContainer.leftScrollButton,"queue_control_button_hidden");Queue_Control._removeClass(queueContainer.rightScrollButton,"queue_control_button_hidden");if(queueContainer.scrollingContainer.scrollLeft<=0){if(Queue_Control._hasClass(queueContainer.leftScrollButton,"queue_control_button_enabled")){Queue_Control._addClass(queueContainer.leftScrollButton,"queue_control_button_disabled");Queue_Control._removeClass(queueContainer.leftScrollButton,"queue_control_button_enabled")}}else{if(Queue_Control._hasClass(queueContainer.leftScrollButton,"queue_control_button_disabled")){Queue_Control._addClass(queueContainer.leftScrollButton,"queue_control_button_enabled");Queue_Control._removeClass(queueContainer.leftScrollButton,"queue_control_button_disabled")}}if(queueContainer.scrollingContainer.scrollLeft+1>=queueContainer.elementContainer.scrollWidth-queueContainer.offsetWidth){if(Queue_Control._hasClass(queueContainer.rightScrollButton,"queue_control_button_enabled")){Queue_Control._addClass(queueContainer.rightScrollButton,"queue_control_button_disabled");Queue_Control._removeClass(queueContainer.rightScrollButton,"queue_control_button_enabled")}}else{if(Queue_Control._hasClass(queueContainer.rightScrollButton,"queue_control_button_disabled")){Queue_Control._addClass(queueContainer.rightScrollButton,"queue_control_button_enabled");Queue_Control._removeClass(queueContainer.rightScrollButton,"queue_control_button_disabled")}}}},_mouseScrollQueue:function _mouseScrollQueue(queueScrollContainer){queueScrollContainer.scrollLeft+=queueScrollContainer.lastVelocity*15;if(queueScrollContainer.lastVelocity>0){queueScrollContainer.lastVelocity-=0.2;if(queueScrollContainer.lastVelocity<=0)return}else{queueScrollContainer.lastVelocity+=0.2;if(queueScrollContainer.lastVelocity>=0)return}queueScrollContainer.animateTimerId=setTimeout(function(){Queue_Control._mouseScrollQueue(queueScrollContainer)},15)},_leftScrollQueue:function _leftScrollQueue(queueContainer){var queueElementContainerRect=queueContainer.elementContainer.getBoundingClientRect();var leftScroll=queueContainer.scrollingContainer.scrollLeft;var queueWidth=queueContainer.scrollingContainer.offsetWidth;var jumpToPosition=leftScroll-queueWidth;if(jumpToPosition<0)jumpToPosition=0;else{var jtp=jumpToPosition;for(var i=0;i<queueContainer.elementContainer.childNodes.length;++i){if(queueContainer.elementContainer.childNodes[i].nodeName=="SCRIPT")continue;if(queueContainer.elementContainer.childNodes[i].getBoundingClientRect){var childRect=queueContainer.elementContainer.childNodes[i].getBoundingClientRect();var childXPos=childRect.left-queueElementContainerRect.left;if(childXPos>=leftScroll)break;jtp=childXPos;if(childXPos>jumpToPosition){break}}}jumpToPosition=jtp}Queue_Control._scrollQueueTo(queueContainer.scrollingContainer,jumpToPosition)},_rightScrollQueue:function _rightScrollQueue(queueContainer){var queueElementContainerRect=queueContainer.elementContainer.getBoundingClientRect();var leftScroll=queueContainer.scrollingContainer.scrollLeft;var queueWidth=queueContainer.scrollingContainer.offsetWidth;var jumpToPosition=leftScroll+queueWidth;var jtp=jumpToPosition;for(var i=0;i<queueContainer.elementContainer.childNodes.length;++i){if(queueContainer.elementContainer.childNodes[i].nodeName=="SCRIPT")continue;if(queueContainer.elementContainer.childNodes[i].getBoundingClientRect){var childRect=queueContainer.elementContainer.childNodes[i].getBoundingClientRect();var childXPos=childRect.left-queueElementContainerRect.left;if(childXPos>leftScroll&&childXPos<jumpToPosition){jtp=childXPos}if(childXPos>jumpToPosition){break}}}jumpToPosition=jtp;Queue_Control._scrollQueueTo(queueContainer.scrollingContainer,jumpToPosition)},_scrollQueueTo:function _scrollQueueTo(queueScrollContainer,scrollTo){Queue_Control._stopScrollAnimation(queueScrollContainer);var scrollFrom=queueScrollContainer.scrollLeft;if(scrollFrom!=scrollTo){if(!queueScrollContainer.scrollAnimator){queueScrollContainer.scrollAnimator={};queueScrollContainer.scrollAnimator.animate=function(){queueScrollContainer.animateTimerId=setTimeout(function(){Queue_Control._scrollQueueToStep(queueScrollContainer)},15)}}queueScrollContainer.scrollAnimator.scrollFrom=scrollFrom;queueScrollContainer.scrollAnimator.scrollTo=scrollTo;queueScrollContainer.scrollAnimator.scrollDifference=scrollTo-scrollFrom;queueScrollContainer.scrollDurationMs=200/Queue_Control.scrollSpeed+Math.abs(queueScrollContainer.scrollAnimator.scrollDifference/(2*Queue_Control.scrollSpeed));queueScrollContainer.scrollStart=Date.now();queueScrollContainer.scrollAnimator.animate()}},_scrollQueueToStep:function _scrollQueueToStep(queueScrollContainer){var scrollPos=queueScrollContainer.scrollAnimator.scrollTo;var elapsedTime=Date.now()-queueScrollContainer.scrollStart;if(elapsedTime>queueScrollContainer.scrollDurationMs){queueScrollContainer.scrollLeft=scrollPos;return}var tpos=elapsedTime/(queueScrollContainer.scrollDurationMs/2);if(tpos<1)scrollPos=queueScrollContainer.scrollAnimator.scrollDifference/2*tpos*tpos+queueScrollContainer.scrollAnimator.scrollFrom;else{--tpos;scrollPos=-queueScrollContainer.scrollAnimator.scrollDifference/2*(tpos*(tpos-2)-1)+queueScrollContainer.scrollAnimator.scrollFrom}queueScrollContainer.scrollLeft=scrollPos;queueScrollContainer.animateTimerId=setTimeout(function(){Queue_Control._scrollQueueToStep(queueScrollContainer)},15)},_stopScrollAnimation:function _stopScrollAnimation(queueScrollContainer){clearTimeout(queueScrollContainer.animateTimerId)}};module.exports={Queue_Control:Queue_Control};

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _collapsibleMenu=__webpack_require__(101);var menu=_interopRequireWildcard(_collapsibleMenu);var _drawer=__webpack_require__(132);var drawer=_interopRequireWildcard(_drawer);var _manager=__webpack_require__(133);var manager=_interopRequireWildcard(_manager);var _card=__webpack_require__(58);var _card2=_interopRequireDefault(_card);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}module.exports={menu:menu,drawer:drawer,manager:manager,Card:_card2.default};

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _get2=__webpack_require__(57);var _get3=_interopRequireDefault(_get2);var _card=__webpack_require__(58);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var CollapsibleMenu=function(_Card){(0,_inherits3.default)(CollapsibleMenu,_Card);function CollapsibleMenu(initId,menuId,common,manager,options){(0,_classCallCheck3.default)(this,CollapsibleMenu);var _this=(0,_possibleConstructorReturn3.default)(this,(CollapsibleMenu.__proto__||(0,_getPrototypeOf2.default)(CollapsibleMenu)).call(this,initId,menuId,['click'],common,manager,options));_this.menu=(0,_get3.default)(CollapsibleMenu.prototype.__proto__||(0,_getPrototypeOf2.default)(CollapsibleMenu.prototype),'componentNode',_this);_this.options.boundingElement=options.boundingElement||null;_this.menu.style.display='none';_this.menu.style.position='absolute';_this.menu.style.zIndex='10000';return _this}(0,_createClass3.default)(CollapsibleMenu,[{key:'handleKeys',value:function handleKeys(){}},{key:'openComponent',value:function openComponent(){this.component.style.display='block';if(this.options.boundingElement){this.adjustPageHeight()}this.visible=true;if(this.openCloseIconObject!==null){this.toggleOpenCloseIcon()}if(this.debug){console.log('component is open')}}},{key:'closeComponent',value:function closeComponent(){this.component.style.display='none';if(this.options.boundingElement){this.options.boundingElement.style.height='auto'}this.visible=false;if(this.openCloseIconObject!==null){this.toggleOpenCloseIcon()}if(this.debug){console.log('component is closed')}}},{key:'adjustPageHeight',value:function adjustPageHeight(){var rect=this.menu.getBoundingClientRect();var scrollTop=window.pageYOffset||document.documentElement.scrollTop;var adjustedMenuHeight=this.menu.clientHeight+rect.top+scrollTop;if(adjustedMenuHeight>this.options.boundingElement.clientHeight){this.options.boundingElement.style.height=adjustedMenuHeight+'px'}if(this.debug){console.log(this.menu.clientHeight,'menu height');console.log(this.options.boundingElement.clientHeight,'element to compare menu height to')}}}]);return CollapsibleMenu}(_card.Card);module.exports={CollapsibleMenu:CollapsibleMenu};

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(103);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(14);
var $getPrototypeOf = __webpack_require__(66);

__webpack_require__(44)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(9), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
__webpack_require__(36);
module.exports = __webpack_require__(51).f('iterator');


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var defined = __webpack_require__(41);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(24);
var setToStringTag = __webpack_require__(30);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(13)(IteratorPrototype, __webpack_require__(6)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(10);
var getKeys = __webpack_require__(28);

module.exports = __webpack_require__(9) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(18);
var toLength = __webpack_require__(35);
var toAbsoluteIndex = __webpack_require__(113);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(47);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(115);
var step = __webpack_require__(71);
var Iterators = __webpack_require__(27);
var toIObject = __webpack_require__(18);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(48)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(117), __esModule: true };

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
__webpack_require__(56);
__webpack_require__(121);
__webpack_require__(122);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(4);
var has = __webpack_require__(15);
var DESCRIPTORS = __webpack_require__(9);
var $export = __webpack_require__(5);
var redefine = __webpack_require__(68);
var META = __webpack_require__(52).KEY;
var $fails = __webpack_require__(16);
var shared = __webpack_require__(43);
var setToStringTag = __webpack_require__(30);
var uid = __webpack_require__(33);
var wks = __webpack_require__(6);
var wksExt = __webpack_require__(51);
var wksDefine = __webpack_require__(53);
var enumKeys = __webpack_require__(119);
var isArray = __webpack_require__(72);
var anObject = __webpack_require__(10);
var isObject = __webpack_require__(8);
var toObject = __webpack_require__(14);
var toIObject = __webpack_require__(18);
var toPrimitive = __webpack_require__(46);
var createDesc = __webpack_require__(24);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(120);
var $GOPD = __webpack_require__(55);
var $GOPS = __webpack_require__(54);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(28);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(73).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(37).f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(22)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(13)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(54);
var pIE = __webpack_require__(37);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(18);
var gOPN = __webpack_require__(73).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53)('asyncIterator');


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(53)('observable');


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(124), __esModule: true };

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(125);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(5);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(126).set });


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(8);
var anObject = __webpack_require__(10);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(11)(Function.call, __webpack_require__(55).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(5);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
var $Object = __webpack_require__(2).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(18);
var $getOwnPropertyDescriptor = __webpack_require__(55).f;

__webpack_require__(44)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _get2=__webpack_require__(57);var _get3=_interopRequireDefault(_get2);var _card=__webpack_require__(58);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DRAWERSTYLES={display:'none',height:'100%',overflowY:'auto'};var DRAWERSHIELDSTYLES={display:'none',left:0,position:'fixed',width:'100%',zIndex:9999};var Drawer=function(_Card){(0,_inherits3.default)(Drawer,_Card);function Drawer(initId,drawerId,common,manager,options){(0,_classCallCheck3.default)(this,Drawer);var _this=(0,_possibleConstructorReturn3.default)(this,(Drawer.__proto__||(0,_getPrototypeOf2.default)(Drawer)).call(this,initId,drawerId,['click'],common,manager,options));_this.drawer=(0,_get3.default)(Drawer.prototype.__proto__||(0,_getPrototypeOf2.default)(Drawer.prototype),'componentNode',_this);_this.drawerShield=_this.drawer.parentNode;_this.common.css.applyStyles(_this.drawer,DRAWERSTYLES);_this.common.css.applyStyles(_this.drawerShield,DRAWERSHIELDSTYLES);return _this}(0,_createClass3.default)(Drawer,[{key:'setListeners',value:function setListeners(){var eventTypes=['popstate','click'];this.common.events.eventListenerUtility(window,eventTypes,this.closeComponent.bind(this),true)}},{key:'closeComponent',value:function closeComponent(evt){if(evt===undefined||evt.type!=='popstate'){history.back()}(0,_get3.default)(Drawer.prototype.__proto__||(0,_getPrototypeOf2.default)(Drawer.prototype),'closeComponent',this).call(this);this.drawerShield.style.display='none';if(document.body.classList.contains('dts-body-lock')){document.body.classList.remove('dts-body-lock')}}},{key:'openComponent',value:function openComponent(){(0,_get3.default)(Drawer.prototype.__proto__||(0,_getPrototypeOf2.default)(Drawer.prototype),'openComponent',this).call(this);this.drawerShield.style.display='block';if(!document.body.classList.contains('dts-body-lock')){document.body.classList.add('dts-body-lock')}history.pushState({nav:'mobile'},'load mobile navigation');if(this.debug){console.log('Drawer.js - history.length = ',window.history.length)}}},{key:'setComponentPosition',value:function setComponentPosition(){if(this.debug){console.log('Drawer.js - setComponentPosition - arguments passed into this.common.dom.getParentNode');console.log('Drawer.js - setComponentPosition - argument - super.initiatorNode = ',(0,_get3.default)(Drawer.prototype.__proto__||(0,_getPrototypeOf2.default)(Drawer.prototype),'initiatorNode',this));console.log('Drawer.js - setComponentPosition - argument - this.options.parentNode = ',this.options.parentNode)}var header=this.common.dom.getParentNode((0,_get3.default)(Drawer.prototype.__proto__||(0,_getPrototypeOf2.default)(Drawer.prototype),'initiatorNode',this),this.options.parentNode);var headerDimensions=this.common.dom.getElementDimensionsLite(header);this.drawerShield.style.top=headerDimensions.bottom+'px';this.drawerShield.style.height='calc(100% - '+this.drawerShield.style.top+')';if(this.debug){console.log('Drawer.js - this.drawer.style.height = ',this.drawer.style.height);console.log('Drawer.js - window innerHeight = ',window.innerHeight)}}}]);return Drawer}(_card.Card);module.exports={Drawer:Drawer};

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Manager=function(){function Manager(){(0,_classCallCheck3.default)(this,Manager);this.methodCall=null}(0,_createClass3.default)(Manager,[{key:"manageEvent",value:function manageEvent(instanceMethod){if(this.methodCall!==null){this.methodCall()}this.methodCall=instanceMethod}}]);return Manager}();module.exports={Manager:Manager};

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:true});exports.default=undefined;var _assign=__webpack_require__(75);var _assign2=_interopRequireDefault(_assign);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PROGRESS_SLIDER_MARKUP='<div class="dts-slider-wrapper"><div class="dts-slider">\t<div class="dts-slider-control-wrapper">\t\t<div class="dts-slider-background">\t\t\t<div class="dts-slider-progress"></div>\t\t</div>\t</div></div></div>';var STANDARD_SLIDER_MARKUP='<div class="dts-slider-wrapper"><div class="dts-slider">\t<div class="dts-slider-control-wrapper">\t\t<div class="dts-slider-background">\t\t\t<div class="dts-slider-button"></div>\t\t</div>\t</div></div></div>';var BAR_STYLE_PROGRESS='progress';var BAR_STYLE_STANDARD='standard';var DEFAULT_OPTIONS={userControl:true,minValue:0,maxValue:99,height:'56px',barStyle:BAR_STYLE_STANDARD,barColor:null,progressColor:null,buttonColor:null};var MOVE_EVENTS=['mousemove','pointermove','touchmove'];var WINDOW_EVENTS=['resize','orientationchange'];var START_EVENTS=['mousedown','pointerdown','touchstart'];var END_EVENTS=['mouseup','pointerup','touchend','touchcancel'];function arrayContains(theArray,value){var i=theArray.length;while(i--){if(theArray[i]===value){return true}}return false}var Slider=function(){function Slider(containerId,startingValue,valueChangeCallback,userOptions){(0,_classCallCheck3.default)(this,Slider);if(containerId===undefined){throw'Required parameter containerId not provided!'}this.containerId=containerId;var container=document.getElementById(containerId);if(container===null){throw'Invalid containerId!'}else{this.container=container}if(startingValue===undefined){this.currentValue=0}else{this.currentValue=startingValue}if(valueChangeCallback!==undefined&&valueChangeCallback!==null){this.valueChangeCallback=valueChangeCallback}this.options=(0,_assign2.default)({},DEFAULT_OPTIONS);if(userOptions){this.options=(0,_assign2.default)(this.options,userOptions)}this.isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent);this.buildSliderUi()}(0,_createClass3.default)(Slider,[{key:'buildSliderUi',value:function buildSliderUi(){if(this.options.barStyle==='progress'){this.container.innerHTML=PROGRESS_SLIDER_MARKUP;this.sliderProgress=this.container.getElementsByClassName('dts-slider-progress')[0];if(this.options.progressColor!==null){this.sliderProgress.style.backgroundColor=this.options.progressColor}}else{this.container.innerHTML=STANDARD_SLIDER_MARKUP;this.sliderButton=this.container.getElementsByClassName('dts-slider-button')[0];if(this.options.buttonColor!==null){this.sliderButton.style.backgroundColor=this.options.buttonColor}}var sliderWrapper=this.container.getElementsByClassName('dts-slider-wrapper')[0];sliderWrapper.style.height=this.options.height;if(this.options.barColor!==null){var sliderBackground=this.container.getElementsByClassName('dts-slider-background')[0];sliderBackground.style.backgroundColor=this.options.barColor}this.slider=this.container.getElementsByClassName('dts-slider')[0];if(this.options.userControl){if(this.slider.classList){this.slider.classList.add('dts-slider-interactive')}else{this.slider.className+=' dts-slider-interactive'}START_EVENTS.forEach(function(eventName){this.slider.addEventListener(eventName,this.handleStart.bind(this),false)}.bind(this))}this.listening=false;this.updateDisplay()}},{key:'addDocumentListeners',value:function addDocumentListeners(){MOVE_EVENTS.forEach(function(eventName){if(this.isIOS){document.addEventListener(eventName,this.handleChange.bind(this),{capture:true,passive:false})}else{document.addEventListener(eventName,this.handleChange.bind(this),true)}}.bind(this));WINDOW_EVENTS.forEach(function(eventName){window.addEventListener(eventName,this.handleChange.bind(this))}.bind(this));END_EVENTS.forEach(function(eventName){document.addEventListener(eventName,this.handleEnd.bind(this),false)}.bind(this))}},{key:'removeDocumentListeners',value:function removeDocumentListeners(){MOVE_EVENTS.forEach(function(eventName){document.removeEventListener(eventName,this.handleChange.bind(this))}.bind(this));WINDOW_EVENTS.forEach(function(eventName){window.removeEventListener(eventName,this.handleChange.bind(this))}.bind(this));END_EVENTS.forEach(function(eventName){document.removeEventListener(eventName,this.handleEnd.bind(this))}.bind(this))}},{key:'handleStart',value:function handleStart(event){if(event!==undefined&&arrayContains(START_EVENTS,event.type)){if(this.listening){this.removeDocumentListeners();this.listening=false}this.addDocumentListeners();this.listening=true;this.updateWithEvent(event)}}},{key:'handleEnd',value:function handleEnd(event){if(event!==undefined&&arrayContains(END_EVENTS,event.type)){if(this.listening){this.removeDocumentListeners();this.updateWithEvent(event);this.listening=false}}}},{key:'handleChange',value:function handleChange(event){if(event!==undefined){if(this.listening&&arrayContains(MOVE_EVENTS,event.type)){this.updateWithEvent(event);event.preventDefault()}else if(arrayContains(WINDOW_EVENTS,event.type)){this.updateDisplay()}}}},{key:'updateWithEvent',value:function updateWithEvent(event){var positionX=event.clientX;if(positionX===undefined){if(event.touches!==undefined&&event.touches.length>0){positionX=event.touches[0].clientX}else if(event.changedTouches!==undefined&&event.changedTouches.length>0){positionX=event.changedTouches[0].clientX}}var boundingRect=this.slider.getBoundingClientRect();var positionX_Axis=positionX-Math.floor(boundingRect.left);var sliderWidth=Math.floor(boundingRect.right)-Math.floor(boundingRect.left);var calcValue=positionX_Axis/sliderWidth;var newValue=Math.round((this.options.maxValue-this.options.minValue)*calcValue)+this.options.minValue;if(newValue<this.options.minValue){newValue=this.options.minValue}else if(newValue>this.options.maxValue){newValue=this.options.maxValue}this.currentValue=newValue;this.updateDisplay();this.executeCallback()}},{key:'updateDisplay',value:function updateDisplay(){var calcValue=(this.currentValue-this.options.minValue)/(this.options.maxValue-this.options.minValue);var boundingRect=this.slider.getBoundingClientRect();var sliderWidth=Math.floor(boundingRect.right)-Math.floor(boundingRect.left)-10;if(this.options.barStyle===BAR_STYLE_PROGRESS){var position=Math.floor(calcValue*sliderWidth);if(position<5){position=5}this.sliderProgress.style.width=position+'px'}else{var buttonBoundingRect=this.sliderButton.getBoundingClientRect();var buttonWidth=Math.floor(buttonBoundingRect.right)-Math.floor(buttonBoundingRect.left);var _position=Math.floor(calcValue*sliderWidth)-Math.floor(buttonWidth/2);this.sliderButton.style.left=_position+'px'}}},{key:'executeCallback',value:function executeCallback(){if(this.valueChangeCallback){this.valueChangeCallback(this.currentValue)}}},{key:'value',get:function get(){return this.currentValue},set:function set(newValue){if(newValue<this.options.minValue){this.currentValue=this.options.minValue}else if(newValue>this.options.maxValue){this.currentValue=this.options.maxValue}else{this.currentValue=newValue}this.updateDisplay();this.executeCallback()}}]);return Slider}();exports.default=Slider;

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(136);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(5);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(137) });


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__(9);
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(54);
var pIE = __webpack_require__(37);
var toObject = __webpack_require__(14);
var IObject = __webpack_require__(49);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(16)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);var _carousels=__webpack_require__(76);var carousels=_interopRequireWildcard(_carousels);var _dtsModalVrDirect=__webpack_require__(77);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}var VR_DIRECT_MODAL_PLACE_HOLDER_ID="vrDirectModalPlaceholder";var VR_DIRECT_MODAL_CONTENT="\n<section id=\"dtsVRDirectModal\" class=\"dts-vr-direct-modal-content\">\n\t<div>\n\t\t<h1 class=\"dts-page-title\">VR Media URL</h1>\n\t</div>\n\t<div class=\"dts-form-field-container\">\n\t\t<label for=\"dtsVRDirectModalCopyTarget\" class=\"dts-form-field-label\">Copy this URL to use with your chosen application:</label>\n\t\t<input id=\"dtsVRDirectModalCopyTarget\" class=\"dts-settings-input\" type=\"text\" value=\"\" readOnly/>\n\t\t<button id=\"dtsVRDirectModalCloseButton\" class=\"dts-link-button\" type=\"button\">Cancel</button>\n\t\t<button id=\"dtsVRDirectModalCopyButton\" class=\"dts-link-button\" type=\"button\">Copy</button>\n\t\t<button id=\"dtsVRDirectModalOpenButton\" class=\"dts-link-button\" type=\"\"button\">Open in Default Browser</button>\n\t</div>\n</section>\n";var modalPlayerSetup=function(){var modalBackground,modalPlayerWrapper,modalPlayer;var savedElement=undefined;var allowClose=true;var initModalPlayer=function initModalPlayer(embedId){modalBackground=document.querySelector(".modal_player_background");modalPlayerWrapper=document.querySelector(".modal_player_wrapper");modalPlayer=document.getElementById(embedId);if(!modalBackground.classList.contains("modal_player_display")){modalBackground.classList.add("modal_player_display");document.body.style.overflow="hidden";modalBackground.addEventListener("click",killModalPlayer,false);modalBackground.addEventListener("mousedown",locationTest,false);modalBackground.addEventListener("mouseup",locationTest,false);modalPlayerWrapper.addEventListener("click",captureClick,false)}window.location.hash="#playback";var playbackInterval=setInterval(function(){if(window.location.hash!="#playback"){clearInterval(playbackInterval);killModalPlayer()}},100)};var captureClick=function captureClick(e){e.stopPropagation()};var locationTest=function locationTest(event){if(event!=undefined){if(event.type=="mousedown"){savedElement=event.srcElement}else{if(savedElement!==event.srcElement){allowClose=false}}}};var killModalPlayer=function killModalPlayer(event){if(event){if(!allowClose){savedElement=undefined;allowClose=true;return}}carousels.resumeCarousels();var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;var fullscreenEnabled=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled;if(fullscreenEnabled){if(fullscreenElement){if(document.exitFullscreen){document.exitFullscreen()}else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else if(document.webkitExitFullscreen){document.webkitExitFullscreen()}else if(document.msExitFullscreen){document.msExitFullscreen()}}}if(window.location.hash=="#playback"){window.history.back()}while(modalPlayer.firstChild){modalPlayer.removeChild(modalPlayer.firstChild)}if(modalBackground.classList.contains("modal_player_display")){modalBackground.classList.remove("modal_player_display");document.body.style.overflow="auto"}modalPlayerWrapper.removeEventListener("click",captureClick,false);modalBackground.removeEventListener("click",killModalPlayer,false);modalBackground.removeEventListener("mousedown",locationTest,false);modalBackground.removeEventListener("mouseup",locationTest,false)};return{initModalPlayer:initModalPlayer,killModalPlayer:killModalPlayer}}();function isEmbedded(format){if("HLS"===format){var ua=navigator.userAgent.toLowerCase();var cookieValue=dts.common.cookie.readCookie("playerBehavior");var isMac=ua.indexOf("macintosh")>-1;var isiOS=ua.indexOf("ipad")>-1||ua.indexOf("iphone")>-1;if(cookieValue==="OLD_SCHOOL"||isMac||isiOS){return"false"}}return"true"}function useModalPlayer(){var ua=navigator.userAgent.toLowerCase();var isiOS=ua.indexOf("ipad")>-1||ua.indexOf("iphone")>-1;var isMac=ua.indexOf("macintosh")>-1;var unifiedPlayer=new UnifiedPlayer;var format=unifiedPlayer._readCookie("PlayerFormat");if(!format)format=unifiedPlayer.getOptimalFormat(["HLS","DASH","FlashDynamic","SmoothStreaming"]);var cookieValue=dts.common.cookie.readCookie("playerBehavior");if(cookieValue==="OLD_SCHOOL"||isiOS||format=="HLS"){return false}else{return true}}var previewLimitModal=null;function playVideo(movieId,sceneId,vrType,startSeconds,isPreview,playCheckUrl,deliverDetourUrl,deliverUrl,fisheye,heading,aspectRatio,showFPS,embedId,consumptionRate,videoTitle,loginUrl,signupUrl,deliveryCollection){var canPlay=true;var detour=true;if(!previewLimitModal){previewLimitModal=new app.PreviewLimitModal}if(sceneId){dts.common.xhr.post(playCheckUrl+"?movieId="+movieId+"&isPreview="+isPreview+"&sceneId="+sceneId,null,false,function(status,response){if(response==="detour"){canPlay=false}else if(response==="preview limit"){canPlay=false;detour=false;previewLimitModal.open(loginUrl,signupUrl)}})}else{dts.common.xhr.post(playCheckUrl+"?movieId="+movieId+"&isPreview="+isPreview,null,false,function(status,response){if(response==="detour"){canPlay=false}else if(response==="preview limit"){canPlay=false;detour=false;previewLimitModal.open(loginUrl,signupUrl)}})}if(canPlay){var parameters={movieId:movieId,sceneId:sceneId,isPreview:isPreview,startSeconds:startSeconds,embedHLS:true,allowedFormats:["HLS","DASH","FlashDynamic","SmoothStreaming"],consumptionRate:consumptionRate,popoutTitle:videoTitle};var unifiedPlayer=new UnifiedPlayer;if(vrType!=="undefined"&&vrType.length>0){var vrPlayerCookie=unifiedPlayer._readCookie("VRPlayerType");var isVRDirect=vrPlayerCookie=="Direct";var isOculus=/OculusBrowser/.test(navigator.userAgent);if(!isVRDirect&&isOculus){isVRDirect=true}var isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;var isAndroid=/(android)/i.test(navigator.userAgent);var cookieBitrate=unifiedPlayer._readCookie("PlayerMaxBitrate");if(cookieBitrate)parameters.maxBitrate=cookieBitrate;if(!parameters.maxBitrate)parameters.maxBitrate=100000;parameters.format="DASH";if(isIOS){parameters.format="HLS";isVRDirect=true}if(isVRDirect){parameters.format="HLS"}if(!isVRDirect){document.unifiedPlayerVideoWindow=window.open("","Video Player","modal=yes,resizable=1, width=848, height=480");document.unifiedPlayerVideoWindow.focus()}dts.common.xhr.post(deliverUrl,parameters,true,function(status,response){if(!parameters.isPreview){var pqsvm=new ParsedQueryString;var metricsParams={movieId:parameters.movieId,sceneId:parameters.sceneId,format:parameters.format,startSeconds:parameters.startSeconds,promotedTraffic:pqsvm.param("viaPT"),requestedFormat:unifiedPlayer._readCookie("PlayerFormat"),maxBitrateKbps:parameters.maxBitrate};if(deliveryCollection!==undefined&&deliveryCollection.type==="Scenes"){metricsParams.scenesViewMode=deliveryCollection.scenesViewMode}var orientation="straight";var sidx=window.location.href.indexOf("/",8);if(sidx!=-1&&window.location.href.substring(sidx).startsWith("/gay"))orientation="gay";dts.common.xhr.post("/"+orientation+"/delivery-metrics",metricsParams,true,function(status,gaEventsString){var gaEvents=JSON.parse(gaEventsString);for(var i=0;i<gaEvents.length;++i){dataLayer.push(gaEvents[i])}})}dataLayer.push({"event":"trackEvent","eventCategory":"Video","eventAction":parameters.isPreview?parameters.sceneId?"Preview Scene":"Preview Movie":parameters.sceneId?"Play Scene":"Play Movie","eventLabel":parameters.format,"eventValue":undefined,"nonInteraction":undefined});if(response.url.indexOf("/met(")!=-1){dataLayer.push({"event":"trackEvent","eventCategory":"Minute Consumption Rate","eventAction":parameters.consumptionRate.toFixed(2),"eventLabel":parameters.sceneId?"Scene":"Movie","eventValue":undefined,"nonInteraction":undefined})}var anaglyphType=unifiedPlayer._readCookie("anaglyphType");if(!anaglyphType||anaglyphType==="")anaglyphType="RC";var fmt="3DSBS";var dt="2D";if(vrType=="VR3D"){dt="VRBAR";if(fisheye){fmt="3D180SBS";dt="VR180";if(!isAndroid)dt="ANA180"}else if(!isAndroid)dt="ANA"}else if(vrType=="VR360"){fmt="360";dt="360"}else if(vrType=="VR3D360"){fmt="3D360OU";dt="VR360";if(!isAndroid)dt="ANA360"}var extraParams="";if(heading)extraParams="&yaw="+heading;if(aspectRatio)extraParams+="&ar="+aspectRatio;if(showFPS)extraParams+="&fps=true";if(isVRDirect){var child=document.getElementById(VR_DIRECT_MODAL_PLACE_HOLDER_ID);child.innerHTML=VR_DIRECT_MODAL_CONTENT;var vrDirectModal=new _dtsModalVrDirect.VRDirectModal(response.url);vrDirectModal.open()}else{var url="/resources/vr-player/vr.html?video="+encodeURIComponent(response.url)+"&dt="+dt+"&fmt="+fmt+"&ana="+anaglyphType+"&popoutTitle="+encodeURIComponent(videoTitle)+extraParams;document.unifiedPlayerVideoWindow.location=url;document.unifiedPlayerVideoWindow.focus()}},function(errorResult){console.error("There was an error playing this content: "+errorResult.statusText);document.unifiedPlayerVideoWindow.close()})}else{var isModal=useModalPlayer();if(isModal){carousels.pauseCarousels()}unifiedPlayer.unifiedPlayerHome="/resources/unified-player/player/";if(isPreview)unifiedPlayer.fullFrameUrl="/resources/unified-player/player/PreviewFullframe.html";if(embedId&&isModal){modalPlayerSetup.initModalPlayer(embedId);parameters.embedId=embedId;parameters.killModalPlayer=modalPlayerSetup.killModalPlayer}if(isPreview){unifiedPlayer.addPostrollListener(function(embedId){var fullscreenElement=document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement;var fullscreenEnabled=document.fullscreenEnabled||document.mozFullScreenEnabled||document.webkitFullscreenEnabled||document.msFullscreenEnabled;if(fullscreenEnabled){if(fullscreenElement){if(document.exitFullscreen){document.exitFullscreen()}else if(document.mozCancelFullScreen){document.mozCancelFullScreen()}else if(document.webkitExitFullscreen){document.webkitExitFullscreen()}else if(document.msExitFullscreen){document.msExitFullscreen()}}}var elPlayerModal=document.getElementById(embedId);if(elPlayerModal){elPlayerModal.innerHTML="<div class=\"postroll-wrapper\"><div class=\"postroll-content\"><p>"+"Watch this and thousands of other XXX scenes!<br>"+"Top Stars from the Best Studios Around the World!"+"<p>Pay-Per-Minute<br>Rentals<br>Downloads</p><button class=\"dts-btn-preview-close\">Close</button></div></div>";var closePostroll=function closePostroll(e){e.stopPropagation();if(e.target.classList.contains("dts-btn-preview-close")){window.location.hash="scene-"+parameters.sceneId;modalPlayerSetup.killModalPlayer();elPlayerModal.removeEventListener("click",closePostroll,false)}};elPlayerModal.addEventListener("click",closePostroll,false)}})}unifiedPlayer.play(function(parameters){delete parameters.allowedFormats;parameters.isEmbedded=isEmbedded(parameters.format);if(parameters.isEmbedded){if(isPreview){parameters.popoutHtmlUrl="/resources/unified-player/player/PreviewFullframe.html"}else{parameters.popoutHtmlUrl="/resources/unified-player/player/fullframe.html"}}dts.common.xhr.post(deliverUrl,parameters,false,function(status,response){if(!parameters.isPreview){var isIos=navigator.userAgent.indexOf("iPad")!=-1||navigator.userAgent.indexOf("iPhone")!=-1;var isMac=navigator.userAgent.indexOf("Macintosh")!=-1||navigator.userAgent.indexOf("macintosh")!=-1;var launchType="Embedded Player";if(!isModal)launchType="Pop-Out Player";if(parameters.format=="HLS"&&(isIos||isMac))launchType="Native Player";dataLayer.push({"event":"trackEvent","eventCategory":"Player Mode","eventAction":launchType,"eventLabel":undefined,"eventValue":undefined,"nonInteraction":undefined});parameters.popoutCallback=function(){dataLayer.push({"event":"trackEvent","eventCategory":"Embedded Player Mode","eventAction":"Exited to Pop-Out Player","eventLabel":undefined,"eventValue":undefined,"nonInteraction":undefined})};var pqsvm=new ParsedQueryString;var metricsParams={movieId:parameters.movieId,sceneId:parameters.sceneId,format:parameters.format,startSeconds:parameters.startSeconds,promotedTraffic:pqsvm.param("viaPT"),requestedFormat:unifiedPlayer._readCookie("PlayerFormat"),maxBitrateKbps:parameters.maxBitrate};if(deliveryCollection!==undefined&&deliveryCollection.type=="Scenes"){metricsParams.scenesViewMode=deliveryCollection.scenesViewMode}var orientation="straight";var sidx=window.location.href.indexOf("/",8);if(sidx!=-1&&window.location.href.substring(sidx).startsWith("/gay"))orientation="gay";dts.common.xhr.post("/"+orientation+"/delivery-metrics",metricsParams,true,function(status,gaEventsString){var gaEvents=JSON.parse(gaEventsString);for(var i=0;i<gaEvents.length;++i){dataLayer.push(gaEvents[i])}})}dataLayer.push({"event":"trackEvent","eventCategory":"Video","eventAction":parameters.isPreview?parameters.sceneId?"Preview Scene":"Preview Movie":parameters.sceneId?"Play Scene":"Play Movie","eventLabel":parameters.format,"eventValue":undefined,"nonInteraction":undefined});if(response.url.indexOf("/met(")!=-1){dataLayer.push({"event":"trackEvent","eventCategory":"Minute Consumption Rate","eventAction":parameters.consumptionRate.toFixed(2),"eventLabel":parameters.sceneId?"Scene":"Movie","eventValue":undefined,"nonInteraction":undefined})}parameters.startSeconds=response.startSeconds;parameters.endSeconds=response.endSeconds;parameters.startOffsetSeconds=response.startOffsetSeconds;parameters.format=response.format;parameters.url=response.url})},parameters)}}else if(detour){if(sceneId)location.href=deliverDetourUrl+"&movieId="+movieId+"&sceneId="+sceneId+"&isPreview="+isPreview;else location.href=deliverDetourUrl+"&movieId="+movieId+"&isPreview="+isPreview}}module.exports={playVideo:playVideo};

/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
__webpack_require__(26);
__webpack_require__(36);
__webpack_require__(140);
__webpack_require__(144);
__webpack_require__(145);
module.exports = __webpack_require__(2).Promise;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(22);
var global = __webpack_require__(4);
var ctx = __webpack_require__(11);
var classof = __webpack_require__(60);
var $export = __webpack_require__(5);
var isObject = __webpack_require__(8);
var aFunction = __webpack_require__(23);
var anInstance = __webpack_require__(61);
var forOf = __webpack_require__(31);
var speciesConstructor = __webpack_require__(80);
var task = __webpack_require__(81).set;
var microtask = __webpack_require__(142)();
var newPromiseCapabilityModule = __webpack_require__(63);
var perform = __webpack_require__(82);
var userAgent = __webpack_require__(143);
var promiseResolve = __webpack_require__(83);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(6)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(64)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(30)($Promise, PROMISE);
__webpack_require__(84)(PROMISE);
Wrapper = __webpack_require__(2)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(85)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 141 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var macrotask = __webpack_require__(81).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(29)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(4);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(5);
var core = __webpack_require__(2);
var global = __webpack_require__(4);
var speciesConstructor = __webpack_require__(80);
var promiseResolve = __webpack_require__(83);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(5);
var newPromiseCapability = __webpack_require__(63);
var perform = __webpack_require__(82);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _tagging=__webpack_require__(147);module.exports={taggingModalTemplate:_tagging.taggingModalTemplate,confirmDeleteTag:_tagging.confirmDeleteTag,confirmRenameTag:_tagging.confirmRenameTag};

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var taggingModalTemplate={render:function render(data){return"<section id=\"dtsTaggingModal-"+data.id+"\" class=\"dts-tagging-modal\">\n\t\t\t\t\t<header>\n\t\t\t\t\t\t<h1>"+data.name+"</h1>\n\t\t\t\t\t\t<div class=\"dts-tag-modal-icon-wrapper\">\n\t\t\t\t\t\t\t<span class=\"dts-icon-target active\" href=\""+data.favoriteHref+"\" title=\""+data.favoriteTitleAttr+"\"><i class=\"dts-icon-favorite\"></i></span>\n\t\t\t\t\t\t\t<span class=\"dts-tag-modal-icon-divider\">|</span>\n\t\t\t\t\t\t\t<div id=\"dtsTagModalCloseALt-"+data.id+"\" class=\"dts-icon-target dts-tag-modal-alt-closer\" title=\"Close this modal\"><i class=\"dts-icon-close\"></i></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</header>\n\t\t\t\t\t<div class=\"dts-tag-modal-content\">\n\t\t\t\t\t\t<div class=\"dts-tag-modal-image-wrapper\">\n\t\t\t\t\t\t\t<picture>\n\t\t\t\t\t\t\t\t<source media=\"(max-width: 480px)\" srcset=\""+data.imageSrcPhone+"\">\n\t\t\t\t\t\t\t\t<source media=\"(min-width: 640px)\" srcset=\""+data.imageSrc+"\">\n\t\t\t\t\t\t\t\t<img src=\""+data.imageSrc+"\" title=\""+data.imageTitleAttr+"\" alt=\""+data.imageAltAttr+"\">\n\t\t\t\t\t\t\t</picture>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"dts-tag-modal-content-tags-wrapper\">\n\t\t\t\t\t\t\t<span class=\"dts-tag-modal-content-tags-label\">My Tags: <span class=\"dts-tag-modal-no-content-tags\">No tags have been added to "+data.name+".</span></span>\n\t\t\t\t\t\t\t<span class=\"dts-tag-modal-content-tags\"></span>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class=\"dts-tag-modal-add\">\n\t\t\t\t\t\t\t<div id=\"dtsTagModalSelectedTags-"+data.id+"\" class=\"dts-tag-modal-selected-tags\"></div>\n\t\t\t\t\t\t\t<div class=\"dts-tag-modal-submit-wrapper\">\n\t\t\t\t\t\t\t\t<input id=\"dtsTagModalInput-"+data.id+"\" placeholder=\"Add New Tags\" type=\"text\">\n\t\t\t\t\t\t\t\t<button id=\"dtsTagModalAddButton-"+data.id+"\" class=\"dts-link-button disabled\" title=\""+data.addTitleAttr+"\">add</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div id=\"dtsTagModalErrorWrapper-"+data.id+"\" class=\"dts-tag-input-error-wrapper\"></div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</section>"}};var confirmDeleteTag={render:function render(data){return"\n\t\t<p>\n\t\t\tDeleting is permanent and will delete the tag(s) <span id=\"dtsDeletedTagName\" class=\"dts-tag-modal-placeholder\">"+data.tagName+"</span> from all movies, scenes and stars where it is used.\n\t\t\t<br>\n\t\t\tDo you wish to continue?\n\t\t</p>\n        "}};var confirmRenameTag={render:function render(data){return"\n\t\t<p>\n\t\t\tYou are renaming <span id=\"dtsRenameTagNameFrom\" class=\"dts-tag-modal-placeholder\">"+data.tagNameFrom+"</span> to <span id=\"dtsRenameTagNameTo\" class=\"dts-tag-modal-placeholder\">"+data.tagNameTo+"</span>. This will change it across all your tagged movies, scenes and stars where it is currently used. \n\t\t\t<br>\n\t\t\tDo you wish to continue?\n\t\t</p>\n        "}};module.exports={taggingModalTemplate:taggingModalTemplate,confirmDeleteTag:confirmDeleteTag,confirmRenameTag:confirmRenameTag};

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var zIndexBase=10000;var DtsModalManager=function(){function DtsModalManager(){(0,_classCallCheck3.default)(this,DtsModalManager);var isSafari=Boolean(navigator.userAgent.match(/Safari/));var iosVersion=navigator.userAgent.match(/iPhone OS (\d{2})/);this.isSafariIOS=false;if(isSafari&&iosVersion&&parseInt(iosVersion[1])>12){this.isSafariIOS=true}this.waiting=false}(0,_createClass3.default)(DtsModalManager,[{key:'open',value:function open(modal,async){if(!async){var lastModalIdNumber=location.hash.match(/-m\d{3}$/);if(lastModalIdNumber){lastModalIdNumber=lastModalIdNumber[0].replace('m','');var lastModalId='dtsModal'+lastModalIdNumber;if(lastModalId){var elLastModal=document.getElementById(lastModalId);if(elLastModal){var lastZIndex=elLastModal.style.zIndex;modal.touchshield.style.zIndex=parseInt(lastZIndex)+1;elLastModal.classList.remove('dts-modal-scrim')}else{modal.touchshield.style.zIndex=zIndexBase}}}else{modal.touchshield.style.zIndex=zIndexBase}}else{modal.touchshield.style.zIndex=20000;this.waiting=true}if(!async){location.hash=location.hash+'-m'+modal.id.substr(modal.id.indexOf('-')+1);history.replaceState({modal:modal.id},modal.id);if(!this.waiting)modal.touchshield.classList.add('dts-modal-scrim')}else{modal.touchshield.classList.add('dts-modal-scrim')}if(!this.isSafariIOS){if(!async){document.body.classList.add('dts-body-lock')}}else{modal.modalContentWrapper.style.position='relative';modal.modalContentWrapper.style.overflowX='hidden';modal.touchshield.classList.add('dts-modal-scrim-ios');modal.touchshield.classList.remove('dts-modal-scrim');var iosBuffer=modal.modalContentWrapper.querySelector('.dts-ios-modal-buffer');if(iosBuffer)iosBuffer.style.display='block'}modal.touchshield.style.display='flex';if(!async)window.addEventListener('hashchange',this.hashChanged.bind(this),false)}},{key:'triggerClose',value:function triggerClose(){history.back()}},{key:'hashChanged',value:function hashChanged(e){if(e.newURL.length<e.oldURL.length){var modalIdToClose=e.oldURL.match(/-m\d{3}$/);if(modalIdToClose){modalIdToClose=modalIdToClose[0].replace('m','');this.close('dtsModal'+modalIdToClose)}}}},{key:'close',value:function close(modalId){if(!modalId)return;this.waiting=false;var elModalToClose=document.getElementById(modalId);if(elModalToClose){elModalToClose.style.display='none';elModalToClose.classList.remove('dts-modal-scrim');if(document.body.classList.contains('dts-body-lock')){document.body.classList.remove('dts-body-lock')}}var currentModal=location.hash.match(/-m\d{3}$/);if(currentModal){var currentModalId='dtsModal'+currentModal[0].replace('m','');var elCurrentModal=document.getElementById(currentModalId);if(elCurrentModal){elCurrentModal.classList.add('dts-modal-scrim');if(!document.body.classList.contains('dts-body-lock')){document.body.classList.add('dts-body-lock')}}}}}]);return DtsModalManager}();module.exports={DtsModalManager:DtsModalManager};

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getIterator2=__webpack_require__(86);var _getIterator3=_interopRequireDefault(_getIterator2);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var TextSearchControl=function(){function TextSearchControl(searchFormId,searchSubmitButton,advancedSearchButton,dtsSearchPreFilterFilterId,dtsSearchPreFilterMenuId,placeHolderText,searchInputId,autoCompleteListId,autoCompleteUrl,autoCompleteLimit,previousValue,previousSearchType,searchTextDefaultUrl,searchMoviesUrl,searchScenesUrl,searchStarsUrl){(0,_classCallCheck3.default)(this,TextSearchControl);this.searchForm=document.getElementById(searchFormId);this.searchSubmit=document.getElementById(searchSubmitButton);this.advancedsearchButton=document.getElementById(advancedSearchButton);this.dtsSearchPreFilterButton=document.getElementById(dtsSearchPreFilterFilterId);this.searchPreFilterMenu=document.getElementById(dtsSearchPreFilterMenuId);this.placeHolderText=placeHolderText;this.searchInput=document.getElementById(searchInputId);this.autoCompleteListId=autoCompleteListId;this.autoCompleteUrl=autoCompleteUrl;this.autoCompleteLimit=autoCompleteLimit;this.executingAutoComplete=undefined;this.previousValue=previousValue;this.previousSearchType=previousSearchType;this.searchTextDefaultUrl=searchTextDefaultUrl;this.searchMoviesUrl=searchMoviesUrl;this.searchScenesUrl=searchScenesUrl;this.searchStarsUrl=searchStarsUrl;this.searchInput.onkeydown=function(event){if(event.which==27){event.preventDefault();if(typeof event.stopPropagation!="undefined"){event.stopPropagation()}else{event.cancelBubble=true}}};this.searchInput.addEventListener("keyup",this.autoCompleteKeyEvent.bind(this),false);this.searchInput.addEventListener("input",this.autoCompleteTextChanged.bind(this),false);this.searchInput.addEventListener("propertychange",this.autoCompleteTextChanged.bind(this),false);this.searchForm.addEventListener("submit",this.runFreeformSearch.bind(this),false);this.searchSubmit.addEventListener("click",this.runFreeformSearch.bind(this),false);this.advancedsearchButton.addEventListener("click",this.runFreeformAdvancedSearch.bind(this),false);this.setPreFilterMenuEvent(this.updatePreFilterNode.bind(this));this.searchInput.addEventListener("focusout",this.focusLost.bind(this),false);this.selectedRow=-1;this.autoCompleteList=[];this.userText=""}(0,_createClass3.default)(TextSearchControl,[{key:"updatePreFilterNode",value:function updatePreFilterNode(node){var runSearch=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;this.dtsSearchPreFilterButton.innerHTML=node.innerText;this.dtsSearchPreFilterButton.dataset.value=node.dataset.value;this.dtsSearchPreFilterButton.dataset.autosuggest=node.dataset.autosuggest;this.dtsSearchPreFilterButton.dataset.freeform=node.dataset.freeform;this.dtsSearchPreFilterButton.dataset.searchType=node.dataset.searchType;this.dtsSearchPreFilterButton.dataset.searchTypeDefault=node.dataset.searchTypeDefault;var newSearch=this.searchInputValue!==this.previousValue||this.previousSearchType!==this.dtsSearchPreFilterButton.dataset.searchType;if(this.searchInputValue&&this.searchInputValue.length>=3&&runSearch&&newSearch){this.runSystemSearch(undefined)}}},{key:"setPreFilterMenuEvent",value:function setPreFilterMenuEvent(callback){var nodeList=app.dts.common.dom.returnArrayFromList(this.searchPreFilterMenu.childNodes);nodeList.forEach(function(node){if(node.nodeType===1){app.dts.common.events.eventListenerUtility(node,["click"],callback.bind(this,node))}})}},{key:"getSearchUrlValue",value:function getSearchUrlValue(queryString,searchType){var originalString=this.dtsSearchPreFilterButton.dataset.value;if(searchType=="Auto")originalString=this.dtsSearchPreFilterButton.dataset.autosuggest;else if(searchType=="Free")originalString=this.dtsSearchPreFilterButton.dataset.freeform;return originalString.replace(this.placeHolderText,queryString)}},{key:"getAdvancedSearchUrlValue",value:function getAdvancedSearchUrlValue(userSearchType,query){if(query.length>0&&!query.match(/^\s*$/g)&&query!==""&&query!==undefined&&query!==null){if(this.dtsSearchPreFilterButton.dataset.searchType===undefined){return this.searchTextDefaultUrl.replace(this.placeHolderText,query)}else{return this.getSearchUrlValue(query,userSearchType)}}else{if(this.dtsSearchPreFilterButton.dataset.searchType=="SearchMovies"){return this.searchMoviesUrl}else if(this.dtsSearchPreFilterButton.dataset.searchType=="SearchScenes"){return this.searchScenesUrl}else if(this.dtsSearchPreFilterButton.dataset.searchType=="SearchStars"){return this.searchStarsUrl}else{return this.searchMoviesUrl}}}},{key:"clearSearchInputValue",value:function clearSearchInputValue(){this.searchInputValue=""}},{key:"updateAutoCompleteList",value:function updateAutoCompleteList(autoCompleteList){var _this=this;var isMobile=false;var isTouch="ontouchstart"in document.documentElement;if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))){isMobile=true}isMobile&=isTouch;var autoCompletePanel=document.getElementById("dts-search-auto-complete-panel");while(autoCompletePanel.firstChild){autoCompletePanel.removeChild(autoCompletePanel.firstChild)}if(autoCompleteList&&autoCompleteList.length>0){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var suggestion=_step.value;var rowDiv=document.createElement("div");rowDiv.className+="dts-search-auto-complete-row";if(isMobile){var icoDiv=document.createElement("div");icoDiv.className+="dts-search-auto-complete-move-up";icoDiv.innerHTML="<i class=\"dts-icon-move-up\"></i></i>";icoDiv.addEventListener("click",function(){autoCompletePanel.style.display="none";_this.searchInputValue=suggestion;_this.searchInput.focus()});rowDiv.appendChild(icoDiv)}var texDiv=document.createElement("div");texDiv.className+="dts-search-auto-complete-text";texDiv.appendChild(document.createTextNode(suggestion));texDiv.addEventListener("click",function(){autoCompletePanel.style.display="none";_this.runSearchWithQuery(suggestion)});rowDiv.appendChild(texDiv);autoCompletePanel.appendChild(rowDiv)};for(var _iterator=(0,_getIterator3.default)(autoCompleteList),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}autoCompletePanel.style.display="block"}else{autoCompletePanel.style.display="none"}this.autoCompleteList=autoCompleteList}},{key:"focusLost",value:function focusLost(){var autoCompletePanel=document.getElementById("dts-search-auto-complete-panel");setTimeout(function(){autoCompletePanel.style.display="none"},200)}},{key:"autoCompleteTextChanged",value:function autoCompleteTextChanged(event){this.selectedRow=-1;var autoCompletePanel=document.getElementById("dts-search-auto-complete-panel");var queryString=this.searchInputValue;if(this.autoCompleteUrl&&queryString&&queryString.length>2){var data={query:queryString,limit:this.autoCompleteLimit};if(this.executingAutoComplete){this.executingAutoComplete.abort()}this.executingAutoComplete=dts.common.xhr.post(this.autoCompleteUrl,data,true,function(status,response){this.updateAutoCompleteList(response.results)}.bind(this),function(error){}.bind(this))}else if(queryString.length<3){this.selectedRow=-1;autoCompletePanel.style.display="none"}}},{key:"autoCompleteKeyEvent",value:function autoCompleteKeyEvent(event){var autoCompletePanel=document.getElementById("dts-search-auto-complete-panel");if(event.which==27){this.selectedRow=-1;autoCompletePanel.style.display="none"}else if(event.which==38){if(this.selectedRow>=0){--this.selectedRow;if(this.selectedRow==-1)this.searchInputValue=this.userText;else this.searchInputValue=this.autoCompleteList[this.selectedRow]}}else if(event.which==40){if(this.selectedRow<this.autoCompleteList.length-1){if(this.selectedRow==-1)this.userText=this.searchInputValue;++this.selectedRow;this.searchInputValue=this.autoCompleteList[this.selectedRow]}}else if(event.which==13){autoCompletePanel.style.display="none"}else{}for(var i=0;i<autoCompletePanel.children.length;++i){var row=autoCompletePanel.children[i];if(i==this.selectedRow)row.classList.add("dts-search-auto-complete-row-selected");else row.classList.remove("dts-search-auto-complete-row-selected")}}},{key:"runSearchWithQuery",value:function runSearchWithQuery(query){this.searchInputValue=query;this.runAutoSuggestSearch(undefined)}},{key:"runSystemSearch",value:function runSystemSearch(event){this.runSearch(event,"System")}},{key:"runAutoSuggestSearch",value:function runAutoSuggestSearch(event){this.runSearch(event,"Auto")}},{key:"runFreeformSearch",value:function runFreeformSearch(event){if(this.selectedRow!=-1){this.runSearch(event,"Auto")}else{this.runSearch(event,"Free")}}},{key:"runFreeformAdvancedSearch",value:function runFreeformAdvancedSearch(event){if(this.selectedRow!=-1){this.runAdvancedSearch(event,"Auto")}else{this.runAdvancedSearch(event,"Free")}}},{key:"runAdvancedSearch",value:function runAdvancedSearch(event,searchType){if(event){event.preventDefault()}var arrSelectedMenuCookie=[];var selectedMenuCookie=app.dts.common.cookie.readCookie("selectedMenu");if(selectedMenuCookie)arrSelectedMenuCookie=selectedMenuCookie.split("-")||[];arrSelectedMenuCookie[0]="1";app.dts.common.cookie.writeCookie("selectedMenu",arrSelectedMenuCookie.join("-"));var isDefault=true;if(this.dtsSearchPreFilterButton.dataset.searchTypeDefault!==undefined){isDefault=this.dtsSearchPreFilterButton.dataset.searchTypeDefault.toLowerCase()=="true"}if(searchType!=="Auto"&&!isDefault&&this.previousSearchType!=this.dtsSearchPreFilterButton.dataset.searchType){app.search.sendUserSearchTypeEvent(this.dtsSearchPreFilterButton.innerHTML,"Search Type Drop Down")}var query=this.searchInputValue;if(query&&query.length>0){query=encodeURIComponent(query)}var searchUrl=this.getAdvancedSearchUrlValue(searchType,query);window.location.href=searchUrl}},{key:"runSearch",value:function runSearch(event,searchType){if(event){event.preventDefault()}var query=this.searchInputValue;if(query.length>0&&!query.match(/^\s*$/g)&&query!==""&&query!==undefined&&query!==null){var searchUrl=this.getSearchUrlValue(encodeURIComponent(query),searchType);var isDefault=true;if(this.dtsSearchPreFilterButton.dataset.searchTypeDefault!==undefined){isDefault=this.dtsSearchPreFilterButton.dataset.searchTypeDefault.toLowerCase()=="true"}if(searchType!=="Auto"&&!isDefault&&this.previousSearchType!=this.dtsSearchPreFilterButton.dataset.searchType){app.search.sendUserSearchTypeEvent(this.dtsSearchPreFilterButton.innerHTML,"Search Type Drop Down")}window.location.href=searchUrl}}},{key:"searchInputValue",get:function get(){var query=this.searchInput.value;query=query.replace("/","");return query},set:function set(newValue){this.searchInput.value=newValue}}]);return TextSearchControl}();var MobileTextSearchControl=function(){function MobileTextSearchControl(mobileSearchComponentInitiator,searchComponent,searchInput,searchPreFilterMenu,closeButton,eventTypes,nodesToShow,nodesToHide,searchControlInstance){(0,_classCallCheck3.default)(this,MobileTextSearchControl);this.mobileSearchComponentInitiator=document.getElementById(mobileSearchComponentInitiator);this.searchComponent=document.getElementById(searchComponent);this.searchInput=document.getElementById(searchInput);this.prefiltereMenu=document.getElementById(searchPreFilterMenu);this.mobileSearchcloseButton=document.getElementById(closeButton);this.eventTypes=eventTypes;this.nodesToShow=nodesToShow.map(function(elem){return document.querySelector(elem)});this.nodesToHide=nodesToHide.map(function(elem){return document.querySelector(elem)});this.searchInstance=searchControlInstance;this.mobileSearchVisible=false;app.dts.common.events.eventListenerUtility(this.mobileSearchComponentInitiator,this.eventTypes,this.openMobileSearch.bind(this))}(0,_createClass3.default)(MobileTextSearchControl,[{key:"closeMobileSearch",value:function closeMobileSearch(evt){if(this.mobileSearchVisible){this.nodesToHide.forEach(function(elem){if(elem!==null){elem.removeAttribute("style")}});this.nodesToShow.forEach(function(elem){if(elem!==null){elem.removeAttribute("style")}});this.searchComponent.parentNode.removeAttribute("style");this.searchComponent.removeAttribute("style");if(evt!==undefined){var resetPrefilterNode=this.prefiltereMenu.firstElementChild;if(resetPrefilterNode.innerText==="All"){this.searchInstance.updatePreFilterNode(resetPrefilterNode,false)}else{console.warn("Search pre-filter markup has changed. Incorrect value passed.")}this.searchInput.value=""}this.mobileSearchVisible=false}}},{key:"openMobileSearch",value:function openMobileSearch(){if(!this.mobileSearchVisible){this.nodesToHide.forEach(function(elem){if(elem!==null){elem.style.display="none"}});this.nodesToShow.forEach(function(elem){if(elem!==null){elem.style.display="flex"}});this.searchComponent.parentNode.parentNode.style.width="100%";this.searchComponent.parentNode.style.width="100%";this.searchComponent.parentNode.style.alignItems="center";this.searchComponent.style.width="100%";this.mobileSearchVisible=true;app.dts.common.events.eventListenerUtility(this.mobileSearchcloseButton,this.eventTypes,this.closeMobileSearch.bind(this),true);this.searchInput.focus()}}}]);return MobileTextSearchControl}();function sendUserSearchTypeEvent(type,origin){if(document.getElementById("dtsTextSearchInput")&&document.getElementById("dtsTextSearchInput").value&&document.getElementById("dtsTextSearchInput").value.length>=3){dataLayer.push({"event":"trackEvent","eventCategory":"Free Text Search","eventAction":origin,"eventLabel":type,"eventValue":undefined,"nonInteraction":undefined})}}module.exports={TextSearchControl:TextSearchControl,MobileTextSearchControl:MobileTextSearchControl,sendUserSearchTypeEvent:sendUserSearchTypeEvent};

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(36);
__webpack_require__(26);
module.exports = __webpack_require__(151);


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(10);
var get = __webpack_require__(62);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _stringify=__webpack_require__(21);var _stringify2=_interopRequireDefault(_stringify);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function required(){throw new Error("Missing parameter")}function doXhrRequest(){var method=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var url=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var data=arguments.length>2&&arguments[2]!==undefined?arguments[2]:undefined;var successCallback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:undefined;var errorCallback=arguments.length>4&&arguments[4]!==undefined?arguments[4]:undefined;var xhr=new XMLHttpRequest;xhr.open(method,url,true);xhr.onload=function(){if(xhr.readyState===4){if(xhr.status>=200&&xhr.status<300){if(successCallback)successCallback(JSON.parse(xhr.responseText))}else if(xhr.status>=400&&xhr.status<500){if(errorCallback)errorCallback(xhr.responseText)}else{if(errorCallback)errorCallback("net")}}};xhr.onerror=function(){if(errorCallback)errorCallback("net")};if(data){xhr.setRequestHeader("Content-Type","application/json; charset=UTF-8");xhr.send((0,_stringify2.default)(data))}else{xhr.send()}}function urlOrientation(){if(window&&window.location){if(window.location.pathname.startsWith("/straight"))return"straight";if(window.location.pathname.startsWith("/gay"))return"gay";return"straight"}}var CartItemType=function(){function CartItemType(){(0,_classCallCheck3.default)(this,CartItemType)}(0,_createClass3.default)(CartItemType,null,[{key:"MinutePackage",get:function get(){return"MinutePackage"}},{key:"Rental",get:function get(){return"Rental"}},{key:"Download",get:function get(){return"Download"}}]);return CartItemType}();var Download=function Download(){var movieId=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();(0,_classCallCheck3.default)(this,Download);this.type=CartItemType.Download;this.movieId=movieId};var Rental=function Rental(){var movieId=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var durrationHours=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();(0,_classCallCheck3.default)(this,Rental);this.type=CartItemType.Rental;this.movieId=movieId;this.value=durrationHours};var MinutePackage=function MinutePackage(){var minuteQuantity=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();(0,_classCallCheck3.default)(this,MinutePackage);this.type=CartItemType.MinutePackage;this.value=minuteQuantity};var Card=function Card(){var cardNumber=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var expirationMonth=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var expirationYear=arguments.length>2&&arguments[2]!==undefined?arguments[2]:required();var cvv2=arguments.length>3&&arguments[3]!==undefined?arguments[3]:required();(0,_classCallCheck3.default)(this,Card);this.cardNumber=cardNumber;this.expirationMonth=expirationMonth;this.expirationYear=expirationYear;this.cvv2=cvv2};var Cart=function(){function Cart(){(0,_classCallCheck3.default)(this,Cart)}(0,_createClass3.default)(Cart,[{key:"payWithCreditCard",value:function payWithCreditCard(){var card=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var saveCC=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var makeDefault=arguments.length>2&&arguments[2]!==undefined?arguments[2]:required();var totalAmount=arguments.length>3&&arguments[3]!==undefined?arguments[3]:required();var successCallback=arguments.length>4&&arguments[4]!==undefined?arguments[4]:required();var errorCallback=arguments.length>5&&arguments[5]!==undefined?arguments[5]:undefined;doXhrRequest("POST","/"+urlOrientation()+"/shopping/checkout/card",{"cardNumber":card.cardNumber,"expirationMonth":card.expirationMonth,"expirationYear":card.expirationYear,"cvv2":card.cvv2,"saveCC":saveCC,"makeDefault":makeDefault,"totalAmount":totalAmount},successCallback,errorCallback)}},{key:"payWithAch",value:function payWithAch(){var savePayment=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var totalAmount=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var successCallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:required();var flowStack=arguments[3];var errorCallback=arguments.length>4&&arguments[4]!==undefined?arguments[4]:undefined;doXhrRequest("POST","/"+urlOrientation()+"/shopping/checkout/ach?f="+encodeURIComponent(flowStack),{"totalAmount":totalAmount,"savePayment":savePayment},successCallback,errorCallback)}},{key:"payWithEuDirectDebit",value:function payWithEuDirectDebit(){var savePayment=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var totalAmount=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var successCallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:required();var flowStack=arguments[3];var errorCallback=arguments.length>4&&arguments[4]!==undefined?arguments[4]:undefined;doXhrRequest("POST","/"+urlOrientation()+"/shopping/checkout/euDirectDebit?f="+encodeURIComponent(flowStack),{"totalAmount":totalAmount,"savePayment":savePayment},successCallback,errorCallback)}},{key:"payWithSavedPayment",value:function payWithSavedPayment(){var savedPaymentReference=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var totalAmount=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var makeDefault=arguments.length>2&&arguments[2]!==undefined?arguments[2]:required();var successCallback=arguments.length>3&&arguments[3]!==undefined?arguments[3]:required();var errorCallback=arguments.length>4&&arguments[4]!==undefined?arguments[4]:undefined;doXhrRequest("POST","/"+urlOrientation()+"/shopping/checkout/saved-payment-method",{"savedPaymentReference":savedPaymentReference,"totalAmount":totalAmount,"makeDefault":makeDefault},successCallback,errorCallback)}}]);return Cart}();var SavedPayments=function(){function SavedPayments(){(0,_classCallCheck3.default)(this,SavedPayments)}(0,_createClass3.default)(SavedPayments,[{key:"removeCard",value:function removeCard(){var savedPaymentReference=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var successCallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var errorCallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:undefined;doXhrRequest("DELETE","/member/payment-methods/cards/"+savedPaymentReference,undefined,successCallback,errorCallback)}},{key:"removeAch",value:function removeAch(){var savedPaymentReference=arguments.length>0&&arguments[0]!==undefined?arguments[0]:required();var successCallback=arguments.length>1&&arguments[1]!==undefined?arguments[1]:required();var errorCallback=arguments.length>2&&arguments[2]!==undefined?arguments[2]:undefined;doXhrRequest("DELETE","/member/payment-methods/achs/"+savedPaymentReference,undefined,successCallback,errorCallback)}}]);return SavedPayments}();module.exports={Card:Card,cart:new Cart,savedPayments:new SavedPayments};

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _cardValidator=__webpack_require__(154);var _cookieChoiceMenu=__webpack_require__(155);var _vrCookieConfig=__webpack_require__(156);var _sceneImageHandler=__webpack_require__(157);var _showHideDescriptionText=__webpack_require__(158);var _passwordToggle=__webpack_require__(159);var _lazyLoad=__webpack_require__(160);var LazyLoad=_interopRequireWildcard(_lazyLoad);var _nodeHighlighter=__webpack_require__(161);var _helpers=__webpack_require__(32);var helpers=_interopRequireWildcard(_helpers);var _filterIcons=__webpack_require__(162);var _grid=__webpack_require__(163);var _carousels=__webpack_require__(76);var carousels=_interopRequireWildcard(_carousels);var _captchaHelper=__webpack_require__(164);var _edge=__webpack_require__(165);var _MobilePanningIcon=__webpack_require__(166);var _sceneStripScroller=__webpack_require__(167);var _updateMemberListAjax=__webpack_require__(168);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}module.exports={CardValidator:_cardValidator.CardValidator,CookieChoiceMenu:_cookieChoiceMenu.CookieChoiceMenu,VRCookieConfig:_vrCookieConfig.VRCookieConfig,SceneImageHandler:_sceneImageHandler.SceneImageHandler,NodeHighlighter:_nodeHighlighter.NodeHighlighter,ShowHideDescriptionText:_showHideDescriptionText.ShowHideDescriptionText,PasswordToggle:_passwordToggle.PasswordToggle,LazyLoad:LazyLoad,helpers:helpers,toggleFilterIcon:_filterIcons.toggleFilterIcon,gridJustifier:_grid.gridJustifier,carousels:carousels,CaptchaHelper:_captchaHelper.CaptchaHelper,fixColumns:_edge.fixColumns,MobilePanningIcon:_MobilePanningIcon.MobilePanningIcon,SceneStripScroller:_sceneStripScroller.SceneStripScroller,UpdateMemberList:_updateMemberListAjax.UpdateMemberList};

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var VALID_CARDS=['VISA','MASTERCARD','DINERS_CLUB','DISCOVER','JCB'];var CARD_CHECK_EVENTS=['click'];var CUSTOM_MESSAGE={valueMissing:'A valid credit card number is required.',invalidCardType:'Accepted card types, Visa, Mastercard, Diners Club, Discover, JCB, Delta, Electron.',invalidCardNumber:'Please check and re-enter your card number.',expiredDate:'The expiration date indicates your card has expired, please check.',emptyYearField:'Please enter a year',emptyMonthField:'Please enter a month',emptyCCV:'Please enter your CVV2 number',invalidCCV:'CVV2 must be 3 digits'};var CardValidator=function(){function CardValidator(cardNumberFieldId,monthFieldId,yearFieldId,ccvNode,serverDate,submitButton,options){(0,_classCallCheck3.default)(this,CardValidator);this.cardInput=document.getElementById(cardNumberFieldId);this.monthInput=document.getElementById(monthFieldId);this.yearInput=document.getElementById(yearFieldId);this.ccvInput=document.getElementById(ccvNode);this.serverDate=serverDate;this.submitButton=document.getElementById(submitButton);this.options=options||undefined;dts.common.events.eventListenerUtility(this.submitButton,CARD_CHECK_EVENTS,this.checkCard.bind(this),false)}(0,_createClass3.default)(CardValidator,[{key:'checkCard',value:function checkCard(){if(this.options!==undefined&&this.options.abort.check!=undefined&&this.options.abort.challenge!=undefined){var check=typeof this.options.abort.check==='function'?this.options.abort.check():this.options.abort.check;var challenge=typeof this.options.abort.challenge==='function'?this.options.abort.challenge():this.options.abort.challenge;if(check!==challenge){this.ccvInput.setCustomValidity('');this.monthInput.setCustomValidity('');this.yearInput.setCustomValidity('');this.cardInput.setCustomValidity('');return}}this.checkCCV();this.checkDate();this.checkTypeNumber()}},{key:'checkCCV',value:function checkCCV(){var inputCCV=this.ccvInput.value;var reg=new RegExp('^[0-9]{3,4}$');if(inputCCV==''){this.ccvInput.setCustomValidity('');this.ccvInput.setCustomValidity(CUSTOM_MESSAGE.emptyCCV)}else{if(reg.test(inputCCV)){this.ccvInput.setCustomValidity('')}else{this.ccvInput.setCustomValidity('');this.ccvInput.setCustomValidity(CUSTOM_MESSAGE.invalidCCV)}}}},{key:'checkDate',value:function checkDate(){var serverMonth=this.serverDate.getMonth();var serverYear=this.serverDate.getFullYear();var inputMonth=this.monthInput.value;var inputYear=this.yearInput.value;this.monthInput.setCustomValidity('');this.yearInput.setCustomValidity('');if(inputMonth==''){this.monthInput.setCustomValidity('');this.monthInput.setCustomValidity(CUSTOM_MESSAGE.emptyMonthField);return}if(inputYear==''){this.yearInput.setCustomValidity('');this.yearInput.setCustomValidity(CUSTOM_MESSAGE.emptyYearField);return}if(inputYear<serverYear){this.monthInput.setCustomValidity('');this.yearInput.setCustomValidity('');this.yearInput.setCustomValidity(CUSTOM_MESSAGE.expiredDate);return}if(inputMonth<serverMonth+1&&inputYear==serverYear){this.monthInput.setCustomValidity('');this.monthInput.setCustomValidity(CUSTOM_MESSAGE.expiredDate)}}},{key:'checkTypeNumber',value:function checkTypeNumber(){var cardNum=this.cardInput.value;if(this.getCardType(cardNum)==='UNKNOWN'){this.cardInput.setCustomValidity(CUSTOM_MESSAGE.valueMissing)}else if(VALID_CARDS.indexOf(this.getCardType(cardNum))==-1){this.cardInput.setCustomValidity('');this.cardInput.setCustomValidity(CUSTOM_MESSAGE.invalidCardType)}else if(!this.isCardValid(cardNum)){this.cardInput.setCustomValidity('');this.cardInput.setCustomValidity(CUSTOM_MESSAGE.invalidCardNumber)}else{this.cardInput.setCustomValidity('')}}},{key:'getCardType',value:function getCardType(cardNum){if(!cardNum)return'UNKNOWN';cardNum=this.digitsOnly(cardNum);if(cardNum.length<4)return'UNKNOWN';var twoDigits=parseInt(cardNum.substring(0,2));var threeDigits=parseInt(cardNum.substring(0,3));var fourDigits=parseInt(cardNum.substring(0,4));var sixDigits=parseInt(cardNum.substring(0,6));if(cardNum.indexOf('34')==0||cardNum.indexOf('37')==0)return'AMEX';if(cardNum.indexOf('5610')==0||sixDigits>=560221&&sixDigits<=560225)return'BANKCARD';if(cardNum.indexOf('62')==0||cardNum.indexOf('88')==0)return'CHINA_UNIONPAY';if(threeDigits>=300&&threeDigits<=305||cardNum.indexOf('309')==0||cardNum.indexOf('36')==0||cardNum.indexOf('38')==0||cardNum.indexOf('39')==0)return'DINERS_CLUB';if(cardNum.indexOf('6011')==0||cardNum.indexOf('64')==0||cardNum.indexOf('65')==0)return'DISCOVER';if(cardNum.indexOf('60')==0||cardNum.indexOf('6521')==0)return'RUPAY';if(cardNum.indexOf('636')==0)return'INTERPAYMENT';if(threeDigits>=637&&threeDigits<=639)return'INSTAPAYMENT';if(fourDigits>=3528&&fourDigits<=3589)return'JCB';if(cardNum.indexOf('6304')==0||cardNum.indexOf('6706')==0||cardNum.indexOf('6771')==0||cardNum.indexOf('6709')==0)return'LASER';if(cardNum.indexOf('50')==0||twoDigits>=56&&twoDigits<=58)return'MAESTRO';if(cardNum.indexOf('5019')==0)return'DANKORT';if(fourDigits>=2200&&fourDigits<=2204)return'MIR';if(fourDigits>=2221&&fourDigits<=2720||twoDigits>=51&&twoDigits<=55)return'MASTERCARD';if(cardNum.indexOf('6334')==0||cardNum.indexOf('6767')==0)return'SOLO';if(cardNum.indexOf('4903')==0||cardNum.indexOf('4905')==0||cardNum.indexOf('4911')==0||cardNum.indexOf('4936')==0||cardNum.indexOf('564182')==0||cardNum.indexOf('633110')==0||cardNum.indexOf('6333')==0||cardNum.indexOf('6759')==0)return'SWITCH';if(sixDigits>=979200&&sixDigits<=979289)return'TROY';if(cardNum.indexOf('4')==0)return'VISA';if(cardNum.indexOf('1')==0)return'UATP';if(sixDigits>=506099&&sixDigits<=506198||sixDigits>=650002&&sixDigits<=650027)return'VERVE';return'UNKNOWN'}},{key:'isCardValid',value:function isCardValid(cardNum){if(!cardNum)return false;cardNum=this.digitsOnly(cardNum);if(cardNum.length<8||cardNum.length>19)return false;var sum=0;var n=0;var addend=0;var timesTwo=false;for(var i=cardNum.length-1;i>=0;i--){n=parseInt(cardNum.charAt(i),10);if(timesTwo){addend=n*2;if(addend>9)addend-=9}else{addend=n}sum+=addend;timesTwo=!timesTwo}return sum%10==0}},{key:'digitsOnly',value:function digitsOnly(cardNum){var cardOut='';for(var i=0;i<cardNum.length;++i){if(cardNum.charAt(i)>='0'&&cardNum.charAt(i)<='9')cardOut=cardOut+cardNum.charAt(i)}return cardOut}}]);return CardValidator}();module.exports={CardValidator:CardValidator};

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var MENU_COOKIE_NAME_ATTRIBUTE="data-cookie-name";var MENU_DEFAULT_VALUE_ATTRIBUTE="data-default-value";var MENU_COOKIE_EXPIRATION_DAYS_ATTRIBUTE="data-cookie-expiration-days";var CHILD_VALUE_ATTRIBUTE="data-value";var GTM_EVENT_CATEGORY="data-gtm-event-category";var GTM_EVENT_ACTION="data-gtm-event-action";var GTM_CHILD_EVENT_LABEL="data-gtm-event-label";var GTM_EVENT_DEFAULT_VALUE="data-gtm-event-default-value";var CookieChoiceMenu=function(){function CookieChoiceMenu(menuId,selectedClassName){(0,_classCallCheck3.default)(this,CookieChoiceMenu);this.menuId=menuId;var menuElement=document.getElementById(menuId);if(menuElement){this.cookieName=menuElement.getAttribute(MENU_COOKIE_NAME_ATTRIBUTE);this.selectedClassName=selectedClassName;this.gtmEventCategory=menuElement.getAttribute(GTM_EVENT_CATEGORY);this.gtmEventAction=menuElement.getAttribute(GTM_EVENT_ACTION);this.gtmEventDefaultValue=menuElement.getAttribute(GTM_EVENT_DEFAULT_VALUE);if(!this.cookieName){console.error("required attribute data-cookie-name missing from menu element.")}this.defaultValue=menuElement.getAttribute(MENU_DEFAULT_VALUE_ATTRIBUTE);if(menuElement.hasAttribute(MENU_COOKIE_EXPIRATION_DAYS_ATTRIBUTE)){this.cookieExpirationDays=menuElement.getAttribute(MENU_COOKIE_EXPIRATION_DAYS_ATTRIBUTE)}this.children=[];var nodeList=dts.common.dom.returnArrayFromList(menuElement.childNodes);nodeList.forEach(function(childNode){if(childNode.nodeType==Node.ELEMENT_NODE){if(childNode.hasAttribute(CHILD_VALUE_ATTRIBUTE)){this.children.push(childNode);childNode.addEventListener("click",this.clickOption.bind(this),false)}}}.bind(this));this.updateDisplay()}else{console.error("Unable to get menu element: ",menuId)}}(0,_createClass3.default)(CookieChoiceMenu,[{key:"updateDisplay",value:function updateDisplay(){var currentValue=this.readCookieValue();this.children.forEach(function(childNode){var childValue=childNode.getAttribute(CHILD_VALUE_ATTRIBUTE);if(currentValue===childValue||currentValue===null&&childValue===this.defaultValue){childNode.classList.add(this.selectedClassName)}else{childNode.classList.remove(this.selectedClassName)}}.bind(this))}},{key:"readCookieValue",value:function readCookieValue(){return dts.common.cookie.readCookie(this.cookieName)}},{key:"writeCookieValue",value:function writeCookieValue(value){if(value==="undefined"||value===""){dts.common.cookie.deleteCookie(this.cookieName)}else{dts.common.cookie.writeCookie(this.cookieName,value,this.cookieExpirationDays)}}},{key:"reset",value:function reset(){if(this.defaultValue==="undefined"||this.defaultValue===""){dts.common.cookie.deleteCookie(this.cookieName)}else{dts.common.cookie.writeCookie(this.cookieName,this.defaultValue,this.cookieExpirationDays)}if(this.gtmEventCategory){if(this.gtmEventDefaultValue){dataLayer.push({"event":"trackEvent","eventCategory":this.gtmEventCategory,"eventAction":this.gtmEventAction,"eventLabel":this.gtmEventDefaultValue,"eventValue":undefined,"nonInteraction":undefined})}}this.updateDisplay()}},{key:"clickOption",value:function clickOption(event){var elem=event.target;if(!elem)elem=event.srcElement;var value=elem.getAttribute(CHILD_VALUE_ATTRIBUTE);var currentValue=this.readCookieValue();if(currentValue!=value&&!(currentValue===null&&value==="")){if(this.gtmEventCategory){var gtmLabel=elem.getAttribute(GTM_CHILD_EVENT_LABEL);if(gtmLabel){dataLayer.push({"event":"trackEvent","eventCategory":this.gtmEventCategory,"eventAction":this.gtmEventAction,"eventLabel":gtmLabel,"eventValue":undefined,"nonInteraction":undefined})}}this.writeCookieValue(value);this.updateDisplay()}}}]);return CookieChoiceMenu}();module.exports={CookieChoiceMenu:CookieChoiceMenu};

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var TYPE_ATTRIBUTE="type";var CONFIG_NAME_ATTRIBUTE="data-config-name";var DEFAULT_VALUE_ATTRIBUTE="data-default-value";var COOKIE_EXPIRATION_DAYS=3650;var VRCookieConfig=function(){function VRCookieConfig(cookieName,inputIdList){(0,_classCallCheck3.default)(this,VRCookieConfig);this.cookieName=cookieName;this.inputIdList=inputIdList;if(inputIdList){this.inputNodes=[];inputIdList.forEach(function(inputId){var node=document.getElementById(inputId);if(node){if(node.nodeName==="INPUT"){if(!node.hasAttribute(CONFIG_NAME_ATTRIBUTE)||!node.hasAttribute(DEFAULT_VALUE_ATTRIBUTE)){console.error("Input must have the following attributes: ",CONFIG_NAME_ATTRIBUTE,DEFAULT_VALUE_ATTRIBUTE)}this.inputNodes.push(node)}else{console.error("Expected node with id '"+inputId+"' to an INPUT but found "+node.nodeName)}}else{console.error("Error loading element by id: ",inputId)}}.bind(this));this.updateDisplay()}else{console.error("inputIdList must be provided.")}}(0,_createClass3.default)(VRCookieConfig,[{key:"updateDisplay",value:function updateDisplay(){var config=dts.common.cookie.readConfigCookie(this.cookieName);this.inputNodes.forEach(function(node){var configName=node.getAttribute(CONFIG_NAME_ATTRIBUTE);var defaultValue=node.getAttribute(DEFAULT_VALUE_ATTRIBUTE);var inputType=node.getAttribute(TYPE_ATTRIBUTE);var inputValue=defaultValue;if(config[configName]!==undefined){inputValue=config[configName]}if(inputType.toLowerCase()==="checkbox"){node.checked=String(inputValue).toLowerCase()==="true"}else{node.value=inputValue}}.bind(this))}},{key:"save",value:function save(){var config={};this.inputNodes.forEach(function(node){var configName=node.getAttribute(CONFIG_NAME_ATTRIBUTE);var defaultValue=node.getAttribute(DEFAULT_VALUE_ATTRIBUTE);var inputType=node.getAttribute(TYPE_ATTRIBUTE);if(inputType.toLowerCase()==="checkbox"){config[configName]=node.checked}else{config[configName]=node.value}}.bind(this));dts.common.cookie.writeConfigCookie(this.cookieName,config)}},{key:"reset",value:function reset(){var config={};this.inputNodes.forEach(function(node){var configName=node.getAttribute(CONFIG_NAME_ATTRIBUTE);var defaultValue=node.getAttribute(DEFAULT_VALUE_ATTRIBUTE);var inputType=node.getAttribute(TYPE_ATTRIBUTE);if(inputType.toLowerCase()==="checkbox"){config[configName]=defaultValue.toLowerCase()==="true"}else{config[configName]=defaultValue}}.bind(this));dts.common.cookie.writeConfigCookie(this.cookieName,config);this.updateDisplay()}}]);return VRCookieConfig}();module.exports={VRCookieConfig:VRCookieConfig};

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _promise=__webpack_require__(59);var _promise2=_interopRequireDefault(_promise);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var LOADING_IMAGE_DISPLAY_DELAY_MILLISECONDS=250;var HEART_BEAT_INTERVAL_MILLISECONDS=100;var SceneImageHandler=function(){function SceneImageHandler(imageClickTargetId,imageId,scrubberId,startSeconds,endSeconds,defaultImageSeconds,imageUrlTemplate,imageClickHandler){var _this=this;(0,_classCallCheck3.default)(this,SceneImageHandler);if(defaultImageSeconds<0){var duration=endSeconds-startSeconds;defaultImageSeconds=Math.round(startSeconds+duration*0.3)}var flubFactor=5;var maxImageCount=20;startSeconds+=flubFactor;endSeconds-=flubFactor;var numImagesTotal=Math.floor((endSeconds-startSeconds)/10);if(numImagesTotal<1)numImagesTotal=1;var imageIncrement=1;if(numImagesTotal>maxImageCount){numImagesTotal=maxImageCount;imageIncrement=(endSeconds-startSeconds)/numImagesTotal}this.images=[{url:this.toImageUrl(imageUrlTemplate,defaultImageSeconds),timeCodeSeconds:startSeconds}];for(i=0;i<numImagesTotal;++i){var timeInSeconds=Math.round(startSeconds+i*imageIncrement);this.images.push({url:this.toImageUrl(imageUrlTemplate,timeInSeconds),timeCodeSeconds:timeInSeconds})}this.imageClickTargetId;this.imageId=imageId;this.scrubberId=scrubberId;this.currentImageIndex=0;this.imageClickHandler=imageClickHandler;this.loadingImage=undefined;new _promise2.default(function(resolve,reject){if(_this.imageClickTarget=document.getElementById(imageClickTargetId))resolve()}).then(function(){_this.imageClickTarget.addEventListener('click',_this.handleClick.bind(_this),false)});new _promise2.default(function(resolve,reject){if(_this.imageElement=document.getElementById(imageId))resolve()}).then(function(){var slider=new dts.Slider(scrubberId,0,_this.updateImage.bind(_this),{minValue:0,maxValue:_this.images.length-1,height:'46px',progressColor:'white',barColor:'#909090'});_this.imageElement.addEventListener('load',_this.imageLoaded.bind(_this),false)});setInterval(this.heartBeatHandler.bind(this),HEART_BEAT_INTERVAL_MILLISECONDS)}(0,_createClass3.default)(SceneImageHandler,[{key:'toImageUrl',value:function toImageUrl(imageUrlTemplate,timeInSeconds){var imageIndex=''+Math.round(timeInSeconds/10);while(imageIndex.length<8){imageIndex='0'+imageIndex}return imageUrlTemplate.replace('{INDEX}',imageIndex)}},{key:'heartBeatHandler',value:function heartBeatHandler(){if(this.lastImageLoadTime!==undefined){var now=new Date().getTime();if(now-this.lastImageLoadTime>LOADING_IMAGE_DISPLAY_DELAY_MILLISECONDS){this.addLoadingImage()}}}},{key:'updateImage',value:function updateImage(imageIndex){if(this.currentImageIndex!==imageIndex){this.currentImageIndex=imageIndex;var image=this.images[this.currentImageIndex];this.imageElement.src=image.url;this.removeLoadingImage();this.lastImageLoadTime=new Date().getTime()}}},{key:'imageLoaded',value:function imageLoaded(event){this.lastImageLoadTime=undefined;this.removeLoadingImage()}},{key:'createLoadingImage',value:function createLoadingImage(){var image=document.createElement('div');image.classList.add('dts-scene-result-loading');image.innerHTML='\t\t\t<div class="dts-scene-result-loading-image-wrapper">\t\t\t\t<i class="dts-icon-loading dts-scene-result-loading-image dts-spin"></i>\t\t\t</div>\t\t';return image}},{key:'addLoadingImage',value:function addLoadingImage(){if(this.loadingImage===undefined){this.loadingImage=this.createLoadingImage();this.imageElement.parentNode.insertBefore(this.loadingImage,this.imageElement.nextSibling)}}},{key:'removeLoadingImage',value:function removeLoadingImage(){if(this.loadingImage!==undefined){this.loadingImage.parentNode.removeChild(this.loadingImage);this.loadingImage=undefined}}},{key:'handleClick',value:function handleClick(event){if(event){if(event.target.nodeName!=='A'){if(event.target.queueDragging)return;event.preventDefault();if(this.imageClickHandler){if(this.currentImageIndex==0)this.imageClickHandler(undefined);else{var image=this.images[this.currentImageIndex];this.imageClickHandler(image.timeCodeSeconds)}}}}}},{key:'reset',value:function reset(){this.slider.value=0}}]);return SceneImageHandler}();module.exports={SceneImageHandler:SceneImageHandler};

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var RESIZE_EVENTS=['resize','orientationchange'];var ShowHideDescriptionText=function(){function ShowHideDescriptionText(controlNode,controlInnerHtmlVisible,controlInnerHtmlHidden,controlClassName,siblingClassName,displayProp,eventArray){(0,_classCallCheck3.default)(this,ShowHideDescriptionText);this.control=document.querySelector(controlNode);this.sibling=this.control.previousElementSibling;this.controlHtmlVisible=controlInnerHtmlVisible;this.controlHtmlHidden=controlInnerHtmlHidden;this.controlClass=controlClassName;this.siblingClass=siblingClassName;this.controlDisplayProperty=displayProp;this.events=eventArray;this.defaultHeightOfSibling=this.getDefaultHeightOfSibling();app.dts.common.events.eventListenerUtility(this.control,this.events,this.showHideDescriptionText.bind(this),false);app.dts.common.events.eventListenerUtility(window,['load'],this.showControl.bind(this),false);app.dts.common.events.eventListenerUtility(window,RESIZE_EVENTS,this.showControl.bind(this),false)}(0,_createClass3.default)(ShowHideDescriptionText,[{key:'getDefaultHeightOfSibling',value:function getDefaultHeightOfSibling(){var siblingSelector='.'+this.sibling.getAttribute('class');var stylesheetName=document.styleSheets[0].href.match(/theme_.*\.css/);if(Array.isArray(stylesheetName)&&stylesheetName.length)stylesheetName=stylesheetName[0];return parseInt(app.dts.common.css.getClassValue(stylesheetName,siblingSelector,'height'),10)}},{key:'showControl',value:function showControl(){if(this.sibling.scrollHeight>this.defaultHeightOfSibling){this.control.style.display=this.controlDisplayProperty;this.control.parentNode.style.paddingBottom='36px'}else{this.control.removeAttribute('style');this.control.parentNode.removeAttribute('style')}}},{key:'showHideDescriptionText',value:function showHideDescriptionText(){app.dts.common.css.addRemoveClassName(this.sibling,this.siblingClass);app.dts.common.css.addRemoveClassName(this.control,this.controlClass);if(this.control.classList.contains(this.controlClass)){this.control.innerHTML=this.controlHtmlVisible}else{this.control.innerHTML=this.controlHtmlHidden}}}]);return ShowHideDescriptionText}();module.exports={ShowHideDescriptionText:ShowHideDescriptionText};

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PasswordToggle=function(){function PasswordToggle(initiatorId,inputId,svgUseId,classVisibilityOn,classVisibilityOff){(0,_classCallCheck3.default)(this,PasswordToggle);this.inititatorId=initiatorId;this.inputId=inputId;this.svgUseId=svgUseId;this.visibleValue=classVisibilityOn;this.hiddenValue=classVisibilityOff;var initiator=document.getElementById(this.inititatorId);if(initiator){dts.common.events.eventListenerUtility(initiator,['click'],this.handleClick.bind(this),false)}else{throw'Unable to get initiator: '+this.initiatorId}this.input=document.getElementById(this.inputId);if(this.input===null){throw'Unable to get input: '+this.inputId}this.svgUseElement=document.getElementById(this.svgUseId);if(this.svgUseElement===null){throw'Unable to get svgUse: '+this.svgUseId}}(0,_createClass3.default)(PasswordToggle,[{key:'handleClick',value:function handleClick(event){if(event){if(this.input.getAttribute('type')==='text'){this.input.setAttribute('type','password');this.svgUseElement.classList.remove(this.visibleValue);this.svgUseElement.classList.add(this.hiddenValue)}else{this.input.setAttribute('type','text');this.svgUseElement.classList.remove(this.hiddenValue);this.svgUseElement.classList.add(this.visibleValue)}}}}]);return PasswordToggle}();module.exports={PasswordToggle:PasswordToggle};

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var LazyLoad=function(){function LazyLoad(){(0,_classCallCheck3.default)(this,LazyLoad);this.components=[];this.isRunning=false;this.isDirty=true;this.reloopDelay=100;var thisBecauseJavascriptScopeIsAHorridMess=this;window.addEventListener("DOMContentLoaded",function(){thisBecauseJavascriptScopeIsAHorridMess.check()});window.addEventListener("scroll",function(){thisBecauseJavascriptScopeIsAHorridMess.check()});window.addEventListener("resize",function(){thisBecauseJavascriptScopeIsAHorridMess.check()});setInterval(function(){thisBecauseJavascriptScopeIsAHorridMess.check()},200)}(0,_createClass3.default)(LazyLoad,[{key:"add",value:function add(elem,callback){this.components.push({elem:elem,callback:callback})}},{key:"remove",value:function remove(elem){for(var i=0;i<this.components.length;++i){if(this.components.elem==elem){this.components.splice(i,1);break}}}},{key:"check",value:function check(){this.isDirty=true;if(!this.isRunning){this.isRunning=true;var thisBecauseJavascriptScopeIsAHorridMess=this;setTimeout(function(){thisBecauseJavascriptScopeIsAHorridMess._internalScan()},10)}}},{key:"_internalScan",value:function _internalScan(){var _this=this;this.isRunning=true;this.isDirty=false;var viewportWidth=window.innerWidth||document.documentElement.clientWidth;var viewportHeight=window.innerHeight||document.documentElement.clientHeight;var doc=document.documentElement;var _loop=function _loop(_i){var elem=_this.components[_i].elem;var rect=elem.getBoundingClientRect();if(rect.top<viewportHeight&&rect.bottom>0&&rect.left<viewportWidth&&rect.right>0){var callback=_this.components[_i].callback;_this.components.splice(_i,1);--_i;var _thisBecauseJavascriptScopeIsAHorridMess=_this;setTimeout(function(){callback(elem)},10)}i=_i};for(var i=0;i<this.components.length;++i){_loop(i)}var thisBecauseJavascriptScopeIsAHorridMess=this;setTimeout(function(){thisBecauseJavascriptScopeIsAHorridMess._internalEnd()},this.reloopDelay)}},{key:"_internalEnd",value:function _internalEnd(){if(this.isDirty){this._internalScan()}else{this.isRunning=false}}}]);return LazyLoad}();var ajaxFillerCallback=function ajaxFillerCallback(element){var ajaxArgs={};if(globalLazyLoadParams){for(var prop in globalLazyLoadParams){if(globalLazyLoadParams.hasOwnProperty(prop)){ajaxArgs[prop]=globalLazyLoadParams[prop]}}}var ajaxPath="";var callback="";if(element.dataset){ajaxPath=element.dataset.loc;callback=element.dataset.callback;for(var _prop in element.dataset){if(_prop!="loc"&&_prop!="callback"){ajaxArgs[_prop]=element.dataset[_prop]}}}var xmlHttpRequest=new XMLHttpRequest;xmlHttpRequest.onreadystatechange=function(){if(this.readyState==4&&this.status==200){element.innerHTML=this.responseText;if(callback){window[callback]()}}};xmlHttpRequest.onerror=function(){console.error("XMLHttpRequest POST Error: ",this.responseText)};xmlHttpRequest.open("POST",ajaxPath,true);xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");var formData="";for(var property in ajaxArgs){if(ajaxArgs.hasOwnProperty(property)){var value=ajaxArgs[property];if(value){if(formData.length>0){formData=formData+"&"}formData=formData+property+"="+encodeURIComponent(value)}}}xmlHttpRequest.send(formData)};module.exports={LazyLoad:LazyLoad,ajaxFillerCallback:ajaxFillerCallback};

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NodeHighlighter=function(){function NodeHighlighter(cssClassName,timeout,pixelOffset,collectionId){(0,_classCallCheck3.default)(this,NodeHighlighter);this.cssClassName=cssClassName;this.timeout=timeout||12000;this.pixelOffset=pixelOffset||0;this.collectionName=collectionId;window.addEventListener('load',this.doHighlight.bind(this))}(0,_createClass3.default)(NodeHighlighter,[{key:'getNotificationOffset',value:function getNotificationOffset(){var notificationNode=document.getElementById('dts-user-notifications');return notificationNode.childElementCount>0?notificationNode.clientHeight+this.pixelOffset:false}},{key:'isHashQueue',value:function isHashQueue(hashStringArray){var hashContainerName=hashStringArray[0];return hashContainerName===this.collectionName}},{key:'doHighlight',value:function doHighlight(){if(location.hash){var notificationOffset=this.getNotificationOffset();var hashString=location.hash.slice(1);var hashStringArray=hashString.split('-');var hashSceneNode=document.getElementById(hashString);if(notificationOffset&&this.isHashQueue(hashStringArray)){if(hashSceneNode){this.scrollWindow(notificationOffset,null);hashSceneNode.classList.add(this.cssClassName);setTimeout(function(){hashSceneNode.classList.remove(this.cssClassName)},this.timeout)}else{var hashContainerNode=document.getElementById(hashStringArray[0]);var panelNode=dts.common.dom.getParentNode(hashContainerNode,'.dts-panel');var panelBoundingRect=panelNode.getBoundingClientRect();this.scrollWindow(notificationOffset,panelBoundingRect.top);hashContainerNode.classList.add(this.cssClassName);setTimeout(function(){hashContainerNode.classList.remove(this.cssClassName)},this.timeout)}}}}},{key:'scrollWindow',value:function scrollWindow(notificationOffset,panelTop){var scrollOffsetTop=window.pageYOffset||document.documentElement.scrollTop;if(panelTop){document.documentElement.scrollTop=document.body.scrollTop=scrollOffsetTop+panelTop-notificationOffset}else{document.documentElement.scrollTop=document.body.scrollTop=scrollOffsetTop-notificationOffset}}}]);return NodeHighlighter}();module.exports={NodeHighlighter:NodeHighlighter};

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function toggleFilterIcon(link){var ancestorElement=link.closest('ul');var linkList=ancestorElement.querySelectorAll('a');var elIcon=link.querySelector('i');var className=elIcon.className.match(/dts\-icon\-[^\s]*/);className=Array.isArray(className)&&className.length?className[0]:'';var toggledIconClassName='';var elListRadio='';var elCurrentCheckedRadio='';var disableLinks=function disableLinks(){for(var i=0;i<linkList.length;i++){linkList[i].style.pointerEvents='none'}};switch(className){case'dts-icon-checkbox':toggledIconClassName='dts-icon-checkbox-checked';disableLinks();break;case'dts-icon-checkbox-checked':toggledIconClassName='dts-icon-checkbox';disableLinks();break;case'dts-icon-filter-exclude':toggledIconClassName='dts-icon-filter-include';disableLinks();break;case'dts-icon-filter-include':toggledIconClassName='dts-icon-filter-exclude';elIcon.nextElementSibling.style.textDecoration='none';disableLinks();break;case'dts-icon-radio':toggledIconClassName='dts-icon-radio-checked';disableLinks();break;}if(className=='dts-icon-radio'){elListRadio=link.parentElement.parentElement;elCurrentCheckedRadio=elListRadio.querySelector('.dts-icon-radio-checked');if(elCurrentCheckedRadio){elCurrentCheckedRadio.classList.remove('dts-icon-radio-checked');elCurrentCheckedRadio.classList.add('dts-icon-radio')}}elIcon.classList.remove(className);elIcon.classList.add(toggledIconClassName)}module.exports={toggleFilterIcon:toggleFilterIcon};

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function gridJustifier(gridId){var MAX_GRID_COLUMNS=6;var debug=false;var shimsNeeded=MAX_GRID_COLUMNS-1;var elGrid=document.getElementById(gridId);var shims=document.createDocumentFragment();if(debug){console.log('elGrid');console.dir(elGrid)}if(elGrid){var elGridItems=elGrid.querySelectorAll('.dts-collection-item');if(debug){console.log('elGridItems');console.dir(elGridItems)}var containerWidth=app.dts.common.dom.getElementDimensions(elGrid).width;if(debug)console.log('containerWidth = ',containerWidth);var itemDimensions=app.dts.common.dom.getElementDimensions(elGridItems[0]);if(debug)console.log('itemDimensions = ',itemDimensions);var itemsPerRow=Math.floor(containerWidth/itemDimensions.outerWidth);if(debug)console.log('itemsPerRow = ',itemsPerRow);shimsNeeded=itemsPerRow-elGridItems.length%itemsPerRow;if(debug)console.log('shimsNeeded = ',shimsNeeded);if(elGridItems){var elShim=elGridItems[0].cloneNode(false);if(debug){console.log('elShim');console.dir(elShim)}if(elShim){elShim.style.visibility='hidden';elShim.classList.add('dts-grid-item-shim');elShim.style.margin=itemDimensions.marginRight;elShim.style.padding=0;elShim.removeAttribute('id');for(var i=0;i<shimsNeeded;i++){shims.appendChild(elShim.cloneNode(false))}elGrid.children[0].appendChild(shims)}}}}module.exports={gridJustifier:gridJustifier};

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var CaptchaHelper=function(){function CaptchaHelper(siteKey,captchaDivId,captchaObject,completeHandler){(0,_classCallCheck3.default)(this,CaptchaHelper);this.captchaDivId=captchaDivId;this.captchaObject=captchaObject;this.captchaWidgetId=undefined;this.completeHandler=completeHandler;if(this.captchaObject!==undefined){this.captchaWidgetId=this.captchaObject.render(this.captchaDivId,{'sitekey':siteKey,'size':'invisible','callback':this.captchaOnCompleted.bind(this),'expired-callback':this.captchaOnExpired.bind(this),'error-callback':this.captchaOnError.bind(this)})}}(0,_createClass3.default)(CaptchaHelper,[{key:'resetCaptcha',value:function resetCaptcha(){this.captchaObject.reset(this.captchaWidgetId)}},{key:'captchaOnCompleted',value:function captchaOnCompleted(token){if(this.completeHandler!==undefined){this.completeHandler(this.captchaToken)}}},{key:'captchaOnError',value:function captchaOnError(){this.resetCaptcha()}},{key:'captchaOnExpired',value:function captchaOnExpired(){this.resetCaptcha()}},{key:'execute',value:function execute(){this.captchaObject.execute(this.captchaWidgetId)}}]);return CaptchaHelper}();module.exports={CaptchaHelper:CaptchaHelper};

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
function fixColumns(colType){if(/Edge/.test(navigator.userAgent)){var items=document.querySelectorAll('.dts-collection-item-'+colType);var container=items[0].parentElement;if(items.length==1){_addShim(container);_addShim(container)}else if(items.length==2){_addShim(container)}}}function _addShim(container){var shim=document.createElement('div');shim.classList.add('dts-collection-item');shim.classList.add('dts-collection-item-shim');shim.innerHTML='&nbsp;';container.appendChild(shim)}module.exports={fixColumns:fixColumns};

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var MobilePanningIcon=function(){function MobilePanningIcon(collectionId){(0,_classCallCheck3.default)(this,MobilePanningIcon);this.collection=document.getElementById(collectionId);if(this.collection){this.queueContainer=this.collection.querySelector('.queue_control_container');if(this.queueContainer){this.notLazy=this.queueContainer.querySelectorAll('.dts-collection-item:not([data-loc])');this.notLazyWidth=0;for(var i=0;i<this.notLazy.length;i++){this.notLazyWidth+=this.notLazy[i].offsetWidth};if(this.notLazyWidth<window.innerWidth||this.notLazy.length<2){this.panningIcon=this.queueContainer.querySelector('.dts-panning-icon');if(this.panningIcon!=null){if(this.panningIcon.parentElement)this.panningIcon.parentElement.style.display='none'}}dts.common.events.eventListenerUtility(this.queueContainer,['scroll'],this.hidePanningIcons,true)}}}(0,_createClass3.default)(MobilePanningIcon,[{key:'hidePanningIcons',value:function hidePanningIcons(){var panningIcons=document.querySelectorAll('.dts-panning-icon');for(var i=0;i<panningIcons.length;i++){panningIcons[i].style.display='none'}dts.common.cookie.writeCookie('hide-panning-icon','1')}}]);return MobilePanningIcon}();module.exports={MobilePanningIcon:MobilePanningIcon};

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SceneStripScroller=function(){function SceneStripScroller(sceneId){(0,_classCallCheck3.default)(this,SceneStripScroller);this.containerId='sceneStripSliderContainer-'+sceneId;this.scrollViewport=document.getElementById('scene-'+sceneId+'-dtsSceneThumbs');if(!this.scrollViewport){this.scrollViewport=document.querySelector('[id^=\'Scene-'+sceneId+'-dtsQueueSceneThumbs\']');if(!this.scrollViewport)throw'Can\'t find scene scroll viewport'}this.scrollTarget=document.querySelector('#scene-'+sceneId+'-dtsSceneThumbs .queue_control_container');if(!this.scrollTarget){this.scrollTarget=this.scrollViewport.querySelector('.queue_control_container');if(!this.scrollTarget)throw'Can\'t find scene scroll  target'}this.imgs=this.scrollTarget.querySelectorAll('.dts-collection-item-scene-thumb');this.imgCount=this.imgs.length;this.dimensions=dts.common.dom.getElementDimensions(this.imgs[0]);this.scrollTargetWidth=this.dimensions.outerWidth*this.imgCount;this.slider=new dts.Slider(this.containerId,0,this.scrollSceneStrip.bind(this));this.updateScrollbarPosition();window.addEventListener('resize',this.updateScrollbarPosition.bind(this),false);this.scrollTarget.addEventListener('scroll',this.updateScrollbarPosition.bind(this),false)}(0,_createClass3.default)(SceneStripScroller,[{key:'scrollSceneStrip',value:function scrollSceneStrip(scrollPosition){this.scrollTarget.scrollLeft=(this.scrollTargetWidth-this.scrollViewport.offsetWidth)/99*scrollPosition}},{key:'updateScrollbarPosition',value:function updateScrollbarPosition(){this.slider.value=this.scrollTarget.scrollLeft/((this.scrollTargetWidth-this.scrollViewport.offsetWidth)/99)}}]);return SceneStripScroller}();module.exports={SceneStripScroller:SceneStripScroller};

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var UpdateMemberList=function(){function UpdateMemberList(list,scene,initiatorNodeId){(0,_classCallCheck3.default)(this,UpdateMemberList);this.initiatorNode=document.getElementById(initiatorNodeId);this.gaLabel=scene.gaLabel;this.list=list;if(this.list=='favorites'){this.ajaxUrl=scene.urlAjaxFavoriteScene;this.loginUrl=scene.urlLoginFavoriteScene}if(this.list=='watch-later'){this.ajaxUrl=scene.urlAjaxWatchLaterScene;this.loginUrl=scene.urlLoginWatchLaterScene}this.initiatorNode.addEventListener('click',this.makeAjaxCall.bind(this))}(0,_createClass3.default)(UpdateMemberList,[{key:'makeAjaxCall',value:function makeAjaxCall(){var _this=this;app.dts.common.xhr.get(this.ajaxUrl,true,function(status,result){if(result.success){_this.runGA(result.state);if(result.state){_this.initiatorNode.classList.add('active');_this.initiatorNode.title='Remove from '+_this.list.replace('-',' ')+' list'}else{_this.initiatorNode.classList.remove('active');_this.initiatorNode.title='Add to '+_this.list.replace('-',' ')+' list'}_this.pageRefresh()}else{window.location=_this.loginUrl}},function(error){_this.notifyGAofAsyncError(error,_this.ajaxUrl)})}},{key:'pageRefresh',value:function pageRefresh(){var pathname=location.pathname;if(pathname.indexOf(this.list)!==-1){location.reload()}}},{key:'notifyGAofAsyncError',value:function notifyGAofAsyncError(error,url){dataLayer.push({'event':'trackEvent','eventCategory':'AJAX Response Errors','eventAction':'Scene Info Modal','eventLabel':error.status+' | '+url,'eventValue':undefined,'nonInteraction':true})}},{key:'runGA',value:function runGA(state){var gaCategory=void 0,gaAction=void 0;if(this.list=='favorites'){gaCategory='Favorite Scenes';gaAction=state?'Favorite Added':'Favorite Removed'}if(this.list=='watch-later'){gaCategory='Watch Later Scenes';gaAction=state?'Watch Later Scene Added':'Watch Later Scene Removed'}dataLayer.push({'event':'trackEvent','eventCategory':gaCategory,'eventAction':gaAction,'eventLabel':this.gaLabel,'eventValue':undefined,'nonInteraction':undefined})}}]);return UpdateMemberList}();module.exports={UpdateMemberList:UpdateMemberList};

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NOTIFICATION_NODE_SELECTORS={notificationContainerId:'dts-user-notifications',notificationNodeClass:'dts-user-notification',notificationContentClass:'dts-user-notification-content',notificationCloseButtonSelector:'.dts-user-notification-close-wrapper',pageHeaderSelector:'.dts-page-header',pageContentSelector:'.dts-body-section',mobileNavigationSelector:'.dts-navigation-mobile-wrapper'};var CLOSE_BUTTON_SVG_MARKUP='<div class="dts-user-notification-close-wrapper"><i class="dts-icon-circle-close dts-user-notification-close"></i></div>';var SECS_BEFORE_AUTOCLOSE=5;var UserNotifications=function(){function UserNotifications(notificationType,notificationContent,timeoutMilliseconds){(0,_classCallCheck3.default)(this,UserNotifications);this.notificationType=notificationType;this.notificationContent=notificationContent;this.timeout=timeoutMilliseconds;this.notificationMqlFlag=false;dts.common.events.eventListenerUtility(window,['DOMContentLoaded'],this.showNotification.bind(this),true);app.dts.common.events.mediaQueryListenerUtility('(max-width: 640px)',this.notificationMqlTrue.bind(this),this.notificationMqlFalse.bind(this))}(0,_createClass3.default)(UserNotifications,[{key:'adjustOnResize',value:function adjustOnResize(){var notificationContainer=document.getElementById(NOTIFICATION_NODE_SELECTORS.notificationContainerId)||null;var pageContent=document.querySelector(NOTIFICATION_NODE_SELECTORS.pageContentSelector);if(notificationContainer!=null){var notificationDimensions=app.dts.common.dom.getElementDimensionsLite(notificationContainer);var pageHeader=document.querySelector(NOTIFICATION_NODE_SELECTORS.pageHeaderSelector);pageHeader.style.marginTop=notificationDimensions.height+'px';if(this.notificationMqlFlag===true){var pageHeaderDimensions=app.dts.common.dom.getElementDimensionsLite(pageHeader);var zeroMinuteAuthPage=document.getElementById('dtsPurchaseFree-minute-zero-auth');if(zeroMinuteAuthPage!==null){pageContent.style.marginTop='0px'}else{pageContent.style.marginTop=notificationDimensions.height+pageHeaderDimensions.height+'px'}}}}},{key:'notificationMqlTrue',value:function notificationMqlTrue(){this.notificationMqlFlag=true}},{key:'notificationMqlFalse',value:function notificationMqlFalse(){this.notificationMqlFlag=false}},{key:'showNotification',value:function showNotification(){var _this=this;if(this.notificationType===undefined||this.notificationType===undefined){return}var userNotificationDiv=document.getElementById(NOTIFICATION_NODE_SELECTORS.notificationContainerId);var notificationId='dts_UNOT_'+Math.floor(Math.random()*100000000);var elNotification=document.createElement('div');elNotification.id=notificationId;elNotification.classList.add(NOTIFICATION_NODE_SELECTORS.notificationNodeClass);elNotification.classList.add(NOTIFICATION_NODE_SELECTORS.notificationNodeClass+'-'+this.notificationType);elNotification.innerHTML='<div class="'+NOTIFICATION_NODE_SELECTORS.notificationContentClass+'">'+this.notificationContent+'</div>'+CLOSE_BUTTON_SVG_MARKUP;this.notificationId=notificationId;userNotificationDiv.appendChild(elNotification);var notificationDiv=document.getElementById(notificationId);if(notificationDiv){var closeButton=notificationDiv.querySelector(NOTIFICATION_NODE_SELECTORS.notificationCloseButtonSelector);dts.common.events.eventListenerUtility(closeButton,['click'],this.closeNotification.bind(this),true);if(this.notificationType!='ERROR'){setTimeout(function(){_this.closeNotification()},SECS_BEFORE_AUTOCLOSE*1000)}}if((this.notificationType=='ERROR'||this.notificationType=='WARN')&&dataLayer){if('undefined'!==typeof gtag){gtag('event','Error',{'event_category':'User Notification','event_label':this.notificationContent})}else{dataLayer.push({'event':'trackEvent','eventCategory':'User Notification','eventAction':this.notificationType=='ERROR'?'Error':'Warning','eventLabel':this.notificationContent,'eventValue':undefined,'nonInteraction':true})}}}},{key:'closeNotification',value:function closeNotification(event){var notificationDiv=void 0;if(event&&event.currentTarget){event.stopPropagation();notificationDiv=event.currentTarget.parentNode}else{notificationDiv=document.getElementById(this.notificationId)}if(notificationDiv){setTimeout(function(){if(notificationDiv){notificationDiv.style.opacity=0;if(event===undefined){setTimeout(function(){notificationDiv.parentNode.removeChild(notificationDiv)},500)}else{notificationDiv.parentNode.removeChild(notificationDiv)}}},100)}}}]);return UserNotifications}();module.exports={UserNotifications:UserNotifications};

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function toggleBoxcover(e){if(e.currentTarget){e.stopPropagation();var elBoxCoverImage=e.currentTarget.parentElement;if(elBoxCoverImage.classList.contains('front')){elBoxCoverImage.classList.add('back');elBoxCoverImage.classList.remove('front')}else{elBoxCoverImage.classList.add('front');elBoxCoverImage.classList.remove('back')}}}module.exports={toggleBoxcover:toggleBoxcover};

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof2=__webpack_require__(25);var _typeof3=_interopRequireDefault(_typeof2);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _hammer=__webpack_require__(172);var _hammer2=_interopRequireDefault(_hammer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SCROLL_FORWARD=1;var SCROLL_BACKWARD=-1;var Carousel=function(){function Carousel(id,slidesContent,options){(0,_classCallCheck3.default)(this,Carousel);this.id=id;this.slidesContent=slidesContent;this.options=options;this.carouselElement=null;this.loadedImages=0;this.slidesContentsLength=this.slidesContent.length;this.slideShowDirection=null;this.slideshowInterval=null;this.autoRotate=null;this.currentEffect=null;this.userAgent=navigator.userAgent||navigator.vendor;this.isAndroid=/android/i.test(this.userAgent);this.isIos=/iPad|iPhone|iPod/i.test(this.userAgent);this.isWindowsTouch=navigator.maxTouchPoints&&navigator.maxTouchPoints>1;this.pageWidth=document.body.clientWidth;this.slides;this.lastSlide=this.slidesContentsLength-1;this.currentSlide=0;this.slideZero;this.slider;this.slideContainerWrapper;this.slideShowIntervalTimer;this.transitionTime=.5;this.transition='left '+this.transitionTime+'s ease-in-out';this.positionMarkerContainer;this.isSliding=false;this.initialized=false;this.pageLoad=true;this.currentScrollLeft;this.isScrolling=false;this.scrollDirection;this.bodyScrollPosition=0;this.sliderManager;this.init()}(0,_createClass3.default)(Carousel,[{key:'init',value:function init(){if(this.id==undefined){console.error('ID is required to create carousel component!');return null}else{this.carouselElement=document.getElementById(this.id);if(!this.carouselElement){console.error('Could not find carousel element with ID:',this.id);return null}}if(this.slidesContent!=undefined&&this.slidesContentsLength>=1){for(var i=0;i<this.slidesContentsLength;i++){var arrSlideZeroImgUrl=this.slidesContent[i].match(/img\s+src=\'([^\']+)/);if(arrSlideZeroImgUrl){var slideImg=new Image;slideImg.src=arrSlideZeroImgUrl[1];slideImg.onload=this.imagesPreloaded()}}}else{console.error('The carousel is empty and has no sliides');return null}}},{key:'imagesPreloaded',value:function imagesPreloaded(){this.loadedImages++;if(this.loadedImages===this.slidesContentsLength){this.setupRunCarousel()}}},{key:'setupRunCarousel',value:function setupRunCarousel(){var _this=this;this.setOptions();this.constructCarouselMarkup();this.attachCarouselMarkupToDOM();this.slides=this.carouselElement.querySelectorAll('.dts-carousel-slides-container > div');this.slideZero=this.carouselElement.querySelector('[data-slide-number="0"]');this.slider=this.carouselElement.querySelector('.dts-carousel-slides-container');this.slideContainerWrapper=this.carouselElement.querySelector('.dts-slides-wrapper');this.positionMarkerContainer=this.carouselElement.querySelector('.dts-position-indicator-container');this.currentScrollLeft=this.slideContainerWrapper.scrollLeft;this.carouselElement.classList.add('dts-carousel');this.slideContainerWrapper.style.opacity=0;this.sliderManager=new _hammer2.default.Manager(this.slideContainerWrapper);this.hammerCallbacks();this.slider.addEventListener('click',this.handleClick.bind(this),false);this.slider.addEventListener('transitionstart',this.handleTransitionStart.bind(this),false);this.slider.addEventListener('transitionend',this.handleTransitionEnd.bind(this),false);this.slider.addEventListener('mouseover',this.pause.bind(this),false);this.slider.addEventListener('mouseout',this.resume.bind(this),false);this.positionMarkerContainer.addEventListener('click',this.jump.bind(this),false);window.addEventListener('resize',function(){_this.reset(_this.currentSlide)},false);this.carouselElement.querySelector('.dts-carousel-control-left').addEventListener('click',this.backward.bind(this),false);this.carouselElement.querySelector('.dts-carousel-control-right').addEventListener('click',this.forward.bind(this),false);this.reset(0);if(this.autoRotate){this.start()}}},{key:'setOptions',value:function setOptions(){if(this.options!=undefined&&(0,_typeof3.default)(this.options)=='object'){if(this.options.direction!=undefined&&typeof this.options.direction=='string'&&(this.options.direction.toLowerCase()=='right'||this.options.direction.toLowerCase()=='left')){this.slideShowDirection=this.options.direction}if(this.options.intervalMilli!=undefined&&typeof this.options.intervalMilli=='number'){this.slideshowInterval=this.options.intervalMilli}else{this.slideshowInterval=3500}if(this.options.autoStart!=undefined&&typeof this.options.autoStart=='boolean'){this.autoRotate=this.options.autoStart}else{this.autoRotate=true}if(this.options.effect!=undefined&&typeof this.options.effect=='string'&&(this.options.effect.toLowerCase()=='slide'||this.options.effect.toLowerCase()=='shuffle')){this.currentEffect=this.options.effect}if(this.options.debug!=undefined&&typeof this.options.debug=='boolean'){this.currentEffect=this.options.debug}}}},{key:'constructCarouselMarkup',value:function constructCarouselMarkup(){if(this.slidesContentsLength==2){this.slidesContent=this.slidesContent.concat(this.slidesContent)}var slidesMarkup=this.constructSlideMarkup();var positionIndicatorMarkup=this.constructPositionIndicatorMarkup();var markup='\n\t\t'+positionIndicatorMarkup+'\n\t\t<svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1" xmlns="http://www.w3.org/2000/svg">\n\t\t\t<defs>\n\t\t\t\t<symbol id="icon-expand_less" viewBox="0 0 24 24">\n\t\t\t\t\t<title>expand_less</title>\n\t\t\t\t\t<path d="M12 8.016l6 6-1.406 1.406-4.594-4.594-4.594 4.594-1.406-1.406z"></path>\n\t\t\t\t</symbol>\n\t\t\t</defs>\n\t\t</svg>\n\n\t\t<div class="dts-carousel-control dts-carousel-control-left" style="">\n\t\t\t<svg class="dts-carousel-control-icon dts-carousel-control-icon-back-arrow"><use xlink:href="#icon-expand_less"></use></svg>\n\t\t</div>\n\n\t\t<div class="dts-carousel-control dts-carousel-control-right" style="">\n\t\t\t<svg class="dts-carousel-control-icon dts-carousel-control-icon-forward-arrow"><use xlink:href="#icon-expand_less"></use></svg>\n\t\t</div>\n\n\t\t<div class="dts-slides-wrapper">\n\t\t\t<div class="dts-carousel-slides-container">\n\t\t\t\t'+slidesMarkup+'\n\t\t\t</div>\n\t\t</div>';return markup}},{key:'constructSlideMarkup',value:function constructSlideMarkup(){var markup='';for(var i=0;i<this.slidesContentsLength;i++){markup+='\n\t\t\t\t<div class="dts-carousel-slide" data-slide-number="'+i+'" style="order: '+i*2+'">\n\t\t\t\t\t\t'+this.slidesContent[i]+'\n\t\t\t\t</div>'}return markup}},{key:'constructPositionIndicatorMarkup',value:function constructPositionIndicatorMarkup(){var markup='<div class="dts-position-indicator-container" style="pointer-events: none; touch-action: none;">';for(var i=0;i<this.slidesContentsLength;i++){markup+='\n\t\t\t<div class="dts-position-indicator dts-position-indicator-'+i+' dts-position-indicator-'+(i==0?'active':'inactive')+'" style="">\n\t\t\t\t<span class="dts-position-indicator-'+i+'"></span>\n\t\t\t</div>'}markup+='</div>';return markup}},{key:'attachCarouselMarkupToDOM',value:function attachCarouselMarkupToDOM(){this.carouselElement.innerHTML=this.constructCarouselMarkup()}},{key:'resetWrappingSlides',value:function resetWrappingSlides(slide_number){var _this2=this;if(slide_number==0){this.slideContainerWrapper.scrollLeft=this.slideZero.offsetWidth;this.currentScrollLeft=this.slideContainerWrapper.scrollLeft;if(this.initialized===true){this.slides[this.lastSlide].style.order=-2}}else if(slide_number==this.lastSlide){this.slideContainerWrapper.scrollLeft=this.slideContainerWrapper.scrollWidth-this.slideContainerWrapper.clientWidth-this.slideZero.offsetWidth;this.currentScrollLeft=this.slideContainerWrapper.scrollLeft;this.slideZero.style.order=this.slidesContentsLength*2}setTimeout(function(){_this2.slideContainerWrapper.style.opacity=1},200)}},{key:'reset',value:function reset(slide_number){var _this3=this;if(document.body.clientWidth!=this.pageWidth||this.isWindowsTouch||!this.initialized){this.pageWidth=document.body.clientWidth;var slideNumber=void 0;if(slide_number==''){slideNumber=this.currentSlide}else{slideNumber=slide_number}setTimeout(function(){if(slideNumber==0){_this3.slideContainerWrapper.scrollLeft=0}else if(slideNumber!=_this3.lastSlide){_this3.slideContainerWrapper.scrollLeft=slideNumber*_this3.slideContainerWrapper.offsetWidth}_this3.currentScrollLeft=_this3.slideContainerWrapper.scrollLeft},200);if(this.isAndroid||this.isIos||this.isWindowsTouch||!this.initialized){this.resetWrappingSlides(slideNumber)}this.initialized=true}}},{key:'start',value:function start(){var _this4=this;if(this.slideshowInterval){this.autoRotate=true;this.slideShowIntervalTimer=setInterval(function(){_this4.forward()},this.slideshowInterval)}}},{key:'stop',value:function stop(){clearInterval(this.slideShowIntervalTimer);this.autoRotate=false}},{key:'pause',value:function pause(){clearInterval(this.slideShowIntervalTimer)}},{key:'resume',value:function resume(){if(this.autoRotate){this.start()}}},{key:'forward',value:function forward(e){if(e){this.stop()}if(!this.isSliding){this.isSliding=true;this.slider.style.transition=this.transition;if(this.currentSlide!=this.lastSlide){this.currentSlide=this.currentSlide+1}else{this.currentSlide=0}this.slider.style.left='-100%'}}},{key:'backward',value:function backward(e){if(e){this.stop()}if(!this.isSliding){this.isSliding=true;if(this.currentSlide!=0){this.currentSlide=this.currentSlide-1;this.slider.style.left='100%'}else{this.currentSlide=this.slidesContentsLength-1;this.slider.style.left='100%'}}}},{key:'handleTransitionStart',value:function handleTransitionStart(){if(this.pageLoad&&this.currentSlide==this.lastSlide){this.slider.style.left=0;this.pageLoad=false}}},{key:'handleTransitionEnd',value:function handleTransitionEnd(){var _this5=this;this.slider.style.transition='none';if(this.slideZero.style.order==this.slidesContentsLength*2&&this.currentSlide==0){this.currentSlide=0;this.slideZero.style.order=0;this.slider.parentElement.scrollLeft=0;this.slider.style.left='0%'}else if(this.currentSlide!=this.slidesContentsLength-1){this.slideContainerWrapper.scrollLeft=this.slides[0].offsetWidth*this.currentSlide;this.slider.style.left='0%'}else{this.slider.style.transition='none';this.slider.style.left='0%';this.slideContainerWrapper.scrollLeft=this.slideContainerWrapper.scrollWidth-this.slideContainerWrapper.clientWidth}for(var i=0;i<this.slidesContentsLength;i++){this.slides[i].style.order=this.slides[i].dataset.slideNumber*2}if(this.pageLoad){this.pageLoad=false}this.resetWrappingSlides(this.currentSlide);var activePositionMarker=this.carouselElement.querySelector('.dts-position-indicator-active');activePositionMarker.classList.remove('dts-position-indicator-active');activePositionMarker.classList.add('dts-position-indicator-inactive');var currentPositionMarker=this.carouselElement.querySelector('.dts-position-indicator-'+this.currentSlide%this.slidesContentsLength);currentPositionMarker.classList.remove('dts-position-indicator-inactive');currentPositionMarker.classList.add('dts-position-indicator-active');this.currentScrollLeft=this.slideContainerWrapper.scrollLeft;setTimeout(function(){_this5.slider.style.transition=_this5.transition;_this5.isSliding=false},200);this.isScrolling=false}},{key:'jump',value:function jump(e){this.stop();var jumpTo=parseInt(e.target.className.match(/dts-position-indicator-(\d+)/)[1]);if(jumpTo!=this.currentSlide){if(jumpTo>this.currentSlide%this.slidesContentsLength){this.slides[jumpTo].style.order=parseInt(this.slides[this.currentSlide].style.order)+1;if(jumpTo==this.lastSlide&&this.currentSlide==0){this.slideContainerWrapper.scrollLeft=0}this.currentSlide=jumpTo-1;this.forward()}else{this.slides[jumpTo].style.order=parseInt(this.slides[this.currentSlide].style.order)-1;if(jumpTo==0&&this.currentSlide==this.lastSlide){this.slideContainerWrapper.scrollLeft=this.slideContainerWrapper.scrollLeft+this.slideZero.offsetWidth}this.currentSlide=jumpTo+1;this.backward()}}}},{key:'snap',value:function snap(direction){var moveLeft=void 0;this.stop();var slideWidth=this.carouselElement.querySelector('.dts-carousel-slide').getBoundingClientRect().width;var slideScrolled=this.slider.parentElement.scrollLeft/slideWidth;if(direction==SCROLL_FORWARD){moveLeft=(1-(slideScrolled-parseInt(slideScrolled)))*slideWidth*-1;this.slider.style.left=moveLeft+'px';this.currentSlide=this.currentSlide==this.lastSlide?0:this.currentSlide+1}else if(direction==SCROLL_BACKWARD){moveLeft=(slideScrolled-parseInt(slideScrolled))*slideWidth;this.slider.style.left=moveLeft+'px';this.currentSlide=this.currentSlide==0?this.lastSlide:this.currentSlide-1}}},{key:'hammerCallbacks',value:function hammerCallbacks(){var _this6=this;this.sliderManager.add(new _hammer2.default.Pan({threshold:100,pointers:0,direction:_hammer2.default.DIRECTION_ALL,touchAction:'pan-y'}));this.sliderManager.on('panstart',function(e){_this6.bodyScrollPosition=window.pageYOffset;if(_this6.pageLoad&&_this6.currentSlide==0){_this6.slides[_this6.lastSlide].style.order=-2;_this6.pageLoad=false}});this.sliderManager.on('pan',function(e){_this6.isScrolling=true;if(e.additionalEvent!='panup'&&e.additionalEvent!='pandown'){if(Math.abs(e.deltaX)<_this6.slideZero.offsetWidth){_this6.slideContainerWrapper.scrollLeft=_this6.currentScrollLeft+e.deltaX*-1}if(e.isFinal){_this6.scrollDirection=e.overallVelocityX<0?SCROLL_FORWARD:SCROLL_BACKWARD;_this6.snap(_this6.scrollDirection);setTimeout(function(){_this6.isScrolling=false},100)}}else{if(e.additionalEvent=='panup'){window.scrollTo(0,_this6.bodyScrollPosition-e.deltaY)}if(e.additionalEvent=='pandown'){window.scrollTo(0,_this6.bodyScrollPosition-e.deltaY)}if(e.isFinal){setTimeout(function(){_this6.isScrolling=false},100)}}});for(var i=0;i<this.slides.length;i++){this.slides[i].ondragstart=function(){return false}}}},{key:'handleClick',value:function handleClick(e){if(this.isScrolling){e.preventDefault()}}}]);return Carousel}();module.exports={Carousel:Carousel};

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_RESULT__;var _keys=__webpack_require__(173);var _keys2=_interopRequireDefault(_keys);var _assign=__webpack_require__(75);var _assign2=_interopRequireDefault(_assign);var _typeof2=__webpack_require__(25);var _typeof3=_interopRequireDefault(_typeof2);var _create=__webpack_require__(74);var _create2=_interopRequireDefault(_create);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}!function(a,b,c,d){"use strict";function e(a,b,c){return setTimeout(j(a,c),b)}function f(a,b,c){return Array.isArray(a)?(g(a,c[b],c),!0):!1}function g(a,b,c){var e;if(a)if(a.forEach)a.forEach(b,c);else if(a.length!==d)for(e=0;e<a.length;){b.call(c,a[e],e,a),e++}else for(e in a){a.hasOwnProperty(e)&&b.call(c,a[e],e,a)}}function h(b,c,d){var e="DEPRECATED METHOD: "+c+"\n"+d+" AT \n";return function(){var c=new Error("get-stack-trace"),d=c&&c.stack?c.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",f=a.console&&(a.console.warn||a.console.log);return f&&f.call(a.console,e,d),b.apply(this,arguments)}}function i(a,b,c){var d,e=b.prototype;d=a.prototype=(0,_create2.default)(e),d.constructor=a,d._super=e,c&&la(d,c)}function j(a,b){return function(){return a.apply(b,arguments)}}function k(a,b){return(typeof a==="undefined"?"undefined":(0,_typeof3.default)(a))==oa?a.apply(b?b[0]||d:d,b):a}function l(a,b){return a===d?b:a}function m(a,b,c){g(q(b),function(b){a.addEventListener(b,c,!1)})}function n(a,b,c){g(q(b),function(b){a.removeEventListener(b,c,!1)})}function o(a,b){for(;a;){if(a==b)return!0;a=a.parentNode}return!1}function p(a,b){return a.indexOf(b)>-1}function q(a){return a.trim().split(/\s+/g)}function r(a,b,c){if(a.indexOf&&!c)return a.indexOf(b);for(var d=0;d<a.length;){if(c&&a[d][c]==b||!c&&a[d]===b)return d;d++}return-1}function s(a){return Array.prototype.slice.call(a,0)}function t(a,b,c){for(var d=[],e=[],f=0;f<a.length;){var g=b?a[f][b]:a[f];r(e,g)<0&&d.push(a[f]),e[f]=g,f++}return c&&(d=b?d.sort(function(a,c){return a[b]>c[b]}):d.sort()),d}function u(a,b){for(var c,e,f=b[0].toUpperCase()+b.slice(1),g=0;g<ma.length;){if(c=ma[g],e=c?c+f:b,e in a)return e;g++}return d}function v(){return ua++}function w(b){var c=b.ownerDocument||b;return c.defaultView||c.parentWindow||a}function x(a,b){var c=this;this.manager=a,this.callback=b,this.element=a.element,this.target=a.options.inputTarget,this.domHandler=function(b){k(a.options.enable,[a])&&c.handler(b)},this.init()}function y(a){var b,c=a.options.inputClass;return new(b=c?c:xa?M:ya?P:wa?R:L)(a,z)}function z(a,b,c){var d=c.pointers.length,e=c.changedPointers.length,f=b&Ea&&d-e===0,g=b&(Ga|Ha)&&d-e===0;c.isFirst=!!f,c.isFinal=!!g,f&&(a.session={}),c.eventType=b,A(a,c),a.emit("hammer.input",c),a.recognize(c),a.session.prevInput=c}function A(a,b){var c=a.session,d=b.pointers,e=d.length;c.firstInput||(c.firstInput=D(b)),e>1&&!c.firstMultiple?c.firstMultiple=D(b):1===e&&(c.firstMultiple=!1);var f=c.firstInput,g=c.firstMultiple,h=g?g.center:f.center,i=b.center=E(d);b.timeStamp=ra(),b.deltaTime=b.timeStamp-f.timeStamp,b.angle=I(h,i),b.distance=H(h,i),B(c,b),b.offsetDirection=G(b.deltaX,b.deltaY);var j=F(b.deltaTime,b.deltaX,b.deltaY);b.overallVelocityX=j.x,b.overallVelocityY=j.y,b.overallVelocity=qa(j.x)>qa(j.y)?j.x:j.y,b.scale=g?K(g.pointers,d):1,b.rotation=g?J(g.pointers,d):0,b.maxPointers=c.prevInput?b.pointers.length>c.prevInput.maxPointers?b.pointers.length:c.prevInput.maxPointers:b.pointers.length,C(c,b);var k=a.element;o(b.srcEvent.target,k)&&(k=b.srcEvent.target),b.target=k}function B(a,b){var c=b.center,d=a.offsetDelta||{},e=a.prevDelta||{},f=a.prevInput||{};b.eventType!==Ea&&f.eventType!==Ga||(e=a.prevDelta={x:f.deltaX||0,y:f.deltaY||0},d=a.offsetDelta={x:c.x,y:c.y}),b.deltaX=e.x+(c.x-d.x),b.deltaY=e.y+(c.y-d.y)}function C(a,b){var c,e,f,g,h=a.lastInterval||b,i=b.timeStamp-h.timeStamp;if(b.eventType!=Ha&&(i>Da||h.velocity===d)){var j=b.deltaX-h.deltaX,k=b.deltaY-h.deltaY,l=F(i,j,k);e=l.x,f=l.y,c=qa(l.x)>qa(l.y)?l.x:l.y,g=G(j,k),a.lastInterval=b}else c=h.velocity,e=h.velocityX,f=h.velocityY,g=h.direction;b.velocity=c,b.velocityX=e,b.velocityY=f,b.direction=g}function D(a){for(var b=[],c=0;c<a.pointers.length;){b[c]={clientX:pa(a.pointers[c].clientX),clientY:pa(a.pointers[c].clientY)},c++}return{timeStamp:ra(),pointers:b,center:E(b),deltaX:a.deltaX,deltaY:a.deltaY}}function E(a){var b=a.length;if(1===b)return{x:pa(a[0].clientX),y:pa(a[0].clientY)};for(var c=0,d=0,e=0;b>e;){c+=a[e].clientX,d+=a[e].clientY,e++}return{x:pa(c/b),y:pa(d/b)}}function F(a,b,c){return{x:b/a||0,y:c/a||0}}function G(a,b){return a===b?Ia:qa(a)>=qa(b)?0>a?Ja:Ka:0>b?La:Ma}function H(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return Math.sqrt(d*d+e*e)}function I(a,b,c){c||(c=Qa);var d=b[c[0]]-a[c[0]],e=b[c[1]]-a[c[1]];return 180*Math.atan2(e,d)/Math.PI}function J(a,b){return I(b[1],b[0],Ra)+I(a[1],a[0],Ra)}function K(a,b){return H(b[0],b[1],Ra)/H(a[0],a[1],Ra)}function L(){this.evEl=Ta,this.evWin=Ua,this.pressed=!1,x.apply(this,arguments)}function M(){this.evEl=Xa,this.evWin=Ya,x.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function N(){this.evTarget=$a,this.evWin=_a,this.started=!1,x.apply(this,arguments)}function O(a,b){var c=s(a.touches),d=s(a.changedTouches);return b&(Ga|Ha)&&(c=t(c.concat(d),"identifier",!0)),[c,d]}function P(){this.evTarget=bb,this.targetIds={},x.apply(this,arguments)}function Q(a,b){var c=s(a.touches),d=this.targetIds;if(b&(Ea|Fa)&&1===c.length)return d[c[0].identifier]=!0,[c,c];var e,f,g=s(a.changedTouches),h=[],i=this.target;if(f=c.filter(function(a){return o(a.target,i)}),b===Ea)for(e=0;e<f.length;){d[f[e].identifier]=!0,e++}for(e=0;e<g.length;){d[g[e].identifier]&&h.push(g[e]),b&(Ga|Ha)&&delete d[g[e].identifier],e++}return h.length?[t(f.concat(h),"identifier",!0),h]:void 0}function R(){x.apply(this,arguments);var a=j(this.handler,this);this.touch=new P(this.manager,a),this.mouse=new L(this.manager,a),this.primaryTouch=null,this.lastTouches=[]}function S(a,b){a&Ea?(this.primaryTouch=b.changedPointers[0].identifier,T.call(this,b)):a&(Ga|Ha)&&T.call(this,b)}function T(a){var b=a.changedPointers[0];if(b.identifier===this.primaryTouch){var c={x:b.clientX,y:b.clientY};this.lastTouches.push(c);var d=this.lastTouches,e=function e(){var a=d.indexOf(c);a>-1&&d.splice(a,1)};setTimeout(e,cb)}}function U(a){for(var b=a.srcEvent.clientX,c=a.srcEvent.clientY,d=0;d<this.lastTouches.length;d++){var e=this.lastTouches[d],f=Math.abs(b-e.x),g=Math.abs(c-e.y);if(db>=f&&db>=g)return!0}return!1}function V(a,b){this.manager=a,this.set(b)}function W(a){if(p(a,jb))return jb;var b=p(a,kb),c=p(a,lb);return b&&c?jb:b||c?b?kb:lb:p(a,ib)?ib:hb}function X(){if(!fb)return!1;var b={},c=a.CSS&&a.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(d){b[d]=c?a.CSS.supports("touch-action",d):!0}),b}function Y(a){this.options=la({},this.defaults,a||{}),this.id=v(),this.manager=null,this.options.enable=l(this.options.enable,!0),this.state=nb,this.simultaneous={},this.requireFail=[]}function Z(a){return a&sb?"cancel":a&qb?"end":a&pb?"move":a&ob?"start":""}function $(a){return a==Ma?"down":a==La?"up":a==Ja?"left":a==Ka?"right":""}function _(a,b){var c=b.manager;return c?c.get(a):a}function aa(){Y.apply(this,arguments)}function ba(){aa.apply(this,arguments),this.pX=null,this.pY=null}function ca(){aa.apply(this,arguments)}function da(){Y.apply(this,arguments),this._timer=null,this._input=null}function ea(){aa.apply(this,arguments)}function fa(){aa.apply(this,arguments)}function ga(){Y.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ha(a,b){return b=b||{},b.recognizers=l(b.recognizers,ha.defaults.preset),new ia(a,b)}function ia(a,b){this.options=la({},ha.defaults,b||{}),this.options.inputTarget=this.options.inputTarget||a,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=a,this.input=y(this),this.touchAction=new V(this,this.options.touchAction),ja(this,!0),g(this.options.recognizers,function(a){var b=this.add(new a[0](a[1]));a[2]&&b.recognizeWith(a[2]),a[3]&&b.requireFailure(a[3])},this)}function ja(a,b){var c=a.element;if(c.style){var d;g(a.options.cssProps,function(e,f){d=u(c.style,f),b?(a.oldCssProps[d]=c.style[d],c.style[d]=e):c.style[d]=a.oldCssProps[d]||""}),b||(a.oldCssProps={})}}function ka(a,c){var d=b.createEvent("Event");d.initEvent(a,!0,!0),d.gesture=c,c.target.dispatchEvent(d)}var la,ma=["","webkit","Moz","MS","ms","o"],na=b.createElement("div"),oa="function",pa=Math.round,qa=Math.abs,ra=Date.now;la="function"!=typeof _assign2.default?function(a){if(a===d||null===a)throw new TypeError("Cannot convert undefined or null to object");for(var b=Object(a),c=1;c<arguments.length;c++){var e=arguments[c];if(e!==d&&null!==e)for(var f in e){e.hasOwnProperty(f)&&(b[f]=e[f])}}return b}:_assign2.default;var sa=h(function(a,b,c){for(var e=(0,_keys2.default)(b),f=0;f<e.length;){(!c||c&&a[e[f]]===d)&&(a[e[f]]=b[e[f]]),f++}return a},"extend","Use `assign`."),ta=h(function(a,b){return sa(a,b,!0)},"merge","Use `assign`."),ua=1,va=/mobile|tablet|ip(ad|hone|od)|android/i,wa="ontouchstart"in a,xa=u(a,"PointerEvent")!==d,ya=wa&&va.test(navigator.userAgent),za="touch",Aa="pen",Ba="mouse",Ca="kinect",Da=25,Ea=1,Fa=2,Ga=4,Ha=8,Ia=1,Ja=2,Ka=4,La=8,Ma=16,Na=Ja|Ka,Oa=La|Ma,Pa=Na|Oa,Qa=["x","y"],Ra=["clientX","clientY"];x.prototype={handler:function handler(){},init:function init(){this.evEl&&m(this.element,this.evEl,this.domHandler),this.evTarget&&m(this.target,this.evTarget,this.domHandler),this.evWin&&m(w(this.element),this.evWin,this.domHandler)},destroy:function destroy(){this.evEl&&n(this.element,this.evEl,this.domHandler),this.evTarget&&n(this.target,this.evTarget,this.domHandler),this.evWin&&n(w(this.element),this.evWin,this.domHandler)}};var Sa={mousedown:Ea,mousemove:Fa,mouseup:Ga},Ta="mousedown",Ua="mousemove mouseup";i(L,x,{handler:function handler(a){var b=Sa[a.type];b&Ea&&0===a.button&&(this.pressed=!0),b&Fa&&1!==a.which&&(b=Ga),this.pressed&&(b&Ga&&(this.pressed=!1),this.callback(this.manager,b,{pointers:[a],changedPointers:[a],pointerType:Ba,srcEvent:a}))}});var Va={pointerdown:Ea,pointermove:Fa,pointerup:Ga,pointercancel:Ha,pointerout:Ha},Wa={2:za,3:Aa,4:Ba,5:Ca},Xa="pointerdown",Ya="pointermove pointerup pointercancel";a.MSPointerEvent&&!a.PointerEvent&&(Xa="MSPointerDown",Ya="MSPointerMove MSPointerUp MSPointerCancel"),i(M,x,{handler:function handler(a){var b=this.store,c=!1,d=a.type.toLowerCase().replace("ms",""),e=Va[d],f=Wa[a.pointerType]||a.pointerType,g=f==za,h=r(b,a.pointerId,"pointerId");e&Ea&&(0===a.button||g)?0>h&&(b.push(a),h=b.length-1):e&(Ga|Ha)&&(c=!0),0>h||(b[h]=a,this.callback(this.manager,e,{pointers:b,changedPointers:[a],pointerType:f,srcEvent:a}),c&&b.splice(h,1))}});var Za={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},$a="touchstart",_a="touchstart touchmove touchend touchcancel";i(N,x,{handler:function handler(a){var b=Za[a.type];if(b===Ea&&(this.started=!0),this.started){var c=O.call(this,a,b);b&(Ga|Ha)&&c[0].length-c[1].length===0&&(this.started=!1),this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}}});var ab={touchstart:Ea,touchmove:Fa,touchend:Ga,touchcancel:Ha},bb="touchstart touchmove touchend touchcancel";i(P,x,{handler:function handler(a){var b=ab[a.type],c=Q.call(this,a,b);c&&this.callback(this.manager,b,{pointers:c[0],changedPointers:c[1],pointerType:za,srcEvent:a})}});var cb=2500,db=25;i(R,x,{handler:function handler(a,b,c){var d=c.pointerType==za,e=c.pointerType==Ba;if(!(e&&c.sourceCapabilities&&c.sourceCapabilities.firesTouchEvents)){if(d)S.call(this,b,c);else if(e&&U.call(this,c))return;this.callback(a,b,c)}},destroy:function destroy(){this.touch.destroy(),this.mouse.destroy()}});var eb=u(na.style,"touchAction"),fb=eb!==d,gb="compute",hb="auto",ib="manipulation",jb="none",kb="pan-x",lb="pan-y",mb=X();V.prototype={set:function set(a){a==gb&&(a=this.compute()),fb&&this.manager.element.style&&mb[a]&&(this.manager.element.style[eb]=a),this.actions=a.toLowerCase().trim()},update:function update(){this.set(this.manager.options.touchAction)},compute:function compute(){var a=[];return g(this.manager.recognizers,function(b){k(b.options.enable,[b])&&(a=a.concat(b.getTouchAction()))}),W(a.join(" "))},preventDefaults:function preventDefaults(a){var b=a.srcEvent,c=a.offsetDirection;if(this.manager.session.prevented)return void b.preventDefault();var d=this.actions,e=p(d,jb)&&!mb[jb],f=p(d,lb)&&!mb[lb],g=p(d,kb)&&!mb[kb];if(e){var h=1===a.pointers.length,i=a.distance<2,j=a.deltaTime<250;if(h&&i&&j)return}return g&&f?void 0:e||f&&c&Na||g&&c&Oa?this.preventSrc(b):void 0},preventSrc:function preventSrc(a){this.manager.session.prevented=!0,a.preventDefault()}};var nb=1,ob=2,pb=4,qb=8,rb=qb,sb=16,tb=32;Y.prototype={defaults:{},set:function set(a){return la(this.options,a),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function recognizeWith(a){if(f(a,"recognizeWith",this))return this;var b=this.simultaneous;return a=_(a,this),b[a.id]||(b[a.id]=a,a.recognizeWith(this)),this},dropRecognizeWith:function dropRecognizeWith(a){return f(a,"dropRecognizeWith",this)?this:(a=_(a,this),delete this.simultaneous[a.id],this)},requireFailure:function requireFailure(a){if(f(a,"requireFailure",this))return this;var b=this.requireFail;return a=_(a,this),-1===r(b,a)&&(b.push(a),a.requireFailure(this)),this},dropRequireFailure:function dropRequireFailure(a){if(f(a,"dropRequireFailure",this))return this;a=_(a,this);var b=r(this.requireFail,a);return b>-1&&this.requireFail.splice(b,1),this},hasRequireFailures:function hasRequireFailures(){return this.requireFail.length>0},canRecognizeWith:function canRecognizeWith(a){return!!this.simultaneous[a.id]},emit:function emit(a){function b(b){c.manager.emit(b,a)}var c=this,d=this.state;qb>d&&b(c.options.event+Z(d)),b(c.options.event),a.additionalEvent&&b(a.additionalEvent),d>=qb&&b(c.options.event+Z(d))},tryEmit:function tryEmit(a){return this.canEmit()?this.emit(a):void(this.state=tb)},canEmit:function canEmit(){for(var a=0;a<this.requireFail.length;){if(!(this.requireFail[a].state&(tb|nb)))return!1;a++}return!0},recognize:function recognize(a){var b=la({},a);return k(this.options.enable,[this,b])?(this.state&(rb|sb|tb)&&(this.state=nb),this.state=this.process(b),void(this.state&(ob|pb|qb|sb)&&this.tryEmit(b))):(this.reset(),void(this.state=tb))},process:function process(a){},getTouchAction:function getTouchAction(){},reset:function reset(){}},i(aa,Y,{defaults:{pointers:1},attrTest:function attrTest(a){var b=this.options.pointers;return 0===b||a.pointers.length===b},process:function process(a){var b=this.state,c=a.eventType,d=b&(ob|pb),e=this.attrTest(a);return d&&(c&Ha||!e)?b|sb:d||e?c&Ga?b|qb:b&ob?b|pb:ob:tb}}),i(ba,aa,{defaults:{event:"pan",threshold:10,pointers:1,direction:Pa},getTouchAction:function getTouchAction(){var a=this.options.direction,b=[];return a&Na&&b.push(lb),a&Oa&&b.push(kb),b},directionTest:function directionTest(a){var b=this.options,c=!0,d=a.distance,e=a.direction,f=a.deltaX,g=a.deltaY;return e&b.direction||(b.direction&Na?(e=0===f?Ia:0>f?Ja:Ka,c=f!=this.pX,d=Math.abs(a.deltaX)):(e=0===g?Ia:0>g?La:Ma,c=g!=this.pY,d=Math.abs(a.deltaY))),a.direction=e,c&&d>b.threshold&&e&b.direction},attrTest:function attrTest(a){return aa.prototype.attrTest.call(this,a)&&(this.state&ob||!(this.state&ob)&&this.directionTest(a))},emit:function emit(a){this.pX=a.deltaX,this.pY=a.deltaY;var b=$(a.direction);b&&(a.additionalEvent=this.options.event+b),this._super.emit.call(this,a)}}),i(ca,aa,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[jb]},attrTest:function attrTest(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.scale-1)>this.options.threshold||this.state&ob)},emit:function emit(a){if(1!==a.scale){var b=a.scale<1?"in":"out";a.additionalEvent=this.options.event+b}this._super.emit.call(this,a)}}),i(da,Y,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function getTouchAction(){return[hb]},process:function process(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime>b.time;if(this._input=a,!d||!c||a.eventType&(Ga|Ha)&&!f)this.reset();else if(a.eventType&Ea)this.reset(),this._timer=e(function(){this.state=rb,this.tryEmit()},b.time,this);else if(a.eventType&Ga)return rb;return tb},reset:function reset(){clearTimeout(this._timer)},emit:function emit(a){this.state===rb&&(a&&a.eventType&Ga?this.manager.emit(this.options.event+"up",a):(this._input.timeStamp=ra(),this.manager.emit(this.options.event,this._input)))}}),i(ea,aa,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function getTouchAction(){return[jb]},attrTest:function attrTest(a){return this._super.attrTest.call(this,a)&&(Math.abs(a.rotation)>this.options.threshold||this.state&ob)}}),i(fa,aa,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Na|Oa,pointers:1},getTouchAction:function getTouchAction(){return ba.prototype.getTouchAction.call(this)},attrTest:function attrTest(a){var b,c=this.options.direction;return c&(Na|Oa)?b=a.overallVelocity:c&Na?b=a.overallVelocityX:c&Oa&&(b=a.overallVelocityY),this._super.attrTest.call(this,a)&&c&a.offsetDirection&&a.distance>this.options.threshold&&a.maxPointers==this.options.pointers&&qa(b)>this.options.velocity&&a.eventType&Ga},emit:function emit(a){var b=$(a.offsetDirection);b&&this.manager.emit(this.options.event+b,a),this.manager.emit(this.options.event,a)}}),i(ga,Y,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function getTouchAction(){return[ib]},process:function process(a){var b=this.options,c=a.pointers.length===b.pointers,d=a.distance<b.threshold,f=a.deltaTime<b.time;if(this.reset(),a.eventType&Ea&&0===this.count)return this.failTimeout();if(d&&f&&c){if(a.eventType!=Ga)return this.failTimeout();var g=this.pTime?a.timeStamp-this.pTime<b.interval:!0,h=!this.pCenter||H(this.pCenter,a.center)<b.posThreshold;this.pTime=a.timeStamp,this.pCenter=a.center,h&&g?this.count+=1:this.count=1,this._input=a;var i=this.count%b.taps;if(0===i)return this.hasRequireFailures()?(this._timer=e(function(){this.state=rb,this.tryEmit()},b.interval,this),ob):rb}return tb},failTimeout:function failTimeout(){return this._timer=e(function(){this.state=tb},this.options.interval,this),tb},reset:function reset(){clearTimeout(this._timer)},emit:function emit(){this.state==rb&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ha.VERSION="2.0.8",ha.defaults={domEvents:!1,touchAction:gb,enable:!0,inputTarget:null,inputClass:null,preset:[[ea,{enable:!1}],[ca,{enable:!1},["rotate"]],[fa,{direction:Na}],[ba,{direction:Na},["swipe"]],[ga],[ga,{event:"doubletap",taps:2},["tap"]],[da]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var ub=1,vb=2;ia.prototype={set:function set(a){return la(this.options,a),a.touchAction&&this.touchAction.update(),a.inputTarget&&(this.input.destroy(),this.input.target=a.inputTarget,this.input.init()),this},stop:function stop(a){this.session.stopped=a?vb:ub},recognize:function recognize(a){var b=this.session;if(!b.stopped){this.touchAction.preventDefaults(a);var c,d=this.recognizers,e=b.curRecognizer;(!e||e&&e.state&rb)&&(e=b.curRecognizer=null);for(var f=0;f<d.length;){c=d[f],b.stopped===vb||e&&c!=e&&!c.canRecognizeWith(e)?c.reset():c.recognize(a),!e&&c.state&(ob|pb|qb)&&(e=b.curRecognizer=c),f++}}},get:function get(a){if(a instanceof Y)return a;for(var b=this.recognizers,c=0;c<b.length;c++){if(b[c].options.event==a)return b[c]}return null},add:function add(a){if(f(a,"add",this))return this;var b=this.get(a.options.event);return b&&this.remove(b),this.recognizers.push(a),a.manager=this,this.touchAction.update(),a},remove:function remove(a){if(f(a,"remove",this))return this;if(a=this.get(a)){var b=this.recognizers,c=r(b,a);-1!==c&&(b.splice(c,1),this.touchAction.update())}return this},on:function on(a,b){if(a!==d&&b!==d){var c=this.handlers;return g(q(a),function(a){c[a]=c[a]||[],c[a].push(b)}),this}},off:function off(a,b){if(a!==d){var c=this.handlers;return g(q(a),function(a){b?c[a]&&c[a].splice(r(c[a],b),1):delete c[a]}),this}},emit:function emit(a,b){this.options.domEvents&&ka(a,b);var c=this.handlers[a]&&this.handlers[a].slice();if(c&&c.length){b.type=a,b.preventDefault=function(){b.srcEvent.preventDefault()};for(var d=0;d<c.length;){c[d](b),d++}}},destroy:function destroy(){this.element&&ja(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},la(ha,{INPUT_START:Ea,INPUT_MOVE:Fa,INPUT_END:Ga,INPUT_CANCEL:Ha,STATE_POSSIBLE:nb,STATE_BEGAN:ob,STATE_CHANGED:pb,STATE_ENDED:qb,STATE_RECOGNIZED:rb,STATE_CANCELLED:sb,STATE_FAILED:tb,DIRECTION_NONE:Ia,DIRECTION_LEFT:Ja,DIRECTION_RIGHT:Ka,DIRECTION_UP:La,DIRECTION_DOWN:Ma,DIRECTION_HORIZONTAL:Na,DIRECTION_VERTICAL:Oa,DIRECTION_ALL:Pa,Manager:ia,Input:x,TouchAction:V,TouchInput:P,MouseInput:L,PointerEventInput:M,TouchMouseInput:R,SingleTouchInput:N,Recognizer:Y,AttrRecognizer:aa,Tap:ga,Pan:ba,Swipe:fa,Pinch:ca,Rotate:ea,Press:da,on:m,off:n,each:g,merge:ta,extend:sa,assign:la,inherit:i,bindFn:j,prefixed:u});var wb="undefined"!=typeof a?a:"undefined"!=typeof self?self:{};wb.Hammer=ha, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = (function(){return ha}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"undefined"!=typeof module&&module.exports?module.exports=ha:a[c]=ha}(window,document,"Hammer");

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(174), __esModule: true };

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(175);
module.exports = __webpack_require__(2).Object.keys;


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(14);
var $keys = __webpack_require__(28);

__webpack_require__(44)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _promise=__webpack_require__(59);var _promise2=_interopRequireDefault(_promise);var _from=__webpack_require__(38);var _from2=_interopRequireDefault(_from);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var modalContentWrapper='dtsModalContent';var waitBeforeShowingModal=300;var Messages=function(){function Messages(deleteModalValues,pageObj){var _this=this;(0,_classCallCheck3.default)(this,Messages);this.deleteModalCheckbox=document.getElementById(deleteModalValues.checkboxId);this.deleteModalDeleteButton=document.getElementById(deleteModalValues.deleteButton);this.deleteModalCookieName=deleteModalValues.cookie;this.modalContent=document.getElementById(modalContentWrapper);this.dtsAsyncWaitingModal=dtsAsyncWaitingModal;this.mdlError=new app.DtsErrorModal;this.messageList;this.messageSelector='.'+pageObj.values.messageClassName;this.statusUpdateObject={};this.initPageFunctionality(pageObj);this.mdlDeleteMessagesConfirmation=new app.DtsModal(null,{html:'<div><p>Message(s) will be permanently deleted! Do you wish to continue?</p></div>',confirmation:{cookieNameHideConfirmation:'deleteModalValues.cookie',callbackOK:function callbackOK(){_this.updateMessagesStatus()},callbackCancel:function callbackCancel(){if(_this.pageObj.page==='inbox'){if(_this.selectAllCheckbox.checked){_this.selectAllCheckbox.checked=false}_this.toggleMessageCheckboxes()}}}})}(0,_createClass3.default)(Messages,[{key:'initPageFunctionality',value:function initPageFunctionality(pageObj){if(pageObj.page==='inbox'){this.mobileMessageStatusMenu=null;this.isStatusEnabled=false;this.selectAllCheckbox=document.getElementById(pageObj.values.dtsSelectAllCheckbox);this.selectAllLabel=document.getElementById(pageObj.values.dtsSelectAllLabel);this.dtsMessagesControlIds=pageObj.values.dtsMessagesControlIds}this.pageObj=pageObj;this.getMessageList();this.setListeners()}},{key:'setListeners',value:function setListeners(){var _this2=this;this.deleteModalCheckbox.addEventListener('click',function(){_this2.toggleDeleteModalCookieValue()});if(this.pageObj.page==='inbox'){this.checkBoxListener();this.selectAllCheckbox.addEventListener('click',function(){_this2.toggleMessageCheckboxes()})}}},{key:'getMessageList',value:function getMessageList(){this.messageList=document.querySelectorAll(this.messageSelector)}},{key:'getCheckedMessages',value:function getCheckedMessages(){var messagesToEdit=(0,_from2.default)(this.messageList);if(this.pageObj.page==='inbox'){messagesToEdit=messagesToEdit.filter(function(message){return message.checked})}return messagesToEdit}},{key:'toggleMessageCheckboxes',value:function toggleMessageCheckboxes(){var _this3=this;this.messageList.forEach(function(currentValue){if(_this3.selectAllCheckbox.checked){currentValue.checked=true}else{if(currentValue.checked){currentValue.checked=false}}});app.utility.helpers.toggleInnerText(this.selectAllLabel,this.selectAllCheckbox.checked,['Unselect','Select all']);this.toggleUpdateStatusControls()}},{key:'toggleUpdateStatusControls',value:function toggleUpdateStatusControls(){var blockerElemHack=document.getElementById(this.dtsMessagesControlIds.mobileMenuWrapper).lastElementChild;if(this.getCheckedMessages().length==0&&this.isStatusEnabled){for(var id in this.dtsMessagesControlIds.controls){document.getElementById(this.dtsMessagesControlIds.controls[id]).classList.add('disabled');if(id==='mobileControlMenu'){blockerElemHack.style.display='block'}};this.isStatusEnabled=false}else{if(this.isStatusEnabled==false){for(var _id in this.dtsMessagesControlIds.controls){document.getElementById(this.dtsMessagesControlIds.controls[_id]).classList.remove('disabled');if(_id==='mobileControlMenu'){blockerElemHack.style.display='none'}};if(this.mobileMessageStatusMenu===null){this.mobileMessageStatusMenu=new app.dts.card.menu.CollapsibleMenu('dtsMessageMobileEdit','dtsMessageMobileEditMenu',app.dts.common,navMenuManager,dtsMobileMessageMenuOptions)}this.isStatusEnabled=true}}}},{key:'checkBoxListener',value:function checkBoxListener(){var _this4=this;this.messageList.forEach(function(currentValue){currentValue.addEventListener('change',function(){_this4.toggleUpdateStatusControls()})})}},{key:'makeAjaxCall',value:function makeAjaxCall(url,resolve,reject,messagePageURL){app.dts.common.xhr.post(url,null,true,function(){if(resolve===null){location.href=messagePageURL}else{resolve()}},function(error){reject(error)})}},{key:'toggleDeleteModalCookieValue',value:function toggleDeleteModalCookieValue(){document.cookie=this.deleteModalCookieName+'='+(this.deleteModalCheckbox.checked?1:0)+'; path=/'}},{key:'getAjaxURL',value:function getAjaxURL(messageId){var url=void 0;var messageIdParam='messageId='+messageId;if(this.statusUpdateObject.markMessageParam===null){url=this.statusUpdateObject.xhrPath+'?'+messageIdParam}else{url=this.statusUpdateObject.xhrPath+'?'+messageIdParam+this.statusUpdateObject.markMessageParam}return url}},{key:'updateMessagesStatus',value:function updateMessagesStatus(){var _this5=this;var promiseArray=[];this.dtsAsyncWaitingModal.open();this.statusUpdateObject.checkedMessageList.forEach(function(currentValue){var id=currentValue.dataset.id;var promiseName='_'+id;var ajaxUrl=_this5.getAjaxURL(id);promiseName=new _promise2.default(function(resolve,reject){_this5.makeAjaxCall(ajaxUrl,resolve,reject,null)});promiseArray.push(promiseName)});_promise2.default.all(promiseArray).then(function(){if(_this5.statusUpdateObject.goToURL!=='null'&&_this5.statusUpdateObject.checkedMessageList.length===_this5.messageList.length&&(_this5.statusUpdateObject.markMessageAs==='read'||_this5.statusUpdateObject.markMessageAs==='delete')){location.href=_this5.statusUpdateObject.goToURL}else{location.reload()}}).catch(function(error){_this5.dtsAsyncWaitingModal.close();_this5.mdlError.open()})}},{key:'getStatusUpdateType',value:function getStatusUpdateType(updateType){var param=void 0;if(updateType==='variable'){param=document.querySelector('[data-change-read-status-to]').dataset.changeReadStatusTo==='true'?'read':'unread'}else{param=updateType}return param}},{key:'setStatusUpdateObject',value:function setStatusUpdateObject(updateType,navigateTo,markedMessageUrl){this.statusUpdateObject.markMessageAs=this.getStatusUpdateType(updateType);this.statusUpdateObject.goToURL=navigateTo;this.statusUpdateObject.xhrPath=markedMessageUrl;this.statusUpdateObject.checkedMessageList=this.getCheckedMessages();if(this.statusUpdateObject.markMessageAs==='read'){this.statusUpdateObject.markMessageParam='&read=true'}if(this.statusUpdateObject.markMessageAs==='unread'){this.statusUpdateObject.markMessageParam='&read=false'}if(this.statusUpdateObject.markMessageAs==='delete'){this.statusUpdateObject.markMessageParam=null}}},{key:'goToMessagePage',value:function goToMessagePage(callNode){var _this6=this;var ajaxUrl=this.getAjaxURL(callNode.dataset.id);this.dtsAsyncWaitingModal.open();var singleReadMessage=new _promise2.default(function(resolve,reject){_this6.makeAjaxCall(ajaxUrl,null,reject,_this6.statusUpdateObject.goToURL)});singleReadMessage.then(function(result){_this6.dtsAsyncWaitingModal.close()},function(error){_this6.dtsAsyncWaitingModal.close()})}},{key:'processMessages',value:function processMessages(readMessage,updateType,navigateTo,markedMessageUrl,callNode){this.setStatusUpdateObject(updateType,navigateTo,markedMessageUrl);if(readMessage){this.goToMessagePage(callNode)}if(this.statusUpdateObject.checkedMessageList.length>0){this.statusUpdateObject.markMessageAs==='delete'?this.mdlDeleteMessagesConfirmation.open():this.updateMessagesStatus()}}}]);return Messages}();module.exports={Messages:Messages};

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(26);
__webpack_require__(178);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(11);
var $export = __webpack_require__(5);
var toObject = __webpack_require__(14);
var call = __webpack_require__(78);
var isArrayIter = __webpack_require__(79);
var toLength = __webpack_require__(35);
var createProperty = __webpack_require__(179);
var getIterFn = __webpack_require__(62);

$export($export.S + $export.F * !__webpack_require__(85)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(24);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PromoUx=function(){function PromoUx(promoForm,checkoutButton,flowToolUrl,promoApplied,modal){(0,_classCallCheck3.default)(this,PromoUx);this.proceedToCheckoutButton=document.getElementById(checkoutButton);this.flowToolURL=flowToolUrl;this.initPromoUx()}(0,_createClass3.default)(PromoUx,[{key:"initPromoUx",value:function initPromoUx(){this.proceedToCheckoutButton.addEventListener("click",this.goToCheckout.bind(this))}},{key:"goToCheckout",value:function goToCheckout(){window.location=this.flowToolURL}}]);return PromoUx}();module.exports={PromoUx:PromoUx};

/***/ }),
/* 181 */
/***/ (function(module, exports) {

var COMPLETE = 'complete',
    CANCELED = 'canceled';

function raf(task){
    if('requestAnimationFrame' in window){
        return window.requestAnimationFrame(task);
    }

    setTimeout(task, 16);
}

function setElementScroll(element, x, y){
    if(element.self === element){
        element.scrollTo(x, y);
    }else{
        element.scrollLeft = x;
        element.scrollTop = y;
    }
}

function getTargetScrollLocation(target, parent, align){
    var targetPosition = target.getBoundingClientRect(),
        parentPosition,
        x,
        y,
        differenceX,
        differenceY,
        targetWidth,
        targetHeight,
        leftAlign = align && align.left != null ? align.left : 0.5,
        topAlign = align && align.top != null ? align.top : 0.5,
        leftOffset = align && align.leftOffset != null ? align.leftOffset : 0,
        topOffset = align && align.topOffset != null ? align.topOffset : 0,
        leftScalar = leftAlign,
        topScalar = topAlign;

    if(parent.self === parent){
        targetWidth = Math.min(targetPosition.width, parent.innerWidth);
        targetHeight = Math.min(targetPosition.height, parent.innerHeight);
        x = targetPosition.left + parent.pageXOffset - parent.innerWidth * leftScalar + targetWidth * leftScalar;
        y = targetPosition.top + parent.pageYOffset - parent.innerHeight * topScalar + targetHeight * topScalar;
        x -= leftOffset;
        y -= topOffset;
        differenceX = x - parent.pageXOffset;
        differenceY = y - parent.pageYOffset;
    }else{
        targetWidth = targetPosition.width;
        targetHeight = targetPosition.height;
        parentPosition = parent.getBoundingClientRect();
        var offsetLeft = targetPosition.left - (parentPosition.left - parent.scrollLeft);
        var offsetTop = targetPosition.top - (parentPosition.top - parent.scrollTop);
        x = offsetLeft + (targetWidth * leftScalar) - parent.clientWidth * leftScalar;
        y = offsetTop + (targetHeight * topScalar) - parent.clientHeight * topScalar;
        x = Math.max(Math.min(x, parent.scrollWidth - parent.clientWidth), 0);
        y = Math.max(Math.min(y, parent.scrollHeight - parent.clientHeight), 0);
        x -= leftOffset;
        y -= topOffset;
        differenceX = x - parent.scrollLeft;
        differenceY = y - parent.scrollTop;
    }

    return {
        x: x,
        y: y,
        differenceX: differenceX,
        differenceY: differenceY
    };
}

function animate(parent){
    var scrollSettings = parent._scrollSettings;
    if(!scrollSettings){
        return;
    }

    var location = getTargetScrollLocation(scrollSettings.target, parent, scrollSettings.align),
        time = Date.now() - scrollSettings.startTime,
        timeValue = Math.min(1 / scrollSettings.time * time, 1);

    if(
        time > scrollSettings.time &&
        scrollSettings.endIterations > 3
    ){
        setElementScroll(parent, location.x, location.y);
        parent._scrollSettings = null;
        return scrollSettings.end(COMPLETE);
    }

    scrollSettings.endIterations++;

    var easeValue = 1 - scrollSettings.ease(timeValue);

    setElementScroll(parent,
        location.x - location.differenceX * easeValue,
        location.y - location.differenceY * easeValue
    );

    // At the end of animation, loop synchronously
    // to try and hit the taget location.
    if(time >= scrollSettings.time){
        return animate(parent);
    }

    raf(animate.bind(null, parent));
}
function transitionScrollTo(target, parent, settings, callback){
    var idle = !parent._scrollSettings,
        lastSettings = parent._scrollSettings,
        now = Date.now(),
        endHandler;

    if(lastSettings){
        lastSettings.end(CANCELED);
    }

    function end(endType){
        parent._scrollSettings = null;
        if(parent.parentElement && parent.parentElement._scrollSettings){
            parent.parentElement._scrollSettings.end(endType);
        }
        callback(endType);
        parent.removeEventListener('touchstart', endHandler, { passive: true });
    }

    parent._scrollSettings = {
        startTime: lastSettings ? lastSettings.startTime : Date.now(),
        endIterations: 0,
        target: target,
        time: settings.time + (lastSettings ? now - lastSettings.startTime : 0),
        ease: settings.ease,
        align: settings.align,
        end: end
    };

    endHandler = end.bind(null, CANCELED);
    parent.addEventListener('touchstart', endHandler, { passive: true });

    if(idle){
        animate(parent);
    }
}

function defaultIsScrollable(element){
    return (
        'pageXOffset' in element ||
        (
            element.scrollHeight !== element.clientHeight ||
            element.scrollWidth !== element.clientWidth
        ) &&
        getComputedStyle(element).overflow !== 'hidden'
    );
}

function defaultValidTarget(){
    return true;
}

module.exports = function(target, settings, callback){
    if(!target){
        return;
    }

    if(typeof settings === 'function'){
        callback = settings;
        settings = null;
    }

    if(!settings){
        settings = {};
    }

    settings.time = isNaN(settings.time) ? 1000 : settings.time;
    settings.ease = settings.ease || function(v){return 1 - Math.pow(1 - v, v / 2);};

    var parent = target.parentElement,
        parents = 0;

    function done(endType){
        parents--;
        if(!parents){
            callback && callback(endType);
        }
    }

    var validTarget = settings.validTarget || defaultValidTarget;
    var isScrollable = settings.isScrollable;

    while(parent){
        if(validTarget(parent, parents) && (isScrollable ? isScrollable(parent, defaultIsScrollable) : defaultIsScrollable(parent))){
            parents++;
            transitionScrollTo(target, parent, settings, done);
        }

        parent = parent.parentElement;

        if(!parent){
            return;
        }

        if(parent.tagName === 'BODY'){
            parent = parent.ownerDocument;
            parent = parent.defaultView || parent.ownerWindow;
        }
    }
};


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ScenePurchase=function(){function ScenePurchase(sceneId,isLoggedIn,isActiveDownload){(0,_classCallCheck3.default)(this,ScenePurchase);this.elPurchaseOption=document.getElementById('dtsPurchaseOption-'+sceneId);this.buySceneForm=document.getElementById('dtsPurchaseForm-'+sceneId);this.btnAddToCart=document.getElementById('dtsBtnAddToCart-'+sceneId);this.quickBuyModal=document.getElementById('dtsQuickBuyScene-'+sceneId);if(isLoggedIn&&!isActiveDownload&&this.quickBuyModal){new app.DtsModalQuickBuy('dtsQuickBuySceneLink-'+sceneId,'dtsQuickBuyScene-'+sceneId,'dtsQuickBuyClose-'+sceneId)}if(this.elPurchaseOption&&!isActiveDownload){this.elPurchaseOption.addEventListener('click',this.showHidePurchaseActions,false)}if(isLoggedIn&&isActiveDownload)this.elPurchaseOption.addEventListener('click',this.downloadScene,false);if(this.btnAddToCart)this.btnAddToCart.addEventListener('click',this.buyScene.bind(this),false)}(0,_createClass3.default)(ScenePurchase,[{key:'buyScene',value:function buyScene(){this.buySceneForm.submit()}},{key:'downloadScene',value:function downloadScene(e){var elForm=e.currentTarget.querySelector('form');if(elForm)elForm.submit()}},{key:'showHidePurchaseActions',value:function showHidePurchaseActions(e){var chevronNode=document.getElementById(e.currentTarget.id+'-chevron');var actionNode=document.getElementById(e.currentTarget.id+'-actions');if(e.type==='click'){if(chevronNode.classList.contains('dts-icon-style-rotate-180')){chevronNode.classList.remove('dts-icon-style-rotate-180');actionNode.style.display='none'}else{chevronNode.classList.add('dts-icon-style-rotate-180');actionNode.style.display='flex'}}}}]);return ScenePurchase}();module.exports={ScenePurchase:ScenePurchase};

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _get2=__webpack_require__(57);var _get3=_interopRequireDefault(_get2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _dtsModal=__webpack_require__(20);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PREVIEW_LIMIT_MODAL_LOGIN_BUTTON_ID='dtsPreviewLimitLoginButton';var PREVIEW_LIMIT_MODAL_SIGNUP_BUTTON_ID='dtsPreviewLimitSignupButton';var PREVIEW_LIMIT_HTML='\n<section id="dtsPreviewLimitModalContent" class="dts-preview-limit-modal-content" style="display: block;">\n\t<div>\n\t\t<h1 class="dts-page-title">To unlock unlimited access to FREE previews, please log in or sign up for a FREE account.</h1>\n\t</div>\n\t<div id="dtsFrmPreviewLimitButtons" class="dts-form-field-container">\n\t\t<button id="dtsPreviewLimitSignupButton" class="dts-link-button" type="button">Sign Up</button>\n\t\t<button id="dtsPreviewLimitCloseButton" class="dts-link-button" type="button">Cancel</button>\n\t\t<span class="dts-form-field-text-button">\n\t\t\t<a id="dtsPreviewLimitLoginButton">Login to your account</a>\n\t\t</span>\n\t</div>\n</section>\n';var PreviewLimitModal=function(_DtsModal){(0,_inherits3.default)(PreviewLimitModal,_DtsModal);function PreviewLimitModal(){(0,_classCallCheck3.default)(this,PreviewLimitModal);return(0,_possibleConstructorReturn3.default)(this,(PreviewLimitModal.__proto__||(0,_getPrototypeOf2.default)(PreviewLimitModal)).call(this,null,{html:PREVIEW_LIMIT_HTML,disableDefaultCloser:true,removeDefaultContentStyles:true,closers:['dtsPreviewLimitCloseButton']}))}(0,_createClass3.default)(PreviewLimitModal,[{key:'open',value:function open(loginUrl,signupUrl,signupId){var loginButton=document.getElementById(PREVIEW_LIMIT_MODAL_LOGIN_BUTTON_ID);if(loginButton)loginButton.href=loginUrl;var signupButton=document.getElementById(PREVIEW_LIMIT_MODAL_SIGNUP_BUTTON_ID);if(signupButton)signupButton.onclick=function(){location.href=signupUrl};(0,_get3.default)(PreviewLimitModal.prototype.__proto__||(0,_getPrototypeOf2.default)(PreviewLimitModal.prototype),'open',this).call(this)}}]);return PreviewLimitModal}(_dtsModal.DtsModal);module.exports={PreviewLimitModal:PreviewLimitModal};

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);var _thirdParty=__webpack_require__(87);var thirdParty=_interopRequireWildcard(_thirdParty);var _helpers=__webpack_require__(32);var helpers=_interopRequireWildcard(_helpers);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var starMenus=['Gender','Ethnicity','Eye Color','Hair Color','Height','Weight'];var alphaIndexedMenus=['Stars','Studios','Series','Directors'];var fixedMenus=['Video Quality','Release Date','Body Modifications'];var dynamicMenus=['Categories','Sex Acts','Ethnicity','Hair Color','Hair Length','Hair Style','Eye Color','Body Type','Breasts','Hips/Ass','Giving-Receiving','Positions','Setting','Accessories','Cumshot'];var debug=false;var FilterSubMenu=function(){function FilterSubMenu(submenuId,ajaxUrl,hasExcludes,title){(0,_classCallCheck3.default)(this,FilterSubMenu);this.submenu=document.getElementById(submenuId);if(!this.submenu)throw'Can\'t find element: '+this.submenuId;this.submenuInitialized=false;this.id=submenuId;this.arrMap=submenuId.split('-').slice(1);this.submenuContents=this.submenu.querySelector('.dts-search-filter-submenu-items-hidden');if(!ajaxUrl){this.submenuContents.classList.add('dts-search-filter-submenu-items');this.submenuContents.classList.remove('dts-search-filter-submenu-items-hidden')}this.submenuContainer=this.submenu.parentElement;this.submenuTitleWrapper=this.submenu.querySelector('.dts-search-filter-submenu-title-icon-wrapper');this.submenuPrompt=this.submenu.querySelector('.dts-filter-menu-prompt');this.submenuLoading=this.submenu.querySelector('.dts-search-requesting-filters');this.moreLink=this.submenu.querySelector('.dts-search-sub-menu-more-link-container');if(this.moreLink){this.moreLink.style.display='none'}var arrMenuName=this.submenu.dataset.menuName.split('|');if(arrMenuName.length==1){this.menuName=arrMenuName[0];this.timingLabel='';this.timingVar=arrMenuName[0]}if(arrMenuName.length==2){this.menuName=arrMenuName[1];this.timingLabel=arrMenuName[1];this.timingVar=arrMenuName[0]}this.submenu.addEventListener('click',this.toggleSubMenu.bind(this),false);this.submenuTitleWrapper.addEventListener('mouseover',this._showFilterMenuPrompt.bind(this),false);this.submenuTitleWrapper.addEventListener('mouseout',this._hideFilterMenuPrompt.bind(this),false);this.ajaxUrl=ajaxUrl;this.hasExcludes=hasExcludes;this.title=title;this.searchType=this.submenu.dataset.searchType}(0,_createClass3.default)(FilterSubMenu,[{key:'toggleSubMenu',value:function toggleSubMenu(e){var _this=this;if(debug)console.log('toggling submenu');if(e)e.stopPropagation();if(e&&e.target.tagName=='A')return;if(!e||e.target.tagName=='DIV'){var menuItemTitleContainer=this.submenu.querySelector('.dts-search-filter-submenu-title-icon-wrapper');if(debug)console.log('in toggleFilterSubmenu, menuItemTitleContainer:  ');if(debug)console.dir(menuItemTitleContainer);if(this.submenu.classList.contains('closed')||this.submenu.classList.contains('hidden')){if(debug)console.dir('Opening menu');this._openSubMenu(e);if(starMenus.indexOf(this.menuName)!=-1||alphaIndexedMenus.indexOf(this.menuName)!=-1||fixedMenus.indexOf(this.menuName)!=-1||dynamicMenus.indexOf(this.menuName)!=-1){if(this.submenu.dataset.initialized!='true'){if(this.ajaxUrl){this.submenuLoading.style.display='block';var ajaxStartTime=new Date().getTime();dts.common.xhr.post(this.ajaxUrl,{},true,function(status,response){if(debug)console.log(response);if(e){var ajaxTotalTime=new Date().getTime()-ajaxStartTime;var objGaData={event:'trackUserTiming',timingCategory:'Filter Expansion Timings: '+_this.searchType,timingVar:_this.timingVar,timingLabel:_this.timingLabel?_this.timingLabel:undefined,timingValue:ajaxTotalTime};dataLayer.push(objGaData);if(debug)console.log(objGaData)}if(_this.searchType=='Stars'){if(starMenus.indexOf(_this.menuName)!=-1){_this._initFixedList(response)}}else{if(alphaIndexedMenus.indexOf(_this.menuName)!=-1){_this._initAlphaList(response)}if(fixedMenus.indexOf(_this.menuName)!=-1){_this._initFixedList(response)}if(dynamicMenus.indexOf(_this.menuName)!=-1){_this._initDynamicList(response)}}_this.submenu.dataset.initialized='true';if(_this.moreLink){_this.moreLink.style.display='block'}_this.submenuContents.classList.add('dts-search-filter-submenu-items');_this.submenuContents.classList.remove('dts-search-filter-submenu-items-hidden');_this.submenuLoading.style.display='none'})}else{this._openSubMenu(e)}}else{this._openSubMenu(e)}}else{this._openSubMenu(e)}}else{this._closeSubMenu()}}}},{key:'_openSubMenu',value:function _openSubMenu(e){var _this2=this;var openSubmenus=this.submenuContainer.querySelectorAll('.dts-search-filter-submenu.opened');openSubmenus.forEach(function(element){_this2._closeSubMenu(element)});this.submenu.classList.remove('closed');this.submenu.classList.add('opened');this.submenuTitleWrapper.classList.remove('closed');this.submenuTitleWrapper.classList.add('opened');if(!this.ajaxUrl||!e||this.submenu.dataset.initialized){this.submenuContents.classList.add('dts-search-filter-submenu-items');this.submenuContents.classList.remove('dts-search-filter-submenu-items-hidden');this.submenuLoading.style.display='none'}if(!helpers.checkIfElementIsWithinViewport(this.submenu)){thirdParty.scrollIntoView(this.submenu,{time:500})}if(e)app.dts.common.cookie.writeCookie('selectedMenu',this.arrMap.join('-'));var arrUrl=location.href.match(/search\/([^\/]+)\/filter\/([^\/]+)/);if(e&&arrUrl){var returnUrl=location.href.replace('/filter/'+arrUrl[2],'');returnUrl=returnUrl.replace(/page\/\d+/,'page/1');location.href=returnUrl}}},{key:'_closeSubMenu',value:function _closeSubMenu(submenu){var updateCookie=false;if(submenu==undefined)updateCookie=true;submenu=submenu?submenu:this.submenu;submenu.classList.add('closed');submenu.classList.remove('opened');this.submenuLoading.style.display='none';var titleWrapper=submenu.querySelector('.dts-search-filter-submenu-title-icon-wrapper');titleWrapper.classList.add('closed');titleWrapper.classList.remove('opened');this.submenuLoading.classList.add('closed');this.submenuLoading.classList.remove('opened');this.submenuLoading.style.display='none';this.submenuContents.classList.remove('dts-search-filter-submenu-items');this.submenuContents.classList.add('dts-search-filter-submenu-items-hidden');var arrCloseCookie=this.submenu.id.split('-');arrCloseCookie.shift();arrCloseCookie.pop();if(updateCookie)app.dts.common.cookie.writeCookie('selectedMenu',arrCloseCookie.join('-'))}},{key:'_initAlphaList',value:function _initAlphaList(response){var _this3=this;var zeroCounts=response.filter(function(index){return index.count==0});zeroCounts.forEach(function(objIndex){var elZeroCount=_this3.submenuContents.querySelector('a[data-name="'+objIndex.name+'"]');elZeroCount.classList.add('dts-search-link-disabled');elZeroCount.dataset.tooltip='No results for "'+objIndex.name+'"'})}},{key:'_initFixedList',value:function _initFixedList(response){var _this4=this;response.forEach(function(objCount){var elLink=_this4.submenu.querySelector('[data-value="'+objCount.name+'"]');if(elLink){var elCount=elLink.querySelector('.dts-filter-count');if(elCount)elCount.innerText=objCount.count}})}},{key:'_initDynamicList',value:function _initDynamicList(response){var _this5=this;var elDynamicList=document.createElement('UL');var elDynamicListParent=this.submenu.querySelector('.dts-search-filter-submenu-unchecked-items');var htmlDynamicList='';if(this.hasExcludes){elDynamicList.setAttribute('class','dts-search-filter-multi-select')}response.forEach(function(objCount){var regex=/'/g;var objCountName=objCount.name.replace(regex,'\\\'');if(objCount.id!=app.TAG_XPASS){htmlDynamicList+='\n\t\t\t\t\t<li class="dts-search-filter-section-criteria-item">';if(_this5.hasExcludes){htmlDynamicList+='\n\t\t\t\t\t\t<a id="dtsFilterExclude-'+objCount.id+'" class="dts-filter-icon-target" href="'+objCount.excludeUrl+'" onclick="dataLayer.push({\'event\': \'trackEvent\',\'eventCategory\': \'Search Filters Exclude: '+_this5.searchType+'\',\'eventAction\': \''+_this5.title+'\',\'eventLabel\': \''+objCountName+'\',\'eventValue\': undefined,\'nonInteraction\':undefined});app.utility.toggleFilterIcon(this);"  title="exclude filter">\n\t\t\t\t\t\t\t<i class="dts-icon-filter-exclude"></i>\t\n\t\t\t\t\t\t</a>'}htmlDynamicList+='\n\t\t\t\t\t\t<a id="dtsFilterInclude-'+objCount.id+'" class="dts-search-filter-criteria-link" href="'+objCount.searchUrl+'"  title="add filter" onclick="dataLayer.push({\'event\': \'trackEvent\',\'eventCategory\': \'Search Filters: '+_this5.searchType+'\',\'eventAction\': \''+_this5.title+'\',\'eventLabel\': \''+objCountName+'\',\'eventValue\': undefined,\'nonInteraction\':undefined});app.utility.toggleFilterIcon(this)">\n\t\t\t\t\t\t\t<i class="dts-icon-checkbox"></i>\n\t\t\t\t\t\t\t<span class="dts-search-filter-item-title">'+objCount.name+'</span>\n\t\t\t\t\t\t\t<span class="dts-filter-count" data-name="'+objCount.name+'">'+objCount.count+'</span>\n\t\t\t\t\t\t</a>\n\t\t\t\t\t</li>'}});elDynamicList.innerHTML=htmlDynamicList;elDynamicListParent.appendChild(elDynamicList)}},{key:'_showFilterMenuPrompt',value:function _showFilterMenuPrompt(){this.submenuPrompt.style.opacity=1}},{key:'_hideFilterMenuPrompt',value:function _hideFilterMenuPrompt(){this.submenuPrompt.style.opacity=0}},{key:'_iosFilterMenuPromptState',value:function _iosFilterMenuPromptState(titleWrapper){var elFilterMenuPrompt=titleWrapper.querySelector('span.dts-filter-menu-prompt');if(titleWrapper.classList.contains('opened')){elFilterMenuPrompt.style.opacity=0}else if(titleWrapper.classList.contains('closed')){elFilterMenuPrompt.style.opacity=1}}}]);return FilterSubMenu}();module.exports={FilterSubMenu:FilterSubMenu};

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _stringify=__webpack_require__(21);var _stringify2=_interopRequireDefault(_stringify);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var debug=false;var MOBILE_WIDTH=960;var FilterMenuManager=function(){function FilterMenuManager(mainMenuId){var _this=this;(0,_classCallCheck3.default)(this,FilterMenuManager);this.newSearch=false;this.submenus={};this.mainMenuId=mainMenuId;this.elMainMenu=document.getElementById(this.mainMenuId);this.elSearchResultsPanel=document.querySelector('.dts-search');this.elAdvSearchToggle=document.querySelector('#dtsSearchFilterToggle .dts-filter-menu-toggle');this.elAdvSearchToggle.addEventListener('mouseover',function(){_this.elAdvSearchToggle.classList.add('hover')},false);this.elAdvSearchToggle.addEventListener('mouseout',function(){_this.elAdvSearchToggle.classList.remove('hover')},false);if(!this.elMainMenu){this.elMainMenu=document.querySelector('.dts-search-filter-menu')}var browserWidth=window.innerWidth||document.body.clientWidth;var isMobile=browserWidth<MOBILE_WIDTH;if(isMobile){var elCloseText=this.elMainMenu.querySelector('.dts-close-filter-text');if(elCloseText&&elCloseText.innerHTML)elCloseText.innerHTML='Hide Filters'}var cookieQuery=app.dts.common.cookie.readCookie('terms');if(!cookieQuery)app.dts.common.cookie.writeCookie('terms','');var cookieCriteria=app.dts.common.cookie.readCookie('criteria');if(!cookieCriteria)app.dts.common.cookie.writeCookie('criteria','');var cookieSearchType=app.dts.common.cookie.readCookie('searchType');if(!cookieSearchType)app.dts.common.cookie.writeCookie('searchType','');var arrUrlSearchType=location.href.match(/\/search\/([^\/]+)\/([^\/]+)/);var urlSearchType=arrUrlSearchType[1];var isFilterPage=arrUrlSearchType[2]=='filter'?true:false;var arrUrlQuery=location.search.match(/\?.*query=([^&]*)/i);var urlQuery='';if(arrUrlQuery&&arrUrlQuery.length>1){urlQuery=decodeURI(arrUrlQuery[1])}var arrUrlCriteria=location.search.match(/\?.*criteria=([^&]*)/i);var urlCriteria='';if(arrUrlCriteria&&arrUrlCriteria.length>1){urlCriteria=arrUrlCriteria[1]}var objCriteria=JSON.parse(decodeURIComponent(urlCriteria));var isXPass=objCriteria.tagFilters&&objCriteria.tagFilters.includes(app.TAG_XPASS)?true:false;if(urlQuery!=cookieQuery||urlSearchType!=cookieSearchType||urlCriteria!=cookieCriteria&&isMobile){this.newSearch=true;app.dts.common.cookie.writeCookie('terms',urlQuery);app.dts.common.cookie.writeCookie('criteria',urlCriteria);app.dts.common.cookie.writeCookie('searchType',urlSearchType);app.dts.common.cookie.writeCookie('selectedMenu','')}var boolCloseFiterMenu=false;var arrFilterMenuClosed=location.search.match(/\?.*fmc=([^&]*)/i);if(arrFilterMenuClosed&&arrFilterMenuClosed[1]==1){this.newSearch=true;boolCloseFiterMenu=true}else if(arrFilterMenuClosed&&arrFilterMenuClosed[1]==0||isXPass){boolCloseFiterMenu=false}if(this.newSearch){if(debug)console.log('this is a new search');if(isMobile||boolCloseFiterMenu&&!isXPass){app.dts.common.cookie.writeCookie('selectedMenu','0');this.closeAdvancedSearchMenu()}else{if(urlQuery!=cookieQuery||urlSearchType!=cookieSearchType)app.dts.common.cookie.writeCookie('selectedMenu','1');this.openAdvancedSearchMenu()}}else{if(debug)console.log('this is not a new search');if(isMobile){app.dts.common.cookie.writeCookie('selectedMenu','0');this.closeAdvancedSearchMenu()}else{var arrSelectedMenu=void 0;var strSelectedMenu=app.dts.common.cookie.readCookie('selectedMenu');if(strSelectedMenu)arrSelectedMenu=strSelectedMenu.split('-');;if(arrSelectedMenu&&arrSelectedMenu.length>0){if(arrSelectedMenu[0]==0&&!isXPass){this.closeAdvancedSearchMenu()}else if(arrSelectedMenu[0]==1||isXPass){this.openAdvancedSearchMenu()}}}}if(isMobile&&isFilterPage)this.closeAdvancedSearchMenu();app.dts.common.cookie.writeCookie('searchType',urlSearchType);var elMainMenuToggle=this.elMainMenu.querySelector('.dts-search-filter-submenu-toggle');if(elMainMenuToggle)elMainMenuToggle.addEventListener('click',this.toggleAdvancedSearchMenu.bind(this),false)}(0,_createClass3.default)(FilterMenuManager,[{key:'add',value:function add(submenu){var id=submenu.id;this.submenus[id]=submenu;var arrMenuId=submenu.id.match(/dtsMenu([^-]+)-(.*)/);var cookieSelectedMenu=app.dts.common.cookie.readCookie('selectedMenu');if(cookieSelectedMenu){var arrSelectedMenu=cookieSelectedMenu.split('-');if((0,_stringify2.default)(arrSelectedMenu.slice(1,submenu.arrMap.length))==(0,_stringify2.default)(submenu.arrMap.slice(1,submenu.arrMap.length))){submenu.toggleSubMenu()}}}},{key:'toggleAdvancedSearchMenu',value:function toggleAdvancedSearchMenu(){if(this.elMainMenu){if(this.elMainMenu.classList.contains('dts-search-filter-menu-opened')){this.closeAdvancedSearchMenu()}else{this.openAdvancedSearchMenu()}}this.elAdvSearchToggle.classList.remove('hover')}},{key:'openAdvancedSearchMenu',value:function openAdvancedSearchMenu(){this.elMainMenu.classList.remove('dts-search-filter-menu-closed');this.elMainMenu.classList.add('dts-search-filter-menu-opened');this.elSearchResultsPanel.classList.remove('dts-filtered-search-collapsed');this.elSearchResultsPanel.classList.add('dts-filtered-search');var cookieSelectedMenu=app.dts.common.cookie.readCookie('selectedMenu');if(cookieSelectedMenu){var arrSelectedMenu=cookieSelectedMenu.split('-');if(arrSelectedMenu)arrSelectedMenu[0]=1;app.dts.common.cookie.writeCookie('selectedMenu',arrSelectedMenu.join('-'))}}},{key:'closeAdvancedSearchMenu',value:function closeAdvancedSearchMenu(){this.elMainMenu.classList.remove('dts-search-filter-menu-opened');this.elMainMenu.classList.add('dts-search-filter-menu-closed');this.elSearchResultsPanel.classList.add('dts-filtered-search-collapsed');this.elSearchResultsPanel.classList.remove('dts-filtered-search');var cookieSelectedMenu=app.dts.common.cookie.readCookie('selectedMenu');if(cookieSelectedMenu){var arrSelectedMenu=cookieSelectedMenu.split('-');if(arrSelectedMenu)arrSelectedMenu[0]=0;app.dts.common.cookie.writeCookie('selectedMenu',arrSelectedMenu.join('-'))}}}]);return FilterMenuManager}();module.exports={FilterMenuManager:FilterMenuManager};

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _set=__webpack_require__(88);var _set2=_interopRequireDefault(_set);var _from=__webpack_require__(38);var _from2=_interopRequireDefault(_from);var _toConsumableArray2=__webpack_require__(90);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _getIterator2=__webpack_require__(86);var _getIterator3=_interopRequireDefault(_getIterator2);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _helpers=__webpack_require__(32);var helpers=_interopRequireWildcard(_helpers);var _autoComplete=__webpack_require__(91);var autoComplete=_interopRequireWildcard(_autoComplete);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var MODAL_CONTENT_WRAPPER='dtsModalContent';var WAIT_BEFORE_SHOWING_MODAL=300;var DISABLED_TAG_CLASS_NAME='disabled';var ADD_DISABLE_CLASS_NAME=true;var TAG_SET_CLASS_NAME='setTag';var SELECTED_CONTENT_CLASS_NAME='dts-tag-entity-selected';var DELIMITER=',';var EXCLUDED_CHARACTERS='~';var NON_COUNT_CHARACTERS=[8,9,13,16,17,18,19,20,27,32,33,34,35,36,37,38,39,40,45,46,91,112,113,114,115,116,117,118,119,120,121,122,123,144,145,192];var MAX_CHARACTERS=64;var OFFSET_MAGIC_NUMBER=29;var ERROR_POINTER_CLASS='.dts-error-pointer';var ERROR_VISIBLE_CLASS='dts-tag-input-error-visible';var TAGLIST_POPUP_WIDTH=240;var TAGGING_MODAL_ERROR_MESSAGE_OFFSET=36;var TagManagement=function(){function TagManagement(mode,contentType,replaceChar,replaceInt,filterTagURL,tagEditURL,defaultRemoveTagURL,getOwnTagsURL,tagFilters,tagToRemove,linkedTags,filteredIdList,setFilterTags,setAddTags,setRemoveTags,setRenameTags,setDeleteTags,listContentNodes,getOwnTags,dtsSubmitTags,dtsTagsToSet,dtsMyTagList,tagInputField,dtsShowAllTagsIcon,dtsTagEditInstruction,contentCount,sortOptions,paginatorClass,deselectAllContentLink,tagInputErrorWrapper,noContentTagStyling,allTags,dtsTagModalCollection){(0,_classCallCheck3.default)(this,TagManagement);this.mode=mode;this.contentType=contentType;this.replaceChar=replaceChar;this.replaceInt=replaceInt;this.filterTagURL=filterTagURL;this.tagEditURL=tagEditURL;this.defaultRemoveTagURL=defaultRemoveTagURL;this.getOwnTagsURL=getOwnTagsURL;this.tagFilters=tagFilters;this.tagToRemove=tagToRemove;this.linkedTags=linkedTags;this.filteredIdList=filteredIdList;this.setFilterTags=document.querySelectorAll(setFilterTags);this.addTagsList=document.querySelectorAll(setAddTags);this.removeTagsList=document.querySelectorAll(setRemoveTags);this.renameTagsList=document.querySelectorAll(setRenameTags);this.deleteTagsList=document.querySelectorAll(setDeleteTags);this.listContentNodes=document.querySelectorAll(listContentNodes);this.dtsSubmitTags=document.getElementById(dtsSubmitTags);this.dtsTagsToSet=document.getElementById(dtsTagsToSet);this.dtsMyTagList=document.getElementById(dtsMyTagList);this.tagInputField=document.getElementById(tagInputField);this.dtsShowAllTagsIcon=document.getElementById(dtsShowAllTagsIcon);this.dtsTagEditInstruction=document.getElementById(dtsTagEditInstruction);this.contentCount=contentCount;this.sortOptions=document.querySelector(sortOptions);this.paginatorList=document.querySelectorAll(paginatorClass);this.deselectAllContentLink=document.getElementById(deselectAllContentLink)||null;this.tagInputErrorWrapper=document.getElementById(tagInputErrorWrapper);this.noContentTagStyling=noContentTagStyling;this.allTags=allTags;this.dtsTagModalCollection=dtsTagModalCollection;this.isTaggingModal=false;this.mdlError=new app.DtsErrorModal;this.contentTypeParam=this.contentType+'Filter';this.myTagListParent;this.initialTagRowHeight;this.filterList=[];this.idList=[];this.tagList=[];this.submitListenerActive=false;this.params=window.location.search;this.eventHandler;this.deselectContentHandler=this.deselectAllContent.bind(this);this.submitHandler=this.submitTags.bind(this);this.deselectContentHandlerSet=false;this.keyupEvtSet=false;this.urlState={};this.uniqueContentEdit=false;this.toggleTagVisibilitySet=false;this.isInputErrorVisible=false;this.dtsAsyncWaitingModal=dtsAsyncWaitingModal;this.autocomplete_flag=false;this.autocomplete_input_id=tagInputField;this.autocomplete_instance=null;this.init()}(0,_createClass3.default)(TagManagement,[{key:'init',value:function init(){if(helpers.isIE11()){var tagModule=document.querySelector('.dts-tag-module');tagModule.classList.add('dts-tag-IE-helper')}if(this.dtsMyTagList){this.myTagListParent=this.dtsMyTagList.parentNode;this.initialTagRowHeight=this.myTagListParent.offsetHeight;this.showAllTagsIcon();window.addEventListener('resize',this.showAllTagsIcon.bind(this),false)}if(this.mode==='FAVORITES'){this.filterBehavior()}if(this.mode==='ADD_TAG'){this.addTagBehavior();this.tagInputBehavior();this.contentBehavior();this.paginationBehavior(null);this.toggleDeselectAllContentLink();this.autocomplete_instance=new autoComplete.AutoComplete(this.autocomplete_input_id,this.allTags,{callback:this.tagMatch.bind(this)})}if(this.mode==='REMOVE_TAG'){this.removeTagBehavior(null);this.contentBehavior();this.paginationBehavior(null);this.toggleDeselectAllContentLink()}if(this.mode==='RENAME_TAG'){this.renameTagBehavior(null);this.tagInputBehavior();this.autocomplete_instance=new autoComplete.AutoComplete(this.autocomplete_input_id,this.allTags,{callback:this.tagMatch.bind(this)})}if(this.mode==='DELETE_TAG'){this.deleteTagBehavior(null)}this.buildModalInstances();window.addEventListener('load',this.selectUniqueContent.bind(this),false)}},{key:'buildModalInstances',value:function buildModalInstances(){var _this=this;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var object=_step.value;var triggerId='dtsTagEdit-'+object.template.data.id;var tagModalManager='taggingModalManager_'+object.template.data.id;var confirmFavoriteOptions={confirmation:{html:'Are you sure you want to remove this favorite '+_this.contentType+'?',labelOk:'Remove',callbackOK:function callbackOK(){location.href=object.template.data.favoriteHref}}};object.postProcess=function(){tagModalManager=new app.TagModalManager(this);var eltoggleFavoriteButton=this.children[0].querySelector('.dts-icon-target');if(eltoggleFavoriteButton)eltoggleFavoriteButton.addEventListener('click',function(){new app.DtsModal(null,confirmFavoriteOptions).open()})};object.deferTillOpen=true;object.template.data.tagManagementInstance=_this;_this[object.template.data.id]=new app.DtsModal(triggerId,object)};for(var _iterator=(0,_getIterator3.default)(this.dtsTagModalCollection),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}},{key:'filterBehavior',value:function filterBehavior(){var _this2=this;[].concat((0,_toConsumableArray3.default)(this.setFilterTags)).sort(function(a,b){return a.classList.contains('selected')>b.classList.contains('selected')?-1:1}).map(function(node){return _this2.dtsMyTagList.appendChild(node)});this.setFilterTags.forEach(function(node){node.addEventListener('click',this.setFilterArray.bind(this),false)},this);this.noContentTagStyling=[].concat((0,_toConsumableArray3.default)(document.querySelectorAll(this.noContentTagStyling)));this.noContentTagStyling.forEach(function(node){node.addEventListener('click',this.noContentFilter.bind(this),false)},this)}},{key:'addTagBehavior',value:function addTagBehavior(){this.addTagsList.forEach(function(node){node.addEventListener('click',this.setTagArray.bind(this),false)},this)}},{key:'removeTagBehavior',value:function removeTagBehavior(evt){var _this3=this;if(evt===null){this.eventHandler=this.removeTagBehavior.bind(this);var tagToRemoveArray=this.tagToRemove.split(DELIMITER);if(this.tagToRemove==='null'){this.removeTagsList.forEach(function(node){node.addEventListener('click',this.eventHandler,false)},this)}else{var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(0,_getIterator3.default)(this.dtsMyTagList.children),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var node=_step2.value;var nodeText=this.cleanTagValue(node.firstElementChild);for(i=0;i<tagToRemoveArray.length;i++){if(nodeText===tagToRemoveArray[i]){node.classList.remove(DISABLED_TAG_CLASS_NAME);node.addEventListener('click',this.eventHandler,false);break}};}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var tagNodes=(0,_from2.default)(this.dtsMyTagList.children);tagNodes.filter(function(node){if(node.classList.contains(DISABLED_TAG_CLASS_NAME)){_this3.dtsMyTagList.removeChild(node)}})}if(this.getSearchParam(this.params,this.contentTypeParam)){var linkedTagsArray=this.linkedTags.split(DELIMITER);var _tagNodes=(0,_from2.default)(this.dtsMyTagList.children).filter(function(elem){return linkedTagsArray.indexOf(_this3.cleanTagValue(elem))!=-1});while(this.dtsMyTagList.firstChild){this.dtsMyTagList.removeChild(this.dtsMyTagList.firstChild)}_tagNodes.forEach(function(elem){_this3.dtsMyTagList.append(elem)});if(tagToRemoveArray.length!==1){console.log('-------------------------THIS IS THE CORNER CASE ON REMOVE------------------------');_tagNodes.forEach(function(elem){if(elem.classList.contains(DISABLED_TAG_CLASS_NAME)){elem.classList.remove(DISABLED_TAG_CLASS_NAME);elem.addEventListener('click',_this3.eventHandler,false)}})}if(this.linkedTags.length===0){this.dtsMyTagList.innerHTML='This '+this.contentType+' has no tags. <a href="javascript:window.history.back();"> View all '+this.contentType+' favorites.</a>'}};}else{if(this.tagFilterList!=='null'){if(this.tagToRemove===this.cleanTagValue(evt.currentTarget)){this.setTagArray(evt);this.toggleTagInteractivity(!ADD_DISABLE_CLASS_NAME,this.eventHandler)}else{this.tagToRemove=this.cleanTagValue(evt.currentTarget);this.setTagArray(evt);this.toggleTagInteractivity(ADD_DISABLE_CLASS_NAME,this.eventHandler)}}else if(this.tagToRemove==='null'&&this.idList.length==0){this.setFilterArray(evt)}else if(this.tagToRemove==='null'&&this.isContentSelected()&&!evt.currentTarget.classList.contains(DISABLED_TAG_CLASS_NAME)){this.tagToRemove=this.cleanTagValue(evt.currentTarget);this.setTagArray(evt);this.toggleTagInteractivity(ADD_DISABLE_CLASS_NAME,this.eventHandler)}else if(!evt.currentTarget.classList.contains(DISABLED_TAG_CLASS_NAME)&&this.cleanTagValue(evt.currentTarget)==this.tagToRemove){if(this.uniqueContentEdit){this.tagToRemove='null';this.setTagArray(evt)}else{location.href=this.defaultRemoveTagURL}}}}},{key:'renameTagBehavior',value:function renameTagBehavior(evt){if(evt===null&&this.autocomplete_flag===false){this.eventHandler=this.renameTagBehavior.bind(this);this.renameTagsList.forEach(function(node){node.addEventListener('click',this.eventHandler,false)},this)}else{if(this.autocomplete_flag===false&&evt.currentTarget.classList.contains(TAG_SET_CLASS_NAME)){this.toggleTagInteractivity(!ADD_DISABLE_CLASS_NAME,this.eventHandler);this.setTagArray(evt)}else{this.setTagArray(evt);this.toggleTagInteractivity(ADD_DISABLE_CLASS_NAME,this.eventHandler);this.tagInputField.focus();this.autocomplete_flag=false}}}},{key:'deleteTagBehavior',value:function deleteTagBehavior(evt){if(evt===null){this.eventHandler=this.deleteTagBehavior.bind(this);this.deleteTagsList.forEach(function(node){node.addEventListener('click',this.eventHandler,false)},this)}else{this.setTagArray(evt)}}},{key:'paginationBehavior',value:function paginationBehavior(evt){if(evt===null){this.setUrlState();if(this.getSearchParam(this.params,'state')){this.setUiState(this.params)}var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=(0,_getIterator3.default)(this.paginatorList),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var node=_step3.value;var dataUrl=void 0;if(node.href.indexOf('?')!==-1){dataUrl=node.href.split('?');var value=this.getSearchParam(dataUrl[1],'sort');value=value?'?sort='+value:'';dataUrl=dataUrl[0]+value}else{dataUrl=node.href}node.setAttribute('data-url',dataUrl);node.href='javascript:void(0)';node.addEventListener('click',this.paginationBehavior.bind(this),false)}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}else{var url=evt.target.dataset.url;this.updateUrlState();if(this.urlState.tags.length>0){url=url+'&tags='+encodeURIComponent(this.getCleanString(this.urlState.tags))}if(this.urlState.ids.length>0){url=url+'&ids='+encodeURIComponent(this.getCleanString(this.urlState.ids))}if(this.urlState.input.length>0){url=url+'&input='+encodeURIComponent(this.getCleanString(this.urlState.input))}if(url!==evt.target.dataset.url){url=url+'&state=1'}location.href=url}}},{key:'setUiState',value:function setUiState(searchString){var _this4=this;var searchStr=decodeURIComponent(searchString);var tagStr=this.getSearchParam(searchStr,'tags');if(tagStr){this.tagMatch(tagStr,false)}var inputStr=this.getSearchParam(searchStr,'input');if(inputStr&&(this.mode==='RENAME_TAG'||this.mode==='ADD_TAG')){this.tagInputField.value=inputStr}var idStr=this.getSearchParam(searchStr,'ids');if(idStr){var contentIdArr=idStr.split(DELIMITER);contentIdArr.forEach(function(id){return _this4.clickElement(id)});this.idList=[].concat((0,_toConsumableArray3.default)(new _set2.default([].concat((0,_toConsumableArray3.default)(contentIdArr),(0,_toConsumableArray3.default)(this.idList)))))}}},{key:'tagMatch',value:function tagMatch(tagString){var _this5=this;var isAutoComplete=arguments.length>1&&arguments[1]!==undefined?arguments[1]:true;var tagNodeArray=void 0;var tagArray=tagString.split(DELIMITER);if(this.mode==='ADD_TAG'){if(isAutoComplete){this.autocomplete_flag=true}tagNodeArray=(0,_from2.default)(this.addTagsList)}if(this.mode==='REMOVE_TAG'){tagNodeArray=(0,_from2.default)(this.removeTagsList)}if(this.mode==='RENAME_TAG'){if(isAutoComplete){this.autocomplete_flag=true}tagNodeArray=(0,_from2.default)(this.renameTagsList)}tagNodeArray.filter(function(node){var textStr=_this5.cleanTagValue(node);return tagArray.filter(function(value){return textStr===value}).length>0}).forEach(function(node){if(_this5.mode==='RENAME_TAG'){_this5.renameTagBehavior(node)}else{_this5.setTagArray(node)}})}},{key:'setUrlState',value:function setUrlState(){var state=this.getSearchParam(this.params,'state');var tags=this.getSearchParam(this.params,'tags');var ids=this.getSearchParam(this.params,'ids');var input=this.getSearchParam(this.params,'input');this.urlState.state=state;this.urlState.tags=tags?tags.split(DELIMITER):[];this.urlState.ids=ids?ids.split(DELIMITER):[];this.urlState.input=input?input.split(DELIMITER):[]}},{key:'updateUrlState',value:function updateUrlState(){if(this.urlState.tags.length>0){var combinedTagArr=[].concat((0,_toConsumableArray3.default)(this.urlState.tags),(0,_toConsumableArray3.default)(this.tagList));this.urlState.tags=combinedTagArr.filter(function(elem,idx){return combinedTagArr.indexOf(elem)===idx})}else{this.urlState.tags=this.tagList}if(this.urlState.ids.length>0){var combinedIdArr=[].concat((0,_toConsumableArray3.default)(this.urlState.ids),(0,_toConsumableArray3.default)(this.idList));this.urlState.ids=combinedIdArr.filter(function(elem,idx){return combinedIdArr.indexOf(elem)===idx})}else{this.urlState.ids=this.idList}if(this.mode==='ADD_TAG'||this.mode==='RENAME_TAG'){this.urlState.input=this.setInputArray(this.tagInputField)}}},{key:'setTagArray',value:function setTagArray(evt){var node=evt.type==='click'?evt.currentTarget:evt;var tag=this.cleanTagValue(node);if(node.classList.contains(TAG_SET_CLASS_NAME)){if(this.uniqueContentEdit&&this.mode==='REMOVE_TAG'){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=(0,_getIterator3.default)(this.dtsMyTagList.children),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var elem=_step4.value;elem.classList.remove(DISABLED_TAG_CLASS_NAME);elem.addEventListener('click',this.eventHandler,false)}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}}node.classList.remove(TAG_SET_CLASS_NAME);this.orderTags(this.dtsMyTagList,node);this.tagList=helpers.removeFromArray(this.tagList,tag);if(this.mode==='RENAME_TAG'||this.mode==='ADD_TAG'){this.updateAutoCompleteList(true,tag)}if(this.mode==='REMOVE_TAG'&&this.dtsTagEditInstruction.classList.contains('hide')){this.dtsTagEditInstruction.classList.remove('hide');this.dtsTagEditInstruction.parentNode.removeAttribute('style');this.dtsTagsToSet.removeAttribute('style')}if(this.mode==='DELETE_TAG'&&this.tagList.length===0&&this.dtsTagEditInstruction.classList.contains('hide')){this.dtsTagEditInstruction.classList.remove('hide');this.dtsTagEditInstruction.parentNode.removeAttribute('style');this.dtsTagsToSet.removeAttribute('style')}if(this.mode==='RENAME_TAG'){this.tagInputField.setAttribute('placeholder','Select a tag and enter new tag name.')}}else{node.classList.add(TAG_SET_CLASS_NAME);this.orderTags(this.dtsTagsToSet,node);helpers.addToArray(this.tagList,tag);if(this.mode==='RENAME_TAG'||this.mode==='ADD_TAG'){this.updateAutoCompleteList(false,tag)}if(this.mode==='REMOVE_TAG'||this.mode==='DELETE_TAG'){if(!this.dtsTagEditInstruction.classList.contains('hide')){this.dtsTagEditInstruction.classList.add('hide');this.dtsTagEditInstruction.parentNode.style.justifyContent='flex-end';if(!helpers.isIE11()){this.dtsTagEditInstruction.parentNode.style.flex=0;this.dtsTagsToSet.style.flex=1}else{this.dtsTagsToSet.style.flex=100}}}if(this.mode==='RENAME_TAG'){this.tagInputField.setAttribute('placeholder','Enter new tag name.')}}this.showAllTagsIcon();this.toggleSubmitButtonState(evt)}},{key:'contentBehavior',value:function contentBehavior(){this.listContentNodes.forEach(function(node){node.addEventListener('click',this.setIdArray.bind(this),false)},this)}},{key:'setIdArray',value:function setIdArray(evt){var selected=evt.currentTarget;var getId=selected.id;var contentId=getId.split('-')[1];if(selected.classList.contains(SELECTED_CONTENT_CLASS_NAME)){selected.classList.remove(SELECTED_CONTENT_CLASS_NAME);this.idList=helpers.removeFromArray(this.idList,contentId);if(this.urlState.ids.length>0){this.urlState.ids=this.urlState.ids.filter(function(elem){return contentId!==elem})}}else{selected.classList.add(SELECTED_CONTENT_CLASS_NAME);helpers.addToArray(this.idList,contentId)}this.toggleDeselectAllContentLink();this.toggleSubmitButtonState()}},{key:'toggleDeselectAllContentLink',value:function toggleDeselectAllContentLink(){if(this.isContentSelected()||this.urlState.ids.length>0){if(!this.deselectContentHandlerSet){this.deselectAllContentLink.addEventListener('click',this.deselectContentHandler,false);this.deselectContentHandlerSet=true}if(this.deselectAllContentLink.parentNode.classList.contains('disabled')){this.deselectAllContentLink.parentNode.classList.remove('disabled')}}else{if(this.deselectContentHandlerSet){this.deselectAllContentLink.removeEventListener('click',this.deselectContentHandler,false);this.deselectContentHandlerSet=false}if(!this.deselectAllContentLink.parentNode.classList.contains('disabled')){this.deselectAllContentLink.parentNode.classList.add('disabled')}}}},{key:'deselectAllContent',value:function deselectAllContent(evt){var selectedContentNodes=document.querySelectorAll('.'+SELECTED_CONTENT_CLASS_NAME);var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=(0,_getIterator3.default)(selectedContentNodes),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var elem=_step5.value;var obj={};obj.currentTarget=elem;this.setIdArray(obj)}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}this.urlState.ids.length=0;this.idList.length=0;this.toggleSubmitButtonState();this.toggleDeselectAllContentLink()}},{key:'tagInputBehavior',value:function tagInputBehavior(){this.tagInputField.addEventListener('focus',this.toggleSubmitButtonState.bind(this),false);this.tagInputField.addEventListener('blur',this.toggleSubmitButtonState.bind(this),false)}},{key:'toggleSubmitButtonState',value:function toggleSubmitButtonState(evt){var inputHasFocus=evt!==undefined&&evt.type==='focus'&&evt.currentTarget===this.tagInputField?true:false;if(this.mode==='ADD_TAG'&&(this.isTagSet(this.tagList)&&this.isContentSelected()||inputHasFocus||!this.isInputEmpty(this.tagInputField))){this.enableSubmitButton()}else if(this.mode==='REMOVE_TAG'&&this.isTagSet(this.tagList)&&this.isContentSelected()){this.enableSubmitButton()}else if(this.mode==='RENAME_TAG'&&this.isTagSet(this.tagList)&&(inputHasFocus||!this.isInputEmpty(this.tagInputField))){this.enableSubmitButton()}else if(this.mode==='DELETE_TAG'&&this.isTagSet(this.tagList)){this.enableSubmitButton()}else{this.disableSubmitButton()}}},{key:'enableSubmitButton',value:function enableSubmitButton(){this.submitListenerActive=true;if(this.dtsSubmitTags.classList.contains(DISABLED_TAG_CLASS_NAME)){this.dtsSubmitTags.classList.remove(DISABLED_TAG_CLASS_NAME)}if(this.keyupEvtSet===false){window.addEventListener('keyup',this.submitOnEnterKey.bind(this));this.keyupEvtSet=true}this.dtsSubmitTags.addEventListener('click',this.submitHandler,false)}},{key:'disableSubmitButton',value:function disableSubmitButton(){if(!this.dtsSubmitTags.classList.contains(DISABLED_TAG_CLASS_NAME)){this.dtsSubmitTags.classList.add(DISABLED_TAG_CLASS_NAME)}if(this.submitListenerActive){window.removeEventListener('keyup',this.submitOnEnterKey.bind(this));this.dtsSubmitTags.removeEventListener('click',this.submitHandler,false)}this.submitListenerActive=false}},{key:'entityEscapeForMarkup',value:function entityEscapeForMarkup(source){if(source==null||source===undefined){return source}var result=source;result=result.replace('&','&amp;');result=result.replace('<','&lt;');result=result.replace('>','&gt;');result=result.replace('\'','&apos;');result=result.replace('"','&quot;');return result}},{key:'submitTags',value:function submitTags(){var tagListTags=void 0;var editTagURL=this.tagEditURL;var editTagURLSplit=editTagURL.split(this.replaceChar);var idString=this.idList.join();if(this.mode==='RENAME_TAG'){if(!this.isInputEmpty(this.tagInputField)&&this.isTagInputValid(this.setInputArray(this.tagInputField),this.tagInputErrorWrapper,this.tagInputField)){var inputTags=this.setInputArray(this.tagInputField).join();tagListTags=this.getCleanString(this.tagList);editTagURL=editTagURLSplit[0]+encodeURIComponent(tagListTags)+editTagURLSplit[1]+encodeURIComponent(inputTags)+editTagURLSplit[2];this.dtsConfirmRenameTagModal=new app.DtsModal(null,{template:{name:'confirmRenameTag',data:{tagNameFrom:this.entityEscapeForMarkup(this.tagList[0]),tagNameTo:this.entityEscapeForMarkup(this.tagInputField.value)}},deferTillOpen:true,confirmation:{cookieNameHideConfirmation:'hideRenameTagConfirmation',callbackOK:function callbackOK(){location.href=editTagURL}}});this.dtsConfirmRenameTagModal.open()}return}if(this.mode==='DELETE_TAG'){tagListTags=this.getCleanString(this.tagList);editTagURL=editTagURLSplit[0]+encodeURIComponent(tagListTags)+editTagURLSplit[1];this.dtsConfirmDeleteTagModal=new app.DtsModal(null,{template:{name:'confirmDeleteTag',data:{tagName:this.entityEscapeForMarkup(this.tagList.join(', #'))}},deferTillOpen:true,confirmation:{cookieNameHideConfirmation:'hideDeleteTagConfirmation',callbackOK:function callbackOK(){location.href=editTagURL}}});this.dtsConfirmDeleteTagModal.open()}if(this.mode==='REMOVE_TAG'){tagListTags=this.getCleanString(this.tagList);editTagURL=editTagURLSplit[0]+encodeURIComponent(tagListTags)+editTagURLSplit[1]+idString+editTagURLSplit[2];location.href=editTagURL;return}if(this.mode==='ADD_TAG'){if(!this.isInputEmpty(this.tagInputField)||this.isTagSet(this.tagList)&&idString.length>0){var tagInputArray=this.setInputArray(this.tagInputField);if(this.isTagInputValid(tagInputArray,this.tagInputErrorWrapper,this.tagInputField)){var combinedTags=[].concat((0,_toConsumableArray3.default)(tagInputArray),(0,_toConsumableArray3.default)(this.tagList));editTagURL=editTagURLSplit[0]+encodeURIComponent(combinedTags.join())+editTagURLSplit[1]+idString+editTagURLSplit[2];location.href=editTagURL}}}}},{key:'setFilterArray',value:function setFilterArray(evt){var node=evt.type==='click'?evt.currentTarget:evt;var tag=this.cleanTagValue(node);if(this.tagFilters!=='null'&&this.tagFilters!==''&&this.tagFilters.indexOf(DELIMITER)==-1&&!node.classList.contains('selected')){helpers.addToArray(this.filterList,this.tagFilters)}if(this.tagFilters!=='null'&&this.tagFilters.indexOf(DELIMITER)>0){this.filterList=this.tagFilters.split(DELIMITER)}if(node.classList.contains('selected')){this.filterList=helpers.removeFromArray(this.filterList,tag)}else{helpers.addToArray(this.filterList,tag)}this.submitFilter(this.filterList)}},{key:'noContentFilter',value:function noContentFilter(evt){var _this6=this;this.setFilterTags.forEach(function(n){if(n.innerHTML==evt.currentTarget.innerHTML){_this6.setFilterArray(n)}})}},{key:'submitFilter',value:function submitFilter(filterArray){var filterTagURL=this.filterTagURL;var filterList=filterArray;filterTagURL=filterTagURL.split(this.replaceChar);if(filterList.length===0){filterTagURL=filterTagURL[0].split('&');filterTagURL=filterTagURL[0]}else{filterList=encodeURIComponent(filterList.join());var splitURL=filterTagURL[0].split('?');var path=splitURL[0].split('/');path.pop();path.push('1');splitURL[0]=path.join('/').trim();filterTagURL[0]=splitURL.join('?').trim();filterTagURL=filterTagURL[0]+filterList+filterTagURL[1]+this.idList}location.href=filterTagURL}},{key:'selectUniqueContent',value:function selectUniqueContent(){var searchParamValue=this.getSearchParam(this.params,this.contentTypeParam);if(searchParamValue){this.clickElement(searchParamValue);this.uniqueContentEdit=true}}},{key:'toggleTagVisibility',value:function toggleTagVisibility(){if(this.myTagListParent.scrollHeight>this.myTagListParent.offsetHeight&&!this.myTagListParent.classList.contains('dts-show-tags')){this.myTagListParent.classList.add('dts-show-tags');this.dtsShowAllTagsIcon.classList.remove('dts-show-more-tags');this.dtsShowAllTagsIcon.classList.add('dts-show-less-tags')}else{this.myTagListParent.classList.remove('dts-show-tags');this.dtsShowAllTagsIcon.classList.remove('dts-show-less-tags');this.dtsShowAllTagsIcon.classList.add('dts-show-more-tags')}}},{key:'showAllTagsIcon',value:function showAllTagsIcon(){if(this.myTagListParent.scrollHeight>this.initialTagRowHeight){this.dtsShowAllTagsIcon.style.display='flex';if(!this.toggleTagVisibilitySet){this.dtsShowAllTagsIcon.addEventListener('click',this.toggleTagVisibility.bind(this),false)}if(this.contentCount==0&&!this.toggleTagVisibilitySet){this.toggleTagVisibility()}this.toggleTagVisibilitySet=true}else{if(this.dtsShowAllTagsIcon.style.display==='flex'){this.dtsShowAllTagsIcon.style.display='none'}}}},{key:'isTagInputValid',value:function isTagInputValid(tagInputArray,errorWrapper,inputField){if(tagInputArray.length===0){return true}var inputError=[];if(this.mode==='RENAME_TAG'&&tagInputArray.length>1){inputError.push({errorType:'MULTIPLE_TAGS',tagName:null})}tagInputArray.forEach(function(tag){if(tag.indexOf(EXCLUDED_CHARACTERS)!==-1){inputError.push({errorType:'ILLEGAL_CHARACTER',tagName:tag})}if(tag.length>MAX_CHARACTERS){inputError.push({errorType:'TAG_TOO_LONG',tagName:tag})}});if(inputError.length===0){return true}else{this.tagInputErrorHandling(inputError,errorWrapper,inputField);return false}}},{key:'tagInputErrorHandling',value:function tagInputErrorHandling(errorArray,errorWrapper,inputField){var _this7=this;errorWrapper.innerHTML='';var mode=this.mode==='RENAME_TAG';var modeType=mode?'rename':'add';var tagtext=mode?'tag':'tag(s)';errorArray.forEach(function(error){var errorMessageNode=document.createElement('DIV');errorMessageNode.classList.add('dts-tag-input-error');if(error.errorType==='ILLEGAL_CHARACTER'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">The tag named, '+error.tagName+', contains an illegal character, '+EXCLUDED_CHARACTERS+'. Remove this character and '+modeType+' your '+tagtext+' again.</span>'}if(error.errorType==='TAG_TOO_LONG'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">The tag named, '+error.tagName+', contains more than '+MAX_CHARACTERS+' characters. Shorten this tag name and '+modeType+' your '+tagtext+' again.</span>'}if(error.errorType==='MULTIPLE_TAGS'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">The input field contains more than one tag. Please remove the coma, or delete a tag or tags from the input field.</span>'}if(error.errorType==='BANNED_WORDS'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">'+error.message+'</span>'}if(error.errorType==='TOO_MANY_ITEM_TAGS'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">'+error.message+' Remove an existing tag to add a new tag.</span>'}if(error.errorType==='TOO_MANY_USER_TAGS'){errorMessageNode.innerHTML='<span class="dts-error-pointer"></span><span class="dts-error-mark"></span><span class="dts-error-message">'+error.message+' Delete an existing tag to add a new tag.</span>'}errorWrapper.appendChild(errorMessageNode)});var errorPointerList=document.querySelectorAll(ERROR_POINTER_CLASS);var tagInputRect=inputField.getBoundingClientRect();if(!this.isTaggingModal){var mql=window.matchMedia('(min-width: 680px)');errorWrapper.style.marginLeft=0;if(mql.matches&&!this.isTaggingModal){errorWrapper.style.marginLeft=tagInputRect.left-OFFSET_MAGIC_NUMBER+'px';var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=(0,_getIterator3.default)(errorPointerList),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var elem=_step6.value;elem.style.marginLeft='20px'}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}}else{var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=(0,_getIterator3.default)(errorPointerList),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var _elem=_step7.value;_elem.style.marginLeft=tagInputRect.left+'px'}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}}}else{var pointer=errorWrapper.querySelector(ERROR_POINTER_CLASS);errorWrapper.style.top=errorWrapper.parentNode.offsetHeight-8+'px';errorWrapper.style.maxWidth=errorWrapper.parentNode.offsetWidth+'px';if(inputField.parentNode.offsetLeft<16){pointer.style.marginLeft='16px'}else{pointer.style.marginLeft=inputField.parentNode.offsetLeft+'px'}this.eventHandler=function(){_this7.tagInputErrorCleanUp(errorWrapper,inputField)};inputField.addEventListener('focus',this.eventHandler,false)}errorWrapper.classList.add(ERROR_VISIBLE_CLASS)}},{key:'tagInputErrorCleanUp',value:function tagInputErrorCleanUp(errorWrapper,inputField){errorWrapper.classList.remove('dts-tag-input-error-visible');errorWrapper.removeAttribute('style');inputField.removeEventListener('focus',this.eventHandler,false);this.eventHandler=null}},{key:'orderTags',value:function orderTags(parentNode,node){parentNode.appendChild(node);[].concat((0,_toConsumableArray3.default)(parentNode.children)).sort(function(a,b){return a.innerText>b.innerText?1:-1}).map(function(node){return parentNode.appendChild(node)})}},{key:'getSearchParam',value:function getSearchParam(search,param){var query=new URLSearchParams(search);var returnVal=null;if(query.has(param)){returnVal=query.get(param)}return returnVal}},{key:'clickElement',value:function clickElement(contentId){if(contentId!==null){var elem=document.getElementById('dtsEdit-'+contentId);if(elem){elem.click()}};}},{key:'cleanTagValue',value:function cleanTagValue(entity){var tag=typeof entity==='string'?entity:entity.textContent;tag=tag.trim();var hasHash=tag.indexOf('#');while(hasHash!==-1&&hasHash===0){tag=tag.slice(1).trim();hasHash=tag.indexOf('#')}return tag.trim()}},{key:'getCleanString',value:function getCleanString(arr){var _this8=this;return arr.map(function(tag){return _this8.cleanTagValue(tag)}).filter(function(tag){return tag.length>0}).join()}},{key:'setInputArray',value:function setInputArray(input){var inputString=input.value;inputString=this.getCleanString(inputString.split(DELIMITER));return this.isInputEmpty(input)?[]:inputString.split(DELIMITER)}},{key:'isInputEmpty',value:function isInputEmpty(input){var fieldLength=input.value.replace(/\s/g,'').length;return fieldLength===0?true:false}},{key:'isContentSelected',value:function isContentSelected(){return this.idList.length>0}},{key:'isTagSet',value:function isTagSet(array){return array.length>0}},{key:'submitOnEnterKey',value:function submitOnEnterKey(evt){if(event.keyCode===13&&this.autocomplete_flag===false){this.dtsSubmitTags.click()}else{this.autocomplete_flag=false}}},{key:'toggleTagInteractivity',value:function toggleTagInteractivity(state,listener){var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=(0,_getIterator3.default)(this.dtsMyTagList.children),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var node=_step8.value;if(state===true){node.classList.add(DISABLED_TAG_CLASS_NAME);node.removeEventListener('click',listener,false)}else{node.classList.remove(DISABLED_TAG_CLASS_NAME);node.addEventListener('click',listener,false)}}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}};}},{key:'updateAutoCompleteList',value:function updateAutoCompleteList(addToList,tag){if(addToList){helpers.addToArray(this.autocomplete_instance.array,tag);if(this.mode==='RENAME_TAG'){this.autocomplete_instance.stopAutoComplete=false}}else{this.autocomplete_instance.array=helpers.removeFromArray(this.autocomplete_instance.array,tag);if(this.mode==='RENAME_TAG'){this.autocomplete_instance.stopAutoComplete=true}}this.autocomplete_instance.array.sort()}}]);return TagManagement}();module.exports={TagManagement:TagManagement};

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(56);
__webpack_require__(26);
__webpack_require__(36);
__webpack_require__(188);
__webpack_require__(194);
__webpack_require__(197);
__webpack_require__(199);
module.exports = __webpack_require__(2).Set;


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(189);
var validate = __webpack_require__(89);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(190)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(7).f;
var create = __webpack_require__(34);
var redefineAll = __webpack_require__(64);
var ctx = __webpack_require__(11);
var anInstance = __webpack_require__(61);
var forOf = __webpack_require__(31);
var $iterDefine = __webpack_require__(48);
var step = __webpack_require__(71);
var setSpecies = __webpack_require__(84);
var DESCRIPTORS = __webpack_require__(9);
var fastKey = __webpack_require__(52).fastKey;
var validate = __webpack_require__(89);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(4);
var $export = __webpack_require__(5);
var meta = __webpack_require__(52);
var fails = __webpack_require__(16);
var hide = __webpack_require__(13);
var redefineAll = __webpack_require__(64);
var forOf = __webpack_require__(31);
var anInstance = __webpack_require__(61);
var isObject = __webpack_require__(8);
var setToStringTag = __webpack_require__(30);
var dP = __webpack_require__(7).f;
var each = __webpack_require__(191)(0);
var DESCRIPTORS = __webpack_require__(9);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(11);
var IObject = __webpack_require__(49);
var toObject = __webpack_require__(14);
var toLength = __webpack_require__(35);
var asc = __webpack_require__(192);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(193);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(8);
var isArray = __webpack_require__(72);
var SPECIES = __webpack_require__(6)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(5);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(195)('Set') });


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(60);
var from = __webpack_require__(196);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(31);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(198)('Set');


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(5);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(200)('Set');


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(5);
var aFunction = __webpack_require__(23);
var ctx = __webpack_require__(11);
var forOf = __webpack_require__(31);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _dtsModal=__webpack_require__(20);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DtsErrorModal=function(_DtsModal){(0,_inherits3.default)(DtsErrorModal,_DtsModal);function DtsErrorModal(){(0,_classCallCheck3.default)(this,DtsErrorModal);return(0,_possibleConstructorReturn3.default)(this,(DtsErrorModal.__proto__||(0,_getPrototypeOf2.default)(DtsErrorModal)).call(this,null,{html:'<section id="dtsErrorContent" class="dts-tag-modal" style="align-self: auto; display: block;">\n            <div class="dts-error-modal-content-wrapper">\n                <p id="dtsErrorModalMessage">A server error occurred.</p>\n                <button id="dtsErrorMsgClose" class="dts-link-button" type="button">Refresh Page</button>\n            </div>\n            </section>',disableDefaultCloser:true,disableTouchshieldClose:true,postProcess:function postProcess(){var btnRefresh=document.getElementById('dtsErrorMsgClose');btnRefresh.addEventListener('click',function(){location.reload()},false)}}))}return DtsErrorModal}(_dtsModal.DtsModal);module.exports={DtsErrorModal:DtsErrorModal};

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _dtsModal=__webpack_require__(20);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DtsSceneModal=function(_DtsModal){(0,_inherits3.default)(DtsSceneModal,_DtsModal);function DtsSceneModal(scene,isLoggedIn,previewParams){(0,_classCallCheck3.default)(this,DtsSceneModal);return(0,_possibleConstructorReturn3.default)(this,(DtsSceneModal.__proto__||(0,_getPrototypeOf2.default)(DtsSceneModal)).call(this,scene.resultId+'Chevron',{ajax:{url:scene.urlModalScene,callbackSuccess:function callbackSuccess(response){return response}},deferTillOpen:true,removeDefaultContentStyles:true,verbose:false,data:previewParams,postProcess:function postProcess(){var queueContainers=this.modalContentWrapper.querySelectorAll('.dts-queue-control-container');for(var i=0;i<queueContainers.length;++i){app.dts.common.Queue_Control.initQueue(queueContainers[i]);new app.utility.MobilePanningIcon(queueContainers[i].id)}var scenePurchase=new app.ScenePurchase(scene.id,isLoggedIn,scene.isActiveDownload);if(location.pathname.indexOf('/member/favorites/scenes')!=-1||!isLoggedIn){var iconFavorite=this.modalContentWrapper.querySelector('#dtsFavorite-'+scene.id);if(iconFavorite){iconFavorite.href=scene.urlLoginFavoriteScene}}else{new app.utility.UpdateMemberList('favorites',scene,'dtsFavorite-'+scene.id)}if(location.pathname.indexOf('/member/watch-later/scenes')!=-1){var iconWatchLater=this.modalContentWrapper.querySelector('#dtsWatchLater-'+scene.id);if(iconWatchLater){iconWatchLater.href=scene.urlLoginWatchLaterScene}}else{new app.utility.UpdateMemberList('watch-later',scene,'dtsWatchLater-'+scene.id)}var elPreviewButton=this.modalContent.querySelector('.dts-button-play.preview.large');var d=this.options.data;elPreviewButton.addEventListener('click',function(){app.delivery.playVideo(d[0],d[1],d[2],d[3],d[4],d[5],d[6],d[7],d[8],d[9],d[10],d[11],d[12],d[13],d[14],d[15],d[16],d[17])},false);new app.utility.SceneStripScroller(scene.id)}}))}return DtsSceneModal}(_dtsModal.DtsModal);module.exports={DtsSceneModal:DtsSceneModal};

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _set=__webpack_require__(88);var _set2=_interopRequireDefault(_set);var _toConsumableArray2=__webpack_require__(90);var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _from=__webpack_require__(38);var _from2=_interopRequireDefault(_from);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _helpers=__webpack_require__(32);var helpers=_interopRequireWildcard(_helpers);var _autoComplete=__webpack_require__(91);var autoComplete=_interopRequireWildcard(_autoComplete);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var TagModalManager=function(){function TagModalManager(modalInstance){(0,_classCallCheck3.default)(this,TagModalManager);this.modal=modalInstance;this.templateData=modalInstance.options.template.data;this.tagManagement=modalInstance.options.template.data.tagManagementInstance;this.autocomplete_instance=null;this.contentTags=[];this.selectedTagList=[];this.tagInputArray=[];this.contentTagsWrapper=this.modal.modalContent.querySelector('.dts-tag-modal-content-tags');this.addTagWrapper=this.modal.modalContent.querySelector('.dts-tag-modal-add');this.noContentTagsNode=this.modal.modalContent.querySelector('.dts-tag-modal-no-content-tags');this.selectedTagsWrapper=document.getElementById('dtsTagModalSelectedTags-'+this.templateData.id);this.addTagInput=document.getElementById('dtsTagModalInput-'+this.templateData.id);this.addTagButton=document.getElementById('dtsTagModalAddButton-'+this.templateData.id);this.errorWrapper=document.getElementById('dtsTagModalErrorWrapper-'+this.templateData.id);this.closeModalAlt=document.getElementById('dtsTagModalCloseALt-'+this.templateData.id);this.autocomplete_flag=false;this.forceRefresh=false;this.init()}(0,_createClass3.default)(TagModalManager,[{key:'init',value:function init(){var _this=this;var urlArray=this.tagManagement.getOwnTagsURL.split(this.tagManagement.replaceInt);var url=urlArray[0]+this.templateData.id;this.tagManagement.dtsAsyncWaitingModal.open();app.dts.common.xhr.get(url,true,function(status,result){if(status!==200){location.reload()}else{_this.tagManagement.dtsAsyncWaitingModal.close();if(result.length>0){_this.noContentTagsNode.style.display='none';_this.setContentTags(result)}_this.setUpAutoComplete();_this.setAddTagListeners();_this.tagManagement.isTaggingModal=true}},function(error){_this.tagManagement.dtsAsyncWaitingModal.close();_this.tagManagement.mdlError.open();_this.notifyGAofAsyncError(error,url)});if(helpers.isIE11()){var tagModule=(0,_from2.default)(document.querySelectorAll('.dts-tagging-modal'));tagModule.forEach(function(node){node.classList.add('dts-tag-IE-helper')})}}},{key:'getTagString',value:function getTagString(){var _this2=this;var stringOfAllTags=this.tagManagement.allTags;var tempArr=stringOfAllTags.split(',');var cleanedTempArr=tempArr.filter(function(member){return _this2.contentTags.indexOf(member)<0});return cleanedTempArr.join(',')}},{key:'setUpAutoComplete',value:function setUpAutoComplete(){var _this3=this;this.autocomplete_instance=new autoComplete.AutoComplete(this.addTagInput.id,this.getTagString(),{callback:this.addSelectedTag.bind(this)});this.autocomplete_instance.isModal=true;this.modal.elTrigger.addEventListener('click',function(){var filteredAllTags=_this3.getTagString().split(',');if(!helpers.areArraysEqual(filteredAllTags,_this3.autocomplete_instance.array)){_this3.autocomplete_instance.array=filteredAllTags}})}},{key:'setContentTags',value:function setContentTags(tags){var _this4=this;if(tags.length>0){tags.forEach(function(tag){var tagNode=_this4.buildTagMarkup(tag,'remove');tagNode.title=helpers.stringReplacement(tag,_this4.templateData.removeTitleAttr,'tag');tagNode.url=helpers.stringReplacement(encodeURIComponent(tag),_this4.templateData.modalRemoveTagURL,_this4.tagManagement.replaceChar);tagNode.addEventListener('click',function(){_this4.removeTagAction(event)},false);_this4.contentTagsWrapper.append(tagNode);_this4.contentTags.push(tag)})}}},{key:'removeTagAction',value:function removeTagAction(evt){var _this5=this;var tagNode=evt.currentTarget;var tagNodeUrl=evt.currentTarget.url;var tag=this.tagManagement.cleanTagValue(tagNode.querySelector('span').innerHTML);this.tagManagement.dtsAsyncWaitingModal.open();app.dts.common.xhr.get(tagNodeUrl,true,function(status,result){_this5.tagManagement.dtsAsyncWaitingModal.close();if(result.noUserRedirect===true||status!==200){location.reload()}else{_this5.contentTagsWrapper.removeChild(tagNode);_this5.contentTags=helpers.removeFromArray(_this5.contentTags,tag);if(_this5.contentTags.length===0){_this5.noContentTagsNode.removeAttribute('style')}_this5.autocomplete_instance.array.push(tag);_this5.autocomplete_instance.array.sort();_this5.updatePageState(tag.split(','),false)}},function(error){_this5.tagManagement.dtsAsyncWaitingModal.close();_this5.tagManagement.mdlError.open();_this5.notifyGAofAsyncError(error,tagNodeUrl)})}},{key:'setAddTagListeners',value:function setAddTagListeners(){var _this6=this;this.addTagButton.addEventListener('click',function(){_this6.stageTagsToBeAdded()},false);this.addTagInput.addEventListener('focus',function(){_this6.setAddTagButtonState(true)},false);this.addTagInput.addEventListener('blur',function(){_this6.setAddTagButtonState()},false);this.modal.touchshield.addEventListener('click',function(){_this6.resetAddTagUI(true)},false);this.modal.touchshield.addEventListener('keyup',function(){_this6.submitOnEnterKey(event)},false);this.modal.defaultCloser.addEventListener('click',function(){_this6.resetAddTagUI(true)},false);this.closeModalAlt.addEventListener('click',function(){_this6.resetAddTagUI(true)},false)}},{key:'stageTagsToBeAdded',value:function stageTagsToBeAdded(){var _this7=this;if(!this.tagManagement.isInputEmpty(this.addTagInput)||this.tagManagement.isTagSet(this.selectedTagList)){this.tagInputArray=this.tagManagement.setInputArray(this.addTagInput);if(this.tagManagement.isTaggingModal===false){this.tagManagement.isTaggingModal=true}if(this.tagManagement.isTagInputValid(this.tagInputArray,this.errorWrapper,this.addTagInput)){var combinedTags=[].concat((0,_toConsumableArray3.default)(this.tagInputArray),(0,_toConsumableArray3.default)(this.selectedTagList));combinedTags=[].concat((0,_toConsumableArray3.default)(new _set2.default(combinedTags)));combinedTags=combinedTags.filter(function(member){return!_this7.contentTags.includes(member)});var addTagURL=helpers.stringReplacement(encodeURIComponent(combinedTags.join()),this.templateData.modalAddTagURL,this.tagManagement.replaceChar);this.addTagAction(addTagURL)}}}},{key:'addTagAction',value:function addTagAction(url){var _this8=this;var addTagUrl=url;this.tagManagement.dtsAsyncWaitingModal.open();app.dts.common.xhr.get(addTagUrl,true,function(status,result){_this8.tagManagement.dtsAsyncWaitingModal.close();if(result.noUserRedirect===true){location.reload()}else{if(_this8.contentTags.length===0&&result.tagsAdded.length>0){_this8.noContentTagsNode.style.display='none'}_this8.setContentTags(result.tagsAdded);(0,_from2.default)(_this8.contentTagsWrapper.children).forEach(function(node){[].concat((0,_toConsumableArray3.default)(_this8.contentTagsWrapper.children)).sort(function(a,b){return a.innerText>b.innerText?1:-1}).map(function(node){return _this8.contentTagsWrapper.appendChild(node)})});_this8.updatePageState(result.tagsAdded,true);if(result.errors.length>0){_this8.handleServerNotificationErrors(result)}else{_this8.resetAddTagUI(false)}result.tagsAdded.forEach(function(member){_this8.autocomplete_instance.array=helpers.removeFromArray(_this8.autocomplete_instance.array,member)})}},function(error){_this8.tagManagement.dtsAsyncWaitingModal.close();_this8.tagManagement.mdlError.open();_this8.notifyGAofAsyncError(error,addTagUrl)})}},{key:'addSelectedTag',value:function addSelectedTag(tag){var _this9=this;this.autocomplete_flag=true;this.setAddTagButtonState(true);this.autocomplete_instance.closeAllLists();var tagNode=this.buildTagMarkup(tag,'add');tagNode.addEventListener('click',function(){_this9.removeSelectedTags(tagNode,tag)},false);this.selectedTagsWrapper.append(tagNode);this.selectedTagsWrapper.style.display='flex';this.selectedTagList.push(tag);this.autocomplete_instance.array=helpers.removeFromArray(this.autocomplete_instance.array,tag)}},{key:'removeSelectedTags',value:function removeSelectedTags(tagNode,tag){this.selectedTagList=helpers.removeFromArray(this.selectedTagList,tag);if(this.selectedTagList.length===0){this.selectedTagsWrapper.removeAttribute('style')}this.selectedTagsWrapper.removeChild(tagNode);this.setAddTagButtonState();this.autocomplete_instance.array.push(tag);this.autocomplete_instance.array.sort()}},{key:'resetSelectedTags',value:function resetSelectedTags(){var _this10=this;if(this.selectedTagList.length>0){this.selectedTagList.forEach(function(tag){_this10.autocomplete_instance.array.push(tag)});this.autocomplete_instance.array.sort();this.selectedTagList=[];this.selectedTagsWrapper.removeAttribute('style');this.selectedTagsWrapper.innerHTML='';this.setAddTagButtonState()}}},{key:'resetAddTagUI',value:function resetAddTagUI(closeModal){this.addTagInput.value='';this.tagInputArray=[];this.resetSelectedTags();this.autocomplete_instance.closeAllLists();if(this.errorWrapper.classList.contains('dts-tag-input-error-visible')){this.errorWrapper.removeAttribute('style');this.errorWrapper.classList.remove('dts-tag-input-error-visible')}if(closeModal){this.tagManagement.isTaggingModal=false;if(this.forceRefresh){location.reload()}}}},{key:'updatePageState',value:function updatePageState(tags,isAddTag){var _this11=this;if(isAddTag){var filteredTags=tags.filter(function(tag){return _this11.tagInputArray.includes(tag)});var allTags=this.tagManagement.allTags.split(',');var newTags=filteredTags.filter(function(tag){return!allTags.includes(tag)});if(newTags.length>0){newTags.forEach(function(tag){var filterTag=void 0;filterTag=document.createElement('a');filterTag.classList.add('dts-filter-tag','dts-link-button');filterTag.href='javascript:void(0)';filterTag.innerHTML='&num;'+tag;filterTag.addEventListener('click',_this11.tagManagement.setFilterArray.bind(_this11.tagManagement),false);_this11.tagManagement.dtsMyTagList.append(filterTag);[].concat((0,_toConsumableArray3.default)(_this11.tagManagement.dtsMyTagList.children)).sort(function(a,b){return a.innerText>b.innerText?1:-1}).map(function(node){return _this11.tagManagement.dtsMyTagList.appendChild(node)});[].concat((0,_toConsumableArray3.default)(_this11.tagManagement.dtsMyTagList.children)).sort(function(a,b){if(a.innerText===b.innerText){_this11.tagManagement.dtsMyTagList.removeChild(b)}});if(_this11.tagManagement.tagFilters!=='null'){[].concat((0,_toConsumableArray3.default)(_this11.tagManagement.dtsMyTagList.children)).sort(function(a,b){return a.classList.contains('selected')>b.classList.contains('selected')?-1:1}).map(function(node){return _this11.tagManagement.dtsMyTagList.appendChild(node)})}allTags.push(tag);_this11.tagManagement.allTags=allTags.join(',')})}if(this.forceRefresh===true){var tagFilters=this.tagManagement.tagFilters.split(',');var matchedTag=this.contentTags.filter(function(tag){return tagFilters.includes(tag)});if(matchedTag.length===tagFilters.length){this.forceRefresh=false}}}else{if(this.tagManagement.tagFilters!=='null'&&this.forceRefresh===false){var _tagFilters=this.tagManagement.tagFilters.split(',');var _matchedTag=tags.filter(function(tag){return _tagFilters.includes(tag)});if(_matchedTag.length>0){this.forceRefresh=true}}}}},{key:'handleServerNotificationErrors',value:function handleServerNotificationErrors(result){var errors=result.errors;this.resetSelectedTags();this.tagManagement.tagInputErrorHandling(errors,this.errorWrapper,this.addTagInput);if(result.bannedWords.length>0){result.bannedWords.forEach(function(tag){dataLayer.push({'event':'trackEvent','eventCategory':'Banned Words','eventAction':'Tagging','eventLabel':tag,'eventValue':undefined,'nonInteraction':undefined})})}}},{key:'setAddTagButtonState',value:function setAddTagButtonState(makeActive){if(makeActive){if(this.addTagButton.classList.contains('disabled')){this.addTagButton.classList.remove('disabled')}}else{var inputValueEmpty=this.tagManagement.isInputEmpty(this.addTagInput);if(this.selectedTagList.length===0&&inputValueEmpty){this.addTagButton.classList.add('disabled')}}}},{key:'notifyGAofAsyncError',value:function notifyGAofAsyncError(error,url){dataLayer.push({'event':'trackEvent','eventCategory':'AJAX Response Errors','eventAction':'Modal Tagging','eventLabel':error.status+' | '+url,'eventValue':undefined,'nonInteraction':true})}},{key:'submitOnEnterKey',value:function submitOnEnterKey(evt){if(evt.keyCode===13&&this.autocomplete_flag===false&&!this.addTagButton.classList.contains('disabled')){this.addTagButton.click()}else{this.autocomplete_flag=false}}},{key:'buildTagMarkup',value:function buildTagMarkup(tag,type){var icon=document.createElement('i');icon.classList.add('dts-icon-close');var span=document.createElement('span');span.innerText='#'+tag;var tagNode=document.createElement('a');tagNode.href='javascript:void(0)';tagNode.classList.add('dts-link-button','dts-tag-node');if(type==='remove'){tagNode.classList.add('dts-tag-modal-owned')}else{tagNode.classList.add('dts-tag-modal-add-tag')}tagNode.append(span);tagNode.append(icon);return tagNode}}]);return TagModalManager}();module.exports={TagModalManager:TagModalManager};

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _typeof2=__webpack_require__(25);var _typeof3=_interopRequireDefault(_typeof2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}(function(root,factory){module.exports={PhotoSwipe:factory()}})(undefined,function(){'use strict';var PhotoSwipe=function PhotoSwipe(template,UiClass,items,options){UiClass=app.PhotoSwipeUI_Default;var framework={features:null,bind:function bind(target,type,listener,unbind){var methodName=(unbind?'remove':'add')+'EventListener';type=type.split(' ');for(var i=0;i<type.length;i++){if(type[i]){target[methodName](type[i],listener,false)}}},isArray:function isArray(obj){return obj instanceof Array},createEl:function createEl(classes,tag){var el=document.createElement(tag||'div');if(classes){el.className=classes}return el},getScrollY:function getScrollY(){var yOffset=window.pageYOffset;return yOffset!==undefined?yOffset:document.documentElement.scrollTop},unbind:function unbind(target,type,listener){framework.bind(target,type,listener,true)},removeClass:function removeClass(el,className){var reg=new RegExp('(\\s|^)'+className+'(\\s|$)');el.className=el.className.replace(reg,' ').replace(/^\s\s*/,'').replace(/\s\s*$/,'')},addClass:function addClass(el,className){if(!framework.hasClass(el,className)){el.className+=(el.className?' ':'')+className}},hasClass:function hasClass(el,className){return el.className&&new RegExp('(^|\\s)'+className+'(\\s|$)').test(el.className)},getChildByClass:function getChildByClass(parentEl,childClassName){var node=parentEl.firstChild;while(node){if(framework.hasClass(node,childClassName)){return node}node=node.nextSibling}},arraySearch:function arraySearch(array,value,key){var i=array.length;while(i--){if(array[i][key]===value){return i}}return-1},extend:function extend(o1,o2,preventOverwrite){for(var prop in o2){if(o2.hasOwnProperty(prop)){if(preventOverwrite&&o1.hasOwnProperty(prop)){continue}o1[prop]=o2[prop]}}},easing:{sine:{out:function out(k){return Math.sin(k*(Math.PI/2))},inOut:function inOut(k){return-(Math.cos(Math.PI*k)-1)/2}},cubic:{out:function out(k){return--k*k*k+1}}},detectFeatures:function detectFeatures(){if(framework.features){return framework.features}var helperEl=framework.createEl(),helperStyle=helperEl.style,vendor='',features={};features.oldIE=document.all&&!document.addEventListener;features.touch='ontouchstart'in window;if(window.requestAnimationFrame){features.raf=window.requestAnimationFrame;features.caf=window.cancelAnimationFrame}features.pointerEvent=!!window.PointerEvent||navigator.msPointerEnabled;if(!features.pointerEvent){var ua=navigator.userAgent;if(/iP(hone|od)/.test(navigator.platform)){var v=navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);if(v&&v.length>0){v=parseInt(v[1],10);if(v>=1&&v<8){features.isOldIOSPhone=true}}}var match=ua.match(/Android\s([0-9\.]*)/);var androidversion=match?match[1]:0;androidversion=parseFloat(androidversion);if(androidversion>=1){if(androidversion<4.4){features.isOldAndroid=true}features.androidVersion=androidversion}features.isMobileOpera=/opera mini|opera mobi/i.test(ua)}var styleChecks=['transform','perspective','animationName'],vendors=['','webkit','Moz','ms','O'],styleCheckItem,styleName;for(var i=0;i<4;i++){vendor=vendors[i];for(var a=0;a<3;a++){styleCheckItem=styleChecks[a];styleName=vendor+(vendor?styleCheckItem.charAt(0).toUpperCase()+styleCheckItem.slice(1):styleCheckItem);if(!features[styleCheckItem]&&styleName in helperStyle){features[styleCheckItem]=styleName}}if(vendor&&!features.raf){vendor=vendor.toLowerCase();features.raf=window[vendor+'RequestAnimationFrame'];if(features.raf){features.caf=window[vendor+'CancelAnimationFrame']||window[vendor+'CancelRequestAnimationFrame']}}}if(!features.raf){var lastTime=0;features.raf=function(fn){var currTime=new Date().getTime();var timeToCall=Math.max(0,16-(currTime-lastTime));var id=window.setTimeout(function(){fn(currTime+timeToCall)},timeToCall);lastTime=currTime+timeToCall;return id};features.caf=function(id){clearTimeout(id)}}features.svg=!!document.createElementNS&&!!document.createElementNS('http://www.w3.org/2000/svg','svg').createSVGRect;framework.features=features;return features}};framework.detectFeatures();if(framework.features.oldIE){framework.bind=function(target,type,listener,unbind){type=type.split(' ');var methodName=(unbind?'detach':'attach')+'Event',evName,_handleEv=function _handleEv(){listener.handleEvent.call(listener)};for(var i=0;i<type.length;i++){evName=type[i];if(evName){if((typeof listener==='undefined'?'undefined':(0,_typeof3.default)(listener))==='object'&&listener.handleEvent){if(!unbind){listener['oldIE'+evName]=_handleEv}else{if(!listener['oldIE'+evName]){return false}}target[methodName]('on'+evName,listener['oldIE'+evName])}else{target[methodName]('on'+evName,listener)}}}}}var self=this;var DOUBLE_TAP_RADIUS=25,NUM_HOLDERS=3;var _options={allowPanToNext:true,spacing:0.12,bgOpacity:1,mouseUsed:false,loop:true,pinchToClose:true,closeOnScroll:true,closeOnVerticalDrag:true,verticalDragRange:0.75,hideAnimationDuration:333,showAnimationDuration:333,showHideOpacity:false,focus:true,escKey:true,arrowKeys:true,mainScrollEndFriction:0.35,panEndFriction:0.35,isClickableElement:function isClickableElement(el){return el.tagName==='A'},getDoubleTapZoom:function getDoubleTapZoom(isMouseClick,item){if(isMouseClick){return 1}else{return item.initialZoomLevel<0.7?1:1.33}},maxSpreadZoom:1.33,modal:true,scaleMode:'fit'};framework.extend(_options,options);var _getEmptyPoint=function _getEmptyPoint(){return{x:0,y:0}};var _isOpen,_isDestroying,_closedByScroll,_currentItemIndex,_containerStyle,_containerShiftIndex,_currPanDist=_getEmptyPoint(),_startPanOffset=_getEmptyPoint(),_panOffset=_getEmptyPoint(),_upMoveEvents,_downEvents,_globalEventHandlers,_viewportSize={},_currZoomLevel,_startZoomLevel,_translatePrefix,_translateSufix,_updateSizeInterval,_itemsNeedUpdate,_currPositionIndex=0,_offset={},_slideSize=_getEmptyPoint(),_itemHolders,_prevItemIndex,_indexDiff=0,_dragStartEvent,_dragMoveEvent,_dragEndEvent,_dragCancelEvent,_transformKey,_pointerEventEnabled,_isFixedPosition=true,_likelyTouchDevice,_modules=[],_requestAF,_cancelAF,_initalClassName,_initalWindowScrollY,_oldIE,_currentWindowScrollY,_features,_windowVisibleSize={},_renderMaxResolution=false,_orientationChangeTimeout,_registerModule=function _registerModule(name,module){framework.extend(self,module.publicMethods);_modules.push(name)},_getLoopedId=function _getLoopedId(index){var numSlides=_getNumItems();if(index>numSlides-1){return index-numSlides}else if(index<0){return numSlides+index}return index},_listeners={},_listen=function _listen(name,fn){if(!_listeners[name]){_listeners[name]=[]}return _listeners[name].push(fn)},_shout=function _shout(name){var listeners=_listeners[name];if(listeners){var args=Array.prototype.slice.call(arguments);args.shift();for(var i=0;i<listeners.length;i++){listeners[i].apply(self,args)}}},_getCurrentTime=function _getCurrentTime(){return new Date().getTime()},_applyBgOpacity=function _applyBgOpacity(opacity){_bgOpacity=opacity;self.bg.style.opacity=opacity*_options.bgOpacity},_applyZoomTransform=function _applyZoomTransform(styleObj,x,y,zoom,item){if(!_renderMaxResolution||item&&item!==self.currItem){zoom=zoom/(item?item.fitRatio:self.currItem.fitRatio)}styleObj[_transformKey]=_translatePrefix+x+'px, '+y+'px'+_translateSufix+' scale('+zoom+')'},_applyCurrentZoomPan=function _applyCurrentZoomPan(allowRenderResolution){if(_currZoomElementStyle){if(allowRenderResolution){if(_currZoomLevel>self.currItem.fitRatio){if(!_renderMaxResolution){_setImageSize(self.currItem,false,true);_renderMaxResolution=true}}else{if(_renderMaxResolution){_setImageSize(self.currItem);_renderMaxResolution=false}}}_applyZoomTransform(_currZoomElementStyle,_panOffset.x,_panOffset.y,_currZoomLevel)}},_applyZoomPanToItem=function _applyZoomPanToItem(item){if(item.container){_applyZoomTransform(item.container.style,item.initialPosition.x,item.initialPosition.y,item.initialZoomLevel,item)}},_setTranslateX=function _setTranslateX(x,elStyle){elStyle[_transformKey]=_translatePrefix+x+'px, 0px'+_translateSufix},_moveMainScroll=function _moveMainScroll(x,dragging){if(!_options.loop&&dragging){var newSlideIndexOffset=_currentItemIndex+(_slideSize.x*_currPositionIndex-x)/_slideSize.x,delta=Math.round(x-_mainScrollPos.x);if(newSlideIndexOffset<0&&delta>0||newSlideIndexOffset>=_getNumItems()-1&&delta<0){x=_mainScrollPos.x+delta*_options.mainScrollEndFriction}}_mainScrollPos.x=x;_setTranslateX(x,_containerStyle)},_calculatePanOffset=function _calculatePanOffset(axis,zoomLevel){var m=_midZoomPoint[axis]-_offset[axis];return _startPanOffset[axis]+_currPanDist[axis]+m-m*(zoomLevel/_startZoomLevel)},_equalizePoints=function _equalizePoints(p1,p2){p1.x=p2.x;p1.y=p2.y;if(p2.id){p1.id=p2.id}},_roundPoint=function _roundPoint(p){p.x=Math.round(p.x);p.y=Math.round(p.y)},_mouseMoveTimeout=null,_onFirstMouseMove=function _onFirstMouseMove(){if(_mouseMoveTimeout){framework.unbind(document,'mousemove',_onFirstMouseMove);framework.addClass(template,'pswp--has_mouse');_options.mouseUsed=true;_shout('mouseUsed')}_mouseMoveTimeout=setTimeout(function(){_mouseMoveTimeout=null},100)},_bindEvents=function _bindEvents(){framework.bind(document,'keydown',self);if(_features.transform){framework.bind(self.scrollWrap,'click',self)}if(!_options.mouseUsed){framework.bind(document,'mousemove',_onFirstMouseMove)}framework.bind(window,'resize scroll orientationchange',self);_shout('bindEvents')},_unbindEvents=function _unbindEvents(){framework.unbind(window,'resize scroll orientationchange',self);framework.unbind(window,'scroll',_globalEventHandlers.scroll);framework.unbind(document,'keydown',self);framework.unbind(document,'mousemove',_onFirstMouseMove);if(_features.transform){framework.unbind(self.scrollWrap,'click',self)}if(_isDragging){framework.unbind(window,_upMoveEvents,self)}clearTimeout(_orientationChangeTimeout);_shout('unbindEvents')},_calculatePanBounds=function _calculatePanBounds(zoomLevel,update){var bounds=_calculateItemSize(self.currItem,_viewportSize,zoomLevel);if(update){_currPanBounds=bounds}return bounds},_getMinZoomLevel=function _getMinZoomLevel(item){if(!item){item=self.currItem}return item.initialZoomLevel},_getMaxZoomLevel=function _getMaxZoomLevel(item){if(!item){item=self.currItem}return item.w>0?_options.maxSpreadZoom:1},_modifyDestPanOffset=function _modifyDestPanOffset(axis,destPanBounds,destPanOffset,destZoomLevel){if(destZoomLevel===self.currItem.initialZoomLevel){destPanOffset[axis]=self.currItem.initialPosition[axis];return true}else{destPanOffset[axis]=_calculatePanOffset(axis,destZoomLevel);if(destPanOffset[axis]>destPanBounds.min[axis]){destPanOffset[axis]=destPanBounds.min[axis];return true}else if(destPanOffset[axis]<destPanBounds.max[axis]){destPanOffset[axis]=destPanBounds.max[axis];return true}}return false},_setupTransforms=function _setupTransforms(){if(_transformKey){var allow3dTransform=_features.perspective&&!_likelyTouchDevice;_translatePrefix='translate'+(allow3dTransform?'3d(':'(');_translateSufix=_features.perspective?', 0px)':')';return}_transformKey='left';framework.addClass(template,'pswp--ie');_setTranslateX=function _setTranslateX(x,elStyle){elStyle.left=x+'px'};_applyZoomPanToItem=function _applyZoomPanToItem(item){var zoomRatio=item.fitRatio>1?1:item.fitRatio,s=item.container.style,w=zoomRatio*item.w,h=zoomRatio*item.h;s.width=w+'px';s.height=h+'px';s.left=item.initialPosition.x+'px';s.top=item.initialPosition.y+'px'};_applyCurrentZoomPan=function _applyCurrentZoomPan(){if(_currZoomElementStyle){var s=_currZoomElementStyle,item=self.currItem,zoomRatio=item.fitRatio>1?1:item.fitRatio,w=zoomRatio*item.w,h=zoomRatio*item.h;s.width=w+'px';s.height=h+'px';s.left=_panOffset.x+'px';s.top=_panOffset.y+'px'}}},_onKeyDown=function _onKeyDown(e){var keydownAction='';if(_options.escKey&&e.keyCode===27){keydownAction='close'}else if(_options.arrowKeys){if(e.keyCode===37){keydownAction='prev'}else if(e.keyCode===39){keydownAction='next'}}if(keydownAction){if(!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!e.metaKey){if(e.preventDefault){e.preventDefault()}else{e.returnValue=false}self[keydownAction]()}}},_onGlobalClick=function _onGlobalClick(e){if(!e){return}if(_moved||_zoomStarted||_mainScrollAnimating||_verticalDragInitiated){e.preventDefault();e.stopPropagation()}},_updatePageScrollOffset=function _updatePageScrollOffset(){self.setScrollOffset(0,framework.getScrollY())};var _animations={},_numAnimations=0,_stopAnimation=function _stopAnimation(name){if(_animations[name]){if(_animations[name].raf){_cancelAF(_animations[name].raf)}_numAnimations--;delete _animations[name]}},_registerStartAnimation=function _registerStartAnimation(name){if(_animations[name]){_stopAnimation(name)}if(!_animations[name]){_numAnimations++;_animations[name]={}}},_stopAllAnimations=function _stopAllAnimations(){for(var prop in _animations){if(_animations.hasOwnProperty(prop)){_stopAnimation(prop)}}},_animateProp=function _animateProp(name,b,endProp,d,easingFn,onUpdate,onComplete){var startAnimTime=_getCurrentTime(),t;_registerStartAnimation(name);var animloop=function animloop(){if(_animations[name]){t=_getCurrentTime()-startAnimTime;if(t>=d){_stopAnimation(name);onUpdate(endProp);if(onComplete){onComplete()}return}onUpdate((endProp-b)*easingFn(t/d)+b);_animations[name].raf=_requestAF(animloop)}};animloop()};var publicMethods={shout:_shout,listen:_listen,viewportSize:_viewportSize,options:_options,isMainScrollAnimating:function isMainScrollAnimating(){return _mainScrollAnimating},getZoomLevel:function getZoomLevel(){return _currZoomLevel},getCurrentIndex:function getCurrentIndex(){return _currentItemIndex},isDragging:function isDragging(){return _isDragging},isZooming:function isZooming(){return _isZooming},setScrollOffset:function setScrollOffset(x,y){_offset.x=x;_currentWindowScrollY=_offset.y=y;_shout('updateScrollOffset',_offset)},applyZoomPan:function applyZoomPan(zoomLevel,panX,panY,allowRenderResolution){_panOffset.x=panX;_panOffset.y=panY;_currZoomLevel=zoomLevel;_applyCurrentZoomPan(allowRenderResolution)},init:function init(){if(_isOpen||_isDestroying){return}var i;self.framework=framework;self.template=template;self.bg=framework.getChildByClass(template,'pswp__bg');_initalClassName=template.className;_isOpen=true;_features=framework.detectFeatures();_requestAF=_features.raf;_cancelAF=_features.caf;_transformKey=_features.transform;_oldIE=_features.oldIE;self.scrollWrap=framework.getChildByClass(template,'pswp__scroll-wrap');self.container=framework.getChildByClass(self.scrollWrap,'pswp__container');_containerStyle=self.container.style;self.itemHolders=_itemHolders=[{el:self.container.children[0],wrap:0,index:-1},{el:self.container.children[1],wrap:0,index:-1},{el:self.container.children[2],wrap:0,index:-1}];_itemHolders[0].el.style.display=_itemHolders[2].el.style.display='none';_setupTransforms();_globalEventHandlers={resize:self.updateSize,orientationchange:function orientationchange(){clearTimeout(_orientationChangeTimeout);_orientationChangeTimeout=setTimeout(function(){if(_viewportSize.x!==self.scrollWrap.clientWidth){self.updateSize()}},500)},scroll:_updatePageScrollOffset,keydown:_onKeyDown,click:_onGlobalClick};var oldPhone=_features.isOldIOSPhone||_features.isOldAndroid||_features.isMobileOpera;if(!_features.animationName||!_features.transform||oldPhone){_options.showAnimationDuration=_options.hideAnimationDuration=0}for(i=0;i<_modules.length;i++){self['init'+_modules[i]]()}if(UiClass){var ui=self.ui=new UiClass(self,framework);ui.init()}_shout('firstUpdate');_currentItemIndex=_currentItemIndex||_options.index||0;if(isNaN(_currentItemIndex)||_currentItemIndex<0||_currentItemIndex>=_getNumItems()){_currentItemIndex=0}self.currItem=_getItemAt(_currentItemIndex);if(_features.isOldIOSPhone||_features.isOldAndroid){_isFixedPosition=false}template.setAttribute('aria-hidden','false');if(_options.modal){if(!_isFixedPosition){template.style.position='absolute';template.style.top=framework.getScrollY()+'px'}else{template.style.position='fixed'}}if(_currentWindowScrollY===undefined){_shout('initialLayout');_currentWindowScrollY=_initalWindowScrollY=framework.getScrollY()}var rootClasses='pswp--open ';if(_options.mainClass){rootClasses+=_options.mainClass+' '}if(_options.showHideOpacity){rootClasses+='pswp--animate_opacity '}rootClasses+=_likelyTouchDevice?'pswp--touch':'pswp--notouch';rootClasses+=_features.animationName?' pswp--css_animation':'';rootClasses+=_features.svg?' pswp--svg':'';framework.addClass(template,rootClasses);self.updateSize();_containerShiftIndex=-1;_indexDiff=null;for(i=0;i<NUM_HOLDERS;i++){_setTranslateX((i+_containerShiftIndex)*_slideSize.x,_itemHolders[i].el.style)}if(!_oldIE){framework.bind(self.scrollWrap,_downEvents,self)}_listen('initialZoomInEnd',function(){self.setContent(_itemHolders[0],_currentItemIndex-1);self.setContent(_itemHolders[2],_currentItemIndex+1);_itemHolders[0].el.style.display=_itemHolders[2].el.style.display='block';if(_options.focus){template.focus()}_bindEvents()});self.setContent(_itemHolders[1],_currentItemIndex);self.updateCurrItem();_shout('afterInit');if(!_isFixedPosition){_updateSizeInterval=setInterval(function(){if(!_numAnimations&&!_isDragging&&!_isZooming&&_currZoomLevel===self.currItem.initialZoomLevel){self.updateSize()}},1000)}framework.addClass(template,'pswp--visible')},close:function close(){if(!_isOpen){return}_isOpen=false;_isDestroying=true;_shout('close');_unbindEvents();_showOrHide(self.currItem,null,true,self.destroy)},destroy:function destroy(){_shout('destroy');if(_showOrHideTimeout){clearTimeout(_showOrHideTimeout)}template.setAttribute('aria-hidden','true');template.className=_initalClassName;if(_updateSizeInterval){clearInterval(_updateSizeInterval)}framework.unbind(self.scrollWrap,_downEvents,self);framework.unbind(window,'scroll',self);_stopDragUpdateLoop();_stopAllAnimations();_listeners=null},panTo:function panTo(x,y,force){if(!force){if(x>_currPanBounds.min.x){x=_currPanBounds.min.x}else if(x<_currPanBounds.max.x){x=_currPanBounds.max.x}if(y>_currPanBounds.min.y){y=_currPanBounds.min.y}else if(y<_currPanBounds.max.y){y=_currPanBounds.max.y}}_panOffset.x=x;_panOffset.y=y;_applyCurrentZoomPan()},handleEvent:function handleEvent(e){e=e||window.event;if(_globalEventHandlers[e.type]){_globalEventHandlers[e.type](e)}},goTo:function goTo(index){index=_getLoopedId(index);var diff=index-_currentItemIndex;_indexDiff=diff;_currentItemIndex=index;self.currItem=_getItemAt(_currentItemIndex);_currPositionIndex-=diff;_moveMainScroll(_slideSize.x*_currPositionIndex);_stopAllAnimations();_mainScrollAnimating=false;self.updateCurrItem()},next:function next(){self.goTo(_currentItemIndex+1)},prev:function prev(){self.goTo(_currentItemIndex-1)},updateCurrZoomItem:function updateCurrZoomItem(emulateSetContent){if(emulateSetContent){_shout('beforeChange',0)}if(_itemHolders[1].el.children.length){var zoomElement=_itemHolders[1].el.children[0];if(framework.hasClass(zoomElement,'pswp__zoom-wrap')){_currZoomElementStyle=zoomElement.style}else{_currZoomElementStyle=null}}else{_currZoomElementStyle=null}_currPanBounds=self.currItem.bounds;_startZoomLevel=_currZoomLevel=self.currItem.initialZoomLevel;_panOffset.x=_currPanBounds.center.x;_panOffset.y=_currPanBounds.center.y;if(emulateSetContent){_shout('afterChange')}},invalidateCurrItems:function invalidateCurrItems(){_itemsNeedUpdate=true;for(var i=0;i<NUM_HOLDERS;i++){if(_itemHolders[i].item){_itemHolders[i].item.needsUpdate=true}}},updateCurrItem:function updateCurrItem(beforeAnimation){if(_indexDiff===0){return}var diffAbs=Math.abs(_indexDiff),tempHolder;if(beforeAnimation&&diffAbs<2){return}self.currItem=_getItemAt(_currentItemIndex);_renderMaxResolution=false;_shout('beforeChange',_indexDiff);if(diffAbs>=NUM_HOLDERS){_containerShiftIndex+=_indexDiff+(_indexDiff>0?-NUM_HOLDERS:NUM_HOLDERS);diffAbs=NUM_HOLDERS}for(var i=0;i<diffAbs;i++){if(_indexDiff>0){tempHolder=_itemHolders.shift();_itemHolders[NUM_HOLDERS-1]=tempHolder;_containerShiftIndex++;_setTranslateX((_containerShiftIndex+2)*_slideSize.x,tempHolder.el.style);self.setContent(tempHolder,_currentItemIndex-diffAbs+i+1+1)}else{tempHolder=_itemHolders.pop();_itemHolders.unshift(tempHolder);_containerShiftIndex--;_setTranslateX(_containerShiftIndex*_slideSize.x,tempHolder.el.style);self.setContent(tempHolder,_currentItemIndex+diffAbs-i-1-1)}}if(_currZoomElementStyle&&Math.abs(_indexDiff)===1){var prevItem=_getItemAt(_prevItemIndex);if(prevItem.initialZoomLevel!==_currZoomLevel){_calculateItemSize(prevItem,_viewportSize);_setImageSize(prevItem);_applyZoomPanToItem(prevItem)}}_indexDiff=0;self.updateCurrZoomItem();_prevItemIndex=_currentItemIndex;_shout('afterChange')},updateSize:function updateSize(force){if(!_isFixedPosition&&_options.modal){var windowScrollY=framework.getScrollY();if(_currentWindowScrollY!==windowScrollY){template.style.top=windowScrollY+'px';_currentWindowScrollY=windowScrollY}if(!force&&_windowVisibleSize.x===window.innerWidth&&_windowVisibleSize.y===window.innerHeight){return}_windowVisibleSize.x=window.innerWidth;_windowVisibleSize.y=window.innerHeight;template.style.height=_windowVisibleSize.y+'px'}_viewportSize.x=self.scrollWrap.clientWidth;_viewportSize.y=self.scrollWrap.clientHeight;_updatePageScrollOffset();_slideSize.x=_viewportSize.x+Math.round(_viewportSize.x*_options.spacing);_slideSize.y=_viewportSize.y;_moveMainScroll(_slideSize.x*_currPositionIndex);_shout('beforeResize');if(_containerShiftIndex!==undefined){var holder,item,hIndex;for(var i=0;i<NUM_HOLDERS;i++){holder=_itemHolders[i];_setTranslateX((i+_containerShiftIndex)*_slideSize.x,holder.el.style);hIndex=_currentItemIndex+i-1;if(_options.loop&&_getNumItems()>2){hIndex=_getLoopedId(hIndex)}item=_getItemAt(hIndex);if(item&&(_itemsNeedUpdate||item.needsUpdate||!item.bounds)){self.cleanSlide(item);self.setContent(holder,hIndex);if(i===1){self.currItem=item;self.updateCurrZoomItem(true)}item.needsUpdate=false}else if(holder.index===-1&&hIndex>=0){self.setContent(holder,hIndex)}if(item&&item.container){_calculateItemSize(item,_viewportSize);_setImageSize(item);_applyZoomPanToItem(item)}}_itemsNeedUpdate=false}_startZoomLevel=_currZoomLevel=self.currItem.initialZoomLevel;_currPanBounds=self.currItem.bounds;if(_currPanBounds){_panOffset.x=_currPanBounds.center.x;_panOffset.y=_currPanBounds.center.y;_applyCurrentZoomPan(true)}_shout('resize')},zoomTo:function zoomTo(destZoomLevel,centerPoint,speed,easingFn,updateFn){if(centerPoint){_startZoomLevel=_currZoomLevel;_midZoomPoint.x=Math.abs(centerPoint.x)-_panOffset.x;_midZoomPoint.y=Math.abs(centerPoint.y)-_panOffset.y;_equalizePoints(_startPanOffset,_panOffset)}var destPanBounds=_calculatePanBounds(destZoomLevel,false),destPanOffset={};_modifyDestPanOffset('x',destPanBounds,destPanOffset,destZoomLevel);_modifyDestPanOffset('y',destPanBounds,destPanOffset,destZoomLevel);var initialZoomLevel=_currZoomLevel;var initialPanOffset={x:_panOffset.x,y:_panOffset.y};_roundPoint(destPanOffset);var onUpdate=function onUpdate(now){if(now===1){_currZoomLevel=destZoomLevel;_panOffset.x=destPanOffset.x;_panOffset.y=destPanOffset.y}else{_currZoomLevel=(destZoomLevel-initialZoomLevel)*now+initialZoomLevel;_panOffset.x=(destPanOffset.x-initialPanOffset.x)*now+initialPanOffset.x;_panOffset.y=(destPanOffset.y-initialPanOffset.y)*now+initialPanOffset.y}if(updateFn){updateFn(now)}_applyCurrentZoomPan(now===1)};if(speed){_animateProp('customZoomTo',0,1,speed,easingFn||framework.easing.sine.inOut,onUpdate)}else{onUpdate(1)}}};var MIN_SWIPE_DISTANCE=30,DIRECTION_CHECK_OFFSET=10;var _gestureStartTime,_gestureCheckSpeedTime,p={},p2={},delta={},_currPoint={},_startPoint={},_currPointers=[],_startMainScrollPos={},_releaseAnimData,_posPoints=[],_tempPoint={},_isZoomingIn,_verticalDragInitiated,_oldAndroidTouchEndTimeout,_currZoomedItemIndex=0,_centerPoint=_getEmptyPoint(),_lastReleaseTime=0,_isDragging,_isMultitouch,_zoomStarted,_moved,_dragAnimFrame,_mainScrollShifted,_currentPoints,_isZooming,_currPointsDistance,_startPointsDistance,_currPanBounds,_mainScrollPos=_getEmptyPoint(),_currZoomElementStyle,_mainScrollAnimating,_midZoomPoint=_getEmptyPoint(),_currCenterPoint=_getEmptyPoint(),_direction,_isFirstMove,_opacityChanged,_bgOpacity,_wasOverInitialZoom,_isEqualPoints=function _isEqualPoints(p1,p2){return p1.x===p2.x&&p1.y===p2.y},_isNearbyPoints=function _isNearbyPoints(touch0,touch1){return Math.abs(touch0.x-touch1.x)<DOUBLE_TAP_RADIUS&&Math.abs(touch0.y-touch1.y)<DOUBLE_TAP_RADIUS},_calculatePointsDistance=function _calculatePointsDistance(p1,p2){_tempPoint.x=Math.abs(p1.x-p2.x);_tempPoint.y=Math.abs(p1.y-p2.y);return Math.sqrt(_tempPoint.x*_tempPoint.x+_tempPoint.y*_tempPoint.y)},_stopDragUpdateLoop=function _stopDragUpdateLoop(){if(_dragAnimFrame){_cancelAF(_dragAnimFrame);_dragAnimFrame=null}},_dragUpdateLoop=function _dragUpdateLoop(){if(_isDragging){_dragAnimFrame=_requestAF(_dragUpdateLoop);_renderMovement()}},_canPan=function _canPan(){return!(_options.scaleMode==='fit'&&_currZoomLevel===self.currItem.initialZoomLevel)},_closestElement=function _closestElement(el,fn){if(!el||el===document){return false}if(el.getAttribute('class')&&el.getAttribute('class').indexOf('pswp__scroll-wrap')>-1){return false}if(fn(el)){return el}return _closestElement(el.parentNode,fn)},_preventObj={},_preventDefaultEventBehaviour=function _preventDefaultEventBehaviour(e,isDown){_preventObj.prevent=!_closestElement(e.target,_options.isClickableElement);_shout('preventDragEvent',e,isDown,_preventObj);return _preventObj.prevent},_convertTouchToPoint=function _convertTouchToPoint(touch,p){p.x=touch.pageX;p.y=touch.pageY;p.id=touch.identifier;return p},_findCenterOfPoints=function _findCenterOfPoints(p1,p2,pCenter){pCenter.x=(p1.x+p2.x)*0.5;pCenter.y=(p1.y+p2.y)*0.5},_pushPosPoint=function _pushPosPoint(time,x,y){if(time-_gestureCheckSpeedTime>50){var o=_posPoints.length>2?_posPoints.shift():{};o.x=x;o.y=y;_posPoints.push(o);_gestureCheckSpeedTime=time}},_calculateVerticalDragOpacityRatio=function _calculateVerticalDragOpacityRatio(){var yOffset=_panOffset.y-self.currItem.initialPosition.y;return 1-Math.abs(yOffset/(_viewportSize.y/2))},_ePoint1={},_ePoint2={},_tempPointsArr=[],_tempCounter,_getTouchPoints=function _getTouchPoints(e){while(_tempPointsArr.length>0){_tempPointsArr.pop()}if(!_pointerEventEnabled){if(e.type.indexOf('touch')>-1){if(e.touches&&e.touches.length>0){_tempPointsArr[0]=_convertTouchToPoint(e.touches[0],_ePoint1);if(e.touches.length>1){_tempPointsArr[1]=_convertTouchToPoint(e.touches[1],_ePoint2)}}}else{_ePoint1.x=e.pageX;_ePoint1.y=e.pageY;_ePoint1.id='';_tempPointsArr[0]=_ePoint1}}else{_tempCounter=0;_currPointers.forEach(function(p){if(_tempCounter===0){_tempPointsArr[0]=p}else if(_tempCounter===1){_tempPointsArr[1]=p}_tempCounter++})}return _tempPointsArr},_panOrMoveMainScroll=function _panOrMoveMainScroll(axis,delta){var panFriction,overDiff=0,newOffset=_panOffset[axis]+delta[axis],startOverDiff,dir=delta[axis]>0,newMainScrollPosition=_mainScrollPos.x+delta.x,mainScrollDiff=_mainScrollPos.x-_startMainScrollPos.x,newPanPos,newMainScrollPos;if(newOffset>_currPanBounds.min[axis]||newOffset<_currPanBounds.max[axis]){panFriction=_options.panEndFriction}else{panFriction=1}newOffset=_panOffset[axis]+delta[axis]*panFriction;if(_options.allowPanToNext||_currZoomLevel===self.currItem.initialZoomLevel){if(!_currZoomElementStyle){newMainScrollPos=newMainScrollPosition}else if(_direction==='h'&&axis==='x'&&!_zoomStarted){if(dir){if(newOffset>_currPanBounds.min[axis]){panFriction=_options.panEndFriction;overDiff=_currPanBounds.min[axis]-newOffset;startOverDiff=_currPanBounds.min[axis]-_startPanOffset[axis]}if((startOverDiff<=0||mainScrollDiff<0)&&_getNumItems()>1){newMainScrollPos=newMainScrollPosition;if(mainScrollDiff<0&&newMainScrollPosition>_startMainScrollPos.x){newMainScrollPos=_startMainScrollPos.x}}else{if(_currPanBounds.min.x!==_currPanBounds.max.x){newPanPos=newOffset}}}else{if(newOffset<_currPanBounds.max[axis]){panFriction=_options.panEndFriction;overDiff=newOffset-_currPanBounds.max[axis];startOverDiff=_startPanOffset[axis]-_currPanBounds.max[axis]}if((startOverDiff<=0||mainScrollDiff>0)&&_getNumItems()>1){newMainScrollPos=newMainScrollPosition;if(mainScrollDiff>0&&newMainScrollPosition<_startMainScrollPos.x){newMainScrollPos=_startMainScrollPos.x}}else{if(_currPanBounds.min.x!==_currPanBounds.max.x){newPanPos=newOffset}}}}if(axis==='x'){if(newMainScrollPos!==undefined){_moveMainScroll(newMainScrollPos,true);if(newMainScrollPos===_startMainScrollPos.x){_mainScrollShifted=false}else{_mainScrollShifted=true}}if(_currPanBounds.min.x!==_currPanBounds.max.x){if(newPanPos!==undefined){_panOffset.x=newPanPos}else if(!_mainScrollShifted){_panOffset.x+=delta.x*panFriction}}return newMainScrollPos!==undefined}}if(!_mainScrollAnimating){if(!_mainScrollShifted){if(_currZoomLevel>self.currItem.fitRatio){_panOffset[axis]+=delta[axis]*panFriction}}}},_onDragStart=function _onDragStart(e){if(e.type==='mousedown'&&e.button>0){return}if(_initialZoomRunning){e.preventDefault();return}if(_oldAndroidTouchEndTimeout&&e.type==='mousedown'){return}if(_preventDefaultEventBehaviour(e,true)){e.preventDefault()}_shout('pointerDown');if(_pointerEventEnabled){var pointerIndex=framework.arraySearch(_currPointers,e.pointerId,'id');if(pointerIndex<0){pointerIndex=_currPointers.length}_currPointers[pointerIndex]={x:e.pageX,y:e.pageY,id:e.pointerId}}var startPointsList=_getTouchPoints(e),numPoints=startPointsList.length;_currentPoints=null;_stopAllAnimations();if(!_isDragging||numPoints===1){_isDragging=_isFirstMove=true;framework.bind(window,_upMoveEvents,self);_isZoomingIn=_wasOverInitialZoom=_opacityChanged=_verticalDragInitiated=_mainScrollShifted=_moved=_isMultitouch=_zoomStarted=false;_direction=null;_shout('firstTouchStart',startPointsList);_equalizePoints(_startPanOffset,_panOffset);_currPanDist.x=_currPanDist.y=0;_equalizePoints(_currPoint,startPointsList[0]);_equalizePoints(_startPoint,_currPoint);_startMainScrollPos.x=_slideSize.x*_currPositionIndex;_posPoints=[{x:_currPoint.x,y:_currPoint.y}];_gestureCheckSpeedTime=_gestureStartTime=_getCurrentTime();_calculatePanBounds(_currZoomLevel,true);_stopDragUpdateLoop();_dragUpdateLoop()}if(!_isZooming&&numPoints>1&&!_mainScrollAnimating&&!_mainScrollShifted){_startZoomLevel=_currZoomLevel;_zoomStarted=false;_isZooming=_isMultitouch=true;_currPanDist.y=_currPanDist.x=0;_equalizePoints(_startPanOffset,_panOffset);_equalizePoints(p,startPointsList[0]);_equalizePoints(p2,startPointsList[1]);_findCenterOfPoints(p,p2,_currCenterPoint);_midZoomPoint.x=Math.abs(_currCenterPoint.x)-_panOffset.x;_midZoomPoint.y=Math.abs(_currCenterPoint.y)-_panOffset.y;_currPointsDistance=_startPointsDistance=_calculatePointsDistance(p,p2)}},_onDragMove=function _onDragMove(e){e.preventDefault();if(_pointerEventEnabled){var pointerIndex=framework.arraySearch(_currPointers,e.pointerId,'id');if(pointerIndex>-1){var p=_currPointers[pointerIndex];p.x=e.pageX;p.y=e.pageY}}if(_isDragging){var touchesList=_getTouchPoints(e);if(!_direction&&!_moved&&!_isZooming){if(_mainScrollPos.x!==_slideSize.x*_currPositionIndex){_direction='h'}else{var diff=Math.abs(touchesList[0].x-_currPoint.x)-Math.abs(touchesList[0].y-_currPoint.y);if(Math.abs(diff)>=DIRECTION_CHECK_OFFSET){_direction=diff>0?'h':'v';_currentPoints=touchesList}}}else{_currentPoints=touchesList}}},_renderMovement=function _renderMovement(){if(!_currentPoints){return}var numPoints=_currentPoints.length;if(numPoints===0){return}_equalizePoints(p,_currentPoints[0]);delta.x=p.x-_currPoint.x;delta.y=p.y-_currPoint.y;if(_isZooming&&numPoints>1){_currPoint.x=p.x;_currPoint.y=p.y;if(!delta.x&&!delta.y&&_isEqualPoints(_currentPoints[1],p2)){return}_equalizePoints(p2,_currentPoints[1]);if(!_zoomStarted){_zoomStarted=true;_shout('zoomGestureStarted')}var pointsDistance=_calculatePointsDistance(p,p2);var zoomLevel=_calculateZoomLevel(pointsDistance);if(zoomLevel>self.currItem.initialZoomLevel+self.currItem.initialZoomLevel/15){_wasOverInitialZoom=true}var zoomFriction=1,minZoomLevel=_getMinZoomLevel(),maxZoomLevel=_getMaxZoomLevel();if(zoomLevel<minZoomLevel){if(_options.pinchToClose&&!_wasOverInitialZoom&&_startZoomLevel<=self.currItem.initialZoomLevel){var minusDiff=minZoomLevel-zoomLevel;var percent=1-minusDiff/(minZoomLevel/1.2);_applyBgOpacity(percent);_shout('onPinchClose',percent);_opacityChanged=true}else{zoomFriction=(minZoomLevel-zoomLevel)/minZoomLevel;if(zoomFriction>1){zoomFriction=1}zoomLevel=minZoomLevel-zoomFriction*(minZoomLevel/3)}}else if(zoomLevel>maxZoomLevel){zoomFriction=(zoomLevel-maxZoomLevel)/(minZoomLevel*6);if(zoomFriction>1){zoomFriction=1}zoomLevel=maxZoomLevel+zoomFriction*minZoomLevel}if(zoomFriction<0){zoomFriction=0}_currPointsDistance=pointsDistance;_findCenterOfPoints(p,p2,_centerPoint);_currPanDist.x+=_centerPoint.x-_currCenterPoint.x;_currPanDist.y+=_centerPoint.y-_currCenterPoint.y;_equalizePoints(_currCenterPoint,_centerPoint);_panOffset.x=_calculatePanOffset('x',zoomLevel);_panOffset.y=_calculatePanOffset('y',zoomLevel);_isZoomingIn=zoomLevel>_currZoomLevel;_currZoomLevel=zoomLevel;_applyCurrentZoomPan()}else{if(!_direction){return}if(_isFirstMove){_isFirstMove=false;if(Math.abs(delta.x)>=DIRECTION_CHECK_OFFSET){delta.x-=_currentPoints[0].x-_startPoint.x}if(Math.abs(delta.y)>=DIRECTION_CHECK_OFFSET){delta.y-=_currentPoints[0].y-_startPoint.y}}_currPoint.x=p.x;_currPoint.y=p.y;if(delta.x===0&&delta.y===0){return}if(_direction==='v'&&_options.closeOnVerticalDrag){if(!_canPan()){_currPanDist.y+=delta.y;_panOffset.y+=delta.y;var opacityRatio=_calculateVerticalDragOpacityRatio();_verticalDragInitiated=true;_shout('onVerticalDrag',opacityRatio);_applyBgOpacity(opacityRatio);_applyCurrentZoomPan();return}}_pushPosPoint(_getCurrentTime(),p.x,p.y);_moved=true;_currPanBounds=self.currItem.bounds;var mainScrollChanged=_panOrMoveMainScroll('x',delta);if(!mainScrollChanged){_panOrMoveMainScroll('y',delta);_roundPoint(_panOffset);_applyCurrentZoomPan()}}},_onDragRelease=function _onDragRelease(e){if(_features.isOldAndroid){if(_oldAndroidTouchEndTimeout&&e.type==='mouseup'){return}if(e.type.indexOf('touch')>-1){clearTimeout(_oldAndroidTouchEndTimeout);_oldAndroidTouchEndTimeout=setTimeout(function(){_oldAndroidTouchEndTimeout=0},600)}}_shout('pointerUp');if(_preventDefaultEventBehaviour(e,false)){e.preventDefault()}var releasePoint;if(_pointerEventEnabled){var pointerIndex=framework.arraySearch(_currPointers,e.pointerId,'id');if(pointerIndex>-1){releasePoint=_currPointers.splice(pointerIndex,1)[0];if(navigator.msPointerEnabled){var MSPOINTER_TYPES={4:'mouse',2:'touch',3:'pen'};releasePoint.type=MSPOINTER_TYPES[e.pointerType];if(!releasePoint.type){releasePoint.type=e.pointerType||'mouse'}}else{releasePoint.type=e.pointerType||'mouse'}}}var touchList=_getTouchPoints(e),gestureType,numPoints=touchList.length;if(e.type==='mouseup'){numPoints=0}if(numPoints===2){_currentPoints=null;return true}if(numPoints===1){_equalizePoints(_startPoint,touchList[0])}if(numPoints===0&&!_direction&&!_mainScrollAnimating){if(!releasePoint){if(e.type==='mouseup'){releasePoint={x:e.pageX,y:e.pageY,type:'mouse'}}else if(e.changedTouches&&e.changedTouches[0]){releasePoint={x:e.changedTouches[0].pageX,y:e.changedTouches[0].pageY,type:'touch'}}}_shout('touchRelease',e,releasePoint)}var releaseTimeDiff=-1;if(numPoints===0){_isDragging=false;framework.unbind(window,_upMoveEvents,self);_stopDragUpdateLoop();if(_isZooming){releaseTimeDiff=0}else if(_lastReleaseTime!==-1){releaseTimeDiff=_getCurrentTime()-_lastReleaseTime}}_lastReleaseTime=numPoints===1?_getCurrentTime():-1;if(releaseTimeDiff!==-1&&releaseTimeDiff<150){gestureType='zoom'}else{gestureType='swipe'}if(_isZooming&&numPoints<2){_isZooming=false;if(numPoints===1){gestureType='zoomPointerUp'}_shout('zoomGestureEnded')}_currentPoints=null;if(!_moved&&!_zoomStarted&&!_mainScrollAnimating&&!_verticalDragInitiated){return}_stopAllAnimations();if(!_releaseAnimData){_releaseAnimData=_initDragReleaseAnimationData()}_releaseAnimData.calculateSwipeSpeed('x');if(_verticalDragInitiated){var opacityRatio=_calculateVerticalDragOpacityRatio();if(opacityRatio<_options.verticalDragRange){self.close()}else{var initalPanY=_panOffset.y,initialBgOpacity=_bgOpacity;_animateProp('verticalDrag',0,1,300,framework.easing.cubic.out,function(now){_panOffset.y=(self.currItem.initialPosition.y-initalPanY)*now+initalPanY;_applyBgOpacity((1-initialBgOpacity)*now+initialBgOpacity);_applyCurrentZoomPan()});_shout('onVerticalDrag',1)}return}if((_mainScrollShifted||_mainScrollAnimating)&&numPoints===0){var itemChanged=_finishSwipeMainScrollGesture(gestureType,_releaseAnimData);if(itemChanged){return}gestureType='zoomPointerUp'}if(_mainScrollAnimating){return}if(gestureType!=='swipe'){_completeZoomGesture();return}if(!_mainScrollShifted&&_currZoomLevel>self.currItem.fitRatio){_completePanGesture(_releaseAnimData)}},_initDragReleaseAnimationData=function _initDragReleaseAnimationData(){var lastFlickDuration,tempReleasePos;var s={lastFlickOffset:{},lastFlickDist:{},lastFlickSpeed:{},slowDownRatio:{},slowDownRatioReverse:{},speedDecelerationRatio:{},speedDecelerationRatioAbs:{},distanceOffset:{},backAnimDestination:{},backAnimStarted:{},calculateSwipeSpeed:function calculateSwipeSpeed(axis){if(_posPoints.length>1){lastFlickDuration=_getCurrentTime()-_gestureCheckSpeedTime+50;tempReleasePos=_posPoints[_posPoints.length-2][axis]}else{lastFlickDuration=_getCurrentTime()-_gestureStartTime;tempReleasePos=_startPoint[axis]}s.lastFlickOffset[axis]=_currPoint[axis]-tempReleasePos;s.lastFlickDist[axis]=Math.abs(s.lastFlickOffset[axis]);if(s.lastFlickDist[axis]>20){s.lastFlickSpeed[axis]=s.lastFlickOffset[axis]/lastFlickDuration}else{s.lastFlickSpeed[axis]=0}if(Math.abs(s.lastFlickSpeed[axis])<0.1){s.lastFlickSpeed[axis]=0}s.slowDownRatio[axis]=0.95;s.slowDownRatioReverse[axis]=1-s.slowDownRatio[axis];s.speedDecelerationRatio[axis]=1},calculateOverBoundsAnimOffset:function calculateOverBoundsAnimOffset(axis,speed){if(!s.backAnimStarted[axis]){if(_panOffset[axis]>_currPanBounds.min[axis]){s.backAnimDestination[axis]=_currPanBounds.min[axis]}else if(_panOffset[axis]<_currPanBounds.max[axis]){s.backAnimDestination[axis]=_currPanBounds.max[axis]}if(s.backAnimDestination[axis]!==undefined){s.slowDownRatio[axis]=0.7;s.slowDownRatioReverse[axis]=1-s.slowDownRatio[axis];if(s.speedDecelerationRatioAbs[axis]<0.05){s.lastFlickSpeed[axis]=0;s.backAnimStarted[axis]=true;_animateProp('bounceZoomPan'+axis,_panOffset[axis],s.backAnimDestination[axis],speed||300,framework.easing.sine.out,function(pos){_panOffset[axis]=pos;_applyCurrentZoomPan()})}}}},calculateAnimOffset:function calculateAnimOffset(axis){if(!s.backAnimStarted[axis]){s.speedDecelerationRatio[axis]=s.speedDecelerationRatio[axis]*(s.slowDownRatio[axis]+s.slowDownRatioReverse[axis]-s.slowDownRatioReverse[axis]*s.timeDiff/10);s.speedDecelerationRatioAbs[axis]=Math.abs(s.lastFlickSpeed[axis]*s.speedDecelerationRatio[axis]);s.distanceOffset[axis]=s.lastFlickSpeed[axis]*s.speedDecelerationRatio[axis]*s.timeDiff;_panOffset[axis]+=s.distanceOffset[axis]}},panAnimLoop:function panAnimLoop(){if(_animations.zoomPan){_animations.zoomPan.raf=_requestAF(s.panAnimLoop);s.now=_getCurrentTime();s.timeDiff=s.now-s.lastNow;s.lastNow=s.now;s.calculateAnimOffset('x');s.calculateAnimOffset('y');_applyCurrentZoomPan();s.calculateOverBoundsAnimOffset('x');s.calculateOverBoundsAnimOffset('y');if(s.speedDecelerationRatioAbs.x<0.05&&s.speedDecelerationRatioAbs.y<0.05){_panOffset.x=Math.round(_panOffset.x);_panOffset.y=Math.round(_panOffset.y);_applyCurrentZoomPan();_stopAnimation('zoomPan');return}}}};return s},_completePanGesture=function _completePanGesture(animData){animData.calculateSwipeSpeed('y');_currPanBounds=self.currItem.bounds;animData.backAnimDestination={};animData.backAnimStarted={};if(Math.abs(animData.lastFlickSpeed.x)<=0.05&&Math.abs(animData.lastFlickSpeed.y)<=0.05){animData.speedDecelerationRatioAbs.x=animData.speedDecelerationRatioAbs.y=0;animData.calculateOverBoundsAnimOffset('x');animData.calculateOverBoundsAnimOffset('y');return true}_registerStartAnimation('zoomPan');animData.lastNow=_getCurrentTime();animData.panAnimLoop()},_finishSwipeMainScrollGesture=function _finishSwipeMainScrollGesture(gestureType,_releaseAnimData){var itemChanged;if(!_mainScrollAnimating){_currZoomedItemIndex=_currentItemIndex}var itemsDiff;if(gestureType==='swipe'){var totalShiftDist=_currPoint.x-_startPoint.x,isFastLastFlick=_releaseAnimData.lastFlickDist.x<10;if(totalShiftDist>MIN_SWIPE_DISTANCE&&(isFastLastFlick||_releaseAnimData.lastFlickOffset.x>20)){itemsDiff=-1}else if(totalShiftDist<-MIN_SWIPE_DISTANCE&&(isFastLastFlick||_releaseAnimData.lastFlickOffset.x<-20)){itemsDiff=1}}var nextCircle;if(itemsDiff){_currentItemIndex+=itemsDiff;if(_currentItemIndex<0){_currentItemIndex=_options.loop?_getNumItems()-1:0;nextCircle=true}else if(_currentItemIndex>=_getNumItems()){_currentItemIndex=_options.loop?0:_getNumItems()-1;nextCircle=true}if(!nextCircle||_options.loop){_indexDiff+=itemsDiff;_currPositionIndex-=itemsDiff;itemChanged=true}}var animateToX=_slideSize.x*_currPositionIndex;var animateToDist=Math.abs(animateToX-_mainScrollPos.x);var finishAnimDuration;if(!itemChanged&&animateToX>_mainScrollPos.x!==_releaseAnimData.lastFlickSpeed.x>0){finishAnimDuration=333}else{finishAnimDuration=Math.abs(_releaseAnimData.lastFlickSpeed.x)>0?animateToDist/Math.abs(_releaseAnimData.lastFlickSpeed.x):333;finishAnimDuration=Math.min(finishAnimDuration,400);finishAnimDuration=Math.max(finishAnimDuration,250)}if(_currZoomedItemIndex===_currentItemIndex){itemChanged=false}_mainScrollAnimating=true;_shout('mainScrollAnimStart');_animateProp('mainScroll',_mainScrollPos.x,animateToX,finishAnimDuration,framework.easing.cubic.out,_moveMainScroll,function(){_stopAllAnimations();_mainScrollAnimating=false;_currZoomedItemIndex=-1;if(itemChanged||_currZoomedItemIndex!==_currentItemIndex){self.updateCurrItem()}_shout('mainScrollAnimComplete')});if(itemChanged){self.updateCurrItem(true)}return itemChanged},_calculateZoomLevel=function _calculateZoomLevel(touchesDistance){return 1/_startPointsDistance*touchesDistance*_startZoomLevel},_completeZoomGesture=function _completeZoomGesture(){var destZoomLevel=_currZoomLevel,minZoomLevel=_getMinZoomLevel(),maxZoomLevel=_getMaxZoomLevel();if(_currZoomLevel<minZoomLevel){destZoomLevel=minZoomLevel}else if(_currZoomLevel>maxZoomLevel){destZoomLevel=maxZoomLevel}var destOpacity=1,onUpdate,initialOpacity=_bgOpacity;if(_opacityChanged&&!_isZoomingIn&&!_wasOverInitialZoom&&_currZoomLevel<minZoomLevel){self.close();return true}if(_opacityChanged){onUpdate=function onUpdate(now){_applyBgOpacity((destOpacity-initialOpacity)*now+initialOpacity)}}self.zoomTo(destZoomLevel,0,200,framework.easing.cubic.out,onUpdate);return true};_registerModule('Gestures',{publicMethods:{initGestures:function initGestures(){var addEventNames=function addEventNames(pref,down,move,up,cancel){_dragStartEvent=pref+down;_dragMoveEvent=pref+move;_dragEndEvent=pref+up;if(cancel){_dragCancelEvent=pref+cancel}else{_dragCancelEvent=''}};_pointerEventEnabled=_features.pointerEvent;if(_pointerEventEnabled&&_features.touch){_features.touch=false}if(_pointerEventEnabled){if(navigator.msPointerEnabled){addEventNames('MSPointer','Down','Move','Up','Cancel')}else{addEventNames('pointer','down','move','up','cancel')}}else if(_features.touch){addEventNames('touch','start','move','end','cancel');_likelyTouchDevice=true}else{addEventNames('mouse','down','move','up')}_upMoveEvents=_dragMoveEvent+' '+_dragEndEvent+' '+_dragCancelEvent;_downEvents=_dragStartEvent;if(_pointerEventEnabled&&!_likelyTouchDevice){_likelyTouchDevice=navigator.maxTouchPoints>1||navigator.msMaxTouchPoints>1}self.likelyTouchDevice=_likelyTouchDevice;_globalEventHandlers[_dragStartEvent]=_onDragStart;_globalEventHandlers[_dragMoveEvent]=_onDragMove;_globalEventHandlers[_dragEndEvent]=_onDragRelease;if(_dragCancelEvent){_globalEventHandlers[_dragCancelEvent]=_globalEventHandlers[_dragEndEvent]}if(_features.touch){_downEvents+=' mousedown';_upMoveEvents+=' mousemove mouseup';_globalEventHandlers.mousedown=_globalEventHandlers[_dragStartEvent];_globalEventHandlers.mousemove=_globalEventHandlers[_dragMoveEvent];_globalEventHandlers.mouseup=_globalEventHandlers[_dragEndEvent]}if(!_likelyTouchDevice){_options.allowPanToNext=false}}}});var _showOrHideTimeout,_showOrHide=function _showOrHide(item,img,out,completeFn){if(_showOrHideTimeout){clearTimeout(_showOrHideTimeout)}_initialZoomRunning=true;_initialContentSet=true;var thumbBounds;if(item.initialLayout){thumbBounds=item.initialLayout;item.initialLayout=null}else{thumbBounds=_options.getThumbBoundsFn&&_options.getThumbBoundsFn(_currentItemIndex)}var duration=out?_options.hideAnimationDuration:_options.showAnimationDuration;var onComplete=function onComplete(){_stopAnimation('initialZoom');if(!out){_applyBgOpacity(1);if(img){img.style.display='block'}framework.addClass(template,'pswp--animated-in');_shout('initialZoom'+(out?'OutEnd':'InEnd'))}else{self.template.removeAttribute('style');self.bg.removeAttribute('style')}if(completeFn){completeFn()}_initialZoomRunning=false};if(!duration||!thumbBounds||thumbBounds.x===undefined){_shout('initialZoom'+(out?'Out':'In'));_currZoomLevel=item.initialZoomLevel;_equalizePoints(_panOffset,item.initialPosition);_applyCurrentZoomPan();template.style.opacity=out?0:1;_applyBgOpacity(1);if(duration){setTimeout(function(){onComplete()},duration)}else{onComplete()}return}var startAnimation=function startAnimation(){var closeWithRaf=_closedByScroll,fadeEverything=!self.currItem.src||self.currItem.loadError||_options.showHideOpacity;if(item.miniImg){item.miniImg.style.webkitBackfaceVisibility='hidden'}if(!out){_currZoomLevel=thumbBounds.w/item.w;_panOffset.x=thumbBounds.x;_panOffset.y=thumbBounds.y-_initalWindowScrollY;self[fadeEverything?'template':'bg'].style.opacity=0.001;_applyCurrentZoomPan()}_registerStartAnimation('initialZoom');if(out&&!closeWithRaf){framework.removeClass(template,'pswp--animated-in')}if(fadeEverything){if(out){framework[(closeWithRaf?'remove':'add')+'Class'](template,'pswp--animate_opacity')}else{setTimeout(function(){framework.addClass(template,'pswp--animate_opacity')},30)}}_showOrHideTimeout=setTimeout(function(){_shout('initialZoom'+(out?'Out':'In'));if(!out){_currZoomLevel=item.initialZoomLevel;_equalizePoints(_panOffset,item.initialPosition);_applyCurrentZoomPan();_applyBgOpacity(1);if(fadeEverything){template.style.opacity=1}else{_applyBgOpacity(1)}_showOrHideTimeout=setTimeout(onComplete,duration+20)}else{var destZoomLevel=thumbBounds.w/item.w,initialPanOffset={x:_panOffset.x,y:_panOffset.y},initialZoomLevel=_currZoomLevel,initalBgOpacity=_bgOpacity,onUpdate=function onUpdate(now){if(now===1){_currZoomLevel=destZoomLevel;_panOffset.x=thumbBounds.x;_panOffset.y=thumbBounds.y-_currentWindowScrollY}else{_currZoomLevel=(destZoomLevel-initialZoomLevel)*now+initialZoomLevel;_panOffset.x=(thumbBounds.x-initialPanOffset.x)*now+initialPanOffset.x;_panOffset.y=(thumbBounds.y-_currentWindowScrollY-initialPanOffset.y)*now+initialPanOffset.y}_applyCurrentZoomPan();if(fadeEverything){template.style.opacity=1-now}else{_applyBgOpacity(initalBgOpacity-now*initalBgOpacity)}};if(closeWithRaf){_animateProp('initialZoom',0,1,duration,framework.easing.cubic.out,onUpdate,onComplete)}else{onUpdate(1);_showOrHideTimeout=setTimeout(onComplete,duration+20)}}},out?25:90)};startAnimation()};var _items,_tempPanAreaSize={},_imagesToAppendPool=[],_initialContentSet,_initialZoomRunning,_controllerDefaultOptions={index:0,errorMsg:'<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',forceProgressiveLoading:false,preload:[1,1],getNumItemsFn:function getNumItemsFn(){return _items.length}};var _getItemAt,_getNumItems,_initialIsLoop,_getZeroBounds=function _getZeroBounds(){return{center:{x:0,y:0},max:{x:0,y:0},min:{x:0,y:0}}},_calculateSingleItemPanBounds=function _calculateSingleItemPanBounds(item,realPanElementW,realPanElementH){var bounds=item.bounds;bounds.center.x=Math.round((_tempPanAreaSize.x-realPanElementW)/2);bounds.center.y=Math.round((_tempPanAreaSize.y-realPanElementH)/2)+item.vGap.top;bounds.max.x=realPanElementW>_tempPanAreaSize.x?Math.round(_tempPanAreaSize.x-realPanElementW):bounds.center.x;bounds.max.y=realPanElementH>_tempPanAreaSize.y?Math.round(_tempPanAreaSize.y-realPanElementH)+item.vGap.top:bounds.center.y;bounds.min.x=realPanElementW>_tempPanAreaSize.x?0:bounds.center.x;bounds.min.y=realPanElementH>_tempPanAreaSize.y?item.vGap.top:bounds.center.y},_calculateItemSize=function _calculateItemSize(item,viewportSize,zoomLevel){if(item.src&&!item.loadError){var isInitial=!zoomLevel;if(isInitial){if(!item.vGap){item.vGap={top:0,bottom:0}}_shout('parseVerticalMargin',item)}_tempPanAreaSize.x=viewportSize.x;_tempPanAreaSize.y=viewportSize.y-item.vGap.top-item.vGap.bottom;if(isInitial){var hRatio=_tempPanAreaSize.x/item.w;var vRatio=_tempPanAreaSize.y/item.h;item.fitRatio=hRatio<vRatio?hRatio:vRatio;var scaleMode=_options.scaleMode;if(scaleMode==='orig'){zoomLevel=1}else if(scaleMode==='fit'){zoomLevel=item.fitRatio}if(zoomLevel>1){zoomLevel=1}item.initialZoomLevel=zoomLevel;if(!item.bounds){item.bounds=_getZeroBounds()}}if(!zoomLevel){return}_calculateSingleItemPanBounds(item,item.w*zoomLevel,item.h*zoomLevel);if(isInitial&&zoomLevel===item.initialZoomLevel){item.initialPosition=item.bounds.center}return item.bounds}else{item.w=item.h=0;item.initialZoomLevel=item.fitRatio=1;item.bounds=_getZeroBounds();item.initialPosition=item.bounds.center;return item.bounds}},_appendImage=function _appendImage(index,item,baseDiv,img,preventAnimation,keepPlaceholder){if(item.loadError){return}if(img){item.imageAppended=true;_setImageSize(item,img,item===self.currItem&&_renderMaxResolution);baseDiv.appendChild(img);if(keepPlaceholder){setTimeout(function(){if(item&&item.loaded&&item.placeholder){item.placeholder.style.display='none';item.placeholder=null}},500)}}},_preloadImage=function _preloadImage(item){item.loading=true;item.loaded=false;var img=item.img=framework.createEl('pswp__img','img');var onComplete=function onComplete(){item.loading=false;item.loaded=true;if(item.loadComplete){item.loadComplete(item)}else{item.img=null}img.onload=img.onerror=null;img=null};img.onload=onComplete;img.onerror=function(){item.loadError=true;onComplete()};img.src=item.src;return img},_checkForError=function _checkForError(item,cleanUp){if(item.src&&item.loadError&&item.container){if(cleanUp){item.container.innerHTML=''}item.container.innerHTML=_options.errorMsg.replace('%url%',item.src);return true}},_setImageSize=function _setImageSize(item,img,maxRes){if(!item.src){return}if(!img){img=item.container.lastChild}var w=maxRes?item.w:Math.round(item.w*item.fitRatio),h=maxRes?item.h:Math.round(item.h*item.fitRatio);if(item.placeholder&&!item.loaded){item.placeholder.style.width=w+'px';item.placeholder.style.height=h+'px'}img.style.width=w+'px';img.style.height=h+'px'},_appendImagesPool=function _appendImagesPool(){if(_imagesToAppendPool.length){var poolItem;for(var i=0;i<_imagesToAppendPool.length;i++){poolItem=_imagesToAppendPool[i];if(poolItem.holder.index===poolItem.index){_appendImage(poolItem.index,poolItem.item,poolItem.baseDiv,poolItem.img,false,poolItem.clearPlaceholder)}}_imagesToAppendPool=[]}};_registerModule('Controller',{publicMethods:{lazyLoadItem:function lazyLoadItem(index){index=_getLoopedId(index);var item=_getItemAt(index);if(!item||(item.loaded||item.loading)&&!_itemsNeedUpdate){return}_shout('gettingData',index,item);if(!item.src){return}_preloadImage(item)},initController:function initController(){framework.extend(_options,_controllerDefaultOptions,true);self.items=_items=items;_getItemAt=self.getItemAt;_getNumItems=_options.getNumItemsFn;_initialIsLoop=_options.loop;if(_getNumItems()<3){_options.loop=false}_listen('beforeChange',function(diff){var p=_options.preload,isNext=diff===null?true:diff>=0,preloadBefore=Math.min(p[0],_getNumItems()),preloadAfter=Math.min(p[1],_getNumItems()),i;for(i=1;i<=(isNext?preloadAfter:preloadBefore);i++){self.lazyLoadItem(_currentItemIndex+i)}for(i=1;i<=(isNext?preloadBefore:preloadAfter);i++){self.lazyLoadItem(_currentItemIndex-i)}});_listen('initialLayout',function(){self.currItem.initialLayout=_options.getThumbBoundsFn&&_options.getThumbBoundsFn(_currentItemIndex)});_listen('mainScrollAnimComplete',_appendImagesPool);_listen('initialZoomInEnd',_appendImagesPool);_listen('destroy',function(){var item;for(var i=0;i<_items.length;i++){item=_items[i];if(item.container){item.container=null}if(item.placeholder){item.placeholder=null}if(item.img){item.img=null}if(item.preloader){item.preloader=null}if(item.loadError){item.loaded=item.loadError=false}}_imagesToAppendPool=null})},getItemAt:function getItemAt(index){if(index>=0){return _items[index]!==undefined?_items[index]:false}return false},allowProgressiveImg:function allowProgressiveImg(){return _options.forceProgressiveLoading||!_likelyTouchDevice||_options.mouseUsed||screen.width>1200},setContent:function setContent(holder,index){if(_options.loop){index=_getLoopedId(index)}var prevItem=self.getItemAt(holder.index);if(prevItem){prevItem.container=null}var item=self.getItemAt(index),img;if(!item){holder.el.innerHTML='';return}_shout('gettingData',index,item);holder.index=index;holder.item=item;var baseDiv=item.container=framework.createEl('pswp__zoom-wrap');if(!item.src&&item.html){if(item.html.tagName){baseDiv.appendChild(item.html)}else{baseDiv.innerHTML=item.html}}_checkForError(item);_calculateItemSize(item,_viewportSize);if(item.src&&!item.loadError&&!item.loaded){item.loadComplete=function(item){if(!_isOpen){return}if(holder&&holder.index===index){if(_checkForError(item,true)){item.loadComplete=item.img=null;_calculateItemSize(item,_viewportSize);_applyZoomPanToItem(item);if(holder.index===_currentItemIndex){self.updateCurrZoomItem()}return}if(!item.imageAppended){if(_features.transform&&(_mainScrollAnimating||_initialZoomRunning)){_imagesToAppendPool.push({item:item,baseDiv:baseDiv,img:item.img,index:index,holder:holder,clearPlaceholder:true})}else{_appendImage(index,item,baseDiv,item.img,_mainScrollAnimating||_initialZoomRunning,true)}}else{if(!_initialZoomRunning&&item.placeholder){item.placeholder.style.display='none';item.placeholder=null}}}item.loadComplete=null;item.img=null;_shout('imageLoadComplete',index,item)};if(framework.features.transform){var placeholderClassName='pswp__img pswp__img--placeholder';placeholderClassName+=item.msrc?'':' pswp__img--placeholder--blank';var placeholder=framework.createEl(placeholderClassName,item.msrc?'img':'');if(item.msrc){placeholder.src=item.msrc}_setImageSize(item,placeholder);baseDiv.appendChild(placeholder);item.placeholder=placeholder}if(!item.loading){_preloadImage(item)}if(self.allowProgressiveImg()){if(!_initialContentSet&&_features.transform){_imagesToAppendPool.push({item:item,baseDiv:baseDiv,img:item.img,index:index,holder:holder})}else{_appendImage(index,item,baseDiv,item.img,true,true)}}}else if(item.src&&!item.loadError){img=framework.createEl('pswp__img','img');img.style.opacity=1;img.src=item.src;_setImageSize(item,img);_appendImage(index,item,baseDiv,img,true)}if(!_initialContentSet&&index===_currentItemIndex){_currZoomElementStyle=baseDiv.style;_showOrHide(item,img||item.img)}else{_applyZoomPanToItem(item)}holder.el.innerHTML='';holder.el.appendChild(baseDiv)},cleanSlide:function cleanSlide(item){if(item.img){item.img.onload=item.img.onerror=null}item.loaded=item.loading=item.img=item.imageAppended=false}}});var tapTimer,tapReleasePoint={},_dispatchTapEvent=function _dispatchTapEvent(origEvent,releasePoint,pointerType){var e=document.createEvent('CustomEvent'),eDetail={origEvent:origEvent,target:origEvent.target,releasePoint:releasePoint,pointerType:pointerType||'touch'};e.initCustomEvent('pswpTap',true,true,eDetail);origEvent.target.dispatchEvent(e)};_registerModule('Tap',{publicMethods:{initTap:function initTap(){_listen('firstTouchStart',self.onTapStart);_listen('touchRelease',self.onTapRelease);_listen('destroy',function(){tapReleasePoint={};tapTimer=null})},onTapStart:function onTapStart(touchList){if(touchList.length>1){clearTimeout(tapTimer);tapTimer=null}},onTapRelease:function onTapRelease(e,releasePoint){if(!releasePoint){return}if(!_moved&&!_isMultitouch&&!_numAnimations){var p0=releasePoint;if(tapTimer){clearTimeout(tapTimer);tapTimer=null;if(_isNearbyPoints(p0,tapReleasePoint)){_shout('doubleTap',p0);return}}if(releasePoint.type==='mouse'){_dispatchTapEvent(e,releasePoint,'mouse');return}var clickedTagName=e.target.tagName.toUpperCase();if(clickedTagName==='BUTTON'||framework.hasClass(e.target,'pswp__single-tap')){_dispatchTapEvent(e,releasePoint);return}_equalizePoints(tapReleasePoint,p0);tapTimer=setTimeout(function(){_dispatchTapEvent(e,releasePoint);tapTimer=null},300)}}}});var _wheelDelta;_registerModule('DesktopZoom',{publicMethods:{initDesktopZoom:function initDesktopZoom(){if(_oldIE){return}if(_likelyTouchDevice){_listen('mouseUsed',function(){self.setupDesktopZoom()})}else{self.setupDesktopZoom(true)}},setupDesktopZoom:function setupDesktopZoom(onInit){_wheelDelta={};var events='wheel mousewheel DOMMouseScroll';_listen('bindEvents',function(){framework.bind(template,events,self.handleMouseWheel)});_listen('unbindEvents',function(){if(_wheelDelta){framework.unbind(template,events,self.handleMouseWheel)}});self.mouseZoomedIn=false;var hasDraggingClass,updateZoomable=function updateZoomable(){if(self.mouseZoomedIn){framework.removeClass(template,'pswp--zoomed-in');self.mouseZoomedIn=false}if(_currZoomLevel<1){framework.addClass(template,'pswp--zoom-allowed')}else{framework.removeClass(template,'pswp--zoom-allowed')}removeDraggingClass()},removeDraggingClass=function removeDraggingClass(){if(hasDraggingClass){framework.removeClass(template,'pswp--dragging');hasDraggingClass=false}};_listen('resize',updateZoomable);_listen('afterChange',updateZoomable);_listen('pointerDown',function(){if(self.mouseZoomedIn){hasDraggingClass=true;framework.addClass(template,'pswp--dragging')}});_listen('pointerUp',removeDraggingClass);if(!onInit){updateZoomable()}},handleMouseWheel:function handleMouseWheel(e){if(_currZoomLevel<=self.currItem.fitRatio){if(_options.modal){if(!_options.closeOnScroll||_numAnimations||_isDragging){e.preventDefault()}else if(_transformKey&&Math.abs(e.deltaY)>2){_closedByScroll=true;self.close()}}return true}e.stopPropagation();_wheelDelta.x=0;if('deltaX'in e){if(e.deltaMode===1){_wheelDelta.x=e.deltaX*18;_wheelDelta.y=e.deltaY*18}else{_wheelDelta.x=e.deltaX;_wheelDelta.y=e.deltaY}}else if('wheelDelta'in e){if(e.wheelDeltaX){_wheelDelta.x=-0.16*e.wheelDeltaX}if(e.wheelDeltaY){_wheelDelta.y=-0.16*e.wheelDeltaY}else{_wheelDelta.y=-0.16*e.wheelDelta}}else if('detail'in e){_wheelDelta.y=e.detail}else{return}_calculatePanBounds(_currZoomLevel,true);var newPanX=_panOffset.x-_wheelDelta.x,newPanY=_panOffset.y-_wheelDelta.y;if(_options.modal||newPanX<=_currPanBounds.min.x&&newPanX>=_currPanBounds.max.x&&newPanY<=_currPanBounds.min.y&&newPanY>=_currPanBounds.max.y){e.preventDefault()}self.panTo(newPanX,newPanY)},toggleDesktopZoom:function toggleDesktopZoom(centerPoint){centerPoint=centerPoint||{x:_viewportSize.x/2+_offset.x,y:_viewportSize.y/2+_offset.y};var doubleTapZoomLevel=_options.getDoubleTapZoom(true,self.currItem);var zoomOut=_currZoomLevel===doubleTapZoomLevel;self.mouseZoomedIn=!zoomOut;self.zoomTo(zoomOut?self.currItem.initialZoomLevel:doubleTapZoomLevel,centerPoint,333);framework[(!zoomOut?'add':'remove')+'Class'](template,'pswp--zoomed-in')}}});var _historyDefaultOptions={history:true,galleryUID:1};var _historyUpdateTimeout,_hashChangeTimeout,_hashAnimCheckTimeout,_hashChangedByScript,_hashChangedByHistory,_hashReseted,_initialHash,_historyChanged,_closedFromURL,_urlChangedOnce,_windowLoc,_supportsPushState,_getHash=function _getHash(){return _windowLoc.hash.substring(1)},_cleanHistoryTimeouts=function _cleanHistoryTimeouts(){if(_historyUpdateTimeout){clearTimeout(_historyUpdateTimeout)}if(_hashAnimCheckTimeout){clearTimeout(_hashAnimCheckTimeout)}},_parseItemIndexFromURL=function _parseItemIndexFromURL(){var hash=_getHash(),params={};if(hash.length<5){return params}var i,vars=hash.split('&');for(i=0;i<vars.length;i++){if(!vars[i]){continue}var pair=vars[i].split('=');if(pair.length<2){continue}params[pair[0]]=pair[1]}if(_options.galleryPIDs){var searchfor=params.pid;params.pid=0;for(i=0;i<_items.length;i++){if(_items[i].pid===searchfor){params.pid=i;break}}}else{params.pid=parseInt(params.pid,10)-1}if(params.pid<0){params.pid=0}return params},_updateHash=function _updateHash(){if(_hashAnimCheckTimeout){clearTimeout(_hashAnimCheckTimeout)}if(_numAnimations||_isDragging){_hashAnimCheckTimeout=setTimeout(_updateHash,500);return}if(_hashChangedByScript){clearTimeout(_hashChangeTimeout)}else{_hashChangedByScript=true}var pid=_currentItemIndex+1;var item=_getItemAt(_currentItemIndex);if(item.hasOwnProperty('pid')){pid=item.pid}var newHash=_initialHash+'&'+'gid='+_options.galleryUID+'&'+'pid='+pid;if(!_historyChanged){if(_windowLoc.hash.indexOf(newHash)===-1){_urlChangedOnce=true}}var newURL=_windowLoc.href.split('#')[0]+'#'+newHash;if(_supportsPushState){if('#'+newHash!==window.location.hash){history[_historyChanged?'replaceState':'pushState']('',document.title,newURL)}}else{if(_historyChanged){_windowLoc.replace(newURL)}else{_windowLoc.hash=newHash}}_historyChanged=true;_hashChangeTimeout=setTimeout(function(){_hashChangedByScript=false},60)};_registerModule('History',{publicMethods:{initHistory:function initHistory(){framework.extend(_options,_historyDefaultOptions,true);if(!_options.history){return}_windowLoc=window.location;_urlChangedOnce=false;_closedFromURL=false;_historyChanged=false;_initialHash=_getHash();_supportsPushState='pushState'in history;if(_initialHash.indexOf('gid=')>-1){_initialHash=_initialHash.split('&gid=')[0];_initialHash=_initialHash.split('?gid=')[0]}_listen('afterChange',self.updateURL);_listen('unbindEvents',function(){framework.unbind(window,'hashchange',self.onHashChange)});var returnToOriginal=function returnToOriginal(){_hashReseted=true;if(!_closedFromURL){if(_urlChangedOnce){history.back()}else{if(_initialHash){_windowLoc.hash=_initialHash}else{if(_supportsPushState){history.pushState('',document.title,_windowLoc.pathname+_windowLoc.search)}else{_windowLoc.hash=''}}}}_cleanHistoryTimeouts()};_listen('unbindEvents',function(){if(_closedByScroll){returnToOriginal()}});_listen('destroy',function(){if(!_hashReseted){returnToOriginal()}});_listen('firstUpdate',function(){_currentItemIndex=_parseItemIndexFromURL().pid});var index=_initialHash.indexOf('pid=');if(index>-1){_initialHash=_initialHash.substring(0,index);if(_initialHash.slice(-1)==='&'){_initialHash=_initialHash.slice(0,-1)}}setTimeout(function(){if(_isOpen){framework.bind(window,'hashchange',self.onHashChange)}},40)},onHashChange:function onHashChange(){if(_getHash()===_initialHash){_closedFromURL=true;self.close();return}if(!_hashChangedByScript){_hashChangedByHistory=true;self.goTo(_parseItemIndexFromURL().pid);_hashChangedByHistory=false}},updateURL:function updateURL(){_cleanHistoryTimeouts();if(_hashChangedByHistory){return}if(!_historyChanged){_updateHash()}else{_historyUpdateTimeout=setTimeout(_updateHash,800)}}}});framework.extend(self,publicMethods)};return PhotoSwipe});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function(root,factory){module.exports={PhotoSwipeUI_Default:factory()}})(undefined,function(){'use strict';var PhotoSwipeUI_Default=function PhotoSwipeUI_Default(pswp,framework){var ui=this;var _overlayUIUpdated=false,_controlsVisible=true,_fullscrenAPI,_controls,_captionContainer,_fakeCaptionContainer,_indexIndicator,_shareButton,_shareModal,_shareModalHidden=true,_initalCloseOnScrollValue,_isIdle,_listen,_loadingIndicator,_loadingIndicatorHidden,_loadingIndicatorTimeout,_galleryHasOneSlide,_options,_defaultUIOptions={barsSize:{top:44,bottom:'auto'},closeElClasses:['item','caption','zoom-wrap','ui','top-bar'],timeToIdle:4000,timeToIdleOutside:1000,loadingIndicatorDelay:1000,addCaptionHTMLFn:function addCaptionHTMLFn(item,captionEl){if(!item.title){captionEl.children[0].innerHTML='';return false}captionEl.children[0].innerHTML=item.title;return true},closeEl:true,captionEl:true,fullscreenEl:true,zoomEl:true,shareEl:true,counterEl:true,arrowEl:true,preloaderEl:true,tapToClose:false,tapToToggleControls:true,clickToCloseNonZoomable:true,shareButtons:[{id:'facebook',label:'Share on Facebook',url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},{id:'twitter',label:'Tweet',url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},{id:'pinterest',label:'Pin it',url:'http://www.pinterest.com/pin/create/button/'+'?url={{url}}&media={{image_url}}&description={{text}}'},{id:'download',label:'Download image',url:'{{raw_image_url}}',download:true}],getImageURLForShare:function getImageURLForShare(){return pswp.currItem.src||''},getPageURLForShare:function getPageURLForShare(){return window.location.href},getTextForShare:function getTextForShare(){return pswp.currItem.title||''},indexIndicatorSep:' / ',fitControlsWidth:1200},_blockControlsTap,_blockControlsTapTimeout;var _onControlsTap=function _onControlsTap(e){if(_blockControlsTap){return true}e=e||window.event;if(_options.timeToIdle&&_options.mouseUsed&&!_isIdle){_onIdleMouseMove()}var target=e.target||e.srcElement,uiElement,clickedClass=target.getAttribute('class')||'',found;for(var i=0;i<_uiElements.length;i++){uiElement=_uiElements[i];if(uiElement.onTap&&clickedClass.indexOf('pswp__'+uiElement.name)>-1){uiElement.onTap();found=true}}if(found){if(e.stopPropagation){e.stopPropagation()}_blockControlsTap=true;var tapDelay=framework.features.isOldAndroid?600:30;_blockControlsTapTimeout=setTimeout(function(){_blockControlsTap=false},tapDelay)}},_fitControlsInViewport=function _fitControlsInViewport(){return!pswp.likelyTouchDevice||_options.mouseUsed||screen.width>_options.fitControlsWidth},_togglePswpClass=function _togglePswpClass(el,cName,add){framework[(add?'add':'remove')+'Class'](el,'pswp__'+cName)},_countNumItems=function _countNumItems(){var hasOneSlide=_options.getNumItemsFn()===1;if(hasOneSlide!==_galleryHasOneSlide){_togglePswpClass(_controls,'ui--one-slide',hasOneSlide);_galleryHasOneSlide=hasOneSlide}},_toggleShareModalClass=function _toggleShareModalClass(){_togglePswpClass(_shareModal,'share-modal--hidden',_shareModalHidden)},_toggleShareModal=function _toggleShareModal(){_shareModalHidden=!_shareModalHidden;if(!_shareModalHidden){_toggleShareModalClass();setTimeout(function(){if(!_shareModalHidden){framework.addClass(_shareModal,'pswp__share-modal--fade-in')}},30)}else{framework.removeClass(_shareModal,'pswp__share-modal--fade-in');setTimeout(function(){if(_shareModalHidden){_toggleShareModalClass()}},300)}if(!_shareModalHidden){_updateShareURLs()}return false},_openWindowPopup=function _openWindowPopup(e){e=e||window.event;var target=e.target||e.srcElement;pswp.shout('shareLinkClick',e,target);if(!target.href){return false}if(target.hasAttribute('download')){return true}window.open(target.href,'pswp_share','scrollbars=yes,resizable=yes,toolbar=no,'+'location=yes,width=550,height=420,top=100,left='+(window.screen?Math.round(screen.width/2-275):100));if(!_shareModalHidden){_toggleShareModal()}return false},_updateShareURLs=function _updateShareURLs(){var shareButtonOut='',shareButtonData,shareURL,image_url,page_url,share_text;for(var i=0;i<_options.shareButtons.length;i++){shareButtonData=_options.shareButtons[i];image_url=_options.getImageURLForShare(shareButtonData);page_url=_options.getPageURLForShare(shareButtonData);share_text=_options.getTextForShare(shareButtonData);shareURL=shareButtonData.url.replace('{{url}}',encodeURIComponent(page_url)).replace('{{image_url}}',encodeURIComponent(image_url)).replace('{{raw_image_url}}',image_url).replace('{{text}}',encodeURIComponent(share_text));shareButtonOut+='<a href="'+shareURL+'" target="_blank" '+'class="pswp__share--'+shareButtonData.id+'"'+(shareButtonData.download?'download':'')+'>'+shareButtonData.label+'</a>';if(_options.parseShareButtonOut){shareButtonOut=_options.parseShareButtonOut(shareButtonData,shareButtonOut)}}_shareModal.children[0].innerHTML=shareButtonOut;_shareModal.children[0].onclick=_openWindowPopup},_hasCloseClass=function _hasCloseClass(target){for(var i=0;i<_options.closeElClasses.length;i++){if(framework.hasClass(target,'pswp__'+_options.closeElClasses[i])){return true}}},_idleInterval,_idleTimer,_idleIncrement=0,_onIdleMouseMove=function _onIdleMouseMove(){clearTimeout(_idleTimer);_idleIncrement=0;if(_isIdle){ui.setIdle(false)}},_onMouseLeaveWindow=function _onMouseLeaveWindow(e){e=e?e:window.event;var from=e.relatedTarget||e.toElement;if(!from||from.nodeName==='HTML'){clearTimeout(_idleTimer);_idleTimer=setTimeout(function(){ui.setIdle(true)},_options.timeToIdleOutside)}},_setupFullscreenAPI=function _setupFullscreenAPI(){if(_options.fullscreenEl&&!framework.features.isOldAndroid){if(!_fullscrenAPI){_fullscrenAPI=ui.getFullscreenAPI()}if(_fullscrenAPI){framework.bind(document,_fullscrenAPI.eventK,ui.updateFullscreen);ui.updateFullscreen();framework.addClass(pswp.template,'pswp--supports-fs')}else{framework.removeClass(pswp.template,'pswp--supports-fs')}}},_setupLoadingIndicator=function _setupLoadingIndicator(){if(_options.preloaderEl){_toggleLoadingIndicator(true);_listen('beforeChange',function(){clearTimeout(_loadingIndicatorTimeout);_loadingIndicatorTimeout=setTimeout(function(){if(pswp.currItem&&pswp.currItem.loading){if(!pswp.allowProgressiveImg()||pswp.currItem.img&&!pswp.currItem.img.naturalWidth){_toggleLoadingIndicator(false)}}else{_toggleLoadingIndicator(true)}},_options.loadingIndicatorDelay)});_listen('imageLoadComplete',function(index,item){if(pswp.currItem===item){_toggleLoadingIndicator(true)}})}},_toggleLoadingIndicator=function _toggleLoadingIndicator(hide){if(_loadingIndicatorHidden!==hide){_togglePswpClass(_loadingIndicator,'preloader--active',!hide);_loadingIndicatorHidden=hide}},_applyNavBarGaps=function _applyNavBarGaps(item){var gap=item.vGap;if(_fitControlsInViewport()){var bars=_options.barsSize;if(_options.captionEl&&bars.bottom==='auto'){if(!_fakeCaptionContainer){_fakeCaptionContainer=framework.createEl('pswp__caption pswp__caption--fake');_fakeCaptionContainer.appendChild(framework.createEl('pswp__caption__center'));_controls.insertBefore(_fakeCaptionContainer,_captionContainer);framework.addClass(_controls,'pswp__ui--fit')}if(_options.addCaptionHTMLFn(item,_fakeCaptionContainer,true)){var captionSize=_fakeCaptionContainer.clientHeight;gap.bottom=parseInt(captionSize,10)||44}else{gap.bottom=bars.top}}else{gap.bottom=bars.bottom==='auto'?0:bars.bottom}gap.top=bars.top}else{gap.top=gap.bottom=0}},_setupIdle=function _setupIdle(){if(_options.timeToIdle){_listen('mouseUsed',function(){framework.bind(document,'mousemove',_onIdleMouseMove);framework.bind(document,'mouseout',_onMouseLeaveWindow);_idleInterval=setInterval(function(){_idleIncrement++;if(_idleIncrement===2){ui.setIdle(true)}},_options.timeToIdle/2)})}},_setupHidingControlsDuringGestures=function _setupHidingControlsDuringGestures(){_listen('onVerticalDrag',function(now){if(_controlsVisible&&now<0.95){ui.hideControls()}else if(!_controlsVisible&&now>=0.95){ui.showControls()}});var pinchControlsHidden;_listen('onPinchClose',function(now){if(_controlsVisible&&now<0.9){ui.hideControls();pinchControlsHidden=true}else if(pinchControlsHidden&&!_controlsVisible&&now>0.9){ui.showControls()}});_listen('zoomGestureEnded',function(){pinchControlsHidden=false;if(pinchControlsHidden&&!_controlsVisible){ui.showControls()}})};var _uiElements=[{name:'caption',option:'captionEl',onInit:function onInit(el){_captionContainer=el}},{name:'share-modal',option:'shareEl',onInit:function onInit(el){_shareModal=el},onTap:function onTap(){_toggleShareModal()}},{name:'button--share',option:'shareEl',onInit:function onInit(el){_shareButton=el},onTap:function onTap(){_toggleShareModal()}},{name:'button--zoom',option:'zoomEl',onTap:pswp.toggleDesktopZoom},{name:'counter',option:'counterEl',onInit:function onInit(el){_indexIndicator=el}},{name:'button--close',option:'closeEl',onTap:pswp.close},{name:'button--arrow--left',option:'arrowEl',onTap:pswp.prev},{name:'button--arrow--right',option:'arrowEl',onTap:pswp.next},{name:'button--fs',option:'fullscreenEl',onTap:function onTap(){if(_fullscrenAPI.isFullscreen()){_fullscrenAPI.exit()}else{_fullscrenAPI.enter()}}},{name:'preloader',option:'preloaderEl',onInit:function onInit(el){_loadingIndicator=el}}];var _setupUIElements=function _setupUIElements(){var item,classAttr,uiElement;var loopThroughChildElements=function loopThroughChildElements(sChildren){if(!sChildren){return}var l=sChildren.length;for(var i=0;i<l;i++){item=sChildren[i];classAttr=item.className;for(var a=0;a<_uiElements.length;a++){uiElement=_uiElements[a];if(classAttr.indexOf('pswp__'+uiElement.name)>-1){if(_options[uiElement.option]){framework.removeClass(item,'pswp__element--disabled');if(uiElement.onInit){uiElement.onInit(item)}}else{framework.addClass(item,'pswp__element--disabled')}}}}};loopThroughChildElements(_controls.children);var topBar=framework.getChildByClass(_controls,'pswp__top-bar');if(topBar){loopThroughChildElements(topBar.children)}};ui.init=function(){framework.extend(pswp.options,_defaultUIOptions,true);_options=pswp.options;_controls=framework.getChildByClass(pswp.scrollWrap,'pswp__ui');_listen=pswp.listen;_setupHidingControlsDuringGestures();_listen('beforeChange',ui.update);_listen('doubleTap',function(point){var initialZoomLevel=pswp.currItem.initialZoomLevel;if(pswp.getZoomLevel()!==initialZoomLevel){pswp.zoomTo(initialZoomLevel,point,333)}else{pswp.zoomTo(_options.getDoubleTapZoom(false,pswp.currItem),point,333)}});_listen('preventDragEvent',function(e,isDown,preventObj){var t=e.target||e.srcElement;if(t&&t.getAttribute('class')&&e.type.indexOf('mouse')>-1&&(t.getAttribute('class').indexOf('__caption')>0||/(SMALL|STRONG|EM)/i.test(t.tagName))){preventObj.prevent=false}});_listen('bindEvents',function(){framework.bind(_controls,'pswpTap click',_onControlsTap);framework.bind(pswp.scrollWrap,'pswpTap',ui.onGlobalTap);if(!pswp.likelyTouchDevice){framework.bind(pswp.scrollWrap,'mouseover',ui.onMouseOver)}});_listen('unbindEvents',function(){if(!_shareModalHidden){_toggleShareModal()}if(_idleInterval){clearInterval(_idleInterval)}framework.unbind(document,'mouseout',_onMouseLeaveWindow);framework.unbind(document,'mousemove',_onIdleMouseMove);framework.unbind(_controls,'pswpTap click',_onControlsTap);framework.unbind(pswp.scrollWrap,'pswpTap',ui.onGlobalTap);framework.unbind(pswp.scrollWrap,'mouseover',ui.onMouseOver);if(_fullscrenAPI){framework.unbind(document,_fullscrenAPI.eventK,ui.updateFullscreen);if(_fullscrenAPI.isFullscreen()){_options.hideAnimationDuration=0;_fullscrenAPI.exit()}_fullscrenAPI=null}});_listen('destroy',function(){if(_options.captionEl){if(_fakeCaptionContainer){_controls.removeChild(_fakeCaptionContainer)}framework.removeClass(_captionContainer,'pswp__caption--empty')}if(_shareModal){_shareModal.children[0].onclick=null}framework.removeClass(_controls,'pswp__ui--over-close');framework.addClass(_controls,'pswp__ui--hidden');ui.setIdle(false)});if(!_options.showAnimationDuration){framework.removeClass(_controls,'pswp__ui--hidden')}_listen('initialZoomIn',function(){if(_options.showAnimationDuration){framework.removeClass(_controls,'pswp__ui--hidden')}});_listen('initialZoomOut',function(){framework.addClass(_controls,'pswp__ui--hidden')});_listen('parseVerticalMargin',_applyNavBarGaps);_setupUIElements();if(_options.shareEl&&_shareButton&&_shareModal){_shareModalHidden=true}_countNumItems();_setupIdle();_setupFullscreenAPI();_setupLoadingIndicator()};ui.setIdle=function(isIdle){_isIdle=isIdle;_togglePswpClass(_controls,'ui--idle',isIdle)};ui.update=function(){if(_controlsVisible&&pswp.currItem){ui.updateIndexIndicator();if(_options.captionEl){_options.addCaptionHTMLFn(pswp.currItem,_captionContainer);_togglePswpClass(_captionContainer,'caption--empty',!pswp.currItem.title)}_overlayUIUpdated=true}else{_overlayUIUpdated=false}if(!_shareModalHidden){_toggleShareModal()}_countNumItems()};ui.updateFullscreen=function(e){if(e){setTimeout(function(){pswp.setScrollOffset(0,framework.getScrollY())},50)}framework[(_fullscrenAPI.isFullscreen()?'add':'remove')+'Class'](pswp.template,'pswp--fs')};ui.updateIndexIndicator=function(){if(_options.counterEl){_indexIndicator.innerHTML=pswp.getCurrentIndex()+1+_options.indexIndicatorSep+_options.getNumItemsFn()}};ui.onGlobalTap=function(e){e=e||window.event;var target=e.target||e.srcElement;if(_blockControlsTap){return}if(e.detail&&e.detail.pointerType==='mouse'&&e.detail.origEvent.button!==2){if(_hasCloseClass(target)){pswp.close();return}if(framework.hasClass(target,'pswp__img')){if(pswp.getZoomLevel()===1&&pswp.getZoomLevel()<=pswp.currItem.fitRatio){if(_options.clickToCloseNonZoomable){pswp.close()}}else{pswp.toggleDesktopZoom(e.detail.releasePoint)}}}else{if(_options.tapToToggleControls){if(_controlsVisible){ui.hideControls()}else{ui.showControls()}}if(_options.tapToClose&&(framework.hasClass(target,'pswp__img')||_hasCloseClass(target))){pswp.close();return}}};ui.onMouseOver=function(e){e=e||window.event;var target=e.target||e.srcElement;_togglePswpClass(_controls,'ui--over-close',_hasCloseClass(target))};ui.hideControls=function(){framework.addClass(_controls,'pswp__ui--hidden');_controlsVisible=false};ui.showControls=function(){_controlsVisible=true;if(!_overlayUIUpdated){ui.update()}framework.removeClass(_controls,'pswp__ui--hidden')};ui.supportsFullscreen=function(){var d=document;return!!(d.exitFullscreen||d.mozCancelFullScreen||d.webkitExitFullscreen||d.msExitFullscreen)};ui.getFullscreenAPI=function(){var dE=document.documentElement,api,tF='fullscreenchange';if(dE.requestFullscreen){api={enterK:'requestFullscreen',exitK:'exitFullscreen',elementK:'fullscreenElement',eventK:tF}}else if(dE.mozRequestFullScreen){api={enterK:'mozRequestFullScreen',exitK:'mozCancelFullScreen',elementK:'mozFullScreenElement',eventK:'moz'+tF}}else if(dE.webkitRequestFullscreen){api={enterK:'webkitRequestFullscreen',exitK:'webkitExitFullscreen',elementK:'webkitFullscreenElement',eventK:'webkit'+tF}}else if(dE.msRequestFullscreen){api={enterK:'msRequestFullscreen',exitK:'msExitFullscreen',elementK:'msFullscreenElement',eventK:'MSFullscreenChange'}}if(api){api.enter=function(){_initalCloseOnScrollValue=_options.closeOnScroll;_options.closeOnScroll=false;if(this.enterK==='webkitRequestFullscreen'){pswp.template[this.enterK](Element.ALLOW_KEYBOARD_INPUT)}else{return pswp.template[this.enterK]()}};api.exit=function(){_options.closeOnScroll=_initalCloseOnScrollValue;return document[this.exitK]()};api.isFullscreen=function(){return document[this.elementK]}}return api}};return PhotoSwipeUI_Default});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _getPrototypeOf=__webpack_require__(12);var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _possibleConstructorReturn2=__webpack_require__(17);var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=__webpack_require__(19);var _inherits3=_interopRequireDefault(_inherits2);var _dtsModal=__webpack_require__(20);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DtsModalQuickBuy=function(_DtsModal){(0,_inherits3.default)(DtsModalQuickBuy,_DtsModal);function DtsModalQuickBuy(triggerId,contentId,cancelButtonId){var _this;(0,_classCallCheck3.default)(this,DtsModalQuickBuy);return _this=(0,_possibleConstructorReturn3.default)(this,(DtsModalQuickBuy.__proto__||(0,_getPrototypeOf2.default)(DtsModalQuickBuy)).call(this,triggerId,{contentId:contentId,removeDefaultContentStyles:true,disableDefaultCloser:true,disableTouchshieldClose:true,closers:[cancelButtonId],postProcess:function postProcess(){var qbForm=_this.modalContentWrapper.querySelector('form');var returnUrl=encodeURIComponent(location.pathname+location.search);if(qbForm&&qbForm.action&&qbForm.action.substr(-3)=='?f='){qbForm.action+=returnUrl}}}))}return DtsModalQuickBuy}(_dtsModal.DtsModal);module.exports={DtsModalQuickBuy:DtsModalQuickBuy};

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);var _dts=__webpack_require__(3);var dts=_interopRequireWildcard(_dts);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key]}}newObj.default=obj;return newObj}}function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var PanningIconsControl=function(){function PanningIconsControl(){var _this=this;(0,_classCallCheck3.default)(this,PanningIconsControl);this.queues=document.querySelectorAll('.queue_control_container');if(this.queues){this.queues.forEach(function(queue){_this.notLazy=queue.querySelectorAll('.dts-collection-item:not([data-loc])');if(_this.notLazy){_this.notLazyWidth=0;for(var i=0;i<_this.notLazy.length;i++){_this.notLazyWidth+=_this.notLazy[i].offsetWidth};if(_this.notLazyWidth>=window.innerWidth){_this.panningIcon=queue.querySelector('.dts-panning-icon');if(_this.panningIcon!=null){if(_this.panningIcon.parentElement){_this.panningIcon.parentElement.style.display='block';_this.panningIcon.parentElement.style.zIndex=1000}}}}dts.common.events.eventListenerUtility(queue,['scroll'],_this.hidePanningIcons,true)})}}(0,_createClass3.default)(PanningIconsControl,[{key:'hidePanningIcons',value:function hidePanningIcons(){var panningIcons=document.querySelectorAll('.dts-panning-icon');for(var i=0;i<panningIcons.length;i++){panningIcons[i].style.display='none'}dts.common.cookie.writeCookie('hide-panning-icon','1')}}]);return PanningIconsControl}();module.exports={PanningIconsControl:PanningIconsControl};

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var _classCallCheck2=__webpack_require__(0);var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=__webpack_require__(1);var _createClass3=_interopRequireDefault(_createClass2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var MobileNavigationBehavior=function(){function MobileNavigationBehavior(mobileNavigationDrawer,isMember,elementIds,elementSelectors){(0,_classCallCheck3.default)(this,MobileNavigationBehavior);this.mobileNavigationDrawer=mobileNavigationDrawer;this.isMember=isMember;this.mobileMenuFooter=document.getElementById(elementIds.footerId);this.mobileNav=document.getElementById(elementIds.mobileNavId);this.mobileNavContents=document.getElementById(elementIds.contentWrapperId);this.logoutBtn=document.getElementById(elementIds.logoutBtnId);this.logoutBtnWrapper=this.logoutBtn.parentNode;this.mobileCategoryMenuTrigger=document.getElementById(elementIds.mobileCategoryMenuTriggerId);this.mobileNavigationIcon=document.getElementById(elementIds.mobileNavigationIconId);this.selectors=elementSelectors;if(this.isMember==='true'){this.mobileMyAccountMenuTrigger=document.getElementById(elementIds.mobileMyAccountMenuTriggerId)}else{if(!this.logoutBtnWrapper.classList.contains(this.selectors.hideLogout)){this.logoutBtnWrapper.classList.add(this.selectors.hideLogout)}}this.init()}(0,_createClass3.default)(MobileNavigationBehavior,[{key:'init',value:function init(){this.mobileNavigationIcon.addEventListener('keypress',this.toggleMenu.bind(this),false);this.mobileNavigationIcon.addEventListener('click',this.scrollDisplay.bind(this),false);this.mobileCategoryMenuTrigger.addEventListener('click',this.toggleSubMenu.bind(this),false);if(this.isMember==='true'){this.mobileMyAccountMenuTrigger.addEventListener('click',this.toggleSubMenu.bind(this),false)}}},{key:'toggleMenu',value:function toggleMenu(e){if(e.keyCode&&e.keyCode==13){if(this.mobileNavigationDrawer.component.style.display=='none'){this.mobileNavigationDrawer.setComponentPosition();this.mobileNavigationDrawer.openComponent()}else{this.mobileNavigationDrawer.closeComponent()}}}},{key:'scrollDisplay',value:function scrollDisplay(){if(this.mobileNavContents.offsetHeight>=this.mobileNav.offsetHeight){this.mobileMenuFooter.style.display='block'}else{this.mobileMenuFooter.style.display='none'}if(this.isMember==='true'){this.fixLogoutBtn(this.mobileMenuFooter.style.display)}}},{key:'fixLogoutBtn',value:function fixLogoutBtn(isScrollIconVisible){if(isScrollIconVisible==='block'&&this.logoutBtnWrapper.classList.contains(this.selectors.mobileMenuLogoutFixed)){this.logoutBtnWrapper.classList.remove(this.selectors.mobileMenuLogoutFixed)}if(isScrollIconVisible==='none'&&!this.logoutBtnWrapper.classList.contains(this.selectors.mobileMenuLogoutFixed)){this.logoutBtnWrapper.classList.add(this.selectors.mobileMenuLogoutFixed)}}},{key:'toggleSubMenu',value:function toggleSubMenu(e){if(e){e.stopPropagation();var elSubMenu=e.currentTarget.parentElement.nextElementSibling.firstElementChild;var elOpenedIcon=e.currentTarget.querySelector(this.selectors.mobileOpenedIcon);var elClosedIcon=e.currentTarget.querySelector(this.selectors.mobileClosedIcon);if(elSubMenu.style.display=='block'){elSubMenu.style.display='none';elOpenedIcon.style.display='none';elClosedIcon.style.display='inline-block'}else{elSubMenu.style.display='block';elOpenedIcon.style.display='inline-block';elClosedIcon.style.display='none'}this.scrollDisplay()}}}]);return MobileNavigationBehavior}();module.exports={MobileNavigationBehavior:MobileNavigationBehavior};

/***/ })
/******/ ]);
//# sourceMappingURL=main.bundle.js.map