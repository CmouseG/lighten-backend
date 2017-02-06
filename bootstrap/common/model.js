const AppModule = require('./app-module');

module.exports = class Model extends AppModule {

    schema() {
        throw "Model is abstract."
    }
};