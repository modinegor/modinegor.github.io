const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = merge(common, {
    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 5001,
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'template/index.html',
            title: ' (development)',
            showErrors: true
        })
    ],
});
