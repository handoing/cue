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
      '@': path.resolve(__dirname, '../packages'),
      'cue': path.resolve(__dirname, '../dist')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'CUE',
      template: path.resolve(__dirname, './index.html')
    })
  ]
}