const chroma = require('chroma-js');

const colorTransform = (token) => {
  const { value, modify = [] } = token;
  let color = chroma(value);

  // iterate over the modify array (see tokens/color.json)
  // and apply each modification in order
  modify.forEach(({ type, amount }) => {
    // modifier type must match a method name in chromajs
    // https://gka.github.io/chroma.js/
    // chroma methods can be chained, so each time we override the color variable
    // we can still call other chroma methods, similar to
    // chroma(value).brighten(1).darken(1).hex();
    color = color[type](amount);
  });
  return color.css();
};

module.exports = { colorTransform };
