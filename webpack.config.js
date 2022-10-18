const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' },
    hot: true, 
    host: 'localhost',
    port: 8080,
    historyApiFallback: true, 
    proxy: {
      '/api': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
    static: {
      publicPath: '/',
      directory: path.resolve(__dirname, 'build'),
    },
  },
};