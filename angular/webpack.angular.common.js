module.exports = {
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
    }
};
