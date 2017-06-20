var path = require('path'),
    webpack = require('webpack'),
    NyanProgressPlugin = require('nyan-progress-webpack-plugin');

var rootPath = path.resolve(__dirname, '..'), // 项目根目录
    src = path.join(rootPath, 'src'), // 开发源码目录
    env = process.env.NODE_ENV.trim(); // 当前环境
var commonPath = {
    rootPath: rootPath,
    dist: path.join(rootPath, 'dist'), // build 后输出目录
    indexHTML: path.join(src, 'index.html'), // 入口基页
    staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};

var configBase = {
    context: rootPath,
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
        ]
    },
    output: {
        path: path.join(commonPath.dist, 'static'),
        publicPath: '/static/'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            // ================================
            // 自定义路径别名
            // ================================
            ASSET: path.join(src, 'assets'),
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: (function () {
                    var _loaders = ['babel-loader?' + JSON.stringify({
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
                    }), {
                            loader: 'eslint-loader',
                            options: {
                                formatter: require('eslint-friendly-formatter')   // 编译后错误报告格式
                            }
                        }
                    ];

                    // 开发环境下引入 React Hot Loader
                    if (env === 'development') {
                        _loaders.unshift('react-hot-loader');
                    }
                    return _loaders;
                })(),
                include: src,
                exclude: /node_modules/,
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }, {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'url',
                query: {
                    limit: 10240, // 10KB 以下使用 base64
                    name: 'img/[name]-[hash:6].[ext]'
                }
            }, {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
            }]
    },
    plugins: [
        new NyanProgressPlugin(), // 进度条
        new webpack.DefinePlugin({
            'process.env': { // 这是给 React / Redux 打包用的
                NODE_ENV: JSON.stringify('production')
            },
            // ================================
            // 配置开发全局常量
            // ================================
            __DEV__: env === 'development',
            __PROD__: env === 'production',
            __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
            __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
        })
    ]
};

module.exports = {
    commonPath: commonPath,
    configBase: configBase
}