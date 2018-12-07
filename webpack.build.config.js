var ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
var path = require('path')

module.exports = {
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'main-[hash:5].bundle.js',
        publicPath: '/'
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
    plugins: [
        new CleanWebpackPlugin('dist'),
        new ExtractTextPlugin({
            filename: 'style-[contentHash].css'
        })
    ]
}