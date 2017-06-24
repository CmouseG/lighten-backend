module.exports = class AppModule {

    constructor(id, app) {
        Object.defineProperty(this, 'id', {
            enumerable: false,
            value: id
        });
        Object.defineProperty(this, 'app', {
            enumerable: false,
            value: app
        });
    }

    initialize() {
    }

    validate() {
    }

    dependsOn() {
        return [];
    }

    get log() {
        return this.app.log;
    }

};