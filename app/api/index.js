"use strict";

import koa from "koa";
import { join } from "path";
import React from "react";
import compress from "koa-compress";
import serveStatic from "koa-static";
import bodyparser from "koa-bodyparser";
import favicon from "koa-favicon";
import render from "./render";

const ENV = process.env.NODE_ENV || "development";
const DEV = ENV === "development";
const PORT = process.env.PORT || 3000;

let app = koa();

app.use(compress());
app.use(bodyparser());
app.use(favicon(join(__dirname, "../../public/favicon.ico")));
app.use(serveStatic(join(__dirname, "../../public")));
app.use(render());

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  else if (DEV) {
    console.log(`Server running at http://localhost:${PORT}`);
  }
});
