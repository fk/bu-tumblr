"use strict";

function capitalize (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export let nameToURI = (name) => {
  return name.toLowerCase().replace(/\s/g, "-");
};

export let uriToName = (uri) => {
  if (!uri) return "";

  return uri.split("-")
    .map(capitalize)
    .join(" ");
};
