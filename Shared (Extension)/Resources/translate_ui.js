/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/content/draggable.js":
/*!**********************************!*\
  !*** ./src/content/draggable.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeDraggable": () => (/* binding */ makeDraggable)
/* harmony export */ });


function makeDraggable(element, dragzone) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  const dragMouseDown = event => {
    event.preventDefault();
    pos3 = event.clientX || event.touches[0].clientX;
    pos4 = event.clientY || event.touches[0].clientY;
    document.addEventListener("pointermove", dragMouseMove);
    document.addEventListener("pointerup", dragMouseUp);
  };
  const dragMouseMove = event => {
    event.preventDefault();
    pos1 = pos3 - (event.clientX || event.touches[0].clientX);
    pos2 = pos4 - (event.clientY || event.touches[0].clientY);
    pos3 = event.clientX || event.touches[0].clientX;
    pos4 = event.clientY || event.touches[0].clientY;
    element.style.top = `${element.offsetTop - pos2}px`;
    element.style.left = `${element.offsetLeft - pos1}px`;
  };
  const dragMouseUp = () => {
    document.removeEventListener("pointermove", dragMouseMove);
    document.removeEventListener("pointerup", dragMouseUp);
  };
  dragzone.onmousedown = dragMouseDown;
  dragzone.ontouchstart = dragMouseDown;
}

/***/ }),

/***/ "./src/content/popover.js":
/*!********************************!*\
  !*** ./src/content/popover.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Popover": () => (/* binding */ Popover)
/* harmony export */ });
/* harmony import */ var _nord_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nord.css */ "./src/content/nord.css");
/* harmony import */ var _nordhealth_components_lib_Banner__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nordhealth/components/lib/Banner */ "./node_modules/@nordhealth/components/lib/Banner.js");
/* harmony import */ var _nordhealth_components_lib_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nordhealth/components/lib/Button */ "./node_modules/@nordhealth/components/lib/Button.js");
/* harmony import */ var _nordhealth_components_lib_Divider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nordhealth/components/lib/Divider */ "./node_modules/@nordhealth/components/lib/Divider.js");
/* harmony import */ var _nordhealth_components_lib_Icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nordhealth/components/lib/Icon */ "./node_modules/@nordhealth/components/lib/Icon.js");
/* harmony import */ var _nordhealth_components_lib_Select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nordhealth/components/lib/Select */ "./node_modules/@nordhealth/components/lib/Select.js");
/* harmony import */ var _nordhealth_components_lib_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @nordhealth/components/lib/Spinner */ "./node_modules/@nordhealth/components/lib/Spinner.js");
/* harmony import */ var _nordhealth_components_lib_Stack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @nordhealth/components/lib/Stack */ "./node_modules/@nordhealth/components/lib/Stack.js");
/* harmony import */ var _shared_supported_languages__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../shared/supported_languages */ "./src/shared/supported_languages.js");
/* harmony import */ var _draggable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./draggable */ "./src/content/draggable.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./utils */ "./src/content/utils.js");
/* harmony import */ var _shared_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/utils */ "./src/shared/utils.js");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }












const template = `<style>
  * {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }
  .translate-popover {
    width: 550px;
    position: absolute;
    border-radius: 5px;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.16);
    z-index: 9998;
  }

  @media screen and (max-width: 767px) {
    .translate-popover {
      width: 84vw;
    }
  }

  @media (prefers-color-scheme: light) {
    .translate-popover {
      background: #fff;
    }
  }
  @media (prefers-color-scheme: dark) {
    .translate-popover {
      background: rgb(24, 27, 32);
    }
  }

  .title-bar {
    height: 16px;
    cursor: move;
  }

  .drag-handle {
    display: block;
    position: absolute;
    height: 7px;
    width: 70px;
    top: .5rem;
    left: calc(50% - 35px);
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
  }

  .translate-content {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }

  #result {
    max-height: 300px;
    overflow: auto;
    line-height: 1.6em;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
  }

  .d-none,
  .d-hide {
    display: none !important;
  }
</style>

<nord-stack class="translate-popover" gap="s" id="draggable">
  <nord-button variant="plain" class="close-button" id="close-button">
    <nord-icon>
      <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
        <path d="M133 7 7 133M7 7l126 126" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round"
          stroke-linejoin="round" />
      </svg>
    </nord-icon>
  </nord-button>

  <div class="title-bar c-move" id="dragzone">
    <svg class="drag-handle" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 70 6'>
      <path fill='#3f4145'
        d='M8 0h2v2H8zm8 0h2v2h-2zm8 0h2v2h-2zM12 0h2v2h-2zm8 0h2v2h-2zm8 0h2v2h-2zM8 4h2v2H8zm8 0h2v2h-2zm8 0h2v2h-2zM12 4h2v2h-2zm8 0h2v2h-2zm8 0h2v2h-2zM0 0h2v2H0zm4 0h2v2H4zM0 4h2v2H0zm4 0h2v2H4zm36-4h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zM32 0h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2zm20-4h2v2h-2zm8 0h2v2h-2zm-4 0h2v2h-2zm8 0h2v2h-2zM56 4h2v2h-2zm8 0h2v2h-2zm-4 0h2v2h-2zm8 0h2v2h-2zM48 0h2v2h-2zm4 0h2v2h-2zm-4 4h2v2h-2zm4 0h2v2h-2z' />
      </svg>
  </div>

  <nord-stack gap="s" class="translate-content" style="padding-top: 0.2rem;">
    <nord-stack gap="s" style="gap: 4px;">
      <nord-stack gap="s" style="padding-left: 0.8rem; padding-right: 0.8rem;">
        <nord-stack direction="horizontal" gap="s" align-items="center">
          <div id="language-select-label" style="font-size: 12px;">Translate to:</div>
          <nord-select id="language-select" size="s" hide-label></nord-select>
        </nord-stack>

        <nord-divider></nord-divider>
      </nord-stack>

      <nord-stack id="spinner" align-items="center" style="padding-top: 8px; padding-bottom: 8px;">
        <nord-spinner size="xl"></nord-spinner>
      </nord-stack>
      <div id="result" class="d-none" style="font-size: 14px;"></div>
    </nord-stack>

    <nord-stack align-items="end" style="padding-top: 0.2rem; padding-left: 0.8rem; padding-right: 0.8rem;">
      <nord-button size="s" id="copy-button">
        <nord-icon>
          <svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14">
              <path d="M7 7h98v98H7z" />
              <path d="M133 36.078V119a14 14 0 0 1-14 14H36.078" />
            </g>
          </svg>
        </nord-icon>
      </nord-button>
    </nord-stack>
  </nord-stack>
</nord-stack>`;
var _draggable = /*#__PURE__*/new WeakMap();
var _closeButton = /*#__PURE__*/new WeakMap();
var _languageSelect = /*#__PURE__*/new WeakMap();
var _result = /*#__PURE__*/new WeakMap();
var _spinner = /*#__PURE__*/new WeakMap();
var _copyButton = /*#__PURE__*/new WeakMap();
var _rendered = /*#__PURE__*/new WeakMap();
var _render = /*#__PURE__*/new WeakSet();
var _setSelectedTargetLanguage = /*#__PURE__*/new WeakSet();
var _setPosition = /*#__PURE__*/new WeakSet();
var _setLoading = /*#__PURE__*/new WeakSet();
var _onLanguageSelectChange = /*#__PURE__*/new WeakSet();
class Popover extends HTMLElement {
  constructor() {
    super();
    _classPrivateMethodInitSpec(this, _onLanguageSelectChange);
    _classPrivateMethodInitSpec(this, _setLoading);
    _classPrivateMethodInitSpec(this, _setPosition);
    _classPrivateMethodInitSpec(this, _setSelectedTargetLanguage);
    _classPrivateMethodInitSpec(this, _render);
    _classPrivateFieldInitSpec(this, _draggable, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _closeButton, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _languageSelect, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _result, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _spinner, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _copyButton, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _rendered, {
      writable: true,
      value: false
    });
    this.shadow = this.attachShadow({
      mode: "open"
    });
  }
  connectedCallback() {
    if (!_classPrivateFieldGet(this, _rendered)) {
      _classPrivateMethodGet(this, _render, _render2).call(this);
      _classPrivateFieldSet(this, _rendered, true);
    }
  }
  static get observedAttributes() {
    return ["loading", "position", "result", "error", "lang"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "loading":
        _classPrivateMethodGet(this, _setLoading, _setLoading2).call(this, newValue === "true");
        break;
      case "position":
        const {
          x,
          y
        } = JSON.parse(newValue);
        _classPrivateMethodGet(this, _setPosition, _setPosition2).call(this, x, y);
        break;
      case "result":
        _classPrivateFieldGet(this, _result).innerHTML = (0,_utils__WEBPACK_IMPORTED_MODULE_10__.escapeHTML)(newValue).split("\n").join("<br>");
        break;
      case "error":
        _classPrivateFieldGet(this, _result).innerHTML = `<nord-banner variant="danger">${newValue}</nord-banner>`;
        break;
      case "lang":
        _classPrivateMethodGet(this, _setSelectedTargetLanguage, _setSelectedTargetLanguage2).call(this, newValue);
        break;
    }
  }
  getPosition() {
    return {
      x: _classPrivateFieldGet(this, _draggable).offsetLeft,
      y: _classPrivateFieldGet(this, _draggable).offsetTop
    };
  }
}
function _render2() {
  const popover = document.createElement("div");
  popover.innerHTML = template;
  this.shadow.append(popover);
  (0,_shared_utils__WEBPACK_IMPORTED_MODULE_11__.runColorMode)(isDarkMode => {
    (0,_shared_utils__WEBPACK_IMPORTED_MODULE_11__.loadColorScheme)(isDarkMode ? browser.runtime.getURL("assets/nord-dark.css") : browser.runtime.getURL("assets/nord.css"));
  });
  _classPrivateFieldSet(this, _draggable, this.shadowRoot.getElementById("draggable"));
  const dragzone = this.shadowRoot.getElementById("dragzone");
  (0,_draggable__WEBPACK_IMPORTED_MODULE_9__.makeDraggable)(_classPrivateFieldGet(this, _draggable), dragzone);
  _classPrivateFieldSet(this, _closeButton, this.shadowRoot.querySelector("#close-button"));
  _classPrivateFieldGet(this, _closeButton).addEventListener("click", () => {
    this.dispatchEvent(new CustomEvent("close"));
  });
  _classPrivateFieldSet(this, _result, this.shadowRoot.getElementById("result"));
  _classPrivateFieldSet(this, _spinner, this.shadowRoot.getElementById("spinner"));
  _classPrivateFieldSet(this, _copyButton, this.shadowRoot.getElementById("copy-button"));
  _classPrivateFieldGet(this, _copyButton).disabled = navigator.clipboard === undefined;
  _classPrivateFieldGet(this, _copyButton).addEventListener("click", () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(_classPrivateFieldGet(this, _result).textContent);
    }
  });
  const languageSelectLabel = this.shadowRoot.getElementById("language-select-label");
  languageSelectLabel.textContent = browser.i18n.getMessage("layout_header_label_language_switch");
  _classPrivateFieldSet(this, _languageSelect, this.shadowRoot.getElementById("language-select"));
  const locale = browser.i18n.getUILanguage().split("-").shift().toUpperCase();
  for (const supportedLanguage of _shared_supported_languages__WEBPACK_IMPORTED_MODULE_8__.supportedLanguages) {
    const option = new Option(browser.i18n.getMessage(`supported_languages_${supportedLanguage.code}`), supportedLanguage.code, false, supportedLanguage.code === locale);
    _classPrivateFieldGet(this, _languageSelect).appendChild(option);
  }
  _classPrivateFieldGet(this, _languageSelect).addEventListener("change", _classPrivateMethodGet(this, _onLanguageSelectChange, _onLanguageSelectChange2).bind(this));
  browser.storage.local.get(["selectedTargetLanguage"], result => {
    _classPrivateMethodGet(this, _setSelectedTargetLanguage, _setSelectedTargetLanguage2).call(this, result.selectedTargetLanguage);
  });
  browser.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && "selectedTargetLanguage" in changes) {
      _classPrivateMethodGet(this, _setSelectedTargetLanguage, _setSelectedTargetLanguage2).call(this, changes.selectedTargetLanguage.newValue);
    }
  });
}
function _setSelectedTargetLanguage2(language) {
  if (language && _shared_supported_languages__WEBPACK_IMPORTED_MODULE_8__.supportedLanguages.some(supportedLanguage => supportedLanguage.code === language.toUpperCase())) {
    _classPrivateFieldGet(this, _languageSelect).value = language;
  }
}
function _setPosition2(x, y) {
  _classPrivateFieldGet(this, _draggable).style.top = `${y}px`;
  _classPrivateFieldGet(this, _draggable).style.left = `${x}px`;
}
function _setLoading2(loading) {
  _classPrivateFieldGet(this, _spinner).classList.toggle("d-none", !loading);
  _classPrivateFieldGet(this, _result).classList.toggle("d-none", loading);
}
function _onLanguageSelectChange2() {
  this.dispatchEvent(new CustomEvent("change", {
    detail: {
      selectedSourceLanguage: undefined,
      selectedTargetLanguage: _classPrivateFieldGet(this, _languageSelect).value
    }
  }));
}

/***/ }),

/***/ "./src/content/toast.js":
/*!******************************!*\
  !*** ./src/content/toast.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Toast": () => (/* binding */ Toast)
/* harmony export */ });
/* harmony import */ var _nord_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nord.css */ "./src/content/nord.css");
/* harmony import */ var _nordhealth_components_lib_Stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nordhealth/components/lib/Stack */ "./node_modules/@nordhealth/components/lib/Stack.js");
/* harmony import */ var _nordhealth_components_lib_Toast__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nordhealth/components/lib/Toast */ "./node_modules/@nordhealth/components/lib/Toast.js");
/* harmony import */ var _nordhealth_components_lib_ToastGroup__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nordhealth/components/lib/ToastGroup */ "./node_modules/@nordhealth/components/lib/ToastGroup.js");


function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }




var _toastStack = /*#__PURE__*/new WeakMap();
class Toast extends HTMLElement {
  constructor() {
    super();
    _classPrivateFieldInitSpec(this, _toastStack, {
      writable: true,
      value: []
    });
    this.shadow = this.attachShadow({
      mode: "open"
    });
  }
  show() {
    if (_classPrivateFieldGet(this, _toastStack).length === 0) {
      const group = createToastGroup();
      group.addToast(`${progressMessage()}...`, {
        autoDismiss: -1
      });
      retouchToastAppearance();
    }
    _classPrivateFieldGet(this, _toastStack).push(true);
  }
  dismiss() {
    if (_classPrivateFieldGet(this, _toastStack).length === 1) {
      dismissToast();
    }
    _classPrivateFieldGet(this, _toastStack).pop();
  }
  static get observedAttributes() {
    console.log("observedAttributes");
    return ["show", "dismiss"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    console.log("attributeChangedCallback");
    switch (name) {
      case "show":
        this.show();
        break;
      case "dismiss":
        this.dismiss();
        break;
    }
  }
}
function createToastGroup() {
  const id = "nord-toast-group";
  {
    const group = document.getElementById(id);
    if (group) {
      group.remove();
    }
  }
  document.body.insertAdjacentHTML("beforeend", `<nord-toast-group id="${id}"></nord-toast-group>`);
  const group = document.getElementById(id);
  group.addEventListener("dismiss", e => e.target.remove());
  return document.getElementById(id);
}
function getToastGroup() {
  return document.getElementById("nord-toast-group");
}
function progressMessage() {
  return browser.i18n.getMessage("full_page_translation_ongoing_translation");
}
function retouchToastAppearance() {
  const group = document.querySelector("nord-toast-group");
  if (group) {
    const toast = group.querySelector("nord-toast");
    if (toast) {
      toast.innerHTML = `<nord-stack direction="horizontal" gap="m" align-items="center"><svg width="24" height="24" fill="#fff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" type="rotate" dur="0.75s" values="0 12 12;360 12 12" repeatCount="indefinite"/></path></svg><nord-stack style="font-size: 14px; color: #fff;">${progressMessage()}...</nord-stack></nord-stack>`;
      const shadowRoot = toast.shadowRoot;
      if (shadowRoot) {
        requestAnimationFrame(() => {
          const toastInner = shadowRoot.querySelector(".n-toast");
          if (toastInner) {
            const dismissButton = toastInner.querySelector(".n-dismiss");
            if (dismissButton) {
              dismissButton.style.visibility = "hidden";
            }
          }
        });
      }
    }
  }
}
function dismissToast() {
  let success = false;
  const group = document.querySelector("nord-toast-group");
  if (group) {
    const toast = group.querySelector("nord-toast");
    if (toast) {
      const shadowRoot = toast.shadowRoot;
      if (shadowRoot) {
        const toastInner = shadowRoot.querySelector(".n-toast");
        if (toastInner) {
          const dismissButton = toastInner.querySelector(".n-dismiss");
          if (dismissButton) {
            dismissButton.click();
            success = true;
          }
        }
      }
    }
  }
  if (!success) {
    const group = getToastGroup();
    if (group) {
      group.remove();
    }
  }
}

/***/ }),

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

/***/ }),

/***/ "./src/shared/supported_languages.js":
/*!*******************************************!*\
  !*** ./src/shared/supported_languages.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "supportedLanguages": () => (/* binding */ supportedLanguages)
/* harmony export */ });


const supportedLanguages = [{
  code: "DE",
  name: "German"
}, {
  code: "EN",
  name: "English"
}, {
  code: "FR",
  name: "French"
}, {
  code: "ES",
  name: "Spanish"
}, {
  code: "IT",
  name: "Italian"
}, {
  code: "ID",
  name: "Indonesian"
}, {
  code: "PL",
  name: "Polish"
}, {
  code: "NL",
  name: "Dutch"
}, {
  code: "PT",
  name: "Portuguese"
}, {
  code: "RU",
  name: "Russian"
}, {
  code: "ZH",
  name: "Chinese"
}, {
  code: "JA",
  name: "Japanese"
}, {
  code: "BG",
  name: "Bulgarian"
}, {
  code: "CS",
  name: "Czech"
}, {
  code: "DA",
  name: "Danish"
}, {
  code: "ET",
  name: "Estonian"
}, {
  code: "FI",
  name: "Finnish"
}, {
  code: "EL",
  name: "Greek"
}, {
  code: "HU",
  name: "Hungarian"
}, {
  code: "LV",
  name: "Latvian"
}, {
  code: "LT",
  name: "Lithuanian"
}, {
  code: "RO",
  name: "Romanian"
}, {
  code: "SK",
  name: "Slovak"
}, {
  code: "SL",
  name: "Slovenian"
}, {
  code: "SV",
  name: "Swedish"
}, {
  code: "TR",
  name: "Turkish"
}];

/***/ }),

/***/ "./src/shared/utils.js":
/*!*****************************!*\
  !*** ./src/shared/utils.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadColorScheme": () => (/* binding */ loadColorScheme),
/* harmony export */   "runColorMode": () => (/* binding */ runColorMode)
/* harmony export */ });


