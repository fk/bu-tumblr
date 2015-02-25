"use strict";

import alt from "./alt";
import React from "react";
import router from "./router";

try {
  let { snapshot } = window;
  alt.bootstrap(snapshot);
}
catch (err) {

}

router.run((Handler, state) => {
  React.render(<Handler { ...state } />, document);
});
