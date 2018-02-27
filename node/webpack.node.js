const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: './static/js/main.js',
    output: {
        filename: 'script.js',
        path: path.resolve(__dirname, 'static', 'dist'),
        publicPath: './'
    },

    module: {
        rules: [{
            test: '/\.js$/',
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['es2015'],
                    plugins: [
                        ["transform-es2015-for-of", {
                            "loose": true
                        }],
                        "es6-promise",
                        "transform-object-rest-spread"]
                }
            }
        }]
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new CleanWebpackPlugin(['dist'], {'dry': true})
    ]
};