function runColorMode(fn) {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  fn(query.matches);
  query.addEventListener("change", event => fn(event.matches));
}
function loadColorScheme(file) {
  const head = document.getElementsByTagName("head").item(0);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = file;
  head.appendChild(link);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/content/nord.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/content/nord.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --n-color-accent: rgb(53, 89, 199);\n  --n-color-text: rgb(12, 26, 61);\n  --n-color-text-link: rgb(53, 89, 199);\n  --n-color-text-weak: rgb(54, 67, 74);\n  --n-color-text-weaker: rgb(102, 118, 128);\n  --n-color-text-weakest: rgb(178, 186, 191);\n  --n-color-text-on-accent: rgb(255, 255, 255);\n  --n-color-text-error: rgb(185, 77, 55);\n  --n-color-text-success: rgb(80, 128, 56);\n  --n-color-nav-surface: rgb(246, 248, 248);\n  --n-color-nav-heading: rgb(143, 161, 170);\n  --n-color-nav-hover: rgb(234, 240, 240);\n  --n-color-border: rgb(216, 222, 228);\n  --n-color-border-strong: rgb(188, 197, 204);\n  --n-color-surface: rgb(255, 255, 255);\n  --n-color-background: rgb(255, 255, 255);\n  --n-color-surface-raised: rgb(250, 251, 251);\n  --n-color-overlay: rgba(144, 152, 152, 0.4);\n  --n-color-status-neutral: rgb(114, 110, 119);\n  --n-color-status-warning: rgb(240, 192, 68);\n  --n-color-status-highlight: rgb(125, 73, 193);\n  --n-color-status-danger: rgb(185, 77, 55);\n  --n-color-status-success: rgb(80, 128, 56);\n  --n-color-status-info: rgb(53, 89, 199);\n  --n-color-status-progress: rgb(0, 131, 138);\n  --n-color-status-neutral-weak: rgb(227, 227, 227);\n  --n-color-status-warning-weak: rgb(255, 233, 189);\n  --n-color-status-highlight-weak: rgb(238, 220, 255);\n  --n-color-status-danger-weak: rgb(255, 208, 199);\n  --n-color-status-success-weak: rgb(216, 229, 200);\n  --n-color-status-info-weak: rgb(204, 218, 255);\n  --n-color-status-progress-weak: rgb(196, 240, 242);\n  --n-color-button: rgb(255, 255, 255);\n  --n-color-button-hover: rgb(246, 248, 248);\n  --n-color-border-hover: rgb(102, 118, 128);\n  --n-color-icon: rgb(102, 118, 128);\n  --n-color-icon-hover: rgb(12, 26, 61);\n  --n-color-active: rgb(246, 248, 248);\n  --n-box-shadow: 0 1px 3px rgba(12, 12, 12, 0.09);\n  --n-box-shadow-header: 0 1px 5px rgba(12, 12, 12, 0.05);\n  --n-box-shadow-card: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(12, 12, 12, 0.05), 0 0 40px rgba(12, 12, 12, 0.015);\n  --n-box-shadow-nav: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(12, 12, 12, 0.14);\n  --n-box-shadow-popout: 0 4px 12px rgba(12, 12, 12, 0.15),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-modal: 0 24px 38px 3px rgba(12, 12, 12, 0.16),\n    0 9px 86px 8px rgba(12, 12, 12, 0.1), 0 11px 15px -7px rgba(12, 12, 12, 0.1),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-dark: 0 1px 3px rgba(0, 0, 0, 0.2);\n  --n-box-shadow-header-dark: 0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-card-dark: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-nav-dark: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(0, 0, 0, 0.24);\n  --n-box-shadow-popout-dark: 0 4px 12px rgba(0, 0, 0, 0.25),\n    0 0 0 1px var(--n-color-border);\n  --n-box-shadow-modal-dark: 0 0 0 1px var(--n-color-border),\n    0 24px 38px 3px rgba(0, 0, 0, 0.34), 0px 9px 86px 8px rgba(0, 0, 0, 0.28),\n    0px 11px 15px -7px rgba(0, 0, 0, 0.28);\n  --n-font-size-xxxl: 2.25rem;\n  --n-font-size-xxl: 1.5rem;\n  --n-font-size-xl: 1.25rem;\n  --n-font-size-l: 1rem;\n  --n-font-size-m: 14px;\n  --n-font-size-s: 12px;\n  --n-font-size-xs: 0.6875rem;\n  --n-font-family: \"Nordhealth Sans\", -apple-system, BlinkMacSystemFont,\n    \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\",\n    \"Segoe UI Emoji\";\n  --n-font-family-code: \"Nordhealth Mono\", monospace, monospace;\n  --n-font-features: \"kern\" 1, \"tnum\" 1, \"calt\" 1, \"case\" 1, \"cv05\" 1, \"zero\" 1,\n    \"cv08\" 0, \"ss03\" 1;\n  --n-font-features-reduced: \"kern\" 1, \"tnum\" 0, \"calt\" 1, \"case\" 1, \"cv05\" 1,\n    \"zero\" 0, \"cv08\" 0, \"ss03\" 1;\n  --n-font-weight: 400;\n  --n-font-weight-active: 500;\n  --n-font-weight-heading: 600;\n  --n-font-weight-strong: 670;\n  --n-size-icon-xxs: 8px;\n  --n-size-icon-xs: 10px;\n  --n-size-icon-s: 12px;\n  --n-size-icon-m: 16px;\n  --n-size-icon-l: 24px;\n  --n-size-icon-xl: 36px;\n  --n-size-icon-xxl: 72px;\n  --n-space-xxl: 72px;\n  --n-space-xl: 36px;\n  --n-space-l: 24px;\n  --n-space-m: 16px;\n  --n-space-s: 8px;\n  --n-border-radius-sharp: 0.02em;\n  --n-border-radius-s: 3px;\n  --n-border-radius: 5px;\n  --n-border-radius-pill: 999px;\n  --n-border-radius-circle: 50%;\n  --n-transition-quickly: 0.05s ease;\n  --n-transition-slowly: 0.2s ease;\n  --n-transition-mobile: 0.4s ease;\n  --n-line-height-tight: 1.15;\n  --n-line-height-heading: 1.2;\n  --n-line-height-caption: 1.3;\n  --n-line-height: 1.5;\n  --n-line-height-form: 20px;\n  --n-index-deep: -999999;\n  --n-index-default: 1;\n  --n-index-masked: 100;\n  --n-index-mask: 200;\n  --n-index-sticky: 300;\n  --n-index-nav: 400;\n  --n-index-overlay: 500;\n  --n-index-spinner: 600;\n  --n-index-popout: 700;\n  --n-index-toast: 800;\n  --n-index-modal: 900;\n}\n:where(.n-reset) :where(*, ::before, ::after) {\n  box-sizing: border-box;\n}\n:where(.n-reset) {\n  font-family: var(--n-font-family);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n  accent-color: var(--n-color-accent);\n}\n:where(.n-reset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-reset),\n:where(.n-reset)\n  :where(body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, img, svg, small, strike, strong, sub, sup, b, u, i, ol, ul, li, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, footer, header, nav, section, time, button, video, textarea, input) {\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n:where(.n-reset) :where(ul[role=\"list\"], ol[role=\"list\"]) {\n  list-style: none;\n}\n:where(.n-reset) :where(img, picture) {\n  max-inline-size: 100%;\n  display: block;\n}\n:where(.n-reset) :where(input, button, textarea, select) {\n  font-family: inherit;\n  font-feature-settings: inherit;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  :where(.n-reset) :where(*, ::before, ::after) {\n    animation-duration: 0s !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0s !important;\n    scroll-behavior: auto !important;\n  }\n}\n.n-border-is {\n  border-inline-start: 1px solid var(--n-color-border);\n}\n.n-border-ie {\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border-bs {\n  border-block-start: 1px solid var(--n-color-border);\n}\n.n-border-be {\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-b {\n  border-block-start: 1px solid var(--n-color-border);\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-i {\n  border-inline-start: 1px solid var(--n-color-border);\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border {\n  border: 1px solid var(--n-color-border);\n}\n.n-border-strong-is {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-ie {\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-bs {\n  border-block-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-be {\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-b {\n  border-block-start: 1px solid var(--n-color-border-strong);\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-i {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong {\n  border: 1px solid var(--n-color-border-strong);\n}\n.n-border-hover-is:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-ie:hover {\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-bs:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-be:hover {\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-b:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-i:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover:hover {\n  border: 1px solid var(--n-color-border-hover);\n}\n.n-border-d-is {\n  border-inline-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-bs {\n  border-block-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-be {\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-b {\n  border-block-start: 1px dashed var(--n-color-border);\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-i {\n  border-inline-start: 1px dashed var(--n-color-border);\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d {\n  border: 1px dashed var(--n-color-border);\n}\n.n-border-strong-d-is {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-bs {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-be {\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-b {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-i {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d {\n  border: 1px dashed var(--n-color-border-strong);\n}\n.n-border-hover-d-is:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-ie:hover {\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-bs:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-be:hover {\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-b:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-i:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d:hover {\n  border: 1px dashed var(--n-color-border-hover);\n}\n.n-border-radius-sharp {\n  border-radius: var(--n-border-radius-sharp);\n}\n.n-border-radius-s {\n  border-radius: var(--n-border-radius-s);\n}\n.n-border-radius {\n  border-radius: var(--n-border-radius);\n}\n.n-border-radius-pill {\n  border-radius: var(--n-border-radius-pill);\n}\n.n-border-radius-circle {\n  border-radius: var(--n-border-radius-circle);\n}\n.n-box-shadow {\n  box-shadow: var(--n-box-shadow);\n}\n.n-box-shadow-header {\n  box-shadow: var(--n-box-shadow-header);\n}\n.n-box-shadow-card {\n  box-shadow: var(--n-box-shadow-card);\n}\n.n-box-shadow-nav {\n  box-shadow: var(--n-box-shadow-nav);\n}\n.n-box-shadow-popout {\n  box-shadow: var(--n-box-shadow-popout);\n}\n.n-box-shadow-modal {\n  box-shadow: var(--n-box-shadow-modal);\n}\n.n-margin-is-xxl {\n  margin-inline-start: var(--n-space-xxl);\n}\n.n-margin-ie-xxl {\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-bs-xxl {\n  margin-block-start: var(--n-space-xxl);\n}\n.n-margin-be-xxl {\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-b-xxl {\n  margin-block-start: var(--n-space-xxl);\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-i-xxl {\n  margin-inline-start: var(--n-space-xxl);\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-xxl {\n  margin: var(--n-space-xxl);\n}\n.n-margin-is-xl {\n  margin-inline-start: var(--n-space-xl);\n}\n.n-margin-ie-xl {\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-bs-xl {\n  margin-block-start: var(--n-space-xl);\n}\n.n-margin-be-xl {\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-b-xl {\n  margin-block-start: var(--n-space-xl);\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-i-xl {\n  margin-inline-start: var(--n-space-xl);\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-xl {\n  margin: var(--n-space-xl);\n}\n.n-margin-is-l {\n  margin-inline-start: var(--n-space-l);\n}\n.n-margin-ie-l {\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-bs-l {\n  margin-block-start: var(--n-space-l);\n}\n.n-margin-be-l {\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-b-l {\n  margin-block-start: var(--n-space-l);\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-i-l {\n  margin-inline-start: var(--n-space-l);\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-l {\n  margin: var(--n-space-l);\n}\n.n-margin-is-m {\n  margin-inline-start: var(--n-space-m);\n}\n.n-margin-ie-m {\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-bs-m {\n  margin-block-start: var(--n-space-m);\n}\n.n-margin-be-m {\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-b-m {\n  margin-block-start: var(--n-space-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-i-m {\n  margin-inline-start: var(--n-space-m);\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-m {\n  margin: var(--n-space-m);\n}\n.n-margin-is-s {\n  margin-inline-start: var(--n-space-s);\n}\n.n-margin-ie-s {\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-bs-s {\n  margin-block-start: var(--n-space-s);\n}\n.n-margin-be-s {\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-b-s {\n  margin-block-start: var(--n-space-s);\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-i-s {\n  margin-inline-start: var(--n-space-s);\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-s {\n  margin: var(--n-space-s);\n}\n.n-margin-is-auto {\n  margin-inline-start: auto;\n}\n.n-margin-ie-auto {\n  margin-inline-end: auto;\n}\n.n-margin-bs-auto {\n  margin-block-start: auto;\n}\n.n-margin-be-auto {\n  margin-block-end: auto;\n}\n.n-margin-b-auto {\n  margin-block-start: auto;\n  margin-block-end: auto;\n}\n.n-margin-i-auto {\n  margin-inline-start: auto;\n  margin-inline-end: auto;\n}\n.n-margin-auto {\n  margin: auto;\n}\n.n-padding-is-xxl {\n  padding-inline-start: var(--n-space-xxl);\n}\n.n-padding-ie-xxl {\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-bs-xxl {\n  padding-block-start: var(--n-space-xxl);\n}\n.n-padding-be-xxl {\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-b-xxl {\n  padding-block-start: var(--n-space-xxl);\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-i-xxl {\n  padding-inline-start: var(--n-space-xxl);\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-xxl {\n  padding: var(--n-space-xxl);\n}\n.n-padding-is-xl {\n  padding-inline-start: var(--n-space-xl);\n}\n.n-padding-ie-xl {\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-bs-xl {\n  padding-block-start: var(--n-space-xl);\n}\n.n-padding-be-xl {\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-b-xl {\n  padding-block-start: var(--n-space-xl);\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-i-xl {\n  padding-inline-start: var(--n-space-xl);\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-xl {\n  padding: var(--n-space-xl);\n}\n.n-padding-is-l {\n  padding-inline-start: var(--n-space-l);\n}\n.n-padding-ie-l {\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-bs-l {\n  padding-block-start: var(--n-space-l);\n}\n.n-padding-be-l {\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-b-l {\n  padding-block-start: var(--n-space-l);\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-i-l {\n  padding-inline-start: var(--n-space-l);\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-l {\n  padding: var(--n-space-l);\n}\n.n-padding-is-m {\n  padding-inline-start: var(--n-space-m);\n}\n.n-padding-ie-m {\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-bs-m {\n  padding-block-start: var(--n-space-m);\n}\n.n-padding-be-m {\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-b-m {\n  padding-block-start: var(--n-space-m);\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-i-m {\n  padding-inline-start: var(--n-space-m);\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-m {\n  padding: var(--n-space-m);\n}\n.n-padding-is-s {\n  padding-inline-start: var(--n-space-s);\n}\n.n-padding-ie-s {\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-bs-s {\n  padding-block-start: var(--n-space-s);\n}\n.n-padding-be-s {\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-b-s {\n  padding-block-start: var(--n-space-s);\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-i-s {\n  padding-inline-start: var(--n-space-s);\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-s {\n  padding: var(--n-space-s);\n}\n.n-font-size-xxxl {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-font-size-xxl {\n  font-size: var(--n-font-size-xxl);\n}\n.n-font-size-xl {\n  font-size: var(--n-font-size-xl);\n}\n.n-font-size-l {\n  font-size: var(--n-font-size-l);\n}\n.n-font-size-m {\n  font-size: var(--n-font-size-m);\n}\n.n-font-size-s {\n  font-size: var(--n-font-size-s);\n}\n.n-font-size-xs {\n  font-size: var(--n-font-size-xs);\n}\n.n-font-weight {\n  font-weight: var(--n-font-weight);\n}\n.n-font-weight-active {\n  font-weight: var(--n-font-weight-active);\n}\n.n-font-weight-heading {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-font-weight-strong {\n  font-weight: var(--n-font-weight-strong);\n}\n.n-color-text {\n  color: var(--n-color-text);\n}\n.n-color-text-link {\n  color: var(--n-color-text-link);\n}\n.n-color-text-weak {\n  color: var(--n-color-text-weak);\n}\n.n-color-text-weaker {\n  color: var(--n-color-text-weaker);\n}\n.n-color-text-weakest {\n  color: var(--n-color-text-weakest);\n}\n.n-color-text-on-accent {\n  color: var(--n-color-text-on-accent);\n}\n.n-color-text-error {\n  color: var(--n-color-text-error);\n}\n.n-color-text-success {\n  color: var(--n-color-text-success);\n}\n.n-color-nav-heading {\n  color: var(--n-color-nav-heading);\n}\n.n-color-nav-surface {\n  background-color: var(--n-color-nav-surface);\n}\n.n-color-surface {\n  background-color: var(--n-color-surface);\n}\n.n-color-background {\n  background-color: var(--n-color-background);\n}\n.n-color-surface-raised {\n  background-color: var(--n-color-surface-raised);\n}\n.n-color-status-neutral {\n  background-color: var(--n-color-status-neutral);\n}\n.n-color-status-warning {\n  background-color: var(--n-color-status-warning);\n}\n.n-color-status-highlight {\n  background-color: var(--n-color-status-highlight);\n}\n.n-color-status-danger {\n  background-color: var(--n-color-status-danger);\n}\n.n-color-status-success {\n  background-color: var(--n-color-status-success);\n}\n.n-color-status-info {\n  background-color: var(--n-color-status-info);\n}\n.n-color-status-progress {\n  background-color: var(--n-color-status-progress);\n}\n.n-color-status-neutral-weak {\n  background-color: var(--n-color-status-neutral-weak);\n}\n.n-color-status-warning-weak {\n  background-color: var(--n-color-status-warning-weak);\n}\n.n-color-status-highlight-weak {\n  background-color: var(--n-color-status-highlight-weak);\n}\n.n-color-status-danger-weak {\n  background-color: var(--n-color-status-danger-weak);\n}\n.n-color-status-success-weak {\n  background-color: var(--n-color-status-success-weak);\n}\n.n-color-status-info-weak {\n  background-color: var(--n-color-status-info-weak);\n}\n.n-color-status-progress-weak {\n  background-color: var(--n-color-status-progress-weak);\n}\n.n-color-button {\n  background-color: var(--n-color-button);\n}\n.n-color-button-hover:hover {\n  background-color: var(--n-color-button-hover);\n}\n.n-color-active {\n  background-color: var(--n-color-active);\n}\n.n-color-icon {\n  color: var(--n-color-icon);\n}\n.n-color-icon-hover:hover {\n  color: var(--n-color-icon-hover);\n}\n.n-size-icon-xxs {\n  inline-size: var(--n-size-icon-xxs);\n  block-size: var(--n-size-icon-xxs);\n}\n.n-size-icon-xs {\n  inline-size: var(--n-size-icon-xs);\n  block-size: var(--n-size-icon-xs);\n}\n.n-size-icon-s {\n  inline-size: var(--n-size-icon-s);\n  block-size: var(--n-size-icon-s);\n}\n.n-size-icon-m {\n  inline-size: var(--n-size-icon-m);\n  block-size: var(--n-size-icon-m);\n}\n.n-size-icon-l {\n  inline-size: var(--n-size-icon-l);\n  block-size: var(--n-size-icon-l);\n}\n.n-size-icon-xl {\n  inline-size: var(--n-size-icon-xl);\n  block-size: var(--n-size-icon-xl);\n}\n.n-size-icon-xxl {\n  inline-size: var(--n-size-icon-xxl);\n  block-size: var(--n-size-icon-xxl);\n}\n.n-gap-xxl {\n  gap: var(--n-space-xxl);\n}\n.n-gap-xl {\n  gap: var(--n-space-xl);\n}\n.n-gap-l {\n  gap: var(--n-space-l);\n}\n.n-gap-m {\n  gap: var(--n-space-m);\n}\n.n-gap-s {\n  gap: var(--n-space-s);\n}\n:where(.n-typescale-xxxl, .n-typescale-xxl, .n-typescale-xl, .n-typescale-l, .n-typescale-m, .n-typescale-s, .n-typescale-xs, .n-typeset) {\n  font-family: var(--n-font-family);\n  margin: 0;\n}\n.n-typeset :where(pre, code) {\n  font-family: var(--n-font-family-code);\n}\n.n-typescale-l,\n.n-typescale-xl,\n.n-typescale-xxl,\n.n-typescale-xxxl,\n:where(.n-typeset) :where(h1, h2, h3, h4, h5, h6) {\n  font-feature-settings: var(--n-font-features-reduced);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-l,\n:where(.n-typeset) .n-typescale-xl,\n:where(.n-typeset) .n-typescale-xxl,\n:where(.n-typeset) .n-typescale-xxxl,\n:where(.n-typeset) :where(h2, h3, h4, h5, h6) {\n  margin: 0.5em 0;\n}\n:where(.n-typeset) * + .n-typescale-l,\n:where(.n-typeset) * + .n-typescale-xl,\n:where(.n-typeset) * + .n-typescale-xxl,\n:where(.n-typeset) * + .n-typescale-xxxl,\n:where(.n-typeset) * + :where(h2, h3, h4, h5, h6) {\n  margin-block-start: 1.5rem;\n}\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  font-size: var(--n-font-size-m);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-m,\n:where(.n-typeset) .n-typescale-s,\n:where(.n-typeset) .n-typescale-xs,\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  margin: 0.85em 0;\n}\n:where(.n-typeset) :where(dd) {\n  margin-inline-start: 0.85em;\n}\n.n-typescale-xxxl,\n:where(.n-typeset h1) {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-typescale-xxl,\n:where(.n-typeset h2) {\n  font-size: var(--n-font-size-xxl);\n}\n.n-typescale-xl,\n:where(.n-typeset h3) {\n  font-size: var(--n-font-size-xl);\n}\n.n-typescale-l,\n:where(.n-typeset) :where(h4, blockquote) {\n  font-size: var(--n-font-size-l);\n}\n.n-typescale-m,\n:where(.n-typeset) :where(p, h5) {\n  font-size: var(--n-font-size-m);\n}\n:where(.n-typeset h5) {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-typescale-s,\n:where(.n-typeset) :where(h6, figcaption) {\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height);\n}\n.n-typescale-xs,\n:where(.n-typeset small) {\n  font-size: var(--n-font-size-xs);\n}\n:where(.n-typeset) > :first-child {\n  margin-block-start: 0;\n}\n:where(.n-typeset) > :last-child {\n  margin-block-end: 0;\n}\n:where(.n-typeset) :where(ul, ol, dl, blockquote) {\n  margin: 0.5em 0;\n  padding: 0 0 0 1.5em;\n}\n:where(.n-typeset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-typeset a:hover) {\n  text-decoration: none;\n}\n:where(.n-typeset code) {\n  overflow-wrap: break-word;\n}\n:where(.n-typeset pre code) {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n:where(.n-typeset) :where(strong, b) {\n  font-weight: var(--n-font-weight-strong);\n}\n:where(.n-typeset mark) {\n  background: var(--n-color-status-warning-weak);\n}\n.n-caption {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n}\n.n-dl {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(9ch, max-content));\n  column-gap: var(--n-space-m);\n}\n.n-dl dt {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight-active);\n  font-size: var(--n-font-size-s);\n  padding-block-start: calc(var(--n-font-size-m) - var(--n-font-size-s));\n  grid-column-start: 1;\n}\n.n-dl :where(dt, dd) {\n  margin: 0;\n}\n.n-dl dd {\n  color: var(--n-color-text);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-dl dd:last-of-type {\n  margin-block-end: 0;\n}\n.n-color-accent,\n.n-color-accent-bg {\n  background-color: var(--n-color-accent);\n}\n.n-color-accent-text {\n  color: var(--n-color-accent);\n}\n.n-color-accent-fill {\n  fill: var(--n-color-accent);\n}\n.n-color-accent-stroke {\n  stroke: var(--n-color-accent);\n}\n.n-stack,\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  display: flex;\n  justify-content: flex-start;\n  flex-flow: column wrap;\n}\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  align-items: center;\n  flex-direction: row;\n}\n.n-stack-horizontal-s {\n  align-items: start;\n}\n.n-stack-horizontal-e {\n  align-items: end;\n}\n.n-grid,\n.n-grid-12,\n.n-grid-2,\n.n-grid-3,\n.n-grid-4,\n.n-grid-6,\n.n-grid-8 {\n  display: grid;\n  align-items: start;\n  grid-template-columns: repeat(var(--n-grid-columns, 12), 1fr);\n}\n.n-grid-8 {\n  --n-grid-columns: 8;\n}\n.n-grid-6 {\n  --n-grid-columns: 6;\n}\n.n-grid-4 {\n  --n-grid-columns: 4;\n}\n.n-grid-3 {\n  --n-grid-columns: 3;\n}\n.n-grid-2 {\n  --n-grid-columns: 2;\n}\n.n-grid-center-i {\n  justify-self: center;\n}\n.n-grid-center-b {\n  align-self: center;\n}\n.n-grid-center {\n  place-self: center;\n}\n.n-container,\n.n-container-l {\n  max-inline-size: 1200px;\n}\n.n-container-xl {\n  max-inline-size: 2400px;\n}\n.n-container-m {\n  max-inline-size: 1000px;\n}\n.n-container-s {\n  max-inline-size: 800px;\n}\n.n-container-xs {\n  max-inline-size: 600px;\n}\n.n-container-xxs {\n  max-inline-size: 400px;\n}\n.n-truncate {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.n-truncate-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-truncate-3 {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-align-start {\n  text-align: start;\n}\n.n-align-center {\n  text-align: center;\n}\n.n-align-end {\n  text-align: end;\n}\n.n-divider,\n.n-hr {\n  background: var(--n-color-border);\n  display: block;\n  margin: 0;\n  border: 0;\n  block-size: 1px;\n  inline-size: 100%;\n}\n.n-hint,\n.n-label {\n  display: flex;\n  color: var(--n-color-text);\n  font-family: var(--n-font-family);\n  font-size: var(--n-font-size-m);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  margin: 0;\n}\n.n-hint {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-error {\n  color: var(--n-color-text-error);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-input {\n  display: block;\n  background: var(--n-color-active);\n  color: var(--n-color-text);\n  padding-block-start: calc(var(--n-space-s) - 1px);\n  padding-block-end: calc(var(--n-space-s) - 1px);\n  padding-inline-start: calc(var(--n-space-s) * 1.6);\n  padding-inline-end: calc(var(--n-space-s) * 1.6);\n  border-radius: var(--n-border-radius-s);\n  border: 1px solid var(--n-color-border-strong);\n  font-family: var(--n-font-family);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  line-height: var(--n-line-height-form);\n  transition: border var(--n-transition-slowly),\n    box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);\n}\n.n-input:hover {\n  border-color: var(--n-color-border-hover);\n}\n.n-input:focus {\n  border-color: var(--n-color-accent);\n  background: var(--n-color-surface);\n  outline: 0;\n  box-shadow: 0 0 0 1px var(--n-color-accent);\n}\n.n-input::placeholder {\n  color: var(--n-color-text-weakest);\n}\n.n-input:disabled {\n  border-color: var(--n-color-active);\n  color: var(--n-color-text-weakest);\n}\n.n-input[aria-invalid=\"true\"] {\n  border-color: var(--n-color-status-danger);\n}\n.n-input[aria-invalid=\"true\"]:focus {\n  border-color: var(--n-color-status-danger);\n  box-shadow: 0 0 0 1px var(--n-color-status-danger);\n}\n.n-clinic-icon,\n.n-clinic-icon-s {\n  color: var(--n-color-text-on-accent);\n  background: var(--n-clinic-icon-color, var(--n-color-accent));\n  border-radius: var(--n-border-radius);\n  box-shadow: var(--n-box-shadow);\n  inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  line-height: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  font-size: var(--n-clinic-icon-font-size, var(--n-font-size-s));\n  font-weight: var(--n-font-weight-active);\n  display: inline-block;\n  text-align: center;\n}\n.n-clinic-icon-s {\n  --n-clinic-icon-size: calc(var(--n-size-icon-l) / 1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/content/nord.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,+BAA+B;EAC/B,qCAAqC;EACrC,oCAAoC;EACpC,yCAAyC;EACzC,0CAA0C;EAC1C,4CAA4C;EAC5C,sCAAsC;EACtC,wCAAwC;EACxC,yCAAyC;EACzC,yCAAyC;EACzC,uCAAuC;EACvC,oCAAoC;EACpC,2CAA2C;EAC3C,qCAAqC;EACrC,wCAAwC;EACxC,4CAA4C;EAC5C,2CAA2C;EAC3C,4CAA4C;EAC5C,2CAA2C;EAC3C,6CAA6C;EAC7C,yCAAyC;EACzC,0CAA0C;EAC1C,uCAAuC;EACvC,2CAA2C;EAC3C,iDAAiD;EACjD,iDAAiD;EACjD,mDAAmD;EACnD,gDAAgD;EAChD,iDAAiD;EACjD,8CAA8C;EAC9C,kDAAkD;EAClD,oCAAoC;EACpC,0CAA0C;EAC1C,0CAA0C;EAC1C,kCAAkC;EAClC,qCAAqC;EACrC,oCAAoC;EACpC,gDAAgD;EAChD,uDAAuD;EACvD;sEACoE;EACpE;qCACmC;EACnC;iCAC+B;EAC/B;;iCAE+B;EAC/B,iDAAiD;EACjD,yDAAyD;EACzD;iCAC+B;EAC/B;kCACgC;EAChC;mCACiC;EACjC;;0CAEwC;EACxC,2BAA2B;EAC3B,yBAAyB;EACzB,yBAAyB;EACzB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,2BAA2B;EAC3B;;oBAEkB;EAClB,6DAA6D;EAC7D;sBACoB;EACpB;gCAC8B;EAC9B,oBAAoB;EACpB,2BAA2B;EAC3B,4BAA4B;EAC5B,2BAA2B;EAC3B,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;EACxB,sBAAsB;EACtB,6BAA6B;EAC7B,6BAA6B;EAC7B,kCAAkC;EAClC,gCAAgC;EAChC,gCAAgC;EAChC,2BAA2B;EAC3B,4BAA4B;EAC5B,4BAA4B;EAC5B,oBAAoB;EACpB,0BAA0B;EAC1B,uBAAuB;EACvB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,qBAAqB;EACrB,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;EACrB,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,iCAAiC;EACjC,6CAA6C;EAC7C,iCAAiC;EACjC,iCAAiC;EACjC,0BAA0B;EAC1B,mCAAmC;AACrC;AACA;EACE,+BAA+B;EAC/B,0BAA0B;AAC5B;AACA;;;EAGE,wBAAwB;EACxB,gBAAgB;EAChB,sBAAsB;EACtB,SAAS;EACT,SAAS;EACT,UAAU;AACZ;AACA;EACE,gBAAgB;AAClB;AACA;EACE,qBAAqB;EACrB,cAAc;AAChB;AACA;EACE,oBAAoB;EACpB,8BAA8B;EAC9B,wBAAwB;EACxB,gBAAgB;AAClB;AACA;EACE;IACE,iCAAiC;IACjC,uCAAuC;IACvC,kCAAkC;IAClC,gCAAgC;EAClC;AACF;AACA;EACE,oDAAoD;AACtD;AACA;EACE,kDAAkD;AACpD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,mDAAmD;EACnD,iDAAiD;AACnD;AACA;EACE,oDAAoD;EACpD,kDAAkD;AACpD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,8CAA8C;AAChD;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,uDAAuD;AACzD;AACA;EACE,yDAAyD;EACzD,uDAAuD;AACzD;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,qDAAqD;AACvD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,kDAAkD;AACpD;AACA;EACE,oDAAoD;EACpD,kDAAkD;AACpD;AACA;EACE,qDAAqD;EACrD,mDAAmD;AACrD;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,4DAA4D;EAC5D,0DAA0D;AAC5D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,8CAA8C;AAChD;AACA;EACE,2CAA2C;AAC7C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,+BAA+B;AACjC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,uBAAuB;AACzB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,sBAAsB;AACxB;AACA;EACE,wBAAwB;EACxB,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,uBAAuB;AACzB;AACA;EACE,YAAY;AACd;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,sCAAsC;AACxC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,wCAAwC;EACxC,sCAAsC;AACxC;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,kCAAkC;AACpC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,2CAA2C;AAC7C;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,8CAA8C;AAChD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,gDAAgD;AAClD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,sDAAsD;AACxD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,qDAAqD;AACvD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,uBAAuB;AACzB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,SAAS;AACX;AACA;EACE,sCAAsC;AACxC;AACA;;;;;EAKE,qDAAqD;EACrD,yCAAyC;EACzC,yCAAyC;EACzC,0BAA0B;AAC5B;AACA;;;;;EAKE,eAAe;AACjB;AACA;;;;;EAKE,0BAA0B;AAC5B;AACA;;EAEE,+BAA+B;EAC/B,6CAA6C;EAC7C,iCAAiC;EACjC,iCAAiC;EACjC,0BAA0B;AAC5B;AACA;;;;;EAKE,gBAAgB;AAClB;AACA;EACE,2BAA2B;AAC7B;AACA;;EAEE,kCAAkC;AACpC;AACA;;EAEE,iCAAiC;AACnC;AACA;;EAEE,gCAAgC;AAClC;AACA;;EAEE,+BAA+B;AACjC;AACA;;EAEE,+BAA+B;AACjC;AACA;EACE,yCAAyC;AAC3C;AACA;;EAEE,+BAA+B;EAC/B,iCAAiC;AACnC;AACA;;EAEE,gCAAgC;AAClC;AACA;EACE,qBAAqB;AACvB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,+BAA+B;EAC/B,0BAA0B;AAC5B;AACA;EACE,qBAAqB;AACvB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,qBAAqB;EACrB,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,8CAA8C;AAChD;AACA;EACE,iCAAiC;EACjC,iCAAiC;AACnC;AACA;EACE,SAAS;EACT,UAAU;EACV,aAAa;EACb,iEAAiE;EACjE,4BAA4B;AAC9B;AACA;EACE,iCAAiC;EACjC,wCAAwC;EACxC,+BAA+B;EAC/B,sEAAsE;EACtE,oBAAoB;AACtB;AACA;EACE,SAAS;AACX;AACA;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,+BAA+B;EAC/B,kCAAkC;AACpC;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,uCAAuC;AACzC;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,6BAA6B;AAC/B;AACA;;;;EAIE,aAAa;EACb,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;;;EAGE,mBAAmB;EACnB,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;AACA;;;;;;;EAOE,aAAa;EACb,kBAAkB;EAClB,6DAA6D;AAC/D;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;AACpB;AACA;;EAEE,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EACb,4BAA4B;EAC5B,oBAAoB;EACpB,gBAAgB;AAClB;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EACb,4BAA4B;EAC5B,oBAAoB;EACpB,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,eAAe;AACjB;AACA;;EAEE,iCAAiC;EACjC,cAAc;EACd,SAAS;EACT,SAAS;EACT,eAAe;EACf,iBAAiB;AACnB;AACA;;EAEE,aAAa;EACb,0BAA0B;EAC1B,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;EACzC,yCAAyC;EACzC,SAAS;AACX;AACA;EACE,iCAAiC;EACjC,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;AAC3C;AACA;EACE,gCAAgC;EAChC,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;AAC3C;AACA;EACE,cAAc;EACd,iCAAiC;EACjC,0BAA0B;EAC1B,iDAAiD;EACjD,+CAA+C;EAC/C,kDAAkD;EAClD,gDAAgD;EAChD,uCAAuC;EACvC,8CAA8C;EAC9C,iCAAiC;EACjC,iCAAiC;EACjC,+BAA+B;EAC/B,sCAAsC;EACtC;gFAC8E;AAChF;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,mCAAmC;EACnC,kCAAkC;EAClC,UAAU;EACV,2CAA2C;AAC7C;AACA;EACE,kCAAkC;AACpC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,0CAA0C;EAC1C,kDAAkD;AACpD;AACA;;EAEE,oCAAoC;EACpC,6DAA6D;EAC7D,qCAAqC;EACrC,+BAA+B;EAC/B,4DAA4D;EAC5D,2DAA2D;EAC3D,gEAAgE;EAChE,+DAA+D;EAC/D,4DAA4D;EAC5D,+DAA+D;EAC/D,wCAAwC;EACxC,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,sDAAsD;AACxD","sourcesContent":[":root {\n  --n-color-accent: rgb(53, 89, 199);\n  --n-color-text: rgb(12, 26, 61);\n  --n-color-text-link: rgb(53, 89, 199);\n  --n-color-text-weak: rgb(54, 67, 74);\n  --n-color-text-weaker: rgb(102, 118, 128);\n  --n-color-text-weakest: rgb(178, 186, 191);\n  --n-color-text-on-accent: rgb(255, 255, 255);\n  --n-color-text-error: rgb(185, 77, 55);\n  --n-color-text-success: rgb(80, 128, 56);\n  --n-color-nav-surface: rgb(246, 248, 248);\n  --n-color-nav-heading: rgb(143, 161, 170);\n  --n-color-nav-hover: rgb(234, 240, 240);\n  --n-color-border: rgb(216, 222, 228);\n  --n-color-border-strong: rgb(188, 197, 204);\n  --n-color-surface: rgb(255, 255, 255);\n  --n-color-background: rgb(255, 255, 255);\n  --n-color-surface-raised: rgb(250, 251, 251);\n  --n-color-overlay: rgba(144, 152, 152, 0.4);\n  --n-color-status-neutral: rgb(114, 110, 119);\n  --n-color-status-warning: rgb(240, 192, 68);\n  --n-color-status-highlight: rgb(125, 73, 193);\n  --n-color-status-danger: rgb(185, 77, 55);\n  --n-color-status-success: rgb(80, 128, 56);\n  --n-color-status-info: rgb(53, 89, 199);\n  --n-color-status-progress: rgb(0, 131, 138);\n  --n-color-status-neutral-weak: rgb(227, 227, 227);\n  --n-color-status-warning-weak: rgb(255, 233, 189);\n  --n-color-status-highlight-weak: rgb(238, 220, 255);\n  --n-color-status-danger-weak: rgb(255, 208, 199);\n  --n-color-status-success-weak: rgb(216, 229, 200);\n  --n-color-status-info-weak: rgb(204, 218, 255);\n  --n-color-status-progress-weak: rgb(196, 240, 242);\n  --n-color-button: rgb(255, 255, 255);\n  --n-color-button-hover: rgb(246, 248, 248);\n  --n-color-border-hover: rgb(102, 118, 128);\n  --n-color-icon: rgb(102, 118, 128);\n  --n-color-icon-hover: rgb(12, 26, 61);\n  --n-color-active: rgb(246, 248, 248);\n  --n-box-shadow: 0 1px 3px rgba(12, 12, 12, 0.09);\n  --n-box-shadow-header: 0 1px 5px rgba(12, 12, 12, 0.05);\n  --n-box-shadow-card: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(12, 12, 12, 0.05), 0 0 40px rgba(12, 12, 12, 0.015);\n  --n-box-shadow-nav: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(12, 12, 12, 0.14);\n  --n-box-shadow-popout: 0 4px 12px rgba(12, 12, 12, 0.15),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-modal: 0 24px 38px 3px rgba(12, 12, 12, 0.16),\n    0 9px 86px 8px rgba(12, 12, 12, 0.1), 0 11px 15px -7px rgba(12, 12, 12, 0.1),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-dark: 0 1px 3px rgba(0, 0, 0, 0.2);\n  --n-box-shadow-header-dark: 0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-card-dark: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-nav-dark: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(0, 0, 0, 0.24);\n  --n-box-shadow-popout-dark: 0 4px 12px rgba(0, 0, 0, 0.25),\n    0 0 0 1px var(--n-color-border);\n  --n-box-shadow-modal-dark: 0 0 0 1px var(--n-color-border),\n    0 24px 38px 3px rgba(0, 0, 0, 0.34), 0px 9px 86px 8px rgba(0, 0, 0, 0.28),\n    0px 11px 15px -7px rgba(0, 0, 0, 0.28);\n  --n-font-size-xxxl: 2.25rem;\n  --n-font-size-xxl: 1.5rem;\n  --n-font-size-xl: 1.25rem;\n  --n-font-size-l: 1rem;\n  --n-font-size-m: 14px;\n  --n-font-size-s: 12px;\n  --n-font-size-xs: 0.6875rem;\n  --n-font-family: \"Nordhealth Sans\", -apple-system, BlinkMacSystemFont,\n    \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\",\n    \"Segoe UI Emoji\";\n  --n-font-family-code: \"Nordhealth Mono\", monospace, monospace;\n  --n-font-features: \"kern\" 1, \"tnum\" 1, \"calt\" 1, \"case\" 1, \"cv05\" 1, \"zero\" 1,\n    \"cv08\" 0, \"ss03\" 1;\n  --n-font-features-reduced: \"kern\" 1, \"tnum\" 0, \"calt\" 1, \"case\" 1, \"cv05\" 1,\n    \"zero\" 0, \"cv08\" 0, \"ss03\" 1;\n  --n-font-weight: 400;\n  --n-font-weight-active: 500;\n  --n-font-weight-heading: 600;\n  --n-font-weight-strong: 670;\n  --n-size-icon-xxs: 8px;\n  --n-size-icon-xs: 10px;\n  --n-size-icon-s: 12px;\n  --n-size-icon-m: 16px;\n  --n-size-icon-l: 24px;\n  --n-size-icon-xl: 36px;\n  --n-size-icon-xxl: 72px;\n  --n-space-xxl: 72px;\n  --n-space-xl: 36px;\n  --n-space-l: 24px;\n  --n-space-m: 16px;\n  --n-space-s: 8px;\n  --n-border-radius-sharp: 0.02em;\n  --n-border-radius-s: 3px;\n  --n-border-radius: 5px;\n  --n-border-radius-pill: 999px;\n  --n-border-radius-circle: 50%;\n  --n-transition-quickly: 0.05s ease;\n  --n-transition-slowly: 0.2s ease;\n  --n-transition-mobile: 0.4s ease;\n  --n-line-height-tight: 1.15;\n  --n-line-height-heading: 1.2;\n  --n-line-height-caption: 1.3;\n  --n-line-height: 1.5;\n  --n-line-height-form: 20px;\n  --n-index-deep: -999999;\n  --n-index-default: 1;\n  --n-index-masked: 100;\n  --n-index-mask: 200;\n  --n-index-sticky: 300;\n  --n-index-nav: 400;\n  --n-index-overlay: 500;\n  --n-index-spinner: 600;\n  --n-index-popout: 700;\n  --n-index-toast: 800;\n  --n-index-modal: 900;\n}\n:where(.n-reset) :where(*, ::before, ::after) {\n  box-sizing: border-box;\n}\n:where(.n-reset) {\n  font-family: var(--n-font-family);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n  accent-color: var(--n-color-accent);\n}\n:where(.n-reset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-reset),\n:where(.n-reset)\n  :where(body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, img, svg, small, strike, strong, sub, sup, b, u, i, ol, ul, li, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, footer, header, nav, section, time, button, video, textarea, input) {\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n:where(.n-reset) :where(ul[role=\"list\"], ol[role=\"list\"]) {\n  list-style: none;\n}\n:where(.n-reset) :where(img, picture) {\n  max-inline-size: 100%;\n  display: block;\n}\n:where(.n-reset) :where(input, button, textarea, select) {\n  font-family: inherit;\n  font-feature-settings: inherit;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  :where(.n-reset) :where(*, ::before, ::after) {\n    animation-duration: 0s !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0s !important;\n    scroll-behavior: auto !important;\n  }\n}\n.n-border-is {\n  border-inline-start: 1px solid var(--n-color-border);\n}\n.n-border-ie {\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border-bs {\n  border-block-start: 1px solid var(--n-color-border);\n}\n.n-border-be {\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-b {\n  border-block-start: 1px solid var(--n-color-border);\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-i {\n  border-inline-start: 1px solid var(--n-color-border);\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border {\n  border: 1px solid var(--n-color-border);\n}\n.n-border-strong-is {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-ie {\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-bs {\n  border-block-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-be {\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-b {\n  border-block-start: 1px solid var(--n-color-border-strong);\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-i {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong {\n  border: 1px solid var(--n-color-border-strong);\n}\n.n-border-hover-is:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-ie:hover {\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-bs:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-be:hover {\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-b:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-i:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover:hover {\n  border: 1px solid var(--n-color-border-hover);\n}\n.n-border-d-is {\n  border-inline-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-bs {\n  border-block-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-be {\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-b {\n  border-block-start: 1px dashed var(--n-color-border);\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-i {\n  border-inline-start: 1px dashed var(--n-color-border);\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d {\n  border: 1px dashed var(--n-color-border);\n}\n.n-border-strong-d-is {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-bs {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-be {\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-b {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-i {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d {\n  border: 1px dashed var(--n-color-border-strong);\n}\n.n-border-hover-d-is:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-ie:hover {\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-bs:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-be:hover {\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-b:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-i:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d:hover {\n  border: 1px dashed var(--n-color-border-hover);\n}\n.n-border-radius-sharp {\n  border-radius: var(--n-border-radius-sharp);\n}\n.n-border-radius-s {\n  border-radius: var(--n-border-radius-s);\n}\n.n-border-radius {\n  border-radius: var(--n-border-radius);\n}\n.n-border-radius-pill {\n  border-radius: var(--n-border-radius-pill);\n}\n.n-border-radius-circle {\n  border-radius: var(--n-border-radius-circle);\n}\n.n-box-shadow {\n  box-shadow: var(--n-box-shadow);\n}\n.n-box-shadow-header {\n  box-shadow: var(--n-box-shadow-header);\n}\n.n-box-shadow-card {\n  box-shadow: var(--n-box-shadow-card);\n}\n.n-box-shadow-nav {\n  box-shadow: var(--n-box-shadow-nav);\n}\n.n-box-shadow-popout {\n  box-shadow: var(--n-box-shadow-popout);\n}\n.n-box-shadow-modal {\n  box-shadow: var(--n-box-shadow-modal);\n}\n.n-margin-is-xxl {\n  margin-inline-start: var(--n-space-xxl);\n}\n.n-margin-ie-xxl {\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-bs-xxl {\n  margin-block-start: var(--n-space-xxl);\n}\n.n-margin-be-xxl {\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-b-xxl {\n  margin-block-start: var(--n-space-xxl);\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-i-xxl {\n  margin-inline-start: var(--n-space-xxl);\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-xxl {\n  margin: var(--n-space-xxl);\n}\n.n-margin-is-xl {\n  margin-inline-start: var(--n-space-xl);\n}\n.n-margin-ie-xl {\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-bs-xl {\n  margin-block-start: var(--n-space-xl);\n}\n.n-margin-be-xl {\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-b-xl {\n  margin-block-start: var(--n-space-xl);\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-i-xl {\n  margin-inline-start: var(--n-space-xl);\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-xl {\n  margin: var(--n-space-xl);\n}\n.n-margin-is-l {\n  margin-inline-start: var(--n-space-l);\n}\n.n-margin-ie-l {\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-bs-l {\n  margin-block-start: var(--n-space-l);\n}\n.n-margin-be-l {\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-b-l {\n  margin-block-start: var(--n-space-l);\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-i-l {\n  margin-inline-start: var(--n-space-l);\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-l {\n  margin: var(--n-space-l);\n}\n.n-margin-is-m {\n  margin-inline-start: var(--n-space-m);\n}\n.n-margin-ie-m {\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-bs-m {\n  margin-block-start: var(--n-space-m);\n}\n.n-margin-be-m {\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-b-m {\n  margin-block-start: var(--n-space-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-i-m {\n  margin-inline-start: var(--n-space-m);\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-m {\n  margin: var(--n-space-m);\n}\n.n-margin-is-s {\n  margin-inline-start: var(--n-space-s);\n}\n.n-margin-ie-s {\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-bs-s {\n  margin-block-start: var(--n-space-s);\n}\n.n-margin-be-s {\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-b-s {\n  margin-block-start: var(--n-space-s);\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-i-s {\n  margin-inline-start: var(--n-space-s);\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-s {\n  margin: var(--n-space-s);\n}\n.n-margin-is-auto {\n  margin-inline-start: auto;\n}\n.n-margin-ie-auto {\n  margin-inline-end: auto;\n}\n.n-margin-bs-auto {\n  margin-block-start: auto;\n}\n.n-margin-be-auto {\n  margin-block-end: auto;\n}\n.n-margin-b-auto {\n  margin-block-start: auto;\n  margin-block-end: auto;\n}\n.n-margin-i-auto {\n  margin-inline-start: auto;\n  margin-inline-end: auto;\n}\n.n-margin-auto {\n  margin: auto;\n}\n.n-padding-is-xxl {\n  padding-inline-start: var(--n-space-xxl);\n}\n.n-padding-ie-xxl {\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-bs-xxl {\n  padding-block-start: var(--n-space-xxl);\n}\n.n-padding-be-xxl {\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-b-xxl {\n  padding-block-start: var(--n-space-xxl);\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-i-xxl {\n  padding-inline-start: var(--n-space-xxl);\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-xxl {\n  padding: var(--n-space-xxl);\n}\n.n-padding-is-xl {\n  padding-inline-start: var(--n-space-xl);\n}\n.n-padding-ie-xl {\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-bs-xl {\n  padding-block-start: var(--n-space-xl);\n}\n.n-padding-be-xl {\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-b-xl {\n  padding-block-start: var(--n-space-xl);\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-i-xl {\n  padding-inline-start: var(--n-space-xl);\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-xl {\n  padding: var(--n-space-xl);\n}\n.n-padding-is-l {\n  padding-inline-start: var(--n-space-l);\n}\n.n-padding-ie-l {\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-bs-l {\n  padding-block-start: var(--n-space-l);\n}\n.n-padding-be-l {\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-b-l {\n  padding-block-start: var(--n-space-l);\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-i-l {\n  padding-inline-start: var(--n-space-l);\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-l {\n  padding: var(--n-space-l);\n}\n.n-padding-is-m {\n  padding-inline-start: var(--n-space-m);\n}\n.n-padding-ie-m {\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-bs-m {\n  padding-block-start: var(--n-space-m);\n}\n.n-padding-be-m {\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-b-m {\n  padding-block-start: var(--n-space-m);\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-i-m {\n  padding-inline-start: var(--n-space-m);\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-m {\n  padding: var(--n-space-m);\n}\n.n-padding-is-s {\n  padding-inline-start: var(--n-space-s);\n}\n.n-padding-ie-s {\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-bs-s {\n  padding-block-start: var(--n-space-s);\n}\n.n-padding-be-s {\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-b-s {\n  padding-block-start: var(--n-space-s);\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-i-s {\n  padding-inline-start: var(--n-space-s);\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-s {\n  padding: var(--n-space-s);\n}\n.n-font-size-xxxl {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-font-size-xxl {\n  font-size: var(--n-font-size-xxl);\n}\n.n-font-size-xl {\n  font-size: var(--n-font-size-xl);\n}\n.n-font-size-l {\n  font-size: var(--n-font-size-l);\n}\n.n-font-size-m {\n  font-size: var(--n-font-size-m);\n}\n.n-font-size-s {\n  font-size: var(--n-font-size-s);\n}\n.n-font-size-xs {\n  font-size: var(--n-font-size-xs);\n}\n.n-font-weight {\n  font-weight: var(--n-font-weight);\n}\n.n-font-weight-active {\n  font-weight: var(--n-font-weight-active);\n}\n.n-font-weight-heading {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-font-weight-strong {\n  font-weight: var(--n-font-weight-strong);\n}\n.n-color-text {\n  color: var(--n-color-text);\n}\n.n-color-text-link {\n  color: var(--n-color-text-link);\n}\n.n-color-text-weak {\n  color: var(--n-color-text-weak);\n}\n.n-color-text-weaker {\n  color: var(--n-color-text-weaker);\n}\n.n-color-text-weakest {\n  color: var(--n-color-text-weakest);\n}\n.n-color-text-on-accent {\n  color: var(--n-color-text-on-accent);\n}\n.n-color-text-error {\n  color: var(--n-color-text-error);\n}\n.n-color-text-success {\n  color: var(--n-color-text-success);\n}\n.n-color-nav-heading {\n  color: var(--n-color-nav-heading);\n}\n.n-color-nav-surface {\n  background-color: var(--n-color-nav-surface);\n}\n.n-color-surface {\n  background-color: var(--n-color-surface);\n}\n.n-color-background {\n  background-color: var(--n-color-background);\n}\n.n-color-surface-raised {\n  background-color: var(--n-color-surface-raised);\n}\n.n-color-status-neutral {\n  background-color: var(--n-color-status-neutral);\n}\n.n-color-status-warning {\n  background-color: var(--n-color-status-warning);\n}\n.n-color-status-highlight {\n  background-color: var(--n-color-status-highlight);\n}\n.n-color-status-danger {\n  background-color: var(--n-color-status-danger);\n}\n.n-color-status-success {\n  background-color: var(--n-color-status-success);\n}\n.n-color-status-info {\n  background-color: var(--n-color-status-info);\n}\n.n-color-status-progress {\n  background-color: var(--n-color-status-progress);\n}\n.n-color-status-neutral-weak {\n  background-color: var(--n-color-status-neutral-weak);\n}\n.n-color-status-warning-weak {\n  background-color: var(--n-color-status-warning-weak);\n}\n.n-color-status-highlight-weak {\n  background-color: var(--n-color-status-highlight-weak);\n}\n.n-color-status-danger-weak {\n  background-color: var(--n-color-status-danger-weak);\n}\n.n-color-status-success-weak {\n  background-color: var(--n-color-status-success-weak);\n}\n.n-color-status-info-weak {\n  background-color: var(--n-color-status-info-weak);\n}\n.n-color-status-progress-weak {\n  background-color: var(--n-color-status-progress-weak);\n}\n.n-color-button {\n  background-color: var(--n-color-button);\n}\n.n-color-button-hover:hover {\n  background-color: var(--n-color-button-hover);\n}\n.n-color-active {\n  background-color: var(--n-color-active);\n}\n.n-color-icon {\n  color: var(--n-color-icon);\n}\n.n-color-icon-hover:hover {\n  color: var(--n-color-icon-hover);\n}\n.n-size-icon-xxs {\n  inline-size: var(--n-size-icon-xxs);\n  block-size: var(--n-size-icon-xxs);\n}\n.n-size-icon-xs {\n  inline-size: var(--n-size-icon-xs);\n  block-size: var(--n-size-icon-xs);\n}\n.n-size-icon-s {\n  inline-size: var(--n-size-icon-s);\n  block-size: var(--n-size-icon-s);\n}\n.n-size-icon-m {\n  inline-size: var(--n-size-icon-m);\n  block-size: var(--n-size-icon-m);\n}\n.n-size-icon-l {\n  inline-size: var(--n-size-icon-l);\n  block-size: var(--n-size-icon-l);\n}\n.n-size-icon-xl {\n  inline-size: var(--n-size-icon-xl);\n  block-size: var(--n-size-icon-xl);\n}\n.n-size-icon-xxl {\n  inline-size: var(--n-size-icon-xxl);\n  block-size: var(--n-size-icon-xxl);\n}\n.n-gap-xxl {\n  gap: var(--n-space-xxl);\n}\n.n-gap-xl {\n  gap: var(--n-space-xl);\n}\n.n-gap-l {\n  gap: var(--n-space-l);\n}\n.n-gap-m {\n  gap: var(--n-space-m);\n}\n.n-gap-s {\n  gap: var(--n-space-s);\n}\n:where(.n-typescale-xxxl, .n-typescale-xxl, .n-typescale-xl, .n-typescale-l, .n-typescale-m, .n-typescale-s, .n-typescale-xs, .n-typeset) {\n  font-family: var(--n-font-family);\n  margin: 0;\n}\n.n-typeset :where(pre, code) {\n  font-family: var(--n-font-family-code);\n}\n.n-typescale-l,\n.n-typescale-xl,\n.n-typescale-xxl,\n.n-typescale-xxxl,\n:where(.n-typeset) :where(h1, h2, h3, h4, h5, h6) {\n  font-feature-settings: var(--n-font-features-reduced);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-l,\n:where(.n-typeset) .n-typescale-xl,\n:where(.n-typeset) .n-typescale-xxl,\n:where(.n-typeset) .n-typescale-xxxl,\n:where(.n-typeset) :where(h2, h3, h4, h5, h6) {\n  margin: 0.5em 0;\n}\n:where(.n-typeset) * + .n-typescale-l,\n:where(.n-typeset) * + .n-typescale-xl,\n:where(.n-typeset) * + .n-typescale-xxl,\n:where(.n-typeset) * + .n-typescale-xxxl,\n:where(.n-typeset) * + :where(h2, h3, h4, h5, h6) {\n  margin-block-start: 1.5rem;\n}\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  font-size: var(--n-font-size-m);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-m,\n:where(.n-typeset) .n-typescale-s,\n:where(.n-typeset) .n-typescale-xs,\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  margin: 0.85em 0;\n}\n:where(.n-typeset) :where(dd) {\n  margin-inline-start: 0.85em;\n}\n.n-typescale-xxxl,\n:where(.n-typeset h1) {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-typescale-xxl,\n:where(.n-typeset h2) {\n  font-size: var(--n-font-size-xxl);\n}\n.n-typescale-xl,\n:where(.n-typeset h3) {\n  font-size: var(--n-font-size-xl);\n}\n.n-typescale-l,\n:where(.n-typeset) :where(h4, blockquote) {\n  font-size: var(--n-font-size-l);\n}\n.n-typescale-m,\n:where(.n-typeset) :where(p, h5) {\n  font-size: var(--n-font-size-m);\n}\n:where(.n-typeset h5) {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-typescale-s,\n:where(.n-typeset) :where(h6, figcaption) {\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height);\n}\n.n-typescale-xs,\n:where(.n-typeset small) {\n  font-size: var(--n-font-size-xs);\n}\n:where(.n-typeset) > :first-child {\n  margin-block-start: 0;\n}\n:where(.n-typeset) > :last-child {\n  margin-block-end: 0;\n}\n:where(.n-typeset) :where(ul, ol, dl, blockquote) {\n  margin: 0.5em 0;\n  padding: 0 0 0 1.5em;\n}\n:where(.n-typeset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-typeset a:hover) {\n  text-decoration: none;\n}\n:where(.n-typeset code) {\n  overflow-wrap: break-word;\n}\n:where(.n-typeset pre code) {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n:where(.n-typeset) :where(strong, b) {\n  font-weight: var(--n-font-weight-strong);\n}\n:where(.n-typeset mark) {\n  background: var(--n-color-status-warning-weak);\n}\n.n-caption {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n}\n.n-dl {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(9ch, max-content));\n  column-gap: var(--n-space-m);\n}\n.n-dl dt {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight-active);\n  font-size: var(--n-font-size-s);\n  padding-block-start: calc(var(--n-font-size-m) - var(--n-font-size-s));\n  grid-column-start: 1;\n}\n.n-dl :where(dt, dd) {\n  margin: 0;\n}\n.n-dl dd {\n  color: var(--n-color-text);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-dl dd:last-of-type {\n  margin-block-end: 0;\n}\n.n-color-accent,\n.n-color-accent-bg {\n  background-color: var(--n-color-accent);\n}\n.n-color-accent-text {\n  color: var(--n-color-accent);\n}\n.n-color-accent-fill {\n  fill: var(--n-color-accent);\n}\n.n-color-accent-stroke {\n  stroke: var(--n-color-accent);\n}\n.n-stack,\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  display: flex;\n  justify-content: flex-start;\n  flex-flow: column wrap;\n}\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  align-items: center;\n  flex-direction: row;\n}\n.n-stack-horizontal-s {\n  align-items: start;\n}\n.n-stack-horizontal-e {\n  align-items: end;\n}\n.n-grid,\n.n-grid-12,\n.n-grid-2,\n.n-grid-3,\n.n-grid-4,\n.n-grid-6,\n.n-grid-8 {\n  display: grid;\n  align-items: start;\n  grid-template-columns: repeat(var(--n-grid-columns, 12), 1fr);\n}\n.n-grid-8 {\n  --n-grid-columns: 8;\n}\n.n-grid-6 {\n  --n-grid-columns: 6;\n}\n.n-grid-4 {\n  --n-grid-columns: 4;\n}\n.n-grid-3 {\n  --n-grid-columns: 3;\n}\n.n-grid-2 {\n  --n-grid-columns: 2;\n}\n.n-grid-center-i {\n  justify-self: center;\n}\n.n-grid-center-b {\n  align-self: center;\n}\n.n-grid-center {\n  place-self: center;\n}\n.n-container,\n.n-container-l {\n  max-inline-size: 1200px;\n}\n.n-container-xl {\n  max-inline-size: 2400px;\n}\n.n-container-m {\n  max-inline-size: 1000px;\n}\n.n-container-s {\n  max-inline-size: 800px;\n}\n.n-container-xs {\n  max-inline-size: 600px;\n}\n.n-container-xxs {\n  max-inline-size: 400px;\n}\n.n-truncate {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.n-truncate-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-truncate-3 {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-align-start {\n  text-align: start;\n}\n.n-align-center {\n  text-align: center;\n}\n.n-align-end {\n  text-align: end;\n}\n.n-divider,\n.n-hr {\n  background: var(--n-color-border);\n  display: block;\n  margin: 0;\n  border: 0;\n  block-size: 1px;\n  inline-size: 100%;\n}\n.n-hint,\n.n-label {\n  display: flex;\n  color: var(--n-color-text);\n  font-family: var(--n-font-family);\n  font-size: var(--n-font-size-m);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  margin: 0;\n}\n.n-hint {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-error {\n  color: var(--n-color-text-error);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-input {\n  display: block;\n  background: var(--n-color-active);\n  color: var(--n-color-text);\n  padding-block-start: calc(var(--n-space-s) - 1px);\n  padding-block-end: calc(var(--n-space-s) - 1px);\n  padding-inline-start: calc(var(--n-space-s) * 1.6);\n  padding-inline-end: calc(var(--n-space-s) * 1.6);\n  border-radius: var(--n-border-radius-s);\n  border: 1px solid var(--n-color-border-strong);\n  font-family: var(--n-font-family);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  line-height: var(--n-line-height-form);\n  transition: border var(--n-transition-slowly),\n    box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);\n}\n.n-input:hover {\n  border-color: var(--n-color-border-hover);\n}\n.n-input:focus {\n  border-color: var(--n-color-accent);\n  background: var(--n-color-surface);\n  outline: 0;\n  box-shadow: 0 0 0 1px var(--n-color-accent);\n}\n.n-input::placeholder {\n  color: var(--n-color-text-weakest);\n}\n.n-input:disabled {\n  border-color: var(--n-color-active);\n  color: var(--n-color-text-weakest);\n}\n.n-input[aria-invalid=\"true\"] {\n  border-color: var(--n-color-status-danger);\n}\n.n-input[aria-invalid=\"true\"]:focus {\n  border-color: var(--n-color-status-danger);\n  box-shadow: 0 0 0 1px var(--n-color-status-danger);\n}\n.n-clinic-icon,\n.n-clinic-icon-s {\n  color: var(--n-color-text-on-accent);\n  background: var(--n-clinic-icon-color, var(--n-color-accent));\n  border-radius: var(--n-border-radius);\n  box-shadow: var(--n-box-shadow);\n  inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  line-height: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  font-size: var(--n-clinic-icon-font-size, var(--n-font-size-s));\n  font-weight: var(--n-font-weight-active);\n  display: inline-block;\n  text-align: center;\n}\n.n-clinic-icon-s {\n  --n-clinic-icon-size: calc(var(--n-size-icon-l) / 1.2);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/content/nord.css":
/*!******************************!*\
  !*** ./src/content/nord.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./nord.css */ "./node_modules/css-loader/dist/cjs.js!./src/content/nord.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/AutocompleteMixin-370de2be.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/AutocompleteMixin-370de2be.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
function t(t){class r extends t{constructor(){super(...arguments),this.autocomplete="off"}}return (0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)()],r.prototype,"autocomplete",void 0),r}
//# sourceMappingURL=AutocompleteMixin-370de2be.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Banner.js":
/*!***********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Banner.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ g)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/@nordhealth/components/lib/Icon.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./state-70f38ceb.js */ "./node_modules/@nordhealth/components/lib/state-70f38ceb.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unsafe-html-6be42999.js */ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
/* harmony import */ var _observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./observe-a9c6dfb6.js */ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
var s=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 70a63 63 0 1 0 126 0A63 63 0 1 0 7 70z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/><path fill="currentColor" d="M59.5 101.5a10.5 10.5 0 1 0 21 0 10.5 10.5 0 1 0-21 0z"/><path d="M70 70a17.5 17.5 0 1 0-14-28" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="14"/></svg>',title:"interface-help-2",tags:"nordicon interface help support question mark circle round"});var c=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M18 9C18.9941 9 19.8 9.80589 19.8 10.8V18C19.8 18.9941 18.9941 19.8 18 19.8C17.0058 19.8 16.2 18.9941 16.2 18V10.8C16.2 9.80589 17.0058 9 18 9Z" fill="currentColor"/><path d="M15.3214 25.2C15.3214 25.9104 15.6036 26.5917 16.106 27.0941C16.6083 27.5964 17.2896 27.8786 18 27.8786C18.7105 27.8786 19.3918 27.5964 19.8941 27.0941C20.3965 26.5917 20.6787 25.9104 20.6787 25.2C20.6787 24.4896 20.3965 23.8083 19.8941 23.3059C19.3918 22.8036 18.7105 22.5214 18 22.5214C17.2896 22.5214 16.6083 22.8036 16.106 23.3059C15.6036 23.8083 15.3214 24.4896 15.3214 25.2Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M15.3891 0.71328C16.1794 0.244619 17.0813 -0.00268555 18.0002 -0.00268555C18.919 -0.00268555 19.8209 0.244619 20.6113 0.71328C21.3993 1.18057 22.0474 1.85075 22.4881 2.65385L35.092 25.2668L35.0968 25.2753C35.7031 26.3771 36.0118 27.618 35.9924 28.8754C35.973 30.1329 35.6263 31.3636 34.9863 32.4462C34.3463 33.5288 33.4352 34.426 32.3428 35.0491C31.2505 35.6723 30.0146 36 28.757 35.9999C28.757 35.9999 28.757 35.9999 28.757 35.9999H7.23618C7.23611 35.9999 7.23626 35.9999 7.23618 35.9999C5.97993 35.9998 4.74519 35.6722 3.65409 35.0496C2.56299 34.427 1.65299 33.5308 1.01378 32.4493C0.374574 31.3678 0.0282382 30.1384 0.00891227 28.8823C-0.0104135 27.6262 0.297938 26.3868 0.90357 25.2862L0.90814 25.2779L13.5122 2.65398C13.9529 1.85082 14.601 1.1806 15.3891 0.71328ZM7.23641 32.3999H28.757C29.3889 32.4 30.0101 32.2353 30.559 31.9222C31.1079 31.609 31.5657 31.1582 31.8873 30.6142C32.2089 30.0703 32.3831 29.4518 32.3928 28.82C32.4026 28.1896 32.2482 27.5676 31.945 27.0149C31.9442 27.0136 31.9435 27.0123 31.9428 27.011L19.3403 4.40069L19.3332 4.38778C19.2024 4.14852 19.0096 3.94887 18.7751 3.80979C18.5405 3.67071 18.2729 3.59731 18.0002 3.59731C17.7275 3.59731 17.4599 3.67071 17.2253 3.80979C16.9908 3.94887 16.798 4.14852 16.6672 4.38778L16.6602 4.40037L4.0576 27.0217C4.05692 27.0229 4.05625 27.0242 4.05558 27.0254C3.75289 27.577 3.59881 28.1978 3.60849 28.827C3.61819 29.4575 3.79205 30.0747 4.11292 30.6175C4.4338 31.1604 4.89061 31.6103 5.43834 31.9229C5.986 32.2354 6.60586 32.3998 7.23641 32.3999C7.23648 32.3999 7.23633 32.3999 7.23641 32.3999Z" fill="currentColor"/></svg>\n',title:"interface-warning",tags:"nordicon interface warning exclamation mark triangle shape alert error"});var d=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.27208 5.27208C8.64773 1.89642 13.2261 0 18 0C22.7739 0 27.3523 1.89642 30.7279 5.27208C34.1036 8.64773 36 13.2261 36 18C36 22.7739 34.1036 27.3523 30.7279 30.7279C27.3523 34.1036 22.7739 36 18 36C13.2261 36 8.64773 34.1036 5.27208 30.7279C1.89642 27.3523 0 22.7739 0 18C0 13.2261 1.89642 8.64773 5.27208 5.27208ZM18 3.6C14.1809 3.6 10.5182 5.11714 7.81766 7.81766C5.11714 10.5182 3.6 14.1809 3.6 18C3.6 21.8191 5.11714 25.4818 7.81766 28.1823C10.5182 30.8829 14.1809 32.4 18 32.4C21.8191 32.4 25.4818 30.8829 28.1823 28.1823C30.8829 25.4818 32.4 21.8191 32.4 18C32.4 14.1809 30.8829 10.5182 28.1823 7.81766C25.4818 5.11714 21.8191 3.6 18 3.6Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M18 18C18.9941 18 19.8 18.8059 19.8 19.8V27C19.8 27.9941 18.9941 28.8 18 28.8C17.0058 28.8 16.2 27.9941 16.2 27V19.8C16.2 18.8059 17.0058 18 18 18Z" fill="currentColor"/><path d="M15.2795 10.7999C15.2795 11.5213 15.5661 12.2132 16.0763 12.7234C16.5864 13.2336 17.2784 13.5202 17.9998 13.5202C18.7213 13.5202 19.4132 13.2336 19.9234 12.7234C20.4335 12.2132 20.7201 11.5213 20.7201 10.7999C20.7201 10.0784 20.4335 9.38649 19.9234 8.87634C19.4132 8.36619 18.7213 8.07959 17.9998 8.07959C17.2784 8.07959 16.5864 8.36619 16.0763 8.87634C15.5661 9.38649 15.2795 10.0784 15.2795 10.7999Z" fill="currentColor"/></svg>\n',title:"interface-info",tags:"nordicon interface info circle round alert notice information"});const C="interface-checked-circle";var u=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.67198 5.27208C9.04764 1.89642 13.626 0 18.3999 0C23.1738 0 27.7522 1.89642 31.1278 5.27208C34.5035 8.64773 36.3999 13.2261 36.3999 18C36.3999 22.7739 34.5035 27.3523 31.1278 30.7279C27.7522 34.1036 23.1738 36 18.3999 36C13.626 36 9.04764 34.1036 5.67198 30.7279C2.29633 27.3523 0.399902 22.7739 0.399902 18C0.399902 13.2261 2.29633 8.64773 5.67198 5.27208ZM18.3999 3.6C14.5808 3.6 10.9181 5.11714 8.21757 7.81766C5.51704 10.5182 3.9999 14.1809 3.9999 18C3.9999 21.8191 5.51704 25.4818 8.21757 28.1823C10.9181 30.8829 14.5808 32.4 18.3999 32.4C22.219 32.4 25.8817 30.8829 28.5822 28.1823C31.2828 25.4818 32.7999 21.8191 32.7999 18C32.7999 14.1809 31.2828 10.5182 28.5822 7.81766C25.8817 5.11714 22.219 3.6 18.3999 3.6Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M27.0484 10.0907C27.8261 10.7099 27.9546 11.8423 27.3354 12.62L16.233 26.5642C15.8927 26.9915 15.3768 27.2412 14.8306 27.243C14.2843 27.2447 13.7669 26.9983 13.4239 26.5732L9.39039 21.5735C8.76619 20.7998 8.8874 19.6666 9.66112 19.0424C10.4348 18.4182 11.5681 18.5394 12.1923 19.3131L14.8156 22.5648L24.5191 10.3776C25.1383 9.59994 26.2707 9.47146 27.0484 10.0907Z" fill="currentColor"/></svg>\n',title:C,tags:"nordicon interface circle round checked checkmark ready done success"});const v=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-banner-box-shadow:var(--n-banner-box-shadow, none);--_n-banner-border-radius:var(--n-banner-border-radius, var(--n-border-radius));--_n-banner-background:var(--n-color-status-info-weak);color:var(--n-color-text)}.n-banner{background:var(--_n-banner-background);border-radius:var(--_n-banner-border-radius);box-shadow:var(--_n-banner-box-shadow);padding:calc(var(--n-space-m)/ 1.2) var(--n-space-l);margin:0;inline-size:100%}.n-banner-content{inline-size:calc(100% - var(--n-space-xl))}nord-icon{transform:translateY(2px);color:var(--n-color-icon-hover)}::slotted(a){color:var(--n-color-text)!important;text-decoration:underline!important}::slotted(p){margin:0!important}:host([variant=success]){--_n-banner-background:var(--n-color-status-success-weak)}:host([variant=danger]){--_n-banner-background:var(--n-color-status-danger-weak)}:host([variant=warning]){--_n-banner-background:var(--n-color-status-warning-weak)}`;_Icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].registerIcon(s),_Icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].registerIcon(c),_Icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].registerIcon(d),_Icon_js__WEBPACK_IMPORTED_MODULE_3__["default"].registerIcon(u);const p={warning:"interface-help-2",danger:"interface-warning",info:"interface-info",success:C};let f=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.variant="info"}render(){const r=p[this.variant]||p.info;return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="n-banner" role="alert"><nord-stack align-items="start" direction="horizontal"><nord-icon name="${r}" size="m"></nord-icon><div class="n-banner-content"><slot></slot></div></nord-stack></div>`}};f.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_4__.s,v],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],f.prototype,"variant",void 0),f=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-banner")],f);var g=f;
//# sourceMappingURL=Banner.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Button.js":
/*!***********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Button.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ f)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _ref_0e619221_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ref-0e619221.js */ "./node_modules/@nordhealth/components/lib/ref-0e619221.js");
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
/* harmony import */ var _LightDomController_3c726b20_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./LightDomController-3c726b20.js */ "./node_modules/@nordhealth/components/lib/LightDomController-3c726b20.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
/* harmony import */ var _Spinner_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Spinner.js */ "./node_modules/@nordhealth/components/lib/Spinner.js");
/* harmony import */ var _FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FocusableMixin-34870ed3.js */ "./node_modules/@nordhealth/components/lib/FocusableMixin-34870ed3.js");
/* harmony import */ var _InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./InputMixin-158f63fb.js */ "./node_modules/@nordhealth/components/lib/InputMixin-158f63fb.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
const p=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-button-border-radius:var(--n-button-border-radius, var(--n-border-radius-s));--_n-button-gap:var(--n-button-gap, var(--n-space-s));--_n-button-gradient:var(--n-button-gradient, linear-gradient(to bottom, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0.013) 100%));--_n-button-background-color:var(--n-button-background-color, var(--n-color-button));--_n-button-border-color:var(--n-button-border-color, var(--n-color-border-strong));--_n-button-text-align:var(--n-button-text-align, center);--_n-button-padding-inline:calc(var(--n-space-m) / 1.2);--_n-button-box-shadow:var(--n-box-shadow);--_n-button-color:var(--n-color-text);--_n-button-opacity:1;--_n-button-border-style:solid;--_n-button-font-size:var(--n-font-size-m);--_n-button-font-weight:var(--n-font-weight);--_n-button-min-block-size:var(--n-space-xl);--_n-button-inline-size:fit-content;--_n-button-padding-block:calc(var(--n-space-s) / 1.6);display:inline-block}.n-button{-webkit-appearance:none;align-items:center;appearance:none;background:var(--_n-button-background-color);opacity:var(--_n-button-opacity);border-radius:var(--_n-button-border-radius);border:1px var(--_n-button-border-style) var(--_n-button-border-color);box-shadow:var(--_n-button-box-shadow);color:var(--_n-button-color);cursor:pointer;display:flex;gap:var(--_n-button-gap);font-family:var(--n-font-family);font-feature-settings:var(--n-font-features);font-size:var(--_n-button-font-size);font-weight:var(--_n-button-font-weight);line-height:var(--n-line-height-form);margin:0;min-block-size:var(--_n-button-min-block-size);padding:var(--_n-button-padding-block) var(--_n-button-padding-inline);text-align:var(--_n-button-text-align);text-decoration:none;transition:.1s ease;transition-property:background-color,opacity,color,box-shadow;-webkit-user-select:none;user-select:none;position:relative;inline-size:var(--_n-button-inline-size)}.n-button::after{content:"";position:absolute;background:0 0;background-image:var(--_n-button-gradient);border-radius:var(--_n-button-border-radius);background-repeat:repeat-x;inline-size:100%;inset-inline:0;block-size:100%;inset-block-start:0}:host([expand]){--_n-button-inline-size:100%;display:block}.n-content{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;position:relative}.n-button:hover{--_n-button-border-color:var(--n-button-border-color, var(--n-color-border-hover));--_n-button-background-color:var(--n-button-background-color, var(--n-color-button-hover))}.n-button:focus{--_n-button-border-color:var(--n-button-border-color, var(--n-color-accent));--_n-button-border-style:solid;--_n-button-box-shadow:0 0 0 1px var(--n-color-accent),var(--n-box-shadow);outline:0}.n-button:active{opacity:.8;transform:translateY(1px);transition:none}:host([variant=primary]){--_n-button-box-shadow:none;--_n-button-color:var(--n-color-text-on-accent);--_n-button-font-weight:var(--n-font-weight-active)}:host([variant=primary]),:host([variant=primary]) .n-button:hover{--_n-button-border-color:var(--n-button-border-color, transparent);--_n-button-background-color:var(--n-button-background-color, var(--n-color-accent))}:host([variant=primary]) .n-button:hover{filter:brightness(93%)}:host([variant=primary]) .n-button:focus{--_n-button-box-shadow:0 0 0 1px var(--n-color-surface),0 0 0 3px var(--_n-button-border-color)}:host([variant=dashed]){--_n-button-border-color:var(--n-button-border-color, var(--n-color-border-hover));--_n-button-color:var(--n-color-text-weaker);--_n-button-border-style:dashed;--_n-button-box-shadow:none}:host([variant=dashed]) .n-button:hover{--_n-button-color:var(--n-color-text)}:host([variant=dashed]) .n-button::after{display:none}:host([variant=plain]){--_n-button-box-shadow:none}:host([variant=plain]),:host([variant=plain]) .n-button:hover{--_n-button-border-color:var(--n-button-border-color, transparent)}:host([variant=plain]) .n-button::after{display:none}:host([variant=danger]){--_n-button-box-shadow:none;--_n-button-color:var(--n-color-text-on-accent);--_n-button-font-weight:var(--n-font-weight-active)}:host([variant=danger]),:host([variant=danger]) .n-button:hover{--_n-button-border-color:var(--n-button-border-color, transparent);--_n-button-background-color:var(--n-button-background-color, var(--n-color-status-danger))}:host([variant=danger]) .n-button:hover{filter:brightness(93%)}:host([variant=danger]) .n-button:focus{--_n-button-border-color:var(--n-button-border-color, var(--n-color-status-danger));--_n-button-box-shadow:0 0 0 1px var(--n-color-surface),0 0 0 3px var(--n-color-status-danger)}:host([variant=switch]){--_n-button-border-radius:var(--n-button-border-radius, var(--n-border-radius-sharp));--_n-button-border-color:var(--n-button-border-color, transparent);--_n-button-text-align:var(--n-button-text-align, start);--_n-button-background-color:var(--n-button-background-color, transparent);--_n-button-color:var(--n-color-text);--_n-button-font-weight:var(--n-font-weight-heading);--_n-button-box-shadow:none;--_n-button-min-block-size:calc(var(--n-space-xxl) - 1px);--_n-button-font-size:var(--n-font-size-l);--_n-button-padding-inline:var(--n-space-m);display:flex;align-items:center}:host([variant=switch]) .n-button *{pointer-events:none}:host([variant=switch]) .n-button::after{display:none}:host([variant=switch]) .n-button:hover,:host([variant=switch][aria-expanded=true]) .n-button{--_n-button-border-color:var(--n-button-border-color, transparent);--_n-button-background-color:var(--n-button-background-color, var(--n-color-nav-hover))}:host([variant=switch]) .n-button:focus{--_n-button-box-shadow:inset 0 0 0 1px var(--_n-button-border-color)}.n-button-switch-icon{color:var(--n-color-icon);margin-inline-end:var(--n-space-s)}:host([disabled]){--_n-button-border-color:var(--n-button-border-color, var(--_n-button-background-color));--_n-button-background-color:var(--n-button-background-color, var(--n-color-border));--_n-button-box-shadow:none;--_n-button-color:var(--n-color-text-weaker);--_n-button-opacity:0.5;pointer-events:none}:host([disabled]) .n-button::after{display:none}.n-button-spinner{position:absolute;transform:translateX(-50%) translateY(-50%);inset-block-start:50%;inset-inline-start:50%}:host([loading]:not([href])){pointer-events:none}:host([loading]:not([href])) .n-content,:host([loading]:not([href])) ::slotted([slot=end]),:host([loading]:not([href])) ::slotted([slot=start]){opacity:0}:host([size="s"]){--_n-button-gap:var(--n-button-gap, calc(var(--n-space-s) / 2));--_n-button-padding-inline:var(--n-space-s);--_n-button-padding-block:calc(var(--n-space-s) / 1.5);--_n-button-font-size:var(--n-font-size-s);--_n-button-min-block-size:var(--n-space-l)}:host([size="s"]) .n-button{line-height:var(--n-line-height-tight)}:host([size="l"]){--_n-button-border-radius:var(--n-button-border-radius, var(--n-border-radius));--_n-button-padding-inline:calc(var(--n-space-l) / 1.3);--_n-button-font-size:var(--n-font-size-l);--_n-button-min-block-size:calc(var(--n-space-xxl) - var(--n-space-l));--_n-button-font-weight:var(--n-font-weight-active)}::slotted(*){color:inherit;pointer-events:none}::slotted(svg){color:var(--n-color-icon)}::slotted(button[slot=proxy]){display:none}:host(:not([variant=primary],[variant=danger])) ::slotted(nord-icon){color:var(--n-color-icon)}slot:not([name])::slotted(nord-icon:not([size=xs])){transform:translateY(1px)}`;let g=class extends((0,_InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_9__.I)((0,_FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_8__.F)(_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s))){constructor(){super(...arguments),this.buttonRef=(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_3__.e)(),this.events=new _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_4__.E(this),this.lightDom=new _LightDomController_3c726b20_js__WEBPACK_IMPORTED_MODULE_5__.L(this,{render:()=>this.renderLightDom()}),this.variant="default",this.type="submit",this.size="m",this.download=!1,this.target="_self",this.expand=!1,this.loading=!1,this.handleOuterClick=t=>{t.composedPath().some((t=>t===this.focusableRef.value||t===this.buttonRef.value))||t.stopPropagation()}}connectedCallback(){super.connectedCallback(),this.events.listen(this,"click",this.handleOuterClick,!0)}render(){const t=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<slot name="start"></slot><div class="n-content"><slot></slot></div><nord-spinner class="n-button-spinner" color="currentColor" ?hidden="${!this.loading||this.href}"></nord-spinner><slot name="end">${"switch"!==this.variant||this.href?_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.b:_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<nord-icon class="n-button-switch-icon" name="interface-dropdown-small" size="s"></nord-icon>`}</slot>`;return this.href?this.renderLink(t):this.renderButton(t)}renderLink(t){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<a ${(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_3__.n)(this.focusableRef)} class="n-button" target="${this.target}" ?download="${this.download}" href="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.disabled,_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.b,this.href)}" tabindex="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.disabled,"-1")}" aria-disabled="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.disabled,"true")}" role="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.disabled,"link")}">${t}</a>`}renderButton(t){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<slot name="proxy" @slotchange="${this.handleProxyChange}"></slot><button ${(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_3__.n)(this.focusableRef)} class="n-button" ?disabled="${this.disabled}" name="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.name)}" value="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.value)}" @click="${this.handleClick}" aria-disabled="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.loading,"true")}" aria-expanded="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.accessibleExpanded)}" aria-haspopup="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.accessibleHasPopup)}">${t}</button>`}renderLightDom(){return this.href||!this.form?_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.b:_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<button ${(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_3__.n)(this.buttonRef)} slot="proxy" name="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.name)}" value="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.value)}" ?disabled="${this.disabled}" form="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_6__.c)(this.getAttribute("form"))}" type="${this.type}"></button>`}handleClick(t){this.buttonRef.value&&(t.stopPropagation(),this.buttonRef.value.click())}handleProxyChange(t){const n=t.target,o=this.buttonRef.value;o&&o.assignedSlot!==n&&this.appendChild(o)}};g.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_10__.s,p],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],g.prototype,"variant",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],g.prototype,"type",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],g.prototype,"size",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({attribute:"aria-expanded"})],g.prototype,"accessibleExpanded",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({attribute:"aria-haspopup"})],g.prototype,"accessibleHasPopup",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],g.prototype,"href",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({type:Boolean})],g.prototype,"download",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],g.prototype,"target",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],g.prototype,"expand",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],g.prototype,"loading",void 0),g=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-button")],g);var f=g;
//# sourceMappingURL=Button.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Component-92eb6234.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
const t=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.i`:host{all:unset;display:block;font-family:var(--n-font-family);font-size:var(--n-font-size-m);line-height:var(--n-line-height);font-feature-settings:var(--n-font-features);box-sizing:border-box;text-align:start}*,::after,::before{box-sizing:border-box;margin:0;padding:0}:host([hidden]),[hidden]{display:none!important}`;
//# sourceMappingURL=Component-92eb6234.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Divider.js":
/*!************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Divider.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./observe-a9c6dfb6.js */ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
const n=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-divider-color:var(--n-divider-color, var(--n-color-border));--_n-divider-size:var(--n-divider-size, 1px)}:host([direction=horizontal]){display:block;border-block-start:var(--_n-divider-size) solid var(--_n-divider-color)}:host([direction=vertical]){display:inline-block;min-block-size:100%;border-inline-start:var(--_n-divider-size) solid var(--_n-divider-color)}`;let a=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.direction="horizontal"}firstUpdated(){this.setAttribute("role","separator")}handleDirectionChange(){this.setAttribute("aria-orientation","vertical"===this.direction?"vertical":"horizontal")}};a.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_4__.s,n],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],a.prototype,"direction",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_3__.o)("direction")],a.prototype,"handleDirectionChange",null),a=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-divider")],a);var l=a;
//# sourceMappingURL=Divider.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ s)
/* harmony export */ });
class s{constructor(s){this.listeners=[],s.addController(this)}hostDisconnected(){this.listeners.forEach((s=>s())),this.listeners=[]}listen(s,e,t,i){s.addEventListener(e,t,i);this.listeners.push((()=>s.removeEventListener(e,t,i)))}}
//# sourceMappingURL=EventController-d99ebeef.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/FocusableMixin-34870ed3.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/FocusableMixin-34870ed3.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _ref_0e619221_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ref-0e619221.js */ "./node_modules/@nordhealth/components/lib/ref-0e619221.js");
function l(l){return class extends l{constructor(){super(...arguments),this.focusableRef=(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_0__.e)()}focus(e){var l;null===(l=this.focusableRef.value)||void 0===l||l.focus(e)}blur(){var e;null===(e=this.focusableRef.value)||void 0===e||e.blur()}click(){var e;null===(e=this.focusableRef.value)||void 0===e||e.click()}}}
//# sourceMappingURL=FocusableMixin-34870ed3.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/FormAssociatedMixin-252fb0e9.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/FormAssociatedMixin-252fb0e9.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "F": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
/* harmony import */ var _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SlotController-89834aef.js */ "./node_modules/@nordhealth/components/lib/SlotController-89834aef.js");
/* harmony import */ var _events_731d0007_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./events-731d0007.js */ "./node_modules/@nordhealth/components/lib/events-731d0007.js");
/* harmony import */ var _VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./VisuallyHidden.js */ "./node_modules/@nordhealth/components/lib/VisuallyHidden.js");
class n{constructor(t,e){this.host=t,this.options=e,this.handleFormData=t=>{const{disabled:e,name:r}=this.host;if(e)return;const i=this.options.value();r&&null!=i&&t.formData.append(r,i)},t.addController(this),this.events=new _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_3__.E(t)}hostConnected(){this.host.form&&this.events.listen(this.host.form,"formdata",this.handleFormData)}}function h(i){class h extends i{constructor(){super(...arguments),this.labelSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_4__.S(this,"label"),this.errorSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_4__.S(this,"error"),this.hintSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_4__.S(this,"hint"),this.formData=new n(this,{value:()=>this.formValue}),this.inputId="input",this.errorId="error",this.hintId="hint",this.label="",this.hideLabel=!1,this.required=!1}get formValue(){return this.value}handleInput(t){t.stopPropagation();const e=t.target;this.value=e.value,this.dispatchEvent(new _events_731d0007_js__WEBPACK_IMPORTED_MODULE_5__.N("input"))}handleChange(t){t.stopPropagation(),this.dispatchEvent(new _events_731d0007_js__WEBPACK_IMPORTED_MODULE_5__.N("change"))}renderLabel(t){const r=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<label for="${this.inputId}"><slot name="label">${this.label}</slot>${t}</label><div class="n-caption n-hint" id="${this.hintId}" ?hidden="${!this.hasHint}"><slot name="hint">${this.hint}</slot></div>`;return this.hideLabel?_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<nord-visually-hidden>${r}</nord-visually-hidden>`:_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="n-label-container">${r}</div>`}renderError(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="n-caption n-error" id="${this.errorId}" role="alert" ?hidden="${!this.hasError}"><slot name="error">${this.error}</slot></div>`}getDescribedBy(){const{hasHint:t,hasError:e}=this;return t&&e?`${this.hintId} ${this.errorId}`:t?this.hintId:e?this.errorId:void 0}getInvalid(){return this.hasError?"true":void 0}get hasHint(){return Boolean(this.hint)||this.hintSlot.hasContent}get hasError(){return Boolean(this.error)||this.errorSlot.hasContent}}return (0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)()],h.prototype,"label",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)()],h.prototype,"hint",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({type:Boolean,attribute:"hide-label"})],h.prototype,"hideLabel",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)()],h.prototype,"placeholder",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)()],h.prototype,"error",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({type:Boolean})],h.prototype,"required",void 0),h}
//# sourceMappingURL=FormAssociatedMixin-252fb0e9.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/FormField-081da729.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/FormField-081da729.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
const t=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.i`.n-caption,::slotted(.n-caption){font-size:var(--n-font-size-s);line-height:var(--n-line-height-caption)}.n-label-container{padding-block-end:var(--n-space-s);display:inline-block}.n-label,::slotted(label),label{display:block!important;color:var(--n-color-text);font-family:var(--n-font-family);font-size:var(--n-font-size-m);font-weight:var(--n-font-weight-heading)!important;line-height:var(--n-line-height-heading);margin:0!important}.n-hint{padding-block-start:calc(var(--n-space-s)/ 2);color:var(--n-color-text-weaker)}.n-error{margin-block-start:var(--n-space-s);color:var(--n-color-text-error)}`;
//# sourceMappingURL=FormField-081da729.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Icon.js":
/*!*********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Icon.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ z)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./state-70f38ceb.js */ "./node_modules/@nordhealth/components/lib/state-70f38ceb.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./unsafe-html-6be42999.js */ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js");
/* harmony import */ var _observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./observe-a9c6dfb6.js */ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
const m=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-icon-size:var(--n-size-icon-m);display:inline-block;block-size:var(--_n-icon-size);inline-size:var(--_n-icon-size);min-inline-size:var(--_n-icon-size)}:host([size=xxs]){--_n-icon-size:var(--n-size-icon-xxs)}:host([size=xs]){--_n-icon-size:var(--n-size-icon-xs)}:host([size="s"]){--_n-icon-size:var(--n-size-icon-s)}:host([size="l"]){--_n-icon-size:var(--n-size-icon-l)}:host([size=xl]){--_n-icon-size:var(--n-size-icon-xl)}:host([size=xxl]){--_n-icon-size:var(--n-size-icon-xxl)}.n-icon{display:block}svg{display:block}`;var v;let p=v=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.name="",this.size="m",this.svg=""}static registerResolver(e){v.resolver=e}static registerIcon(e,s){let i,o;if("string"==typeof e?(i=e,o=s):(i=e.title,o=e.default),!i)throw new Error("name is required when registering an icon");if(!o)throw new Error("icon must not be empty");v.registeredIcons.has(i)||v.registeredIcons.set(i,o)}render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div role="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_7__.c)(this.label,"img")}" style="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_7__.c)(this.color,`color:${this.color}`)}" aria-label="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_4__.l)(this.label)}"><slot aria-hidden="true"></slot><div aria-hidden="true">${(0,_unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_5__.o)(this.svg)}</div></div>`}handleNameChange(){this.name?v.registeredIcons.has(this.name)?this.svg=v.registeredIcons.get(this.name):v.resolver(this.name).then((e=>{this.svg=e})).catch((()=>{this.svg=""})):this.svg=""}};p.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_8__.s,m],p.resolver=e=>fetch(`https://nordcdn.net/ds/icons/1.8.0/assets/${e}.svg`).then((s=>{if(!s.ok)throw new TypeError(`NORD: unknown icon '${e}'`);return s.text()})),p.registeredIcons=new Map,(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"name",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"size",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"color",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"label",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_3__.t)()],p.prototype,"svg",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_6__.o)("name")],p.prototype,"handleNameChange",null),p=v=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-icon")],p);var z=p;
//# sourceMappingURL=Icon.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/InputMixin-158f63fb.js":
/*!************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/InputMixin-158f63fb.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "I": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
function o(o){class r extends o{constructor(){super(...arguments),this.disabled=!1,this.value=""}get form(){if(this.hasAttribute("form")){return this.getRootNode().querySelector(`form#${this.getAttribute("form")}`)}return this.closest("form")}}return (0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)({type:Boolean,reflect:!0})],r.prototype,"disabled",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)()],r.prototype,"name",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)()],r.prototype,"value",void 0),r}
//# sourceMappingURL=InputMixin-158f63fb.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/LightDomController-3c726b20.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/LightDomController-3c726b20.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "L": () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
class s{constructor(t,o){this.host=t,this.options=o,t.addController(this)}get container(){return this.options.container||this.host}hostUpdated(){this.render()}hostDisconnected(){(0,_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.A)(_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b,this.container,this.options.renderOptions)}render(){(0,_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.A)(this.options.render(),this.container,this.options.renderOptions)}}
//# sourceMappingURL=LightDomController-3c726b20.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Select.js":
/*!***********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ $)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _ref_0e619221_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ref-0e619221.js */ "./node_modules/@nordhealth/components/lib/ref-0e619221.js");
/* harmony import */ var _Button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Button.js */ "./node_modules/@nordhealth/components/lib/Button.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/@nordhealth/components/lib/Icon.js");
/* harmony import */ var _InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InputMixin-158f63fb.js */ "./node_modules/@nordhealth/components/lib/InputMixin-158f63fb.js");
/* harmony import */ var _FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FocusableMixin-34870ed3.js */ "./node_modules/@nordhealth/components/lib/FocusableMixin-34870ed3.js");
/* harmony import */ var _FormAssociatedMixin_252fb0e9_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./FormAssociatedMixin-252fb0e9.js */ "./node_modules/@nordhealth/components/lib/FormAssociatedMixin-252fb0e9.js");
/* harmony import */ var _AutocompleteMixin_370de2be_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AutocompleteMixin-370de2be.js */ "./node_modules/@nordhealth/components/lib/AutocompleteMixin-370de2be.js");
/* harmony import */ var _SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SizeMixin-4559b224.js */ "./node_modules/@nordhealth/components/lib/SizeMixin-4559b224.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _FormField_081da729_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./FormField-081da729.js */ "./node_modules/@nordhealth/components/lib/FormField-081da729.js");
/* harmony import */ var _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SlotController-89834aef.js */ "./node_modules/@nordhealth/components/lib/SlotController-89834aef.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
/* harmony import */ var _LightDomController_3c726b20_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./LightDomController-3c726b20.js */ "./node_modules/@nordhealth/components/lib/LightDomController-3c726b20.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
/* harmony import */ var _Spinner_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Spinner.js */ "./node_modules/@nordhealth/components/lib/Spinner.js");
/* harmony import */ var _state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./state-70f38ceb.js */ "./node_modules/@nordhealth/components/lib/state-70f38ceb.js");
/* harmony import */ var _unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./unsafe-html-6be42999.js */ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js");
/* harmony import */ var _observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./observe-a9c6dfb6.js */ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js");
/* harmony import */ var _events_731d0007_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./events-731d0007.js */ "./node_modules/@nordhealth/components/lib/events-731d0007.js");
/* harmony import */ var _VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./VisuallyHidden.js */ "./node_modules/@nordhealth/components/lib/VisuallyHidden.js");
var x=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><g transform="translate(6,6) scale(0.9)"><path fill="currentColor" d="M105 56a10.416 10.416 0 0 1-7.42-3.08L72.478 27.818a3.528 3.528 0 0 0-4.956 0L42.42 52.92a10.5 10.5 0 0 1-14.84-14.84l35-35a10.486 10.486 0 0 1 14.84 0l35 35A10.5 10.5 0 0 1 105 56zm-35 84a10.416 10.416 0 0 1-7.42-3.08l-35-35a10.5 10.5 0 0 1 14.84-14.84l25.102 25.102a3.528 3.528 0 0 0 4.956 0L97.58 87.08a10.5 10.5 0 1 1 14.84 14.84l-35 35A10.416 10.416 0 0 1 70 140z"/></g></svg>',title:"interface-dropdown-small",tags:"nordicon small interface dropdown select arrow up down caret triangle chevron"});const g=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`.n-select-container{position:relative;inline-size:fit-content}:host([expand]){inline-size:100%}:host([expand]) .n-select-container{inline-size:100%}select{-webkit-appearance:none;appearance:none;position:absolute;font-size:var(--n-font-size-m);font-family:var(--n-font-family);color:var(--n-color-text);inline-size:100%;opacity:.0001;cursor:pointer;background:0 0;border:0;block-size:var(--n-space-xl);inset-block-end:0;inset-inline-start:0;z-index:var(--n-index-default)}nord-button{--n-button-text-align:start}nord-icon{color:var(--n-color-icon)}.n-label-container:hover+.n-select-container nord-button,select:hover+nord-button{--n-button-border-color:var(--n-color-border-hover);--_n-button-background-color:var(--n-color-button-hover)}.n-label-container:hover+.n-select-container nord-button nord-icon,select:hover+nord-button nord-icon{color:var(--n-color-icon-hover)}select:focus+nord-button{--n-button-border-color:var(--n-color-accent);--_n-button-box-shadow:0 0 0 1px var(--n-button-border-color)}:host([disabled]){cursor:auto;pointer-events:none}:host([disabled]) nord-button{--n-input-border-color:var(--n-color-active);--_n-button-color:var(--n-color-text-weakest);--_n-button-background-color:var(--n-color-active);--_n-button-opacity:1}:host([disabled]) nord-icon{color:var(--n-color-text-weakest)}::slotted(:not([slot])){display:none}select[aria-invalid=true]+nord-button{--n-button-border-color:var(--n-color-status-danger)}`;_Icon_js__WEBPACK_IMPORTED_MODULE_6__["default"].registerIcon(x);let j=class extends((0,_SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_11__.S)((0,_FormAssociatedMixin_252fb0e9_js__WEBPACK_IMPORTED_MODULE_9__.F)((0,_AutocompleteMixin_370de2be_js__WEBPACK_IMPORTED_MODULE_10__.A)((0,_InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_7__.I)((0,_FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_8__.F)(_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s)))))){constructor(){super(...arguments),this.defaultSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_14__.S(this),this.inputId="select",this.expand=!1}get formValue(){return this.value||void 0}render(){const e=this.options,t=this.getButtonText(e),o=_SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_11__.i[this.size]||_SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_11__.i.m;return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<slot></slot>${this.renderLabel()}<div class="n-select-container"><select ${(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_4__.n)(this.focusableRef)} id="${this.inputId}" ?disabled="${this.disabled}" ?required="${this.required}" name="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.name)}" @change="${this.handleChange}" @input="${this.handleInput}" aria-describedby="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.getDescribedBy())}" aria-invalid="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.getInvalid())}" autocomplete="${this.autocomplete}">${this.placeholder&&_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<option value="" disabled="disabled" ?selected="${!this.value}">${this.placeholder}</option>`} ${e.map((e=>this.renderOption(e)))}</select><nord-button size="${this.size}" tabindex="-1" ?disabled="${this.disabled}" ?expand="${this.expand}" aria-hidden="true" type="button"><slot slot="start" name="icon"></slot>${t}<nord-icon slot="end" size="${o}" name="interface-dropdown-small"></nord-icon></nord-button></div>${this.renderError()}`}get options(){return Array.from(this.querySelectorAll("option"))}getButtonText(e){const t=e.find((e=>e.value===this.value.toString()));return t?t.text:this.placeholder?this.placeholder:e[0]?e[0].text:""}renderOption(e){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<option value="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(e.value)}" ?disabled="${e.disabled}" .selected="${e.value===this.value.toString()}">${e.text}</option>`}};j.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_12__.s,_FormField_081da729_js__WEBPACK_IMPORTED_MODULE_13__.s,g],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],j.prototype,"expand",void 0),j=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-select")],j);var $=j;
//# sourceMappingURL=Select.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/SizeMixin-4559b224.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/SizeMixin-4559b224.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ r),
/* harmony export */   "i": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
function r(r){class t extends r{constructor(){super(...arguments),this.size="m"}}return (0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)({reflect:!0})],t.prototype,"size",void 0),t}const t={s:"xs",m:"s",l:"m"};
//# sourceMappingURL=SizeMixin-4559b224.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/SlotController-89834aef.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/SlotController-89834aef.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "S": () => (/* binding */ s)
/* harmony export */ });
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
class s{constructor(s,e=""){this.host=s,this.slotName=e,this.handleSlotChange=t=>{t.target.name===this.slotName&&this.onChange(t)},s.addController(this),this.events=new _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_0__.E(s)}hostConnected(){this.host.shadowRoot&&this.events.listen(this.host.shadowRoot,"slotchange",this.handleSlotChange)}get hasContent(){return null!=this.content}get isEmpty(){return!this.hasContent}get content(){const t=this.slotName?`[slot="${this.slotName}"]`:":not([slot])";return this.host.querySelector(`:scope > ${t}`)}onChange(t){this.host.requestUpdate()}}
//# sourceMappingURL=SlotController-89834aef.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Spinner.js":
/*!************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Spinner.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
const c=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-spinner-size:var(--n-size-icon-m);inline-size:var(--_n-spinner-size);block-size:var(--_n-spinner-size);display:inline-flex;position:relative;color:inherit}:host([size=xs]){--_n-spinner-size:var(--n-size-icon-xs)}:host([size="s"]){--_n-spinner-size:var(--n-size-icon-s)}:host([size="l"]){--_n-spinner-size:var(--n-size-icon-l)}:host([size=xl]){--_n-spinner-size:var(--n-size-icon-xl)}:host([size=xxl]){--_n-spinner-size:var(--n-size-icon-xxl)}.n-spinner,.n-spinner::after{position:absolute;inset-block-start:50%;inset-inline-start:50%;z-index:var(--n-index-spinner);transform:translateZ(0) translateX(-50%) translateY(-50%);transform-origin:0 0}.n-spinner{block-size:var(--_n-spinner-size);inline-size:var(--_n-spinner-size);font-size:var(--_n-spinner-size);color:var(--n-color-accent);border:.18em solid transparent;border-inline-start:.18em solid currentColor;border-radius:var(--n-border-radius-circle);animation:nRotate .66s linear infinite}.n-spinner::after{box-sizing:content-box;inline-size:100%;block-size:100%;overflow:hidden;content:"";border:.18em solid currentColor;border-radius:var(--n-border-radius-circle);opacity:.3}@keyframes nRotate{0%{transform:translateZ(0) rotate(0) translateX(-50%) translateY(-50%)}100%{transform:translateZ(0) rotate(360deg) translateX(-50%) translateY(-50%)}}`;let p=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.size="m"}render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="n-spinner" role="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_4__.c)(this.label,"img")}" aria-label="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.label)}" style="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_4__.c)(this.color,`color:${this.color}`)}"></div>`}};p.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_5__.s,c],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"size",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"color",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],p.prototype,"label",void 0),p=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-spinner")],p);var d=p;
//# sourceMappingURL=Spinner.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Stack.js":
/*!**********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Stack.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ p)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
const r=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-stack-gap:var(--n-stack-gap, var(--n-space-m));display:flex;flex-direction:column;align-items:stretch;justify-content:flex-start;color:var(--n-color-text);gap:var(--_n-stack-gap);max-inline-size:100%;inline-size:100%}:host([direction=horizontal]){flex-direction:row}:host([wrap]){flex-wrap:wrap}@media (max-width:768px){:host([responsive]){flex-direction:column!important}}:host([align-items=center]){align-items:center}:host([align-items=start]){align-items:flex-start}:host([align-items=end]){align-items:flex-end}:host([justify-content=center]){justify-content:center}:host([justify-content=start]){justify-content:flex-start}:host([justify-content=end]){justify-content:flex-end}:host([justify-content=space-between]){justify-content:space-between}:host([justify-content=space-evenly]){justify-content:space-evenly}:host([justify-content=space-around]){justify-content:space-around}::slotted(*){margin:0!important;min-inline-size:0;max-inline-size:100%}:host([gap=none]){--_n-stack-gap:var(--n-stack-gap, 0)}:host([gap="s"]){--_n-stack-gap:var(--n-stack-gap, var(--n-space-s))}:host([gap="m"]){--_n-stack-gap:var(--n-stack-gap, var(--n-space-m))}:host([gap="l"]){--_n-stack-gap:var(--n-stack-gap, var(--n-space-l))}:host([gap=xl]){--_n-stack-gap:var(--n-stack-gap, var(--n-space-xl))}:host([gap=xxl]){--_n-stack-gap:var(--n-stack-gap, var(--n-space-xxl))}`;let c=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.gap="m",this.direction="vertical",this.alignItems="stretch",this.responsive=!1,this.wrap=!1}render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<slot></slot>`}};c.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_3__.s,r],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],c.prototype,"gap",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0})],c.prototype,"direction",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,attribute:"align-items"})],c.prototype,"alignItems",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],c.prototype,"responsive",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],c.prototype,"wrap",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,attribute:"justify-content"})],c.prototype,"justifyContent",void 0),c=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-stack")],c);var p=c;
//# sourceMappingURL=Stack.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/Toast.js":
/*!**********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Toast.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ h)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _class_map_949b7d3b_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./class-map-949b7d3b.js */ "./node_modules/@nordhealth/components/lib/class-map-949b7d3b.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./state-70f38ceb.js */ "./node_modules/@nordhealth/components/lib/state-70f38ceb.js");
/* harmony import */ var _query_2d22378e_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./query-2d22378e.js */ "./node_modules/@nordhealth/components/lib/query-2d22378e.js");
/* harmony import */ var _Icon_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Icon.js */ "./node_modules/@nordhealth/components/lib/Icon.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _events_731d0007_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./events-731d0007.js */ "./node_modules/@nordhealth/components/lib/events-731d0007.js");
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
/* harmony import */ var _observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./observe-a9c6dfb6.js */ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./unsafe-html-6be42999.js */ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
var v=Object.freeze({__proto__:null,default:'<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M133 7 7 133M7 7l126 126" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>',title:"interface-close",tags:"nordicon interface close cross remove delete erase symbol"});const f=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{--_n-toast-color:var(--n-color-surface);--_n-toast-background-color:var(--n-color-text)}.n-toast{display:flex;gap:var(--n-space-l);align-items:flex-start;background-color:var(--_n-toast-background-color);color:var(--_n-toast-color);border-radius:var(--n-border-radius);animation:n-enter var(--n-transition-slowly) forwards 1;z-index:var(--n-index-toast);box-shadow:var(--n-box-shadow-popout)}.n-dismissed{animation-name:n-exit}@keyframes n-enter{from{transform:translateY(50%);opacity:0}}@keyframes n-exit{to{transform:scale(.97);opacity:0}}.n-toast-inner{padding:var(--n-space-m);flex:1}.n-dismiss{--_n-toast-focus-ring:0 0 0 2px var(--n-color-accent);border:none;display:flex;justify-content:center;align-items:center;block-size:var(--n-space-xl);inline-size:var(--n-space-xl);position:relative;inset-inline-end:var(--n-space-s);inset-block-start:var(--n-space-s);background-color:transparent;border-radius:var(--n-border-radius);cursor:pointer}.n-dismiss::after,.n-dismiss::before{content:"";position:absolute;display:block;border-radius:var(--n-border-radius)}.n-dismiss::before{inset:0;background:var(--_n-toast-color);transition:opacity var(--n-transition-quickly);opacity:0}.n-dismiss:is(:hover,:focus)::before{opacity:.06}.n-dismiss::after{inset:calc(var(--n-space-s) * -1)}.n-dismiss:active{transform:translateY(1px)}.n-dismiss:focus{outline:0;box-shadow:var(--_n-toast-focus-ring)}@supports selector(:focus-visible){.n-dismiss:focus{box-shadow:none}.n-dismiss:focus-visible{box-shadow:var(--_n-toast-focus-ring)}}.n-dismiss nord-icon{opacity:.53;transition:opacity var(--n-transition-quickly);color:var(--_n-toast-color)}.n-dismiss:is(:hover,:focus) nord-icon{opacity:1}:host([variant=danger]){--_n-toast-background-color:var(--n-color-status-danger);--_n-toast-color:var(--n-color-text-on-accent)}`;_Icon_js__WEBPACK_IMPORTED_MODULE_6__["default"].registerIcon(v);let b=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{constructor(){super(...arguments),this.events=new _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_9__.E(this),this.dismissed=!1,this.variant="default",this.autoDismiss=1e4}disconnectedCallback(){super.disconnectedCallback(),clearTimeout(this.timeoutId)}dismiss(){return this.dismissed=!0,clearTimeout(this.timeoutId),new Promise((s=>{this.events.listen(this.toast,"animationend",(()=>{this.dispatchEvent(new _events_731d0007_js__WEBPACK_IMPORTED_MODULE_8__.N("dismiss")),s()}),{once:!0})}))}render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="${(0,_class_map_949b7d3b_js__WEBPACK_IMPORTED_MODULE_2__.o)({"n-toast":!0,"n-dismissed":this.dismissed})}"><div class="n-toast-inner"><slot></slot></div><button class="n-dismiss" @click="${this.dismiss}" aria-hidden="true"><nord-icon name="interface-close" size="s"></nord-icon></button></div>`}handleAutoDismissChange(){clearTimeout(this.timeoutId),null!=this.autoDismiss&&this.autoDismiss>=0&&setTimeout((()=>this.dismiss()),this.autoDismiss)}};b.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_7__.s,f],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_2d22378e_js__WEBPACK_IMPORTED_MODULE_5__.i)(".n-toast",!0)],b.prototype,"toast",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_state_70f38ceb_js__WEBPACK_IMPORTED_MODULE_4__.t)()],b.prototype,"dismissed",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_3__.e)({reflect:!0})],b.prototype,"variant",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_3__.e)({type:Number,attribute:"auto-dismiss"})],b.prototype,"autoDismiss",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_observe_a9c6dfb6_js__WEBPACK_IMPORTED_MODULE_10__.o)("autoDismiss")],b.prototype,"handleAutoDismissChange",null),b=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-toast")],b);var h=b;
//# sourceMappingURL=Toast.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/ToastGroup.js":
/*!***************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/ToastGroup.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ l)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
const i=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`.n-toast-group{display:flex;flex-direction:column;gap:var(--n-space-s);position:fixed;z-index:var(--n-index-toast);inset:0;inset-block-start:auto;inset-inline-end:var(--n-scrollbar-gutter,0);margin:1em;pointer-events:none}::slotted(nord-toast){max-inline-size:calc(var(--n-space-xxl) * 5);inline-size:100%;margin-inline:auto;pointer-events:auto}`;let r=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<div class="n-toast-group" role="log" aria-relevant="additions"><slot></slot></div>`}addToast(t,e={}){const{variant:n,autoDismiss:s}=e,a=document.createElement("nord-toast");return n&&(a.variant=n),null!=s&&(a.autoDismiss=s),a.textContent=t,this.appendChild(a),a}};r.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_2__.s,i],r=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-toast-group")],r);var l=r;
//# sourceMappingURL=ToastGroup.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/VisuallyHidden.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/VisuallyHidden.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ a)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
const n=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`:host{all:initial;border:0!important;clip:rect(1px,1px,1px,1px)!important;block-size:1px!important;overflow:hidden!important;padding:0!important;position:absolute!important;inset-block-start:0;inline-size:1px!important}`;let s=class extends _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s{render(){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`<slot></slot>`}};s.styles=n,s=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-visually-hidden")],s);var a=s;
//# sourceMappingURL=VisuallyHidden.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/class-map-949b7d3b.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/class-map-949b7d3b.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ n)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const n=(0,_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.e)(class extends _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.i{constructor(t){var e;if(super(t),t.type!==_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.t.ATTRIBUTE||"class"!==t.name||(null===(e=t.strings)||void 0===e?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(e,[s]){var i,n;if(void 0===this.nt){this.nt=new Set,void 0!==e.strings&&(this.st=new Set(e.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in s)s[t]&&!(null===(i=this.st)||void 0===i?void 0:i.has(t))&&this.nt.add(t);return this.render(s)}const r=e.element.classList;this.nt.forEach((t=>{t in s||(r.remove(t),this.nt.delete(t))}));for(const t in s){const e=!!s[t];e===this.nt.has(t)||(null===(n=this.st)||void 0===n?void 0:n.has(t))||(e?(r.add(t),this.nt.add(t)):(r.remove(t),this.nt.delete(t)))}return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.x}});
//# sourceMappingURL=class-map-949b7d3b.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/cond-338158e9.js":
/*!******************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/cond-338158e9.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
function t(t,r=t,n=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b){return t?r:n}
//# sourceMappingURL=cond-338158e9.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/directive-de55b00a.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ e),
/* harmony export */   "i": () => (/* binding */ r),
/* harmony export */   "t": () => (/* binding */ t)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},e=t=>(...e)=>({_$litDirective$:t,values:e});class r{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,r){this._$Ct=t,this._$AM=e,this._$Ci=r}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
//# sourceMappingURL=directive-de55b00a.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/events-731d0007.js":
/*!********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/events-731d0007.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "N": () => (/* binding */ s)
/* harmony export */ });
class s extends Event{constructor(s,e){super(s,{bubbles:!0,composed:!0,...e})}}
//# sourceMappingURL=events-731d0007.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js":
/*!************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/if-defined-4598a996.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "l": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const t=t=>null!=t?t:_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b;
//# sourceMappingURL=if-defined-4598a996.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ z),
/* harmony export */   "b": () => (/* binding */ L),
/* harmony export */   "i": () => (/* binding */ o),
/* harmony export */   "s": () => (/* binding */ st),
/* harmony export */   "x": () => (/* binding */ k),
/* harmony export */   "y": () => (/* binding */ M),
/* harmony export */   "z": () => (/* binding */ X)
/* harmony export */ });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),i=new WeakMap;class n{constructor(t,e,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const s=this.t;if(e&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=i.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&i.set(s,t))}return t}toString(){return this.cssText}}const o=(t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1]),t[0]);return new n(i,t,s)},r=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,s))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var l;const h=window,a=h.trustedTypes,d=a?a.emptyScript:"",c=h.reactiveElementPolyfillSupport,u={toAttribute(t,e){switch(e){case Boolean:t=t?d:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},p=(t,e)=>e!==t&&(e==e||t==t),$={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:p};class v extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;null!==(e=this.h)&&void 0!==e||(this.h=[]),this.h.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,s)=>{const i=this._$Ep(s,e);void 0!==i&&(this._$Ev.set(i,s),t.push(i))})),t}static createProperty(t,e=$){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s="symbol"==typeof t?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);void 0!==i&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const n=this[t];this[e]=i,this.requestUpdate(t,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||$}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const s of e)this.createProperty(s,t[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(r(t))}else void 0!==t&&e.push(r(t));return e}static _$Ep(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,s;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(s=t.hostConnected)||void 0===s||s.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var s;const i=null!==(s=this.shadowRoot)&&void 0!==s?s:this.attachShadow(this.constructor.shadowRootOptions);return((s,i)=>{e?s.adoptedStyleSheets=i.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):i.forEach((e=>{const i=document.createElement("style"),n=t.litNonce;void 0!==n&&i.setAttribute("nonce",n),i.textContent=e.cssText,s.appendChild(i)}))})(i,this.constructor.elementStyles),i}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=$){var i;const n=this.constructor._$Ep(t,s);if(void 0!==n&&!0===s.reflect){const o=(void 0!==(null===(i=s.converter)||void 0===i?void 0:i.toAttribute)?s.converter:u).toAttribute(e,s.type);this._$El=t,null==o?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,n=i._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=i.getPropertyOptions(n),o="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(s=t.converter)||void 0===s?void 0:s.fromAttribute)?t.converter:u;this._$El=n,this[n]=o.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;void 0!==t&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||p)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===s.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(s)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _;v.finalized=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==c||c({ReactiveElement:v}),(null!==(l=h.reactiveElementVersions)&&void 0!==l?l:h.reactiveElementVersions=[]).push("1.4.1");const A=window,f=A.trustedTypes,y=f?f.createPolicy("lit-html",{createHTML:t=>t}):void 0,m=`lit$${(Math.random()+"").slice(9)}$`,g="?"+m,E=`<${g}>`,S=document,b=(t="")=>S.createComment(t),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,w=Array.isArray,P=t=>w(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]),x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,H=/>/g,N=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),O=/'/g,T=/"/g,R=/^(?:script|style|textarea|title)$/i,M=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),k=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),B=new WeakMap,z=(t,e,s)=>{var i,n;const o=null!==(i=null==s?void 0:s.renderBefore)&&void 0!==i?i:e;let r=o._$litPart$;if(void 0===r){const t=null!==(n=null==s?void 0:s.renderBefore)&&void 0!==n?n:null;o._$litPart$=r=new q(e.insertBefore(b(),t),t,void 0,null!=s?s:{})}return r._$AI(t),r},D=S.createTreeWalker(S,129,null,!1),I=(t,e)=>{const s=t.length-1,i=[];let n,o=2===e?"<svg>":"",r=x;for(let e=0;e<s;e++){const s=t[e];let l,h,a=-1,d=0;for(;d<s.length&&(r.lastIndex=d,h=r.exec(s),null!==h);)d=r.lastIndex,r===x?"!--"===h[1]?r=U:void 0!==h[1]?r=H:void 0!==h[2]?(R.test(h[2])&&(n=RegExp("</"+h[2],"g")),r=N):void 0!==h[3]&&(r=N):r===N?">"===h[0]?(r=null!=n?n:x,a=-1):void 0===h[1]?a=-2:(a=r.lastIndex-h[2].length,l=h[1],r=void 0===h[3]?N:'"'===h[3]?T:O):r===T||r===O?r=N:r===U||r===H?r=x:(r=N,n=void 0);const c=r===N&&t[e+1].startsWith("/>")?" ":"";o+=r===x?s+E:a>=0?(i.push(l),s.slice(0,a)+"$lit$"+s.slice(a)+m+c):s+m+(-2===a?(i.push(void 0),e):c)}const l=o+(t[s]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==y?y.createHTML(l):l,i]};class j{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let n=0,o=0;const r=t.length-1,l=this.parts,[h,a]=I(t,e);if(this.el=j.createElement(h,s),D.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(i=D.nextNode())&&l.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const t=[];for(const e of i.getAttributeNames())if(e.endsWith("$lit$")||e.startsWith(m)){const s=a[o++];if(t.push(e),void 0!==s){const t=i.getAttribute(s.toLowerCase()+"$lit$").split(m),e=/([.?@])?(.*)/.exec(s);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?K:"?"===e[1]?F:"@"===e[1]?G:J})}else l.push({type:6,index:n})}for(const e of t)i.removeAttribute(e)}if(R.test(i.tagName)){const t=i.textContent.split(m),e=t.length-1;if(e>0){i.textContent=f?f.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],b()),D.nextNode(),l.push({type:2,index:++n});i.append(t[e],b())}}}else if(8===i.nodeType)if(i.data===g)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=i.data.indexOf(m,t+1));)l.push({type:7,index:n}),t+=m.length-1}n++}}static createElement(t,e){const s=S.createElement("template");return s.innerHTML=t,s}}function V(t,e,s=t,i){var n,o,r,l;if(e===k)return e;let h=void 0!==i?null===(n=s._$Cl)||void 0===n?void 0:n[i]:s._$Cu;const a=C(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==a&&(null===(o=null==h?void 0:h._$AO)||void 0===o||o.call(h,!1),void 0===a?h=void 0:(h=new a(t),h._$AT(t,s,i)),void 0!==i?(null!==(r=(l=s)._$Cl)&&void 0!==r?r:l._$Cl=[])[i]=h:s._$Cu=h),void 0!==h&&(e=V(t,h._$AS(t,e.values),h,i)),e}class W{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:S).importNode(s,!0);D.currentNode=n;let o=D.nextNode(),r=0,l=0,h=i[0];for(;void 0!==h;){if(r===h.index){let e;2===h.type?e=new q(o,o.nextSibling,this,t):1===h.type?e=new h.ctor(o,h.name,h.strings,this,t):6===h.type&&(e=new Q(o,this,t)),this.v.push(e),h=i[++l]}r!==(null==h?void 0:h.index)&&(o=D.nextNode(),r++)}return n}m(t){let e=0;for(const s of this.v)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class q{constructor(t,e,s,i){var n;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$C_=null===(n=null==i?void 0:i.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$C_}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=V(this,t,e),C(t)?t===L||null==t||""===t?(this._$AH!==L&&this._$AR(),this._$AH=L):t!==this._$AH&&t!==k&&this.$(t):void 0!==t._$litType$?this.T(t):void 0!==t.nodeType?this.k(t):P(t)?this.O(t):this.$(t)}S(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}k(t){this._$AH!==t&&(this._$AR(),this._$AH=this.S(t))}$(t){this._$AH!==L&&C(this._$AH)?this._$AA.nextSibling.data=t:this.k(S.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,n="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=j.createElement(i.h,this.options)),i);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.m(s);else{const t=new W(n,this),e=t.p(this.options);t.m(s),this.k(e),this._$AH=t}}_$AC(t){let e=B.get(t.strings);return void 0===e&&B.set(t.strings,e=new j(t)),e}O(t){w(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const n of t)i===e.length?e.push(s=new q(this.S(b()),this.S(b()),this,this.options)):s=e[i],s._$AI(n),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for(null===(s=this._$AP)||void 0===s||s.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$C_=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class J{constructor(t,e,s,i,n){this.type=1,this._$AH=L,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=n,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const n=this.strings;let o=!1;if(void 0===n)t=V(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==k,o&&(this._$AH=t);else{const i=t;let r,l;for(t=n[0],r=0;r<n.length-1;r++)l=V(this,i[s+r],e,r),l===k&&(l=this._$AH[r]),o||(o=!C(l)||l!==this._$AH[r]),l===L?t=L:t!==L&&(t+=(null!=l?l:"")+n[r+1]),this._$AH[r]=l}o&&!i&&this.P(t)}P(t){t===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class K extends J{constructor(){super(...arguments),this.type=3}P(t){this.element[this.name]=t===L?void 0:t}}const Z=f?f.emptyScript:"";class F extends J{constructor(){super(...arguments),this.type=4}P(t){t&&t!==L?this.element.setAttribute(this.name,Z):this.element.removeAttribute(this.name)}}class G extends J{constructor(t,e,s,i,n){super(t,e,s,i,n),this.type=5}_$AI(t,e=this){var s;if((t=null!==(s=V(this,t,e,0))&&void 0!==s?s:L)===k)return;const i=this._$AH,n=t===L&&i!==L||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==L&&(i===L||n);n&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;"function"==typeof this._$AH?this._$AH.call(null!==(s=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==s?s:this.element,t):this._$AH.handleEvent(t)}}class Q{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){V(this,t)}}const X={A:"$lit$",M:m,C:g,L:1,R:I,D:W,V:P,I:V,H:q,N:J,U:F,B:G,F:K,W:Q},Y=A.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var tt,et;null==Y||Y(j,q),(null!==(_=A.litHtmlVersions)&&void 0!==_?_:A.litHtmlVersions=[]).push("2.3.1");class st extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=z(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return k}}st.finalized=!0,st._$litElement$=!0,null===(tt=globalThis.litElementHydrateSupport)||void 0===tt||tt.call(globalThis,{LitElement:st});const it=globalThis.litElementPolyfillSupport;null==it||it({LitElement:st}),(null!==(et=globalThis.litElementVersions)&&void 0!==et?et:globalThis.litElementVersions=[]).push("3.2.2");
//# sourceMappingURL=lit-element-9178eae5.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/observe-a9c6dfb6.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ e)
/* harmony export */ });
class t{constructor(t,e,s,i){this.host=t,this.key=e,this.cb=s,this.lifecycle=i,t.addController(this)}hostUpdate(){"update"===this.lifecycle&&this.handle()}hostUpdated(){"updated"===this.lifecycle&&this.handle()}handle(){const{key:t,_value:e,host:s}=this,i=s[t];e!==i&&(this._value=i,this.cb.call(s,e,i,t))}}function e(e,s="update"){return function(i,h){i.constructor.addInitializer((i=>{const l=i[h];i.addController(new t(i,e,l,s))}))}}
//# sourceMappingURL=observe-a9c6dfb6.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/property-03f59dce.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/property-03f59dce.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ i)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const e=(e,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?{...i,finisher(r){r.createProperty(i.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:i.key,initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(r){r.createProperty(i.key,e)}};function i(i){return(r,t)=>void 0!==t?((e,i,r)=>{i.constructor.createProperty(r,e)})(i,r,t):e(i,r)}
//# sourceMappingURL=property-03f59dce.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/query-2d22378e.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/query-2d22378e.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "i": () => (/* binding */ e)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function e(e,o){return(({finisher:e,descriptor:o})=>(r,n)=>{var t;if(void 0===n){const n=null!==(t=r.originalKey)&&void 0!==t?t:r.key,i=null!=o?{kind:"method",placement:"prototype",key:n,descriptor:o(r.key)}:{...r,key:n};return null!=e&&(i.finisher=function(o){e(o,n)}),i}{const t=r.constructor;void 0!==o&&Object.defineProperty(r,n,o(n)),null==e||e(t,n)}})({descriptor:r=>{const n={get(){var o,r;return null!==(r=null===(o=this.renderRoot)||void 0===o?void 0:o.querySelector(e))&&void 0!==r?r:null},enumerable:!0,configurable:!0};if(o){const o="symbol"==typeof r?Symbol():"__"+r;n.get=function(){var r,n;return void 0===this[o]&&(this[o]=null!==(n=null===(r=this.renderRoot)||void 0===r?void 0:r.querySelector(e))&&void 0!==n?n:null),this[o]}}return n}})}
//# sourceMappingURL=query-2d22378e.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_": () => (/* binding */ e),
/* harmony export */   "e": () => (/* binding */ t)
/* harmony export */ });
function e(e,t,n,o){var r,l=arguments.length,c=l<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,n):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,n,o);else for(var f=e.length-1;f>=0;f--)(r=e[f])&&(c=(l<3?r(c):l>3?r(t,n,c):r(t,n))||c);return l>3&&c&&Object.defineProperty(t,n,c),c
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}const t=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:n,elements:o}=t;return{kind:n,elements:o,finisher(t){customElements.define(e,t)}}})(e,t)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var n;null===(n=window.HTMLSlotElement)||void 0===n||n.prototype.assignedElements;
//# sourceMappingURL=query-assigned-elements-e6cbac30.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/ref-0e619221.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/ref-0e619221.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ Y),
/* harmony export */   "m": () => (/* binding */ A),
/* harmony export */   "n": () => (/* binding */ b),
/* harmony export */   "p": () => (/* binding */ $),
/* harmony export */   "r": () => (/* binding */ r),
/* harmony export */   "s": () => (/* binding */ c),
/* harmony export */   "u": () => (/* binding */ d)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");

