'use strict';

const bCrypt = require('bcrypt-nodejs');

module.exports = {
    generate: (password) => {
        const salt = bCrypt.genSaltSync(10);
        return bCrypt.hashSync(password, salt);
    },

    compare: (plain, hashed) => {
        return bCrypt.compareSync(plain, hashed);
    }
};
