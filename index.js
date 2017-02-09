const LightenApp = require('./lighten/app');

module.exports = LightenApp;

new LightenApp(require('./api'), require('./package.json'));