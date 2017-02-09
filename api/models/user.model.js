const Model = require('../../lighten/common/model');

module.exports = class UserModel extends Model {

    schema() {
        return {
            identity: 'user',
            connection: 'mongo',
            autoPK: true,
            autoCreatedAt: true,
            autoUpdatedAt: true,
            attributes: {
                email: {
                    type: 'email',
                    unique: true,
                    required: true,
                    index: true
                },
                password: {
                    type: 'string',
                    required: true,
                },
                firstName: 'string',
                lastName: 'string',
                birthDate: 'date',
                oauthProviders: {
                    collection: 'user-oauth'
                }
            },
        }
    }
};