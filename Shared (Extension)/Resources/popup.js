/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref) {
  var x = _ref.x,
      y = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./src/popup/login_view.js":
/*!*********************************!*\
  !*** ./src/popup/login_view.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoginView": () => (/* binding */ LoginView)
/* harmony export */ });


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _loginView = /*#__PURE__*/new WeakMap();
var _loginLabel = /*#__PURE__*/new WeakMap();
var _emailInput = /*#__PURE__*/new WeakMap();
var _passwordInput = /*#__PURE__*/new WeakMap();
var _errorLabel = /*#__PURE__*/new WeakMap();
var _loginButton = /*#__PURE__*/new WeakMap();
var _init = /*#__PURE__*/new WeakSet();
var _onLoginButtonClick = /*#__PURE__*/new WeakSet();
class LoginView extends EventTarget {
  constructor() {
    super();
    _classPrivateMethodInitSpec(this, _onLoginButtonClick);
    _classPrivateMethodInitSpec(this, _init);
    _classPrivateFieldInitSpec(this, _loginView, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loginLabel, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _emailInput, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _passwordInput, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _errorLabel, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loginButton, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _init, _init2).call(this);
  }
  setCredentials(credentials) {
    _classPrivateFieldGet(this, _emailInput).value = credentials.email;
    _classPrivateFieldGet(this, _passwordInput).value = credentials.password;
  }
  setHidden(hidden) {
    _classPrivateFieldGet(this, _loginView).classList.toggle("d-hide", hidden);
  }
  setLoading(loading) {
    _classPrivateFieldGet(this, _emailInput).disabled = loading;
    _classPrivateFieldGet(this, _passwordInput).disabled = loading;
    if (loading) {
      _classPrivateFieldGet(this, _loginButton).setAttribute("loading", loading);
    } else {
      _classPrivateFieldGet(this, _loginButton).removeAttribute("loading");
    }
  }
  setErrorMessage(message) {
    if (message) {
      _classPrivateFieldGet(this, _errorLabel).textContent = message;
      _classPrivateFieldGet(this, _errorLabel).classList.remove("d-invisible");
    } else {
      _classPrivateFieldGet(this, _errorLabel).classList.add("d-invisible");
    }
  }
  on(type, listener) {
    this.addEventListener(type, listener);
  }
}
function _init2() {
  _classPrivateFieldSet(this, _loginView, document.getElementById("login-view"));
  _classPrivateFieldSet(this, _loginLabel, document.getElementById("login-label"));
  _classPrivateFieldGet(this, _loginLabel).textContent = browser.i18n.getMessage("ui_login_body");
  _classPrivateFieldSet(this, _emailInput, document.getElementById("email-input"));
  _classPrivateFieldGet(this, _emailInput).label = browser.i18n.getMessage("ui_email_input_label");
  _classPrivateFieldSet(this, _passwordInput, document.getElementById("password-input"));
  _classPrivateFieldGet(this, _passwordInput).label = browser.i18n.getMessage("ui_password_input_label");
  _classPrivateFieldSet(this, _errorLabel, document.getElementById("login-error-label"));
  _classPrivateFieldSet(this, _loginButton, document.getElementById("login-button"));
  _classPrivateFieldGet(this, _loginButton).textContent = browser.i18n.getMessage("login_button_label");
  _classPrivateFieldGet(this, _loginButton).addEventListener("click", event => {
    _classPrivateMethodGet(this, _onLoginButtonClick, _onLoginButtonClick2).call(this, event);
  });
}
function _onLoginButtonClick2() {
  const email = _classPrivateFieldGet(this, _emailInput).value;
  const password = _classPrivateFieldGet(this, _passwordInput).value;
  if (!email || !password) {
    const errorMessage = browser.i18n.getMessage("login_error_validation_error_message");
    this.setErrorMessage(errorMessage);
    return;
  }
  this.dispatchEvent(new CustomEvent("login", {
    detail: {
      email,
      password
    }
  }));
}

/***/ }),

/***/ "./src/popup/translate_selection_button.js":
/*!*************************************************!*\
  !*** ./src/popup/translate_selection_button.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslateSelectionButton": () => (/* binding */ TranslateSelectionButton)
/* harmony export */ });


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
var _translateSelectionButton = /*#__PURE__*/new WeakMap();
var _init = /*#__PURE__*/new WeakSet();
class TranslateSelectionButton extends EventTarget {
  constructor() {
    super();
    _classPrivateMethodInitSpec(this, _init);
    _classPrivateFieldInitSpec(this, _translateSelectionButton, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _init, _init2).call(this);
  }
  setLoading(loading) {
    if (loading) {
      _classPrivateFieldGet(this, _translateSelectionButton).setAttribute("loading", loading);
    } else {
      _classPrivateFieldGet(this, _translateSelectionButton).removeAttribute("loading");
    }
  }
  setEnabled(enabled) {
    _classPrivateFieldGet(this, _translateSelectionButton).disabled = !enabled;
  }
  on(type, listener) {
    this.addEventListener(type, listener);
  }
}
function _init2() {
  _classPrivateFieldSet(this, _translateSelectionButton, document.getElementById("translate-selection-button"));
  _classPrivateFieldGet(this, _translateSelectionButton).textContent = browser.i18n.getMessage("context_menus_translate_section");
  _classPrivateFieldGet(this, _translateSelectionButton).addEventListener("click", () => {
    this.dispatchEvent(new CustomEvent("click"));
  });
}

/***/ }),

/***/ "./src/popup/translate_view.js":
/*!*************************************!*\
  !*** ./src/popup/translate_view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TranslateView": () => (/* binding */ TranslateView)
