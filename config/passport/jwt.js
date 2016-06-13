'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = {
    expiresIn: '24h',
    algorithm: 'HS256',
    secret: process.env.tokenSecret || "ghO/I-uYjYTM[>n7hQ;a|nJl&`/*-ut[uQ-wR33G#Dk$X}Me&g3tg~0_*.7WIK~M",
    issuer: "api.venturepact.com",
    audience: "app.venturepact.com"
};

const JWT_STRATEGY_CONFIG = {
    secretOrKey: config.secret,
    issuer : config.issuer,
    audience: config.audience,
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const _onJwtStrategyAuth = (payload, next) => {
    let user = payload.user;
    return next(null, user, {});
};

const jwtStrategy = new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth);

module.exports = {
    strategy: jwtStrategy,
    config: config
};
