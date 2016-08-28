var path = require('path'),
  webpack = require('webpack');

var src = path.resolve(__dirname, '../src'); // 源码目录
var commonPath = {
  dist: path.resolve(__dirname, '../dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.resolve(__dirname, '../static') // 无需处理的静态资源目录
};

module.exports = {
  commonPath: commonPath,
  entry: {
    app: path.join(src, 'app.js'),

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
      'redux-thunk'
      // 'superagent'
    ]
  },
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      // ================================
      // 自定义路径别名
      // ================================
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ROUTE: path.join(src, 'routes'),
      SERVICE: path.join(src, 'services'),
      UTIL: path.join(src, 'utils'),
      HOC: path.join(src, 'utils/HoC'),
      MIXIN: path.join(src, 'utils/mixins'),
      VIEW: path.join(src, 'views')
    }
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      include: src,
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
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      // ================================
      // 配置开发全局常量
      // ================================
      __DEV__: process.env.NODE_ENV.trim() === 'development',
      __PROD__: process.env.NODE_ENV.trim() === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
    })
  ]
};
