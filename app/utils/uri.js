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
  let values = Object.values(IRREGULAR_HASH);
  let index = values.indexOf(name);

  if (index > -1) {
    let uri = Object.keys(IRREGULAR_HASH)[index];

    return uri;
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
