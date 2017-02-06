module.exports = class AppModule {

    constructor(app) {
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    get log () {
        return this.app.log;
    }

};