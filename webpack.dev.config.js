var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')


module.exports = {
    entry: APP_PATH,
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader','css-loader'],
        }]
    },
    // plugins: [
	// 	new ExtractTextPlugin({
	// 		filename: "style.css",
	// 		allChunks: true
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //           warnings: false
    //         }
    //     })
	// ]
}