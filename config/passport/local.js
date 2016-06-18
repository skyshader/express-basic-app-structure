'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const PasswordHash = require('./../../app/services/password-hash');
const errors = require('./../constants').errors;

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

            if (!user) return next(null, false, errors.E_USER_NOT_FOUND);

            if(!PasswordHash.compare(password, user.password)) {
                return next(null, false, errors.E_INVALID_PASSWORD);
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
