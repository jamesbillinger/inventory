var path = require('path');
var webpack = require('webpack');

var include = [
  path.resolve(__dirname, '../shared/config.json'),
  path.resolve(__dirname, 'app'),
  path.resolve(__dirname, '../public/fonts'),
  path.resolve(__dirname, '../public/images')
];

var cssInclude = [
  path.resolve(__dirname, '../public/fonts'),
  path.resolve(__dirname, '../public/styles'),
  path.resolve(__dirname, 'node_modules/react-select'),
  path.resolve(__dirname, 'node_modules/react-virtualized')
];

module.exports = {
  mode: 'production',
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    'app/index.js'
  ],
  output: {
    path: path.join(__dirname, '../public'),
    publicPath: '/',
    filename: 'app.js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      public: path.resolve(__dirname, '../public'),
      shared: path.resolve(__dirname, '../shared'),
      files: path.resolve(__dirname, 'files'),
      components: path.resolve(__dirname, 'app/components'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'),
      path.resolve(__dirname, 'app')
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$|\.es6$|\.babel$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'app')],
        query: {
          cacheDirectory:'./webpack_cache/',
          presets: ['env', 'react', 'stage-0']
        }
      },
      { test: /\.css?$/, loader: 'style-loader!css-loader', include: cssInclude },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', include: include },
      { test: /\.(gif|png|jpg)$/, loader: 'url-loader?mimetype=image/png', include: include }
    ]
  },
  node: {
    fs: 'empty'
  }
};