const Model = require('../../lighten/common/model');

module.exports = class UserSessionModel extends Model {

    schema() {
        return {
            identity: 'user-session',
            connection: 'mongo',
            autoPK: true,
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                user: {
                    model: 'user'
                },
                expires: 'date',
                token: {
                    type: 'string',
                    index: true
                }
            }
        }
    }
};
