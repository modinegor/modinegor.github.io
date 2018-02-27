const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = merge(common, {
    plugins: [
        new UglifyJSPlugin(),
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            title: ''
        }),
        new CleanWebpackPlugin(['dist'])
    ]
});
