"use strict";

import Alt from "alt";

const alt = new Alt();
const { BROWSER, NODE_ENV } = process.env;

if (NODE_ENV === "development" && BROWSER) {
  Alt.debug("alt", alt);
}

export default alt;
