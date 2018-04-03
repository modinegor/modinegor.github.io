const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.angular.common');


module.exports = merge(common, {
    entry: "./part2/src/index.js",
    output: {
        path: path.resolve(__dirname, 'static', 'dist', 'part2'),
        filename: 'bundle.js',
        publicPath: './'
    },

    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'static', 'dist', 'part2')], {'dry': true}),
    ],
});
