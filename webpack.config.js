const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'index_bundle.js'
  },
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
        loader: require.resolve('./loader/compile.js'),
        options: {},
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
}