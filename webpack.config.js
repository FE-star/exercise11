var path = require('path')
var webpack = require('webpack')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

module.exports = {
    entry: path.resolve(APP_PATH, './index.js'),
    mode: TARGET === 'build' ? 'production' : 'development',
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }],
    },
}