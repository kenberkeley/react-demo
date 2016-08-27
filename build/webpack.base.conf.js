var path = require('path'),
  webpack = require('webpack');

var srcPath = path.resolve(__dirname, '../src');

module.exports = {
  entry: {
    app: path.join(srcPath, 'app.js'),

    // ================================
    // 框架 / 类库 分离打包
    // ================================
    vendor: [
      'history',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk',
      'superagent'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      COMPONENT: path.join(srcPath, 'components'),
      ACTION: path.join(srcPath, 'redux/actions'),
      REDUCER: path.join(srcPath, 'redux/reducers'),
      STORE: path.join(srcPath, 'redux/store'),
      ROUTE: path.join(srcPath, 'routes'),
      SERVICE: path.join(srcPath, 'services'),
      UTIL: path.join(srcPath, 'utils'),
      HOC: path.join(srcPath, 'utils/HoC'),
      MIXIN: path.join(srcPath, 'utils/mixins'),
      VIEW: path.join(srcPath, 'views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: srcPath,
      loaders: ['react-hot', 'babel?' + JSON.stringify({
        cacheDirectory: true,
        plugins: [
          'transform-runtime',
          'transform-decorators-legacy'
        ],
        presets: ['es2015', 'react', 'stage-0'],
        env: {
          production: {
            presets: ['react-optimize']
          }
        }
      }), 'eslint']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'css!less'
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10000,
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.(eot|woff|ttf|svg)$/,
      loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'mainifest']
    }),
    new webpack.DefinePlugin({
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: process.env.NODE_ENV === 'development',
      __PROD__: process.env.NODE_ENV === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
    })
  ]
};