/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:n}=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.z,l=()=>document.createComment(""),r=(t,i,e)=>{var s;const o=t._$AA.parentNode,r=void 0===i?t._$AB:i._$AA;if(void 0===e){const i=o.insertBefore(l(),r),s=o.insertBefore(l(),r);e=new n(i,s,t,t.options)}else{const i=e._$AB.nextSibling,n=e._$AM,l=n!==t;if(l){let i;null===(s=e._$AQ)||void 0===s||s.call(e,t),e._$AM=t,void 0!==e._$AP&&(i=t._$AU)!==n._$AU&&e._$AP(i)}if(i!==r||l){let t=e._$AA;for(;t!==i;){const i=t.nextSibling;o.insertBefore(t,r),t=i}}}return e},d=(t,i,e=t)=>(t._$AI(i,e),t),h={},c=(t,i=h)=>t._$AH=i,A=t=>t._$AH,$=t=>{var i;null===(i=t._$AP)||void 0===i||i.call(t,!1,!0);let e=t._$AA;const s=t._$AB.nextSibling;for(;e!==s;){const t=e.nextSibling;e.remove(),e=t}},_=(t,i)=>{var e,s;const o=t._$AN;if(void 0===o)return!1;for(const t of o)null===(s=(e=t)._$AO)||void 0===s||s.call(e,i,!1),_(t,i);return!0},v=t=>{let i,e;do{if(void 0===(i=t._$AM))break;e=i._$AN,e.delete(t),t=i}while(0===(null==e?void 0:e.size))},a=t=>{for(let i;i=t._$AM;t=i){let e=i._$AN;if(void 0===e)i._$AN=e=new Set;else if(e.has(t))break;e.add(t),p(i)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function u(t){void 0!==this._$AN?(v(this),this._$AM=t,a(this)):this._$AM=t}function f(t,i=!1,e=0){const s=this._$AH,o=this._$AN;if(void 0!==o&&0!==o.size)if(i)if(Array.isArray(s))for(let t=e;t<s.length;t++)_(s[t],!1),v(s[t]);else null!=s&&(_(s,!1),v(s));else _(this,t)}const p=t=>{var i,e,o,n;t.type==_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.t.CHILD&&(null!==(i=(o=t)._$AP)&&void 0!==i||(o._$AP=f),null!==(e=(n=t)._$AQ)&&void 0!==e||(n._$AQ=u))};class g extends _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.i{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,i,e){super._$AT(t,i,e),a(this),this.isConnected=t._$AU}_$AO(t,i=!0){var e,s;t!==this.isConnected&&(this.isConnected=t,t?null===(e=this.reconnected)||void 0===e||e.call(this):null===(s=this.disconnected)||void 0===s||s.call(this)),i&&(_(this,t),v(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=t,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=()=>new m;class m{}const C=new WeakMap,b=(0,_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.e)(class extends g{render(t){return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b}update(t,[e]){var s;const o=e!==this.Y;return o&&void 0!==this.Y&&this.rt(void 0),(o||this.lt!==this.dt)&&(this.Y=e,this.ct=null===(s=t.options)||void 0===s?void 0:s.host,this.rt(this.dt=t.element)),_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b}rt(t){var i;if("function"==typeof this.Y){const e=null!==(i=this.ct)&&void 0!==i?i:globalThis;let s=C.get(e);void 0===s&&(s=new WeakMap,C.set(e,s)),void 0!==s.get(this.Y)&&this.Y.call(this.ct,void 0),s.set(this.Y,t),void 0!==t&&this.Y.call(this.ct,t)}else this.Y.value=t}get lt(){var t,i,e;return"function"==typeof this.Y?null===(i=C.get(null!==(t=this.ct)&&void 0!==t?t:globalThis))||void 0===i?void 0:i.get(this.Y):null===(e=this.Y)||void 0===e?void 0:e.value}disconnected(){this.lt===this.dt&&this.rt(void 0)}reconnected(){this.rt(this.dt)}});
//# sourceMappingURL=ref-0e619221.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/state-70f38ceb.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/state-70f38ceb.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "t": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function t(t){return (0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_0__.e)({...t,state:!0})}
//# sourceMappingURL=state-70f38ceb.js.map


/***/ }),

/***/ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "o": () => (/* binding */ o)
/* harmony export */ });
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class n extends _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.i{constructor(r){if(super(r),this.it=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b,r.type!==_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.b||null==e)return this._t=void 0,this.it=e;if(e===_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_0__.x)return e;if("string"!=typeof e)throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const i=[e];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}n.directiveName="unsafeHTML",n.resultType=1;const o=(0,_directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_1__.e)(n);
//# sourceMappingURL=unsafe-html-6be42999.js.map


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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************!*\
  !*** ./src/content/translate_ui.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popover__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popover */ "./src/content/popover.js");
/* harmony import */ var _toast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toast */ "./src/content/toast.js");




function setup() {
  if (!window.customElements.get("translate-toast")) {
    window.customElements.define("translate-toast", _toast__WEBPACK_IMPORTED_MODULE_1__.Toast);
  }
  if (!window.customElements.get("translate-popover")) {
    window.customElements.define("translate-popover", _popover__WEBPACK_IMPORTED_MODULE_0__.Popover);
  }
}
setup();
})();

/******/ })()
;
//# sourceMappingURL=translate_ui.js.map