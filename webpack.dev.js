const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    watch: true,

    watchOptions: {
        aggregateTimeout: 100,
        ignored: './node_modules/'
    },

    devServer: {
        host: 'localhost',
        port: 5001,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
});
