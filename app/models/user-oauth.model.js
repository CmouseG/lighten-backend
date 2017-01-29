const Waterline = require('waterline');

module.exports = Waterline.Collection.extend({
    identity: 'user-oauth',
    connection: 'mongo',
    autoPK: true,
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        user: {
            model: 'user'
        },
        oauth_provider: 'string',
        access_token: 'string',
        refresh_token: 'string',
        expiry_date: 'date'
    }
});