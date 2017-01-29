module.exports = (app) => app.post('/users', (req, res) => {
    console.log(req.body);
    app.models.user.create(req.body, function (err, model) {
        if (err) return res.status(500).json(err);
        res.json(model);
    });
});
