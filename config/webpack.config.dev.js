const path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');
module.exports = {
  entry: {
    bundle: ['webpack-hot-middleware/client', helpers.root('src')],
    client: helpers.root('src/index.js'),
  },
  output: {
    path: helpers.root('src'),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'className',
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: 'babel-loader' }],
        exclude: [/\.(spec|e2e)\.js$/],
        enforce: 'pre',
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        include: ['./'],
      },
    ],
  }
};
