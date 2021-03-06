const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(\.spec.js$|node_modules)/,
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
    }
};
