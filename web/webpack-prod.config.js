var path = require('path');
var webpack = require('webpack');
var argv = require('yargs');
var AssetsPlugin = require('assets-webpack-plugin');

var include = [
  path.resolve(__dirname, 'config.json'),
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, 'public/images')
];

var cssInclude = [
  path.resolve(__dirname, 'public/theme.css'),
  path.resolve(__dirname, 'node_modules/react-select'),
  path.resolve(__dirname, 'node_modules/react-virtualized'),
  path.resolve(__dirname, 'node_modules/react-datepicker'),
];

var globals = {
  'process.env.NODE_ENV': '"production"',
  'process.env.BABEL_ENV': '"production"',
  NODE_ENV: 'production',
  __DEV__: false,
  __PROD__: true,
  __DEBUG__: false,
  __DEBUG_NW__: false,
  __DEVELOPMENT__: false
};

module.exports = {
  mode: 'production',
  entry: {
    app: ['whatwg-fetch', 'babel-polyfill', './app']
  },
  output: {
    path: path.join(__dirname, '/files/dist'),
    publicPath: '/dist/',
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new AssetsPlugin({
      filename: '/files/dist/assets.json'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      app: path.join(__dirname, '/app'),
      files: '../files',
      components: 'components',
    },
    modules: ['node_modules', path.join(__dirname, '/app')]
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$|\.es6$|\.babel$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'app')],
        query: {
          cacheDirectory:'./webpack_cache/',
          presets: ['env', 'react', 'stage-0'],
          plugins: ['transform-react-constant-elements', 'transform-decorators-legacy']
        }
      },
      { test: /\.css?$/, loader: 'style-loader!css-loader', include: cssInclude },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', include: include },
      //{ test: /\.(eot|svg)/, loader: 'file-loader', include: include },
      { test: /\.(gif|png|jpg)$/, loader: 'url-loader?mimetype=image/png', include: include },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&minetype=application/font-woff',
        include: path.resolve(__dirname, 'public/fonts')
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader?name=[name].[ext]',
        include: path.resolve(__dirname, 'public/fonts')
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};