/* harmony export */ });
/* harmony import */ var _shared_supported_languages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/supported_languages */ "./src/shared/supported_languages.js");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _languageSelect = /*#__PURE__*/new WeakMap();
var _translateButton = /*#__PURE__*/new WeakMap();
var _showOriginalButton = /*#__PURE__*/new WeakMap();
var _init = /*#__PURE__*/new WeakSet();
var _onLanguageSelectChange = /*#__PURE__*/new WeakSet();
var _onTranslateButtonClick = /*#__PURE__*/new WeakSet();
var _onShowOriginalButtonClick = /*#__PURE__*/new WeakSet();
class TranslateView extends EventTarget {
  constructor() {
    super();
    _classPrivateMethodInitSpec(this, _onShowOriginalButtonClick);
    _classPrivateMethodInitSpec(this, _onTranslateButtonClick);
    _classPrivateMethodInitSpec(this, _onLanguageSelectChange);
    _classPrivateMethodInitSpec(this, _init);
    _classPrivateFieldInitSpec(this, _languageSelect, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _translateButton, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _showOriginalButton, {
      writable: true,
      value: void 0
    });
    _classPrivateMethodGet(this, _init, _init2).call(this);
  }
  setSelectedTargetLanguage(language) {
    if (language && _shared_supported_languages__WEBPACK_IMPORTED_MODULE_0__.supportedLanguages.some(supportedLanguage => supportedLanguage.code === language.toUpperCase())) {
      _classPrivateFieldGet(this, _languageSelect).value = language;
    }
  }
  setHidden(hidden) {
    document.getElementById("translate-view").classList.toggle("d-hide", hidden);
  }
  setEnabled(enabled) {
    _classPrivateFieldGet(this, _translateButton).disabled = !enabled;
  }
  setLoading(loading) {
    _classPrivateFieldGet(this, _languageSelect).disabled = loading;
    if (loading) {
      this.showInitialView();
      _classPrivateFieldGet(this, _translateButton).setAttribute("loading", loading);
    } else {
      _classPrivateFieldGet(this, _translateButton).removeAttribute("loading");
    }
  }
  showInitialView() {
    document.getElementById("initial-view").classList.remove("d-hide");
    document.getElementById("result-view").classList.add("d-hide");
  }
  showResultView(sourceLanguage, targetLanguage) {
    document.getElementById("initial-view").classList.add("d-hide");
    document.getElementById("result-view").classList.remove("d-hide");
    document.getElementById("translation-message").textContent = browser.i18n.getMessage("full_page_translation_auto_translate_message");
    document.getElementById("translation-source-lang").textContent = browser.i18n.getMessage(`supported_languages_${sourceLanguage.toUpperCase()}`) || "Unknown";
  }
  on(type, listener) {
    this.addEventListener(type, listener);
  }
}
function _init2() {
  _classPrivateFieldSet(this, _languageSelect, document.getElementById("language-select"));
  _classPrivateFieldGet(this, _languageSelect).label = browser.i18n.getMessage("ui_target_language_select");
  const locale = browser.i18n.getUILanguage().split("-").shift().toUpperCase();
  for (const supportedLanguage of _shared_supported_languages__WEBPACK_IMPORTED_MODULE_0__.supportedLanguages) {
    const option = new Option(browser.i18n.getMessage(`supported_languages_${supportedLanguage.code}`), supportedLanguage.code, false, supportedLanguage.code === locale);
    _classPrivateFieldGet(this, _languageSelect).appendChild(option);
  }
  _classPrivateFieldGet(this, _languageSelect).addEventListener("change", _classPrivateMethodGet(this, _onLanguageSelectChange, _onLanguageSelectChange2).bind(this));
  _classPrivateFieldSet(this, _translateButton, document.getElementById("translate-button"));
  _classPrivateFieldGet(this, _translateButton).textContent = browser.i18n.getMessage("full_page_translation_menu_translate_button");
  _classPrivateFieldGet(this, _translateButton).addEventListener("click", event => {
    _classPrivateMethodGet(this, _onTranslateButtonClick, _onTranslateButtonClick2).call(this, event);
  });
  _classPrivateFieldSet(this, _showOriginalButton, document.getElementById("show-original-button"));
  _classPrivateFieldGet(this, _showOriginalButton).textContent = browser.i18n.getMessage("full_page_translation_show_original");
  _classPrivateFieldGet(this, _showOriginalButton).addEventListener("click", event => {
    _classPrivateMethodGet(this, _onShowOriginalButtonClick, _onShowOriginalButtonClick2).call(this, event);
  });
}
function _onLanguageSelectChange2() {
  this.dispatchEvent(new CustomEvent("change", {
    detail: {
      selectedSourceLanguage: undefined,
      selectedTargetLanguage: _classPrivateFieldGet(this, _languageSelect).value
    }
  }));
}
function _onTranslateButtonClick2() {
  this.dispatchEvent(new CustomEvent("translate", {
    detail: {
      sourceLanguage: undefined,
      targetLanguage: _classPrivateFieldGet(this, _languageSelect).value
    }
  }));
}
function _onShowOriginalButtonClick2() {
  this.dispatchEvent(new CustomEvent("showOriginal"));
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

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/dist/tippy.css":
/*!************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/dist/tippy.css ***!
  \************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}", "",{"version":3,"sources":["webpack://./node_modules/tippy.js/dist/tippy.css"],"names":[],"mappings":"AAAA,mDAAmD,SAAS,CAAC,kBAAkB,4BAA4B,CAAC,WAAW,iBAAiB,CAAC,qBAAqB,CAAC,UAAU,CAAC,iBAAiB,CAAC,cAAc,CAAC,eAAe,CAAC,kBAAkB,CAAC,SAAS,CAAC,gDAAgD,CAAC,6CAA6C,QAAQ,CAAC,oDAAoD,WAAW,CAAC,MAAM,CAAC,sBAAsB,CAAC,wBAAwB,CAAC,2BAA2B,CAAC,gDAAgD,KAAK,CAAC,uDAAuD,QAAQ,CAAC,MAAM,CAAC,sBAAsB,CAAC,2BAA2B,CAAC,8BAA8B,CAAC,8CAA8C,OAAO,CAAC,qDAAqD,0BAA0B,CAAC,yBAAyB,CAAC,UAAU,CAAC,4BAA4B,CAAC,+CAA+C,MAAM,CAAC,sDAAsD,SAAS,CAAC,0BAA0B,CAAC,0BAA0B,CAAC,6BAA6B,CAAC,6CAA6C,yDAAyD,CAAC,aAAa,UAAU,CAAC,WAAW,CAAC,UAAU,CAAC,oBAAoB,UAAU,CAAC,iBAAiB,CAAC,wBAAwB,CAAC,kBAAkB,CAAC,eAAe,iBAAiB,CAAC,eAAe,CAAC,SAAS","sourcesContent":[".tippy-box[data-animation=fade][data-state=hidden]{opacity:0}[data-tippy-root]{max-width:calc(100vw - 10px)}.tippy-box{position:relative;background-color:#333;color:#fff;border-radius:4px;font-size:14px;line-height:1.4;white-space:normal;outline:0;transition-property:transform,visibility,opacity}.tippy-box[data-placement^=top]>.tippy-arrow{bottom:0}.tippy-box[data-placement^=top]>.tippy-arrow:before{bottom:-7px;left:0;border-width:8px 8px 0;border-top-color:initial;transform-origin:center top}.tippy-box[data-placement^=bottom]>.tippy-arrow{top:0}.tippy-box[data-placement^=bottom]>.tippy-arrow:before{top:-7px;left:0;border-width:0 8px 8px;border-bottom-color:initial;transform-origin:center bottom}.tippy-box[data-placement^=left]>.tippy-arrow{right:0}.tippy-box[data-placement^=left]>.tippy-arrow:before{border-width:8px 0 8px 8px;border-left-color:initial;right:-7px;transform-origin:center left}.tippy-box[data-placement^=right]>.tippy-arrow{left:0}.tippy-box[data-placement^=right]>.tippy-arrow:before{left:-7px;border-width:8px 8px 8px 0;border-right-color:initial;transform-origin:center right}.tippy-box[data-inertia][data-state=visible]{transition-timing-function:cubic-bezier(.54,1.5,.38,1.11)}.tippy-arrow{width:16px;height:16px;color:#333}.tippy-arrow:before{content:\"\";position:absolute;border-color:transparent;border-style:solid}.tippy-content{position:relative;padding:5px 9px;z-index:1}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/popup/nord.css":
/*!******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/popup/nord.css ***!
  \******************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  --n-color-accent: rgb(53, 89, 199);\n  --n-color-text: rgb(12, 26, 61);\n  --n-color-text-link: rgb(53, 89, 199);\n  --n-color-text-weak: rgb(54, 67, 74);\n  --n-color-text-weaker: rgb(102, 118, 128);\n  --n-color-text-weakest: rgb(178, 186, 191);\n  --n-color-text-on-accent: rgb(255, 255, 255);\n  --n-color-text-error: rgb(185, 77, 55);\n  --n-color-text-success: rgb(80, 128, 56);\n  --n-color-nav-surface: rgb(246, 248, 248);\n  --n-color-nav-heading: rgb(143, 161, 170);\n  --n-color-nav-hover: rgb(234, 240, 240);\n  --n-color-border: rgb(216, 222, 228);\n  --n-color-border-strong: rgb(188, 197, 204);\n  --n-color-surface: rgb(255, 255, 255);\n  --n-color-background: rgb(255, 255, 255);\n  --n-color-surface-raised: rgb(250, 251, 251);\n  --n-color-overlay: rgba(144, 152, 152, 0.4);\n  --n-color-status-neutral: rgb(114, 110, 119);\n  --n-color-status-warning: rgb(240, 192, 68);\n  --n-color-status-highlight: rgb(125, 73, 193);\n  --n-color-status-danger: rgb(185, 77, 55);\n  --n-color-status-success: rgb(80, 128, 56);\n  --n-color-status-info: rgb(53, 89, 199);\n  --n-color-status-progress: rgb(0, 131, 138);\n  --n-color-status-neutral-weak: rgb(227, 227, 227);\n  --n-color-status-warning-weak: rgb(255, 233, 189);\n  --n-color-status-highlight-weak: rgb(238, 220, 255);\n  --n-color-status-danger-weak: rgb(255, 208, 199);\n  --n-color-status-success-weak: rgb(216, 229, 200);\n  --n-color-status-info-weak: rgb(204, 218, 255);\n  --n-color-status-progress-weak: rgb(196, 240, 242);\n  --n-color-button: rgb(255, 255, 255);\n  --n-color-button-hover: rgb(246, 248, 248);\n  --n-color-border-hover: rgb(102, 118, 128);\n  --n-color-icon: rgb(102, 118, 128);\n  --n-color-icon-hover: rgb(12, 26, 61);\n  --n-color-active: rgb(246, 248, 248);\n  --n-box-shadow: 0 1px 3px rgba(12, 12, 12, 0.09);\n  --n-box-shadow-header: 0 1px 5px rgba(12, 12, 12, 0.05);\n  --n-box-shadow-card: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(12, 12, 12, 0.05), 0 0 40px rgba(12, 12, 12, 0.015);\n  --n-box-shadow-nav: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(12, 12, 12, 0.14);\n  --n-box-shadow-popout: 0 4px 12px rgba(12, 12, 12, 0.15),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-modal: 0 24px 38px 3px rgba(12, 12, 12, 0.16),\n    0 9px 86px 8px rgba(12, 12, 12, 0.1), 0 11px 15px -7px rgba(12, 12, 12, 0.1),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-dark: 0 1px 3px rgba(0, 0, 0, 0.2);\n  --n-box-shadow-header-dark: 0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-card-dark: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-nav-dark: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(0, 0, 0, 0.24);\n  --n-box-shadow-popout-dark: 0 4px 12px rgba(0, 0, 0, 0.25),\n    0 0 0 1px var(--n-color-border);\n  --n-box-shadow-modal-dark: 0 0 0 1px var(--n-color-border),\n    0 24px 38px 3px rgba(0, 0, 0, 0.34), 0px 9px 86px 8px rgba(0, 0, 0, 0.28),\n    0px 11px 15px -7px rgba(0, 0, 0, 0.28);\n  --n-font-size-xxxl: 2.25rem;\n  --n-font-size-xxl: 1.5rem;\n  --n-font-size-xl: 1.25rem;\n  --n-font-size-l: 1rem;\n  --n-font-size-m: 0.875rem;\n  --n-font-size-s: 0.75rem;\n  --n-font-size-xs: 0.6875rem;\n  --n-font-family: \"Nordhealth Sans\", -apple-system, BlinkMacSystemFont,\n    \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\",\n    \"Segoe UI Emoji\";\n  --n-font-family-code: \"Nordhealth Mono\", monospace, monospace;\n  --n-font-features: \"kern\" 1, \"tnum\" 1, \"calt\" 1, \"case\" 1, \"cv05\" 1, \"zero\" 1,\n    \"cv08\" 0, \"ss03\" 1;\n  --n-font-features-reduced: \"kern\" 1, \"tnum\" 0, \"calt\" 1, \"case\" 1, \"cv05\" 1,\n    \"zero\" 0, \"cv08\" 0, \"ss03\" 1;\n  --n-font-weight: 400;\n  --n-font-weight-active: 500;\n  --n-font-weight-heading: 600;\n  --n-font-weight-strong: 670;\n  --n-size-icon-xxs: 8px;\n  --n-size-icon-xs: 10px;\n  --n-size-icon-s: 12px;\n  --n-size-icon-m: 16px;\n  --n-size-icon-l: 24px;\n  --n-size-icon-xl: 36px;\n  --n-size-icon-xxl: 72px;\n  --n-space-xxl: 72px;\n  --n-space-xl: 36px;\n  --n-space-l: 24px;\n  --n-space-m: 16px;\n  --n-space-s: 8px;\n  --n-border-radius-sharp: 0.02em;\n  --n-border-radius-s: 3px;\n  --n-border-radius: 5px;\n  --n-border-radius-pill: 999px;\n  --n-border-radius-circle: 50%;\n  --n-transition-quickly: 0.05s ease;\n  --n-transition-slowly: 0.2s ease;\n  --n-transition-mobile: 0.4s ease;\n  --n-line-height-tight: 1.15;\n  --n-line-height-heading: 1.2;\n  --n-line-height-caption: 1.3;\n  --n-line-height: 1.5;\n  --n-line-height-form: 20px;\n  --n-index-deep: -999999;\n  --n-index-default: 1;\n  --n-index-masked: 100;\n  --n-index-mask: 200;\n  --n-index-sticky: 300;\n  --n-index-nav: 400;\n  --n-index-overlay: 500;\n  --n-index-spinner: 600;\n  --n-index-popout: 700;\n  --n-index-toast: 800;\n  --n-index-modal: 900;\n}\n:not(:defined) {\n  visibility: hidden;\n}\n* {\n  -webkit-tap-highlight-color: transparent;\n}\nhtml {\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n}\n:where(.n-reset) :where(*, ::before, ::after) {\n  box-sizing: border-box;\n}\n:where(.n-reset) {\n  font-family: var(--n-font-family);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n  accent-color: var(--n-color-accent);\n}\n:where(.n-reset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-reset),\n:where(.n-reset)\n  :where(body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, img, svg, small, strike, strong, sub, sup, b, u, i, ol, ul, li, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, footer, header, nav, section, time, button, video, textarea, input) {\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n:where(.n-reset) :where(ul[role=\"list\"], ol[role=\"list\"]) {\n  list-style: none;\n}\n:where(.n-reset) :where(img, picture) {\n  max-inline-size: 100%;\n  display: block;\n}\n:where(.n-reset) :where(input, button, textarea, select) {\n  font-family: inherit;\n  font-feature-settings: inherit;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  :where(.n-reset) :where(*, ::before, ::after) {\n    animation-duration: 0s !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0s !important;\n    scroll-behavior: auto !important;\n  }\n}\n.n-border-is {\n  border-inline-start: 1px solid var(--n-color-border);\n}\n.n-border-ie {\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border-bs {\n  border-block-start: 1px solid var(--n-color-border);\n}\n.n-border-be {\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-b {\n  border-block-start: 1px solid var(--n-color-border);\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-i {\n  border-inline-start: 1px solid var(--n-color-border);\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border {\n  border: 1px solid var(--n-color-border);\n}\n.n-border-strong-is {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-ie {\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-bs {\n  border-block-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-be {\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-b {\n  border-block-start: 1px solid var(--n-color-border-strong);\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-i {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong {\n  border: 1px solid var(--n-color-border-strong);\n}\n.n-border-hover-is:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-ie:hover {\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-bs:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-be:hover {\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-b:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-i:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover:hover {\n  border: 1px solid var(--n-color-border-hover);\n}\n.n-border-d-is {\n  border-inline-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-bs {\n  border-block-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-be {\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-b {\n  border-block-start: 1px dashed var(--n-color-border);\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-i {\n  border-inline-start: 1px dashed var(--n-color-border);\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d {\n  border: 1px dashed var(--n-color-border);\n}\n.n-border-strong-d-is {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-bs {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-be {\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-b {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-i {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d {\n  border: 1px dashed var(--n-color-border-strong);\n}\n.n-border-hover-d-is:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-ie:hover {\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-bs:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-be:hover {\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-b:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-i:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d:hover {\n  border: 1px dashed var(--n-color-border-hover);\n}\n.n-border-radius-sharp {\n  border-radius: var(--n-border-radius-sharp);\n}\n.n-border-radius-s {\n  border-radius: var(--n-border-radius-s);\n}\n.n-border-radius {\n  border-radius: var(--n-border-radius);\n}\n.n-border-radius-pill {\n  border-radius: var(--n-border-radius-pill);\n}\n.n-border-radius-circle {\n  border-radius: var(--n-border-radius-circle);\n}\n.n-box-shadow {\n  box-shadow: var(--n-box-shadow);\n}\n.n-box-shadow-header {\n  box-shadow: var(--n-box-shadow-header);\n}\n.n-box-shadow-card {\n  box-shadow: var(--n-box-shadow-card);\n}\n.n-box-shadow-nav {\n  box-shadow: var(--n-box-shadow-nav);\n}\n.n-box-shadow-popout {\n  box-shadow: var(--n-box-shadow-popout);\n}\n.n-box-shadow-modal {\n  box-shadow: var(--n-box-shadow-modal);\n}\n.n-margin-is-xxl {\n  margin-inline-start: var(--n-space-xxl);\n}\n.n-margin-ie-xxl {\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-bs-xxl {\n  margin-block-start: var(--n-space-xxl);\n}\n.n-margin-be-xxl {\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-b-xxl {\n  margin-block-start: var(--n-space-xxl);\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-i-xxl {\n  margin-inline-start: var(--n-space-xxl);\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-xxl {\n  margin: var(--n-space-xxl);\n}\n.n-margin-is-xl {\n  margin-inline-start: var(--n-space-xl);\n}\n.n-margin-ie-xl {\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-bs-xl {\n  margin-block-start: var(--n-space-xl);\n}\n.n-margin-be-xl {\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-b-xl {\n  margin-block-start: var(--n-space-xl);\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-i-xl {\n  margin-inline-start: var(--n-space-xl);\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-xl {\n  margin: var(--n-space-xl);\n}\n.n-margin-is-l {\n  margin-inline-start: var(--n-space-l);\n}\n.n-margin-ie-l {\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-bs-l {\n  margin-block-start: var(--n-space-l);\n}\n.n-margin-be-l {\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-b-l {\n  margin-block-start: var(--n-space-l);\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-i-l {\n  margin-inline-start: var(--n-space-l);\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-l {\n  margin: var(--n-space-l);\n}\n.n-margin-is-m {\n  margin-inline-start: var(--n-space-m);\n}\n.n-margin-ie-m {\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-bs-m {\n  margin-block-start: var(--n-space-m);\n}\n.n-margin-be-m {\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-b-m {\n  margin-block-start: var(--n-space-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-i-m {\n  margin-inline-start: var(--n-space-m);\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-m {\n  margin: var(--n-space-m);\n}\n.n-margin-is-s {\n  margin-inline-start: var(--n-space-s);\n}\n.n-margin-ie-s {\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-bs-s {\n  margin-block-start: var(--n-space-s);\n}\n.n-margin-be-s {\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-b-s {\n  margin-block-start: var(--n-space-s);\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-i-s {\n  margin-inline-start: var(--n-space-s);\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-s {\n  margin: var(--n-space-s);\n}\n.n-margin-is-auto {\n  margin-inline-start: auto;\n}\n.n-margin-ie-auto {\n  margin-inline-end: auto;\n}\n.n-margin-bs-auto {\n  margin-block-start: auto;\n}\n.n-margin-be-auto {\n  margin-block-end: auto;\n}\n.n-margin-b-auto {\n  margin-block-start: auto;\n  margin-block-end: auto;\n}\n.n-margin-i-auto {\n  margin-inline-start: auto;\n  margin-inline-end: auto;\n}\n.n-margin-auto {\n  margin: auto;\n}\n.n-padding-is-xxl {\n  padding-inline-start: var(--n-space-xxl);\n}\n.n-padding-ie-xxl {\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-bs-xxl {\n  padding-block-start: var(--n-space-xxl);\n}\n.n-padding-be-xxl {\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-b-xxl {\n  padding-block-start: var(--n-space-xxl);\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-i-xxl {\n  padding-inline-start: var(--n-space-xxl);\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-xxl {\n  padding: var(--n-space-xxl);\n}\n.n-padding-is-xl {\n  padding-inline-start: var(--n-space-xl);\n}\n.n-padding-ie-xl {\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-bs-xl {\n  padding-block-start: var(--n-space-xl);\n}\n.n-padding-be-xl {\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-b-xl {\n  padding-block-start: var(--n-space-xl);\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-i-xl {\n  padding-inline-start: var(--n-space-xl);\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-xl {\n  padding: var(--n-space-xl);\n}\n.n-padding-is-l {\n  padding-inline-start: var(--n-space-l);\n}\n.n-padding-ie-l {\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-bs-l {\n  padding-block-start: var(--n-space-l);\n}\n.n-padding-be-l {\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-b-l {\n  padding-block-start: var(--n-space-l);\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-i-l {\n  padding-inline-start: var(--n-space-l);\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-l {\n  padding: var(--n-space-l);\n}\n.n-padding-is-m {\n  padding-inline-start: var(--n-space-m);\n}\n.n-padding-ie-m {\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-bs-m {\n  padding-block-start: var(--n-space-m);\n}\n.n-padding-be-m {\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-b-m {\n  padding-block-start: var(--n-space-m);\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-i-m {\n  padding-inline-start: var(--n-space-m);\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-m {\n  padding: var(--n-space-m);\n}\n.n-padding-is-s {\n  padding-inline-start: var(--n-space-s);\n}\n.n-padding-ie-s {\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-bs-s {\n  padding-block-start: var(--n-space-s);\n}\n.n-padding-be-s {\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-b-s {\n  padding-block-start: var(--n-space-s);\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-i-s {\n  padding-inline-start: var(--n-space-s);\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-s {\n  padding: var(--n-space-s);\n}\n.n-font-size-xxxl {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-font-size-xxl {\n  font-size: var(--n-font-size-xxl);\n}\n.n-font-size-xl {\n  font-size: var(--n-font-size-xl);\n}\n.n-font-size-l {\n  font-size: var(--n-font-size-l);\n}\n.n-font-size-m {\n  font-size: var(--n-font-size-m);\n}\n.n-font-size-s {\n  font-size: var(--n-font-size-s);\n}\n.n-font-size-xs {\n  font-size: var(--n-font-size-xs);\n}\n.n-font-weight {\n  font-weight: var(--n-font-weight);\n}\n.n-font-weight-active {\n  font-weight: var(--n-font-weight-active);\n}\n.n-font-weight-heading {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-font-weight-strong {\n  font-weight: var(--n-font-weight-strong);\n}\n.n-color-text {\n  color: var(--n-color-text);\n}\n.n-color-text-link {\n  color: var(--n-color-text-link);\n}\n.n-color-text-weak {\n  color: var(--n-color-text-weak);\n}\n.n-color-text-weaker {\n  color: var(--n-color-text-weaker);\n}\n.n-color-text-weakest {\n  color: var(--n-color-text-weakest);\n}\n.n-color-text-on-accent {\n  color: var(--n-color-text-on-accent);\n}\n.n-color-text-error {\n  color: var(--n-color-text-error);\n}\n.n-color-text-success {\n  color: var(--n-color-text-success);\n}\n.n-color-nav-heading {\n  color: var(--n-color-nav-heading);\n}\n.n-color-nav-surface {\n  background-color: var(--n-color-nav-surface);\n}\n.n-color-surface {\n  background-color: var(--n-color-surface);\n}\n.n-color-background {\n  background-color: var(--n-color-background);\n}\n.n-color-surface-raised {\n  background-color: var(--n-color-surface-raised);\n}\n.n-color-status-neutral {\n  background-color: var(--n-color-status-neutral);\n}\n.n-color-status-warning {\n  background-color: var(--n-color-status-warning);\n}\n.n-color-status-highlight {\n  background-color: var(--n-color-status-highlight);\n}\n.n-color-status-danger {\n  background-color: var(--n-color-status-danger);\n}\n.n-color-status-success {\n  background-color: var(--n-color-status-success);\n}\n.n-color-status-info {\n  background-color: var(--n-color-status-info);\n}\n.n-color-status-progress {\n  background-color: var(--n-color-status-progress);\n}\n.n-color-status-neutral-weak {\n  background-color: var(--n-color-status-neutral-weak);\n}\n.n-color-status-warning-weak {\n  background-color: var(--n-color-status-warning-weak);\n}\n.n-color-status-highlight-weak {\n  background-color: var(--n-color-status-highlight-weak);\n}\n.n-color-status-danger-weak {\n  background-color: var(--n-color-status-danger-weak);\n}\n.n-color-status-success-weak {\n  background-color: var(--n-color-status-success-weak);\n}\n.n-color-status-info-weak {\n  background-color: var(--n-color-status-info-weak);\n}\n.n-color-status-progress-weak {\n  background-color: var(--n-color-status-progress-weak);\n}\n.n-color-button {\n  background-color: var(--n-color-button);\n}\n.n-color-button-hover:hover {\n  background-color: var(--n-color-button-hover);\n}\n.n-color-active {\n  background-color: var(--n-color-active);\n}\n.n-color-icon {\n  color: var(--n-color-icon);\n}\n.n-color-icon-hover:hover {\n  color: var(--n-color-icon-hover);\n}\n.n-size-icon-xxs {\n  inline-size: var(--n-size-icon-xxs);\n  block-size: var(--n-size-icon-xxs);\n}\n.n-size-icon-xs {\n  inline-size: var(--n-size-icon-xs);\n  block-size: var(--n-size-icon-xs);\n}\n.n-size-icon-s {\n  inline-size: var(--n-size-icon-s);\n  block-size: var(--n-size-icon-s);\n}\n.n-size-icon-m {\n  inline-size: var(--n-size-icon-m);\n  block-size: var(--n-size-icon-m);\n}\n.n-size-icon-l {\n  inline-size: var(--n-size-icon-l);\n  block-size: var(--n-size-icon-l);\n}\n.n-size-icon-xl {\n  inline-size: var(--n-size-icon-xl);\n  block-size: var(--n-size-icon-xl);\n}\n.n-size-icon-xxl {\n  inline-size: var(--n-size-icon-xxl);\n  block-size: var(--n-size-icon-xxl);\n}\n.n-gap-xxl {\n  gap: var(--n-space-xxl);\n}\n.n-gap-xl {\n  gap: var(--n-space-xl);\n}\n.n-gap-l {\n  gap: var(--n-space-l);\n}\n.n-gap-m {\n  gap: var(--n-space-m);\n}\n.n-gap-s {\n  gap: var(--n-space-s);\n}\n:where(.n-typescale-xxxl, .n-typescale-xxl, .n-typescale-xl, .n-typescale-l, .n-typescale-m, .n-typescale-s, .n-typescale-xs, .n-typeset) {\n  font-family: var(--n-font-family);\n  margin: 0;\n}\n.n-typeset :where(pre, code) {\n  font-family: var(--n-font-family-code);\n}\n.n-typescale-l,\n.n-typescale-xl,\n.n-typescale-xxl,\n.n-typescale-xxxl,\n:where(.n-typeset) :where(h1, h2, h3, h4, h5, h6) {\n  font-feature-settings: var(--n-font-features-reduced);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-l,\n:where(.n-typeset) .n-typescale-xl,\n:where(.n-typeset) .n-typescale-xxl,\n:where(.n-typeset) .n-typescale-xxxl,\n:where(.n-typeset) :where(h2, h3, h4, h5, h6) {\n  margin: 0.5em 0;\n}\n:where(.n-typeset) * + .n-typescale-l,\n:where(.n-typeset) * + .n-typescale-xl,\n:where(.n-typeset) * + .n-typescale-xxl,\n:where(.n-typeset) * + .n-typescale-xxxl,\n:where(.n-typeset) * + :where(h2, h3, h4, h5, h6) {\n  margin-block-start: 1.5rem;\n}\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  font-size: var(--n-font-size-m);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-m,\n:where(.n-typeset) .n-typescale-s,\n:where(.n-typeset) .n-typescale-xs,\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  margin: 0.85em 0;\n}\n:where(.n-typeset) :where(dd) {\n  margin-inline-start: 0.85em;\n}\n.n-typescale-xxxl,\n:where(.n-typeset h1) {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-typescale-xxl,\n:where(.n-typeset h2) {\n  font-size: var(--n-font-size-xxl);\n}\n.n-typescale-xl,\n:where(.n-typeset h3) {\n  font-size: var(--n-font-size-xl);\n}\n.n-typescale-l,\n:where(.n-typeset) :where(h4, blockquote) {\n  font-size: var(--n-font-size-l);\n}\n.n-typescale-m,\n:where(.n-typeset) :where(p, h5) {\n  font-size: var(--n-font-size-m);\n}\n:where(.n-typeset h5) {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-typescale-s,\n:where(.n-typeset) :where(h6, figcaption) {\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height);\n}\n.n-typescale-xs,\n:where(.n-typeset small) {\n  font-size: var(--n-font-size-xs);\n}\n:where(.n-typeset) > :first-child {\n  margin-block-start: 0;\n}\n:where(.n-typeset) > :last-child {\n  margin-block-end: 0;\n}\n:where(.n-typeset) :where(ul, ol, dl, blockquote) {\n  margin: 0.5em 0;\n  padding: 0 0 0 1.5em;\n}\n:where(.n-typeset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-typeset a:hover) {\n  text-decoration: none;\n}\n:where(.n-typeset code) {\n  overflow-wrap: break-word;\n}\n:where(.n-typeset pre code) {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n:where(.n-typeset) :where(strong, b) {\n  font-weight: var(--n-font-weight-strong);\n}\n:where(.n-typeset mark) {\n  background: var(--n-color-status-warning-weak);\n}\n.n-caption {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n}\n.n-dl {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(9ch, max-content));\n  column-gap: var(--n-space-m);\n}\n.n-dl dt {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight-active);\n  font-size: var(--n-font-size-s);\n  padding-block-start: calc(var(--n-font-size-m) - var(--n-font-size-s));\n  grid-column-start: 1;\n}\n.n-dl :where(dt, dd) {\n  margin: 0;\n}\n.n-dl dd {\n  color: var(--n-color-text);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-dl dd:last-of-type {\n  margin-block-end: 0;\n}\n.n-color-accent,\n.n-color-accent-bg {\n  background-color: var(--n-color-accent);\n}\n.n-color-accent-text {\n  color: var(--n-color-accent);\n}\n.n-color-accent-fill {\n  fill: var(--n-color-accent);\n}\n.n-color-accent-stroke {\n  stroke: var(--n-color-accent);\n}\n.n-stack,\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  display: flex;\n  justify-content: flex-start;\n  flex-flow: column wrap;\n}\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  align-items: center;\n  flex-direction: row;\n}\n.n-stack-horizontal-s {\n  align-items: start;\n}\n.n-stack-horizontal-e {\n  align-items: end;\n}\n.n-grid,\n.n-grid-12,\n.n-grid-2,\n.n-grid-3,\n.n-grid-4,\n.n-grid-6,\n.n-grid-8 {\n  display: grid;\n  align-items: start;\n  grid-template-columns: repeat(var(--n-grid-columns, 12), 1fr);\n}\n.n-grid-8 {\n  --n-grid-columns: 8;\n}\n.n-grid-6 {\n  --n-grid-columns: 6;\n}\n.n-grid-4 {\n  --n-grid-columns: 4;\n}\n.n-grid-3 {\n  --n-grid-columns: 3;\n}\n.n-grid-2 {\n  --n-grid-columns: 2;\n}\n.n-grid-center-i {\n  justify-self: center;\n}\n.n-grid-center-b {\n  align-self: center;\n}\n.n-grid-center {\n  place-self: center;\n}\n.n-container,\n.n-container-l {\n  max-inline-size: 1200px;\n}\n.n-container-xl {\n  max-inline-size: 2400px;\n}\n.n-container-m {\n  max-inline-size: 1000px;\n}\n.n-container-s {\n  max-inline-size: 800px;\n}\n.n-container-xs {\n  max-inline-size: 600px;\n}\n.n-container-xxs {\n  max-inline-size: 400px;\n}\n.n-truncate {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.n-truncate-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-truncate-3 {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-align-start {\n  text-align: start;\n}\n.n-align-center {\n  text-align: center;\n}\n.n-align-end {\n  text-align: end;\n}\n.n-divider,\n.n-hr {\n  background: var(--n-color-border);\n  display: block;\n  margin: 0;\n  border: 0;\n  block-size: 1px;\n  inline-size: 100%;\n}\n.n-hint,\n.n-label {\n  display: flex;\n  color: var(--n-color-text);\n  font-family: var(--n-font-family);\n  font-size: var(--n-font-size-m);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  margin: 0;\n}\n.n-hint {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-error {\n  color: var(--n-color-text-error);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-input {\n  display: block;\n  background: var(--n-color-active);\n  color: var(--n-color-text);\n  padding-block-start: calc(var(--n-space-s) - 1px);\n  padding-block-end: calc(var(--n-space-s) - 1px);\n  padding-inline-start: calc(var(--n-space-s) * 1.6);\n  padding-inline-end: calc(var(--n-space-s) * 1.6);\n  border-radius: var(--n-border-radius-s);\n  border: 1px solid var(--n-color-border-strong);\n  font-family: var(--n-font-family);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  line-height: var(--n-line-height-form);\n  transition: border var(--n-transition-slowly),\n    box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);\n}\n.n-input:hover {\n  border-color: var(--n-color-border-hover);\n}\n.n-input:focus {\n  border-color: var(--n-color-accent);\n  background: var(--n-color-surface);\n  outline: 0;\n  box-shadow: 0 0 0 1px var(--n-color-accent);\n}\n.n-input::placeholder {\n  color: var(--n-color-text-weakest);\n}\n.n-input:disabled {\n  border-color: var(--n-color-active);\n  color: var(--n-color-text-weakest);\n}\n.n-input[aria-invalid=\"true\"] {\n  border-color: var(--n-color-status-danger);\n}\n.n-input[aria-invalid=\"true\"]:focus {\n  border-color: var(--n-color-status-danger);\n  box-shadow: 0 0 0 1px var(--n-color-status-danger);\n}\n.n-clinic-icon,\n.n-clinic-icon-s {\n  color: var(--n-color-text-on-accent);\n  background: var(--n-clinic-icon-color, var(--n-color-accent));\n  border-radius: var(--n-border-radius);\n  box-shadow: var(--n-box-shadow);\n  inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  line-height: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  font-size: var(--n-clinic-icon-font-size, var(--n-font-size-s));\n  font-weight: var(--n-font-weight-active);\n  display: inline-block;\n  text-align: center;\n}\n.n-clinic-icon-s {\n  --n-clinic-icon-size: calc(var(--n-size-icon-l) / 1.2);\n}\n", "",{"version":3,"sources":["webpack://./src/popup/nord.css"],"names":[],"mappings":"AAAA;EACE,kCAAkC;EAClC,+BAA+B;EAC/B,qCAAqC;EACrC,oCAAoC;EACpC,yCAAyC;EACzC,0CAA0C;EAC1C,4CAA4C;EAC5C,sCAAsC;EACtC,wCAAwC;EACxC,yCAAyC;EACzC,yCAAyC;EACzC,uCAAuC;EACvC,oCAAoC;EACpC,2CAA2C;EAC3C,qCAAqC;EACrC,wCAAwC;EACxC,4CAA4C;EAC5C,2CAA2C;EAC3C,4CAA4C;EAC5C,2CAA2C;EAC3C,6CAA6C;EAC7C,yCAAyC;EACzC,0CAA0C;EAC1C,uCAAuC;EACvC,2CAA2C;EAC3C,iDAAiD;EACjD,iDAAiD;EACjD,mDAAmD;EACnD,gDAAgD;EAChD,iDAAiD;EACjD,8CAA8C;EAC9C,kDAAkD;EAClD,oCAAoC;EACpC,0CAA0C;EAC1C,0CAA0C;EAC1C,kCAAkC;EAClC,qCAAqC;EACrC,oCAAoC;EACpC,gDAAgD;EAChD,uDAAuD;EACvD;sEACoE;EACpE;qCACmC;EACnC;iCAC+B;EAC/B;;iCAE+B;EAC/B,iDAAiD;EACjD,yDAAyD;EACzD;iCAC+B;EAC/B;kCACgC;EAChC;mCACiC;EACjC;;0CAEwC;EACxC,2BAA2B;EAC3B,yBAAyB;EACzB,yBAAyB;EACzB,qBAAqB;EACrB,yBAAyB;EACzB,wBAAwB;EACxB,2BAA2B;EAC3B;;oBAEkB;EAClB,6DAA6D;EAC7D;sBACoB;EACpB;gCAC8B;EAC9B,oBAAoB;EACpB,2BAA2B;EAC3B,4BAA4B;EAC5B,2BAA2B;EAC3B,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;EACrB,qBAAqB;EACrB,qBAAqB;EACrB,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,iBAAiB;EACjB,gBAAgB;EAChB,+BAA+B;EAC/B,wBAAwB;EACxB,sBAAsB;EACtB,6BAA6B;EAC7B,6BAA6B;EAC7B,kCAAkC;EAClC,gCAAgC;EAChC,gCAAgC;EAChC,2BAA2B;EAC3B,4BAA4B;EAC5B,4BAA4B;EAC5B,oBAAoB;EACpB,0BAA0B;EAC1B,uBAAuB;EACvB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,qBAAqB;EACrB,kBAAkB;EAClB,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;EACrB,oBAAoB;EACpB,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,8BAA8B;EAC9B,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,iCAAiC;EACjC,6CAA6C;EAC7C,iCAAiC;EACjC,iCAAiC;EACjC,0BAA0B;EAC1B,mCAAmC;AACrC;AACA;EACE,+BAA+B;EAC/B,0BAA0B;AAC5B;AACA;;;EAGE,wBAAwB;EACxB,gBAAgB;EAChB,sBAAsB;EACtB,SAAS;EACT,SAAS;EACT,UAAU;AACZ;AACA;EACE,gBAAgB;AAClB;AACA;EACE,qBAAqB;EACrB,cAAc;AAChB;AACA;EACE,oBAAoB;EACpB,8BAA8B;EAC9B,wBAAwB;EACxB,gBAAgB;AAClB;AACA;EACE;IACE,iCAAiC;IACjC,uCAAuC;IACvC,kCAAkC;IAClC,gCAAgC;EAClC;AACF;AACA;EACE,oDAAoD;AACtD;AACA;EACE,kDAAkD;AACpD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,mDAAmD;EACnD,iDAAiD;AACnD;AACA;EACE,oDAAoD;EACpD,kDAAkD;AACpD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,8CAA8C;AAChD;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,uDAAuD;AACzD;AACA;EACE,yDAAyD;EACzD,uDAAuD;AACzD;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,qDAAqD;AACvD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,kDAAkD;AACpD;AACA;EACE,oDAAoD;EACpD,kDAAkD;AACpD;AACA;EACE,qDAAqD;EACrD,mDAAmD;AACrD;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,4DAA4D;AAC9D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,4DAA4D;EAC5D,0DAA0D;AAC5D;AACA;EACE,+CAA+C;AACjD;AACA;EACE,2DAA2D;AAC7D;AACA;EACE,yDAAyD;AAC3D;AACA;EACE,0DAA0D;AAC5D;AACA;EACE,wDAAwD;AAC1D;AACA;EACE,0DAA0D;EAC1D,wDAAwD;AAC1D;AACA;EACE,2DAA2D;EAC3D,yDAAyD;AAC3D;AACA;EACE,8CAA8C;AAChD;AACA;EACE,2CAA2C;AAC7C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,+BAA+B;AACjC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;EACpC,kCAAkC;AACpC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,uBAAuB;AACzB;AACA;EACE,wBAAwB;AAC1B;AACA;EACE,sBAAsB;AACxB;AACA;EACE,wBAAwB;EACxB,sBAAsB;AACxB;AACA;EACE,yBAAyB;EACzB,uBAAuB;AACzB;AACA;EACE,YAAY;AACd;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,sCAAsC;AACxC;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,wCAAwC;EACxC,sCAAsC;AACxC;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,uCAAuC;AACzC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,uCAAuC;EACvC,qCAAqC;AACvC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,sCAAsC;AACxC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,qCAAqC;AACvC;AACA;EACE,mCAAmC;AACrC;AACA;EACE,qCAAqC;EACrC,mCAAmC;AACrC;AACA;EACE,sCAAsC;EACtC,oCAAoC;AACtC;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,kCAAkC;AACpC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,+BAA+B;AACjC;AACA;EACE,+BAA+B;AACjC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,oCAAoC;AACtC;AACA;EACE,gCAAgC;AAClC;AACA;EACE,kCAAkC;AACpC;AACA;EACE,iCAAiC;AACnC;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,2CAA2C;AAC7C;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,8CAA8C;AAChD;AACA;EACE,+CAA+C;AACjD;AACA;EACE,4CAA4C;AAC9C;AACA;EACE,gDAAgD;AAClD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,sDAAsD;AACxD;AACA;EACE,mDAAmD;AACrD;AACA;EACE,oDAAoD;AACtD;AACA;EACE,iDAAiD;AACnD;AACA;EACE,qDAAqD;AACvD;AACA;EACE,uCAAuC;AACzC;AACA;EACE,6CAA6C;AAC/C;AACA;EACE,uCAAuC;AACzC;AACA;EACE,0BAA0B;AAC5B;AACA;EACE,gCAAgC;AAClC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,iCAAiC;EACjC,gCAAgC;AAClC;AACA;EACE,kCAAkC;EAClC,iCAAiC;AACnC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,uBAAuB;AACzB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,iCAAiC;EACjC,SAAS;AACX;AACA;EACE,sCAAsC;AACxC;AACA;;;;;EAKE,qDAAqD;EACrD,yCAAyC;EACzC,yCAAyC;EACzC,0BAA0B;AAC5B;AACA;;;;;EAKE,eAAe;AACjB;AACA;;;;;EAKE,0BAA0B;AAC5B;AACA;;EAEE,+BAA+B;EAC/B,6CAA6C;EAC7C,iCAAiC;EACjC,iCAAiC;EACjC,0BAA0B;AAC5B;AACA;;;;;EAKE,gBAAgB;AAClB;AACA;EACE,2BAA2B;AAC7B;AACA;;EAEE,kCAAkC;AACpC;AACA;;EAEE,iCAAiC;AACnC;AACA;;EAEE,gCAAgC;AAClC;AACA;;EAEE,+BAA+B;AACjC;AACA;;EAEE,+BAA+B;AACjC;AACA;EACE,yCAAyC;AAC3C;AACA;;EAEE,+BAA+B;EAC/B,iCAAiC;AACnC;AACA;;EAEE,gCAAgC;AAClC;AACA;EACE,qBAAqB;AACvB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,+BAA+B;EAC/B,0BAA0B;AAC5B;AACA;EACE,qBAAqB;AACvB;AACA;EACE,yBAAyB;AAC3B;AACA;EACE,qBAAqB;EACrB,qBAAqB;AACvB;AACA;EACE,wCAAwC;AAC1C;AACA;EACE,8CAA8C;AAChD;AACA;EACE,iCAAiC;EACjC,iCAAiC;AACnC;AACA;EACE,SAAS;EACT,UAAU;EACV,aAAa;EACb,iEAAiE;EACjE,4BAA4B;AAC9B;AACA;EACE,iCAAiC;EACjC,wCAAwC;EACxC,+BAA+B;EAC/B,sEAAsE;EACtE,oBAAoB;AACtB;AACA;EACE,SAAS;AACX;AACA;EACE,0BAA0B;EAC1B,iCAAiC;EACjC,+BAA+B;EAC/B,kCAAkC;AACpC;AACA;EACE,mBAAmB;AACrB;AACA;;EAEE,uCAAuC;AACzC;AACA;EACE,4BAA4B;AAC9B;AACA;EACE,2BAA2B;AAC7B;AACA;EACE,6BAA6B;AAC/B;AACA;;;;EAIE,aAAa;EACb,2BAA2B;EAC3B,sBAAsB;AACxB;AACA;;;EAGE,mBAAmB;EACnB,mBAAmB;AACrB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,gBAAgB;AAClB;AACA;;;;;;;EAOE,aAAa;EACb,kBAAkB;EAClB,6DAA6D;AAC/D;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,mBAAmB;AACrB;AACA;EACE,oBAAoB;AACtB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,kBAAkB;AACpB;AACA;;EAEE,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,uBAAuB;AACzB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,sBAAsB;AACxB;AACA;EACE,qBAAqB;EACrB,mBAAmB;EACnB,gBAAgB;EAChB,uBAAuB;AACzB;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EACb,4BAA4B;EAC5B,oBAAoB;EACpB,gBAAgB;AAClB;AACA;EACE,oBAAoB;EACpB,qBAAqB;EACrB,aAAa;EACb,4BAA4B;EAC5B,oBAAoB;EACpB,gBAAgB;AAClB;AACA;EACE,iBAAiB;AACnB;AACA;EACE,kBAAkB;AACpB;AACA;EACE,eAAe;AACjB;AACA;;EAEE,iCAAiC;EACjC,cAAc;EACd,SAAS;EACT,SAAS;EACT,eAAe;EACf,iBAAiB;AACnB;AACA;;EAEE,aAAa;EACb,0BAA0B;EAC1B,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;EACzC,yCAAyC;EACzC,SAAS;AACX;AACA;EACE,iCAAiC;EACjC,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;AAC3C;AACA;EACE,gCAAgC;EAChC,iCAAiC;EACjC,+BAA+B;EAC/B,yCAAyC;AAC3C;AACA;EACE,cAAc;EACd,iCAAiC;EACjC,0BAA0B;EAC1B,iDAAiD;EACjD,+CAA+C;EAC/C,kDAAkD;EAClD,gDAAgD;EAChD,uCAAuC;EACvC,8CAA8C;EAC9C,iCAAiC;EACjC,iCAAiC;EACjC,+BAA+B;EAC/B,sCAAsC;EACtC;gFAC8E;AAChF;AACA;EACE,yCAAyC;AAC3C;AACA;EACE,mCAAmC;EACnC,kCAAkC;EAClC,UAAU;EACV,2CAA2C;AAC7C;AACA;EACE,kCAAkC;AACpC;AACA;EACE,mCAAmC;EACnC,kCAAkC;AACpC;AACA;EACE,0CAA0C;AAC5C;AACA;EACE,0CAA0C;EAC1C,kDAAkD;AACpD;AACA;;EAEE,oCAAoC;EACpC,6DAA6D;EAC7D,qCAAqC;EACrC,+BAA+B;EAC/B,4DAA4D;EAC5D,2DAA2D;EAC3D,gEAAgE;EAChE,+DAA+D;EAC/D,4DAA4D;EAC5D,+DAA+D;EAC/D,wCAAwC;EACxC,qBAAqB;EACrB,kBAAkB;AACpB;AACA;EACE,sDAAsD;AACxD","sourcesContent":[":root {\n  --n-color-accent: rgb(53, 89, 199);\n  --n-color-text: rgb(12, 26, 61);\n  --n-color-text-link: rgb(53, 89, 199);\n  --n-color-text-weak: rgb(54, 67, 74);\n  --n-color-text-weaker: rgb(102, 118, 128);\n  --n-color-text-weakest: rgb(178, 186, 191);\n  --n-color-text-on-accent: rgb(255, 255, 255);\n  --n-color-text-error: rgb(185, 77, 55);\n  --n-color-text-success: rgb(80, 128, 56);\n  --n-color-nav-surface: rgb(246, 248, 248);\n  --n-color-nav-heading: rgb(143, 161, 170);\n  --n-color-nav-hover: rgb(234, 240, 240);\n  --n-color-border: rgb(216, 222, 228);\n  --n-color-border-strong: rgb(188, 197, 204);\n  --n-color-surface: rgb(255, 255, 255);\n  --n-color-background: rgb(255, 255, 255);\n  --n-color-surface-raised: rgb(250, 251, 251);\n  --n-color-overlay: rgba(144, 152, 152, 0.4);\n  --n-color-status-neutral: rgb(114, 110, 119);\n  --n-color-status-warning: rgb(240, 192, 68);\n  --n-color-status-highlight: rgb(125, 73, 193);\n  --n-color-status-danger: rgb(185, 77, 55);\n  --n-color-status-success: rgb(80, 128, 56);\n  --n-color-status-info: rgb(53, 89, 199);\n  --n-color-status-progress: rgb(0, 131, 138);\n  --n-color-status-neutral-weak: rgb(227, 227, 227);\n  --n-color-status-warning-weak: rgb(255, 233, 189);\n  --n-color-status-highlight-weak: rgb(238, 220, 255);\n  --n-color-status-danger-weak: rgb(255, 208, 199);\n  --n-color-status-success-weak: rgb(216, 229, 200);\n  --n-color-status-info-weak: rgb(204, 218, 255);\n  --n-color-status-progress-weak: rgb(196, 240, 242);\n  --n-color-button: rgb(255, 255, 255);\n  --n-color-button-hover: rgb(246, 248, 248);\n  --n-color-border-hover: rgb(102, 118, 128);\n  --n-color-icon: rgb(102, 118, 128);\n  --n-color-icon-hover: rgb(12, 26, 61);\n  --n-color-active: rgb(246, 248, 248);\n  --n-box-shadow: 0 1px 3px rgba(12, 12, 12, 0.09);\n  --n-box-shadow-header: 0 1px 5px rgba(12, 12, 12, 0.05);\n  --n-box-shadow-card: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(12, 12, 12, 0.05), 0 0 40px rgba(12, 12, 12, 0.015);\n  --n-box-shadow-nav: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(12, 12, 12, 0.14);\n  --n-box-shadow-popout: 0 4px 12px rgba(12, 12, 12, 0.15),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-modal: 0 24px 38px 3px rgba(12, 12, 12, 0.16),\n    0 9px 86px 8px rgba(12, 12, 12, 0.1), 0 11px 15px -7px rgba(12, 12, 12, 0.1),\n    0 0 0 1px rgba(0, 0, 0, 0.05);\n  --n-box-shadow-dark: 0 1px 3px rgba(0, 0, 0, 0.2);\n  --n-box-shadow-header-dark: 0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-card-dark: 0 0 0 1px var(--n-color-border),\n    0 1px 5px rgba(0, 0, 0, 0.15);\n  --n-box-shadow-nav-dark: 0 0 0 1px var(--n-color-border),\n    0 5px 17px rgba(0, 0, 0, 0.24);\n  --n-box-shadow-popout-dark: 0 4px 12px rgba(0, 0, 0, 0.25),\n    0 0 0 1px var(--n-color-border);\n  --n-box-shadow-modal-dark: 0 0 0 1px var(--n-color-border),\n    0 24px 38px 3px rgba(0, 0, 0, 0.34), 0px 9px 86px 8px rgba(0, 0, 0, 0.28),\n    0px 11px 15px -7px rgba(0, 0, 0, 0.28);\n  --n-font-size-xxxl: 2.25rem;\n  --n-font-size-xxl: 1.5rem;\n  --n-font-size-xl: 1.25rem;\n  --n-font-size-l: 1rem;\n  --n-font-size-m: 0.875rem;\n  --n-font-size-s: 0.75rem;\n  --n-font-size-xs: 0.6875rem;\n  --n-font-family: \"Nordhealth Sans\", -apple-system, BlinkMacSystemFont,\n    \"Segoe UI\", Helvetica, Arial, sans-serif, \"Apple Color Emoji\",\n    \"Segoe UI Emoji\";\n  --n-font-family-code: \"Nordhealth Mono\", monospace, monospace;\n  --n-font-features: \"kern\" 1, \"tnum\" 1, \"calt\" 1, \"case\" 1, \"cv05\" 1, \"zero\" 1,\n    \"cv08\" 0, \"ss03\" 1;\n  --n-font-features-reduced: \"kern\" 1, \"tnum\" 0, \"calt\" 1, \"case\" 1, \"cv05\" 1,\n    \"zero\" 0, \"cv08\" 0, \"ss03\" 1;\n  --n-font-weight: 400;\n  --n-font-weight-active: 500;\n  --n-font-weight-heading: 600;\n  --n-font-weight-strong: 670;\n  --n-size-icon-xxs: 8px;\n  --n-size-icon-xs: 10px;\n  --n-size-icon-s: 12px;\n  --n-size-icon-m: 16px;\n  --n-size-icon-l: 24px;\n  --n-size-icon-xl: 36px;\n  --n-size-icon-xxl: 72px;\n  --n-space-xxl: 72px;\n  --n-space-xl: 36px;\n  --n-space-l: 24px;\n  --n-space-m: 16px;\n  --n-space-s: 8px;\n  --n-border-radius-sharp: 0.02em;\n  --n-border-radius-s: 3px;\n  --n-border-radius: 5px;\n  --n-border-radius-pill: 999px;\n  --n-border-radius-circle: 50%;\n  --n-transition-quickly: 0.05s ease;\n  --n-transition-slowly: 0.2s ease;\n  --n-transition-mobile: 0.4s ease;\n  --n-line-height-tight: 1.15;\n  --n-line-height-heading: 1.2;\n  --n-line-height-caption: 1.3;\n  --n-line-height: 1.5;\n  --n-line-height-form: 20px;\n  --n-index-deep: -999999;\n  --n-index-default: 1;\n  --n-index-masked: 100;\n  --n-index-mask: 200;\n  --n-index-sticky: 300;\n  --n-index-nav: 400;\n  --n-index-overlay: 500;\n  --n-index-spinner: 600;\n  --n-index-popout: 700;\n  --n-index-toast: 800;\n  --n-index-modal: 900;\n}\n:not(:defined) {\n  visibility: hidden;\n}\n* {\n  -webkit-tap-highlight-color: transparent;\n}\nhtml {\n  -webkit-text-size-adjust: 100%;\n  text-size-adjust: 100%;\n}\n:where(.n-reset) :where(*, ::before, ::after) {\n  box-sizing: border-box;\n}\n:where(.n-reset) {\n  font-family: var(--n-font-family);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n  accent-color: var(--n-color-accent);\n}\n:where(.n-reset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-reset),\n:where(.n-reset)\n  :where(body, div, span, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, code, img, svg, small, strike, strong, sub, sup, b, u, i, ol, ul, li, form, label, table, caption, tbody, tfoot, thead, tr, th, td, main, article, aside, canvas, footer, header, nav, section, time, button, video, textarea, input) {\n  -webkit-appearance: none;\n  appearance: none;\n  box-sizing: border-box;\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n:where(.n-reset) :where(ul[role=\"list\"], ol[role=\"list\"]) {\n  list-style: none;\n}\n:where(.n-reset) :where(img, picture) {\n  max-inline-size: 100%;\n  display: block;\n}\n:where(.n-reset) :where(input, button, textarea, select) {\n  font-family: inherit;\n  font-feature-settings: inherit;\n  -webkit-appearance: none;\n  appearance: none;\n}\n@media (prefers-reduced-motion: reduce) {\n  :where(.n-reset) :where(*, ::before, ::after) {\n    animation-duration: 0s !important;\n    animation-iteration-count: 1 !important;\n    transition-duration: 0s !important;\n    scroll-behavior: auto !important;\n  }\n}\n.n-border-is {\n  border-inline-start: 1px solid var(--n-color-border);\n}\n.n-border-ie {\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border-bs {\n  border-block-start: 1px solid var(--n-color-border);\n}\n.n-border-be {\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-b {\n  border-block-start: 1px solid var(--n-color-border);\n  border-block-end: 1px solid var(--n-color-border);\n}\n.n-border-i {\n  border-inline-start: 1px solid var(--n-color-border);\n  border-inline-end: 1px solid var(--n-color-border);\n}\n.n-border {\n  border: 1px solid var(--n-color-border);\n}\n.n-border-strong-is {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-ie {\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-bs {\n  border-block-start: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-be {\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-b {\n  border-block-start: 1px solid var(--n-color-border-strong);\n  border-block-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong-i {\n  border-inline-start: 1px solid var(--n-color-border-strong);\n  border-inline-end: 1px solid var(--n-color-border-strong);\n}\n.n-border-strong {\n  border: 1px solid var(--n-color-border-strong);\n}\n.n-border-hover-is:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-ie:hover {\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-bs:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-be:hover {\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-b:hover {\n  border-block-start: 1px solid var(--n-color-border-hover);\n  border-block-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover-i:hover {\n  border-inline-start: 1px solid var(--n-color-border-hover);\n  border-inline-end: 1px solid var(--n-color-border-hover);\n}\n.n-border-hover:hover {\n  border: 1px solid var(--n-color-border-hover);\n}\n.n-border-d-is {\n  border-inline-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-bs {\n  border-block-start: 1px dashed var(--n-color-border);\n}\n.n-border-d-be {\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-b {\n  border-block-start: 1px dashed var(--n-color-border);\n  border-block-end: 1px dashed var(--n-color-border);\n}\n.n-border-d-i {\n  border-inline-start: 1px dashed var(--n-color-border);\n  border-inline-end: 1px dashed var(--n-color-border);\n}\n.n-border-d {\n  border: 1px dashed var(--n-color-border);\n}\n.n-border-strong-d-is {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-ie {\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-bs {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-be {\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-b {\n  border-block-start: 1px dashed var(--n-color-border-strong);\n  border-block-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d-i {\n  border-inline-start: 1px dashed var(--n-color-border-strong);\n  border-inline-end: 1px dashed var(--n-color-border-strong);\n}\n.n-border-strong-d {\n  border: 1px dashed var(--n-color-border-strong);\n}\n.n-border-hover-d-is:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-ie:hover {\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-bs:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-be:hover {\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-b:hover {\n  border-block-start: 1px dashed var(--n-color-border-hover);\n  border-block-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d-i:hover {\n  border-inline-start: 1px dashed var(--n-color-border-hover);\n  border-inline-end: 1px dashed var(--n-color-border-hover);\n}\n.n-border-hover-d:hover {\n  border: 1px dashed var(--n-color-border-hover);\n}\n.n-border-radius-sharp {\n  border-radius: var(--n-border-radius-sharp);\n}\n.n-border-radius-s {\n  border-radius: var(--n-border-radius-s);\n}\n.n-border-radius {\n  border-radius: var(--n-border-radius);\n}\n.n-border-radius-pill {\n  border-radius: var(--n-border-radius-pill);\n}\n.n-border-radius-circle {\n  border-radius: var(--n-border-radius-circle);\n}\n.n-box-shadow {\n  box-shadow: var(--n-box-shadow);\n}\n.n-box-shadow-header {\n  box-shadow: var(--n-box-shadow-header);\n}\n.n-box-shadow-card {\n  box-shadow: var(--n-box-shadow-card);\n}\n.n-box-shadow-nav {\n  box-shadow: var(--n-box-shadow-nav);\n}\n.n-box-shadow-popout {\n  box-shadow: var(--n-box-shadow-popout);\n}\n.n-box-shadow-modal {\n  box-shadow: var(--n-box-shadow-modal);\n}\n.n-margin-is-xxl {\n  margin-inline-start: var(--n-space-xxl);\n}\n.n-margin-ie-xxl {\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-bs-xxl {\n  margin-block-start: var(--n-space-xxl);\n}\n.n-margin-be-xxl {\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-b-xxl {\n  margin-block-start: var(--n-space-xxl);\n  margin-block-end: var(--n-space-xxl);\n}\n.n-margin-i-xxl {\n  margin-inline-start: var(--n-space-xxl);\n  margin-inline-end: var(--n-space-xxl);\n}\n.n-margin-xxl {\n  margin: var(--n-space-xxl);\n}\n.n-margin-is-xl {\n  margin-inline-start: var(--n-space-xl);\n}\n.n-margin-ie-xl {\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-bs-xl {\n  margin-block-start: var(--n-space-xl);\n}\n.n-margin-be-xl {\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-b-xl {\n  margin-block-start: var(--n-space-xl);\n  margin-block-end: var(--n-space-xl);\n}\n.n-margin-i-xl {\n  margin-inline-start: var(--n-space-xl);\n  margin-inline-end: var(--n-space-xl);\n}\n.n-margin-xl {\n  margin: var(--n-space-xl);\n}\n.n-margin-is-l {\n  margin-inline-start: var(--n-space-l);\n}\n.n-margin-ie-l {\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-bs-l {\n  margin-block-start: var(--n-space-l);\n}\n.n-margin-be-l {\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-b-l {\n  margin-block-start: var(--n-space-l);\n  margin-block-end: var(--n-space-l);\n}\n.n-margin-i-l {\n  margin-inline-start: var(--n-space-l);\n  margin-inline-end: var(--n-space-l);\n}\n.n-margin-l {\n  margin: var(--n-space-l);\n}\n.n-margin-is-m {\n  margin-inline-start: var(--n-space-m);\n}\n.n-margin-ie-m {\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-bs-m {\n  margin-block-start: var(--n-space-m);\n}\n.n-margin-be-m {\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-b-m {\n  margin-block-start: var(--n-space-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-margin-i-m {\n  margin-inline-start: var(--n-space-m);\n  margin-inline-end: var(--n-space-m);\n}\n.n-margin-m {\n  margin: var(--n-space-m);\n}\n.n-margin-is-s {\n  margin-inline-start: var(--n-space-s);\n}\n.n-margin-ie-s {\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-bs-s {\n  margin-block-start: var(--n-space-s);\n}\n.n-margin-be-s {\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-b-s {\n  margin-block-start: var(--n-space-s);\n  margin-block-end: var(--n-space-s);\n}\n.n-margin-i-s {\n  margin-inline-start: var(--n-space-s);\n  margin-inline-end: var(--n-space-s);\n}\n.n-margin-s {\n  margin: var(--n-space-s);\n}\n.n-margin-is-auto {\n  margin-inline-start: auto;\n}\n.n-margin-ie-auto {\n  margin-inline-end: auto;\n}\n.n-margin-bs-auto {\n  margin-block-start: auto;\n}\n.n-margin-be-auto {\n  margin-block-end: auto;\n}\n.n-margin-b-auto {\n  margin-block-start: auto;\n  margin-block-end: auto;\n}\n.n-margin-i-auto {\n  margin-inline-start: auto;\n  margin-inline-end: auto;\n}\n.n-margin-auto {\n  margin: auto;\n}\n.n-padding-is-xxl {\n  padding-inline-start: var(--n-space-xxl);\n}\n.n-padding-ie-xxl {\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-bs-xxl {\n  padding-block-start: var(--n-space-xxl);\n}\n.n-padding-be-xxl {\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-b-xxl {\n  padding-block-start: var(--n-space-xxl);\n  padding-block-end: var(--n-space-xxl);\n}\n.n-padding-i-xxl {\n  padding-inline-start: var(--n-space-xxl);\n  padding-inline-end: var(--n-space-xxl);\n}\n.n-padding-xxl {\n  padding: var(--n-space-xxl);\n}\n.n-padding-is-xl {\n  padding-inline-start: var(--n-space-xl);\n}\n.n-padding-ie-xl {\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-bs-xl {\n  padding-block-start: var(--n-space-xl);\n}\n.n-padding-be-xl {\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-b-xl {\n  padding-block-start: var(--n-space-xl);\n  padding-block-end: var(--n-space-xl);\n}\n.n-padding-i-xl {\n  padding-inline-start: var(--n-space-xl);\n  padding-inline-end: var(--n-space-xl);\n}\n.n-padding-xl {\n  padding: var(--n-space-xl);\n}\n.n-padding-is-l {\n  padding-inline-start: var(--n-space-l);\n}\n.n-padding-ie-l {\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-bs-l {\n  padding-block-start: var(--n-space-l);\n}\n.n-padding-be-l {\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-b-l {\n  padding-block-start: var(--n-space-l);\n  padding-block-end: var(--n-space-l);\n}\n.n-padding-i-l {\n  padding-inline-start: var(--n-space-l);\n  padding-inline-end: var(--n-space-l);\n}\n.n-padding-l {\n  padding: var(--n-space-l);\n}\n.n-padding-is-m {\n  padding-inline-start: var(--n-space-m);\n}\n.n-padding-ie-m {\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-bs-m {\n  padding-block-start: var(--n-space-m);\n}\n.n-padding-be-m {\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-b-m {\n  padding-block-start: var(--n-space-m);\n  padding-block-end: var(--n-space-m);\n}\n.n-padding-i-m {\n  padding-inline-start: var(--n-space-m);\n  padding-inline-end: var(--n-space-m);\n}\n.n-padding-m {\n  padding: var(--n-space-m);\n}\n.n-padding-is-s {\n  padding-inline-start: var(--n-space-s);\n}\n.n-padding-ie-s {\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-bs-s {\n  padding-block-start: var(--n-space-s);\n}\n.n-padding-be-s {\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-b-s {\n  padding-block-start: var(--n-space-s);\n  padding-block-end: var(--n-space-s);\n}\n.n-padding-i-s {\n  padding-inline-start: var(--n-space-s);\n  padding-inline-end: var(--n-space-s);\n}\n.n-padding-s {\n  padding: var(--n-space-s);\n}\n.n-font-size-xxxl {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-font-size-xxl {\n  font-size: var(--n-font-size-xxl);\n}\n.n-font-size-xl {\n  font-size: var(--n-font-size-xl);\n}\n.n-font-size-l {\n  font-size: var(--n-font-size-l);\n}\n.n-font-size-m {\n  font-size: var(--n-font-size-m);\n}\n.n-font-size-s {\n  font-size: var(--n-font-size-s);\n}\n.n-font-size-xs {\n  font-size: var(--n-font-size-xs);\n}\n.n-font-weight {\n  font-weight: var(--n-font-weight);\n}\n.n-font-weight-active {\n  font-weight: var(--n-font-weight-active);\n}\n.n-font-weight-heading {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-font-weight-strong {\n  font-weight: var(--n-font-weight-strong);\n}\n.n-color-text {\n  color: var(--n-color-text);\n}\n.n-color-text-link {\n  color: var(--n-color-text-link);\n}\n.n-color-text-weak {\n  color: var(--n-color-text-weak);\n}\n.n-color-text-weaker {\n  color: var(--n-color-text-weaker);\n}\n.n-color-text-weakest {\n  color: var(--n-color-text-weakest);\n}\n.n-color-text-on-accent {\n  color: var(--n-color-text-on-accent);\n}\n.n-color-text-error {\n  color: var(--n-color-text-error);\n}\n.n-color-text-success {\n  color: var(--n-color-text-success);\n}\n.n-color-nav-heading {\n  color: var(--n-color-nav-heading);\n}\n.n-color-nav-surface {\n  background-color: var(--n-color-nav-surface);\n}\n.n-color-surface {\n  background-color: var(--n-color-surface);\n}\n.n-color-background {\n  background-color: var(--n-color-background);\n}\n.n-color-surface-raised {\n  background-color: var(--n-color-surface-raised);\n}\n.n-color-status-neutral {\n  background-color: var(--n-color-status-neutral);\n}\n.n-color-status-warning {\n  background-color: var(--n-color-status-warning);\n}\n.n-color-status-highlight {\n  background-color: var(--n-color-status-highlight);\n}\n.n-color-status-danger {\n  background-color: var(--n-color-status-danger);\n}\n.n-color-status-success {\n  background-color: var(--n-color-status-success);\n}\n.n-color-status-info {\n  background-color: var(--n-color-status-info);\n}\n.n-color-status-progress {\n  background-color: var(--n-color-status-progress);\n}\n.n-color-status-neutral-weak {\n  background-color: var(--n-color-status-neutral-weak);\n}\n.n-color-status-warning-weak {\n  background-color: var(--n-color-status-warning-weak);\n}\n.n-color-status-highlight-weak {\n  background-color: var(--n-color-status-highlight-weak);\n}\n.n-color-status-danger-weak {\n  background-color: var(--n-color-status-danger-weak);\n}\n.n-color-status-success-weak {\n  background-color: var(--n-color-status-success-weak);\n}\n.n-color-status-info-weak {\n  background-color: var(--n-color-status-info-weak);\n}\n.n-color-status-progress-weak {\n  background-color: var(--n-color-status-progress-weak);\n}\n.n-color-button {\n  background-color: var(--n-color-button);\n}\n.n-color-button-hover:hover {\n  background-color: var(--n-color-button-hover);\n}\n.n-color-active {\n  background-color: var(--n-color-active);\n}\n.n-color-icon {\n  color: var(--n-color-icon);\n}\n.n-color-icon-hover:hover {\n  color: var(--n-color-icon-hover);\n}\n.n-size-icon-xxs {\n  inline-size: var(--n-size-icon-xxs);\n  block-size: var(--n-size-icon-xxs);\n}\n.n-size-icon-xs {\n  inline-size: var(--n-size-icon-xs);\n  block-size: var(--n-size-icon-xs);\n}\n.n-size-icon-s {\n  inline-size: var(--n-size-icon-s);\n  block-size: var(--n-size-icon-s);\n}\n.n-size-icon-m {\n  inline-size: var(--n-size-icon-m);\n  block-size: var(--n-size-icon-m);\n}\n.n-size-icon-l {\n  inline-size: var(--n-size-icon-l);\n  block-size: var(--n-size-icon-l);\n}\n.n-size-icon-xl {\n  inline-size: var(--n-size-icon-xl);\n  block-size: var(--n-size-icon-xl);\n}\n.n-size-icon-xxl {\n  inline-size: var(--n-size-icon-xxl);\n  block-size: var(--n-size-icon-xxl);\n}\n.n-gap-xxl {\n  gap: var(--n-space-xxl);\n}\n.n-gap-xl {\n  gap: var(--n-space-xl);\n}\n.n-gap-l {\n  gap: var(--n-space-l);\n}\n.n-gap-m {\n  gap: var(--n-space-m);\n}\n.n-gap-s {\n  gap: var(--n-space-s);\n}\n:where(.n-typescale-xxxl, .n-typescale-xxl, .n-typescale-xl, .n-typescale-l, .n-typescale-m, .n-typescale-s, .n-typescale-xs, .n-typeset) {\n  font-family: var(--n-font-family);\n  margin: 0;\n}\n.n-typeset :where(pre, code) {\n  font-family: var(--n-font-family-code);\n}\n.n-typescale-l,\n.n-typescale-xl,\n.n-typescale-xxl,\n.n-typescale-xxxl,\n:where(.n-typeset) :where(h1, h2, h3, h4, h5, h6) {\n  font-feature-settings: var(--n-font-features-reduced);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-l,\n:where(.n-typeset) .n-typescale-xl,\n:where(.n-typeset) .n-typescale-xxl,\n:where(.n-typeset) .n-typescale-xxxl,\n:where(.n-typeset) :where(h2, h3, h4, h5, h6) {\n  margin: 0.5em 0;\n}\n:where(.n-typeset) * + .n-typescale-l,\n:where(.n-typeset) * + .n-typescale-xl,\n:where(.n-typeset) * + .n-typescale-xxl,\n:where(.n-typeset) * + .n-typescale-xxxl,\n:where(.n-typeset) * + :where(h2, h3, h4, h5, h6) {\n  margin-block-start: 1.5rem;\n}\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  font-size: var(--n-font-size-m);\n  font-feature-settings: var(--n-font-features);\n  font-weight: var(--n-font-weight);\n  line-height: var(--n-line-height);\n  color: var(--n-color-text);\n}\n:where(.n-typeset) .n-typescale-m,\n:where(.n-typeset) .n-typescale-s,\n:where(.n-typeset) .n-typescale-xs,\n:where(.n-typeset)\n  :where(p, li, dt, dd, blockquote, figcaption, small, pre, code, cite, small) {\n  margin: 0.85em 0;\n}\n:where(.n-typeset) :where(dd) {\n  margin-inline-start: 0.85em;\n}\n.n-typescale-xxxl,\n:where(.n-typeset h1) {\n  font-size: var(--n-font-size-xxxl);\n}\n.n-typescale-xxl,\n:where(.n-typeset h2) {\n  font-size: var(--n-font-size-xxl);\n}\n.n-typescale-xl,\n:where(.n-typeset h3) {\n  font-size: var(--n-font-size-xl);\n}\n.n-typescale-l,\n:where(.n-typeset) :where(h4, blockquote) {\n  font-size: var(--n-font-size-l);\n}\n.n-typescale-m,\n:where(.n-typeset) :where(p, h5) {\n  font-size: var(--n-font-size-m);\n}\n:where(.n-typeset h5) {\n  font-weight: var(--n-font-weight-heading);\n}\n.n-typescale-s,\n:where(.n-typeset) :where(h6, figcaption) {\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height);\n}\n.n-typescale-xs,\n:where(.n-typeset small) {\n  font-size: var(--n-font-size-xs);\n}\n:where(.n-typeset) > :first-child {\n  margin-block-start: 0;\n}\n:where(.n-typeset) > :last-child {\n  margin-block-end: 0;\n}\n:where(.n-typeset) :where(ul, ol, dl, blockquote) {\n  margin: 0.5em 0;\n  padding: 0 0 0 1.5em;\n}\n:where(.n-typeset a) {\n  color: var(--n-color-text-link);\n  text-decoration: underline;\n}\n:where(.n-typeset a:hover) {\n  text-decoration: none;\n}\n:where(.n-typeset code) {\n  overflow-wrap: break-word;\n}\n:where(.n-typeset pre code) {\n  white-space: pre-wrap;\n  word-break: break-all;\n}\n:where(.n-typeset) :where(strong, b) {\n  font-weight: var(--n-font-weight-strong);\n}\n:where(.n-typeset mark) {\n  background: var(--n-color-status-warning-weak);\n}\n.n-caption {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n}\n.n-dl {\n  margin: 0;\n  padding: 0;\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(9ch, max-content));\n  column-gap: var(--n-space-m);\n}\n.n-dl dt {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight-active);\n  font-size: var(--n-font-size-s);\n  padding-block-start: calc(var(--n-font-size-m) - var(--n-font-size-s));\n  grid-column-start: 1;\n}\n.n-dl :where(dt, dd) {\n  margin: 0;\n}\n.n-dl dd {\n  color: var(--n-color-text);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  margin-block-end: var(--n-space-m);\n}\n.n-dl dd:last-of-type {\n  margin-block-end: 0;\n}\n.n-color-accent,\n.n-color-accent-bg {\n  background-color: var(--n-color-accent);\n}\n.n-color-accent-text {\n  color: var(--n-color-accent);\n}\n.n-color-accent-fill {\n  fill: var(--n-color-accent);\n}\n.n-color-accent-stroke {\n  stroke: var(--n-color-accent);\n}\n.n-stack,\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  display: flex;\n  justify-content: flex-start;\n  flex-flow: column wrap;\n}\n.n-stack-horizontal,\n.n-stack-horizontal-e,\n.n-stack-horizontal-s {\n  align-items: center;\n  flex-direction: row;\n}\n.n-stack-horizontal-s {\n  align-items: start;\n}\n.n-stack-horizontal-e {\n  align-items: end;\n}\n.n-grid,\n.n-grid-12,\n.n-grid-2,\n.n-grid-3,\n.n-grid-4,\n.n-grid-6,\n.n-grid-8 {\n  display: grid;\n  align-items: start;\n  grid-template-columns: repeat(var(--n-grid-columns, 12), 1fr);\n}\n.n-grid-8 {\n  --n-grid-columns: 8;\n}\n.n-grid-6 {\n  --n-grid-columns: 6;\n}\n.n-grid-4 {\n  --n-grid-columns: 4;\n}\n.n-grid-3 {\n  --n-grid-columns: 3;\n}\n.n-grid-2 {\n  --n-grid-columns: 2;\n}\n.n-grid-center-i {\n  justify-self: center;\n}\n.n-grid-center-b {\n  align-self: center;\n}\n.n-grid-center {\n  place-self: center;\n}\n.n-container,\n.n-container-l {\n  max-inline-size: 1200px;\n}\n.n-container-xl {\n  max-inline-size: 2400px;\n}\n.n-container-m {\n  max-inline-size: 1000px;\n}\n.n-container-s {\n  max-inline-size: 800px;\n}\n.n-container-xs {\n  max-inline-size: 600px;\n}\n.n-container-xxs {\n  max-inline-size: 400px;\n}\n.n-truncate {\n  display: inline-block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.n-truncate-2 {\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  line-clamp: 2;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-truncate-3 {\n  display: -webkit-box;\n  -webkit-line-clamp: 3;\n  line-clamp: 3;\n  -webkit-box-orient: vertical;\n  box-orient: vertical;\n  overflow: hidden;\n}\n.n-align-start {\n  text-align: start;\n}\n.n-align-center {\n  text-align: center;\n}\n.n-align-end {\n  text-align: end;\n}\n.n-divider,\n.n-hr {\n  background: var(--n-color-border);\n  display: block;\n  margin: 0;\n  border: 0;\n  block-size: 1px;\n  inline-size: 100%;\n}\n.n-hint,\n.n-label {\n  display: flex;\n  color: var(--n-color-text);\n  font-family: var(--n-font-family);\n  font-size: var(--n-font-size-m);\n  font-weight: var(--n-font-weight-heading);\n  line-height: var(--n-line-height-heading);\n  margin: 0;\n}\n.n-hint {\n  color: var(--n-color-text-weaker);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-error {\n  color: var(--n-color-text-error);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-s);\n  line-height: var(--n-line-height-caption);\n}\n.n-input {\n  display: block;\n  background: var(--n-color-active);\n  color: var(--n-color-text);\n  padding-block-start: calc(var(--n-space-s) - 1px);\n  padding-block-end: calc(var(--n-space-s) - 1px);\n  padding-inline-start: calc(var(--n-space-s) * 1.6);\n  padding-inline-end: calc(var(--n-space-s) * 1.6);\n  border-radius: var(--n-border-radius-s);\n  border: 1px solid var(--n-color-border-strong);\n  font-family: var(--n-font-family);\n  font-weight: var(--n-font-weight);\n  font-size: var(--n-font-size-m);\n  line-height: var(--n-line-height-form);\n  transition: border var(--n-transition-slowly),\n    box-shadow var(--n-transition-slowly), background var(--n-transition-slowly);\n}\n.n-input:hover {\n  border-color: var(--n-color-border-hover);\n}\n.n-input:focus {\n  border-color: var(--n-color-accent);\n  background: var(--n-color-surface);\n  outline: 0;\n  box-shadow: 0 0 0 1px var(--n-color-accent);\n}\n.n-input::placeholder {\n  color: var(--n-color-text-weakest);\n}\n.n-input:disabled {\n  border-color: var(--n-color-active);\n  color: var(--n-color-text-weakest);\n}\n.n-input[aria-invalid=\"true\"] {\n  border-color: var(--n-color-status-danger);\n}\n.n-input[aria-invalid=\"true\"]:focus {\n  border-color: var(--n-color-status-danger);\n  box-shadow: 0 0 0 1px var(--n-color-status-danger);\n}\n.n-clinic-icon,\n.n-clinic-icon-s {\n  color: var(--n-color-text-on-accent);\n  background: var(--n-clinic-icon-color, var(--n-color-accent));\n  border-radius: var(--n-border-radius);\n  box-shadow: var(--n-box-shadow);\n  inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-inline-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  min-block-size: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  line-height: var(--n-clinic-icon-size, var(--n-size-icon-l));\n  font-size: var(--n-clinic-icon-font-size, var(--n-font-size-s));\n  font-weight: var(--n-font-weight-active);\n  display: inline-block;\n  text-align: center;\n}\n.n-clinic-icon-s {\n  --n-clinic-icon-size: calc(var(--n-size-icon-l) / 1.2);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css ***!
  \*******************************************************************/
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
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  color-scheme: light dark;\n}\n\nbody {\n  width: 375px;\n}\n\n.d-none,\n.d-hide {\n  display: none !important;\n}\n\n.d-visible {\n  visibility: visible;\n}\n\n.d-invisible {\n  visibility: hidden;\n}\n", "",{"version":3,"sources":["webpack://./src/popup/popup.css"],"names":[],"mappings":"AAAA;EACE,wBAAwB;AAC1B;;AAEA;EACE,YAAY;AACd;;AAEA;;EAEE,wBAAwB;AAC1B;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,kBAAkB;AACpB","sourcesContent":[":root {\n  color-scheme: light dark;\n}\n\nbody {\n  width: 375px;\n}\n\n.d-none,\n.d-hide {\n  display: none !important;\n}\n\n.d-visible {\n  visibility: visible;\n}\n\n.d-invisible {\n  visibility: hidden;\n}\n"],"sourceRoot":""}]);
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

