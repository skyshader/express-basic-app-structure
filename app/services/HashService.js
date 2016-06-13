'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
    hashPassword: (user, cb) => {
        bCrypt.genSalt(10, (err, salt) => {
            if (err) cb(err);
            bCrypt.hash(user.password, salt, null, (err, hash) => {
                if (err) return next(err);
                cb(null, hash);
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
