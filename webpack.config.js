var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var TARGET = process.env.npm_lifecycle_event
 var APP_PATH = path.join(__dirname, '/src')

 const webpackBase = {
    mode: TARGET === 'build' ? 'production' : 'development',
    entry: path.join(APP_PATH, '/index.js'),
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}

const webpackBuild = {
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
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};
const webpackDev = {};

module.exports = Object.assign(webpackBase, TARGET === 'build' ? webpackBuild : webpackDev)