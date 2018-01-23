const path = require('path');

const DIST_DIR   = path.join(__dirname, "dist");
const SRC_DIR = path.join(__dirname, "src");

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
        loaders: ['css-loader', 'style-loader'],
        test: /\.css$/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: DIST_DIR
  }
};
