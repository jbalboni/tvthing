const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const dotenv = require('dotenv');

dotenv.load();

module.exports = {
  entry: './web/static/js/index.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'priv/static/js')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        enforce: 'pre',
        test: /\.js(x)$/,
        loader: 'source-map-loader'
      },
      {
        test: /\.js(x)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('../css/[name].css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        AUTH0_APP_ID: JSON.stringify(process.env.AUTH0_APP_ID),
        AUTH0_BASEURL: JSON.stringify(process.env.AUTH0_BASEURL)
      }
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: 'cheap-module-eval-source-map'
};
