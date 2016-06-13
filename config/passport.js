'use strict';

const jwt = require('./passport/jwt');
// const oauth2 = require('./passport/oauth2');

module.exports = (passport) => {
    passport.use(jwt.strategy);
    // passport.use(oauth2.strategy);
};
