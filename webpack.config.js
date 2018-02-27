var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

//dev
let config = null;
if (TARGET === 'dev') {
    // dev 
    // 不生成 css（或者说不使用extract-text-webpack-plugin），js代码不被压缩
    config = {
        entry: `${APP_PATH}/index.js`,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' }
                    ]
                }
            ]
        }
    };
}

if (TARGET === 'build') {
    // build
    // 生成代码有 css，并且代码js代码被压缩
    config = {
        entry: `${APP_PATH}/index.js`,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css-loader']
                    })
                }
            ]
        },
        plugins: [
            new ExtractTextPlugin({ filename: '[name].css' }),
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
        ]
    }
};

module.exports = config;
