var path = require('path');

var autoprefixer = require('autoprefixer-core');
var cssgrace = require('cssgrace');

var webpack = require('webpack');
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");


module.exports = {
    entry: {
        app: ['./lib/app']
        // markdown: ['./index']
    },
    output: {
        path: path.join(__dirname, 'lib') ,
        filename: "bundle.js",
        // 打包好的文件 作为静态资源的基础路径
        publicPath: '/lib/'
    },
    plugins: [
        // new CommonsChunkPlugin("share.js"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            { test: /\.less$/, loaders: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'] },
            { test: /\.js$/, loaders: ['react-hot', 'jsx?harmony'] }
        ]
    },
    postcss: [autoprefixer, cssgrace],
    // postcss: [autoPrefixer],
    // react模块使用全局变量 不需要再打包起来
    externals: {
        // react: 'React'
    }
}
 