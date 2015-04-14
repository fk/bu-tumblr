"use strict";

function noop() {}

let ID_COUNTER = 0;

function makeUrl(url, params) {
  if (params) {
    return url + "?" + Object.keys(params).reduce((memo, param) => {
      let underscored = param.replace(/([a-z])([A-Z])/, (m, p1, p2) => {
        return `${p1}_${p2.toLowerCase()}`;
      });

      memo += `&${underscored}=${encodeURIComponent(params[param])}`;
      return memo;
    }, "");
  }
  else {
    return url;
  }
}

function cleanup(script, _id) {
  if (script.parentNode) script.parentNode.removeChild(script);
  window[_id] = noop;
}

function cancel(script, _id) {
  if (window[_id]) cleanup(script, _id);
}

function request(url, params) {
  let _id = `jsonp${++ID_COUNTER}`;
  let callbackUrl = `${url}&callback=${_id}`;

  return new Promise((resolve, reject) => {
    try {
      let script;
      let target = document.getElementsByTagName("script")[0] || document.head;

      window[_id] = function (data){
        cleanup(script, _id);
        resolve(data);
      };

      script = document.createElement("script");
      script.src = callbackUrl;
      script.async = true;
      target.parentNode.insertBefore(script, target);
    }
    catch (err) {
      let http = require("http");
      http.get(url, function(res) {
        let body = "";

        res.on("data", function(chunk) {
          body += chunk;
        });

        res.on("end", function() {
          try {
            let json = JSON.parse(body);
            resolve(json);
          }
          catch (err) {
            reject(err);
          }
        });
      });
    }
  });
}

export default async function jsonp(resource, params) {
  let url = makeUrl(resource, params);
  let result = await request(url, params);

  return result;
};
