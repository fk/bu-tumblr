"use strict";

import koa from "koa";
import { join } from "path";
import alt from "../alt";
import React from "react";
import cheerio from "cheerio";
import serialize from "serialize-javascript";
import ReactRouter from "react-router";
import routes from "../routes";
import compress from "koa-compress";
import serveStatic from "koa-static";
import bodyparser from "koa-bodyparser";
import render from "./render";

const ENV = process.env.NODE_ENV || "development";
const DEV = ENV === "development";
const PORT = process.env.PORT || 3000;

let app = koa();

app.use(compress());
app.use(bodyparser());
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
