'use strict';

module.exports = Object.freeze({
    E_UNEXPECTED: {
        code: 'E_UNEXPECTED',
        message: 'Something went wrong!'
    },
    E_NOT_FOUND: {
        code: 'E_NOT_FOUND',
        message: 'Unknown request!'
    },

    E_USER_NOT_FOUND: {
        code: 'E_USER_NOT_FOUND',
        message: 'The requested user account does not exists!'
    },

    E_INVALID_PASSWORD: {
        code: 'E_INVALID_PASSWORD',
        message: 'The password provided is incorrect!'
    }
});
