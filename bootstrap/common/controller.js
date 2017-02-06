const AppModule = require('./app-module');

module.exports = class Controller extends AppModule {

    get id () {
        return this.constructor.name.replace(/(\w+)Controller/, '$1').toLowerCase()
    }

    get services() {
        return this.app.services;
    }

};