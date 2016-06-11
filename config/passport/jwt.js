'use strict';

const mongoose = require('mongoose');
const User = mongoose.model('User');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const EXPIRES_IN = '24h';
const ALGORITHM = "HS256";

const JWT_STRATEGY_CONFIG = {
    secretOrKey: process.env.tokenSecret || "ghO/I-uYjYTM[>n7hQ;a|nJl&`/*-ut[uQ-wR33G#Dk$X}Me&g3tg~0_*.7WIK~M",
    issuer : "api.venturepact.com",
    audience: "app.venturepact.com",
    passReqToCallback: false,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

const _onJwtStrategyAuth = (jwt_payload, next) => {
    console.log(jwt_payload);
    next();
};

module.exports = new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth);