/***/ "./node_modules/tippy.js/dist/tippy.css":
/*!**********************************************!*\
  !*** ./node_modules/tippy.js/dist/tippy.css ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_tippy_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./tippy.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/dist/tippy.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_tippy_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_tippy_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_tippy_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_tippy_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/popup/nord.css":
/*!****************************!*\
  !*** ./src/popup/nord.css ***!
  \****************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./nord.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/nord.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_nord_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/popup/popup.css":
/*!*****************************!*\
  !*** ./src/popup/popup.css ***!
  \*****************************/
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
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./popup.css */ "./node_modules/css-loader/dist/cjs.js!./src/popup/popup.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_popup_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


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

/***/ "./node_modules/tippy.js/dist/tippy.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/tippy.js/dist/tippy.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateFill": () => (/* binding */ animateFill),
/* harmony export */   "createSingleton": () => (/* binding */ createSingleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "delegate": () => (/* binding */ delegate),
/* harmony export */   "followCursor": () => (/* binding */ followCursor),
/* harmony export */   "hideAll": () => (/* binding */ hideAll),
/* harmony export */   "inlinePositioning": () => (/* binding */ inlinePositioning),
/* harmony export */   "roundArrow": () => (/* binding */ ROUND_ARROW),
/* harmony export */   "sticky": () => (/* binding */ sticky)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/


var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message

var visitedMessages;

if (true) {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if (true) {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if (true) {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
    /* istanbul ignore else */

    if (true) {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if (true) {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if (true) {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

var applyStylesModifier = Object.assign({}, _popperjs_core__WEBPACK_IMPORTED_MODULE_1__["default"], {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  var _optionalProps$popper;

  if (optionalProps === void 0) {
    optionalProps = {};
  }

  /* istanbul ignore else */
  if (true) {
    errorWhen(!Array.isArray(tippyInstances), ['The first argument passed to createSingleton() must be an array of', 'tippy instances. The passed value was', String(tippyInstances)].join(' '));
  }

  var individualInstances = tippyInstances;
  var references = [];
  var triggerTargets = [];
  var currentTarget;
  var overrides = optionalProps.overrides;
  var interceptSetPropsCleanups = [];
  var shownOnCreate = false;

  function setTriggerTargets() {
    triggerTargets = individualInstances.map(function (instance) {
      return normalizeToArray(instance.props.triggerTarget || instance.reference);
    }).reduce(function (acc, item) {
      return acc.concat(item);
    }, []);
  }

  function setReferences() {
    references = individualInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    individualInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  function interceptSetProps(singleton) {
    return individualInstances.map(function (instance) {
      var originalSetProps = instance.setProps;

      instance.setProps = function (props) {
        originalSetProps(props);

        if (instance.reference === currentTarget) {
          singleton.setProps(props);
        }
      };

      return function () {
        instance.setProps = originalSetProps;
      };
    });
  } // have to pass singleton, as it maybe undefined on first call


  function prepareInstance(singleton, target) {
    var index = triggerTargets.indexOf(target); // bail-out

    if (target === currentTarget) {
      return;
    }

    currentTarget = target;
    var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
      acc[prop] = individualInstances[index].props[prop];
      return acc;
    }, {});
    singleton.setProps(Object.assign({}, overrideProps, {
      getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function () {
        var _references$index;

        return (_references$index = references[index]) == null ? void 0 : _references$index.getBoundingClientRect();
      }
    }));
  }

  enableInstances(false);
  setReferences();
  setTriggerTargets();
  var plugin = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onHidden: function onHidden() {
          currentTarget = null;
        },
        onClickOutside: function onClickOutside(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            currentTarget = null;
          }
        },
        onShow: function onShow(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            prepareInstance(instance, references[0]);
          }
        },
        onTrigger: function onTrigger(instance, event) {
          prepareInstance(instance, event.currentTarget);
        }
      };
    }
  };
  var singleton = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [plugin].concat(optionalProps.plugins || []),
    triggerTarget: triggerTargets,
    popperOptions: Object.assign({}, optionalProps.popperOptions, {
      modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [applyStylesModifier])
    })
  }));
  var originalShow = singleton.show;

  singleton.show = function (target) {
    originalShow(); // first time, showOnCreate or programmatic call with no params
    // default to showing first instance

    if (!currentTarget && target == null) {
      return prepareInstance(singleton, references[0]);
    } // triggered from event (do nothing as prepareInstance already called by onTrigger)
    // programmatic call with no params when already visible (do nothing again)


    if (currentTarget && target == null) {
      return;
    } // target is index of instance


    if (typeof target === 'number') {
      return references[target] && prepareInstance(singleton, references[target]);
    } // target is a child tippy instance


    if (individualInstances.indexOf(target) >= 0) {
      var ref = target.reference;
      return prepareInstance(singleton, ref);
    } // target is a ReferenceElement


    if (references.indexOf(target) >= 0) {
      return prepareInstance(singleton, target);
    }
  };

  singleton.showNext = function () {
    var first = references[0];

    if (!currentTarget) {
      return singleton.show(0);
    }

    var index = references.indexOf(currentTarget);
    singleton.show(references[index + 1] || first);
  };

  singleton.showPrevious = function () {
    var last = references[references.length - 1];

    if (!currentTarget) {
      return singleton.show(last);
    }

    var index = references.indexOf(currentTarget);
    var target = references[index - 1] || last;
    singleton.show(target);
  };

  var originalSetProps = singleton.setProps;

  singleton.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  singleton.setInstances = function (nextInstances) {
    enableInstances(true);
    interceptSetPropsCleanups.forEach(function (fn) {
      return fn();
    });
    individualInstances = nextInstances;
    enableInstances(false);
    setReferences();
    setTriggerTargets();
    interceptSetPropsCleanups = interceptSetProps(singleton);
    singleton.setProps({
      triggerTarget: triggerTargets
    });
  };

  interceptSetPropsCleanups = interceptSetProps(singleton);
  return singleton;
};

