const sailsMongo = require('sails-mongo');

module.exports = {
    adapters: {
        mongo: sailsMongo
    },
    connections: {
        mongo: {
            adapter: 'mongo',
            url: 'mongodb://lighten_mongodb/lighten'
        }
    }
};