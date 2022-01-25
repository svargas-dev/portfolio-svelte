const postcssPresetEnv  = require('postcss-preset-env')

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    }),
    require('postcss-flexbugs-fixes'),
    require('cssnano')({
      preset: 'default'
    })
  ]
};
