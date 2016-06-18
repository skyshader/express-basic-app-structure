'use strict';

const _ = require('lodash');
const passport = require('passport');
const JwtService = require('./../../services/jwt-service');
const response = require('./../../../config/responses');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

class Auth {
    constructor() {}

    login(req, res) {
        passport.authenticate('local', { session: false }, (err, user, info) => {
            console.log(err, user, info);
            if (err) return response.error(res, err);

            if (!user) {
                return response.unauthorized(res, info);
            }

            let data = {
                token: JwtService.createToken(user),
                user: user.toJSON()
            };

            return response.ok(res, data);
        })(req, res);
    }

    signup(req, res) {
        let user = new User(_.omit(req.body, 'id'));
        user.save()
            .then(() => {
                let data = {
                    token: JwtService.createToken(user),
                    user: user.toJSON()
                };

                return response.created(res, data);
            })
            .catch((err) => {
                return response.error(res, err);
            });
    }
}

module.exports = new Auth();
