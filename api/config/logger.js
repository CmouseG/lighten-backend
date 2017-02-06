'use strict';

const winston = require('winston');

module.exports = new winston.Logger({
    level: 'debug',
    exitOnError: false,
    transports: [
        new (winston.transports.Console)({
            prettyPrint: true,
            colorize: true
        })
    ]
});