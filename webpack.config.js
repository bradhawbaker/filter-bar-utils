var webpack = require('webpack');
var path = require('path');
var PATHS = {
  SRC: path.resolve(__dirname, '.'),
  TARGET: path.resolve(__dirname, 'dist')
};

var config = {
  entry: {
    filter_bar_utils_bundle: [
      './index.js'
    ]
    },
    output: {
      path: PATHS.TARGET,
      filename: '[name].js',
      library: 'filter-bar-utils',
      libraryTarget: 'umd',
      sourceMapFilename: '[name].js.map'
    },
    resolve: {
      root: [path.resolve('.')]
    },
    eslint: {
      failOnWarning: false,
      failOnError: true,
      configFile: '.eslintrc'
    },
    devtool: 'source-map',
    module: {
        preLoaders: [
            {test: /\.(js|jsx)$/, loader: 'source-map-loader'}
        ],
        loaders: [
            {test: /\.(js|jsx)$/, loaders: ['babel-loader', 'eslint-loader'], exclude: /node_modules/},
            {test: /\.json$/, loaders: ['json']}
        ]
    },
    plugins: [
      new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			  }),
			new webpack.optimize.DedupePlugin(),
			new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ]
};

module.exports = config;