var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

// 这个在 npm run dev 和 npm run build 时候是不同的
var TARGET = process.env.npm_lifecycle_event
var APP_PATH = path.join(__dirname, '/src')


// 插件
var plugins = [];
// 规则
var rules = [];
if(TARGET === 'build'){
    plugins.push(
        // 压缩
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                // 跳过这些
                except: ['$super', '$', 'exports', 'require']
            }
        }),
        // 样式打包
        new ExtractTextPlugin({ filename: '[name].css' })
    );

    rules.push(
        {
            test:/\.css$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use:{
                  loader: "css-loader",
                  options:{
                      // 压缩
                      minimize: true
                  }
              }
            })
        }
    );
}else{
    rules.push(
        {
            test:/\.css$/,
            use: [
                'style-loader',
                'css-loader'
            ]
        }
    );
}

module.exports = {
    // 入口文件配置
    entry: './src/index.js',
    // 入口文件输出位置
    output:{
        path: path.resolve(__dirname, 'dist'),
        // filename: 'main.[hash].js'
        filename: 'main.js'
    },
    devtool: 'inline-source-map',
    module:{
        rules:rules
    },
    plugins: plugins,
}
