'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
    hashPassword: (user, next) => {
        bCrypt.genSalt(10, (err, salt) => {
            if (err) next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    },

    comparePassword: (password, user, cb) => {
        bCrypt.compare(password, user.password, (err, isMatch) => {
            if (err) cb(err);
            cb(null, isMatch);
        });
    }
};
