const Model = require('../../bootstrap/common/model');

module.exports = class UserOauthModel extends Model {

    schema() {
        return {
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
        }
    }
};
