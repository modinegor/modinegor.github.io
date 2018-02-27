const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './react/src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './react/'
    },

    module: {
        rules: [{
            test: '/\.(js|jsx)$/',
            exclude: '/node_modules/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                },
            }
        }]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {'dry': true})
    ]
};