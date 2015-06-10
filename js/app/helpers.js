// vi: ts=4 sw=4 expandtab

// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}
