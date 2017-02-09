const Controller = require('../../lighten/common/controller');

module.exports = class UserController extends Controller {
    
    create(req, res) {
        this.app.orm.user.create(req.body, function (err, model) {
            if (err) return res.status(500).json(err);
            res.json(model);
        });
    }

};

