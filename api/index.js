"use strict";

import koa from "koa";
import { join } from "path";
import alt from "../app/alt";
import routes from "../app/routes";
import compress from "koa-compress";
import serveStatic from "koa-static";
import isomorphic from "koa-isomorphic";
import bodyparser from "koa-bodyparser";

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PORT = process.env.PORT || 3000;

var app = koa();

app.use(compress());
app.use(bodyparser());
app.use(serveStatic(join(__dirname, 'public')));
app.use(isomorphic({ routes, alt }));

app.listen(PORT, () => {
  if (DEV) {
    console.log(`Server running at http://localhost:${PORT}`)
  }
});
