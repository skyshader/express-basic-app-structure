'use strict';

const jwt = require('jsonwebtoken');
const config = require('./../../config/passport/jwt').config;

class JwtService {
    constructor() {}

    createToken(user) {
        return jwt.sign(
            {
                user:
                {
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name
                }
            },

            config.secret,

            {
                algorithm: config.algorithm,
                expiresIn: config.expiresIn,
                issuer: config.issuer,
                audience: config.audience
            }
        );
    }
}

module.exports = new JwtService();
