const StyleDictionary = require('style-dictionary');
const version = require('../package.json').version;
const { colorTransform } = require('../hooks/transform');
require('../hooks/format');

const options = {
  outputReferences: true,
  fileHeader: () => {
    return [`SDesign Theme`, `Build Version ${version}`];
  }
};

const baseConfig = (brand = 'blue') => {
  return {
    source: [
      `tokens/brand/${brand}.json`,
      `tokens/color/*.json`,
      `tokens/font/color.json`,
      `tokens/font/size.json`,
      `tokens/font/line-height.json`,
      `tokens/font/weight.json`,
      `tokens/radius/*.json`,
      `tokens/shadow/*.json`,
      `tokens/spacing/*.json`,
      `tokens/alpha.json`
    ],
    transform: {
      colorTransform: {
        type: `value`,
        // only transforms that have transitive: true will be applied to tokens
        // that alias/reference other tokens
        transitive: true,
        matcher: (token) =>
          token.attributes.category === 'color' && token.modify,
        transformer: colorTransform
      },
      'color/css': Object.assign({}, StyleDictionary.transform[`color/css`], {
        transitive: false
      })
    },
    platforms: {
      css: {
        transformGroup: 'css',
        transforms: [
          `attribute/cti`,
          `name/cti/kebab`,
          `colorTransform`,
          `color/css`
        ],
        buildPath: 'src/css/',
        prefix: 'sdesign',
        files: [
          {
            destination: `_${brand}_variables.css`,
            format: 'custom/format/css'
          },
          {
            destination: `brand/_${brand}.css`,
            format: `custom/format/css`,
            filter: {
              attributes: {
                category: 'color',
                type: 'brand'
              }
            },
            options: {
              selector: 'html[data-theme="' + brand + '"]'
            }
          }
        ],
        options
      },
      scss: {
        transformGroup: 'scss',
        transforms: [
          `attribute/cti`,
          `name/cti/kebab`,
          `colorTransform`,
          `color/css`
        ],
        buildPath: 'src/scss/',
        prefix: 'sdesign',
        files: [
          {
            destination: `_${brand}_variables.scss`,
            format: 'custom/format/scss'
          },
          {
            destination: `brand/_${brand}.scss`,
            format: `custom/format/scss`,
            filter: {
              attributes: {
                category: 'color',
                type: 'brand'
              }
            }
          }
        ],
        options
      },
      less: {
        transformGroup: 'less',
        transforms: [
          `attribute/cti`,
          `name/cti/kebab`,
          `colorTransform`,
          `color/css`
        ],
        buildPath: 'src/less/',
        prefix: 'sdesign',
        files: [
          {
            destination: `_${brand}_variables.less`,
            format: 'custom/format/less'
          },
          {
            destination: `brand/_${brand}.less`,
            format: `custom/format/less`,
            filter: {
              attributes: {
                category: 'color',
                type: 'brand'
              }
            }
          }
        ],
        options
      }
    }
  };
};
module.exports = baseConfig;
