const AppModule = require('../common/app-module');
const Waterline = require('waterline');

module.exports = class WaterlineAppModule extends AppModule {

    constructor(app) {
        super(app);
        this.waterline = new Waterline();
        Object.values(app.models)
            .map(model => Waterline.Collection.extend(model.schema()))
            .forEach(model => this.waterline.loadCollection(model));

        this.waterline.initialize(app.config.database, (err, ontology) => {
            if (err) {
                return console.error(err);
            }
            this.waterline.models = ontology.collections;
            this.connections = ontology.connections;
        });

        app.dao = this.waterline;
    }

};
