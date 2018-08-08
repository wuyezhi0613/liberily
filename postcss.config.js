const isProduction = process.argv.indexOf('production') > 0

const config = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
      extensions: ['pcss', 'css']
    }),
    require('autoprefixer')(),
    require('precss')()
  ]
}

if (isProduction) {
  config.plugins.push(require('cssnano')({ preset: 'default' }))
} else {
  // reduces calc(10px * 2) to 20px
  config.plugins.push(require('postcss-calc')())
}

module.exports = config
