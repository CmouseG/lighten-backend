module.exports = class LightenApp {

    constructor(api, pkg) {
        this.api = api;
        this.pkg = pkg;
        this.initApi();
        this.initExternalModules();
    }

    initApi() {
        this.controllers = this.initModuleContainer(this.api.controllers);
        this.schemas = this.initModuleContainer(this.api.schemas);
        this.services = this.initModuleContainer(this.api.services);
    }

    initModuleContainer(modules) {
        const container = {};
        Object.keys(modules).forEach(module => {
            container[module] = this.initModule(modules[module]);
        });
        return container;
    }

    initExternalModules() {
        const modules = this.pkg.lightenModules || [];
        modules
            .map(module => this.initModule(require.main.require(module)))
            .sort();
    }

    initModule(module) {
        this.log.debug(`Initialising ${module.name}`);
        return new (module)(this);
    }

    get server() {
        return this._server;
    }

    set server(server) {
        this._server = server;
    }

    get orm() {
        return this._orm;
    }

    set orm(orm) {
        this._orm = orm;
    }

    get log() {
        return this.config.logger;
    }

    get config() {
        return this.api.config;
    }
};

