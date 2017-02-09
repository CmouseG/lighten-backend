const AppModule = require('./app-module');

module.exports = class Model {

    constructor(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    schema() {
        throw "Model is abstract."
    }
};