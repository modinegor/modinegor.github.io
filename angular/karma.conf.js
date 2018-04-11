const path = require('path');

module.exports = config => {
    config.set({
        browsers: ['Chrome'],
        files: [
            './node_modules/angular/angular.js',
            './node_modules/angular-mocks/angular-mocks.js',
            './part2/src/index.js',
            './part2/tests/**/*.spec.js'
        ],
        frameworks: ['jasmine'],
        preprocessors: {
            './part2/src/index.js': ['webpack', 'sourcemap'],
            './part2/src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['html', 'text-summary'],
            dir: path.join(__dirname, 'coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
        },
        webpack:{
            devtool: 'inline-source-map',
            module:{
                rules: [
                    {
                        test: /\.js$/,
                        exclude: /(\.spec.js$|node_modules)\//,
                        use: {
                            loader: 'istanbul-instrumenter-loader',
                            options: {
                                enforce: true,
                            }
                        }
                    }, {
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
            }
        },
        webpackServer: {
            noInfo: true
        }
    });
};
