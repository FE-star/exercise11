var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

// 判断是否是生产环境
var isBuild = process.env.NODE_ENV  === 'production';
var cssDev = ['style-loader', 'css-loader']; // 开发环境css配置
var cssBuild = ExtractTextPlugin.extract({
	fallback: 'style-loader',
	use: 'css-loader'
});

var plugins = [
	new ExtractTextPlugin({
		disable: !isBuild,
		filename: "[name].css",
		allChunks: true
	}),
]
isBuild ? plugins.push(new UglifyJsPlugin()) : '';
var cssConfig = isBuild ? cssBuild : cssDev

module.exports = {
	entry: APP_PATH,
	output: {
		path: __dirname +'/dist',
		filename: '[name].js'
  },
	module: {
		rules: [{
			test: /\.css$/i,
			use: cssConfig,
		}]
	},
	plugins: plugins
}