var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if (true) {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({
    touch: defaultProps.touch
  }, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende;

    // @ts-ignore
    if (!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy)) {
      if (true) {
        errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
      }

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var mouseCoords = {
  clientX: 0,
  clientY: 0
};
var activeInstances = [];

function storeMouseCoords(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  mouseCoords = {
    clientX: clientX,
    clientY: clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var isInternalUpdate = false;
    var wasFocusEvent = false;
    var isUnmounted = true;
    var prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          // @ts-ignore - unneeded DOMRect properties
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance: instance,
          doc: doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(function (data) {
        return data.instance !== instance;
      });

      if (activeInstances.filter(function (data) {
        return data.doc === doc;
      }).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,
      onBeforeUpdate: function onBeforeUpdate() {
        prevProps = instance.props;
      },
      onAfterUpdate: function onAfterUpdate(_, _ref2) {
        var followCursor = _ref2.followCursor;

        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },
      onMount: function onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },
      onHidden: function onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }
    };
  }
};

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var triedPlacements = [];
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (triedPlacements.indexOf(state.placement) !== -1) {
            triedPlacements = [];
          }

          if (placement !== state.placement && triedPlacements.indexOf(state.placement) === -1) {
            triedPlacements.push(state.placement);
            instance.setProps({
              // @ts-ignore - unneeded DOMRect properties
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          var index = rects.indexOf(cursorRect);
          cursorRectIndex = index > -1 ? index : cursorRectIndex;
        }
      },
      onHidden: function onHidden() {
        cursorRectIndex = -1;
      }
    };
  }
};
function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tippy);

