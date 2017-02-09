const AppModule = require('../lighten/common/app-module');
const Waterline = require('waterline');

module.exports = class WaterlineAppModule extends AppModule {

    constructor(app) {
        super(app);
        this.waterline = new Waterline();
        this.loadSchemas();
        this.waterline.initialize(app.config.database, (err, ontology) => {
            if (err) {
                return this.log.error(err);
            }
            app.orm = ontology.collections;
            this.connections = ontology.connections;
        });
    }

    loadSchemas() {
        return Object.values(this.app.schemas)
            .map(model => Waterline.Collection.extend(model.schema()))
            .map(model => this.waterline.loadCollection(model));
    }

};
