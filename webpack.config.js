const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENVIRONMENT = process.env.ENVIRONMENT || 'development';

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'js')
    },

    watch: ENVIRONMENT === 'development',

    watchOptions: {
        aggregateTimeout: 100,
        ignored: './node_modules/'
    },

    devtool: ENVIRONMENT === 'development' ? 'source-map' : null,

    devServer: {
        host: 'localhost',
        port: 5001,
    },

    plugins: [
        new webpack.DefinePlugin({
            ENVIRONMENT: JSON.stringify(ENVIRONMENT)
        }),
        new HtmlWebpackPlugin({
            title: 'development'
        })
    ],

    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            options: {
                presets: ["es2015"],
                plugins: [
                    ["transform-es2015-for-of", {
                        "loose": true
                    }],
                    "es6-promise"]
            }
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader']
        }]
    },
};