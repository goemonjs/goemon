var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PRODUCT = JSON.parse(process.env.PROD_ENV || '0');

var targetPath = './built';

var config = [
  {
    name: 'React Client Package',
    entry: {
      'simple-sample' : './src/client/simple-sample',
      'redux-sample' : './src/client/redux-sample',
      'auth-sample' : './src/client/auth-sample'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(targetPath + '/src/public/js')
    },
    devtool: 'source-map',
    debug: true,
    module: {
        loaders: [
        { test: /\.ts(x?)$/, loader: 'babel-loader!ts-loader' },
        { test: /\.js(x?)$/, loader: 'babel-loader', exclude: /node_modules/, query: { presets: ['es2015', 'react'] } },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
        { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        modulesDirectories: ['node_modules', 'components'],
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: ( PRODUCT == 'production' ) ? [
        new webpack.optimize.UglifyJsPlugin({
          compress: { warnings: false }
        }),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ] : [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ]
  }
];

module.exports = config;
