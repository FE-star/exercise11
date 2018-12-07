var path = require('path')

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, ".tmp"),
        port: 9000,
        openPage: 'webpack-dev-server'
    },
    output: {
        filename: 'main-[hash:5].bundle.js',
        publicPath: '/'
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