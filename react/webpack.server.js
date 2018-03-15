const path = require('path');


module.exports = {
    entry: "./server/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'server.js',
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
                        presets: ['env', 'react'],
                        plugins: [
                            'transform-class-properties',
                            'transform-object-rest-spread',
                            'transform-decorators-legacy'
                        ]
                    },
                }
            }
        ]
    },

    target: 'node',

    node: {
        net: 'empty',
        fs: 'empty'
    }
};
