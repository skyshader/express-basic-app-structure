'use strict';

const _ = require('lodash');
const passport = require('passport');
const JwtService = require('./../../services/JwtService');

// load necessary models
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login: (req, res) => {
        passport.authenticate('local', { session: false}, (err, user, info) => {
            console.log(err, user, info);
            if (err) {
                res.status = 500;
                return res.json({
                    success: false,
                    error: {
                        code: 'E_UNEXPECTED',
                        message: err
                    }
                });
            }

            if (!user) {
                res.status = 401;
                return res.json({
                    success: false,
                    error: {
                        code: info.code,
                        message: info.message
                    }
                });
            }

            res.status = 200;
            return res.json({
                success: true,
                token: JwtService.createToken(user),
                user: user.toJSON()
            });
        })(req, res);
    },

    signup: (req, res) => {
        let user = new User(_.omit(req.body, 'id'));
        user.save()
            .then(() => {
                res.status = 201;
                return res.json({
                    success: true,
                    token: JwtService.createToken(user),
                    user: user.toJSON()
                });
            })
            .catch((err) => {
                res.status = 500;
                return res.json({
                    success: false,
                    error: err
                });
            });
    }
};
