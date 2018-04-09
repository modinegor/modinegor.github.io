const path = require('path');
const webpackConfig = require(path.resolve(__dirname, 'webpack.angular.common'));

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
            'part2/src/index.js': ['webpack'],
            'part2/src/**/*.js': ['coverage']
        },
        reporters: ['spec', 'coverage-istanbul'],
        coverageIstanbulReporter: {
            reports: ['html', 'text-summary'],
            dir: path.join(__dirname, 'coverage'),
            combineBrowserReports: true,
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
        },
        webpack: webpackConfig,
        webpackServer: {
            noInfo: true
        }
    });
};