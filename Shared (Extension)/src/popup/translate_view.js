"use strict";

import { supportedLanguages } from "./supported_languages";

export class TranslateView extends EventTarget {
  #languageSelectLabel;

  #sourceLanguageSelect;
  #targetLanguageSelect;

  #translateButton;
  #showOriginalButton;

  constructor() {
    super();
    this.#init();
  }

  setSelectedTargetLanguage(language) {
    if (
      language &&
      supportedLanguages.some(
        (supportedLanguage) => supportedLanguage.code === language.toUpperCase()
      )
    ) {
      this.#targetLanguageSelect.value = language;
    }
  }

  setHidden(hidden) {
    document
      .getElementById("translate-view")
      .classList.toggle("d-hide", hidden);
  }

  setLoading(loading) {
    if (loading) {
      this.showInitialView();

      this.#sourceLanguageSelect.disabled = true;
      this.#targetLanguageSelect.disabled = true;
      this.#translateButton.disabled = true;
      this.#translateButton.classList.add("loading");
    } else {
      this.#sourceLanguageSelect.disabled = false;
      this.#targetLanguageSelect.disabled = false;
      this.#translateButton.disabled = false;
      this.#translateButton.classList.remove("loading");
    }
  }

  showInitialView() {
    document.getElementById("initial-view").classList.remove("d-hide");
    document.getElementById("result-view").classList.add("d-hide");
  }

  showResultView(sourceLanguage, targetLanguage) {
    document.getElementById("initial-view").classList.add("d-hide");
    document.getElementById("result-view").classList.remove("d-hide");

    document.getElementById("translation-message").textContent =
      browser.i18n.getMessage("full_page_translation_auto_translate_message");
    document.getElementById("translation-source-lang").textContent =
      browser.i18n.getMessage(
        `supported_languages_${sourceLanguage.toUpperCase()}`
      );
  }

  on(type, listener) {
    this.addEventListener(type, listener);
  }

  #init() {
    this.#languageSelectLabel = document.getElementById(
      "language-select-label"
    );
    this.#languageSelectLabel.textContent = browser.i18n.getMessage(
      "ui_target_language_select"
    );

    this.#sourceLanguageSelect = document.getElementById(
      "source-language-select"
    );
    this.#sourceLanguageSelect.add(
      new Option(browser.i18n.getMessage("ui_source_language_auto"), "auto"),
      undefined,
      true,
      true
    );
    this.#targetLanguageSelect = document.getElementById(
      "target-language-select"
    );
    const locale = browser.i18n
      .getUILanguage()
      .split("-")
      .shift()
      .toUpperCase();
    for (const supportedLanguage of supportedLanguages) {
      const createOption = (code, selected) => {
        return new Option(
          browser.i18n.getMessage(`supported_languages_${code}`),
          code,
          false,
          selected
        );
      };
      const code = supportedLanguage.code;
      this.#sourceLanguageSelect.add(createOption(code, false));
      this.#targetLanguageSelect.add(createOption(code, code === locale));
    }
    this.#sourceLanguageSelect.addEventListener(
      "change",
      this.#onLanguageSelectChange.bind(this)
    );
    this.#targetLanguageSelect.addEventListener(
      "change",
      this.#onLanguageSelectChange.bind(this)
    );

    this.#translateButton = document.getElementById("translate-button");
    this.#translateButton.textContent = browser.i18n.getMessage(
      "full_page_translation_menu_translate_button"
    );
    this.#translateButton.addEventListener("click", (event) => {
      this.#onTranslateButtonClick(event);
      return false;
    });

    this.#showOriginalButton = document.getElementById("show-original-button");
    this.#showOriginalButton.textContent = browser.i18n.getMessage(
      "full_page_translation_show_original"
    );
    this.#showOriginalButton.addEventListener("click", (event) => {
      this.#onShowOriginalButtonClick(event);
      return false;
    });
  }

  #onLanguageSelectChange() {
    this.dispatchEvent(
      new CustomEvent("change", {
        detail: {
          selectedSourceLanguage: undefined,
          selectedTargetLanguage: this.#targetLanguageSelect.value,
        },
      })
    );
  }

  #onTranslateButtonClick() {
    this.dispatchEvent(
      new CustomEvent("translate", {
        detail: {
          sourceLanguage: this.#sourceLanguageSelect.value,
          targetLanguage: this.#targetLanguageSelect.value,
        },
      })
    );
  }

  #onShowOriginalButtonClick() {
    this.dispatchEvent(new CustomEvent("showOriginal"));
  }
}
