const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const cueSourcePath = path.resolve(__dirname, '../packages/cue/index.js')
const cueBundlePath = path.resolve(__dirname, '../packages/cue')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  devServer: {
    port: 3360,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.tpl$/i,
        loader: require.resolve('./loader/cue-loader.js'),
        options: {},
      }
    ],
  },
  resolve: {
    alias: {
      'cue': cueSourcePath
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CUE',
      template: path.resolve(__dirname, './index.html')
    })
  ]
}