//# sourceMappingURL=tippy.esm.js.map


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

/***/ "./node_modules/@nordhealth/components/lib/Input.js":
/*!**********************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/Input.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ w)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./if-defined-4598a996.js */ "./node_modules/@nordhealth/components/lib/if-defined-4598a996.js");
/* harmony import */ var _class_map_949b7d3b_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./class-map-949b7d3b.js */ "./node_modules/@nordhealth/components/lib/class-map-949b7d3b.js");
/* harmony import */ var _ref_0e619221_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ref-0e619221.js */ "./node_modules/@nordhealth/components/lib/ref-0e619221.js");
/* harmony import */ var _unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./unsafe-html-6be42999.js */ "./node_modules/@nordhealth/components/lib/unsafe-html-6be42999.js");
/* harmony import */ var _FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FocusableMixin-34870ed3.js */ "./node_modules/@nordhealth/components/lib/FocusableMixin-34870ed3.js");
/* harmony import */ var _FormAssociatedMixin_252fb0e9_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./FormAssociatedMixin-252fb0e9.js */ "./node_modules/@nordhealth/components/lib/FormAssociatedMixin-252fb0e9.js");
/* harmony import */ var _InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./InputMixin-158f63fb.js */ "./node_modules/@nordhealth/components/lib/InputMixin-158f63fb.js");
/* harmony import */ var _TextField_a7382912_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./TextField-a7382912.js */ "./node_modules/@nordhealth/components/lib/TextField-a7382912.js");
/* harmony import */ var _AutocompleteMixin_370de2be_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./AutocompleteMixin-370de2be.js */ "./node_modules/@nordhealth/components/lib/AutocompleteMixin-370de2be.js");
/* harmony import */ var _SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SizeMixin-4559b224.js */ "./node_modules/@nordhealth/components/lib/SizeMixin-4559b224.js");
/* harmony import */ var _Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Component-92eb6234.js */ "./node_modules/@nordhealth/components/lib/Component-92eb6234.js");
/* harmony import */ var _FormField_081da729_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./FormField-081da729.js */ "./node_modules/@nordhealth/components/lib/FormField-081da729.js");
/* harmony import */ var _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SlotController-89834aef.js */ "./node_modules/@nordhealth/components/lib/SlotController-89834aef.js");
/* harmony import */ var _cond_338158e9_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./cond-338158e9.js */ "./node_modules/@nordhealth/components/lib/cond-338158e9.js");
/* harmony import */ var _directive_de55b00a_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./directive-de55b00a.js */ "./node_modules/@nordhealth/components/lib/directive-de55b00a.js");
/* harmony import */ var _EventController_d99ebeef_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./EventController-d99ebeef.js */ "./node_modules/@nordhealth/components/lib/EventController-d99ebeef.js");
/* harmony import */ var _events_731d0007_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./events-731d0007.js */ "./node_modules/@nordhealth/components/lib/events-731d0007.js");
/* harmony import */ var _VisuallyHidden_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./VisuallyHidden.js */ "./node_modules/@nordhealth/components/lib/VisuallyHidden.js");
const x=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.i`.n-input::-webkit-search-cancel-button,.n-input::-webkit-search-decoration{-webkit-appearance:none;appearance:none}.n-input-container{font-size:var(--n-font-size-m)}slot[name=end],slot[name=start]{display:flex;align-items:center;position:absolute;margin-inline-start:var(--n-space-m);block-size:100%;pointer-events:none;inset-block-start:0;color:var(--n-color-icon)}slot[name=end]{inset-inline-end:var(--n-space-m)}.has-start .n-input{padding-inline-start:var(--n-space-xl)}.n-input-container.has-end .n-input{padding-inline-end:calc(var(--n-space-xl) + var(--n-space-s))}::slotted(svg),svg{block-size:var(--n-size-icon-s)!important;inline-size:var(--n-size-icon-s)!important}:host([size="s"]) :is(slot[name=start],slot[name=end]){margin-inline-start:var(--n-space-s)}:host([size="s"]) .has-start .n-input{padding-inline-start:var(--n-space-l)}`;let k=class extends((0,_SizeMixin_4559b224_js__WEBPACK_IMPORTED_MODULE_12__.S)((0,_FormAssociatedMixin_252fb0e9_js__WEBPACK_IMPORTED_MODULE_8__.F)((0,_AutocompleteMixin_370de2be_js__WEBPACK_IMPORTED_MODULE_11__.A)((0,_TextField_a7382912_js__WEBPACK_IMPORTED_MODULE_10__.R)((0,_InputMixin_158f63fb_js__WEBPACK_IMPORTED_MODULE_9__.I)((0,_FocusableMixin_34870ed3_js__WEBPACK_IMPORTED_MODULE_7__.F)(_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.s))))))){constructor(){super(...arguments),this.startSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_15__.S(this,"start"),this.endSlot=new _SlotController_89834aef_js__WEBPACK_IMPORTED_MODULE_15__.S(this,"end"),this.type="text",this.expand=!1}render(){var e;const t="search"===this.type||this.startSlot.hasContent,s="number"===this.type,o="search"===this.type?(0,_unsafe_html_6be42999_js__WEBPACK_IMPORTED_MODULE_6__.o)('<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg"><path d="M7 59.5a52.5 52.5 0 1 0 105 0 52.5 52.5 0 1 0-105 0zM133 133 96.628 96.628" stroke-width="14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/></svg>'):_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.b;return _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_1__.y`${this.renderLabel()}<div class="${(0,_class_map_949b7d3b_js__WEBPACK_IMPORTED_MODULE_4__.o)({"n-input-container":!0,"has-start":t,"has-end":this.endSlot.hasContent})}"><slot name="${this.startSlot.slotName}" ?hidden="${!t}">${o}</slot><input ${(0,_ref_0e619221_js__WEBPACK_IMPORTED_MODULE_5__.n)(this.focusableRef)} id="${this.inputId}" class="n-input" type="${s?"text":this.type}" inputmode="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_16__.c)(s,"numeric")}" pattern="${(0,_cond_338158e9_js__WEBPACK_IMPORTED_MODULE_16__.c)(s,"[0-9]*")}" ?disabled="${this.disabled}" ?required="${this.required}" ?readonly="${this.readonly}" name="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.name)}" .value="${null!==(e=this.value)&&void 0!==e?e:""}" placeholder="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.placeholder)}" @input="${this.handleInput}" @change="${this.handleChange}" @keydown="${this.handleKeydown}" aria-describedby="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.getDescribedBy())}" aria-invalid="${(0,_if_defined_4598a996_js__WEBPACK_IMPORTED_MODULE_3__.l)(this.getInvalid())}" spellcheck="false" autocomplete="${this.autocomplete}"><slot name="${this.endSlot.slotName}" ?hidden="${this.endSlot.isEmpty}"></slot></div>${this.renderError()}`}handleKeydown(e){const{form:t}=this;if("Enter"===e.key&&t){const e=function(e){let t=e.querySelector('button[type="submit"]');!t&&e.id&&(t=e.getRootNode().querySelector(`button[form=${e.id}]`));return t}(t);setTimeout((()=>null==e?void 0:e.click()),0)}}};k.styles=[_Component_92eb6234_js__WEBPACK_IMPORTED_MODULE_13__.s,_FormField_081da729_js__WEBPACK_IMPORTED_MODULE_14__.s,_TextField_a7382912_js__WEBPACK_IMPORTED_MODULE_10__.s,x],(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)()],k.prototype,"type",void 0),(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_2__.e)({reflect:!0,type:Boolean})],k.prototype,"expand",void 0),k=(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__.e)("nord-input")],k);var w=k;
//# sourceMappingURL=Input.js.map


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

