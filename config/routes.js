'use strict';

const main = require('../app/controllers/main');

module.exports = function(app, passport) {
    app.get('/', main.index);
};
