var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')

// 根据TARGET不同设置plugin设置
var uglify = new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}});
var setPlugins = [];
if (TARGET === 'build') {
	setPlugins = [
		new ExtractTextPlugin('./[name].css'),
		uglify
	]
}else if (TARGET === 'dev'){
	setPlugins = [
		new ExtractTextPlugin({disable: true})
	]
}

const config = {
	entry:  path.join(APP_PATH, '/index.js'),
	output:{
		path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
	},
	module: {
    	rules: [
      		{ 
      			test: /\.css$/, 
      			use: ExtractTextPlugin.extract({
          			fallback: "style-loader",
          			use: "css-loader" 
        		})
      		}
    	]
    },
    plugins: setPlugins
}

module.exports = config;