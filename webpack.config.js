var path = require('path')
var webpack = require('webpack')
// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var envConfig = TARGET === 'start' ? require('./webpack.dev.config') : require('./webpack.build.config')
var merge = require('webpack-merge');
var APP_PATH = path.join(__dirname, '/src')

module.exports = merge({
    entry: path.join(APP_PATH, 'index.js')
}, envConfig)