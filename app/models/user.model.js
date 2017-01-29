const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'user',
    connection: 'mongo',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        firstName: 'string',
        lastName: 'string',
        birthDate: 'date',
        email: {
            type: 'email',
            unique: true,
            required: true,
            index: true
        },
        oauthProviders: {
            collection: 'user-oauth'
        }
    }
});