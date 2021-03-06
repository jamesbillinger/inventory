var path = require('path');
var webpack = require('webpack');
var argv = require('yargs');
var os = require('os');

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
  path.resolve(__dirname, 'node_modules/react-virtualized'),
  path.resolve(__dirname, 'node_modules/react-datepicker/dist/react-datepicker.css')
];

var config = require('../shared/config.json');

var globals = {
  'process.env.NODE_ENV': '"development"',
  'process.env.BABEL_ENV': '"development"',
  //'process.env.LOCAL': '"true"',
  'process.env.LOCAL': process.env.LOCAL,
  NODE_ENV: process.env.NODE_ENV,
  __DEV__: process.env.NODE_ENV === 'development',
  __PROD__: process.env.NODE_ENV === 'production',
  __DEBUG__: process.env.NODE_ENV === 'development' && !argv.no_debug
};
var address;
var intfs = os.networkInterfaces();
if (intfs && intfs.en0 && intfs.en0.length > 0) {
  intfs.en0.map(i => {
    if (!address && i.address && (i.address.startsWith('172.') || i.address.startsWith('10.'))) {
      address = i.address;
    }
  });
}
if (!address) {
  address = '127.0.0.1';
}

module.exports = {
  mode: 'development',
  entry: [
    'whatwg-fetch',
    'babel-polyfill',
    'app/index.js',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://' + address + ':' + config.proxyPort
  ],
  output: {
    path: path.resolve(__dirname, 'files/dist'),
    filename: 'app.js',
    publicPath: 'http://' + address + ':' + config.proxyPort + '/dist/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      app: path.resolve(__dirname, 'app'),
      public: path.resolve(__dirname, '../public'),
      shared: path.resolve(__dirname, '../shared'),
      files: path.resolve(__dirname, 'files'),
      components: path.resolve(__dirname, 'app/components'),
      customers: path.resolve(__dirname, 'app/customers'),
      inventory: path.resolve(__dirname, 'app/inventory'),
      sales: path.resolve(__dirname, 'app/sales'),
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
          presets: ['env', 'react', 'stage-0'],
          plugins: [
            [
              'react-transform',
              {
                transforms: [
                  {
                    transform: 'react-transform-hmr',
                    imports: ['react'],
                    locals: ['module']
                  },
                  {
                    transform: 'react-transform-catch-errors',
                    imports: ['react', 'redbox-react']
                  }
                ]
              }
            ]
          ]
        }
      },
      { test: /\.css?$/, loader: 'style-loader!css-loader', include: cssInclude },
      { test: /\.less$/, loader: 'style-loader!css-loader!less-loader', include: include },
      { test: /\.(gif|png|jpg)$/, loader: 'url-loader?mimetype=image/png', include: include }
    ]
  },
  node: {
    fs: "empty"
  }
};