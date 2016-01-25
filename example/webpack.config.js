/* eslint-disable no-var */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var jsLoader = 'babel'
var sassLoader = [
  'css?modules&importLoaders=2&sourceMap&localIdentName=select--[name]--[local]__[hash:base64:5]',
  'postcss?browsers=last 2 version',
  'sass'
]

module.exports = {

  devtool: 'inline-source-map',

  entry: __dirname + '/app.js',

  output: {
    path: __dirname + '/__build__',
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoader
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', sassLoader)
      }
    ]
  },

  resolve: {
    alias: {
      'react-responsive-select': path.join(__dirname, '../modules')
    }
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]

}
