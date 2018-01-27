const path = require('path');

const DIST_DIR   = path.join(__dirname, "/client/dist");
const SRC_DIR = path.join(__dirname, "client/src");

module.exports = {
  context: SRC_DIR,
  entry: './app',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        loaders: [
          'style-loader',
          'css-loader'
        ],
        test: /\.css$/
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        // exclude: /node_modules/
      },
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: DIST_DIR
  }
};
