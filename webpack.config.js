var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FlowStatusWebpackPlugin = require('flow-status-webpack-plugin');

module.exports = {
  entry: './web/static/js/index.jsx',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'priv/static/js')
  },
	module: {
		rules: [{
			test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'sass-loader']
      })
		},
		{
		 enforce: 'pre',
		 test: /\.js(x)$/,
		 loader: "source-map-loader"
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
    new ExtractTextPlugin("../css/[name].css"),
    new webpack.NoEmitOnErrorsPlugin(),
    new FlowStatusWebpackPlugin({
      failOnError: true
    })
  ],
  resolve: {
    extensions: ['.jsx', '.js']
  },
  devtool: 'cheap-module-eval-source-map'
}
