const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js',
        publicPath: './'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread',
                            'transform-decorators-legacy'
                        ]
                    },
                }
            }, {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    devServer: {
        host: 'localhost',
        port: 5001,
        hot: true,
        disableHostCheck: true
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {'dry': true}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],

    node: {
        net: 'empty',
        fs: 'empty'
    }
};
