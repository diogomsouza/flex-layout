const glob = require('glob');
const purgecss = require('purgecss-webpack-plugin');

/*

skippedContentGlobs: ['node_modules/**', 'components/**']
Here, PurgeCSS will not scan anything in the "node_modules" and "components" folders.

*/

module.exports = {
  plugins: [
    new purgecss(
      {
        paths: glob.sync('./src/**/*', { nodir: true }),
        skippedContentGlobs: [],
        extractors: [
          {
            extractor: (content) => content.match(/[A-Za-z0-9-_:%\/]+/g) || [],
            extensions: ['html'],
          }
        ],
        safelist: {
          standard: [/^ql-/, /^::-webkit/],
          deep: [/^cdk-/, /^mat-/, /^ng-/],
          greedy: [/fxLayout/, /fxFlex/]
        }
      })
  ]
};
