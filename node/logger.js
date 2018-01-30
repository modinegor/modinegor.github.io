const winston = require('winston');
const path = require('path');


const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({filename: path.resolve(__dirname, 'logs', 'errors.log'),
                                     level: 'error'}),
        new winston.transports.File({filename: path.resolve(__dirname, 'logs', 'requests.log')})
    ]
});

module.exports = logger;
