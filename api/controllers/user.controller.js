const Controller = require('../../bootstrap/common/controller');

module.exports = class UserController extends Controller {

    create(req, res) {
        console.log(this);
        this.app.dao.models.user.create(req.body, function (err, model) {
            if (err) return res.status(500).json(err);
            res.json(model);
        });
    }

};

