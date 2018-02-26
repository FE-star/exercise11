var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CompressionPlugin=require('compression-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

var plugins = []

if(TARGET != 'development'){
	plugins.push(
		new CompressionPlugin(),
		new ExtractTextPlugin('main.css')
	)
}

var config = {
	entry: APP_PATH + '/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: TARGET !='development' ? ExtractTextPlugin.extract({
					fallback: "style-loader",
          			use: "css-loader"
				}) : ['style-loader', 'css-loader']
			}
			
		]
	},
	plugins: plugins
}

module.exports = config;