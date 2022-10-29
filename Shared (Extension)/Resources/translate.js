/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/utils.js":
/*!******************************!*\
  !*** ./src/content/utils.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "escapeHTML": () => (/* binding */ escapeHTML),
/* harmony export */   "hasInlineElement": () => (/* binding */ hasInlineElement),
/* harmony export */   "hasTextNode": () => (/* binding */ hasTextNode),
/* harmony export */   "isTouchDevice": () => (/* binding */ isTouchDevice),
/* harmony export */   "isVisible": () => (/* binding */ isVisible),
/* harmony export */   "once": () => (/* binding */ once),
/* harmony export */   "scrollDidStop": () => (/* binding */ scrollDidStop)
/* harmony export */ });


function isVisible(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.left <= window.innerWidth;
}
function hasTextNode(element) {
  const childNodes = element.childNodes;
  if (childNodes.length === 0) {
    return false;
  }
  return childNodes[0].nodeType === Node.TEXT_NODE && childNodes[0].nodeValue.trim() !== "";
}
function hasInlineElement(element) {
  const children = element.children;
  if (!children || children.length === 0) {
    return false;
  }
  for (const child of children) {
    const display = getComputedStyle(child).display;
    if (display === "inline" || display === "inline-block") {
      return true;
    }
  }
}
function scrollDidStop(callback) {
  let refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  let isScrolling;
  window.addEventListener("scroll", function (event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(callback, refresh);
  }, {
    once: false,
    passive: true,
    capture: true
  });
}
function once(fn, context) {
  let result;
  return function () {
    if (fn) {
      result = fn.apply(context || this, arguments);
      fn = undefined;
    }
    return result;
  };
}
function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
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
/*!**********************************!*\
  !*** ./src/content/translate.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/content/utils.js");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

var _uid = /*#__PURE__*/new WeakMap();
var _sourceLanguage = /*#__PURE__*/new WeakMap();
var _targetLanguage = /*#__PURE__*/new WeakMap();
var _originalTexts = /*#__PURE__*/new WeakMap();
var _translatedTexts = /*#__PURE__*/new WeakMap();
var _toast = /*#__PURE__*/new WeakMap();
var _isProcessing = /*#__PURE__*/new WeakMap();
var _shouldProcessAfterScrolling = /*#__PURE__*/new WeakMap();
var _isShowingOriginal = /*#__PURE__*/new WeakMap();
var _translatePage = /*#__PURE__*/new WeakSet();
var _startTranslation = /*#__PURE__*/new WeakSet();
var _cancelTranslation = /*#__PURE__*/new WeakSet();
var _finishTranslation = /*#__PURE__*/new WeakSet();
class App {
  constructor() {
    _classPrivateMethodInitSpec(this, _finishTranslation);
    _classPrivateMethodInitSpec(this, _cancelTranslation);
    _classPrivateMethodInitSpec(this, _startTranslation);
    _classPrivateMethodInitSpec(this, _translatePage);
    _classPrivateFieldInitSpec(this, _uid, {
      writable: true,
      value: 1
    });
    _classPrivateFieldInitSpec(this, _sourceLanguage, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _targetLanguage, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _originalTexts, {
      writable: true,
      value: {}
    });
    _classPrivateFieldInitSpec(this, _translatedTexts, {
      writable: true,
      value: {}
    });
    _classPrivateFieldInitSpec(this, _toast, {
      writable: true,
      value: undefined
    });
    _classPrivateFieldInitSpec(this, _isProcessing, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _shouldProcessAfterScrolling, {
      writable: true,
      value: false
    });
    _classPrivateFieldInitSpec(this, _isShowingOriginal, {
      writable: true,
      value: false
    });
  }
  setup() {
    browser.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
      if (!request) {
        return;
      }
      switch (request.method) {
        case "translate":
          {
            _classPrivateFieldSet(this, _shouldProcessAfterScrolling, true);
            await _classPrivateMethodGet(this, _translatePage, _translatePage2).call(this, request);
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.once)((0,_utils__WEBPACK_IMPORTED_MODULE_0__.scrollDidStop)(async () => {
              if (_classPrivateFieldGet(this, _shouldProcessAfterScrolling)) {
                await _classPrivateMethodGet(this, _translatePage, _translatePage2).call(this, {
                  sourceLanguage: _classPrivateFieldGet(this, _sourceLanguage),
                  targetLanguage: _classPrivateFieldGet(this, _targetLanguage)
                });
              }
            }, 500))();
            sendResponse();
            break;
          }
        case "getContentState":
          {
            if (_classPrivateFieldGet(this, _isProcessing)) {
              sendResponse({
                result: {
                  isProcessing: _classPrivateFieldGet(this, _isProcessing)
                }
              });
            } else if (Object.keys(_classPrivateFieldGet(this, _originalTexts)).length > 0) {
              sendResponse({
                result: {
                  sourceLanguage: _classPrivateFieldGet(this, _sourceLanguage),
                  targetLanguage: _classPrivateFieldGet(this, _targetLanguage),
                  isShowingOriginal: _classPrivateFieldGet(this, _isShowingOriginal)
                }
              });
            } else {
              sendResponse(undefined);
            }
            break;
          }
        case "showOriginal":
          {
            _classPrivateFieldSet(this, _shouldProcessAfterScrolling, false);
            _classPrivateFieldSet(this, _isShowingOriginal, true);
            const elements = document.querySelectorAll('[data-wtdl-translated="true"]');
            for (const element of elements) {
              const uid = element.dataset.wtdlUid;
              const originalText = _classPrivateFieldGet(this, _originalTexts)[uid];
              element.innerHTML = originalText;
              element.dataset.wtdlTranslated = "false";
            }
            sendResponse();
            break;
          }
        case "startTranslateSelection":
          {
            const selection = window.getSelection();
            const textRange = selection.getRangeAt(0);
            const selectionRect = textRange.getBoundingClientRect();
            const x = selectionRect.left + window.scrollX;
            const y = selectionRect.bottom + window.scrollY + 30;
            const position = getExistingPopoverPosition();
            const popover = createPopover(position || {
              x,
              y
            });
            popover.setAttribute("loading", true);
            sendResponse();
            break;
          }
        case "finishTranslateSelection":
          {
            const result = request.result;
            const popover = document.getElementById("translate-popover");
            if (popover) {
              if (result.result && result.result.texts) {
                const text = result.result.texts.map(t => t.text).join("\n");
                popover.setAttribute("result", `${text}`);
                popover.setAttribute("lang", `${request.targetLanguage || ""}`);
              } else {
                if (result.error) {
                  const message = browser.i18n.getMessage("error_message_generic_error");
                  popover.setAttribute("error", message);
                } else {
                  const message = browser.i18n.getMessage("error_message_generic_error");
                  popover.setAttribute("error", message);
                }
              }
              popover.setAttribute("loading", false);
            }
            sendResponse();
            break;
          }
        case "ping":
          {
            sendResponse({
              result: "pong"
            });
            break;
          }
        default:
          {
            sendResponse();
            break;
          }
      }
    });
  }
}
async function _translatePage2(request) {
  const translatedElements = document.querySelectorAll('[data-wtdl-translated="false"]');
  if (_classPrivateFieldGet(this, _targetLanguage) === request.targetLanguage) {
    // Restore translated texts
    for (const element of translatedElements) {
      const uid = element.dataset.wtdlUid;
      const translatedText = _classPrivateFieldGet(this, _translatedTexts)[uid];
      element.innerHTML = translatedText;
      element.dataset.wtdlTranslated = "true";
    }
  }
  const visibleElements = await collectVisibleElements();
  if (visibleElements.length === 0) {
    _classPrivateMethodGet(this, _cancelTranslation, _cancelTranslation2).call(this);
    return;
  }
  _classPrivateMethodGet(this, _startTranslation, _startTranslation2).call(this);
  const texts = visibleElements.map(element => element.text);
  const response = await browser.runtime.sendMessage({
    method: "translate",
    texts,
    sourceLanguage: request.sourceLanguage,
    targetLanguage: request.targetLanguage
  });
  if (response && response.result) {
    const result = response.result.result;
    if (result && result.texts) {
      _classPrivateFieldSet(this, _sourceLanguage, result.lang);
      _classPrivateFieldSet(this, _targetLanguage, request.targetLanguage);
      const translatedTexts = result.texts;
      if (translatedTexts.length === visibleElements.length) {
        for (let i = 0; i < visibleElements.length; i++) {
          var _this$uid, _this$uid2;
          const element = visibleElements[i].element;
          const text = translatedTexts[i].text;
          const uid = element.dataset.wtdlUid || (_classPrivateFieldSet(this, _uid, (_this$uid = _classPrivateFieldGet(this, _uid), _this$uid2 = _this$uid++, _this$uid)), _this$uid2);
          if (element.dataset.wtdlOriginal !== "true") {
            _classPrivateFieldGet(this, _originalTexts)[uid] = element.innerHTML;
          }
          _classPrivateFieldGet(this, _translatedTexts)[uid] = text;
          element.innerHTML = text;
          element.dataset.wtdlUid = `${uid}`;
          element.dataset.wtdlOriginal = "true";
          element.dataset.wtdlTranslated = "true";
        }
      }
    }
  }
  _classPrivateMethodGet(this, _finishTranslation, _finishTranslation2).call(this);
}
function _startTranslation2() {
  _classPrivateFieldSet(this, _toast, createToast());
  _classPrivateFieldGet(this, _toast).setAttribute("show", true);
  _classPrivateFieldSet(this, _isProcessing, true);
  _classPrivateFieldSet(this, _isShowingOriginal, false);
  browser.runtime.sendMessage({
    method: "startTranslation"
  });
}
function _cancelTranslation2() {
  _classPrivateFieldSet(this, _isShowingOriginal, false);
  browser.runtime.sendMessage({
    method: "cancelTranslation",
    result: {
      sourceLanguage: _classPrivateFieldGet(this, _sourceLanguage),
      targetLanguage: _classPrivateFieldGet(this, _targetLanguage)
    }
  });
}
function _finishTranslation2() {
  _classPrivateFieldSet(this, _isProcessing, false);
  _classPrivateFieldGet(this, _toast).setAttribute("dismiss", true);
  browser.runtime.sendMessage({
    method: "finishTranslation",
    result: {
      sourceLanguage: _classPrivateFieldGet(this, _sourceLanguage),
      targetLanguage: _classPrivateFieldGet(this, _targetLanguage)
    }
  });
}
async function collectVisibleElements() {
  const blockElements = [];
  const children = document.body.children;
  splitElements(children, blockElements);
  const visibleElements = [];
  for (const element of blockElements) {
    const visible = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.isVisible)(element);
    if (visible && (element.dataset.wtdlUid === undefined || element.dataset.wtdlTranslated === "false")) {
      visibleElements.push({
        element,
        text: element.innerHTML
      });
    }
  }
  return visibleElements;
}
function splitElements(elements, storage) {
  for (const element of elements) {
    if (element.nodeName !== "STYLE" && element.nodeName !== "META" && element.nodeName !== "LINK" && element.nodeName !== "SCRIPT" && element.nodeName !== "svg" && ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.hasTextNode)(element) || (0,_utils__WEBPACK_IMPORTED_MODULE_0__.hasInlineElement)(element)) && element.clientTop < window.innerHeight) {
      storage.push(element);
    } else {
      const children = element.children;
      if (!children || children.length === 0) {
        continue;
      }
      splitElements(element.children, storage);
    }
  }
}
function createToast() {
  const id = "translate-toast";
  {
    const toast = document.getElementById(id);
    if (toast) {
      toast.remove();
    }
  }
  document.body.insertAdjacentHTML("beforeend", `<translate-toast id="${id}"></translate-toast>`);
  const toast = document.getElementById(id);
  return toast;
}
function createPopover(position) {
  const id = "translate-popover";
  {
    const popover = document.getElementById(id);
    if (popover) {
      popover.remove();
    }
  }
  document.body.insertAdjacentHTML("beforeend", `<translate-popover id="${id}"></translate-popover>`);
  const popover = document.getElementById(id);
  popover.setAttribute("position", JSON.stringify(position));
  const onClick = event => {
    if (event.target.closest(id)) {
      return;
    }
    popover.remove();
    document.removeEventListener("click", onClick);
  };
  document.addEventListener("click", onClick);
  popover.addEventListener("close", async () => {
    popover.remove();
    document.removeEventListener("click", onClick);
  });
  popover.addEventListener("change", async event => {
    if (!event.detail) {
      return;
    }
    await browser.storage.local.set({
      selectedSourceLanguage: undefined,
      selectedTargetLanguage: event.detail.selectedTargetLanguage
    });
    const request = {
      method: "translateSelection",
      selectionText: undefined
    };
    browser.runtime.sendMessage(request);
  });
  return popover;
}
function getExistingPopoverPosition() {
  const id = "translate-popover";
  const popover = document.getElementById(id);
  if (popover) {
    return popover.getPosition();
  }
  return undefined;
}
const app = new App();
app.setup();
})();

/******/ })()
;
//# sourceMappingURL=translate.js.map