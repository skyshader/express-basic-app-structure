'use strict';

const jwt = require('jsonwebtoken');
const jwtConfig = require('./../../config/passport/jwt').config;

module.exports = {
    createToken: (user) => {
        return jwt.sign({
                user: user.toJSON()
            },
            jwtConfig.secret,
            {
                algorithm: jwtConfig.algorithm,
                expiresIn: jwtConfig.expiresIn,
                issuer: jwtConfig.issuer,
                audience: jwtConfig.audience
            }
        );
    },

    passportAuth: (req, res, err, user, info) => {
        if(err) {
            console.log(err);
            throw err;
        }
        if (!user) {
            throw new Error('Unauthorized');
        }

        return res.json({
            token: this.createToken(user),
            user: user
        });
    }

};