/***/ "./node_modules/@nordhealth/components/lib/TextField-a7382912.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@nordhealth/components/lib/TextField-a7382912.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "R": () => (/* binding */ i),
/* harmony export */   "s": () => (/* binding */ t)
/* harmony export */ });
/* harmony import */ var _query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./query-assigned-elements-e6cbac30.js */ "./node_modules/@nordhealth/components/lib/query-assigned-elements-e6cbac30.js");
/* harmony import */ var _property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./property-03f59dce.js */ "./node_modules/@nordhealth/components/lib/property-03f59dce.js");
/* harmony import */ var _lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lit-element-9178eae5.js */ "./node_modules/@nordhealth/components/lib/lit-element-9178eae5.js");
function i(o){class i extends o{constructor(){super(...arguments),this.readonly=!1}}return (0,_query_assigned_elements_e6cbac30_js__WEBPACK_IMPORTED_MODULE_0__._)([(0,_property_03f59dce_js__WEBPACK_IMPORTED_MODULE_1__.e)({type:Boolean,reflect:!0})],i.prototype,"readonly",void 0),i}const t=_lit_element_9178eae5_js__WEBPACK_IMPORTED_MODULE_2__.i`:host{--_n-input-inline-size:var(--n-input-inline-size, 240px);--_n-input-background:var(--n-input-background, var(--n-color-active));--_n-input-color:var(--n-input-color, var(--n-color-text));--_n-input-border-color:var(--n-input-border-color, var(--n-color-border-strong));--_n-input-border-radius:var(--n-input-border-radius, var(--n-border-radius-s))}.n-input-container{position:relative;inline-size:var(--_n-input-inline-size)}.n-input{background:var(--_n-input-background);color:var(--_n-input-color);padding:calc(var(--n-space-s) - 1px) calc(var(--n-space-s) * 1.6);border-radius:var(--_n-input-border-radius);border:1px solid var(--_n-input-border-color);font-family:var(--n-font-family);font-size:var(--n-font-size-m);line-height:var(--n-line-height-form);inline-size:100%;transition:border var(--n-transition-slowly),box-shadow var(--n-transition-slowly),background var(--n-transition-slowly)}@media (max-width:480px){.n-input{font-size:var(--n-font-size-l)}}:host([expand]){--_n-input-inline-size:100%;inline-size:100%}.n-input:hover,.n-label-container:hover+.n-input-container .n-input{--_n-input-border-color:var(--n-input-border-color, var(--n-color-border-hover))}.n-input:focus{--_n-input-border-color:var(--n-input-border-color, var(--n-color-accent));--_n-input-background:var(--n-input-background, var(--n-color-surface));outline:0;box-shadow:0 0 0 1px var(--_n-input-border-color)}.n-input::placeholder{color:var(--n-color-text-weakest)}.n-input[aria-invalid=true]{--_n-input-border-color:var(--n-input-border-color, var(--n-color-status-danger))!important}.n-input:disabled,.n-input[readonly],.n-label-container:hover+.n-input-container .n-input:disabled,.n-label-container:hover+.n-input-container .n-input[readonly]{--_n-input-border-color:var(--n-input-border-color, var(--n-color-active));--_n-input-color:var(--n-input-color, var(--n-color-text-weakest))}.n-input[readonly],.n-label-container:hover+.n-input-container .n-input[readonly]{--_n-input-color:var(--n-input-color, var(--n-color-text-weak))}.n-input[readonly]:focus{--_n-input-border-color:var(--n-input-border-color, var(--n-color-accent))}:host([size="s"]) :is(.n-input-container, .n-input){font-size:var(--n-font-size-s)}:host([size="s"]) .n-input{padding:calc((var(--n-space-s)/ 2) - 2px) calc((var(--n-space-s)/ 2) * 1.6)}:host([size="l"]) :is(.n-input-container, .n-input){font-size:var(--n-font-size-l)}:host([size="l"]) .n-input{padding-block-start:calc(var(--n-space-m)/ 1.25);padding-block-end:calc(var(--n-space-m)/ 1.25)}`;
//# sourceMappingURL=TextField-a7382912.js.map


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
/*!****************************!*\
  !*** ./src/popup/popup.js ***!
  \****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nord_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nord.css */ "./src/popup/nord.css");
