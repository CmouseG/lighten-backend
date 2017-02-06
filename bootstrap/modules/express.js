const AppModule = require('../common/app-module');
const express = require('express');
const bodyParser = require('body-parser');

module.exports = class ExpressAppModule extends AppModule {

    constructor(app) {
        super(app);
        this.express = express();
        this.express.use(bodyParser.json());
        app.server = express;
        this.initRoutes(app);
        this.express.listen(app.config.server.port);
    }

    initRoutes() {
        const router = express.Router();
        this.app.log.info(`Initialising Router`);
        this.app.config.server.routes.forEach(route => {
            this.app.log.info(`[${route.method}] ${route.path} => ${route.handler}`);
            router[route.method.toLowerCase()](route.path, this.getControllerMethod(route.handler));
        });
        this.express.use('', router);
    }

    getControllerMethod(handler) {
        const methods = handler.split('.');
        let parent = null;
        let handlerMethod = this.app.controllers;
        methods.forEach(accessor => {
            parent = handlerMethod;
            handlerMethod = handlerMethod[accessor]
        });
        return handlerMethod.bind(parent);
    }

};