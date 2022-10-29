"use strict";

import { Popover } from "./popover";
import { Toast } from "./toast";

function setup() {
  if (!window.customElements.get("translate-toast")) {
    window.customElements.define("translate-toast", Toast);
  }
  if (!window.customElements.get("translate-popover")) {
    window.customElements.define("translate-popover", Popover);
  }
}

setup();
