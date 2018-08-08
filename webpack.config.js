const isProduction = process.env.NODE_ENV === 'production'
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: {
    app: './src/index.tsx'
  },
  output: {
    filename: 'js/[name]_bundle.js',
    chunkFilename: 'js/[name]_bundle.js',
    path: path.resolve(__dirname, './build/dist/'),
    publicPath: '/dist/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000, // 模块大于30k会被抽离到公共模块
      minChunks: 1, // 模块出现1次就会被抽离到公共模块
      maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
      maxInitialRequests: 3, // 入口模块最多只能加载3个
      name: true,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  devtool: isProduction ? false : 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './public'),
    compress: true,
    host: 'localhost',
    port: 8080,
    publicPath: '/dist/',
    hot: true,
    open: true,
    progress: true,
    inline: true,
    historyApiFallback: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: 'https://randomuser.me',
        secure: false,
        changeOrigin: true
      },
      '/gank': {
        target: 'http://gank.io',
        pathRewrite: {'/gank': ''},
        changeOrigin: true
      },
      '/books': {
        target: 'http://47.95.247.139:5000',
        changeOrigin: true
      }
    }
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'config.js', '.json'],
    alias: {
      '@compontent': path.resolve(__dirname, '../../compontent')
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader'
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          // 'babel-loader'
          'happypack/loader?id=babel'
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // exclude: /node_modules/,
        // include: path.join(__dirname, '/node_modules/antd'),
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          // 'css-loader?importLoaders=1&localIdentName=[local]_[hash:base64:6]',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[local]_[hash:base64:6]',
              minimize: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: !isProduction,
              ident: 'postcss'
              // plugins: () => [require('autoprefixer')({
              //   'browsers': ['> 1%', 'last 2 versions']
              // })]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !isProduction
            }
          }]
      },
      {
        test: /\.(png|jpg|gif|svg|ttf|eot|ico|cur|woff(2)?)(\?[=a-z0-9]+)?$/,
        // use: 'url-loader?limit=1000&name=dist/images/[hash:6].[ext]'
        use: [{
          loader: 'url-loader',
          options: {
            limit: 1 * 1024,
            name: 'dist/images/[hash:6].[ext]',
            fallback: 'file-loader'
          }
        }]
      },
      // {
      //   test: /\.woff(2)$/,
      //   use: 'url-loader?limit=10000&name=fonts/[hash].[ext]&mimetype=application/font-woff'
      // },
      {
        test: /\.(ttf|eot|otf)(\?[\s\S]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:6].[ext]',
            outputPath: 'fonts/',
            publicPath: 'dist'
          }
        }]
      }
    ]
  },
  target: 'web',
  plugins: [
    new ProgressBarPlugin({
      format: 'build [:bar] :percent (:elapsed seconds)',
      clear: false,
      width: 60
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new MiniCssExtractPlugin({
      filename: 'style/[name].css'
    }),
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8889,
        reportFilename: 'report.html',
        defaultSizes: 'parsed',
        openAnalyzer: true,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null,
        logLevel: 'info'
      })
  ].concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin()
  ] : [
    new CleanWebpackPlugin('./build'),
    new WebpackParallelUglifyPlugin({
      uglifyJS: {
        mangle: false,
        output: {
          beautify: false,
          comments: false
        },
        compress: {
          warnings: false,
          drop_console: true,
          collapse_vars: true,
          reduce_vars: true
        }
      }
    }),
    new HappyPack({
      id: 'babel',
      threads: 4,
      loaders: ['babel-loader']
    }),
    new HtmlWebpackPlugin({
      title: 'Summit Web',
      hash: true,
      filename: '../index.html',
      template: './public/template.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      chunksSortMode: 'none',
      cache: true
    })
  ])
}
