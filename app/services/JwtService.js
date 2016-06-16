'use strict';

const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../config/passport/jwt').config;

module.exports = {
    createToken: (user) => {
        return jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    first_name: user.first_name
                }
            },
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithm,
                expiresIn: jwtConfig.expiresIn,
                issuer: jwtConfig.issuer,
                audience: jwtConfig.audience
            }
        );
    }

};
