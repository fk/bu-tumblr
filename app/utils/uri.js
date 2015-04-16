"use strict";

function capitalize (word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

const IRREGULAR_HASH = {
  "christian-debotton": "Christian de Botton",
  "lindsay-devellis": "Lindsay DeVellis",
  "colleen-orourke": "Collen O'Rourke"
};

export let nameToURI = (name) => {
  let index = Object.values(IRREGULAR_HASH).indexOf(name);

  if (index > -1) {
    return IRREGULAR_HASH[index];
  }

  return name.toLowerCase().replace(/\s/g, "-");
};

export let uriToName = (uri) => {
  if (!uri) return "";

  if (IRREGULAR_HASH[uri]) {
    return IRREGULAR_HASH[uri];
  }

  return uri.split("-")
    .map(capitalize)
    .join(" ");
};
