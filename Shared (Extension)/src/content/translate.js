"use strict";

import {
  isVisible,
  hasTextNode,
  hasInlineElement,
  once,
  scrollDidStop,
} from "./utils";

class App {
  #uid = 1;
  #sourceLanguage = undefined;
  #targetLanguage = undefined;
  #originalTexts = {};
  #translatedTexts = {};

  #toast = undefined;

  #isProcessing = false;
  #shouldProcessAfterScrolling = false;
  #isShowingOriginal = false;

  setup() {
    browser.runtime.onMessage.addListener(
      async (request, sender, sendResponse) => {
        if (!request) {
          return;
        }
        switch (request.method) {
          case "translate": {
            this.#shouldProcessAfterScrolling = true;

            await this.#translatePage(request);

            once(
              scrollDidStop(async () => {
                if (this.#shouldProcessAfterScrolling) {
                  await this.#translatePage({
                    sourceLanguage: this.#sourceLanguage,
                    targetLanguage: this.#targetLanguage,
                  });
                }
              }, 500)
            )();

            sendResponse();
            break;
          }
          case "getContentState": {
            if (this.#isProcessing) {
              sendResponse({ result: { isProcessing: this.#isProcessing } });
            } else if (Object.keys(this.#originalTexts).length > 0) {
              sendResponse({
                result: {
                  sourceLanguage: this.#sourceLanguage,
                  targetLanguage: this.#targetLanguage,
                  isShowingOriginal: this.#isShowingOriginal,
                },
              });
            } else {
              sendResponse(undefined);
            }
            break;
          }
          case "showOriginal": {
            this.#shouldProcessAfterScrolling = false;
            this.#isShowingOriginal = true;

            const elements = document.querySelectorAll(
              '[data-wtdl-translated="true"]'
            );
            for (const element of elements) {
              const uid = element.dataset.wtdlUid;
              const originalText = this.#originalTexts[uid];
              element.innerHTML = originalText;
              element.dataset.wtdlTranslated = "false";
            }
            sendResponse();
            break;
          }
          case "startTranslateSelection": {
            const selection = window.getSelection();
            const textRange = selection.getRangeAt(0);
            const selectionRect = textRange.getBoundingClientRect();

            const x = selectionRect.left + window.scrollX;
            const y = selectionRect.bottom + window.scrollY + 30;

            const position = getExistingPopoverPosition();
            const popover = createPopover(position || { x, y });
            popover.setAttribute("loading", true);

            sendResponse();
            break;
          }
          case "finishTranslateSelection": {
            const result = request.result;
            const popover = document.getElementById("translate-popover");
            if (popover) {
              if (result.result && result.result.texts) {
                const text = result.result.texts.map((t) => t.text).join("\n");
                popover.setAttribute("result", `${text}`);
                popover.setAttribute("lang", `${request.targetLanguage || ""}`);
              } else {
                if (result.error) {
                  const message = browser.i18n.getMessage(
                    "error_message_generic_error"
                  );
                  popover.setAttribute("error", message);
                } else {
                  const message = browser.i18n.getMessage(
                    "error_message_generic_error"
                  );
                  popover.setAttribute("error", message);
                }
              }
              popover.setAttribute("loading", false);
            }
            sendResponse();
            break;
          }
          case "ping": {
            sendResponse({ result: "pong" });
            break;
          }
          default: {
            sendResponse();
            break;
          }
        }
      }
    );
  }

  async #translatePage(request) {
    const translatedElements = document.querySelectorAll(
      '[data-wtdl-translated="false"]'
    );
    if (this.#targetLanguage === request.targetLanguage) {
      // Restore translated texts
      for (const element of translatedElements) {
        const uid = element.dataset.wtdlUid;
        const translatedText = this.#translatedTexts[uid];
        element.innerHTML = translatedText;
        element.dataset.wtdlTranslated = "true";
      }
    }

    const visibleElements = await collectVisibleElements();
    if (visibleElements.length === 0) {
      this.#cancelTranslation();
      return;
    }
    this.#startTranslation();

    const texts = visibleElements.map((element) => element.text);
    const response = await browser.runtime.sendMessage({
      method: "translate",
      texts,
      sourceLanguage: request.sourceLanguage,
      targetLanguage: request.targetLanguage,
    });

    if (response && response.result) {
      const result = response.result.result;
      if (result && result.texts) {
        this.#sourceLanguage = result.lang;
        this.#targetLanguage = request.targetLanguage;

        const translatedTexts = result.texts;
        if (translatedTexts.length === visibleElements.length) {
          for (let i = 0; i < visibleElements.length; i++) {
            const element = visibleElements[i].element;
            const text = translatedTexts[i].text;
            const uid = element.dataset.wtdlUid || this.#uid++;

            if (element.dataset.wtdlOriginal !== "true") {
              this.#originalTexts[uid] = element.innerHTML;
            }
            this.#translatedTexts[uid] = text;
            element.innerHTML = text;

            element.dataset.wtdlUid = `${uid}`;
            element.dataset.wtdlOriginal = "true";
            element.dataset.wtdlTranslated = "true";
          }
        }
      }
    }

    this.#finishTranslation();
  }

  #startTranslation() {
    this.#toast = createToast();
    this.#toast.setAttribute("show", true);

    this.#isProcessing = true;
    this.#isShowingOriginal = false;

    browser.runtime.sendMessage({
      method: "startTranslation",
    });
  }

  #cancelTranslation() {
    this.#isShowingOriginal = false;

    browser.runtime.sendMessage({
      method: "cancelTranslation",
      result: {
        sourceLanguage: this.#sourceLanguage,
        targetLanguage: this.#targetLanguage,
      },
    });
  }

  #finishTranslation() {
    this.#isProcessing = false;
    this.#toast.setAttribute("dismiss", true);

    browser.runtime.sendMessage({
      method: "finishTranslation",
      result: {
        sourceLanguage: this.#sourceLanguage,
        targetLanguage: this.#targetLanguage,
      },
    });
  }
}

async function collectVisibleElements() {
  const blockElements = [];

  const children = document.body.children;
  splitElements(children, blockElements);

  const visibleElements = [];
  for (const element of blockElements) {
    const visible = isVisible(element);
    if (
      visible &&
      (element.dataset.wtdlUid === undefined ||
        element.dataset.wtdlTranslated === "false")
    ) {
      visibleElements.push({ element, text: element.innerHTML });
    }
  }

  return visibleElements;
}

function splitElements(elements, storage) {
  for (const element of elements) {
    if (
      element.nodeName !== "STYLE" &&
      element.nodeName !== "META" &&
      element.nodeName !== "LINK" &&
      element.nodeName !== "SCRIPT" &&
      element.nodeName !== "svg" &&
      (hasTextNode(element) || hasInlineElement(element)) &&
      element.clientTop < window.innerHeight
    ) {
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

  document.body.insertAdjacentHTML(
    "beforeend",
    `<translate-toast id="${id}"></translate-toast>`
  );
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

  document.body.insertAdjacentHTML(
    "beforeend",
    `<translate-popover id="${id}"></translate-popover>`
  );
  const popover = document.getElementById(id);
  popover.setAttribute("position", JSON.stringify(position));

  const onClick = (event) => {
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
  popover.addEventListener("change", async (event) => {
    if (!event.detail) {
      return;
    }
    await browser.storage.local.set({
      selectedSourceLanguage: undefined,
      selectedTargetLanguage: event.detail.selectedTargetLanguage,
    });

    const request = {
      method: "translateSelection",
      selectionText: undefined,
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
