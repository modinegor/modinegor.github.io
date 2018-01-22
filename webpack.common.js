const path = require('path');


module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|additions)/,
            use: {
                loader: 'babel-loader',
                options:{
                    presets: ["es2015"],
                    plugins: [
                        ["transform-es2015-for-of", {
                            "loose": true
                        }],
                        "es6-promise",
                        "transform-object-rest-spread"]
                }
            }
        }, {
            test: /\.sass$/,
            use: [{
                loader: 'style-loader',
            }, {
                loader: 'css-loader',
            }, {
                loader: 'sass-loader'
            }]
        }, {
            test: /\.json$/,
            use: [{
                loader: './additions/loaders/task-loader.js'
            }]
        }]
    },
};