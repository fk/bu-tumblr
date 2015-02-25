"use strict";

import routes from "./routes";

import {
  create as createRouter,
  HistoryLocation as location
} from "react-router";

export default createRouter({ location, routes });
