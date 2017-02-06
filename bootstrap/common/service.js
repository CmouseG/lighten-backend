const AppModule = require('./app-module');

module.exports = class Service extends AppModule {

    get dao() {
        return this.app.dao;
    }

};