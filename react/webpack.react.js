const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: {
        main: ["react-hot-loader/patch", "./src/index.js"]
    },
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
                            'react-hot-loader/babel',
                            'transform-class-properties',
                            'transform-object-rest-spread'
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
    ]
};
