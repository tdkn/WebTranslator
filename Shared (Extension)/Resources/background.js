/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background/translator.js":
/*!**************************************!*\
  !*** ./src/background/translator.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Translator": () => (/* binding */ Translator)
/* harmony export */ });


function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
var _id = /*#__PURE__*/new WeakMap();
var _sourceLanguage = /*#__PURE__*/new WeakMap();
var _targetLanguage = /*#__PURE__*/new WeakMap();
class Translator {
  constructor() {
    _classPrivateFieldInitSpec(this, _id, {
      writable: true,
      value: 1e4 * Math.round(1e4 * Math.random())
    });
    _classPrivateFieldInitSpec(this, _sourceLanguage, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _targetLanguage, {
      writable: true,
      value: void 0
    });
  }
  setSourceLanguage(sourceLanguage) {
    _classPrivateFieldSet(this, _sourceLanguage, sourceLanguage);
  }
  setTargetLanguage(targetLanguage) {
    _classPrivateFieldSet(this, _targetLanguage, targetLanguage);
  }
  async translate(texts) {
    var _this$id, _this$id2;
    let isHtmlEnabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    _classPrivateFieldSet(this, _id, (_this$id = _classPrivateFieldGet(this, _id), _this$id2 = _this$id++, _this$id)), _this$id2;
    let n = 1;
    for (const text of texts) {
      for (let i = 0; i < text.length; i++) {
        if (text[i] === "i") {
          n++;
        }
      }
    }
    let timestamp = Date.now();
    timestamp = timestamp - timestamp % n + n;
    let body = JSON.stringify({
      jsonrpc: "2.0",
      method: "LMT_handle_texts",
      params: {
        texts: texts.map(text => {
          return {
            text
          };
        }),
        html: isHtmlEnabled ? "enabled" : undefined,
        splitting: isHtmlEnabled ? undefined : "newlines",
        lang: {
          target_lang: _classPrivateFieldGet(this, _targetLanguage),
          source_lang_user_selected: _classPrivateFieldGet(this, _sourceLanguage) || "auto"
        },
        timestamp
      },
      id: _classPrivateFieldGet(this, _id)
    });
    body = body.replace(`"method":"`, `${(_classPrivateFieldGet(this, _id) + 3) % 13 === 0 || (_classPrivateFieldGet(this, _id) + 5) % 29 === 0 ? `"method" : "` : `"method": "`}`);
    const request = {
      method: isHtmlEnabled ? "translate" : "translateSelection",
      payload: {
        headers: {
          Accept: "*/*",
          "x-app-os-name": "iOS",
          "Accept-Encoding": "gzip, deflate, br",
          "Content-Type": "application/json",
          Referer: "https://www.deepl.com/"
        },
        method: "POST",
        body: body
      }
    };
    return new Promise(resolve => {
      browser.runtime.sendNativeMessage("application.id", request, response => {
        if (response && response.result) {
          resolve(response.result);
        } else {
          resolve(undefined);
        }
      });
    });
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************************!*\
  !*** ./src/background/background.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _translator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./translator */ "./src/background/translator.js");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _selectionText = /*#__PURE__*/new WeakMap();
var _init = /*#__PURE__*/new WeakSet();
var _setupListeners = /*#__PURE__*/new WeakSet();
var _setupContextMenu = /*#__PURE__*/new WeakSet();
var _translateSelection = /*#__PURE__*/new WeakSet();
class App {
  constructor() {
    _classPrivateMethodInitSpec(this, _translateSelection);
    _classPrivateMethodInitSpec(this, _setupContextMenu);
    _classPrivateMethodInitSpec(this, _setupListeners);
    _classPrivateMethodInitSpec(this, _init);
    _classPrivateFieldInitSpec(this, _selectionText, {
      writable: true,
      value: undefined
    });
    _classPrivateMethodGet(this, _init, _init2).call(this);
  }
}
function _init2() {
  _classPrivateMethodGet(this, _setupListeners, _setupListeners2).call(this);
  _classPrivateMethodGet(this, _setupContextMenu, _setupContextMenu2).call(this);
}
function _setupListeners2() {
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request) {
      return;
    }
    switch (request.method) {
      case "translate":
        {
          const texts = request.texts;
          translate(texts, request.sourceLanguage, request.targetLanguage).then(result => {
            sendResponse({
              result
            });
          }).catch(error => {
            sendResponse();
          });
          break;
        }
      case "translateSelection":
        {
          const selectionText = _classPrivateFieldGet(this, _selectionText);
          if (request.selectionText && request.selectionText.trim()) {
            // From popup toolbar (Mobile only)
            _classPrivateMethodGet(this, _translateSelection, _translateSelection2).call(this, request.selectionText);
          } else if (selectionText && selectionText.trim()) {
            // Language changed in popover window
            _classPrivateMethodGet(this, _translateSelection, _translateSelection2).call(this, selectionText);
          }
          sendResponse();
          break;
        }
      default:
        {
          sendResponse();
          break;
        }
    }
    return true;
  });
}
function _setupContextMenu2() {
  if (browser.menus.create) {
    browser.menus.create({
      id: "translateSelection",
      title: browser.i18n.getMessage("context_menus_translate_section"),
      contexts: ["editable", "link", "page", "selection"]
    });
    browser.menus.onClicked.addListener(async (info, tab) => {
      switch (info.menuItemId) {
        case "translateSelection":
          const selectionText = info.selectionText;
          if (selectionText && selectionText.trim()) {
            _classPrivateMethodGet(this, _translateSelection, _translateSelection2).call(this, selectionText);
          }
      }
    });
  }
}
async function _translateSelection2(selectionText) {
  const results = await browser.tabs.executeScript({
    code: `if (!window.customElements.get("translate-popover")) { true; }`
  });
  if (results && results[0]) {
    await browser.tabs.executeScript({
      file: "/translate_ui.js"
    });
  }
  const tabs = await browser.tabs.query({
    active: true,
    currentWindow: true
  });
  const response = await browser.tabs.sendMessage(tabs[0].id, {
    method: "ping"
  });
  if (!response) {
    await browser.tabs.executeScript({
      file: "/translate.js"
    });
  }
  _classPrivateFieldSet(this, _selectionText, selectionText);
  const targetLanguage = await getTargetLanguage();
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      method: "startTranslateSelection",
      selectionText
    });
  });
  const result = await translate([selectionText], undefined, targetLanguage, false);
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      method: "finishTranslateSelection",
      result,
      targetLanguage
    });
  });
  browser.runtime.sendMessage({
    method: "finishTranslateSelection"
  });
}
async function translate(texts, sourceLanguage, targetLanguage) {
  let isHtmlEnabled = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const translator = new _translator__WEBPACK_IMPORTED_MODULE_0__.Translator();
  translator.setSourceLanguage(sourceLanguage);
  translator.setTargetLanguage(targetLanguage);
  const result = await translator.translate(texts, isHtmlEnabled);
  return result;
}
async function getTargetLanguage() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get(["selectedTargetLanguage"], result => {
      if (result && result.selectedTargetLanguage) {
        resolve(result.selectedTargetLanguage);
      } else {
        const locale = browser.i18n.getUILanguage().split("-").shift().toUpperCase();
        resolve(locale);
      }
    });
  });
}
new App();
})();

/******/ })()
;
//# sourceMappingURL=background.js.map