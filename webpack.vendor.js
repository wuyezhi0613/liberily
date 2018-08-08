const isProduction = process.argv.indexOf('production') > 0
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const targetContent = isProduction ? 'build' : 'public'

module.exports = {
  mode: 'production',
  entry: {
    vendor: [
      'antd',
      'antd/dist/antd.css'
    ]
  },
  output: {
    path: path.join(__dirname, targetContent, 'dist'),
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      { test: /\.(png|woff|woff2|eot|ttf|gif|svg)(\?|$)/, loader: 'url-loader?limit=100000&name=[hash:6].[ext]' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin('./build'),
    new webpack.DllPlugin({
      path: path.join(__dirname, targetContent, 'dist', '[name]-manifest.json'),
      name: '[name]_[hash]'
    })
  ]
}
