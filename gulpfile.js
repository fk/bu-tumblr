"use strict";

var pruno = require('pruno');

pruno(function(mix) {
  mix
    .configure({dir: __dirname + '/config'})
    .del()
    .eslint()
    .publish()
    .stylus()
    .webpack()
    .http();
});
