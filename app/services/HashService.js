'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
    hashPassword: (password) => {
        const salt = bCrypt.genSaltSync(10);
        return bCrypt.hashSync(password, salt);
    },

    comparePassword: (password, user) => {
        console.log('Password', password, user.password);
        return bCrypt.compareSync(password, user.password);
    }
};