/* harmony import */ var _nordhealth_components_lib_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @nordhealth/components/lib/Button */ "./node_modules/@nordhealth/components/lib/Button.js");
/* harmony import */ var _nordhealth_components_lib_Divider__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @nordhealth/components/lib/Divider */ "./node_modules/@nordhealth/components/lib/Divider.js");
/* harmony import */ var _nordhealth_components_lib_Input__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @nordhealth/components/lib/Input */ "./node_modules/@nordhealth/components/lib/Input.js");
/* harmony import */ var _nordhealth_components_lib_Select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @nordhealth/components/lib/Select */ "./node_modules/@nordhealth/components/lib/Select.js");
/* harmony import */ var _nordhealth_components_lib_Stack__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @nordhealth/components/lib/Stack */ "./node_modules/@nordhealth/components/lib/Stack.js");
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popup.css */ "./src/popup/popup.css");
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tippy.js */ "./node_modules/tippy.js/dist/tippy.esm.js");
/* harmony import */ var tippy_js_dist_tippy_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tippy.js/dist/tippy.css */ "./node_modules/tippy.js/dist/tippy.css");
/* harmony import */ var _translate_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./translate_view */ "./src/popup/translate_view.js");
/* harmony import */ var _login_view__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./login_view */ "./src/popup/login_view.js");
/* harmony import */ var _translate_selection_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./translate_selection_button */ "./src/popup/translate_selection_button.js");
/* harmony import */ var _shared_utils__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../shared/utils */ "./src/shared/utils.js");


