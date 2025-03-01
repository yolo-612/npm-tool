const StyleDictionary = require('style-dictionary');
const { fileHeader } = StyleDictionary.formatHelpers;
const createPropertyFormatter = require('./createPropertyFormatter');

const formatting = {};
const themeable = false;

/**
 * css format
 */
StyleDictionary.registerFormat({
  name: 'custom/format/css',
  formatter: function ({ dictionary, options = {}, file }) {
    const selector = options.selector ? options.selector : `:root`;
    const outputReferences = options.outputReferences || false;
    const format = 'css';

    return (
      fileHeader({ file }) +
      `${selector} {\n` +
      dictionary.allProperties
        .map(
          createPropertyFormatter({
            outputReferences,
            dictionary,
            format,
            formatting,
            themeable
          })
        )
        .join('\n') +
      `\n}\n`
    );
  }
});

/**
 * scss format
 */
StyleDictionary.registerFormat({
  name: 'custom/format/scss',
  formatter: function ({ dictionary, options = {}, file }) {
    const outputReferences = options.outputReferences || false;
    const format = 'sass';
    return (
      fileHeader({ file }) +
      dictionary.allProperties
        .map(
          createPropertyFormatter({
            outputReferences,
            dictionary,
            format,
            formatting,
            themeable
          })
        )
        .join('\n')
    );
  }
});

/**
 * less format
 */
StyleDictionary.registerFormat({
  name: 'custom/format/less',
  formatter: function ({ dictionary, options = {}, file }) {
    const outputReferences = options.outputReferences || false;
    const format = 'less';
    return (
      fileHeader({ file }) +
      dictionary.allProperties
        .map(
          createPropertyFormatter({
            outputReferences,
            dictionary,
            format,
            formatting,
            themeable
          })
        )
        .join('\n')
    );
  }
});
