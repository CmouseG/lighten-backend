const express = require('express');
const Waterline = require('waterline');
const models = require('./models');
const connections = require('./db/connections');
const adapters = require('./db/adapters');
const bodyParser  = require('body-parser');


let app = express();
app.use(bodyParser.json());
let waterline = new Waterline();

const controllers = require('./controllers')(app);

models.forEach(model => waterline.loadCollection(model));
waterline.initialize({adapters, connections}, function (err, ontology) {
    if (err) {
        return console.error(err);
    }
    app.models = ontology.collections;
    app.connections = ontology.connections;
});

app.get('/', function (req, res) {
    res.send('Hello world\n');
});

module.exports = app;