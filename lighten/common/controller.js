const AppModule = require('./app-module');

module.exports = class Controller {

    constructor(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    get services() {
        return this.app.services;
    }

    get id () {
        return this.constructor.name.replace(/(\w+)Controller/, '$1').toLowerCase()
    }

};