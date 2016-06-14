'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const HashService = require('./../../app/services/HashService');

const LocalStrategy = require('passport-local').Strategy;

const LOCAL_STRATEGY_CONFIG = {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: false
};

function _onLocalStrategyAuth(username, password, next) {
    User.findOne({ $or: [{ 'username': username }, { 'email': username }] })
        .then((user) => {

            console.log(user);

            if (!user) return next(null, false, {
                code: 'E_USER_NOT_FOUND',
                message: username + ' is not found'
            });

            if(!HashService.comparePassword(password, user)) {
                return next(null, false, {
                    code: 'E_INVALID_PASSWORD',
                    message: 'Password is wrong!'
                });
            }

            next(null, user, {});
        })
        .catch((error) => {
            return next(error, false, {});
        });
}

const localStrategy = new LocalStrategy(LOCAL_STRATEGY_CONFIG, _onLocalStrategyAuth);

module.exports = {
    strategy: localStrategy
};