function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }
function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }
function _classPrivateFieldGet(receiver, privateMap) { var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get"); return _classApplyDescriptorGet(receiver, descriptor); }
function _classExtractFieldDescriptor(receiver, privateMap, action) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to " + action + " private field on non-instance"); } return privateMap.get(receiver); }
function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }













var _translateView = /*#__PURE__*/new WeakMap();
var _loginView = /*#__PURE__*/new WeakMap();
var _spinner = /*#__PURE__*/new WeakMap();
var _divider = /*#__PURE__*/new WeakMap();
var _translateSelectionButton = /*#__PURE__*/new WeakMap();
var _isMobile = /*#__PURE__*/new WeakMap();
var _init = /*#__PURE__*/new WeakSet();
var _getContentState = /*#__PURE__*/new WeakSet();
var _login = /*#__PURE__*/new WeakSet();
var _getUserDisplayName = /*#__PURE__*/new WeakSet();
var _handleLoginSession = /*#__PURE__*/new WeakSet();
var _handleLoginError = /*#__PURE__*/new WeakSet();
var _updateViewState = /*#__PURE__*/new WeakSet();
var _onLogin = /*#__PURE__*/new WeakSet();
var _onTranslate = /*#__PURE__*/new WeakSet();
var _onShowOriginal = /*#__PURE__*/new WeakSet();
var _onTranslateViewChange = /*#__PURE__*/new WeakSet();
var _onTranslateSelection = /*#__PURE__*/new WeakSet();
var _setTranslateSelectionButtonEnabled = /*#__PURE__*/new WeakSet();
class App {
  constructor() {
    _classPrivateMethodInitSpec(this, _setTranslateSelectionButtonEnabled);
    _classPrivateMethodInitSpec(this, _onTranslateSelection);
    _classPrivateMethodInitSpec(this, _onTranslateViewChange);
    _classPrivateMethodInitSpec(this, _onShowOriginal);
    _classPrivateMethodInitSpec(this, _onTranslate);
    _classPrivateMethodInitSpec(this, _onLogin);
    _classPrivateMethodInitSpec(this, _updateViewState);
    _classPrivateMethodInitSpec(this, _handleLoginError);
    _classPrivateMethodInitSpec(this, _handleLoginSession);
    _classPrivateMethodInitSpec(this, _getUserDisplayName);
    _classPrivateMethodInitSpec(this, _login);
    _classPrivateMethodInitSpec(this, _getContentState);
    _classPrivateMethodInitSpec(this, _init);
    _classPrivateFieldInitSpec(this, _translateView, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _loginView, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _spinner, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _divider, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _translateSelectionButton, {
      writable: true,
      value: void 0
    });
    _classPrivateFieldInitSpec(this, _isMobile, {
      writable: true,
      value: false
    });
    _classPrivateMethodGet(this, _init, _init2).call(this);
  }
  async run() {
    {
      const results = await browser.tabs.executeScript({
        code: `if (!window.customElements.get("translate-toast")) { true; }`
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
    }
    const response = await _classPrivateMethodGet(this, _getContentState, _getContentState2).call(this);
    if (response && response.result) {
      // Transration is already in progress or finished
      _classPrivateMethodGet(this, _updateViewState, _updateViewState2).call(this, ViewState.TranslateView);
      if (response.result.isProcessing) {
        _classPrivateFieldGet(this, _translateView).setLoading(true);
      } else if (response.result.isShowingOriginal) {
        _classPrivateFieldGet(this, _translateView).showInitialView();
      } else {
        _classPrivateFieldGet(this, _translateView).showResultView(response.result.sourceLanguage, response.result.targetLanguage);
      }
    } else {
      // No translation is in progress
      _classPrivateFieldGet(this, _spinner).classList.remove("d-hide");
      _classPrivateFieldGet(this, _divider).classList.add("d-hide");
      _classPrivateFieldGet(this, _loginView).setHidden(true);
      _classPrivateMethodGet(this, _getUserDisplayName, _getUserDisplayName2).call(this);
    }
  }
}
function _init2() {
  if (window.screen.width < 768) {
    document.body.style.width = "100%";
  }
  browser.runtime.getPlatformInfo().then(info => {
    if (info.os === "ios") {
      if (window.screen.width < 768) {
        _classPrivateFieldSet(this, _isMobile, true);
        document.getElementById("header-title").classList.add("d-hide");
        document.getElementById("login-view-divider").classList.add("d-hide");
        document.getElementById("translate-view").classList.add("d-hide");
      }
      const applyAddaptiveAppearance = () => {
        if (window.screen.width < 768 || document.documentElement.clientWidth > 375 && document.documentElement.clientWidth <= 507) {
          document.body.style.width = "100%";
          document.getElementById("header-title").classList.add("d-hide");
        } else {
          document.body.style.width = "375px";
          requestAnimationFrame(() => {
            if (document.documentElement.getBoundingClientRect().height !== window.innerHeight) {
              document.getElementById("header-title").classList.add("d-hide");
            } else {
              document.getElementById("header-title").classList.remove("d-hide");
            }
          });
        }
      };
      const resizeObserver = new ResizeObserver(() => {
        applyAddaptiveAppearance();
      });
      resizeObserver.observe(document.documentElement);
      applyAddaptiveAppearance();
    } else {
      document.getElementById("translate-selection-button-container").classList.add("d-hide");
    }
  });
  (0,_shared_utils__WEBPACK_IMPORTED_MODULE_11__.runColorMode)(isDarkMode => {
    (0,_shared_utils__WEBPACK_IMPORTED_MODULE_11__.loadColorScheme)(isDarkMode ? "./assets/nord-dark.css" : "./assets/nord.css");
  });
  _classPrivateFieldSet(this, _translateView, new _translate_view__WEBPACK_IMPORTED_MODULE_8__.TranslateView());
  _classPrivateFieldGet(this, _translateView).on("change", _classPrivateMethodGet(this, _onTranslateViewChange, _onTranslateViewChange2).bind(this));
  _classPrivateFieldGet(this, _translateView).on("translate", _classPrivateMethodGet(this, _onTranslate, _onTranslate2).bind(this));
  _classPrivateFieldGet(this, _translateView).on("showOriginal", _classPrivateMethodGet(this, _onShowOriginal, _onShowOriginal2).bind(this));
  browser.storage.local.get(["selectedTargetLanguage"], result => {
    _classPrivateFieldGet(this, _translateView).setSelectedTargetLanguage(result.selectedTargetLanguage);
  });
  _classPrivateFieldSet(this, _loginView, new _login_view__WEBPACK_IMPORTED_MODULE_9__.LoginView());
  _classPrivateFieldGet(this, _loginView).on("login", _classPrivateMethodGet(this, _onLogin, _onLogin2).bind(this));
  _classPrivateFieldSet(this, _spinner, document.getElementById("spinner"));
  _classPrivateFieldSet(this, _divider, document.getElementById("translate-selection-button-divider"));
  _classPrivateFieldSet(this, _translateSelectionButton, new _translate_selection_button__WEBPACK_IMPORTED_MODULE_10__.TranslateSelectionButton());
  _classPrivateFieldGet(this, _translateSelectionButton).on("click", _classPrivateMethodGet(this, _onTranslateSelection, _onTranslateSelection2).bind(this));
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      method: "getSelection"
    }).then(response => {
      _classPrivateMethodGet(this, _setTranslateSelectionButtonEnabled, _setTranslateSelectionButtonEnabled2).call(this, response && response.result && response.result.trim());
    });
  });
  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (!request) {
      return;
    }
    switch (request.method) {
      case "startTranslation":
        _classPrivateFieldGet(this, _translateView).setLoading(true);
        sendResponse();
        break;
      case "cancelTranslation":
      case "finishTranslation":
        _classPrivateFieldGet(this, _translateView).setLoading(false);
        _classPrivateFieldGet(this, _translateView).showResultView(request.result.sourceLanguage, request.result.targetLanguage);
        sendResponse();
        break;
      case "finishTranslateSelection":
        _classPrivateFieldGet(this, _translateSelectionButton).setLoading(false);
        sendResponse();
        break;
      default:
        sendResponse();
        break;
    }
  });
}
async function _getContentState2() {
  return new Promise((resolve, reject) => {
    browser.tabs.query({
      active: true,
      currentWindow: true
    }, async tabs => {
      const response = await browser.tabs.sendMessage(tabs[0].id, {
        method: "getContentState"
      });
      resolve(response);
    });
  });
}
function _login2(email, password) {
  browser.runtime.sendNativeMessage("application.id", {
    method: "cf_clearance"
  }, response => {
    if (response && response.result) {
      const cookies = response.result;
      const request = {
        method: "login",
        email,
        password,
        cookies
      };
      browser.runtime.sendNativeMessage("application.id", request, response => {
        if (!response || !response.result) {
          _classPrivateMethodGet(this, _handleLoginError, _handleLoginError2).call(this, LoginErorr.InvalidCredentials);
        } else {
          _classPrivateMethodGet(this, _getUserDisplayName, _getUserDisplayName2).call(this);
        }
      });
    } else {
      _classPrivateMethodGet(this, _handleLoginError, _handleLoginError2).call(this, LoginErorr.ConnectionError);
    }
  });
}
function _getUserDisplayName2() {
  _classPrivateFieldGet(this, _loginView).setLoading(true);
  browser.runtime.sendNativeMessage("application.id", {
    method: "getUserDisplayName"
  }, response => {
    _classPrivateFieldGet(this, _spinner).classList.add("d-hide");
    _classPrivateFieldGet(this, _divider).classList.remove("d-hide");
    _classPrivateFieldGet(this, _loginView).setHidden(false);
    _classPrivateMethodGet(this, _handleLoginSession, _handleLoginSession2).call(this, response);
    _classPrivateFieldGet(this, _loginView).setLoading(false);
  });
}
function _handleLoginSession2(response) {
  // No stored credentials
  if (!response || !response.result) {
    _classPrivateMethodGet(this, _updateViewState, _updateViewState2).call(this, ViewState.LoginView);
    return;
  }

  // Session expired
  if (response.result.isPro === undefined) {
    if (response.result.credentials) {
      _classPrivateFieldGet(this, _loginView).setCredentials(response.result.credentials);
    }
    _classPrivateMethodGet(this, _handleLoginError, _handleLoginError2).call(this, LoginErorr.SessionExpired);
    return;
  }
  if (response.result.isPro) {
    // Pro user
    _classPrivateMethodGet(this, _updateViewState, _updateViewState2).call(this, ViewState.TranslateView);
  } else {
    // Free user
    if (response.result.credentials) {
      _classPrivateFieldGet(this, _loginView).setCredentials(response.result.credentials);
    }
    _classPrivateMethodGet(this, _handleLoginError, _handleLoginError2).call(this, LoginErorr.NotPro);
    _classPrivateMethodGet(this, _updateViewState, _updateViewState2).call(this, ViewState.LoginView);
  }
}
function _handleLoginError2(error) {
  switch (error) {
    case LoginErorr.ConnectionError:
      _classPrivateFieldGet(this, _loginView).setErrorMessage(browser.i18n.getMessage("error_message_internet_connection"));
      break;
    case LoginErorr.InvalidCredentials:
      _classPrivateFieldGet(this, _loginView).setErrorMessage(browser.i18n.getMessage("login_error_invalid_credentials_message"));
      break;
    case LoginErorr.SessionExpired:
      _classPrivateFieldGet(this, _loginView).setErrorMessage(browser.i18n.getMessage("error_message_session_expired"));
      break;
    case LoginErorr.NotPro:
      _classPrivateFieldGet(this, _loginView).setErrorMessage(browser.i18n.getMessage("login_error_not_pro_message"));
      break;
    default:
      _classPrivateFieldGet(this, _loginView).setErrorMessage(browser.i18n.getMessage("login_error_default_message"));
      break;
  }
  _classPrivateFieldGet(this, _loginView).setLoading(false);
}
function _updateViewState2(viewState) {
  switch (viewState) {
    case ViewState.LoginView:
      _classPrivateFieldGet(this, _loginView).setHidden(false);
      _classPrivateFieldGet(this, _translateView).setEnabled(false);
      if (_classPrivateFieldGet(this, _isMobile)) {
        _classPrivateFieldGet(this, _translateView).setHidden(true);
      }
      break;
    case ViewState.TranslateView:
      _classPrivateFieldGet(this, _loginView).setHidden(true);
      _classPrivateFieldGet(this, _translateView).setEnabled(true);
      if (_classPrivateFieldGet(this, _isMobile)) {
        _classPrivateFieldGet(this, _translateView).setHidden(false);
      }
      break;
  }
}
function _onLogin2(event) {
  _classPrivateFieldGet(this, _loginView).setLoading(true);
  _classPrivateFieldGet(this, _loginView).setErrorMessage(null);
  const email = event.detail.email;
  const password = event.detail.password;
  _classPrivateMethodGet(this, _login, _login2).call(this, email, password);
}
function _onTranslate2(event) {
  _classPrivateFieldGet(this, _translateView).setLoading(true);
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      method: "translate",
      sourceLanguage: event.detail.sourceLanguage,
      targetLanguage: event.detail.targetLanguage
    });
  });
}
function _onShowOriginal2() {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, tabs => {
    browser.tabs.sendMessage(tabs[0].id, {
      method: "showOriginal"
    });
  });
  _classPrivateFieldGet(this, _translateView).showInitialView();
}
async function _onTranslateViewChange2(event) {
  await browser.storage.local.set(event.detail);
}
function _onTranslateSelection2() {
  browser.tabs.query({
    active: true,
    currentWindow: true
  }, async tabs => {
    const response = await browser.tabs.sendMessage(tabs[0].id, {
      method: "getSelection"
    });
    if (response && response.result && response.result.trim()) {
      _classPrivateFieldGet(this, _translateSelectionButton).setLoading(true);
      const request = {
        method: "translateSelection",
        selectionText: response.result
      };
      browser.runtime.sendMessage(request);
    } else {
      _classPrivateMethodGet(this, _setTranslateSelectionButtonEnabled, _setTranslateSelectionButtonEnabled2).call(this, false);
    }
  });
}
function _setTranslateSelectionButtonEnabled2(enabled) {
  if (enabled) {
    _classPrivateFieldGet(this, _translateSelectionButton).setEnabled(true);
  } else {
    _classPrivateFieldGet(this, _translateSelectionButton).setEnabled(false);
    (0,tippy_js__WEBPACK_IMPORTED_MODULE_12__["default"])(".tooltip-container", {
      content: browser.i18n.getMessage("translate_selection_button_tooltip"),
      animation: "fade"
    });
  }
}
const ViewState = {
  LoginView: _login_view__WEBPACK_IMPORTED_MODULE_9__.LoginView,
  TranslateView: _translate_view__WEBPACK_IMPORTED_MODULE_8__.TranslateView
};
const LoginErorr = {
  ConnectionError: "ConnectionError",
  InvalidCredentials: "InvalidCredentials",
  SessionExpired: "SessionExpired",
  NotPro: "NotPro"
};
const app = new App();
app.run();
})();

/******/ })()
;
//# sourceMappingURL=popup.js.map