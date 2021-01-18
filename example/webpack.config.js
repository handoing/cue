const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './index.js'),
  devServer: {
    port: 3333,
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
        loader: require.resolve('../loader/cue-loader.js'),
        options: {},
      }
    ],
  },
  resolve: {
    alias: {
      'cue': path.resolve(__dirname, '../')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CUE',
      template: path.resolve(__dirname, './index.html')
    })
  ]
}