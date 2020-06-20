const mergeConfig = require('webpack-merge');
const webpack = require('webpack');
const baseConfig = require('./webapck.base');

const devConfig = {
  mode: 'production',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: './dist',
    hot: true,
    stats: 'errors-only',
  },
  devtool: 'cheap-source-map',
};

module.exports = mergeConfig(baseConfig, devConfig);
