'use strict';

// load version-less controllers
const main = require('../../app/controllers/MainController');

// define routes
module.exports = function(app, passport) {

    app.get('/', main.index);

    app.use('/api/v1', require('./routes_v1.js')(passport));

};
