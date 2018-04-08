const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
const { CheckerPlugin } = require('awesome-typescript-loader')

const PRODUCT = JSON.parse(process.env.PROD_ENV || '0');
const targetPath = __dirname + '/built';

const config = [
  {
    name: 'React Client Package',
    entry: {
      'simple-sample' : './src/client/simple-sample',
      'redux-sample' : './src/client/redux-sample',
      'auth-sample' : './src/client/auth-sample'
    },
    // watch: true,
    output: {
      filename: '[name].js',
      path: path.resolve(targetPath + '/src/public/js')
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    watch: true,
    mode: 'development',
    module: {
      rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') },
        { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" }
        ]
    },
    resolve: {
        // modulesDirectories: ['node_modules', 'components'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        // new webpack.NoErrorsPlugin(),
        new CheckerPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      // "react": "React",
      // "react-dom": "ReactDOM"
    },
  }
];

module.exports = config;
