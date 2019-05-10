var Webpack = require('webpack');
var Path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
// var CheckerPlugin = require('awesome-typescript-loader')

var TARGET_PATH = __dirname + '/build';

var config = {
  dev: {
    name: 'React Client Package',
    entry: {
      'guest': './src/client/guest',
      'member': './src/client/member',
      'admin': './src/client/admin'
    },
    // watch: true,
    output: {
      filename: '[name].js',
      path: Path.resolve(TARGET_PATH + '/src/public/js')
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: 'source-map',
    watch: true,
    mode: 'development',
    module: {
      rules: [{
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }, {
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        // { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }, {
        test: /\.svg$/,
        loader: "url-loader?limit=10000&mimetype=image/svg+xml"
      }]
    },
    resolve: {
      // modulesDirectories: ['node_modules', 'components'],
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      // new webpack.NoErrorsPlugin(),
      // new CheckerPlugin(),
    ],
    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
      // "react": "React",
      // "react-dom": "ReactDOM"
    },
  },
  //
  // Production Setting
  //
  production: {
    name: 'React Client Package',
    entry: {
      'guest': ['@babel/polyfill', './src/polyfills.js', './src/client/guest'],
      'member': ['@babel/polyfill', './src/polyfills.js', './src/client/member'],
      'admin': ['@babel/polyfill', './src/polyfills.js', './src/client/admin'],
    },
    // watch: true,
    output: {
      filename: '[name].js',
      path: Path.resolve(TARGET_PATH + '/src/public/js')
    },
    // Enable sourcemaps for debugging webpack's output.
    watch: false,
    mode: 'production',
    module: {
      rules: [{
          test: /\.tsx?$/,
          loader: "awesome-typescript-loader"
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ]
        }, {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }],
          // exclude: [
          //   Path.resolve(__dirname, './node_modules'),
          //   Path.resolve(__dirname, './node_modules/@material-ui/'),
          //   Path.resolve(__dirname, './node_modules/lodash/'),
          //   Path.resolve(__dirname, './node_modules/react'),
          //   Path.resolve(__dirname, './node_modules/jss'),
          //   Path.resolve(__dirname, './node_modules/css-vendor'),
          //   Path.resolve(__dirname, './node_modules/react-text-mask'),
          // ]
          exclude: {
            include: Path.resolve(__dirname, './node_modules/'),
            exclude: [
              Path.resolve(__dirname, './node_modules/aws-appsync/'),
              Path.resolve(__dirname, './node_modules/query-string/')
            ]
          },
        }
      ]
    },
    resolve: {
      // modulesDirectories: ['node_modules', 'components'],
      extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
      modules: [
        Path.resolve(__dirname, 'src'),
        'node_modules'
      ]
    },
    plugins: [
      new Webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
      // new webpack.NoErrorsPlugin(),
      // new MiniCssExtractPlugin({
      //   filename: "[name].css",
      //   chunkFilename: "[id].css"
      // }),
      // new ExtractTextPlugin({
      //   filename: 'hoge-style.css',
      //   allChunks: true
      // }),
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
};

module.exports = config;
