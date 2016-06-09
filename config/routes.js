'use strict';

// list controllers
const main = require('../app/controllers/main');


// define routes
module.exports = function(app, passport) {
    app.get('/', main.index);

    app.use(middlewares.isAuthenticated);

    
};
