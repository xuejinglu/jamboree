var webpack = require('webpack');

module.exports = {
  entry: "./src/App.js",
  output: {
    path: __dirname + '/public',
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin()
  ]
};
