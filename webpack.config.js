var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './react_components/main.jsx',
  output: {
    path: './public/scripts',
    filename: 'main.js'
  },
  module: {
    loaders: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.json$/,
            loader: 'json'
        },
        {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader',
        },
        {
            test: /\.css$/,
            loader: 'style-loader!css-loader!sass-loader',
        }
    ]
  },
  modulesDirectories: ['node_modules'],
  // externals: {
  //   'react': 'React'
  // },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
      port: 3000
  }
};
