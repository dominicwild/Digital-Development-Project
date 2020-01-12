function randInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

/**
 * Takes a list as input and ensures the list is a set, that has no repeating values. It will output the list as a set, if it is not already.
 */
function ensureSet(list) {
    return Array.from(new Set(list))
}

/**
 * A convenience function to turn a potentially undefined object into an empty string.
 * @param {any} object Any object needed to echo to a string
 */
function e(object){
  return object === undefined ? "" : object
}

module.exports = { randInt, ensureSet,e };
