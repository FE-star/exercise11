var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var uglify = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

// 默认配置
var pluginsConfig = [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(),
    new CleanWebpackPlugin(['dist'])
];
var cssRuleUse = [
    { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: {
        modules: true
      }
    }
];
// build 配置
if (TARGET === 'build') {
    // css独立打包
    cssRuleUse = ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader'
    })
    pluginsConfig = pluginsConfig.concat([
        new ExtractTextPlugin('main.[hash].css'),
        new uglify() // js代码压缩
    ])
}

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssRuleUse
            }
        ]
    },
    plugins: pluginsConfig
}
