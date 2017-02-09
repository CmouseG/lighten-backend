const AppModule = require('./app-module');

module.exports = class Service {

    constructor(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    get dao() {
        return this.app.dao;
    }

};