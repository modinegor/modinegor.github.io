const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'static', 'dist'),
        filename: 'bundle.js',
        publicPath: './'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            }, {
                test: /\.css/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },

    watch: true,

    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, 'static', 'dist')], {'dry': true}),
    ],
};
