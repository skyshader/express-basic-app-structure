'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const OAuth2Strategy = require('passport-oauth2');

const config = {
    authorizationURL: process.env.API_URL + '/oauth2/authorize',
    tokenURL: process.env.API_URL + '/oauth2/token',
    clientID: process.env.CLIENT_ID || 'dRxvFqWa9pRthcB' ,
    clientSecret: process.env.SECRET || 'ghO/I-uYjYTM[>n7hQ;a|nJl&`/*-ut[uQ-wR33G#Dk$X}Me&g3tg~0_*.7WIK~M',
    callbackURL: process.env.API_URL + '/auth/callback'
};

const _onOauth2StrategyAuth = (accessToken, refreshToken, user, cb) => {
    User.findOrCreate({username: user.username})
        .then((err, user) => {
        return cb(err, user);
    });
};

module.exports = {
    strategy: new OAuth2Strategy(config, _onOauth2StrategyAuth)
};
