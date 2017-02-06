const api = require('../api');
const appModules = require('./modules');

module.exports = class LightenApp {

    constructor() {
        this.initApi();
        this.initAppModules();
    }

    initApi() {
        this.controllers = this.initModuleContainer(api.controllers);
        this.models = this.initModuleContainer(api.models);
        this.services = this.initModuleContainer(api.services);
    }

    initAppModules() {
        this.modules = this.initModuleContainer(appModules);
    }

    initModuleContainer(modules) {
        const container = {};
        Object.keys(modules).forEach(module => {
            container[module] = new (modules[module])(this)
        });
        this.log.debug(`Initialised `, Object.keys(container).join(', '));
        return container;
    }

    get server() {
        return this._server;
    }

    set server(server) {
        this._server = server;
    }

    get dao() {
        return this._dao;
    }

    set dao(dao) {
        this._dao = dao;
    }

    get log() {
        return this.config.logger;
    }

    get config() {
        return api.config;
    }
}

