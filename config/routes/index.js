'use strict';

// load version-less controllers
const main = require('../../app/controllers/base');

const errors = require('./../constants').errors;

// define routes
module.exports = function(app, passport) {

    app.get('/', main.index);

    app.use('/api/v1', require('./routes_v1.js')(passport));

    // If nothing else matches, return 404
    app.use(function(req, res) {
        return res.status(404).json({
            success: false,
            error: errors.E_NOT_FOUND
        });
    });

};
