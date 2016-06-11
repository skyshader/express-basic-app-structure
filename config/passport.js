'use strict';

// const mongoose = require('mongoose');
// const User = mongoose.model('User');

const jwt = require('./passport/jwt');

module.exports = (passport) => {
    passport.use(jwt);
};